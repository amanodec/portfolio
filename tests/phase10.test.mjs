import assert from 'node:assert/strict';
import test from 'node:test';

const documentListeners = new Map();
let nextFrameId = 0;
const frames = new Map();

globalThis.document = {
  hidden: false,
  documentElement: { dataset: {} },
  addEventListener(type, listener) { documentListeners.set(type, listener); },
  removeEventListener(type) { documentListeners.delete(type); }
};
globalThis.window = {
  innerHeight: 800,
  innerWidth: 1440,
  scrollY: 0,
  devicePixelRatio: 1,
  navigator: { hardwareConcurrency: 8, deviceMemory: 8, connection: { saveData: false } },
  matchMedia: () => ({ matches: false, addEventListener() {}, removeEventListener() {} })
};
globalThis.requestAnimationFrame = (callback) => {
  const id = ++nextFrameId;
  frames.set(id, callback);
  return id;
};
globalThis.cancelAnimationFrame = (id) => frames.delete(id);

const { DeviceTier } = await import('../src/core/DeviceTier.ts');
const { FrameLoop } = await import('../src/core/FrameLoop.ts');
const { PerformanceGovernor } = await import('../src/core/PerformanceGovernor.ts');

const runNextFrame = (time) => {
  const entry = [...frames.entries()].at(-1);
  if (!entry) return;
  const [id, callback] = entry;
  frames.delete(id);
  callback(time);
};

test('FrameLoop resets elapsed time after a hidden-tab pause and reports observers', () => {
  const loop = new FrameLoop();
  const deltas = [];
  const removeObserver = loop.observe((delta) => deltas.push(delta));
  const removeTask = loop.add(() => undefined);
  runNextFrame(1000);
  runNextFrame(1016);
  assert.deepEqual(deltas, [0, 16]);

  document.hidden = true;
  documentListeners.get('visibilitychange')?.();
  document.hidden = false;
  documentListeners.get('visibilitychange')?.();
  runNextFrame(5000);
  assert.equal(deltas.at(-1), 0);
  assert.equal(loop.metrics.longFrames, 0);

  removeObserver();
  removeTask();
  loop.destroy();
});

test('PerformanceGovernor downgrades only after sustained misses and never oscillates', () => {
  const loop = new FrameLoop();
  let downgraded = 0;
  const governor = new PerformanceGovernor(loop, {
    consecutiveLongFrames: 3,
    onDowngrade: () => { downgraded += 1; }
  });
  const remove = loop.add(() => undefined);
  runNextFrame(1000);
  runNextFrame(1016);
  runNextFrame(1055);
  runNextFrame(1095);
  assert.equal(governor.state, 'stable');
  runNextFrame(1135);
  assert.equal(governor.state, 'degraded');
  runNextFrame(1175);
  assert.equal(downgraded, 1);
  remove();
  governor.destroy();
  loop.destroy();
});

test('DeviceTier uses supplied capability hints instead of global navigator state', () => {
  const constrainedWindow = {
    innerWidth: 390,
    navigator: { hardwareConcurrency: 2, deviceMemory: 2, connection: { saveData: true } },
    matchMedia: () => ({ matches: true })
  };
  const tier = DeviceTier.detect(constrainedWindow);
  assert.equal(tier.name, 'low');
  assert.equal(tier.pixelRatio, 1);
});
