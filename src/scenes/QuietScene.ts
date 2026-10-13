import type { DeviceTier } from '../core/DeviceTier';
import type { FrameLoop } from '../core/FrameLoop';
import type { MotionPreferences } from '../core/MotionPreferences';
import { ScrollState } from '../core/ScrollState';

export class QuietScene {
  private readonly section: HTMLElement;
  private readonly frameLoop: FrameLoop;
  private readonly tier: DeviceTier;
  private readonly scroll: ScrollState;
  private readonly unsubscribePreferences: () => void;
  private readonly onFrame = (delta: number) => {
    this.breatheTime += delta / 1000;
    this.section.style.setProperty('--quiet-breathe', (0.5 + Math.sin(this.breatheTime * 0.8) * 0.5).toFixed(3));
  };
  private breathing?: () => void;
  private breatheTime = 0;
  private active = false;
  private motionMode: 'full' | 'reduced' = 'reduced';

  constructor(section: HTMLElement, frameLoop: FrameLoop, preferences: MotionPreferences, tier: DeviceTier) {
    this.section = section;
    this.frameLoop = frameLoop;
    this.tier = tier;
    this.scroll = new ScrollState(section);
    this.unsubscribePreferences = preferences.subscribe((_mode, effective) => {
      this.motionMode = effective === 'full' && tier.name !== 'low' ? 'full' : 'reduced';
      this.section.dataset.effects = effective;
      this.section.dataset.deviceTier = tier.name;
      this.section.dataset.motionState = this.motionMode === 'reduced' ? 'static' : 'breathing';
      this.syncBreathing();
    });
  }

  enter() {
    this.active = true;
    this.section.dataset.sceneState = 'active';
    this.section.dataset.webgl = 'false';
    this.section.dataset.frameLoop = this.frameLoop.active ? 'shared' : 'idle';
    this.scroll.measure();
    this.syncBreathing();
    this.update();
  }

  update(progress?: number) {
    if (!this.active) return;
    const value = Math.min(Math.max(progress ?? this.scroll.update().progress, 0), 1);
    this.section.style.setProperty('--quiet-progress', value.toFixed(4));
    this.section.dataset.quietState = value < 0.2 ? 'entry' : value > 0.8 ? 'exit' : 'still';
  }

  leave() {
    this.active = false;
    this.section.dataset.sceneState = 'settled';
    this.section.dataset.quietState = 'exit';
    this.syncBreathing();
  }

  destroy() {
    this.active = false;
    this.syncBreathing();
    this.unsubscribePreferences();
    this.scroll.destroy();
  }

  private syncBreathing() {
    const shouldBreathe = this.active && this.motionMode === 'full';
    if (shouldBreathe && !this.breathing) this.breathing = this.frameLoop.add(this.onFrame);
    if (!shouldBreathe && this.breathing) {
      this.breathing();
      this.breathing = undefined;
      this.section.style.setProperty('--quiet-breathe', '0');
    }
  }
}
