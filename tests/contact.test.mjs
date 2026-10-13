import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import test from 'node:test';

const { contactContent, validateContactContent } = await import('../src/content/contact.ts');
const { buildMailto } = await import('../src/forms/ContactForm.ts');
const { countCompletedFields } = await import('../src/forms/ContactTransmission.ts');
const html = readFileSync(new URL('../index.html', import.meta.url), 'utf8');

test('contact content preserves the approved quiet statements and seven field contract', () => {
  assert.deepEqual(validateContactContent(), []);
  assert.equal(contactContent.philosophy.length, 2);
  assert.deepEqual(contactContent.fields, ['name', 'email', 'project', 'timeline', 'stage', 'budget', 'message']);
  assert.equal((html.match(/data-contact-field="[^"]+"/g) || []).length, 7);
  assert.equal((html.match(/data-philosophy-statement/g) || []).length, 2);
});

test('mailto construction encodes every user value and never claims delivery', () => {
  const mailto = buildMailto({
    name: 'A & B',
    email: 'hello@example.com',
    project: 'Web or mobile product',
    timeline: '1–2 months',
    stage: 'Idea / brief',
    budget: '₹1L–₹3L',
    message: 'A line with spaces & symbols.'
  });
  assert.match(mailto, /^mailto:amansharmaofficial27@gmail\.com\?subject=/);
  assert.match(mailto, /%26/);
  assert.ok(!mailto.includes('A & B'));
  assert.ok(!mailto.includes('sent') && !mailto.includes('delivered'));
});

test('transmission progress only counts non-empty valid required fields', () => {
  assert.equal(countCompletedFields([
    { required: true, value: 'Aman', valid: true },
    { required: true, value: 'bad-email', valid: false },
    { required: true, value: '', valid: false },
    { required: true, value: 'Flexible', valid: true }
  ]), 2);
});

test('quiet and contact markup keeps decorative layers out of the semantic form', () => {
  assert.match(html, /id="philosophy"[^>]*data-phase="quiet"/);
  assert.match(html, /id="contact"[^>]*data-phase="contact"/);
  assert.match(html, /<svg class="contact-transmission"[^>]*aria-hidden="true"/);
  assert.match(html, /<svg class="contact-monogram"[^>]*aria-hidden="true"/);
  assert.match(html, /href="mailto:amansharmaofficial27@gmail\.com"/);
  assert.match(html, /data-local-time/);
});
