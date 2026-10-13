export type FrameTask = (time: number) => void;
export type FrameObserver = (delta: number) => void;

export type FrameLoopMetrics = {
  frames: number;
  lastDelta: number;
  maxDelta: number;
  longFrames: number;
};

export class FrameLoop {
  private tasks = new Set<FrameTask>();
  private observers = new Set<FrameObserver>();
  private raf = 0;
  private lastTime: number | null = null;
  private hidden = document.hidden;
  private frameCount = 0;
  private lastDelta = 0;
  private maxDelta = 0;
  private longFrames = 0;
  private readonly onVisibility = () => {
    this.hidden = document.hidden;
    if (this.hidden && this.raf) {
      cancelAnimationFrame(this.raf);
      this.raf = 0;
    }
    if (!this.hidden && this.tasks.size) {
      this.lastTime = null;
      this.schedule();
    }
  };

  constructor() {
    document.addEventListener('visibilitychange', this.onVisibility);
  }

  add(task: FrameTask) {
    this.tasks.add(task);
    this.schedule();
    return () => this.remove(task);
  }

  remove(task: FrameTask) {
    this.tasks.delete(task);
    if (!this.tasks.size && this.raf) {
      cancelAnimationFrame(this.raf);
      this.raf = 0;
    }
  }

  get active() {
    return this.tasks.size > 0 && !this.hidden;
  }

  get metrics(): FrameLoopMetrics {
    return {
      frames: this.frameCount,
      lastDelta: this.lastDelta,
      maxDelta: this.maxDelta,
      longFrames: this.longFrames
    };
  }

  observe(observer: FrameObserver) {
    this.observers.add(observer);
    return () => this.observers.delete(observer);
  }

  private schedule() {
    if (this.raf || this.hidden || !this.tasks.size) return;
    this.raf = requestAnimationFrame((time) => this.tick(time));
  }

  private tick(time: number) {
    this.raf = 0;
    if (this.hidden) return;
    const delta = this.lastTime === null ? 0 : Math.min(Math.max(time - this.lastTime, 0), 64);
    this.lastTime = time;
    this.frameCount += 1;
    this.lastDelta = delta;
    this.maxDelta = Math.max(this.maxDelta, delta);
    if (delta > 32) this.longFrames += 1;
    [...this.tasks].forEach((task) => task(delta));
    this.observers.forEach((observer) => observer(delta));
    this.schedule();
  }

  destroy() {
    if (this.raf) cancelAnimationFrame(this.raf);
    this.raf = 0;
    this.tasks.clear();
    this.observers.clear();
    this.lastTime = null;
    document.removeEventListener('visibilitychange', this.onVisibility);
  }
}
