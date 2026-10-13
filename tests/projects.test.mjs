import assert from 'node:assert/strict';
import test from 'node:test';

globalThis.window = {};

const { projectRegistry, benchmarkProject } = await import('../src/content/projects.ts');
const { ProjectPortal } = await import('../src/scenes/projects/ProjectPortal.ts');
const { ProjectWorldEngine } = await import('../src/scenes/projects/ProjectWorldEngine.ts');

const fakeElement = () => {
  const values = new Map();
  return {
    dataset: {},
    style: { setProperty(name, value) { values.set(name, value); }, get(name) { return values.get(name); } }
  };
};

test('project registry keeps four factual records while exposing only Zestt as the benchmark world', () => {
  assert.deepEqual(projectRegistry.map((project) => project.slug), ['zestt', 'trading-leagues', 'decisionarc', 'vinayak-bikers']);
  assert.equal(benchmarkProject.slug, 'zestt');
  assert.equal(projectRegistry.filter((project) => project.assets.length > 0).length, 1);
  assert.equal(benchmarkProject.visualWorldKey, 'zestt-relay');
  assert.ok(benchmarkProject.sourceNotes.some((note) => note.includes('Phase 0')));
});

test('project portal maps progress to deterministic entry, signature, and proof states', () => {
  const element = fakeElement();
  const portal = new ProjectPortal(element);
  portal.setProgress(0.1);
  assert.equal(element.dataset.projectState, 'entry');
  assert.equal(element.style.get('--project-entry'), '0.3846');
  portal.setProgress(0.5);
  assert.equal(element.dataset.projectState, 'signature');
  portal.setProgress(1.4);
  assert.equal(element.dataset.projectState, 'proof');
  assert.equal(element.style.get('--project-progress'), '1.0000');
});

test('project world engine enters, updates, exits, and destroys a registered scene', () => {
  const events = [];
  const section = { dataset: { project: 'zestt' } };
  const scene = {
    project: { slug: 'zestt' },
    prepare: () => events.push('prepare'),
    enter: () => events.push('enter'),
    update: (progress) => events.push(`update:${progress}`),
    leave: () => events.push('leave'),
    suspend: () => events.push('suspend'),
    resume: () => events.push('resume'),
    destroy: () => events.push('destroy')
  };
  const engine = new ProjectWorldEngine({ section, frameLoop: {}, preferences: {}, renderer: {}, tier: {} });
  engine.register(scene);
  engine.enter('zestt');
  engine.update('zestt', 0.72);
  engine.exit('zestt');
  engine.destroy();
  assert.deepEqual(events, ['prepare', 'enter', 'update:0.72', 'leave', 'destroy']);
});
