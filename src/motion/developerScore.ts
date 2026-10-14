const clamp = (value: number, min = 0, max = 1) => Math.min(max, Math.max(min, value));
const ease = (value: number, start: number, end: number) => {
  const t = clamp((value - start) / (end - start));
  return t * t * (3 - 2 * t);
};

/** Map actual chapter positions, so wrapping, expanded details, and phone layouts stay in sync. */
export function chapterPosition(scroll: number, anchors: readonly number[]): number {
  if (anchors.length < 2 || scroll <= anchors[0]) return 0;
  for (let i = 0; i < anchors.length - 1; i++) {
    if (scroll < anchors[i + 1]) return i + clamp((scroll - anchors[i]) / Math.max(1, anchors[i + 1] - anchors[i]));
  }
  return anchors.length - 1;
}

export function developerScore(position: number, reduced = false) {
  const p = clamp(position, 0, 2);
  const chapter = p < .65 ? 0 : p < 1.55 ? 1 : 2;
  if (reduced) return { chapter, detail: 1, system: chapter >= 1 ? 1 : 0, ownership: chapter === 2 ? 1 : 0, signal: chapter === 1 ? .65 : 0 };
  return {
    chapter,
    detail: ease(p, 0, .42),
    system: ease(p, .62, 1),
    ownership: ease(p, 1.48, 1.95),
    signal: ease(p, .8, 1.45)
  };
}
