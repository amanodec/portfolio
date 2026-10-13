import { expect, test } from '@playwright/test';
import axe from 'axe-core';

test('Phase 6 exposes three semantic role stops and removes the legacy timeline', async ({ page }) => {
  const errors = [];
  page.on('pageerror', (error) => errors.push(error.message));
  await page.goto('/#experience');
  const experience = page.locator('#experience');
  await expect(experience).toHaveAttribute('data-scene-state', 'active');
  await expect(experience.locator('[data-experience-role]')).toHaveCount(3);
  await expect(experience.locator('[data-role-select]')).toHaveCount(3);
  await expect(experience.locator('[data-role-stop]')).toHaveCount(3);
  await expect(experience.locator('[data-role-previous]')).toBeVisible();
  await expect(experience.locator('[data-role-next]')).toBeVisible();
  await expect(page.locator('.timeline, .timeline-entry, #timeline-progress')).toHaveCount(0);
  expect(errors).toEqual([]);
});

test('role selection supports keyboard, stop clicks, and previous/next navigation', async ({ page }) => {
  await page.goto('/#experience');
  const experience = page.locator('#experience');
  await expect(experience).toHaveAttribute('data-scene-state', 'active');
  const first = experience.locator('[data-role-select="rain-platforms"]');
  await first.focus();
  await page.keyboard.press('ArrowRight');
  await expect(experience.locator('[data-role-select="superchat"]')).toHaveAttribute('aria-selected', 'true');
  await expect(experience.locator('[data-experience-role="superchat"]')).toBeVisible();
  await page.keyboard.press('End');
  await expect(experience.locator('[data-role-select="fleapo"]')).toHaveAttribute('aria-selected', 'true');
  await experience.locator('[data-role-stop="rain-platforms"]').click();
  await expect(experience.locator('[data-role-select="rain-platforms"]')).toHaveAttribute('aria-selected', 'true');
  await experience.locator('[data-role-next]').click();
  await expect(experience.locator('[data-role-select="superchat"]')).toHaveAttribute('aria-selected', 'true');
});

test('experience scroll states and direct role anchors remain deterministic', async ({ page }) => {
  await page.goto('/#experience');
  const state = page.locator('#experience');
  await expect(state).toHaveAttribute('data-experience-state', 'entry');
  await page.evaluate(() => {
    const section = document.querySelector('#experience');
    if (section) window.scrollTo(0, section.offsetTop + (section.clientHeight - window.innerHeight) * .5);
  });
  await page.waitForTimeout(100);
  await expect(state).toHaveAttribute('data-experience-state', 'travel');
  await expect(state).toHaveAttribute('data-active-role', 'superchat');
  await state.locator('[data-role-anchor="fleapo"]').click();
  await expect(page).toHaveURL(/#experience-fleapo$/);
  await expect(state.locator('[data-role-select="fleapo"]')).toHaveAttribute('aria-selected', 'true');
  await expect(state.locator('#experience-fleapo h3')).toBeFocused();
  await page.goBack();
  await expect(page).toHaveURL(/#experience$/);
});

test('experience remains complete with reduced motion, forced colors, and no WebGL', async ({ page }) => {
  await page.emulateMedia({ forcedColors: 'active', reducedMotion: 'reduce' });
  await page.addInitScript(() => {
    const original = HTMLCanvasElement.prototype.getContext;
    HTMLCanvasElement.prototype.getContext = function (type, ...args) {
      if (type === 'webgl' || type === 'webgl2') return null;
      return original.call(this, type, ...args);
    };
  });
  await page.goto('/#experience');
  const experience = page.locator('#experience');
  await expect(page.locator('html')).toHaveAttribute('data-effects', 'reduced');
  await expect(experience).toHaveAttribute('data-webgl', 'false');
  await expect(experience.locator('[data-experience-role="rain-platforms"]')).toBeVisible();
  await expect(experience.locator('[data-role-select="fleapo"]')).toBeVisible();
});

test('experience remains ordered and complete without JavaScript', async ({ browser }) => {
  const context = await browser.newContext({ javaScriptEnabled: false, baseURL: 'http://127.0.0.1:4173' });
  const page = await context.newPage();
  await page.goto('/#experience');
  const experience = page.locator('#experience');
  await expect(experience.locator('[data-experience-role]')).toHaveCount(3);
  await expect(experience.locator('[data-experience-role="rain-platforms"]')).toBeVisible();
  await expect(experience.locator('[data-experience-role="superchat"]')).toBeVisible();
  await expect(experience.locator('[data-experience-role="fleapo"]')).toBeVisible();
  await expect(experience).toContainText('Production frontend and payment-flow work');
  await expect(experience).not.toContainText('%');
  await context.close();
});

test('experience layout survives tablet-to-mobile resizing without a dedicated render loop', async ({ page }) => {
  await page.goto('/#experience');
  await page.setViewportSize({ width: 834, height: 1194 });
  await expect(page.locator('#experience [data-role-select]')).toHaveCount(3);
  await expect(page.locator('#experience .experience-spatial-plane')).toBeVisible();
  await page.setViewportSize({ width: 390, height: 844 });
  await expect(page.locator('#experience [data-role-select]')).toHaveCount(3);
  await expect(page.locator('#experience [data-role-next]')).toBeVisible();
  const metrics = await page.evaluate(() => new Promise((resolve) => {
    const intervals = [];
    let previous = 0;
    let frames = 0;
    const sample = (time) => {
      if (previous) intervals.push(time - previous);
      previous = time;
      frames += 1;
      if (frames >= 16) {
        resolve({ maximum: Math.max(...intervals), longTasks: performance.getEntriesByType('longtask').length });
        return;
      }
      requestAnimationFrame(sample);
    };
    requestAnimationFrame(sample);
  }));
  expect(metrics.maximum).toBeLessThan(100);
  expect(metrics.longTasks).toBeLessThan(3);
});

test('experience passes axe at its interactive boundary', async ({ page }) => {
  await page.goto('/#experience');
  await page.addScriptTag({ content: axe.source });
  const results = await page.evaluate(async () => window.axe.run(document.querySelector('#experience'), {
    runOnly: { type: 'tag', values: ['wcag2a', 'wcag2aa'] }
  }));
  expect(results.violations).toEqual([]);
});
