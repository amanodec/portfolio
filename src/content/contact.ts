export const contactContent = {
  email: 'amansharmaofficial27@gmail.com',
  location: 'Kolkata, India · available remotely',
  availability: 'Open to thoughtful product work and difficult interface problems.',
  responseTime: 'I usually reply within one business day.',
  philosophy: [
    'Motion should explain, not decorate it.',
    'A difficult interaction should feel effortless.'
  ],
  fields: ['name', 'email', 'project', 'timeline', 'stage', 'budget', 'message'] as const
} as const;

export type ContactFieldName = typeof contactContent.fields[number];

export function validateContactContent(content = contactContent): string[] {
  const errors: string[] = [];
  if (!content.email.includes('@')) errors.push('Contact email must be valid.');
  if (content.philosophy.length !== 2) errors.push('Quiet scene needs exactly two philosophy statements.');
  if (content.fields.length !== 7) errors.push('Contact form needs seven approved fields.');
  if (!content.location || !content.availability || !content.responseTime) errors.push('Contact details are incomplete.');
  return errors;
}

if (validateContactContent().length) {
  throw new Error(`Invalid contact content: ${validateContactContent().join(' ')}`);
}
