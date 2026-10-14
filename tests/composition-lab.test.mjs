import { test } from 'node:test';
import assert from 'node:assert/strict';
import { advanceSpring, axis, movementBounds, rebuildLayout, releasePosition } from '../src/motion/labPhysics.ts';
import { createCompositionPrint } from '../src/motion/labPrint.ts';

const bounds = { minX: -70, maxX: 350, minY: -60, maxY: 240 };

test('a spring lands exactly and stops requesting animation frames', () => {
  const value = axis(0);
  value.target = 250;
  let active = true;
  for (let i = 0; i < 600 && active; i++) active = advanceSpring(value, 1 / 60);
  assert.equal(active, false);
  assert.equal(value.value, 250);
  assert.equal(value.velocity, 0);
});

test('spring integration is stable across slow frames and high refresh rates', () => {
  for (const dt of [1 / 144, 1 / 60, 1 / 20, 1]) {
    const value = axis(20);
    value.target = -150;
    value.velocity = 1200;
    for (let i = 0; i < 1200; i++) {
      advanceSpring(value, dt);
      assert.ok(Number.isFinite(value.value));
      assert.ok(Math.abs(value.value) < 1000);
    }
    assert.equal(value.value, -150);
  }
});

test('a flick carries its direction but cannot throw controls outside the composition', () => {
  const flick = releasePosition(200, 100, 1500, -1000, bounds, false);
  assert.equal(flick.x, bounds.maxX);
  assert.equal(flick.y, -20);
  assert.equal(flick.decisive, true);
  const extreme = releasePosition(0, 0, -100000, 100000, bounds, false);
  assert.equal(extreme.x, bounds.minX);
  assert.ok(extreme.y <= bounds.maxY);
});

test('a gentle release settles close to the hand and reduced motion removes inertia', () => {
  assert.deepEqual(releasePosition(100, 80, 0, 0, bounds, false), { x: 100, y: 80, decisive: false });
  assert.deepEqual(releasePosition(100, 80, 1800, -1800, bounds, true), { x: 100, y: 80, decisive: false });
});

test('movement bounds keep a complete control inside a small mobile canvas', () => {
  const box = movementBounds(280, 670, 98, 288, 134, 179, 36);
  for (const velocity of [-5000, 0, 5000]) {
    const result = releasePosition(0, 0, velocity, velocity, box, false);
    assert.ok(98 + result.x >= 36);
    assert.ok(98 + result.x + 134 <= 280 - 36);
    assert.ok(288 + result.y >= 36);
    assert.ok(288 + result.y + 179 <= 670 - 36);
  }
});

test('opposite gestures produce distinct reconstructions instead of resetting the composition', () => {
  const left = rebuildLayout(-.3, .8, false), right = rebuildLayout(.3, .8, false);
  assert.equal(left.reverse, false);
  assert.equal(right.reverse, true);
  assert.ok(right.titleX > right.cardX);
  assert.ok(left.titleX < left.cardX);
  assert.ok(left.rotation < 0 && right.rotation > 0);
});

test('reconstruction remains vertically arranged on mobile regardless of gesture direction', () => {
  for (const intent of [-1, 0, 1]) {
    const layout = rebuildLayout(intent, 1, true);
    assert.equal(layout.reverse, false);
    assert.ok(layout.titleY < layout.cardY);
    assert.ok(layout.titleX >= .06 && layout.titleX < .1);
    assert.ok(layout.cardX + .48 < 1);
  }
});

const print = { titleX: .07, titleY: .22, titleFont: .075, aspectRatio: 1.8, cardX: .64, cardY: .15, cardWidth: .26, rotation: -5, edition: 2, colour: 'vermilion' };
test('the downloadable print preserves colour and edition with no external resources', () => {
  const svg = createCompositionPrint({ ...print, colour: 'cobalt' });
  assert.match(svg, /composition 002/);
  assert.match(svg, /#3457b1/);
  assert.match(svg, /COMPOSED BY YOU/);
  assert.doesNotMatch(svg, /NaN|Infinity|<script|<image|href=/);
});

test('a mobile print receives a portrait canvas tall enough for the artwork', () => {
  const svg = createCompositionPrint({ ...print, aspectRatio: 340 / 670, cardX: .35, cardY: .43, cardWidth: .48, titleFont: .13 });
  const height = Number(svg.match(/viewBox="0 0 1400 (\d+)"/)[1]);
  const sceneHeight = height - 130;
  assert.ok(height > 2700);
  assert.ok(70 + .43 * sceneHeight + .48 * 1400 * 4 / 3 < height - 65);
});

test('invalid export geometry never introduces invalid numeric SVG attributes', () => {
  const svg = createCompositionPrint({ ...print, titleX: NaN, rotation: Infinity, aspectRatio: NaN });
  assert.doesNotMatch(svg, /NaN|Infinity/);
});
