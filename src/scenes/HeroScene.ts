import { DeviceTier } from '../core/DeviceTier';
import { FrameLoop } from '../core/FrameLoop';
import { MotionPreferences } from '../core/MotionPreferences';
import { ScrollState } from '../core/ScrollState';
import { Renderer } from '../three/Renderer';

export class HeroScene {
  private readonly hero: HTMLElement;
  private readonly frameLoop: FrameLoop;
  private readonly preferences: MotionPreferences;
  private readonly scroll: ScrollState;
  private readonly renderer: Renderer;
  private readonly onFrame = () => this.update();
  private readonly onResize = () => { this.scroll.measure(); this.renderer.resize(); };
  private readonly onPointerMove = (event: PointerEvent) => {
    const rect = this.hero.getBoundingClientRect();
    this.pointer.x = ((event.clientX - rect.left) / Math.max(rect.width, 1)) * 2 - 1;
    this.pointer.y = -(((event.clientY - rect.top) / Math.max(rect.height, 1)) * 2 - 1);
  };
  private readonly onPointerLeave = () => { this.pointer.x *= 0.35; this.pointer.y *= 0.35; };
  private readonly onVisibility = () => { if (!document.hidden) this.update(); };
  private readonly onSkipIgnition = () => {
    if (this.hero.dataset.ignition === 'calibrating') {
      window.clearTimeout(this.ignitionTimer);
      this.hero.dataset.ignition = 'ready';
    }
  };
  private readonly pointer = { x: 0, y: 0 };
  private removeFrame?: () => void;
  private active = false;
  private ignitionTimer = 0;
  private mode: 'full' | 'reduced' = 'full';
  private previousProgress = -1;

  constructor(
    hero: HTMLElement,
    frameLoop: FrameLoop,
    preferences: MotionPreferences,
    tier: DeviceTier,
    renderer: Renderer
  ) {
    this.hero = hero;
    this.frameLoop = frameLoop;
    this.preferences = preferences;
    this.scroll = new ScrollState(hero);
    this.renderer = renderer;
    this.hero.dataset.webgl = String(this.renderer.available);
    document.documentElement.dataset.deviceTier = tier.name;
    this.preferences.subscribe((_mode, effective) => {
      this.mode = effective;
      this.hero.dataset.effects = effective;
      if (effective === 'reduced') {
        this.stopFrame();
        this.update();
      } else if (this.active) {
        this.startFrame();
      }
    });
    window.addEventListener('resize', this.onResize, { passive: true });
    this.hero.addEventListener('pointermove', this.onPointerMove, { passive: true });
    this.hero.addEventListener('pointerleave', this.onPointerLeave, { passive: true });
    window.addEventListener('scroll', this.onSkipIgnition, { passive: true });
    window.addEventListener('wheel', this.onSkipIgnition, { passive: true });
    window.addEventListener('touchstart', this.onSkipIgnition, { passive: true });
    document.addEventListener('keydown', this.onSkipIgnition, { passive: true });
    document.addEventListener('visibilitychange', this.onVisibility);
    this.ignite();
  }

  enter() {
    this.active = true;
    this.hero.dataset.sceneState = 'active';
    if (this.mode === 'full') this.startFrame();
    this.update();
  }

  leave() {
    this.active = false;
    this.hero.dataset.sceneState = 'settled';
    this.stopFrame();
  }

  private ignite() {
    if (this.preferences.effective === 'reduced') {
      this.hero.dataset.ignition = 'ready';
      return;
    }
    this.hero.dataset.ignition = 'calibrating';
    this.ignitionTimer = window.setTimeout(() => {
      this.hero.dataset.ignition = 'ready';
    }, 650);
  }

  private startFrame() {
    if (this.removeFrame) return;
    this.removeFrame = this.frameLoop.add(this.onFrame);
  }

  private stopFrame() {
    this.removeFrame?.();
    this.removeFrame = undefined;
  }

  private update() {
    const snapshot = this.scroll.update();
    if (snapshot.progress === this.previousProgress && this.mode === 'reduced') return;
    this.previousProgress = snapshot.progress;
    this.hero.style.setProperty('--hero-progress', snapshot.progress.toFixed(4));
    this.hero.style.setProperty('--pointer-x', this.pointer.x.toFixed(4));
    this.hero.style.setProperty('--pointer-y', this.pointer.y.toFixed(4));
    this.renderer.render({ progress: snapshot.progress, pointer: this.pointer, reduced: this.mode === 'reduced' });
  }

  destroy() {
    window.clearTimeout(this.ignitionTimer);
    this.stopFrame();
    window.removeEventListener('resize', this.onResize);
    this.hero.removeEventListener('pointermove', this.onPointerMove);
    this.hero.removeEventListener('pointerleave', this.onPointerLeave);
    window.removeEventListener('scroll', this.onSkipIgnition);
    window.removeEventListener('wheel', this.onSkipIgnition);
    window.removeEventListener('touchstart', this.onSkipIgnition);
    document.removeEventListener('keydown', this.onSkipIgnition);
    document.removeEventListener('visibilitychange', this.onVisibility);
    this.scroll.destroy();
  }
}
