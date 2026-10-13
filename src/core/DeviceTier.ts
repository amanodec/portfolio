export type DeviceTierName = 'full' | 'reduced' | 'low';

export class DeviceTier {
  readonly name: DeviceTierName;
  readonly pixelRatio: number;
  private readonly win: Window;

  constructor(win: Window = window) {
    this.win = win;
    const width = win.innerWidth;
    const nav = (win.navigator || globalThis.navigator) as Navigator & {
      deviceMemory?: number;
      connection?: { saveData?: boolean };
    };
    const memory = Number(nav?.deviceMemory || 8);
    const cores = nav?.hardwareConcurrency || 8;
    const coarse = win.matchMedia?.('(pointer: coarse)').matches ?? false;
    const constrained = width < 700 || memory <= 4 || cores <= 4 || nav?.connection?.saveData === true;
    this.name = constrained && coarse ? 'low' : constrained ? 'reduced' : 'full';
    this.pixelRatio = this.name === 'full' ? 1.5 : this.name === 'reduced' ? 1.25 : 1;
  }

  static detect(win: Window = window) {
    return new DeviceTier(win);
  }
}
