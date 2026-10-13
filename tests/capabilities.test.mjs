import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import test from 'node:test';

const { capabilityRegistry, validateCapabilityRegistry } = await import('../src/content/capabilities.ts');
const html = readFileSync(new URL('../index.html', import.meta.url), 'utf8');

test('capability registry contains six verified layers and no invalid relationships', () => {
  assert.deepEqual(capabilityRegistry.map(({ id }) => id), [
    'interface',
    'motion',
    'architecture',
    'apis',
    'performance',
    'accessibility'
  ]);
  assert.deepEqual(validateCapabilityRegistry(), []);
  const payments = capabilityRegistry.find(({ id }) => id === 'apis');
  assert.ok(payments?.evidence.some(({ sourceId }) => sourceId === 'rain-platforms'));
  assert.ok(!payments?.evidence.some(({ sourceId, statement }) => sourceId === 'zestt' && /payment|merchant|withdrawal|deposit/i.test(statement) && !/does not imply|not by|no payment/i.test(statement)));
});

test('capability validation rejects duplicate and unsupported evidence', () => {
  const duplicateErrors = validateCapabilityRegistry([...capabilityRegistry, capabilityRegistry[0]]);
  assert.ok(duplicateErrors.some((error) => error.includes('Duplicate capability')));
  assert.ok(duplicateErrors.some((error) => error.includes('Duplicate evidence')));

  const invalid = {
    ...capabilityRegistry[0],
    evidence: [{ ...capabilityRegistry[0].evidence[0], id: 'invalid-source', sourceId: 'made-up' }]
  };
  assert.ok(validateCapabilityRegistry([invalid]).some((error) => error.includes('Unsupported evidence source')));

  const inflatedApi = {
    ...capabilityRegistry.find(({ id }) => id === 'apis'),
    evidence: [{
      ...capabilityRegistry.find(({ id }) => id === 'apis').evidence.find(({ sourceId }) => sourceId === 'zestt'),
      statement: 'Zestt handles merchant payments and withdrawals.'
    }]
  };
  assert.ok(validateCapabilityRegistry([inflatedApi]).some((error) => error.includes('must not be attributed to Zestt')));
  assert.ok(validateCapabilityRegistry(capabilityRegistry.slice(0, -1)).some((error) => error.includes('Expected exactly 6')));
});

test('semantic capability markup mirrors every typed evidence statement and source reference', () => {
  capabilityRegistry.forEach((record) => {
    assert.match(html, new RegExp(`data-capability-select="${record.id}"`));
    assert.match(html, new RegExp(`data-capability-evidence="${record.id}"`));
    assert.match(html, new RegExp(`<h3>${record.label}</h3>`));
    record.evidence.forEach((evidence) => {
      assert.ok(html.includes(evidence.sourceLabel), `${record.id} is missing ${evidence.sourceLabel}`);
      assert.ok(html.includes(evidence.statement), `${record.id} is missing evidence statement ${evidence.id}`);
      assert.ok(html.includes(evidence.sourceRef), `${record.id} is missing source reference ${evidence.id}`);
    });
  });
});
