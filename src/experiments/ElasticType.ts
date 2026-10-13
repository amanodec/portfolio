import type { FrameLoop } from '../core/FrameLoop.ts';
import { PointerField, type PointerSample } from '../interactions/pointerField.ts';
import { DampedSpring, clamp } from '../interactions/springs.ts';
import { splitText, type TextSplitController } from '../interactions/textSplit.ts';

export type PlaygroundMotionMode = 'full' | 'reduced';

export const normalizeElasticInput = (value: number) => clamp(value, -1, 1);

export const elasticScale = (value: number) => 1 + Math.abs(normalizeElasticInput(value)) * .11;

export class ElasticType {
  private readonly root: HTMLElement;
  private readonly surface: HTMLElement | null;
  private readonly word: HTMLElement | null;
  private readonly range: HTMLInputElement | null;
  private readonly output: HTMLOutputElement | null;
  private readonly resetButton: HTMLButtonElement | null;
  private readonly frameLoop: FrameLoop;
  private readonly pointer: PointerField;
  private readonly split: TextSplitController | null;
  private readonly x = new DampedSpring(0, { stiffness: 190, damping: 28 });
  private readonly y = new DampedSpring(0, { stiffness: 190, damping: 28 });
  private readonly handlers: Array<() => void> = [];
  private readonly onFrame = (delta: number) => this.step(delta);
  private removeFrame?: () => void;
  private active = false;
  private mode: PlaygroundMotionMode = 'full';
  private destroyed = false;

  constructor(root: HTMLElement, frameLoop: FrameLoop) {
    this.root = root;
    this.surface = root.querySelector<HTMLElement>('[data-elastic-surface]');
    this.word = root.querySelector<HTMLElement>('[data-elastic-word]');
    this.range = root.querySelector<HTMLInputElement>('[data-elastic-range]');
    this.output = root.querySelector<HTMLOutputElement>('[data-elastic-output]');
    this.resetButton = root.querySelector<HTMLButtonElement>('[data-experiment-reset="elastic-type"]');
    this.frameLoop = frameLoop;
    this.pointer = new PointerField(this.surface || root);
    this.split = this.word ? splitText(this.word) : null;

    const onPointer = (sample: PointerSample) => {
      if (!this.active) return;
      const targetX = sample.active ? normalizeElasticInput(sample.x) : 0;
      const targetY = sample.active ? normalizeElasticInput(sample.y) : 0;
      this.x.setTarget(targetX);
      this.y.setTarget(targetY * .58);
      if (this.mode === 'full') this.startFrame();
      else {
        this.x.jumpTo(targetX);
        this.y.jumpTo(targetY * .58);
        this.render(targetX, targetY * .58);
      }
    };
    const onInput = () => {
      if (!this.active || !this.range) return;
      this.x.setTarget(normalizeElasticInput(Number(this.range.value) / 100));
      this.y.setTarget(0);
      if (this.mode === 'full') this.startFrame();
      else {
        this.x.jumpTo(this.x.target);
        this.y.jumpTo(0);
        this.render(this.x.value, this.y.value);
      }
    };
    const onPointerDown = () => {
      if (this.active) this.root.dataset.elasticInput = 'direct';
    };
    const onPointerUp = () => {
      if (!this.active) return;
      this.x.setTarget(0);
      this.y.setTarget(0);
      if (this.mode === 'full') this.startFrame();
      else {
        this.x.jumpTo(0);
        this.y.jumpTo(0);
        this.render(0, 0);
      }
    };
    const onReset = () => this.reset();

    this.removePointer = this.pointer.subscribe(onPointer);
    this.range?.addEventListener('input', onInput);
    this.surface?.addEventListener('pointerdown', onPointerDown, { passive: true });
    this.surface?.addEventListener('pointerup', onPointerUp, { passive: true });
    this.surface?.addEventListener('pointercancel', onPointerUp, { passive: true });
    this.resetButton?.addEventListener('click', onReset);
    this.handlers.push(
      () => this.range?.removeEventListener('input', onInput),
      () => this.surface?.removeEventListener('pointerdown', onPointerDown),
      () => this.surface?.removeEventListener('pointerup', onPointerUp),
      () => this.surface?.removeEventListener('pointercancel', onPointerUp),
      () => this.resetButton?.removeEventListener('click', onReset)
    );
    this.reset();
  }

  private removePointer?: () => void;

  setMotionMode(mode: PlaygroundMotionMode) {
    this.mode = mode;
    this.root.dataset.motionMode = mode;
    if (mode === 'reduced') {
      this.stopFrame();
      this.render(this.x.value, this.y.value);
    }
  }

  activate() {
    if (this.destroyed) return;
    this.active = true;
    this.root.dataset.experimentState = 'active';
    this.render(this.x.value, this.y.value);
  }

  deactivate() {
    this.active = false;
    this.stopFrame();
    this.x.setTarget(0);
    this.y.setTarget(0);
    this.render(0, 0);
    this.root.dataset.experimentState = 'settled';
  }

  reset() {
    if (this.destroyed) return;
    this.x.jumpTo(0);
    this.y.jumpTo(0);
    if (this.range) this.range.value = '0';
    this.root.dataset.elasticInput = 'reset';
    this.render(0, 0);
  }

  private step(delta: number) {
    if (!this.active || this.mode === 'reduced') return this.stopFrame();
    const x = this.x.step(delta);
    const y = this.y.step(delta);
    this.render(x, y);
    if (this.x.settled && this.y.settled) this.stopFrame();
  }

  private render(x: number, y: number) {
    const boundedX = normalizeElasticInput(x);
    const boundedY = normalizeElasticInput(y);
    this.root.style.setProperty('--elastic-x', `${(boundedX * 38).toFixed(2)}px`);
    this.root.style.setProperty('--elastic-y', `${(-boundedY * 22).toFixed(2)}px`);
    this.root.style.setProperty('--elastic-scale', elasticScale(boundedX).toFixed(4));
    this.root.style.setProperty('--elastic-skew', `${(boundedX * 7).toFixed(2)}deg`);
    this.root.style.setProperty('--elastic-stretch', (1 + Math.abs(boundedX) * .14).toFixed(4));
    this.range?.setAttribute('aria-valuetext', `${Math.round(boundedX * 100)} percent tension`);
    if (this.output) this.output.textContent = `${boundedX > 0 ? '+' : ''}${Math.round(boundedX * 100)}%`;
    this.split?.setProgress(1 - Math.min(Math.abs(boundedX) * .75, .75));
  }

  private startFrame() {
    if (!this.removeFrame && this.active && this.mode === 'full') this.removeFrame = this.frameLoop.add(this.onFrame);
  }

  private stopFrame() {
    this.removeFrame?.();
    this.removeFrame = undefined;
  }

  destroy() {
    if (this.destroyed) return;
    this.destroyed = true;
    this.stopFrame();
    this.removePointer?.();
    this.handlers.forEach((remove) => remove());
    this.handlers.length = 0;
    this.pointer.destroy();
    this.split?.destroy();
  }
}
