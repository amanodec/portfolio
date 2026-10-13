import type { DeviceTier } from '../../core/DeviceTier';
import type { FrameLoop } from '../../core/FrameLoop';
import type { MotionPreferences } from '../../core/MotionPreferences';
import type { Renderer } from '../../three/Renderer';
import { ProjectMatchCut } from './ProjectMatchCut.ts';
import type { ProjectWorldScene } from './ProjectWorldScene.ts';

export type ProjectWorldEngineOptions = {
  section?: HTMLElement;
  sections?: readonly HTMLElement[];
  frameLoop: FrameLoop;
  preferences: MotionPreferences;
  renderer: Renderer;
  tier: DeviceTier;
};

export class ProjectWorldEngine {
  private readonly scenes = new Map<string, ProjectWorldScene>();
  private readonly sections: HTMLElement[];
  private readonly observer?: IntersectionObserver;
  private readonly matchCut: ProjectMatchCut;
  private active: ProjectWorldScene | null = null;

  constructor({ section, sections = [] }: ProjectWorldEngineOptions) {
    this.sections = [...(sections.length ? sections : section ? [section] : [])];
    this.matchCut = new ProjectMatchCut(this.sections);
    if ('IntersectionObserver' in window) {
      this.observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          const scene = this.scenes.get((entry.target as HTMLElement).dataset.project || '');
          if (!scene) return;
          if (entry.isIntersecting) {
            void scene.prepare();
            scene.resume();
          } else {
            scene.suspend();
          }
        });
      }, { rootMargin: '35% 0px 35% 0px', threshold: 0.01 });
      this.sections.forEach((world) => this.observer?.observe(world));
    }
  }

  register(scene: ProjectWorldScene) {
    this.scenes.set(scene.project.slug, scene);
    return () => this.scenes.delete(scene.project.slug);
  }

  enter(slug: string) {
    const next = this.scenes.get(slug);
    if (!next || next === this.active) return;
    this.active?.leave();
    this.active = next;
    void next.prepare();
    next.enter();
  }

  update(slug: string, progress: number) {
    if (this.active?.project.slug !== slug) return;
    this.active.update(progress);
    this.matchCut.apply(this.active, progress);
  }

  exit(slug?: string) {
    if (slug && this.active?.project.slug !== slug) return;
    this.active?.leave();
    this.active = null;
  }

  destroy() {
    this.observer?.disconnect();
    this.scenes.forEach((scene) => scene.destroy());
    this.scenes.clear();
    this.matchCut.destroy();
    this.active = null;
  }
}
