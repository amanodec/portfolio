import { test } from 'node:test';
import assert from 'node:assert/strict';
import { chapterPosition, developerScore } from '../src/motion/developerScore.ts';

test('chapter navigation resolves the intended scene at its actual scroll anchor', () => {
  const anchors = [1800, 2510, 3290];
  for (let i = 0; i < anchors.length; i++) {
    const position = chapterPosition(anchors[i], anchors);
    assert.equal(position, i);
    assert.equal(developerScore(position).chapter, i);
  }
  assert.equal(developerScore(1).system, 1);
  assert.equal(developerScore(2).ownership, 1);
});

test('variable chapter heights interpolate without assuming uniform viewport lengths', () => {
  assert.equal(chapterPosition(150, [100, 200, 600]), .5);
  assert.equal(chapterPosition(400, [100, 200, 600]), 1.5);
  assert.equal(chapterPosition(-100, [100, 200, 600]), 0);
  assert.equal(chapterPosition(900, [100, 200, 600]), 2);
});

test('the interface resolves before expanding, and the system precedes ownership', () => {
  const refined = developerScore(.5);
  assert.equal(refined.detail, 1);
  assert.equal(refined.system, 0);
  const system = developerScore(1.3);
  assert.equal(system.system, 1);
  assert.equal(system.ownership, 0);
});

test('all visual channels stay bounded and reverse scroll retraces the same scene', () => {
  const forward = [];
  for (let i = 0; i <= 200; i++) {
    const score = developerScore(i / 100);
    forward.push(score);
    for (const key of ['detail', 'system', 'ownership', 'signal']) {
      assert.ok(score[key] >= 0 && score[key] <= 1);
      if (i) assert.ok(score[key] >= forward[i - 1][key]);
    }
  }
  for (let i = 200; i >= 0; i--) assert.deepEqual(developerScore(i / 100), forward[i]);
});

test('reduced motion uses complete snapshots with no intermediate geometry', () => {
  for (let i = 0; i <= 200; i++) {
    const score = developerScore(i / 100, true);
    assert.equal(score.detail, 1);
    assert.ok([0, 1].includes(score.system));
    assert.ok([0, 1].includes(score.ownership));
  }
});

test('re-measured anchors absorb upstream layout changes without changing the chapter', () => {
  const original = [500, 1100, 1900];
  const shifted = original.map(value => value + 640);
  assert.equal(chapterPosition(1350, original), chapterPosition(1990, shifted));
  assert.equal(chapterPosition(10, []), 0);
  assert.equal(chapterPosition(10, [10]), 0);
});
