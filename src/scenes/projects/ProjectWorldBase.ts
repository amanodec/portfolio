import type { ProjectRecord } from '../../content/projects';
import { AssetLoader } from '../../core/AssetLoader';
import type { DeviceTier } from '../../core/DeviceTier';
import type { FrameLoop } from '../../core/FrameLoop';
import type { MotionPreferences } from '../../core/MotionPreferences';
import { ScrollState } from '../../core/ScrollState';
import { PointerField, type PointerSample } from '../../interactions/pointerField';
import { ProjectNavigation } from './ProjectNavigation.ts';
import { ProjectPortal } from './ProjectPortal.ts';
import type { ProjectWorldScene } from './ProjectWorldScene.ts';
import type { Renderer } from '../../three/Renderer';

export type ProjectWorldBaseOptions = {
  section: HTMLElement;
  project: ProjectRecord;
  frameLoop: FrameLoop;
  preferences: MotionPreferences;
  renderer: Renderer;
  tier: DeviceTier;
};

export abstract class ProjectWorldBase implements ProjectWorldScene {
  readonly project: ProjectRecord;
  protected readonly section: HTMLElement;
  protected readonly frameLoop: FrameLoop;
  protected readonly preferences: MotionPreferences;
  protected readonly renderer: Renderer;
  protected readonly scroll: ScrollState;
  protected readonly portal: ProjectPortal;
  protected readonly navigation: ProjectNavigation;
  private readonly pointer: PointerField;
  private readonly assets = new AssetLoader();
  private readonly mediaSource: HTMLElement | null;
  private readonly onFrame = () => this.update();
  private readonly onScroll = () => { if (this.active) this.update(); };
  private readonly onPointer = (sample: PointerSample) => {
    this.pointerSample = sample;
    this.portal.setPointer(sample.x, sample.y, sample.active);
  };
  private readonly unsubscribePreferences: () => void;
  private removeFrame?: () => void;
  private removePointer?: () => void;
  private active = false;
  private prepared = false;
  private mode: 'full' | 'reduced' = 'full';
  private currentProgress = 0;
  private pointerSample: PointerSample = { x: 0, y: 0, pressure: 0, active: false, pointerType: 'unknown' };

  protected constructor({ section, project, frameLoop, preferences, renderer }: ProjectWorldBaseOptions) {
    this.section = section;
    this.project = project;
    this.frameLoop = frameLoop;
    this.preferences = preferences;
    this.renderer = renderer;
    this.scroll = new ScrollState(section);
    this.portal = new ProjectPortal(section);
    this.navigation = new ProjectNavigation(section);
    this.pointer = new PointerField(section);
    this.mediaSource = section.querySelector<HTMLElement>('[data-project-media]');
    this.removePointer = this.pointer.subscribe(this.onPointer);
    this.unsubscribePreferences = preferences.subscribe((_mode, effective) => {
      this.mode = effective;
      this.portal.setEffects(effective);
      if (effective === 'full' && this.active) this.startFrame();
      if (effective === 'reduced') this.stopFrame();
      this.update();
    });
    window.addEventListener('scroll', this.onScroll, { passive: true });
    this.portal.setProgress(0);
  }

  async prepare() {
    if (this.prepared || !this.project.assets.length) return;
    this.assets.reset();
    this.prepared = true;
    this.mediaSource?.setAttribute('data-media-state', 'loading');
    const result = await this.assets.media(this.project.assets[0].src);
    if (!this.mediaSource) return;
    this.mediaSource.dataset.mediaState = result.status === 'loaded' ? 'loaded' : result.status;
  }

  enter() {
    this.active = true;
    this.section.dataset.sceneState = 'active';
    this.scroll.measure();
    this.startFrame();
    this.update();
  }

  update(progress?: number) {
    if (!this.active) return;
    const value = progress ?? this.scroll.update().progress;
    this.currentProgress = Math.max(0, Math.min(value, 1));
    this.portal.setProgress(this.currentProgress);
    this.navigation.setProgress(this.currentProgress);
    this.section.style.setProperty('--project-camera-depth', (this.currentProgress * 100).toFixed(3));
    this.updateWorld(this.currentProgress, this.pointerSample);
    if (this.renderer.available) {
      this.renderer.render({
        progress: this.currentProgress,
        pointer: this.pointerSample,
        reduced: this.mode === 'reduced',
        color: hexToRgb(this.project.palette.signal),
        opacity: this.mode === 'reduced' ? 0.34 : 0.68
      });
    }
  }

  leave() {
    this.active = false;
    this.section.dataset.sceneState = 'settled';
    this.stopFrame();
  }

  suspend() {
    if (!this.active) return;
    this.stopFrame();
    if (this.mediaSource?.dataset.mediaState === 'loading') {
      this.assets.abort();
      this.prepared = false;
      this.mediaSource.dataset.mediaState = 'aborted';
    }
  }

  resume() {
    if (!this.active) return;
    void this.prepare();
    if (this.mode === 'full') this.startFrame();
    this.update(this.currentProgress);
  }

  destroy() {
    this.stopFrame();
    window.removeEventListener('scroll', this.onScroll);
    this.removePointer?.();
    this.unsubscribePreferences();
    this.pointer.destroy();
    this.navigation.destroy();
    this.scroll.destroy();
    this.assets.destroy();
  }

  protected abstract updateWorld(progress: number, pointer: PointerSample): void;

  private startFrame() {
    if (!this.removeFrame && this.mode === 'full') this.removeFrame = this.frameLoop.add(this.onFrame);
  }

  private stopFrame() {
    this.removeFrame?.();
    this.removeFrame = undefined;
  }
}

const hexToRgb = (hex: string): [number, number, number] => {
  const value = hex.replace('#', '').padEnd(6, '0');
  return [0, 2, 4].map((offset) => parseInt(value.slice(offset, offset + 2), 16) / 255) as [number, number, number];
};
