export type ProjectVerification = 'verified' | 'aman-confirmation-required';

export type ProjectAsset = {
  kind: 'video';
  src: string;
  label: string;
  alt: string;
};

export type ProjectOutcome = {
  label: string;
  value: string;
  verification: ProjectVerification;
  source: string;
};

export type ProjectRecord = {
  slug: string;
  order: number;
  title: string;
  role: string;
  year: string;
  stack: readonly string[];
  url: string;
  summary: string;
  outcomes: readonly ProjectOutcome[];
  palette: {
    base: string;
    accent: string;
    signal: string;
  };
  assets: readonly ProjectAsset[];
  altText: string;
  visualWorldKey: 'zestt-relay' | 'trading-velocity' | 'decision-clarity' | 'bikers-momentum';
  sourceNotes: readonly string[];
};

// Phase 0 approved Zestt as the benchmark and primary visual subject. Phase 4
// keeps that order while giving every project the same factual metadata
// contract. Unverified metrics stay explicitly unpublished.
export const projectRegistry: readonly ProjectRecord[] = [
  {
    slug: 'zestt',
    order: 1,
    title: 'Zestt',
    role: 'Founder build / product engineering',
    year: 'Independent build',
    stack: ['React', 'Next.js', 'TypeScript', 'Node API', 'MySQL'],
    url: 'https://zestt.in',
    summary: 'A guided dine-in ordering system that turns a guest’s next choice into a clear restaurant handoff.',
    outcomes: [
      {
        label: 'Ownership',
        value: 'Conceived, designed, engineered, and deployed end to end.',
        verification: 'verified',
        source: 'Phase 0 copy deck / existing Zestt case-study copy'
      },
      {
        label: 'Operating story',
        value: 'Guest choice → order review → restaurant service.',
        verification: 'verified',
        source: 'Existing Zestt product narrative'
      }
    ],
    palette: { base: '#e8e1d3', accent: '#b5532f', signal: '#ff5a1f' },
    assets: [
      {
        kind: 'video',
        src: 'assets/zestt/guest-walkthrough.mp4',
        label: 'Guest-experience recording',
        alt: 'Supplied Zestt guest-experience recording; optional source footage, not a recreated interface.'
      }
    ],
    altText: 'Abstract Zestt relay environment showing a guest choice moving toward restaurant operations.',
    visualWorldKey: 'zestt-relay',
    sourceNotes: ['Phase 0 approved benchmark decision', 'Existing index.html Zestt narrative', 'assets/zestt/guest-walkthrough.mp4']
  },
  {
    slug: 'trading-leagues',
    order: 2,
    title: 'Trading Leagues',
    role: 'Frontend project work',
    year: '2024',
    stack: ['Next.js', 'TypeScript', 'REST'],
    url: 'https://tradingleagues.app',
    summary: 'Dynamic leaderboards and routing for a venture-backed fantasy gaming platform.',
    outcomes: [{ label: 'Outcome status', value: 'No verified metric published yet.', verification: 'aman-confirmation-required', source: 'Existing project index; Aman confirmation required' }],
    palette: { base: '#151c35', accent: '#4169ff', signal: '#ff5a1f' },
    assets: [],
    altText: 'Decorative Trading Leagues scoreboard world showing velocity settling into proof.',
    visualWorldKey: 'trading-velocity',
    sourceNotes: ['Existing project index', 'Phase 4 world uses decorative domain art; authentic media not supplied']
  },
  {
    slug: 'decisionarc',
    order: 3,
    title: 'DecisionArc',
    role: 'Frontend project work',
    year: 'Year not recorded in approved source package',
    stack: ['React', 'Performance'],
    url: 'https://decisionarc.in',
    summary: 'A professional-services presence designed for clarity and fast mobile rendering.',
    outcomes: [{ label: 'Outcome status', value: 'No verified metric published yet.', verification: 'aman-confirmation-required', source: 'Existing project index; Aman confirmation required' }],
    palette: { base: '#e6e2da', accent: '#1f3430', signal: '#ff5a1f' },
    assets: [],
    altText: 'Decorative DecisionArc branch field pruning into one clear route.',
    visualWorldKey: 'decision-clarity',
    sourceNotes: ['Existing project index', 'Phase 4 world uses decorative domain art; authentic media not supplied']
  },
  {
    slug: 'vinayak-bikers',
    order: 4,
    title: 'Vinayak Bikers',
    role: 'Frontend project work',
    year: 'Year not recorded in approved source package',
    stack: ['HTML', 'CSS', 'SEO'],
    url: 'https://www.vinayakbikers.com',
    summary: 'Local discovery engineered through structured data and a fast, purposeful experience.',
    outcomes: [{ label: 'Outcome status', value: 'No verified metric published yet.', verification: 'aman-confirmation-required', source: 'Existing project index; Aman confirmation required' }],
    palette: { base: '#111317', accent: '#d18b36', signal: '#ff5a1f' },
    assets: [],
    altText: 'Decorative Vinayak Bikers road ribbon settling into search and local-visit markers.',
    visualWorldKey: 'bikers-momentum',
    sourceNotes: ['Existing project index', 'Phase 4 world uses decorative domain art; authentic media not supplied']
  }
];

export const benchmarkProject = projectRegistry[0];
