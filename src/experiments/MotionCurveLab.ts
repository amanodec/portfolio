import type { FrameLoop } from '../core/FrameLoop.ts';
import { DampedSpring, clamp } from '../interactions/springs.ts';

export type CurveMode = 'direct' | 'spring' | 'cinematic';

export const curveModes: readonly CurveMode[] = ['direct', 'spring', 'cinematic'];

export const curveProgress = (mode: CurveMode, normalized: number) => {
  const value = clamp(normalized);
  if (mode === 'direct') return value;
  if (mode === 'cinematic') return 1 - Math.pow(1 - value, 3);
  return 1 - Math.exp(-7 * value) * (1 + 7 * value);
};

export const curveDuration = (mode: CurveMode) => mode === 'direct' ? 620 : mode === 'spring' ? 900 : 980;

export class MotionCurveLab {
  private readonly root: HTMLElement;
  private readonly frameLoop: FrameLoop;
  private readonly object: HTMLElement | null;
  private readonly modeButtons: HTMLButtonElement[];
  private readonly replayButton: HTMLButtonElement | null;
  private readonly pauseButton: HTMLButtonElement | null;
  private readonly resetButton: HTMLButtonElement | null;
  private readonly readout: HTMLElement | null;
  private readonly explanation: HTMLElement | null;
  private readonly handlers: Array<() => void> = [];
  private readonly spring = new DampedSpring(0, { stiffness: 170, damping: 24 });
  private readonly onFrame = (delta: number) => this.step(delta);
  private removeFrame?: () => void;
  private active = false;
  private playing = false;
  private elapsed = 0;
  private mode: CurveMode = 'direct';
  private motionMode: 'full' | 'reduced' = 'full';
  private destroyed = false;

  constructor(root: HTMLElement, frameLoop: FrameLoop) {
    this.root = root;
    this.frameLoop = frameLoop;
    this.object = root.querySelector<HTMLElement>('[data-curve-object]');
    this.modeButtons = Array.from(root.querySelectorAll<HTMLButtonElement>('[data-curve-mode]'));
    this.replayButton = root.querySelector<HTMLButtonElement>('[data-curve-replay]');
    this.pauseButton = root.querySelector<HTMLButtonElement>('[data-curve-pause]');
    this.resetButton = root.querySelector<HTMLButtonElement>('[data-experiment-reset="motion-curves"]');
    this.readout = root.querySelector<HTMLElement>('[data-curve-readout]');
    this.explanation = root.querySelector<HTMLElement>('[data-curve-explanation]');

    this.modeButtons.forEach((button) => {
      const onClick = () => this.setMode(button.dataset.curveMode as CurveMode);
      button.addEventListener('click', onClick);
      this.handlers.push(() => button.removeEventListener('click', onClick));
    });
    const onReplay = () => this.play();
    const onPause = () => this.pause();
    const onReset = () => this.reset();
    this.replayButton?.addEventListener('click', onReplay);
    this.pauseButton?.addEventListener('click', onPause);
    this.resetButton?.addEventListener('click', onReset);
    this.handlers.push(
      () => this.replayButton?.removeEventListener('click', onReplay),
      () => this.pauseButton?.removeEventListener('click', onPause),
      () => this.resetButton?.removeEventListener('click', onReset)
    );
    this.render(0);
  }

  setMotionMode(mode: 'full' | 'reduced') {
    this.motionMode = mode;
    this.root.dataset.motionMode = mode;
    if (mode === 'reduced') {
      this.pause();
      this.render(1);
    }
  }

  activate() {
    if (this.destroyed) return;
    this.active = true;
    this.root.dataset.experimentState = 'active';
    this.render(this.progress);
  }

  deactivate() {
    this.active = false;
    this.pause();
    this.reset();
    this.root.dataset.experimentState = 'settled';
  }

  setMode(mode: CurveMode) {
    if (!curveModes.includes(mode)) return;
    this.mode = mode;
    this.modeButtons.forEach((button) => {
      const selected = button.dataset.curveMode === mode;
      button.classList.toggle('is-active', selected);
      button.setAttribute('aria-pressed', String(selected));
    });
    this.root.dataset.selectedCurve = mode;
    this.play();
  }

  play() {
    if (this.destroyed || !this.active) return;
    this.elapsed = 0;
    this.spring.jumpTo(0);
    this.playing = this.motionMode === 'full';
    this.root.dataset.curveState = this.playing ? 'playing' : 'static';
    this.render(this.motionMode === 'full' ? 0 : 1);
    if (this.playing) this.startFrame();
  }

  pause() {
    this.playing = false;
    this.stopFrame();
    this.root.dataset.curveState = 'paused';
    this.updateControls();
  }

  reset() {
    this.playing = false;
    this.stopFrame();
    this.elapsed = 0;
    this.spring.jumpTo(0);
    this.root.dataset.curveState = 'reset';
    this.render(0);
  }

  get progress() {
    return this.object ? Number.parseFloat(this.object.style.getPropertyValue('--curve-progress')) || 0 : 0;
  }

  private step(delta: number) {
    if (!this.active || !this.playing || this.motionMode === 'reduced') return this.stopFrame();
    this.elapsed += Math.min(delta, 64);
    const normalized = clamp(this.elapsed / curveDuration(this.mode));
    let value = curveProgress(this.mode, normalized);
    if (this.mode === 'spring') {
      this.spring.setTarget(1);
      value = this.spring.step(delta);
    }
    this.render(value);
    if (normalized >= 1 || (this.mode === 'spring' && this.spring.settled)) {
      this.playing = false;
      this.root.dataset.curveState = 'settled';
      this.stopFrame();
      this.updateControls();
    }
  }

  private render(value: number) {
    const bounded = clamp(value);
    this.object?.style.setProperty('--curve-progress', bounded.toFixed(4));
    this.root.style.setProperty('--curve-progress', bounded.toFixed(4));
    this.root.style.setProperty('--curve-distance', `${(bounded * 100).toFixed(2)}%`);
    if (this.readout) this.readout.textContent = `${Math.round(bounded * 100)}%`;
    if (this.explanation) this.explanation.textContent = this.explanationFor(this.mode);
    this.updateControls();
  }

  private explanationFor(mode: CurveMode) {
    if (mode === 'spring') return 'Spring movement suits a response that should feel physical, retargetable, and settled.';
    if (mode === 'cinematic') return 'Cinematic movement suits a reveal where the arrival itself is part of the story.';
    return 'Direct movement suits immediate utility and simple state changes.';
  }

  private updateControls() {
    if (this.pauseButton) this.pauseButton.disabled = !this.playing;
  }

  private startFrame() {
    if (!this.removeFrame && this.active && this.motionMode === 'full') this.removeFrame = this.frameLoop.add(this.onFrame);
  }

  private stopFrame() {
    this.removeFrame?.();
    this.removeFrame = undefined;
  }

  destroy() {
    if (this.destroyed) return;
    this.destroyed = true;
    this.stopFrame();
    this.handlers.forEach((remove) => remove());
    this.handlers.length = 0;
  }
}
