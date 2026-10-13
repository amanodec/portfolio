import { mkdirSync, readdirSync, readFileSync, statSync, writeFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { gzipSync } from 'node:zlib';
import { chromium } from '@playwright/test';

const root = resolve(new URL('..', import.meta.url).pathname);
const evidenceDirectory = resolve(root, 'docs/phase-10');
const captureDirectory = resolve(evidenceDirectory, 'captures');
const baseUrl = process.env.PHASE10_BASE_URL || 'http://127.0.0.1:4173';
mkdirSync(captureDirectory, { recursive: true });

const bundleFiles = [resolve(root, 'dist/index.html'), ...readdirSync(resolve(root, 'dist/assets'))
  .filter((file) => /\.(?:css|js)$/.test(file))
  .map((file) => resolve(root, 'dist/assets', file))];
const bundles = bundleFiles.map((file) => {
  const bytes = readFileSync(file);
  return {
    file: file.slice(root.length + 1),
    bytes: statSync(file).size,
    gzipBytes: gzipSync(bytes).length
  };
});

const browser = await chromium.launch({
  headless: true,
  executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'
});
const context = await browser.newContext({ colorScheme: 'dark' });
const page = await context.newPage();

const collect = async (width, height, anchor) => {
  await page.setViewportSize({ width, height });
  await page.goto(`${baseUrl}/#${anchor}`, { waitUntil: 'load' });
  await page.waitForTimeout(400);
  const frames = await page.evaluate(() => new Promise((resolveMetrics) => {
    const samples = [];
    let previous;
    let count = 0;
    const sample = (time) => {
      if (previous !== undefined) samples.push(time - previous);
      previous = time;
      count += 1;
      if (count < 50) requestAnimationFrame(sample);
      else resolveMetrics(samples);
    };
    requestAnimationFrame(sample);
  }));
  const pageMetrics = await page.evaluate(() => {
    const navigation = performance.getEntriesByType('navigation')[0];
    const resources = performance.getEntriesByType('resource');
    const longTasks = performance.getEntriesByType('longtask');
    const shifts = performance.getEntriesByType('layout-shift');
    const paints = performance.getEntriesByType('paint');
    const sum = (values) => values.reduce((total, value) => total + value, 0);
    return {
      navigation: navigation ? {
        responseStart: navigation.responseStart,
        domContentLoaded: navigation.domContentLoadedEventEnd,
        load: navigation.loadEventEnd,
        transferSize: navigation.transferSize
      } : null,
      paints: Object.fromEntries(paints.map((entry) => [entry.name, entry.startTime])),
      longTasks: longTasks.length,
      layoutShift: sum(shifts.filter((entry) => !entry.hadRecentInput).map((entry) => entry.value)),
      resources: {
        count: resources.length,
        encodedBytes: sum(resources.map((entry) => entry.encodedBodySize || 0)),
        transferBytes: sum(resources.map((entry) => entry.transferSize || 0))
      },
      canvas: (() => {
        const canvas = document.querySelector('#signal-canvas');
        return canvas ? { width: canvas.width, height: canvas.height } : null;
      })(),
      dpr: window.devicePixelRatio,
      webgl: document.documentElement.dataset.webgl,
      performanceState: document.documentElement.dataset.performanceState,
      heapUsed: performance.memory?.usedJSHeapSize ?? null
    };
  });
  await page.screenshot({ path: resolve(captureDirectory, `${width}x${height}-${anchor}.png`), fullPage: false });
  const sortedFrames = [...frames].sort((a, b) => a - b);
  return {
    viewport: { width, height },
    anchor,
    ...pageMetrics,
    frames: {
      count: frames.length,
      averageMs: frames.length ? frames.reduce((total, value) => total + value, 0) / frames.length : 0,
      p95Ms: sortedFrames[Math.min(sortedFrames.length - 1, Math.floor(sortedFrames.length * 0.95))] || 0,
      maxMs: Math.max(...frames, 0)
    }
  };
};

const captures = [];
for (const [width, height] of [[1440, 900], [1024, 768], [390, 844], [320, 568]]) {
  captures.push(await collect(width, height, 'hero'));
  captures.push(await collect(width, height, 'contact'));
}

await browser.close();
writeFileSync(resolve(evidenceDirectory, 'runtime-metrics.json'), JSON.stringify({
  capturedAt: new Date().toISOString(),
  conditions: {
    browser: 'Google Chrome headless via Playwright',
    server: baseUrl,
    dpr: 'reported per viewport; no device emulation beyond viewport size',
    note: 'Lab evidence for Phase 10 hardening; not field p75 and not visual approval.'
  },
  bundles,
  captures
}, null, 2));
