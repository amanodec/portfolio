import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import test from 'node:test';

const { experienceRegistry, getExperienceById, validateExperienceRegistry } = await import('../src/content/experience.ts');
const html = readFileSync(new URL('../index.html', import.meta.url), 'utf8');

test('experience registry is exactly three newest-to-oldest source records', () => {
  assert.deepEqual(validateExperienceRegistry(), []);
  assert.deepEqual(experienceRegistry.map(({ id }) => id), ['rain-platforms', 'superchat', 'fleapo']);
  assert.equal(getExperienceById('rain-platforms')?.end, null);
  assert.equal(getExperienceById('fleapo')?.start, '2022-01');
});

test('experience registry never publishes withheld metrics', () => {
  const publicCopy = JSON.stringify(experienceRegistry);
  assert.doesNotMatch(publicCopy, /\d+\s*%|\b\d+\s*\+|\b\d+\s*x\b/i);
  experienceRegistry.forEach((record) => {
    record.outcomes.forEach((outcome) => assert.equal(outcome.verification, 'conservative-source-wording'));
  });
});

test('experience markup preserves all role evidence and fallback anchors', () => {
  assert.equal((html.match(/data-experience-role="[^"]+"/g) || []).length, 3);
  assert.equal((html.match(/data-role-select="[^"]+"/g) || []).length, 3);
  assert.equal((html.match(/data-role-anchor="[^"]+"/g) || []).length, 3);
  assert.match(html, /id="playground"[^>]*data-phase="playground"/);
  assert.doesNotMatch(html.match(/<section[^>]*id="experience"[\s\S]*?<\/section>/i)?.[0] || '', /%|\b\d+\s*\+/);
});
