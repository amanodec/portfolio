import { expect, test } from '@playwright/test';
import axe from 'axe-core';

test('Phase 7 exposes three semantic experiments and replaces the dormant anchor', async ({ page }) => {
  const errors = [];
  page.on('pageerror', (error) => errors.push(error.message));
  await page.goto('/#playground');
  const playground = page.locator('#playground');
  await expect(playground).toHaveAttribute('data-scene-state', 'active');
  await expect(playground.locator('[data-experiment-panel]')).toHaveCount(3);
  await expect(playground.locator('[data-experiment-select]')).toHaveCount(3);
  await expect(playground.locator('[data-experiment-reset]')).toHaveCount(3);
  await expect(playground.locator('[data-experiment-panel="elastic-type"]')).toBeVisible();
  await expect(page.locator('#playground-boundary')).toHaveCount(1);
  expect(errors).toEqual([]);
});

test('experiment navigation supports keyboard selection and only one active surface', async ({ page }) => {
  await page.goto('/#playground');
  const playground = page.locator('#playground');
  const first = playground.locator('[data-experiment-select="elastic-type"]');
  await first.focus();
  await page.keyboard.press('ArrowRight');
  await expect(playground.locator('[data-experiment-select="responsive-composition"]')).toHaveAttribute('aria-selected', 'true');
  await expect(playground.locator('[data-experiment-panel="responsive-composition"]')).toBeVisible();
  await expect(playground.locator('[data-experiment-panel="elastic-type"]')).toBeHidden();
  await page.keyboard.press('End');
  await expect(playground.locator('[data-experiment-select="motion-curves"]')).toHaveAttribute('aria-selected', 'true');
  await expect(playground.locator('[data-experiment-panel="motion-curves"]')).toBeVisible();
  await expect(playground.locator('[data-experiment-panel="responsive-composition"]')).toBeHidden();
});

test('elastic type responds through its keyboard-safe range and reset', async ({ page }) => {
  await page.goto('/#playground');
  const range = page.locator('[data-elastic-range]');
  await range.evaluate((input) => {
    input.value = '80';
    input.dispatchEvent(new Event('input', { bubbles: true }));
  });
  await expect(page.locator('[data-elastic-output]')).toHaveText('+80%');
  await page.locator('[data-experiment-panel="elastic-type"] [data-experiment-reset="elastic-type"]').evaluate((button) => button.click());
  await expect(page.locator('[data-elastic-output]')).toHaveText('0%');
});

test('responsive composition re-composes at presets and motion curves remain controllable', async ({ page }) => {
  await page.goto('/#playground');
  const playground = page.locator('#playground');
  await playground.locator('[data-experiment-select="responsive-composition"]').click();
  await playground.locator('[data-composition-preset="340"]').click();
  await expect(playground.locator('[data-composition-output]')).toHaveText('340px · compact');
  await expect(playground.locator('[data-composition-viewport]')).toHaveAttribute('data-composition-state', 'compact');
  await playground.locator('[data-experiment-select="motion-curves"]').click();
  await playground.locator('[data-curve-mode="spring"]').click();
  await expect(playground.locator('button[data-curve-mode="spring"]')).toHaveAttribute('aria-pressed', 'true');
  await playground.locator('[data-curve-replay]').click();
  const reduced = (await playground.getAttribute('data-motion-state')) === 'static';
  if (reduced) {
    await expect(playground.locator('[data-curve-pause]')).toBeDisabled();
  } else {
    await expect(playground.locator('[data-curve-pause]')).toBeEnabled();
    await playground.locator('[data-curve-pause]').click();
  }
  await expect(playground).toHaveAttribute('data-active-experiment', 'motion-curves');
});

test('playground remains complete with reduced motion, forced colors, and no WebGL', async ({ page }) => {
  await page.emulateMedia({ forcedColors: 'active', reducedMotion: 'reduce' });
  await page.goto('/#playground');
  const playground = page.locator('#playground');
  await expect(page.locator('html')).toHaveAttribute('data-effects', 'reduced');
  await expect(playground).toHaveAttribute('data-webgl', 'false');
  await expect(playground.locator('[data-experiment-panel="elastic-type"]')).toBeVisible();
  await expect(playground.locator('[data-experiment-select="motion-curves"]')).toBeVisible();
});

test('playground content and explanations remain ordered without JavaScript', async ({ browser }) => {
  const context = await browser.newContext({ javaScriptEnabled: false, baseURL: 'http://127.0.0.1:4173' });
  const page = await context.newPage();
  await page.goto('/#playground');
  const playground = page.locator('#playground');
  await expect(playground.locator('[data-experiment-panel]')).toHaveCount(3);
  await expect(playground.locator('[data-experiment-panel="elastic-type"]')).toBeVisible();
  await expect(playground.locator('[data-experiment-panel="responsive-composition"]')).toBeVisible();
  await expect(playground.locator('[data-experiment-panel="motion-curves"]')).toBeVisible();
  await expect(playground).toContainText('Responsive detail is a design decision');
  await expect(playground).toContainText('Timing has a reason');
  await context.close();
});

test('playground stays usable through repeated entry and 200%/400% zoom', async ({ page }) => {
  await page.goto('/#playground');
  await page.setViewportSize({ width: 390, height: 844 });
  for (const zoom of [2, 4]) {
    await page.evaluate((value) => { document.body.style.zoom = String(value); }, zoom);
    await expect(page.locator('#playground [data-experiment-select]')).toHaveCount(3);
    await expect(page.locator('#playground [data-experiment-reset]')).toHaveCount(3);
  }
  await page.evaluate(() => { document.body.style.zoom = '1'; });
  await page.goto('/#experience');
  await page.evaluate(() => {
    const section = document.querySelector('#playground');
    if (section) window.scrollTo(0, section.offsetTop + 2);
  });
  await expect(page.locator('#playground')).toHaveAttribute('data-scene-state', 'active');
});

test('playground passes axe at its interactive boundary', async ({ page }) => {
  await page.goto('/#playground');
  await page.addScriptTag({ content: axe.source });
  const results = await page.evaluate(async () => window.axe.run(document.querySelector('#playground'), {
    runOnly: { type: 'tag', values: ['wcag2a', 'wcag2aa'] }
  }));
  expect(results.violations).toEqual([]);
});
