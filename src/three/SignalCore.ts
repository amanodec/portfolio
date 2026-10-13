export type SignalFrame = {
  progress: number;
  pointer: { x: number; y: number };
  reduced: boolean;
  color?: [number, number, number];
  opacity?: number;
};

export class SignalCore {
  readonly segments = 180;
  readonly positionData = new Float32Array(this.segments * 2 * 2);
  readonly alphaData = new Float32Array(this.segments * 2);

  update(frame: SignalFrame) {
    const phase = frame.progress * Math.PI * 1.7;
    const amplitude = frame.reduced ? 0.12 : 0.2 + Math.sin(frame.progress * Math.PI) * 0.1;
    const width = frame.reduced ? 0.026 : 0.035 + Math.sin(frame.progress * Math.PI) * 0.045;
    const pointerPull = frame.reduced ? 0 : 0.08;

    for (let index = 0; index < this.segments; index += 1) {
      const normalized = index / (this.segments - 1);
      const x = normalized * 2 - 1;
      const wave = Math.sin(x * 4.2 + phase) * amplitude;
      const bend = Math.sin(x * 1.6 - phase * 0.6) * 0.08;
      const centerY = wave + bend + frame.pointer.y * pointerPull;
      const centerX = x + frame.pointer.x * pointerPull * (1 - Math.abs(x));
      const localWidth = width * (0.65 + 0.35 * Math.sin(normalized * Math.PI));
      const start = index * 4;
      this.positionData[start] = centerX;
      this.positionData[start + 1] = centerY - localWidth;
      this.positionData[start + 2] = centerX;
      this.positionData[start + 3] = centerY + localWidth;

      const alphaStart = index * 2;
      const edgeFade = Math.min(normalized * 4, (1 - normalized) * 4, 1);
      this.alphaData[alphaStart] = edgeFade;
      this.alphaData[alphaStart + 1] = edgeFade * (frame.reduced ? 0.55 : 0.9);
    }
  }
}
