export type PointerSample = {
  x: number;
  y: number;
  pressure: number;
  active: boolean;
  pointerType: string;
};

export const normalizePointer = (event: Pick<PointerEvent, 'clientX' | 'clientY'>, rect: Pick<DOMRect, 'left' | 'top' | 'width' | 'height'>): PointerSample => {
  const x = ((event.clientX - rect.left) / Math.max(rect.width, 1)) * 2 - 1;
  const y = -(((event.clientY - rect.top) / Math.max(rect.height, 1)) * 2 - 1);
  return {
    x: Object.is(x, -0) ? 0 : x,
    y: Object.is(y, -0) ? 0 : y,
    pressure: 0,
    active: true,
    pointerType: 'unknown'
  };
};

export class PointerField {
  private readonly element: HTMLElement;
  private readonly listeners = new Set<(sample: PointerSample) => void>();
  private sample: PointerSample = { x: 0, y: 0, pressure: 0, active: false, pointerType: 'unknown' };
  private readonly onMove = (event: PointerEvent) => {
    const sample = normalizePointer(event, this.element.getBoundingClientRect());
    sample.pressure = event.pressure || (event.pointerType === 'mouse' ? 0.5 : 0);
    sample.pointerType = event.pointerType;
    this.sample = sample;
    this.notify(sample);
  };
  private readonly onLeave = (event: PointerEvent) => {
    this.sample = { x: 0, y: 0, pressure: 0, active: false, pointerType: event.pointerType };
    this.notify(this.sample);
  };

  constructor(element: HTMLElement) {
    this.element = element;
    element.addEventListener('pointermove', this.onMove, { passive: true });
    element.addEventListener('pointerleave', this.onLeave, { passive: true });
  }

  subscribe(listener: (sample: PointerSample) => void) {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  }

  get current() {
    return this.sample;
  }

  private notify(sample: PointerSample) {
    this.listeners.forEach((listener) => listener(sample));
  }

  destroy() {
    this.element.removeEventListener('pointermove', this.onMove);
    this.element.removeEventListener('pointerleave', this.onLeave);
    this.listeners.clear();
  }
}
