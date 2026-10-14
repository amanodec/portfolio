/** Deterministic choreography: native scroll is the timeline, never intercepted. */
export const clamp = (value: number, min = 0, max = 1) => Math.min(max, Math.max(min, value));
export const cue = (progress: number, start: number, end: number) => {
  const t = clamp((progress - start) / (end - start));
  return t * t * (3 - 2 * t);
};
export function compositionScore(progress: number) {
  const p = clamp(progress);
  return {
    release: cue(p, .08, .48),
    union: cue(p, .48, .76),
    resolve: cue(p, .72, .96),
    chapter: p < .3 ? 0 : p < .72 ? 1 : 2
  };
}
