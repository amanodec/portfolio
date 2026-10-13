export type PlaygroundExperimentId = 'elastic-type' | 'responsive-composition' | 'motion-curves';

export type PlaygroundExperiment = {
  id: PlaygroundExperimentId;
  index: string;
  label: string;
  title: string;
  summary: string;
  instruction: string;
  observation: string;
  utility: string;
  accent: string;
};

export const playgroundRegistry: readonly PlaygroundExperiment[] = [
  {
    id: 'elastic-type',
    index: '01',
    label: 'Pressure / response / return',
    title: 'Elastic type',
    summary: 'A word takes a bounded hit, then finds its readable baseline again.',
    instruction: 'Drag across the word, use the tension slider, or press the arrow keys. Release or reset to return to baseline.',
    observation: 'Motion should explain the order, not decorate it.',
    utility: 'PointerField + DampedSpring + splitText',
    accent: '#c8ff36'
  },
  {
    id: 'responsive-composition',
    index: '02',
    label: 'Hierarchy / constraint / re-compose',
    title: 'Responsive composition',
    summary: 'The frame gets narrower; the hierarchy changes instead of merely shrinking.',
    instruction: 'Drag the viewport boundary, use the slider, or choose a preset. The layout switches at real composition states.',
    observation: 'Responsive detail is a design decision, not a smaller desktop.',
    utility: 'createMaskController + CSS custom-property state',
    accent: '#8d5cff'
  },
  {
    id: 'motion-curves',
    index: '03',
    label: 'Direct / spring / cinematic',
    title: 'Motion curve lab',
    summary: 'The same object reaches the same destination with three different reasons for moving.',
    instruction: 'Choose a curve, replay it, pause it, or reset it. Compare the character, not just the duration.',
    observation: 'Timing has a reason: direct for utility, spring for response, cinematic for a reveal.',
    utility: 'DampedSpring + shared FrameLoop timing',
    accent: '#ff5a1f'
  }
] as const;

export const playgroundIds = playgroundRegistry.map(({ id }) => id);

export function validatePlaygroundRegistry(records: readonly PlaygroundExperiment[] = playgroundRegistry): string[] {
  const errors: string[] = [];
  if (records.length !== 3) errors.push('Expected exactly 3 playground experiments.');

  const ids = new Set<string>();
  records.forEach((experiment, index) => {
    if (ids.has(experiment.id)) errors.push(`Duplicate playground experiment id: ${experiment.id}`);
    ids.add(experiment.id);
    if (experiment.index !== String(index + 1).padStart(2, '0')) errors.push(`Playground index must be ordered at ${experiment.id}.`);
    if (!experiment.label || !experiment.title || !experiment.summary || !experiment.instruction || !experiment.observation) {
      errors.push(`Incomplete playground experiment: ${experiment.id}`);
    }
    if (!experiment.utility.includes('+') && !experiment.utility.includes('state')) {
      errors.push(`Missing utility mapping: ${experiment.id}`);
    }
    if (!/^#[0-9a-f]{6}$/i.test(experiment.accent)) errors.push(`Invalid accent: ${experiment.id}`);
  });

  return errors;
}

if (validatePlaygroundRegistry().length) {
  throw new Error(`Invalid playground registry: ${validatePlaygroundRegistry().join(' ')}`);
}
