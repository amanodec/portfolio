import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import ts from 'typescript';
import { advanceSpring, axis } from '../src/motion/labPhysics.ts';
import { clampPull, filamentPath, orderSummary, releasePull } from '../src/motion/heroModel.ts';

// Node strips types but does not transform parameter properties. Transpile the controller
// in memory, retaining its real physics and model modules, without starting a browser.
const source = readFileSync(new URL('../src/motion/HeroUnfold.ts', import.meta.url), 'utf8')
  .replace("'./labPhysics.ts'", JSON.stringify(new URL('../src/motion/labPhysics.ts', import.meta.url).href))
  .replace("'./heroModel.ts'", JSON.stringify(new URL('../src/motion/heroModel.ts', import.meta.url).href));
const compiled = ts.transpileModule(source, { compilerOptions: { target: ts.ScriptTarget.ES2022, module: ts.ModuleKind.ESNext } }).outputText;
const { HeroUnfold } = await import(`data:text/javascript;base64,${Buffer.from(compiled).toString('base64')}`);

class ElementStub extends EventTarget {
  attributes = new Map();
  children = new Map();
  textContent = '';
  value = '';
  inert = true;
  disabled = false;
  clientWidth = 330;
  offsetWidth = 182;
  offsetHeight = 52;
  captured = new Set();
  classes = new Set();
  classList = { add: name => this.classes.add(name), remove: name => this.classes.delete(name), toggle: (name, on) => on ? this.classes.add(name) : this.classes.delete(name) };
  style = { setProperty: () => {} };
  querySelector(selector) { if (!this.children.has(selector)) this.children.set(selector, new ElementStub()); return this.children.get(selector); }
  querySelectorAll() { return [new ElementStub(), new ElementStub()]; }
  setAttribute(name, value) { this.attributes.set(name, value); }
  getAttribute(name) { return this.attributes.get(name); }
  getBoundingClientRect() { return { left: 0, top: 0, width: 1200, height: 600 }; }
  setPointerCapture(id) { this.captured.add(id); }
  hasPointerCapture(id) { return this.captured.has(id); }
  releasePointerCapture(id) { this.captured.delete(id); }
  contains(element) { return element === this || [...this.children.values()].includes(element); }
  focus() { globalThis.document.activeElement = this; }
}
function fire(element, type, values = {}) {
  const event = new Event(type, { cancelable: true });
  Object.assign(event, values);
  element.dispatchEvent(event);
}
function setup() {
  const root = new ElementStub();
  const doc = new EventTarget();
  doc.querySelector = () => root;
  doc.activeElement = null;
  globalThis.document = doc;
  globalThis.window = new EventTarget();
  globalThis.ResizeObserver = class { observe() {} disconnect() {} };
  globalThis.IntersectionObserver = class { observe() {} disconnect() {} };
  const abort = new AbortController();
  const hero = new HeroUnfold(() => {}, abort.signal);
  const handle = root.querySelector('.hero-pull');
  const product = root.querySelector('.hero-product');
  const settle = () => { let active = true; for (let i = 0; i < 600 && active; i++) active = hero.update(1 / 60); assert.equal(active, false); };
  return { root, hero, handle, product, settle, abort };
}

test('short pulls return home; opening and closing require deliberate movement', () => {
  assert.equal(releasePull(.2, false), false);
  assert.equal(releasePull(.65, false), true);
  assert.equal(releasePull(.7, true), true);
  assert.equal(releasePull(.35, true), false);
  for (const p of [-100, NaN, Infinity]) assert.equal(clampPull(p), 0);
  assert.equal(clampPull(100), 1);
});

test('the full-distance spring settles exactly across slow and fast frames', () => {
  for (const dt of [1 / 144, 1 / 60, 1 / 20]) {
    const spring = axis();
    spring.target = 1000;
    for (let i = 0; i < 1600; i++) advanceSpring(spring, dt, 155, 24);
    assert.equal(spring.value, 1000);
    spring.target = 0;
    for (let i = 0; i < 1600; i++) advanceSpring(spring, dt, 155, 24);
    assert.equal(spring.value, 0);
  }
});

test('the thread remains connected to the handle at both ends of the pull', () => {
  for (const p of [0, .5, 1]) {
    const path = filamentPath(p, 970 + p * 148, 540);
    assert.ok(path.startsWith('M 100 310 C'));
    assert.ok(path.endsWith(`${970 + p * 148} 540`));
    assert.doesNotMatch(path, /NaN|Infinity/);
  }
});

test('keyboard activation reveals the product; Escape closes it and restores focus', () => {
  const { root, handle, product, settle, abort } = setup();
  fire(handle, 'click', { detail: 0 });
  assert.equal(handle.getAttribute('aria-expanded'), 'true');
  assert.equal(product.inert, true);
  settle();
  assert.equal(product.inert, false);
  assert.equal(product.getAttribute('aria-hidden'), 'false');
  document.activeElement = product;
  fire(root, 'keydown', { key: 'Escape' });
  settle();
  assert.equal(product.inert, true);
  assert.equal(handle.getAttribute('aria-expanded'), 'false');
  assert.equal(document.activeElement, handle);
  abort.abort();
});

test('drag release opens once and does not toggle back on the synthetic click', () => {
  const { handle, product, settle, abort } = setup();
  fire(handle, 'pointerdown', { button: 0, isPrimary: true, pointerId: 1, clientX: 0 });
  fire(handle, 'pointermove', { pointerId: 1, clientX: 130 });
  fire(handle, 'pointerup', { pointerId: 1 });
  fire(handle, 'click', { detail: 1 });
  settle();
  assert.equal(product.inert, false);
  assert.equal(handle.getAttribute('aria-expanded'), 'true');
  assert.equal(handle.hasPointerCapture(1), false);
  abort.abort();
});

test('a cancelled touch gesture restores the starting state and releases capture', () => {
  const { handle, product, settle, abort } = setup();
  fire(handle, 'pointerdown', { button: 0, isPrimary: true, pointerId: 2, clientX: 0 });
  fire(handle, 'pointermove', { pointerId: 2, clientX: 130 });
  fire(handle, 'pointercancel', { pointerId: 2 });
  settle();
  assert.equal(product.inert, true);
  assert.equal(handle.hasPointerCapture(2), false);
  assert.equal(handle.getAttribute('aria-expanded'), 'false');
  abort.abort();
});

test('reduced motion opens instantly and the local study maintains bounded totals', () => {
  const { root, hero, handle, product, abort } = setup();
  hero.setReduced(true);
  fire(handle, 'click', { detail: 0 });
  assert.equal(product.inert, false);
  assert.equal(hero.update(1 / 60), false);
  for (let i = 0; i < 12; i++) fire(root.querySelector('[data-hero-add]'), 'click');
  assert.equal(root.querySelector('[data-hero-quantity]').value, '9');
  assert.equal(root.querySelector('[data-hero-total]').textContent, '₹1620');
  assert.equal(root.querySelector('[data-hero-add]').disabled, true);
  for (let i = 0; i < 12; i++) fire(root.querySelector('[data-hero-remove]'), 'click');
  assert.equal(root.querySelector('[data-hero-quantity]').value, '0');
  assert.equal(root.querySelector('[data-hero-remove]').disabled, true);
  assert.deepEqual(orderSummary(-1), { count: 0, total: 0, label: 'Your next good decision.' });
  abort.abort();
});

test('dragging an open study closed hides its controls and interrupted drags keep it open', () => {
  const { hero, handle, product, settle, abort } = setup();
  hero.setReduced(true);
  fire(handle, 'click', { detail: 0 });
  fire(handle, 'pointerdown', { button: 0, isPrimary: true, pointerId: 3, clientX: 130 });
  fire(handle, 'pointermove', { pointerId: 3, clientX: 0 });
  fire(handle, 'pointercancel');
  assert.equal(product.inert, false);
  assert.equal(handle.getAttribute('aria-expanded'), 'true');
  hero.setReduced(false);
  fire(handle, 'pointerdown', { button: 0, isPrimary: true, pointerId: 4, clientX: 130 });
  fire(handle, 'pointermove', { pointerId: 4, clientX: 0 });
  fire(handle, 'pointerup', { pointerId: 4 });
  fire(handle, 'click', { detail: 1 });
  settle();
  assert.equal(product.inert, true);
  assert.equal(handle.getAttribute('aria-expanded'), 'false');
  abort.abort();
});
