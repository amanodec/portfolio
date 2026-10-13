import { createMaskController, type MaskController } from '../interactions/masks.ts';

export type CompositionState = 'compact' | 'balanced' | 'wide';

export const clampCompositionWidth = (value: number) => Math.min(Math.max(Math.round(value), 280), 760);

export const getCompositionState = (width: number): CompositionState => {
  const value = clampCompositionWidth(width);
  if (value < 420) return 'compact';
  if (value < 570) return 'balanced';
  return 'wide';
};

export class ResponsiveComposition {
  private readonly root: HTMLElement;
  private readonly viewport: HTMLElement | null;
  private readonly boundary: HTMLInputElement | null;
  private readonly output: HTMLOutputElement | null;
  private readonly mask: MaskController;
  private readonly resetButton: HTMLButtonElement | null;
  private readonly presetButtons: HTMLButtonElement[];
  private readonly handlers: Array<() => void> = [];
  private active = false;
  private destroyed = false;
  private width = 620;

  constructor(root: HTMLElement) {
    this.root = root;
    this.viewport = root.querySelector<HTMLElement>('[data-composition-viewport]');
    this.boundary = root.querySelector<HTMLInputElement>('[data-composition-boundary]');
    this.output = root.querySelector<HTMLOutputElement>('[data-composition-output]');
    this.mask = createMaskController(root.querySelector<HTMLElement>('[data-composition-signal]'));
    this.resetButton = root.querySelector<HTMLButtonElement>('[data-experiment-reset="responsive-composition"]');
    this.presetButtons = Array.from(root.querySelectorAll<HTMLButtonElement>('[data-composition-preset]'));

    const onInput = () => this.setWidth(Number(this.boundary?.value || this.width));
    const onReset = () => this.reset();
    this.boundary?.addEventListener('input', onInput);
    this.resetButton?.addEventListener('click', onReset);
    this.presetButtons.forEach((button) => {
      const onClick = () => this.setWidth(Number(button.dataset.compositionPreset || this.width));
      button.addEventListener('click', onClick);
      this.handlers.push(() => button.removeEventListener('click', onClick));
    });
    this.handlers.push(
      () => this.boundary?.removeEventListener('input', onInput),
      () => this.resetButton?.removeEventListener('click', onReset)
    );
    this.reset();
  }

  activate() {
    if (this.destroyed) return;
    this.active = true;
    this.root.dataset.experimentState = 'active';
    this.render();
  }

  deactivate() {
    this.active = false;
    this.root.dataset.experimentState = 'settled';
  }

  setMotionMode(mode: 'full' | 'reduced') {
    this.root.dataset.motionMode = mode;
  }

  reset() {
    this.setWidth(620);
    this.root.dataset.compositionInput = 'reset';
  }

  setWidth(width: number) {
    this.width = clampCompositionWidth(width);
    if (this.boundary) this.boundary.value = String(this.width);
    this.render();
  }

  get currentWidth() {
    return this.width;
  }

  get state() {
    return getCompositionState(this.width);
  }

  private render() {
    const state = getCompositionState(this.width);
    this.root.dataset.compositionState = state;
    if (this.viewport) this.viewport.dataset.compositionState = state;
    this.root.style.setProperty('--composition-width', `${this.width}px`);
    this.root.style.setProperty('--composition-progress', ((this.width - 280) / 480).toFixed(4));
    this.mask.set((this.width - 280) / 480);
    this.presetButtons.forEach((button) => {
      button.classList.toggle('is-active', Number(button.dataset.compositionPreset) === this.width);
    });
    this.boundary?.setAttribute('aria-valuetext', `${this.width} pixel composition · ${state}`);
    if (this.output) this.output.textContent = `${this.width}px · ${state}`;
  }

  destroy() {
    if (this.destroyed) return;
    this.destroyed = true;
    this.active = false;
    this.handlers.forEach((remove) => remove());
    this.handlers.length = 0;
    this.mask.destroy();
  }
}
