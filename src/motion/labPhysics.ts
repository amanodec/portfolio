export type Axis = { value: number; target: number; velocity: number };
export type Bounds = { minX: number; maxX: number; minY: number; maxY: number };
export const limit = (value: number, min: number, max: number) => Math.min(max, Math.max(min, value));
export const axis = (value = 0): Axis => ({ value, target: value, velocity: 0 });

/** Substeps keep the same damped response stable on slow frames and fast displays. */
export function advanceSpring(state: Axis, seconds: number, stiffness = 180, damping = 23): boolean {
  let remaining = Math.min(Math.max(seconds, 0), .05);
  while (remaining > 0) {
    const dt = Math.min(remaining, 1 / 120);
    state.velocity += ((state.target - state.value) * stiffness - state.velocity * damping) * dt;
    state.value += state.velocity * dt;
    remaining -= dt;
  }
  if (Math.abs(state.target - state.value) < .015 && Math.abs(state.velocity) < .03) {
    state.value = state.target;
    state.velocity = 0;
    return false;
  }
  return true;
}

export function movementBounds(width: number, height: number, left: number, top: number, elementWidth: number, elementHeight: number, padding = 18): Bounds {
  return {
    minX: Math.min(0, padding - left), maxX: Math.max(0, width - padding - left - elementWidth),
    minY: Math.min(0, padding - top), maxY: Math.max(0, height - padding - top - elementHeight)
  };
}

export function releasePosition(x: number, y: number, vx: number, vy: number, bounds: Bounds, reduced: boolean) {
  const speed = Math.hypot(vx, vy);
  return {
    x: limit(x + (reduced ? 0 : limit(vx, -1800, 1800) * .12), bounds.minX, bounds.maxX),
    y: limit(y + (reduced ? 0 : limit(vy, -1800, 1800) * .12), bounds.minY, bounds.maxY),
    decisive: !reduced && speed > 650
  };
}

/** A gesture selects a new editorial balance, rather than resetting to the default. */
export function rebuildLayout(intent: number, energy: number, compact: boolean) {
  const reverse = !compact && intent > .12;
  const air = limit(energy, 0, 1);
  return {
    reverse,
    titleX: compact ? .06 + air * .025 : reverse ? .49 : .07 + air * .025,
    titleY: compact ? .12 : .22 - air * .04,
    cardX: compact ? .35 - air * .025 : reverse ? .10 : .64 - air * .02,
    cardY: compact ? .43 + air * .015 : .15 + air * .025,
    rotation: (intent < 0 ? -1 : 1) * (2 + air * 4)
  };
}
