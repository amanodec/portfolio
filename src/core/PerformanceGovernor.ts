import type { FrameLoop } from './FrameLoop';

export type PerformanceState = 'stable' | 'degraded';

export type PerformanceGovernorOptions = {
  root?: HTMLElement;
  longFrameMs?: number;
  consecutiveLongFrames?: number;
  onDowngrade?: () => void;
};

/**
 * Records only sustained lab misses. A single slow frame never changes the
 * visual tier; a bounded downgrade is applied once and never oscillates.
 */
export class PerformanceGovernor {
  private readonly root: HTMLElement;
  private readonly longFrameMs: number;
  private readonly consecutiveLongFrames: number;
  private readonly onDowngrade?: () => void;
  private readonly unsubscribe: () => boolean;
  private slowFrames = 0;
  private _state: PerformanceState = 'stable';

  constructor(frameLoop: FrameLoop, options: PerformanceGovernorOptions = {}) {
    this.root = options.root || document.documentElement;
    this.longFrameMs = options.longFrameMs ?? 34;
    this.consecutiveLongFrames = options.consecutiveLongFrames ?? 8;
    this.onDowngrade = options.onDowngrade;
    this.root.dataset.performanceState = this._state;
    this.unsubscribe = frameLoop.observe((delta) => this.observe(delta));
  }

  get state() {
    return this._state;
  }

  private observe(delta: number) {
    if (this._state === 'degraded' || delta <= 0) return;
    this.slowFrames = delta > this.longFrameMs ? this.slowFrames + 1 : 0;
    this.root.dataset.performanceLongFrames = String(this.slowFrames);
    if (this.slowFrames < this.consecutiveLongFrames) return;
    this._state = 'degraded';
    this.root.dataset.performanceState = this._state;
    this.onDowngrade?.();
  }

  destroy() {
    this.unsubscribe();
  }
}
