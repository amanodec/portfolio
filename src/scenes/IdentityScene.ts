import { DisciplineSplit } from '../components/DisciplineSplit';
import { DeviceTier } from '../core/DeviceTier';
import { FrameLoop } from '../core/FrameLoop';
import { MotionPreferences } from '../core/MotionPreferences';
import { ScrollState } from '../core/ScrollState';
import { createMaskController, MaskController } from '../interactions/masks';
import { PointerField, PointerSample } from '../interactions/pointerField';
import { splitText, TextSplitController } from '../interactions/textSplit';

export class IdentityScene {
  private readonly section: HTMLElement;
  private readonly frameLoop: FrameLoop;
  private readonly preferences: MotionPreferences;
  private readonly scroll: ScrollState;
  private readonly split: DisciplineSplit;
  private readonly pointer: PointerField;
  private readonly mask: MaskController;
  private readonly splitTextControllers: TextSplitController[];
  private readonly onFrame = () => this.update();
  private readonly onScroll = () => { if (this.active) this.update(); };
  private readonly onPointer = (sample: PointerSample) => {
    this.section.style.setProperty('--identity-pointer-x', sample.x.toFixed(4));
    this.section.style.setProperty('--identity-pointer-y', sample.y.toFixed(4));
    this.section.style.setProperty('--identity-pointer-active', sample.active ? '1' : '0');
  };
  private removeFrame?: () => void;
  private unsubscribePreferences?: () => void;
  private removePointer?: () => void;
  private active = false;
  private mode = 'full';

  constructor(section: HTMLElement, frameLoop: FrameLoop, preferences: MotionPreferences, _tier: DeviceTier) {
    this.section = section;
    this.frameLoop = frameLoop;
    this.preferences = preferences;
    this.scroll = new ScrollState(section);
    this.split = new DisciplineSplit(section.querySelector<HTMLElement>('[data-discipline-split]')!, frameLoop, preferences);
    this.pointer = new PointerField(section);
    this.mask = createMaskController(section.querySelector<HTMLElement>('.identity-manifesto'));
    this.splitTextControllers = Array.from(section.querySelectorAll<HTMLElement>('[data-split-text]')).map(splitText);
    this.removePointer = this.pointer.subscribe(this.onPointer);
    this.unsubscribePreferences = preferences.subscribe((_mode, effective) => {
      this.mode = effective;
      this.section.dataset.effects = effective;
      if (effective === 'full' && this.active) this.startFrame();
      if (effective === 'reduced') this.stopFrame();
      this.update();
    });
    window.addEventListener('scroll', this.onScroll, { passive: true });
  }

  enter() {
    this.active = true;
    this.section.dataset.sceneState = 'active';
    this.startFrame();
    this.update();
  }

  update(progress?: number) {
    if (!this.active) return;
    const snapshot = progress === undefined ? this.scroll.update() : { progress };
    const value = snapshot.progress;
    this.section.style.setProperty('--identity-progress', value.toFixed(4));
    this.section.style.setProperty('--identity-receive', Math.min(value / 0.28, 1).toFixed(4));
    this.section.style.setProperty('--identity-handoff', Math.max((value - 0.72) / 0.28, 0).toFixed(4));
    this.mask.set(Math.min(value / 0.45, 1));
    this.splitTextControllers.forEach((controller) => controller.setProgress(Math.min(value / 0.34, 1)));
    this.section.dataset.identityState = value < 0.25 ? 'receive' : value > 0.74 ? 'handoff' : 'midpoint';
  }

  leave() {
    this.active = false;
    this.section.dataset.sceneState = 'settled';
    this.stopFrame();
  }

  private startFrame() {
    if (!this.removeFrame && this.mode === 'full') this.removeFrame = this.frameLoop.add(this.onFrame);
  }

  private stopFrame() {
    this.removeFrame?.();
    this.removeFrame = undefined;
  }

  destroy() {
    this.stopFrame();
    window.removeEventListener('scroll', this.onScroll);
    this.removePointer?.();
    this.unsubscribePreferences?.();
    this.pointer.destroy();
    this.split.destroy();
    this.mask.destroy();
    this.splitTextControllers.forEach((controller) => controller.destroy());
    this.scroll.destroy();
  }
}
