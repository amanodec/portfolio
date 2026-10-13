import { expect, test } from '@playwright/test';
import axe from 'axe-core';

test('Phase 5 exposes six semantic capabilities and replaces the legacy map', async ({ page }) => {
  const errors = [];
  page.on('pageerror', (error) => errors.push(error.message));
  await page.goto('/#skills');
  const reactor = page.locator('#skills');
  await expect(reactor).toHaveAttribute('data-scene-state', 'active');
  await expect(reactor.locator('[data-capability-select]')).toHaveCount(6);
  await expect(reactor.locator('[data-capability-evidence]')).toHaveCount(6);
  await expect(reactor.locator('[data-capability-layer]')).toHaveCount(6);
  await expect(reactor.locator('[data-capability-layer]').first()).toHaveRole('button');
  await expect(page.locator('.service-tab, .skill-filters, .evidence-table')).toHaveCount(0);
  await expect(reactor.locator('[data-capability-evidence="interface"]')).toBeVisible();
  expect(errors).toEqual([]);
});

test('capability controls support keyboard selection, reset, and source thinking focus return', async ({ page }) => {
  await page.goto('/#skills');
  const reactor = page.locator('#skills');
  const first = reactor.locator('[data-capability-select="interface"]');
  await first.focus();
  await page.keyboard.press('ArrowRight');
  await expect(reactor.locator('[data-capability-select="motion"]')).toHaveAttribute('aria-checked', 'true');
  await page.keyboard.press('End');
  await expect(reactor.locator('[data-capability-select="accessibility"]')).toHaveAttribute('aria-checked', 'true');
  await page.keyboard.press('Escape');
  await expect(first).toHaveAttribute('aria-checked', 'true');

  await reactor.locator('[data-capability-layer="apis"]').click();
  await expect(reactor.locator('[data-capability-select="apis"]')).toHaveAttribute('aria-checked', 'true');
  await reactor.locator('[data-capability-reset]').click();
  await expect(reactor.locator('[data-capability-select="interface"]')).toHaveAttribute('aria-checked', 'true');

  const trigger = reactor.locator('[data-source-thinking]');
  await trigger.click();
  await expect(reactor.locator('[data-source-thinking-panel]')).toBeVisible();
  await expect(reactor.locator('[data-source-thinking-close]')).toBeFocused();
  await page.keyboard.press('Escape');
  await expect(reactor.locator('[data-source-thinking-panel]')).toBeHidden();
  await expect(trigger).toBeFocused();
});

test('reactor scroll states, effects preference, and low-feature fallback remain deterministic', async ({ page }) => {
  await page.goto('/#skills');
  const reactor = page.locator('#skills');
  const bounds = await reactor.boundingBox();
  expect(bounds).not.toBeNull();
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.waitForTimeout(100);
  await page.locator('#effects-control').click();
  await page.locator('[data-effects="reduced"]').click();
  await expect(page.locator('html')).toHaveAttribute('data-effects', 'reduced');
  await page.locator('#effects-control').click();
  await page.locator('[data-effects="full"]').click();
  await expect(page.locator('html')).toHaveAttribute('data-effects', 'full');
  await page.evaluate(() => {
    const section = document.querySelector('#skills');
    if (!section) return;
    const max = Math.max(section.clientHeight - window.innerHeight, 1);
    window.scrollTo(0, section.getBoundingClientRect().top + window.scrollY + max * .5);
  });
  await page.waitForTimeout(100);
  await expect(reactor).toHaveAttribute('data-reactor-state', 'exploded');

  await page.evaluate(() => {
    const section = document.querySelector('#skills');
    if (section) window.scrollTo(0, section.getBoundingClientRect().top + window.scrollY);
  });
  await page.waitForTimeout(100);
  await expect(reactor).toHaveAttribute('data-reactor-state', 'assembled');
  expect(bounds?.width).toBeGreaterThan(0);
});

test('capability scene stays usable when WebGL is unavailable', async ({ page }) => {
  await page.addInitScript(() => {
    const originalGetContext = HTMLCanvasElement.prototype.getContext;
    HTMLCanvasElement.prototype.getContext = function (type, ...args) {
      if (type === 'webgl' || type === 'experimental-webgl') return null;
      return originalGetContext.call(this, type, ...args);
    };
  });
  await page.goto('/#skills');
  await expect(page.locator('#skills')).toHaveAttribute('data-webgl', 'false');
  await expect(page.locator('#skills [data-capability-evidence="interface"]')).toBeVisible();
  await expect(page.locator('#skills [data-source-thinking]')).toBeVisible();
});

test('reactor connector count and active frame cadence stay bounded', async ({ page }) => {
  await page.goto('/#skills');
  const reactor = page.locator('#skills');
  await reactor.locator('[data-capability-visual]').hover({ position: { x: 120, y: 120 } });
  const metrics = await page.evaluate(async () => {
    const deltas = [];
    let previous;
    const started = performance.now();
    await new Promise((resolve) => {
      const tick = (now) => {
        if (previous !== undefined) deltas.push(now - previous);
        previous = now;
        if (now - started < 350) requestAnimationFrame(tick);
        else resolve();
      };
      requestAnimationFrame(tick);
    });
    const longTasks = performance.getEntriesByType('longtask').length;
    return { frames: deltas.length, average: deltas.reduce((sum, value) => sum + value, 0) / Math.max(deltas.length, 1), max: Math.max(...deltas), longTasks };
  });
  await expect(reactor.locator('[data-connector-capability]')).toHaveCount(6);
  expect(metrics.frames).toBeGreaterThan(10);
  expect(metrics.max).toBeLessThan(100);
});

test('capability controls remain usable in forced colors and reduced motion', async ({ page }) => {
  await page.emulateMedia({ forcedColors: 'active', reducedMotion: 'reduce' });
  await page.goto('/#skills');
  const reactor = page.locator('#skills');
  await expect(reactor.locator('[data-capability-select]')).toHaveCount(6);
  await reactor.locator('[data-capability-select="accessibility"]').focus();
  await page.keyboard.press('Enter');
  await expect(reactor.locator('[data-capability-evidence="accessibility"]')).toBeVisible();
  await expect(page.locator('html')).toHaveAttribute('data-effects', 'reduced');
});

test('capability reactor preserves semantic evidence without JavaScript', async ({ browser }) => {
  const context = await browser.newContext({ javaScriptEnabled: false, baseURL: 'http://127.0.0.1:4173' });
  const page = await context.newPage();
  await page.goto('/#skills');
  await expect(page.locator('#skills [data-capability-evidence]')).toHaveCount(6);
  await expect(page.locator('#skills [data-capability-evidence]').nth(0)).toBeVisible();
  await expect(page.locator('#skills [data-capability-evidence]').nth(5)).toBeVisible();
  await expect(page.locator('#skills .capability-evidence-list')).toHaveCount(6);
  await context.close();
});

test('capability reactor passes axe at its interactive boundary', async ({ page }) => {
  await page.goto('/#skills');
  await page.addScriptTag({ content: axe.source });
  const results = await page.evaluate(async () => window.axe.run(document.querySelector('#skills'), {
    runOnly: { type: 'tag', values: ['wcag2a', 'wcag2aa'] }
  }));
  expect(results.violations).toEqual([]);
});
