export type ExperienceVerification = 'conservative-source-wording';

export type ExperienceOutcome = {
  label: string;
  value: string;
  sourceRef: string;
  verification: ExperienceVerification;
};

export type ExperienceRecord = {
  id: string;
  order: number;
  company: string;
  location: string;
  title: string;
  dateLabel: string;
  start: string;
  end: string | null;
  responsibility: string;
  outcomes: readonly ExperienceOutcome[];
  technologies: readonly string[];
  accent: string;
  sourceRef: string;
  verification: ExperienceVerification;
};

const metricPattern = /(?:\d+\s*%|\b\d+\s*\+|\b\d+\s*x\b)/i;

export const experienceRegistry: readonly ExperienceRecord[] = [
  {
    id: 'rain-platforms',
    order: 1,
    company: 'Rain Platforms',
    location: 'Kolkata',
    title: 'Full-Stack Developer',
    dateLabel: 'Nov 2023 — Present',
    start: '2023-11',
    end: null,
    responsibility: 'Production frontend and payment-flow work for a P2P cryptocurrency platform.',
    outcomes: [
      {
        label: 'Role proof',
        value: 'Production dashboards, application state, and transaction-flow surfaces.',
        sourceRef: 'Phase 0 claim register / Rain Platforms',
        verification: 'conservative-source-wording'
      }
    ],
    technologies: ['Production dashboards', 'Application state', 'Payment/API flows'],
    accent: '#ff5a1f',
    sourceRef: 'docs/phase-0/content-and-claims.md · Rain Platforms',
    verification: 'conservative-source-wording'
  },
  {
    id: 'superchat',
    order: 2,
    company: 'Superchat',
    location: 'Remote',
    title: 'Software Developer Intern',
    dateLabel: 'Apr 2023 — Sep 2023',
    start: '2023-04',
    end: '2023-09',
    responsibility: 'Cross-browser extension and onboarding work.',
    outcomes: [
      {
        label: 'Role proof',
        value: 'AI assistant extension, authentication journeys, and Firebase routines.',
        sourceRef: 'Phase 0 claim register / Superchat',
        verification: 'conservative-source-wording'
      }
    ],
    technologies: ['Cross-browser extension', 'Authentication', 'Firebase'],
    accent: '#8d5cff',
    sourceRef: 'docs/phase-0/content-and-claims.md · Superchat',
    verification: 'conservative-source-wording'
  },
  {
    id: 'fleapo',
    order: 3,
    company: 'Fleapo',
    location: 'Kolkata',
    title: 'Frontend Developer Intern',
    dateLabel: 'Jan 2022 — Jun 2022',
    start: '2022-01',
    end: '2022-06',
    responsibility: 'Responsive React interface work.',
    outcomes: [
      {
        label: 'Role proof',
        value: 'Responsive interfaces built with React and vanilla CSS systems.',
        sourceRef: 'Phase 0 claim register / Fleapo',
        verification: 'conservative-source-wording'
      }
    ],
    technologies: ['React', 'Vanilla CSS', 'Responsive rendering'],
    accent: '#4169ff',
    sourceRef: 'docs/phase-0/content-and-claims.md · Fleapo',
    verification: 'conservative-source-wording'
  }
] as const;

export const experienceIds = experienceRegistry.map(({ id }) => id);

export function validateExperienceRegistry(records: readonly ExperienceRecord[] = experienceRegistry): string[] {
  const errors: string[] = [];
  if (records.length !== 3) errors.push('Expected exactly 3 experience records.');

  const ids = new Set<string>();
  records.forEach((record, index) => {
    if (ids.has(record.id)) errors.push(`Duplicate experience id: ${record.id}`);
    ids.add(record.id);
    if (record.order !== index + 1) errors.push(`Experience order must be chronological at ${record.id}.`);
    if (!record.company || !record.title || !record.dateLabel || !record.start) errors.push(`Incomplete experience record: ${record.id}`);
    if (!record.sourceRef || record.verification !== 'conservative-source-wording') errors.push(`Missing source status: ${record.id}`);
    if (!record.outcomes.length) errors.push(`Missing role evidence: ${record.id}`);
    if (!record.technologies.length) errors.push(`Missing technology/context labels: ${record.id}`);

    const publicText = [
      record.company,
      record.location,
      record.title,
      record.dateLabel,
      record.responsibility,
      ...record.outcomes.map(({ value }) => value),
      ...record.technologies
    ].join(' ');
    if (metricPattern.test(publicText)) errors.push(`Unverified metric in public experience copy: ${record.id}`);
    record.outcomes.forEach((outcome) => {
      if (!outcome.sourceRef || outcome.verification !== 'conservative-source-wording') errors.push(`Missing evidence source: ${record.id}/${outcome.label}`);
      if (metricPattern.test(`${outcome.label} ${outcome.value}`)) errors.push(`Unverified metric in evidence: ${record.id}/${outcome.label}`);
    });
  });

  for (let index = 1; index < records.length; index += 1) {
    if (records[index - 1].start < records[index].start) errors.push('Experience records must run newest to oldest.');
  }
  return errors;
}

export function getExperienceById(id: string, records: readonly ExperienceRecord[] = experienceRegistry) {
  return records.find((record) => record.id === id);
}

if (validateExperienceRegistry().length) {
  throw new Error(`Invalid experience registry: ${validateExperienceRegistry().join(' ')}`);
}
