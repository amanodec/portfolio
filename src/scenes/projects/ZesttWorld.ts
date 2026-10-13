import type { ProjectRecord } from '../../content/projects';
import type { DeviceTier } from '../../core/DeviceTier';
import type { FrameLoop } from '../../core/FrameLoop';
import type { MotionPreferences } from '../../core/MotionPreferences';
import type { PointerSample } from '../../interactions/pointerField';
import { ProjectWorldBase } from './ProjectWorldBase.ts';
import type { Renderer } from '../../three/Renderer';

export type ZesttWorldOptions = {
  section: HTMLElement;
  project: ProjectRecord;
  frameLoop: FrameLoop;
  preferences: MotionPreferences;
  renderer: Renderer;
  tier: DeviceTier;
};

export class ZesttWorld extends ProjectWorldBase {

  constructor(options: ZesttWorldOptions) {
    super(options);
  }

  protected updateWorld(progress: number, pointer: PointerSample) {
    this.section.style.setProperty('--world-relay', progress.toFixed(4));
    this.section.style.setProperty('--world-pointer', pointer.x.toFixed(4));
  }
}
