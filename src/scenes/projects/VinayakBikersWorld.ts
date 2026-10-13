import type { PointerSample } from '../../interactions/pointerField';
import { ProjectWorldBase, type ProjectWorldBaseOptions } from './ProjectWorldBase.ts';

export class VinayakBikersWorld extends ProjectWorldBase {
  constructor(options: ProjectWorldBaseOptions) {
    super(options);
  }

  protected updateWorld(progress: number, pointer: PointerSample) {
    const trail = Math.min(1, progress * 1.25 + (pointer.active ? Math.abs(pointer.y) * 0.06 : 0));
    this.section.style.setProperty('--world-trail', trail.toFixed(4));
    this.section.style.setProperty('--world-ribbon', (progress * 18 + pointer.x * 2).toFixed(3));
    this.section.dataset.worldState = progress > 0.72 ? 'settled' : progress > 0.22 ? 'momentum' : 'entry';
  }
}
