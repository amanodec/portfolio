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
  visualWorldKey: 'zestt-relay' | 'bollywood-wedding' | 'decision-clarity' | 'bikers-momentum';
  sourceNotes: readonly string[];
};

// Zestt facts were updated from AmanSharmaResume.pdf on 14 October 2026.
// Supporting projects retain the previously supplied portfolio facts.
export const projectRegistry: readonly ProjectRecord[] = [
  {
    slug: 'zestt',
    order: 1,
    title: 'Zestt',
    role: 'Founder build / full-stack product development',
    year: 'Apr 2026 — Present',
    stack: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'Supabase'],
    url: 'https://www.zestt.in/',
    summary: 'A full-stack restaurant ordering and management platform with QR-based menus, customer ordering, and role-based staff and admin workflows.',
    outcomes: [
      {
        label: 'Ownership',
        value: 'Conceived, designed, engineered, and deployed end to end.',
        verification: 'verified',
        source: 'AmanSharmaResume.pdf · Projects · Zestt; existing ownership narrative'
      },
      {
        label: 'Operating story',
        value: 'QR-based menus, customer ordering, and restaurant management workflows.',
        verification: 'verified',
        source: 'AmanSharmaResume.pdf · Projects · Zestt'
      },
      {
        label: 'Management and reporting',
        value: 'Role-based staff and admin interfaces, order management, access permissions, operational dashboards, analytics, and reporting.',
        verification: 'verified',
        source: 'AmanSharmaResume.pdf · Projects · Zestt'
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
    sourceNotes: ['AmanSharmaResume.pdf · Projects · Zestt', 'Existing ownership narrative', 'assets/zestt/guest-walkthrough.mp4']
  },
  {
    slug: 'wedding-save-the-date',
    order: 2,
    title: 'Save the Date',
    role: 'Personal project / wedding invitation',
    year: 'Family celebration',
    stack: ['Digital invitation'],
    url: 'https://save-the-date-md.netlify.app/',
    summary: 'A digital save-the-date for my sister’s wedding, styled with Bollywood romance, colour, and cinematic drama.',
    outcomes: [{ label: 'For', value: 'My sister’s wedding celebration.', verification: 'verified', source: 'Project owner description' }],
    palette: { base: '#4b1026', accent: '#d99a36', signal: '#f0c55b' },
    assets: [],
    altText: 'A Bollywood-inspired wedding invitation composition in deep maroon and gold.',
    visualWorldKey: 'bollywood-wedding',
    sourceNotes: ['Project link and description supplied by Aman']
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
