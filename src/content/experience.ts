export type ExperienceVerification = 'conservative-source-wording' | 'resume-supplied';

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
    id: 'tlx-labs',
    order: 1,
    company: 'TLX Labs',
    location: 'Remote',
    title: 'Full-Stack Developer',
    dateLabel: 'Nov 2023 to Present',
    start: '2023-11',
    end: null,
    responsibility: 'Led frontend development of Tylt from 0 to 1 within a four-engineer team, mentoring three Flutter developers in React development.',
    outcomes: [
      {
        label: 'Role proof',
        value: 'React application architecture, Redux-based state management, routing, KYC/KYB workflows, and administrative dashboards.',
        sourceRef: 'AmanSharmaResume.pdf · Work Experience · TLX Labs',
        verification: 'resume-supplied'
      },
      {
        label: 'Merchant integration',
        value: 'Primary technical point of contact for 15+ merchant integrations, covering API integration, technical onboarding, coordination, and troubleshooting.',
        sourceRef: 'AmanSharmaResume.pdf · Work Experience · TLX Labs',
        verification: 'resume-supplied'
      },
      {
        label: 'Exchange workflows',
        value: 'Merchant-facing integrations and deposit/withdrawal workflows for a cryptocurrency exchange platform.',
        sourceRef: 'AmanSharmaResume.pdf · Work Experience · TLX Labs',
        verification: 'resume-supplied'
      }
    ],
    technologies: ['React', 'Redux', 'REST APIs', 'KYC/KYB', 'Payment and merchant onboarding'],
    accent: '#ff5a1f',
    sourceRef: 'AmanSharmaResume.pdf · Work Experience · TLX Labs',
    verification: 'resume-supplied'
  },
  {
    id: 'superchat',
    order: 2,
    company: 'Superchat',
    location: 'Remote',
    title: 'Software Developer Intern',
    dateLabel: 'Apr 2023 to Sep 2023',
    start: '2023-04',
    end: '2023-09',
    responsibility: 'Led development of an AI-powered browser extension with cross-browser compatibility.',
    outcomes: [
      {
        label: 'Role proof',
        value: 'ChatGPT authentication and functionality, user onboarding, and Firebase Cloud Functions for backend operations.',
        sourceRef: 'AmanSharmaResume.pdf · Work Experience · Superchat',
        verification: 'resume-supplied'
      }
    ],
    technologies: ['Cross-browser extension', 'ChatGPT integration', 'Authentication', 'Firebase Cloud Functions'],
    accent: '#8d5cff',
    sourceRef: 'AmanSharmaResume.pdf · Work Experience · Superchat',
    verification: 'resume-supplied'
  },
  {
    id: 'fleapo',
    order: 3,
    company: 'Fleapo',
    location: 'Kolkata',
    title: 'Frontend Developer Intern',
    dateLabel: 'Jan 2022 to Jun 2022',
    start: '2022-01',
    end: '2022-06',
    responsibility: 'Developed responsive web interfaces using React, JavaScript, and CSS.',
    outcomes: [
      {
        label: 'Role proof',
        value: 'Resolved browser compatibility and frontend performance issues, optimizing rendering and improving the user experience.',
        sourceRef: 'AmanSharmaResume.pdf · Work Experience · Fleapo',
        verification: 'resume-supplied'
      }
    ],
    technologies: ['React', 'JavaScript', 'CSS', 'Responsive rendering'],
    accent: '#4169ff',
    sourceRef: 'AmanSharmaResume.pdf · Work Experience · Fleapo',
    verification: 'resume-supplied'
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
    if (!record.sourceRef || !['conservative-source-wording', 'resume-supplied'].includes(record.verification)) errors.push(`Missing source status: ${record.id}`);
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
    if (metricPattern.test(publicText) && record.verification !== 'resume-supplied') errors.push(`Unverified metric in public experience copy: ${record.id}`);
    record.outcomes.forEach((outcome) => {
      if (!outcome.sourceRef || !['conservative-source-wording', 'resume-supplied'].includes(outcome.verification)) errors.push(`Missing evidence source: ${record.id}/${outcome.label}`);
      if (metricPattern.test(`${outcome.label} ${outcome.value}`) && outcome.verification !== 'resume-supplied') errors.push(`Unverified metric in evidence: ${record.id}/${outcome.label}`);
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
