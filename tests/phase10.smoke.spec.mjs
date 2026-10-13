import { expect, test } from '@playwright/test';
import axe from 'axe-core';

const representativeScenes = ['hero', 'identity', 'zestt', 'skills', 'experience', 'playground', 'philosophy', 'contact'];

test('representative settled scenes remain accessible and error-free', async ({ page }) => {
  const errors = [];
  page.on('pageerror', (error) => errors.push(error.message));

  for (const scene of representativeScenes) {
    await page.goto(`/#${scene}`, { waitUntil: 'domcontentloaded' });
    await page.waitForTimeout(180);
    await page.addScriptTag({ content: axe.source });
    const result = await page.evaluate(async (sceneId) => {
      const target = document.querySelector(`#${sceneId}`);
      if (!target) return { missing: true, violations: [] };
      const report = await window.axe.run(target, { runOnly: { type: 'tag', values: ['wcag2a', 'wcag2aa'] } });
      return { missing: false, violations: report.violations.map(({ id, impact, nodes }) => ({ id, impact, nodes: nodes.length })) };
    }, scene);
    expect(result.missing, `${scene} landmark`).toBe(false);
    expect(result.violations, `${scene} axe violations`).toEqual([]);
  }

  expect(errors, 'uncaught page errors').toEqual([]);
});

test('WebGL context loss enters the existing fallback and restores once when supported', async ({ page }) => {
  await page.goto('/#hero', { waitUntil: 'domcontentloaded' });
  const initial = await page.locator('#hero').getAttribute('data-webgl');
  expect(['true', 'false']).toContain(initial);
  if (initial !== 'true') {
    await expect(page.locator('#hero-title')).toContainText('ZESTT');
    return;
  }

  await page.evaluate(() => {
    document.querySelector('#signal-canvas')?.dispatchEvent(new Event('webglcontextlost', { cancelable: true }));
  });
  await expect(page.locator('#hero')).toHaveAttribute('data-webgl', 'false');
  await expect(page.locator('#hero-title')).toContainText('ZESTT');

  await page.evaluate(() => {
    document.querySelector('#signal-canvas')?.dispatchEvent(new Event('webglcontextrestored'));
  });
  await expect(page.locator('#hero')).toHaveAttribute('data-webgl', 'true');
});

test('effects, visibility and direct navigation remain stable across repeated journeys', async ({ page }) => {
  const errors = [];
  page.on('pageerror', (error) => errors.push(error.message));
  await page.goto('/#hero', { waitUntil: 'domcontentloaded' });
  await expect(page.locator('html')).toHaveAttribute('data-performance-state', 'stable');

  await page.locator('#effects-control').click();
  await page.locator('[data-effects="reduced"]').click();
  await expect(page.locator('html')).toHaveAttribute('data-effects', 'reduced');

  for (const scene of ['identity', 'zestt', 'skills', 'experience', 'playground', 'philosophy', 'contact', 'hero']) {
    await page.goto(`/#${scene}`, { waitUntil: 'domcontentloaded' });
    await page.waitForTimeout(80);
    await page.evaluate(() => document.dispatchEvent(new Event('visibilitychange')));
  }

  await expect(page.locator('#hero-title')).toContainText('ZESTT');
  await expect(page.locator('#contact [data-contact-field]')).toHaveCount(7);
  expect(errors, 'uncaught page errors').toEqual([]);
});

test('slow or failed optional media settles once without retry churn', async ({ page }) => {
  let requests = 0;
  await page.route('**/assets/zestt/guest-walkthrough.mp4', async (route) => {
    requests += 1;
    await new Promise((resolve) => setTimeout(resolve, 250));
    await route.abort();
  });
  await page.goto('/#zestt', { waitUntil: 'domcontentloaded' });
  const media = page.locator('#zestt [data-project-media]');
  await expect(media).toHaveAttribute('data-media-state', /failed|aborted/);
  await page.waitForTimeout(500);
  expect(requests, 'optional media request count').toBe(1);
  await expect(page.locator('#zestt .project-world-visit')).toBeVisible();
});

test('keyboard journey keeps all primary controls reachable', async ({ page }) => {
  await page.goto('/#contact', { waitUntil: 'domcontentloaded' });
  const fields = page.locator('#contact [data-contact-field]');
  await expect(fields).toHaveCount(7);
  for (let index = 0; index < await fields.count(); index += 1) {
    await fields.nth(index).focus();
    await expect(fields.nth(index)).toBeFocused();
  }
  await page.locator('#effects-control').focus();
  await expect(page.locator('#effects-control')).toBeFocused();
  await page.locator('.contact-submit').focus();
  await expect(page.locator('.contact-submit')).toBeFocused();
});
