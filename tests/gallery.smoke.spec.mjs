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
  const trigger = page.locator('[data-project="trading-leagues"]');
  await trigger.focus();
  await page.keyboard.press('Enter');
  await expect(page.locator('#project-dialog')).toBeVisible();
  await expect(page.locator('#dialog-title')).toHaveText('Trading Leagues');
  await expect(page.locator('.dialog-visit')).toHaveAttribute('href', 'https://tradingleagues.app');
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

test('motion lab changes feel, lands precisely, and replays', async ({ page }) => {
  await page.goto('/#lab');
  const orb = page.locator('.lab-orb');
  for (const mode of ['fluid', 'spring', 'crisp']) {
    const button = page.locator(`[data-curve="${mode}"]`);
    await button.click();
    await expect(button).toHaveAttribute('aria-pressed', 'true');
    await expect.poll(() => orb.evaluate(element => {
      const track = element.parentElement;
      const position = new DOMMatrixReadOnly(getComputedStyle(element).transform).m41;
      return Math.abs(position - (track.clientWidth - element.clientWidth)) < 1;
    })).toBe(true);
  }
  await page.locator('.lab-replay').click();
  await expect(page.locator('.lab-description')).toContainText('Crisp');
});

test('reduced motion follows the system and manual preferences persist', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('/');
  await expect(page.locator('html')).toHaveAttribute('data-motion', 'reduced');
  await expect(page.locator('.motion-toggle')).toBeDisabled();
  await expect(page.locator('.lab-replay')).toBeDisabled();
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
  await context.close();
});

test('page passes automated accessibility checks', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('/');
  await page.addScriptTag({ content: axe.source });
  const violations = await page.evaluate(async () => (await window.axe.run(document, { runOnly: { type: 'tag', values: ['wcag2a', 'wcag2aa', 'wcag21aa'] } })).violations);
  expect(violations.map(v => ({ id: v.id, nodes: v.nodes.map(n => n.target) }))).toEqual([]);
});
