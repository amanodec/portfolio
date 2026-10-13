import type { PointerSample } from '../../interactions/pointerField';
import { ProjectWorldBase, type ProjectWorldBaseOptions } from './ProjectWorldBase.ts';

export class TradingLeaguesWorld extends ProjectWorldBase {
  constructor(options: ProjectWorldBaseOptions) {
    super(options);
  }

  protected updateWorld(progress: number, pointer: PointerSample) {
    const velocity = Math.min(1, progress * 1.22 + (pointer.active ? Math.abs(pointer.x) * 0.08 : 0));
    this.section.style.setProperty('--world-velocity', velocity.toFixed(4));
    this.section.style.setProperty('--world-pointer', pointer.x.toFixed(4));
    this.section.dataset.worldState = progress > 0.72 ? 'proof' : progress > 0.22 ? 'velocity' : 'entry';
  }
}
