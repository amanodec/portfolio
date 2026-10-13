import { FrameLoop } from '../core/FrameLoop';
import { EffectiveMotionMode, MotionPreferences } from '../core/MotionPreferences';
import { DampedSpring, clamp } from '../interactions/springs';

export class DisciplineSplit {
  private readonly root: HTMLElement;
  private readonly stage: HTMLElement;
  private readonly range: HTMLInputElement;
  private readonly output: HTMLOutputElement;
  private readonly reset: HTMLButtonElement;
  private readonly frameLoop: FrameLoop;
  private readonly preferences: MotionPreferences;
  private readonly spring = new DampedSpring(0.5, { stiffness: 210, damping: 28 });
  private readonly onInput = () => this.setTarget(Number(this.range.value) / 100);
  private readonly onReset = () => this.setTarget(0.5);
  private readonly onFrame = (delta: number) => {
    this.spring.step(delta);
    this.render(this.spring.value);
    if (this.spring.settled) this.stopFrame();
  };
  private unsubscribePreferences?: () => void;
  private removeFrame?: () => void;
  private mode: EffectiveMotionMode = 'full';

  constructor(root: HTMLElement, frameLoop: FrameLoop, preferences: MotionPreferences) {
    this.root = root;
    this.stage = root.querySelector<HTMLElement>('.discipline-stage')!;
    this.range = root.querySelector<HTMLInputElement>('.discipline-range')!;
    this.output = root.querySelector<HTMLOutputElement>('#discipline-value')!;
    this.reset = root.querySelector<HTMLButtonElement>('[data-discipline-reset]')!;
    this.frameLoop = frameLoop;
    this.preferences = preferences;
    this.range.addEventListener('input', this.onInput);
    this.reset.addEventListener('click', this.onReset);
    this.unsubscribePreferences = preferences.subscribe((_mode, effective) => {
      this.mode = effective;
      if (effective === 'reduced') this.render(this.spring.value);
    });
    this.render(Number(this.range.value) / 100);
  }

  private setTarget(value: number) {
    const bounded = clamp(value);
    this.spring.setTarget(bounded);
    this.range.value = String(Math.round(bounded * 100));
    if (this.mode === 'reduced') {
      this.spring.jumpTo(bounded);
      this.render(bounded);
      return;
    }
    this.startFrame();
  }

  private render(value: number) {
    const bounded = clamp(value);
    const percentage = bounded * 100;
    const mode = bounded < 0.34 ? 'visual' : bounded > 0.66 ? 'engineering' : 'midpoint';
    this.stage.style.setProperty('--discipline-ratio', `${percentage}%`);
    this.root.dataset.disciplineMode = mode;
    this.range.setAttribute('aria-valuetext', this.valueText(bounded));
    this.output.textContent = `${Math.round(percentage)} / ${mode}`;
  }

  private valueText(value: number) {
    if (value < 0.34) return 'Visual instinct';
    if (value > 0.66) return 'Engineering discipline';
    return 'The midpoint: visual instinct and engineering discipline';
  }

  private startFrame() {
    if (!this.removeFrame) this.removeFrame = this.frameLoop.add(this.onFrame);
  }

  private stopFrame() {
    this.removeFrame?.();
    this.removeFrame = undefined;
  }

  get value() {
    return this.spring.value;
  }

  resetToMidpoint() {
    this.onReset();
  }

  destroy() {
    this.stopFrame();
    this.range.removeEventListener('input', this.onInput);
    this.reset.removeEventListener('click', this.onReset);
    this.unsubscribePreferences?.();
  }
}
