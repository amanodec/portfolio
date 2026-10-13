import type { PointerSample } from '../../interactions/pointerField';
import { ProjectWorldBase, type ProjectWorldBaseOptions } from './ProjectWorldBase.ts';

export class DecisionArcWorld extends ProjectWorldBase {
  constructor(options: ProjectWorldBaseOptions) {
    super(options);
  }

  protected updateWorld(progress: number, pointer: PointerSample) {
    const focus = pointer.active ? (pointer.x + 1) / 2 : 0.5;
    this.section.style.setProperty('--world-branch', Math.min(1, progress * 1.15).toFixed(4));
    this.section.style.setProperty('--world-focus', focus.toFixed(4));
    this.section.dataset.worldState = progress > 0.74 ? 'clarity' : progress > 0.24 ? 'pruning' : 'open';
  }
}
