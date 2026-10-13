export type SpringOptions = {
  stiffness?: number;
  damping?: number;
  epsilon?: number;
};

export const clamp = (value: number, min = 0, max = 1) => Math.min(Math.max(value, min), max);

/**
 * A small critically-damped-ish spring for bounded UI values.
 * It is intentionally time-step based so scroll and pointer input can retarget
 * the same value without stacking animation timelines.
 */
export class DampedSpring {
  value: number;
  target: number;
  velocity = 0;
  private readonly stiffness: number;
  private readonly damping: number;
  private readonly epsilon: number;

  constructor(value = 0, options: SpringOptions = {}) {
    this.value = value;
    this.target = value;
    this.stiffness = options.stiffness ?? 180;
    this.damping = options.damping ?? 24;
    this.epsilon = options.epsilon ?? 0.0005;
  }

  setTarget(target: number) {
    this.target = target;
  }

  jumpTo(value: number) {
    this.value = value;
    this.target = value;
    this.velocity = 0;
  }

  step(deltaMs: number) {
    const seconds = Math.min(Math.max(deltaMs, 0), 64) / 1000;
    const force = (this.target - this.value) * this.stiffness;
    this.velocity += (force - this.velocity * this.damping) * seconds;
    this.value += this.velocity * seconds;
    if (Math.abs(this.target - this.value) <= this.epsilon && Math.abs(this.velocity) <= this.epsilon) {
      this.value = this.target;
      this.velocity = 0;
    }
    return this.value;
  }

  get settled() {
    return this.value === this.target && this.velocity === 0;
  }
}
