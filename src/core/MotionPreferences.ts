export type MotionMode = 'system' | 'full' | 'reduced';
export type EffectiveMotionMode = Exclude<MotionMode, 'system'>;

export class MotionPreferences {
  private readonly media = window.matchMedia('(prefers-reduced-motion: reduce)');
  private readonly listeners = new Set<(mode: MotionMode, effective: EffectiveMotionMode) => void>();
  private readonly storageKey: string;
  private mode: MotionMode;
  private readonly onMediaChange = () => this.notify();

  constructor(storageKey = 'zestt-phase1-effects') {
    this.storageKey = storageKey;
    const stored = localStorage.getItem(storageKey);
    this.mode = stored === 'full' || stored === 'reduced' || stored === 'system' ? stored : 'system';
    this.media.addEventListener?.('change', this.onMediaChange);
  }

  get value() {
    return this.mode;
  }

  get effective(): EffectiveMotionMode {
    return this.mode === 'system' ? (this.media.matches ? 'reduced' : 'full') : this.mode;
  }

  set(mode: MotionMode) {
    this.mode = mode;
    localStorage.setItem(this.storageKey, mode);
    this.notify();
  }

  subscribe(listener: (mode: MotionMode, effective: EffectiveMotionMode) => void) {
    this.listeners.add(listener);
    listener(this.mode, this.effective);
    return () => this.listeners.delete(listener);
  }

  private notify() {
    this.listeners.forEach((listener) => listener(this.mode, this.effective));
  }

  destroy() {
    this.media.removeEventListener?.('change', this.onMediaChange);
    this.listeners.clear();
  }
}
