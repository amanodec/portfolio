import { test } from 'node:test';
import assert from 'node:assert/strict';
import { compositionScore, cue } from '../src/motion/score.ts';

test('composition begins in structure and ends in a fully resolved composition', () => {
  assert.deepEqual(compositionScore(0), { release: 0, union: 0, resolve: 0, chapter: 0 });
  assert.deepEqual(compositionScore(1), { release: 1, union: 1, resolve: 1, chapter: 2 });
});

test('scrolling past either end cannot overshoot transforms or opacity', () => {
  assert.deepEqual(compositionScore(-3), compositionScore(0));
  assert.deepEqual(compositionScore(4), compositionScore(1));
});

test('feeling arrives before the aperture opens; the resolution follows the aperture', () => {
  const expressive = compositionScore(.48);
  assert.equal(expressive.release, 1);
  assert.equal(expressive.union, 0);
  assert.equal(expressive.resolve, 0);
  const opening = compositionScore(.72);
  assert.ok(opening.union > .9);
  assert.equal(opening.resolve, 0);
});

test('all cues are bounded and monotonic across the entire native scroll range', () => {
  let previous = compositionScore(0);
  for (let index = 1; index <= 1000; index++) {
    const current = compositionScore(index / 1000);
    for (const key of ['release', 'union', 'resolve']) {
      assert.ok(current[key] >= previous[key]);
      assert.ok(current[key] >= 0 && current[key] <= 1);
    }
    previous = current;
  }
});

test('reverse scrolling retraces the same composition without accumulated state', () => {
  const forward = Array.from({ length: 101 }, (_, i) => compositionScore(i / 100));
  for (let i = 100; i >= 0; i--) assert.deepEqual(compositionScore(i / 100), forward[i]);
});

test('cue boundaries ease in and out without a velocity jump', () => {
  assert.equal(cue(.08, .08, .48), 0);
  assert.equal(cue(.48, .08, .48), 1);
  assert.ok(cue(.0801, .08, .48) < .000001);
  assert.ok(1 - cue(.4799, .08, .48) < .000001);
});
