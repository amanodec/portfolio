import assert from 'node:assert/strict';
import test from 'node:test';

const { playgroundIds, playgroundRegistry, validatePlaygroundRegistry } = await import('../src/content/playground.ts');
const { normalizeElasticInput, elasticScale } = await import('../src/experiments/ElasticType.ts');
const { clampCompositionWidth, getCompositionState } = await import('../src/experiments/ResponsiveComposition.ts');
const { curveDuration, curveModes, curveProgress } = await import('../src/experiments/MotionCurveLab.ts');

test('playground registry contains three ordered process experiments with utility mappings', () => {
  assert.deepEqual(validatePlaygroundRegistry(), []);
  assert.deepEqual(playgroundIds, ['elastic-type', 'responsive-composition', 'motion-curves']);
  assert.equal(playgroundRegistry.length, 3);
  playgroundRegistry.forEach((experiment) => assert.ok(experiment.utility));
});

test('elastic input stays bounded and returns a readable scale contract', () => {
  assert.equal(normalizeElasticInput(-3), -1);
  assert.equal(normalizeElasticInput(3), 1);
  assert.equal(elasticScale(0), 1);
  assert.ok(elasticScale(-1) > 1 && elasticScale(-1) < 1.12);
});

test('responsive composition uses real width states instead of only scaling', () => {
  assert.equal(clampCompositionWidth(100), 280);
  assert.equal(clampCompositionWidth(900), 760);
  assert.equal(getCompositionState(340), 'compact');
  assert.equal(getCompositionState(520), 'balanced');
  assert.equal(getCompositionState(720), 'wide');
});

test('motion lab exposes distinct shared timing choices', () => {
  assert.deepEqual(curveModes, ['direct', 'spring', 'cinematic']);
  assert.ok(curveDuration('direct') < curveDuration('spring'));
  const values = curveModes.map((mode) => curveProgress(mode, .5));
  assert.equal(new Set(values).size, 3);
  assert.equal(curveProgress('direct', 0), 0);
  assert.equal(curveProgress('cinematic', 1), 1);
});
