import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import ts from 'typescript';
import { ARRIVAL_DURATION, arrivalScore, arrivalThread, shouldPlayArrival } from '../src/motion/arrivalScore.ts';
import { filamentPath } from '../src/motion/heroModel.ts';

const entry = { reduced: false, hidden: false, hash: '', scrollY: 0, navigationType: 'navigate' };
test('the entrance respects motion settings, deep links, history restoration and scroll position', () => {
  assert.equal(shouldPlayArrival(entry), true);
  assert.equal(shouldPlayArrival({ ...entry, hash: '#home', navigationType: 'reload' }), true);
  for (const condition of [{ reduced: true }, { hidden: true }, { hash: '#work' }, { scrollY: 100 }, { navigationType: 'back_forward' }]) {
    assert.equal(shouldPlayArrival({ ...entry, ...condition }), false);
  }
});

test('the impact, fold, thread and landing all reach stable endpoints', () => {
  const first = arrivalScore(0), last = arrivalScore(ARRIVAL_DURATION);
  assert.equal(first.press, 0);
  assert.equal(first.fold, 0);
  assert.equal(first.land, 0);
  assert.equal(last.press, 1);
  assert.equal(last.fold, 1);
  assert.equal(last.land, 1);
  assert.equal(last.thread, 1);
  assert.equal(last.done, true);
  assert.deepEqual(arrivalScore(1e6), last);
  assert.deepEqual(arrivalScore(-100), first);
  assert.equal(arrivalScore(NaN).done, true);
});

test('the only drawing thread retains the exact resting hero geometry', () => {
  const target = filamentPath(0, 930.26, 550.76);
  assert.equal(arrivalThread(target), target);
  assert.equal(arrivalThread(''), '');
  assert.equal(arrivalThread('M 10 20'), '');
});

const source = readFileSync(new URL('../src/motion/HeroArrival.ts', import.meta.url), 'utf8')
  .replace("'./arrivalScore.ts'", JSON.stringify(new URL('../src/motion/arrivalScore.ts', import.meta.url).href));
const compiled = ts.transpileModule(source, { compilerOptions: { target: ts.ScriptTarget.ES2022, module: ts.ModuleKind.ESNext } }).outputText;
const { HeroArrival } = await import(`data:text/javascript;base64,${Buffer.from(compiled).toString('base64')}`);

class ElementStub extends EventTarget {
  hidden = false;
  innerHTML = '<span>Interfaces.</span><span>With feeling.</span>';
  attributes = new Map();
  children = new Map();
  styles = new Map();
  calls = [];
  style = { setProperty: (name, value) => this.styles.set(name, value) };
  querySelector(selector) { if (!this.children.has(selector)) this.children.set(selector, new ElementStub()); return this.children.get(selector); }
  querySelectorAll(selector) { return selector === '.line' ? [this.querySelector('line1'), this.querySelector('line2')] : []; }
  removeAttribute(name) { this.attributes.delete(name); }
  setAttribute(name, value) { this.attributes.set(name, value); }
  getAttribute(name) { return this.attributes.get(name); }
  getBoundingClientRect() { return { left: 75, top: 200, width: 1200, height: 440 }; }
  animate(frames, options) { const animation = { frames, options, cancelled: false, cancel() { this.cancelled = true; } }; this.calls.push(animation); return animation; }
}
function setup({ reduced = false, hash = '', pending = true } = {}) {
  const doc = new ElementStub();
  doc.documentElement = new ElementStub();
  doc.documentElement.dataset.arrival = pending ? 'pending' : 'done';
  doc.hidden = false;
  const elements = new Map();
  elements.set('[data-hero-arrival]', new ElementStub());
  elements.set('#hero-title', new ElementStub());
  elements.set('.hero-workbench', new ElementStub());
  elements.set('.hero-filament .filament-main', new ElementStub());
  elements.set('.hero-copy', new ElementStub());
  for (const [key, value] of elements) doc.querySelectorAll = () => [...elements.values()];
  doc.querySelector = selector => elements.get(selector) ?? null;
  globalThis.document = doc;
  const win = new ElementStub();
  win.scrollY = 0;
  const timers = new Map();
  let nextTimer = 0;
  win.setTimeout = fn => { const id = ++nextTimer; timers.set(id, fn); return id; };
  win.clearTimeout = id => timers.delete(id);
  globalThis.window = win;
  globalThis.location = { hash };
  globalThis.performance = { getEntriesByType: () => [{ type: 'navigate' }] };
  globalThis.getComputedStyle = () => ({ getPropertyValue: name => name === 'font-size' ? '210px' : '0px' });
  elements.get('.hero-filament .filament-main').setAttribute('d', filamentPath(0, 930, 550));
  const controller = new AbortController();
  const arrival = new HeroArrival(controller.signal, reduced);
  return { doc, win, timers, controller, arrival, root: doc.documentElement, overlay: elements.get('[data-hero-arrival]'), elements };
}

test('the projection clones and measures the real heading, then starts coordinated animations', () => {
  const { root, overlay, timers, controller, elements } = setup();
  assert.equal(root.dataset.arrival, 'playing');
  assert.equal(overlay.querySelector('.arrival-type').innerHTML, '<span>Interfaces.</span><span>With feeling.</span>');
  assert.equal(overlay.querySelector('.arrival-type').styles.get('left'), '75px');
  assert.equal(overlay.querySelector('.arrival-thread').styles.get('height'), '440px');
  const animations = [...overlay.children.values(), elements.get('.hero-copy'), overlay].flatMap(element => element.calls);
  assert.equal(animations.length, 5);
  assert.ok(animations.every(animation => animation.options.duration === ARRIVAL_DURATION));
  assert.equal(timers.size, 1);
  controller.abort();
  assert.equal(root.dataset.arrival, 'done');
  assert.equal(overlay.hidden, true);
  assert.ok(overlay.calls.every(call => call.cancelled));
});

test('input immediately reveals the working page and leaves the event alone', () => {
  const { doc, root, overlay, controller } = setup();
  const event = new Event('keydown', { cancelable: true });
  doc.dispatchEvent(event);
  assert.equal(event.defaultPrevented, false);
  assert.equal(root.dataset.arrival, 'done');
  assert.equal(overlay.hidden, true);
  controller.abort();
});

test('deep links and reduced motion skip the entrance entirely', () => {
  for (const config of [{ reduced: true }, { hash: '#zestt' }, { pending: false }]) {
    const { root, overlay, controller } = setup(config);
    assert.equal(root.dataset.arrival, 'done');
    assert.equal(overlay.hidden, true);
    controller.abort();
  }
});

test('resizing and changing motion off cannot strand the projected page', () => {
  const { win, root, controller } = setup();
  win.dispatchEvent(new Event('resize'));
  assert.equal(root.dataset.arrival, 'done');
  controller.abort();
  const reducedCase = setup();
  reducedCase.arrival.setReduced(true);
  assert.equal(reducedCase.root.dataset.arrival, 'done');
  reducedCase.controller.abort();
});

test('the fail-safe releases the page if its animation cannot finish', () => {
  const { timers, overlay, root, controller } = setup();
  timers.values().next().value();
  assert.equal(root.dataset.arrival, 'done');
  assert.equal(overlay.hidden, true);
  controller.abort();
});
