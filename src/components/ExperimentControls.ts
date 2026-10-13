import type { PlaygroundExperimentId } from '../content/playground.ts';

export class ExperimentControls {
  private readonly root: HTMLElement;
  private readonly controls: HTMLButtonElement[];
  private readonly handlers: Array<() => void> = [];
  private readonly onSelect: (id: PlaygroundExperimentId) => void;

  constructor(root: HTMLElement, onSelect: (id: PlaygroundExperimentId) => void) {
    this.root = root;
    this.onSelect = onSelect;
    this.controls = Array.from(root.querySelectorAll<HTMLButtonElement>('[data-experiment-select]'));
    this.controls.forEach((control, index) => {
      const id = control.dataset.experimentSelect as PlaygroundExperimentId | undefined;
      if (!id) return;
      const onClick = () => this.onSelect(id);
      const onKeyDown = (event: KeyboardEvent) => this.onKeyDown(event, index);
      control.addEventListener('click', onClick);
      control.addEventListener('keydown', onKeyDown);
      this.handlers.push(
        () => control.removeEventListener('click', onClick),
        () => control.removeEventListener('keydown', onKeyDown)
      );
    });
  }

  setActive(id: PlaygroundExperimentId, moveFocus = false) {
    this.root.dataset.activeExperiment = id;
    this.controls.forEach((control) => {
      const active = control.dataset.experimentSelect === id;
      control.classList.toggle('is-active', active);
      control.setAttribute('aria-selected', String(active));
      control.tabIndex = active ? 0 : -1;
      if (active && moveFocus) control.focus();
    });
  }

  private onKeyDown(event: KeyboardEvent, index: number) {
    if (!['ArrowDown', 'ArrowUp', 'ArrowRight', 'ArrowLeft', 'Home', 'End'].includes(event.key)) return;
    event.preventDefault();
    const direction = event.key === 'ArrowUp' || event.key === 'ArrowLeft' ? -1 : 1;
    const nextIndex = event.key === 'Home' ? 0 : event.key === 'End' ? this.controls.length - 1 : (index + direction + this.controls.length) % this.controls.length;
    const nextId = this.controls[nextIndex]?.dataset.experimentSelect as PlaygroundExperimentId | undefined;
    if (nextId) this.onSelect(nextId);
  }

  destroy() {
    this.handlers.forEach((remove) => remove());
    this.handlers.length = 0;
  }
}
