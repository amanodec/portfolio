export type AssetResult = { url: string; status: 'loaded' | 'failed' | 'aborted' };

export class AssetLoader {
  private controller = new AbortController();
  private pendingCount = 0;
  private readonly timeoutMs: number;

  constructor(timeoutMs = 12_000) {
    this.timeoutMs = timeoutMs;
  }

  get pending() {
    return this.pendingCount;
  }

  async image(url: string): Promise<AssetResult> {
    if (this.controller.signal.aborted) return { url, status: 'aborted' };
    this.pendingCount += 1;
    return new Promise((resolve) => {
      const image = new Image();
      let settled = false;
      let timeout = 0;
      const onAbort = () => finish('aborted');
      const finish = (status: AssetResult['status']) => {
        if (settled) return;
        settled = true;
        window.clearTimeout(timeout);
        this.controller.signal.removeEventListener('abort', onAbort);
        image.onload = null;
        image.onerror = null;
        this.pendingCount = Math.max(this.pendingCount - 1, 0);
        resolve({ url, status });
      };
      image.onload = () => finish('loaded');
      image.onerror = () => finish('failed');
      this.controller.signal.addEventListener('abort', onAbort, { once: true });
      timeout = window.setTimeout(() => finish('failed'), this.timeoutMs);
      image.decoding = 'async';
      image.src = url;
    });
  }

  async media(url: string): Promise<AssetResult> {
    if (this.controller.signal.aborted) return { url, status: 'aborted' };
    this.pendingCount += 1;
    return new Promise((resolve) => {
      const video = document.createElement('video');
      let settled = false;
      let timeout = 0;
      const onAbort = () => finish('aborted');
      const finish = (status: AssetResult['status']) => {
        if (settled) return;
        settled = true;
        window.clearTimeout(timeout);
        this.controller.signal.removeEventListener('abort', onAbort);
        video.onloadedmetadata = null;
        video.onerror = null;
        video.removeAttribute('src');
        video.load();
        this.pendingCount = Math.max(this.pendingCount - 1, 0);
        resolve({ url, status });
      };
      video.preload = 'metadata';
      video.muted = true;
      video.onloadedmetadata = () => finish('loaded');
      video.onerror = () => finish('failed');
      this.controller.signal.addEventListener('abort', onAbort, { once: true });
      timeout = window.setTimeout(() => finish('failed'), this.timeoutMs);
      video.src = url;
      video.load();
    });
  }

  abort() {
    this.controller.abort();
  }

  reset() {
    if (!this.controller.signal.aborted) return;
    this.controller = new AbortController();
  }

  destroy() {
    this.abort();
  }
}
