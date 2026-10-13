export const capabilityIds = [
  'interface',
  'motion',
  'architecture',
  'apis',
  'performance',
  'accessibility'
] as const;

export type CapabilityId = typeof capabilityIds[number];

export type CapabilitySourceId =
  | 'zestt'
  | 'rain-platforms'
  | 'trading-leagues'
  | 'decisionarc'
  | 'vinayak-bikers'
  | 'superchat'
  | 'fleapo'
  | 'portfolio';

export type CapabilityEvidence = {
  id: string;
  sourceId: CapabilitySourceId;
  sourceLabel: string;
  statement: string;
  sourceStatus: 'verified';
  sourceRef: string;
};

export type CapabilityRecord = {
  id: CapabilityId;
  index: string;
  label: string;
  shortLabel: string;
  description: string;
  accent: string;
  evidence: readonly CapabilityEvidence[];
};

const sourceIds = new Set<CapabilityEvidence['sourceId']>([
  'zestt',
  'rain-platforms',
  'trading-leagues',
  'decisionarc',
  'vinayak-bikers',
  'superchat',
  'fleapo',
  'portfolio'
]);

export const capabilityRegistry: readonly CapabilityRecord[] = [
  {
    id: 'interface',
    index: '01',
    label: 'Interface',
    shortLabel: 'Clear surfaces',
    description: 'Responsive interface systems that make the next decision obvious across guest, operator, and professional workflows.',
    accent: '#ff5a1f',
    evidence: [
      { id: 'interface-zestt', sourceId: 'zestt', sourceLabel: 'Zestt', statement: 'Guest choice, order review, and restaurant service are held together as one readable interaction path.', sourceStatus: 'verified', sourceRef: 'Phase 0 copy deck / Zestt product narrative' },
      { id: 'interface-rain', sourceId: 'rain-platforms', sourceLabel: 'Rain Platforms', statement: 'Production dashboards and transaction states were built around clear feedback and usable application state.', sourceStatus: 'verified', sourceRef: 'Existing professional journey record' },
      { id: 'interface-trading', sourceId: 'trading-leagues', sourceLabel: 'Trading Leagues', statement: 'Leaderboard and routing work is represented through a bounded, legible project-world treatment.', sourceStatus: 'verified', sourceRef: 'Phase 4 project registry / approved world contract' },
      { id: 'interface-superchat', sourceId: 'superchat', sourceLabel: 'Superchat', statement: 'Cross-browser extension and authentication journeys were shaped for fast, understandable onboarding.', sourceStatus: 'verified', sourceRef: 'Existing professional journey record' },
      { id: 'interface-fleapo', sourceId: 'fleapo', sourceLabel: 'Fleapo', statement: 'Responsive React interfaces were delivered with consistent rendering across modern mobile engines.', sourceStatus: 'verified', sourceRef: 'Existing professional journey record' }
    ]
  },
  {
    id: 'motion',
    index: '02',
    label: 'Motion',
    shortLabel: 'Meaningful timing',
    description: 'Motion is treated as state communication: it guides attention, exposes change, and settles back into a readable frame.',
    accent: '#c8ff36',
    evidence: [
      { id: 'motion-zestt', sourceId: 'zestt', sourceLabel: 'Zestt', statement: 'The order relay gives the guest-to-restaurant handoff one continuous visual rhythm without recreating product UI.', sourceStatus: 'verified', sourceRef: 'Phase 4 project-world contract' },
      { id: 'motion-trading', sourceId: 'trading-leagues', sourceLabel: 'Trading Leagues', statement: 'Velocity, ranking movement, and proof lock are expressed as a bounded interaction language.', sourceStatus: 'verified', sourceRef: 'Phase 4 velocity storyboard' },
      { id: 'motion-decisionarc', sourceId: 'decisionarc', sourceLabel: 'DecisionArc', statement: 'Branching paths grow and prune toward one clear route rather than adding motion for decoration.', sourceStatus: 'verified', sourceRef: 'Phase 4 branching storyboard' },
      { id: 'motion-portfolio', sourceId: 'portfolio', sourceLabel: 'This portfolio', statement: 'The shared Signal, project match cuts, reduced-motion states, and spring utilities are implemented as reusable runtime behavior.', sourceStatus: 'verified', sourceRef: 'Current portfolio runtime / Phase 1–4 implementation' }
    ]
  },
  {
    id: 'architecture',
    index: '03',
    label: 'Architecture',
    shortLabel: 'Reusable structure',
    description: 'Component, state, and rendering boundaries that let a product grow without making every interaction a one-off.',
    accent: '#4169ff',
    evidence: [
      { id: 'architecture-zestt', sourceId: 'zestt', sourceLabel: 'Zestt', statement: 'React, Next.js, TypeScript, Node API, and MySQL support a two-sided ordering system.', sourceStatus: 'verified', sourceRef: 'Phase 4 project registry / Zestt source notes' },
      { id: 'architecture-rain', sourceId: 'rain-platforms', sourceLabel: 'Rain Platforms', statement: 'Production dashboards, application state, and transaction flows were maintained inside a live fintech product.', sourceStatus: 'verified', sourceRef: 'Existing professional journey record' },
      { id: 'architecture-trading', sourceId: 'trading-leagues', sourceLabel: 'Trading Leagues', statement: 'The approved project record identifies Next.js, TypeScript, and REST as the working stack.', sourceStatus: 'verified', sourceRef: 'Phase 4 project registry' },
      { id: 'architecture-superchat', sourceId: 'superchat', sourceLabel: 'Superchat', statement: 'Authentication journeys and secure Firebase routines supported a cross-browser assistant extension.', sourceStatus: 'verified', sourceRef: 'Existing professional journey record' }
    ]
  },
  {
    id: 'apis',
    index: '04',
    label: 'APIs',
    shortLabel: 'Reliable handoffs',
    description: 'Data and integration flows are made visible, resilient, and honest about the states a user can actually reach.',
    accent: '#8d5cff',
    evidence: [
      { id: 'apis-rain', sourceId: 'rain-platforms', sourceLabel: 'Rain Platforms', statement: 'Merchant, deposit, and withdrawal integrations are the verified payment/API evidence in the portfolio.', sourceStatus: 'verified', sourceRef: 'Existing professional journey record' },
      { id: 'apis-zestt', sourceId: 'zestt', sourceLabel: 'Zestt', statement: 'The guest-to-restaurant story is supported by a Node API and MySQL-backed product narrative; it does not imply payment capability.', sourceStatus: 'verified', sourceRef: 'Phase 4 project registry / explicit Zestt boundary' },
      { id: 'apis-superchat', sourceId: 'superchat', sourceLabel: 'Superchat', statement: 'Secure Firebase routines are part of the verified assistant-extension implementation record.', sourceStatus: 'verified', sourceRef: 'Existing professional journey record' }
    ]
  },
  {
    id: 'performance',
    index: '05',
    label: 'Performance',
    shortLabel: 'Fast by design',
    description: 'Loading, rendering, structured data, and technical SEO are treated as product quality rather than a final polish pass.',
    accent: '#f2b84b',
    evidence: [
      { id: 'performance-rain', sourceId: 'rain-platforms', sourceLabel: 'Rain Platforms', statement: 'Production frontend work included screen-load and payment-flow concerns.', sourceStatus: 'verified', sourceRef: 'Phase 0 claim register / conservative Rain Platforms wording' },
      { id: 'performance-decisionarc', sourceId: 'decisionarc', sourceLabel: 'DecisionArc', statement: 'The approved project summary centers clarity and fast mobile rendering.', sourceStatus: 'verified', sourceRef: 'Phase 4 project registry' },
      { id: 'performance-vinayak', sourceId: 'vinayak-bikers', sourceLabel: 'Vinayak Bikers', statement: 'Structured data and local discovery are the verified performance/SEO scope for the project.', sourceStatus: 'verified', sourceRef: 'Phase 4 project registry' },
      { id: 'performance-fleapo', sourceId: 'fleapo', sourceLabel: 'Fleapo', statement: 'Consistent rendering across modern mobile engines is part of the verified role record.', sourceStatus: 'verified', sourceRef: 'Existing professional journey record' }
    ]
  },
  {
    id: 'accessibility',
    index: '06',
    label: 'Accessibility',
    shortLabel: 'Nothing hidden',
    description: 'Semantic structure, focus, readable fallbacks, and reduced-motion parity keep the experience usable beyond its spectacle layer.',
    accent: '#77c7b1',
    evidence: [
      { id: 'accessibility-portfolio', sourceId: 'portfolio', sourceLabel: 'This portfolio', statement: 'Semantic proof, keyboard navigation, visible focus, reduced-motion parity, and no-JavaScript reading paths are implemented.', sourceStatus: 'verified', sourceRef: 'Current portfolio runtime / QA contract' },
      { id: 'accessibility-zestt', sourceId: 'zestt', sourceLabel: 'Zestt case study', statement: 'The Zestt world keeps product proof outside the decorative canvas and labels unavailable media honestly.', sourceStatus: 'verified', sourceRef: 'Phase 4 accessibility and fallback contract' },
      { id: 'accessibility-fleapo', sourceId: 'fleapo', sourceLabel: 'Fleapo', statement: 'Responsive interface work is recorded with consistent rendering across modern mobile engines.', sourceStatus: 'verified', sourceRef: 'Existing professional journey record' }
    ]
  }
] as const;

export function validateCapabilityRegistry(records: readonly CapabilityRecord[] = capabilityRegistry): string[] {
  const errors: string[] = [];
  const ids = new Set<string>();
  const evidenceIds = new Set<string>();
  const expectedIds = new Set<string>(capabilityIds);

  if (records.length !== capabilityIds.length) {
    errors.push(`Expected exactly ${capabilityIds.length} capabilities, received ${records.length}.`);
  }

  records.forEach((record, recordIndex) => {
    if (!expectedIds.has(record.id)) errors.push(`Unsupported capability: ${record.id}`);
    if (ids.has(record.id)) errors.push(`Duplicate capability: ${record.id}`);
    ids.add(record.id);
    if (!record.label || !record.description || !record.evidence.length) errors.push(`Incomplete capability: ${record.id}`);
    if (record.index !== String(recordIndex + 1).padStart(2, '0')) errors.push(`Capability index must be ${String(recordIndex + 1).padStart(2, '0')}: ${record.id}`);
    if (!/^#[0-9a-f]{6}$/i.test(record.accent)) errors.push(`Capability accent must be a hex color: ${record.id}`);
    record.evidence.forEach((evidence) => {
      if (evidenceIds.has(evidence.id)) errors.push(`Duplicate evidence: ${evidence.id}`);
      evidenceIds.add(evidence.id);
      if (!sourceIds.has(evidence.sourceId)) errors.push(`Unsupported evidence source: ${evidence.sourceId}`);
      if (!evidence.statement || !evidence.sourceRef || evidence.sourceStatus !== 'verified') errors.push(`Unverified evidence: ${evidence.id}`);
      if (record.id === 'apis' && evidence.sourceId === 'zestt' && /payment|merchant|withdrawal|deposit/i.test(evidence.statement) && !/does not imply|not by|no payment/i.test(evidence.statement)) {
        errors.push(`Payment/API evidence must not be attributed to Zestt: ${evidence.id}`);
      }
    });
  });

  return errors;
}

const validationErrors = validateCapabilityRegistry();
if (validationErrors.length) throw new Error(`Capability registry is invalid: ${validationErrors.join('; ')}`);
