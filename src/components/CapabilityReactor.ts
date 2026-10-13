import { capabilityIds, capabilityRegistry, type CapabilityId } from '../content/capabilities';
import type { DeviceTier } from '../core/DeviceTier';
import type { FrameLoop } from '../core/FrameLoop';
import type { MotionPreferences } from '../core/MotionPreferences';
import { PointerField, type PointerSample } from '../interactions/pointerField';
import { DampedSpring, clamp } from '../interactions/springs';
import { SourceThinking } from './SourceThinking';

export class CapabilityReactor {
  private readonly root: HTMLElement;
  private readonly visual: HTMLElement | null;
  private readonly controls: HTMLButtonElement[];
  private readonly layers: HTMLElement[];
  private readonly evidence: HTMLElement[];
  private readonly resetButton: HTMLButtonElement | null;
  private readonly frameLoop: FrameLoop;
  private readonly tier: DeviceTier;
  private readonly pointer: PointerField;
  private readonly sourceThinking: SourceThinking;
  private readonly pointerX = new DampedSpring(.5, { stiffness: 150, damping: 22 });
  private readonly pointerY = new DampedSpring(.5, { stiffness: 150, damping: 22 });
  private readonly onFrame = (delta: number) => this.updatePointer(delta);
  private readonly onPointer = (sample: PointerSample) => {
    this.pointerX.setTarget(sample.active ? (sample.x + 1) / 2 : .5);
    this.pointerY.setTarget(sample.active ? (sample.y + 1) / 2 : .5);
    if (this.mode === 'full' && this.active) this.startFrame();
  };
  private readonly unsubscribePreferences: () => void;
  private readonly controlHandlers = new Map<HTMLButtonElement, { click: () => void; keydown: (event: KeyboardEvent) => void }>();
  private readonly layerHandlers = new Map<HTMLElement, { pointerenter: () => void; focus: () => void; click: () => void }>();
  private readonly onReset = () => this.reset(true);
  private removeFrame?: () => void;
  private active = false;
  private mode: 'full' | 'reduced' = 'full';
  private selected: CapabilityId = 'interface';
  private destroyed = false;

  constructor(root: HTMLElement, frameLoop: FrameLoop, preferences: MotionPreferences, tier: DeviceTier) {
    this.root = root;
    this.visual = root.querySelector<HTMLElement>('[data-capability-visual]');
    this.controls = Array.from(root.querySelectorAll<HTMLButtonElement>('[data-capability-select]'));
    this.layers = Array.from(root.querySelectorAll<HTMLElement>('[data-capability-layer]'));
    this.evidence = Array.from(root.querySelectorAll<HTMLElement>('[data-capability-evidence]'));
    this.resetButton = root.querySelector<HTMLButtonElement>('[data-capability-reset]');
    this.frameLoop = frameLoop;
    this.tier = tier;
    this.pointer = new PointerField(this.visual || root);
    this.sourceThinking = new SourceThinking(root);
    this.removePointer = this.pointer.subscribe(this.onPointer);
    this.controls.forEach((control, index) => {
      const click = () => this.select(control.dataset.capabilitySelect as CapabilityId, true);
      const keydown = (event: KeyboardEvent) => this.onControlKey(event, index);
      control.addEventListener('click', click);
      control.addEventListener('keydown', keydown);
      this.controlHandlers.set(control, { click, keydown });
    });
    this.layers.forEach((layer) => {
      const id = layer.dataset.capabilityLayer as CapabilityId;
      const pointerenter = () => this.select(id);
      const focus = () => this.select(id);
      const click = () => this.select(id, true);
      layer.addEventListener('pointerenter', pointerenter);
      layer.addEventListener('focus', focus);
      layer.addEventListener('click', click);
      this.layerHandlers.set(layer, { pointerenter, focus, click });
    });
    this.resetButton?.addEventListener('click', this.onReset);
    this.unsubscribePreferences = preferences.subscribe((_mode, effective) => {
      this.mode = effective === 'full' && this.tier.name !== 'low' ? 'full' : 'reduced';
      this.root.dataset.effects = effective;
      this.root.dataset.deviceTier = this.tier.name;
      if (effective === 'reduced') this.stopFrame();
      this.renderSelection();
      if (this.mode === 'full' && this.pointer.current.active && this.active) this.startFrame();
    });
    this.reset(false);
  }

  private removePointer?: () => void;

  enter() {
    if (this.destroyed) return;
    this.active = true;
    this.root.dataset.sceneState = 'active';
    this.renderSelection();
  }

  update(progress: number) {
    if (!this.active || this.destroyed) return;
    const value = clamp(progress);
    const explosion = value < .2 ? 0 : value < .76 ? clamp((value - .2) / .25) : clamp(1 - (value - .76) / .24);
    this.root.style.setProperty('--reactor-progress', value.toFixed(4));
    this.root.style.setProperty('--reactor-explode', explosion.toFixed(4));
    this.root.dataset.reactorState = value < .2 ? 'assembled' : value < .76 ? 'exploded' : value < .92 ? 'inspection' : 'reassemble';
  }

  leave() {
    this.active = false;
    this.stopFrame();
    this.root.dataset.sceneState = 'settled';
  }

  reset(focus: boolean) {
    if (this.destroyed) return;
    this.selected = 'interface';
    this.root.dataset.reactorSelection = this.selected;
    this.root.dataset.reactorSelectionState = 'reset';
    this.renderSelection(focus);
  }

  private select(id: CapabilityId, focus = false) {
    if (this.destroyed || !capabilityIds.includes(id)) return;
    this.selected = id;
    this.root.dataset.reactorSelection = id;
    this.root.dataset.reactorSelectionState = 'selected';
    this.renderSelection(focus);
  }

  private renderSelection(focus = false) {
    const selectedRecord = capabilityRegistry.find((record) => record.id === this.selected);
    if (!selectedRecord) return;
    this.controls.forEach((control) => {
      const selected = control.dataset.capabilitySelect === this.selected;
      control.setAttribute('aria-checked', String(selected));
      control.classList.toggle('is-selected', selected);
      if (selected) control.tabIndex = 0;
      else control.tabIndex = -1;
    });
    this.layers.forEach((layer) => layer.classList.toggle('is-selected', layer.dataset.capabilityLayer === this.selected));
    this.evidence.forEach((panel) => {
      const selected = panel.dataset.capabilityEvidence === this.selected;
      panel.hidden = !selected;
      panel.dataset.selected = selected ? 'true' : 'false';
    });
    this.root.style.setProperty('--reactor-accent', selectedRecord.accent);
    if (focus) this.controls.find((control) => control.dataset.capabilitySelect === this.selected)?.focus();
  }

  private onControlKey(event: KeyboardEvent, index: number) {
    const key = event.key;
    if (key === 'Escape') {
      event.preventDefault();
      this.reset(true);
      return;
    }
    if (!['ArrowDown', 'ArrowUp', 'ArrowRight', 'ArrowLeft', 'Home', 'End'].includes(key)) return;
    event.preventDefault();
    let next = index;
    if (key === 'Home') next = 0;
    else if (key === 'End') next = this.controls.length - 1;
    else if (key === 'ArrowDown' || key === 'ArrowRight') next = (index + 1) % this.controls.length;
    else next = (index - 1 + this.controls.length) % this.controls.length;
    this.select(this.controls[next].dataset.capabilitySelect as CapabilityId, true);
  }

  private updatePointer(delta: number) {
    if (!this.active || this.mode === 'reduced') return this.stopFrame();
    const x = this.pointerX.step(delta);
    const y = this.pointerY.step(delta);
    this.root.style.setProperty('--reactor-pointer-x', x.toFixed(4));
    this.root.style.setProperty('--reactor-pointer-y', y.toFixed(4));
    if (this.pointerX.settled && this.pointerY.settled) this.stopFrame();
  }

  private startFrame() {
    if (!this.removeFrame && this.mode === 'full') this.removeFrame = this.frameLoop.add(this.onFrame);
  }

  private stopFrame() {
    this.removeFrame?.();
    this.removeFrame = undefined;
  }

  destroy() {
    if (this.destroyed) return;
    this.destroyed = true;
    this.active = false;
    this.stopFrame();
    this.removePointer?.();
    this.controlHandlers.forEach(({ click, keydown }, control) => {
      control.removeEventListener('click', click);
      control.removeEventListener('keydown', keydown);
    });
    this.layerHandlers.forEach(({ pointerenter, focus, click }, layer) => {
      layer.removeEventListener('pointerenter', pointerenter);
      layer.removeEventListener('focus', focus);
      layer.removeEventListener('click', click);
    });
    this.resetButton?.removeEventListener('click', this.onReset);
    this.controlHandlers.clear();
    this.layerHandlers.clear();
    this.unsubscribePreferences();
    this.pointer.destroy();
    this.sourceThinking.destroy();
  }
}
