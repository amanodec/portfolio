export const clampPull = (value: number) => Number.isFinite(value) ? Math.min(1, Math.max(0, value)) : 0;

/** A deliberate pull opens the study; a small movement returns to its starting state. */
export function releasePull(progress: number, wasOpen: boolean): boolean {
  return clampPull(progress) >= (wasOpen ? .42 : .58);
}

export function orderSummary(quantity: number) {
  const count = Number.isFinite(quantity) ? Math.min(9, Math.max(0, Math.floor(quantity))) : 0;
  return { count, total: count * 180, label: count ? `${count} ${count === 1 ? 'good decision' : 'good decisions'}.` : 'Your next good decision.' };
}

/** The same tension drives the connecting thread and the separated page layers. */
export function filamentPath(progress: number, endX: number, endY: number): string {
  const p = clampPull(progress);
  return `M 100 310 C ${180 - p * 60} ${510 - p * 150}, ${370 + p * 90} ${80 + p * 120}, 610 ${295 - p * 65} S ${940 - p * 100} ${535 - p * 110}, ${endX} ${endY}`;
}
