import { clamp } from '../../interactions/springs.ts';

export type ProjectPortalState = 'entry' | 'signature' | 'proof';

export class ProjectPortal {
  private readonly section: HTMLElement;

  constructor(section: HTMLElement) {
    this.section = section;
  }

  setProgress(progress: number) {
    const value = clamp(progress);
    const entry = Math.min(value / 0.26, 1);
    const signature = Math.min(Math.max((value - 0.2) / 0.56, 0), 1);
    const proof = Math.min(Math.max((value - 0.68) / 0.32, 0), 1);
    const state: ProjectPortalState = value < 0.28 ? 'entry' : value > 0.7 ? 'proof' : 'signature';
    this.section.style.setProperty('--project-progress', value.toFixed(4));
    this.section.style.setProperty('--project-entry', entry.toFixed(4));
    this.section.style.setProperty('--project-signature', signature.toFixed(4));
    this.section.style.setProperty('--project-proof', proof.toFixed(4));
    this.section.dataset.projectState = state;
  }

  setPointer(x: number, y: number, active: boolean) {
    this.section.style.setProperty('--project-pointer-x', x.toFixed(4));
    this.section.style.setProperty('--project-pointer-y', y.toFixed(4));
    this.section.style.setProperty('--project-pointer-active', active ? '1' : '0');
  }

  setEffects(mode: 'full' | 'reduced') {
    this.section.dataset.effects = mode;
  }
}
