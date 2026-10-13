import assert from 'node:assert/strict';
import test from 'node:test';

const fakeListeners = new Map();
globalThis.document = {
  hidden: false,
  addEventListener(type, listener) { fakeListeners.set(type, listener); },
  removeEventListener(type) { fakeListeners.delete(type); }
};
globalThis.window = {
  innerHeight: 800,
  innerWidth: 1440,
  scrollY: 0,
  devicePixelRatio: 1,
  listeners: new Map(),
  addEventListener(type, listener) { this.listeners.set(type, listener); },
  removeEventListener(type) { this.listeners.delete(type); },
  dispatchEvent(event) { this.listeners.get(event.type)?.(event); },
  matchMedia: () => ({ matches: false, addEventListener() {}, removeEventListener() {} })
};
globalThis.localStorage = {
  values: new Map(),
  getItem(key) { return this.values.get(key) ?? null; },
  setItem(key, value) { this.values.set(key, value); }
};
globalThis.requestAnimationFrame = () => 1;
globalThis.cancelAnimationFrame = () => {};

const { AssetLoader } = await import('../src/core/AssetLoader.ts');
const { DeviceTier } = await import('../src/core/DeviceTier.ts');
const { FrameLoop } = await import('../src/core/FrameLoop.ts');
const { MotionPreferences } = await import('../src/core/MotionPreferences.ts');
const { SceneDirector } = await import('../src/core/SceneDirector.ts');
const { ScrollState } = await import('../src/core/ScrollState.ts');
const { SignalCore } = await import('../src/three/SignalCore.ts');
const { clampMaskProgress } = await import('../src/interactions/masks.ts');
const { normalizePointer } = await import('../src/interactions/pointerField.ts');
const { DampedSpring, clamp } = await import('../src/interactions/springs.ts');
const { splitWords } = await import('../src/interactions/textSplit.ts');

test('FrameLoop starts on demand and removes tasks cleanly', () => {
  const loop = new FrameLoop();
  let calls = 0;
  const remove = loop.add(() => { calls += 1; });
  assert.equal(loop.active, true);
  remove();
  assert.equal(loop.active, false);
  assert.equal(calls, 0);
  loop.destroy();
});

test('ScrollState derives clamped progress from measured scene bounds', () => {
  const element = { getBoundingClientRect: () => ({ top: 0, height: 1600 }) };
  const state = new ScrollState(element);
  window.scrollY = 400;
  assert.equal(state.update().progress, 0.5);
  window.scrollY = 2400;
  window.dispatchEvent?.(new Event('scroll'));
  assert.equal(state.update().progress, 1);
  state.destroy();
  window.scrollY = 0;
});

test('MotionPreferences persists explicit modes and derives system mode', () => {
  const preferences = new MotionPreferences('test-effects');
  assert.equal(preferences.value, 'system');
  assert.equal(preferences.effective, 'full');
  preferences.set('reduced');
  assert.equal(preferences.value, 'reduced');
  assert.equal(preferences.effective, 'reduced');
  assert.equal(localStorage.getItem('test-effects'), 'reduced');
  preferences.destroy();
});

test('DeviceTier selects a documented capability tier', () => {
  const tier = DeviceTier.detect(window);
  assert.ok(['full', 'reduced', 'low'].includes(tier.name));
  assert.ok(tier.pixelRatio >= 1 && tier.pixelRatio <= 1.5);
});

test('AssetLoader reports an abort before loading a deferred asset', async () => {
  const loader = new AssetLoader();
  loader.abort();
  assert.deepEqual(await loader.image('/hero.png'), { url: '/hero.png', status: 'aborted' });
});

test('SceneDirector enters and destroys the registered scene', () => {
  const events = [];
  const director = new SceneDirector();
  director.register({ id: 'hero', enter: () => events.push('enter'), leave: () => events.push('leave'), destroy: () => events.push('destroy') });
  director.enter('hero');
  director.destroy();
  assert.deepEqual(events, ['enter', 'destroy']);
});

test('SignalCore produces a finite procedural order-token ribbon', () => {
  const signal = new SignalCore();
  signal.update({ progress: .5, pointer: { x: .2, y: -.1 }, reduced: false });
  assert.equal(signal.positionData.length, signal.segments * 2 * 2);
  assert.equal(signal.alphaData.length, signal.segments * 2);
  assert.ok([...signal.positionData].every(Number.isFinite));
  assert.ok([...signal.alphaData].every(Number.isFinite));
});

test('DampedSpring retargets and settles without overshooting its contract', () => {
  const spring = new DampedSpring(0, { stiffness: 190, damping: 28 });
  spring.setTarget(1);
  for (let index = 0; index < 180; index += 1) spring.step(16);
  assert.equal(spring.value, 1);
  assert.equal(spring.settled, true);
  spring.setTarget(0.25);
  for (let index = 0; index < 180; index += 1) spring.step(16);
  assert.equal(spring.value, 0.25);
});

test('identity utilities clamp masks, normalize pointer input, and split words predictably', () => {
  assert.equal(clamp(-1), 0);
  assert.equal(clamp(2), 1);
  assert.equal(clampMaskProgress(-0.4), 0);
  assert.equal(clampMaskProgress(1.4), 1);
  assert.deepEqual(splitWords('Motion should explain'), ['Motion', ' ', 'should', ' ', 'explain']);
  const sample = normalizePointer({ clientX: 50, clientY: 25 }, { left: 0, top: 0, width: 100, height: 50 });
  assert.deepEqual(sample, { x: 0, y: 0, pressure: 0, active: true, pointerType: 'unknown' });
});
