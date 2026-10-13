import { DeviceTier } from '../core/DeviceTier';
import { SignalCore, type SignalFrame } from './SignalCore';

const vertexSource = `
  attribute vec2 a_position;
  attribute float a_alpha;
  varying float v_alpha;
  void main() {
    gl_Position = vec4(a_position, 0.0, 1.0);
    v_alpha = a_alpha;
  }
`;

const fragmentSource = `
  precision mediump float;
  uniform vec3 u_color;
  uniform float u_opacity;
  varying float v_alpha;
  void main() {
    gl_FragColor = vec4(u_color, v_alpha * u_opacity);
  }
`;

export type RendererQuality = 'full' | 'reduced';

export class Renderer {
  private readonly canvas: HTMLCanvasElement;
  private readonly tier: DeviceTier;
  private readonly onFailure: () => void;
  private readonly onRecovery: () => void;
  private readonly core = new SignalCore();
  private readonly gl: WebGLRenderingContext | null;
  private positionBuffer: WebGLBuffer | null = null;
  private alphaBuffer: WebGLBuffer | null = null;
  private program: WebGLProgram | null = null;
  private positionLocation = -1;
  private alphaLocation = -1;
  private colorLocation: WebGLUniformLocation | null = null;
  private opacityLocation: WebGLUniformLocation | null = null;
  private recoveryAttempts = 0;
  private destroyed = false;
  private quality: RendererQuality = 'full';
  private readonly onContextLost = (event: Event) => {
    event.preventDefault();
    this.available = false;
    this.releaseResources();
    this.onFailure();
  };
  private readonly onContextRestored = () => {
    if (this.destroyed || this.recoveryAttempts >= 1) {
      this.onFailure();
      return;
    }
    this.recoveryAttempts += 1;
    if (this.initializeResources()) {
      this.recoveryAttempts = 0;
      this.onRecovery();
    } else {
      this.available = false;
      this.onFailure();
    }
  };
  available = false;

  constructor(
    canvas: HTMLCanvasElement,
    tier: DeviceTier,
    onFailure: () => void,
    onRecovery: () => void = () => undefined
  ) {
    this.canvas = canvas;
    this.tier = tier;
    this.onFailure = onFailure;
    this.onRecovery = onRecovery;
    this.gl = canvas.getContext('webgl', { alpha: true, antialias: true, powerPreference: 'low-power' });
    if (!this.gl) {
      onFailure();
      return;
    }
    canvas.addEventListener('webglcontextlost', this.onContextLost, false);
    canvas.addEventListener('webglcontextrestored', this.onContextRestored, false);
    if (!this.initializeResources()) onFailure();
  }

  get currentQuality() {
    return this.quality;
  }

  setQuality(quality: RendererQuality) {
    if (this.quality === quality) return;
    this.quality = quality;
    this.resize();
  }

  private initializeResources() {
    if (!this.gl || this.destroyed) return false;
    this.releaseResources();
    const program = this.createProgram(this.gl, vertexSource, fragmentSource);
    if (!program) return false;
    const positionBuffer = this.gl.createBuffer();
    const alphaBuffer = this.gl.createBuffer();
    if (!positionBuffer || !alphaBuffer) {
      this.gl.deleteProgram(program);
      if (positionBuffer) this.gl.deleteBuffer(positionBuffer);
      if (alphaBuffer) this.gl.deleteBuffer(alphaBuffer);
      return false;
    }
    this.program = program;
    this.positionBuffer = positionBuffer;
    this.alphaBuffer = alphaBuffer;
    this.positionLocation = this.gl.getAttribLocation(program, 'a_position');
    this.alphaLocation = this.gl.getAttribLocation(program, 'a_alpha');
    this.colorLocation = this.gl.getUniformLocation(program, 'u_color');
    this.opacityLocation = this.gl.getUniformLocation(program, 'u_opacity');
    this.available = this.positionLocation >= 0 && this.alphaLocation >= 0;
    if (!this.available) {
      this.releaseResources();
      return false;
    }
    this.resize();
    return true;
  }

  private createShader(gl: WebGLRenderingContext, type: number, source: string) {
    const shader = gl.createShader(type);
    if (!shader) return null;
    gl.shaderSource(shader, source);
    gl.compileShader(shader);
    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
      gl.deleteShader(shader);
      return null;
    }
    return shader;
  }

  private createProgram(gl: WebGLRenderingContext, vertex: string, fragment: string) {
    const vertexShader = this.createShader(gl, gl.VERTEX_SHADER, vertex);
    const fragmentShader = this.createShader(gl, gl.FRAGMENT_SHADER, fragment);
    if (!vertexShader || !fragmentShader) {
      if (vertexShader) gl.deleteShader(vertexShader);
      if (fragmentShader) gl.deleteShader(fragmentShader);
      return null;
    }
    const program = gl.createProgram();
    if (!program) {
      gl.deleteShader(vertexShader);
      gl.deleteShader(fragmentShader);
      return null;
    }
    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);
    gl.linkProgram(program);
    gl.deleteShader(vertexShader);
    gl.deleteShader(fragmentShader);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      gl.deleteProgram(program);
      return null;
    }
    return program;
  }

  private releaseResources() {
    if (this.gl) {
      if (this.program) this.gl.deleteProgram(this.program);
      if (this.positionBuffer) this.gl.deleteBuffer(this.positionBuffer);
      if (this.alphaBuffer) this.gl.deleteBuffer(this.alphaBuffer);
    }
    this.program = null;
    this.positionBuffer = null;
    this.alphaBuffer = null;
    this.positionLocation = -1;
    this.alphaLocation = -1;
    this.colorLocation = null;
    this.opacityLocation = null;
  }

  resize() {
    if (!this.gl || !this.available) return;
    const maxRatio = this.quality === 'reduced' ? Math.min(this.tier.pixelRatio, 1) : this.tier.pixelRatio;
    const ratio = Math.min(window.devicePixelRatio || 1, maxRatio);
    const width = Math.max(Math.floor(this.canvas.clientWidth * ratio), 1);
    const height = Math.max(Math.floor(this.canvas.clientHeight * ratio), 1);
    if (this.canvas.width !== width || this.canvas.height !== height) {
      this.canvas.width = width;
      this.canvas.height = height;
    }
    this.gl.viewport(0, 0, width, height);
  }

  render(frame: SignalFrame) {
    if (!this.gl || !this.available || !this.program || !this.positionBuffer || !this.alphaBuffer) return;
    const gl = this.gl;
    this.resize();
    this.core.update(frame);
    gl.clearColor(0, 0, 0, 0);
    gl.clear(gl.COLOR_BUFFER_BIT);
    gl.enable(gl.BLEND);
    gl.blendFunc(gl.SRC_ALPHA, gl.ONE);
    gl.useProgram(this.program);

    gl.bindBuffer(gl.ARRAY_BUFFER, this.positionBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, this.core.positionData, gl.DYNAMIC_DRAW);
    gl.enableVertexAttribArray(this.positionLocation);
    gl.vertexAttribPointer(this.positionLocation, 2, gl.FLOAT, false, 0, 0);

    gl.bindBuffer(gl.ARRAY_BUFFER, this.alphaBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, this.core.alphaData, gl.DYNAMIC_DRAW);
    gl.enableVertexAttribArray(this.alphaLocation);
    gl.vertexAttribPointer(this.alphaLocation, 1, gl.FLOAT, false, 0, 0);

    const color = frame.color ?? [1, 0.35, 0.12];
    if (this.colorLocation) gl.uniform3f(this.colorLocation, color[0], color[1], color[2]);
    if (this.opacityLocation) gl.uniform1f(this.opacityLocation, frame.opacity ?? (frame.reduced ? 0.65 : 0.92));
    gl.drawArrays(gl.TRIANGLE_STRIP, 0, this.core.segments * 2);
  }

  destroy() {
    if (this.destroyed) return;
    this.destroyed = true;
    this.available = false;
    this.canvas.removeEventListener('webglcontextlost', this.onContextLost);
    this.canvas.removeEventListener('webglcontextrestored', this.onContextRestored);
    this.releaseResources();
  }
}
