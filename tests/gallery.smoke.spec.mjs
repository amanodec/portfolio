import { test, expect } from '@playwright/test';
import axe from 'axe-core';

test('portfolio renders its work and contact without errors or eager video downloads', async ({ page }) => {
  const errors = [];
  const mediaRequests = [];
  page.on('pageerror', error => errors.push(error.message));
  page.on('request', request => { if (/\.(mp4|mov)(\?|$)/.test(request.url())) mediaRequests.push(request.url()); });
  await page.goto('/');
  await expect(page.getByRole('heading', { level: 1 })).toHaveText('Interfaces.With feeling.');
  await expect(page.locator('.project')).toHaveCount(4);
  await expect(page.locator('.contact-button').first()).toHaveAttribute('href', /^mailto:/);
  await page.locator('#zestt').scrollIntoViewIfNeeded();
  await expect.poll(() => page.locator('.phone-frame img').evaluate(image => image.complete && image.naturalWidth > 0)).toBe(true);
  expect(mediaRequests).toEqual([]);
  expect(errors).toEqual([]);
});

test('project notes open with keyboard and return focus to the trigger', async ({ page }) => {
  await page.goto('/');
  const trigger = page.locator('[data-project="wedding-save-the-date"]');
  await trigger.focus();
  await page.keyboard.press('Enter');
  await expect(page.locator('#project-dialog')).toBeVisible();
  await expect(page.locator('#dialog-title')).toHaveText('Save the Date');
  await expect(page.locator('.dialog-visit')).toHaveAttribute('href', 'https://save-the-date-md.netlify.app/');
  await page.keyboard.press('Escape');
  await expect(page.locator('#project-dialog')).not.toBeVisible();
  await expect(trigger).toBeFocused();
  await expect(page.locator('body')).not.toHaveClass(/overlay-open/);
});

test('mobile navigation traps focus, closes with Escape, and navigates to a section', async ({ page }) => {
  test.skip((page.viewportSize()?.width ?? 1440) > 760, 'Menu is a compact-screen control.');
  await page.goto('/');
  const toggle = page.locator('.menu-toggle');
  await toggle.click();
  await expect(page.locator('.menu-close')).toBeFocused();
  await expect(page.locator('#main')).toHaveJSProperty('inert', true);
  await page.keyboard.press('Shift+Tab');
  await expect(page.locator('.menu-bottom a')).toBeFocused();
  await page.keyboard.press('Tab');
  await expect(page.locator('.menu-close')).toBeFocused();
  await page.keyboard.press('Escape');
  await expect(toggle).toBeFocused();
  await expect(page.locator('#menu')).toBeHidden();
  await toggle.click();
  await page.locator('#menu nav a[href="#lab"]').click();
  await expect(page.locator('#menu')).toBeHidden();
  await expect(page).toHaveURL(/#lab$/);
  await expect(page.locator('#main')).toHaveJSProperty('inert', false);
});

test('composition lab responds to keyboard, exposes layers, rebuilds, and resets', async ({ page }) => {
  await page.goto('/#lab');
  const type = page.locator('[data-lab-grab="type"]');
  const card = page.locator('[data-lab-grab="card"]');
  await type.focus();
  await page.keyboard.press('ArrowRight');
  await expect.poll(() => page.locator('[data-lab]').evaluate(element => parseFloat(element.style.getPropertyValue('--type-x')))).toBeGreaterThan(10);
  await card.click();
  await expect(card).toHaveAttribute('aria-pressed', 'true');
  await page.locator('[data-lab-colour="cobalt"]').click();
  await expect(page.locator('[data-lab-colour="cobalt"]')).toHaveAttribute('aria-pressed', 'true');
  await page.locator('[data-lab-rebuild]').click();
  await expect(card).toHaveAttribute('aria-pressed', 'false');
  await expect(page.locator('[data-lab-edition]')).toHaveText('002');
  await expect(page.locator('[data-lab-state]')).toHaveText('Composed by you');
  const download = page.waitForEvent('download');
  await page.locator('[data-lab-save]').click();
  expect((await download).suggestedFilename()).toBe('aman-composition-002.svg');
  await page.locator('[data-lab-reset]').click();
  await expect(page.locator('[data-lab-edition]')).toHaveText('001');
  await expect(page.locator('[data-lab-colour="vermilion"]')).toHaveAttribute('aria-pressed', 'true');
});

test('developer story compares the detail, navigates chapters, and opens the full experience', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('/#developer-eye');
  const compare = page.locator('[data-developer-compare]');
  await compare.click();
  await expect(compare).toHaveAttribute('aria-pressed', 'true');
  await expect(page.locator('.developer-visual')).toHaveCSS('--detail', '0.0000');
  await compare.click();
  await expect(page.locator('.developer-visual')).toHaveCSS('--detail', '1.0000');
  await page.locator('.developer-scene-nav a[href="#developer-ownership"]').click();
  await expect(page.locator('[data-developer-caption]')).toContainText('The ownership');
  await page.locator('.developer-index-link').click();
  await expect(page.locator('#developer-experience')).toHaveJSProperty('open', true);
  await expect(page.locator('#developer-experience summary')).toBeFocused();
  await expect(page.locator('[data-experience="tlx-labs"]')).toBeVisible();
});

test('reduced motion follows the system and manual preferences persist', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('/');
  await expect(page.locator('html')).toHaveAttribute('data-motion', 'reduced');
  await expect(page.locator('.motion-toggle')).toBeDisabled();
  await expect(page.locator('[data-lab-rebuild]')).toBeEnabled();
  await page.locator('[data-lab-grab="card"]').click();
  await expect(page.locator('[data-lab]')).toHaveCSS('--lift', '1.0000');
  await expect(page.locator('#contact-title')).toHaveCSS('opacity', '1');
  await page.emulateMedia({ reducedMotion: 'no-preference' });
  await expect(page.locator('.motion-toggle')).toBeEnabled();
  await page.locator('.motion-toggle').click();
  await expect(page.locator('html')).toHaveAttribute('data-motion', 'reduced');
  await page.reload();
  await expect(page.locator('html')).toHaveAttribute('data-motion', 'reduced');
});

test('walkthrough loads on request and pauses when dismissed', async ({ page }) => {
  await page.goto('/');
  await page.locator('[data-open-video]').click();
  const video = page.locator('#video-dialog video');
  await expect(page.locator('#video-dialog')).toBeVisible();
  await expect.poll(() => video.evaluate(element => element.readyState >= 2)).toBe(true);
  await expect.poll(() => video.evaluate(element => element.duration)).toBeGreaterThan(10);
  await expect(page.locator('.video-error')).toBeHidden();
  await page.keyboard.press('Escape');
  await expect(page.locator('#video-dialog')).toBeHidden();
  await expect(video).toHaveJSProperty('paused', true);
});

test('layouts stay within the viewport at phone, tablet, and desktop widths', async ({ page }) => {
  for (const width of [320, 390, 768, 1024, 1440, 1920]) {
    await page.setViewportSize({ width, height: 900 });
    await page.goto('/');
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth), `overflow at ${width}px`).toBe(true);
    const title = await page.locator('#hero-title').boundingBox();
    expect(title.x).toBeGreaterThanOrEqual(0);
    expect(title.x + title.width).toBeLessThanOrEqual(width);
  }
});

test('key content and native links remain readable without JavaScript', async ({ browser, baseURL }) => {
  const context = await browser.newContext({ javaScriptEnabled: false, baseURL, viewport: { width: 390, height: 844 } });
  const page = await context.newPage();
  await page.goto('/');
  await expect(page.locator('#hero-title')).toBeVisible();
  await expect(page.locator('.desktop-nav a[href="#work"]')).toBeVisible();
  await expect(page.locator('#contact-title')).toHaveCSS('opacity', '1');
  await expect(page.locator('.project')).toHaveCount(4);
  await page.locator('#developer-experience summary').click();
  await expect(page.locator('[data-experience="tlx-labs"]')).toBeVisible();
  await context.close();
});

test('page passes automated accessibility checks', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('/');
  await page.addScriptTag({ content: axe.source });
  const violations = await page.evaluate(async () => (await window.axe.run(document, { runOnly: { type: 'tag', values: ['wcag2a', 'wcag2aa', 'wcag21aa'] } })).violations);
  expect(violations.map(v => ({ id: v.id, nodes: v.nodes.map(n => n.target) }))).toEqual([]);
});
