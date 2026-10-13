import type { DeviceTier } from '../core/DeviceTier';
import type { FrameLoop } from '../core/FrameLoop';
import type { MotionPreferences } from '../core/MotionPreferences';
import { CapabilityReactor } from '../components/CapabilityReactor';

export class CapabilityScene {
  private readonly section: HTMLElement;
  private readonly reactor: CapabilityReactor;
  private active = false;
  constructor(section: HTMLElement, frameLoop: FrameLoop, preferences: MotionPreferences, tier: DeviceTier) {
    this.section = section;
    this.reactor = new CapabilityReactor(section, frameLoop, preferences, tier);
  }

  enter() {
    this.active = true;
    this.section.dataset.sceneState = 'active';
    this.reactor.enter();
    this.update();
  }

  update(progress?: number) {
    if (!this.active) return;
    const value = progress ?? this.progress();
    this.reactor.update(value);
  }

  leave() {
    this.active = false;
    this.reactor.leave();
    this.section.dataset.sceneState = 'settled';
  }

  destroy() {
    this.reactor.destroy();
  }

  private progress() {
    return Math.min(Math.max((window.scrollY - this.section.offsetTop) / Math.max(this.section.offsetHeight - window.innerHeight, 1), 0), 1);
  }
}
