export type ScrollSnapshot = {
  y: number;
  progress: number;
  viewport: number;
};

export class ScrollState {
  private readonly element: HTMLElement;
  private bounds = { top: 0, height: 1 };
  private dirty = true;
  private snapshot: ScrollSnapshot = { y: 0, progress: 0, viewport: window.innerHeight };
  private readonly onScroll = () => { this.dirty = true; };
  private readonly onResize = () => { this.dirty = true; this.measure(); };

  constructor(element: HTMLElement) {
    this.element = element;
    window.addEventListener('scroll', this.onScroll, { passive: true });
    window.addEventListener('resize', this.onResize, { passive: true });
    this.measure();
  }

  measure() {
    const rect = this.element.getBoundingClientRect();
    this.bounds = { top: rect.top + window.scrollY, height: Math.max(rect.height, window.innerHeight) };
    this.dirty = true;
  }

  update() {
    if (!this.dirty) return this.snapshot;
    const y = window.scrollY;
    const viewport = window.innerHeight;
    const travel = Math.max(this.bounds.height - viewport, 1);
    this.snapshot = {
      y,
      viewport,
      progress: Math.min(Math.max((y - this.bounds.top) / travel, 0), 1)
    };
    this.dirty = false;
    return this.snapshot;
  }

  get current() {
    return this.snapshot;
  }

  destroy() {
    window.removeEventListener('scroll', this.onScroll);
    window.removeEventListener('resize', this.onResize);
  }
}
