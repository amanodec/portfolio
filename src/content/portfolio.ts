export const portfolio = {
  hero: {
    kicker: 'ZESTT / PRODUCT BENCHMARK',
    title: 'ZESTT',
    attribution: 'built by Aman Sharma',
    summary: 'A guided dine-in ordering system that turns a guest’s next choice into a clear restaurant handoff.',
    proof: ['Guest choice', 'Calm operations', 'No payment implied']
  },
  navigation: [
    { label: 'Index', href: '#hero' },
    { label: 'Zestt', href: '#zestt' },
    { label: 'Work', href: '#projects' },
    { label: 'Capabilities', href: '#skills' },
    { label: 'About', href: '#identity' },
    { label: 'Contact', href: '#contact' }
  ],
  identity: {
    title: 'I care about the moment between a guest’s choice and the system’s response.',
    lede: 'The best systems disappear into the moment they make possible: a menu feels obvious, a state feels trustworthy, and a difficult operational handoff feels effortless.',
    split: {
      visual: 'Make the next moment feel inevitable.',
      engineering: 'Make the underlying system trustworthy.',
      midpoint: 'Motion should explain the order, not decorate it.'
    }
  },
  effects: {
    storageKey: 'zestt-phase1-effects'
  }
} as const;
