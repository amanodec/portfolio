import type { DeviceTier } from '../core/DeviceTier';
import type { FrameLoop } from '../core/FrameLoop';
import type { MotionPreferences } from '../core/MotionPreferences';
import { ScrollState } from '../core/ScrollState';
import { experienceRegistry } from '../content/experience';
import { ExperienceTimeline } from '../components/ExperienceTimeline';

export class ExperienceScene {
  private readonly section: HTMLElement;
  private readonly scroll: ScrollState;
  private readonly timeline: ExperienceTimeline;
  private readonly frameLoop: FrameLoop;
  private readonly tier: DeviceTier;
  private readonly unsubscribePreferences: () => void;
  private active = false;

  constructor(section: HTMLElement, frameLoop: FrameLoop, preferences: MotionPreferences, tier: DeviceTier) {
    this.section = section;
    this.frameLoop = frameLoop;
    this.tier = tier;
    this.scroll = new ScrollState(section);
    this.timeline = new ExperienceTimeline(section, experienceRegistry);
    this.unsubscribePreferences = preferences.subscribe((_mode, effective) => {
      this.section.dataset.effects = effective;
      this.section.dataset.deviceTier = this.tier.name;
      this.section.dataset.motionState = effective === 'reduced' ? 'static' : 'responsive';
      if (effective === 'reduced') this.timeline.updateProgress(this.timelineProgress());
    });
  }

  enter() {
    this.active = true;
    this.section.dataset.sceneState = 'active';
    this.section.dataset.webgl = 'false';
    this.section.dataset.frameLoop = this.frameLoop.active ? 'shared' : 'idle';
    this.scroll.measure();
    this.update();
  }

  update(progress?: number) {
    if (!this.active) return;
    this.timeline.updateProgress(progress ?? this.scroll.update().progress);
  }

  leave() {
    this.active = false;
    this.section.dataset.sceneState = 'settled';
    delete this.section.dataset.previewRole;
  }

  destroy() {
    this.unsubscribePreferences();
    this.timeline.destroy();
    this.scroll.destroy();
  }

  private timelineProgress() {
    return this.scroll.update().progress;
  }
}
