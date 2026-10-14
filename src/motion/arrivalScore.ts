export const ARRIVAL_DURATION = 2100;
const bound = (value: number) => Math.max(0, Math.min(1, value));
const smooth = (value: number) => { const p = bound(value); return p * p * (3 - 2 * p); };
const cue = (p: number, start: number, end: number) => smooth((p - start) / (end - start));

export function shouldPlayArrival(state: { reduced: boolean; hidden: boolean; hash: string; scrollY: number; navigationType?: string }) {
  return !state.reduced && !state.hidden && (!state.hash || state.hash === '#home') && state.scrollY < 8 && state.navigationType !== 'back_forward';
}

/** A brief impact, a sweeping sheet, and a tiny settling overshoot. */
export function arrivalScore(milliseconds: number) {
  const p = bound(Number.isFinite(milliseconds) ? milliseconds / ARRIVAL_DURATION : 1);
  return {
    press: cue(p, 0, .16),
    fold: cue(p, .22, .78),
    land: cue(p, .68, .96),
    ink: cue(p, .72, .98),
    thread: cue(p, .12, .82),
    done: p === 1
  };
}

/** The one moving thread has the same coordinates as its resting, interactive counterpart. */
export function arrivalThread(target: string) {
  const numbers = target.match(/-?\d*\.?\d+(?:e[-+]?\d+)?/gi)?.map(Number);
  return numbers?.length === 12 && numbers.every(Number.isFinite) ? target : '';
}
