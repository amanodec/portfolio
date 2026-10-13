import { expect, test } from '@playwright/test';

const viewports = [
  [1920, 1080],
  [1440, 900],
  [1280, 800],
  [1024, 768],
  [834, 1194],
  [768, 1024],
  [430, 932],
  [390, 844],
  [360, 800],
  [320, 568]
];

test('declared viewport matrix keeps semantic content inside the viewport', async ({ page }, testInfo) => {
  test.skip(testInfo.project.name !== 'desktop', 'The full matrix runs once in the desktop project.');

  for (const [width, height] of viewports) {
    await page.setViewportSize({ width, height });
    await page.goto('/#hero', { waitUntil: 'domcontentloaded' });
    await page.waitForTimeout(120);

    const result = await page.evaluate(() => {
      const visible = [...document.querySelectorAll('main *')].filter((element) => {
        const style = getComputedStyle(element);
        return element.getClientRects().length > 0
          && style.position !== 'absolute'
          && style.position !== 'fixed'
          && !element.closest('[aria-hidden="true"]');
      });
      const overflow = visible
        .map((element) => ({ element, rect: element.getBoundingClientRect() }))
        .filter(({ rect }) => rect.width > 0 && rect.height > 0 && (rect.left < -1 || rect.right > window.innerWidth + 1))
        .slice(0, 12)
        .map(({ element, rect }) => ({
          tag: element.tagName.toLowerCase(),
          id: element.id,
          className: String(element.className).slice(0, 80),
          left: Math.round(rect.left),
          right: Math.round(rect.right)
        }));
      return { scrollWidth: document.documentElement.scrollWidth, clientWidth: document.documentElement.clientWidth, overflow };
    });

    expect(result.scrollWidth, `${width}x${height} horizontal scroll`).toBeLessThanOrEqual(result.clientWidth + 1);
    expect(result.overflow, `${width}x${height} semantic overflow`).toEqual([]);
  }
});

test('contact transmission stays inside its stage through portrait and landscape cuts', async ({ page }, testInfo) => {
  test.skip(testInfo.project.name !== 'desktop', 'The orientation matrix runs once in the desktop project.');

  for (const [width, height] of [[1440, 900], [1024, 768], [834, 1194], [390, 844], [320, 568]]) {
    await page.setViewportSize({ width, height });
    await page.goto('/#contact', { waitUntil: 'domcontentloaded' });
    const result = await page.evaluate(() => {
      const stage = document.querySelector('.contact-form-stage')?.getBoundingClientRect();
      const transmission = document.querySelector('.contact-transmission')?.getBoundingClientRect();
      if (!stage || !transmission) return null;
      return {
        stage: { left: stage.left, right: stage.right, top: stage.top, bottom: stage.bottom },
        transmission: { left: transmission.left, right: transmission.right, top: transmission.top, bottom: transmission.bottom }
      };
    });
    expect(result).not.toBeNull();
    expect(result.transmission.left, `${width}x${height} transmission left`).toBeGreaterThanOrEqual(result.stage.left - 1);
    expect(result.transmission.right, `${width}x${height} transmission right`).toBeLessThanOrEqual(result.stage.right + 1);
    expect(result.transmission.top, `${width}x${height} transmission top`).toBeGreaterThanOrEqual(result.stage.top - 1);
    expect(result.transmission.bottom, `${width}x${height} transmission bottom`).toBeLessThanOrEqual(result.stage.bottom + 1);
  }
});

test('orientation changes retain reachable controls and stable scene content', async ({ page }, testInfo) => {
  test.skip(testInfo.project.name !== 'desktop', 'The orientation matrix runs once in the desktop project.');

  await page.goto('/#identity', { waitUntil: 'domcontentloaded' });
  for (const [width, height] of [[834, 1194], [1194, 834], [390, 844], [844, 390], [390, 500]]) {
    await page.setViewportSize({ width, height });
    await page.goto('/#contact', { waitUntil: 'domcontentloaded' });
    await expect(page.locator('[data-contact-field]')).toHaveCount(7);
    await expect(page.locator('.contact-submit')).toBeVisible();
    const stable = await page.evaluate(() => ({
      scrollWidth: document.documentElement.scrollWidth,
      clientWidth: document.documentElement.clientWidth,
      messageWidth: document.querySelector('[data-contact-field="message"]')?.getBoundingClientRect().width || 0
    }));
    expect(stable.scrollWidth, `${width}x${height} orientation overflow`).toBeLessThanOrEqual(stable.clientWidth + 1);
    expect(stable.messageWidth, `${width}x${height} message control`).toBeGreaterThan(0);
  }
});

test('effects and WebGL fallbacks can switch without losing scene content', async ({ page }, testInfo) => {
  test.skip(testInfo.project.name !== 'desktop', 'The fallback matrix runs once in the desktop project.');

  await page.addInitScript(() => {
    const original = HTMLCanvasElement.prototype.getContext;
    HTMLCanvasElement.prototype.getContext = function (type, ...args) {
      if (type === 'webgl' || type === 'webgl2') return null;
      return original.call(this, type, ...args);
    };
  });
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('/#hero', { waitUntil: 'domcontentloaded' });
  await expect(page.locator('#hero')).toHaveAttribute('data-webgl', 'false');
  await expect(page.locator('#hero-title')).toContainText('ZESTT');
  await expect(page.locator('#effects-control')).toBeVisible();

  await page.locator('#effects-control').click();
  await page.locator('[data-effects="reduced"]').click();
  await expect(page.locator('html')).toHaveAttribute('data-effects', 'reduced');
  await page.goto('/#playground', { waitUntil: 'domcontentloaded' });
  await expect(page.locator('[data-experiment-panel]')).toHaveCount(3);
  await page.goto('/#hero', { waitUntil: 'domcontentloaded' });
  await page.locator('#effects-control').click();
  await page.locator('[data-effects="full"]').click();
  await expect(page.locator('html')).toHaveAttribute('data-effects', 'full');
  await expect(page.locator('#contact [data-contact-field]')).toHaveCount(7);
});

test('failed project media settles into an honest fallback without retry churn', async ({ page }) => {
  await page.route('**/assets/zestt/guest-walkthrough.mp4', async (route) => {
    await new Promise((resolve) => setTimeout(resolve, 250));
    await route.abort();
  });
  await page.goto('/#zestt', { waitUntil: 'domcontentloaded' });
  const media = page.locator('#zestt [data-project-media]');
  await expect(media).toHaveAttribute('data-media-state', /failed|aborted/);
  await expect(media.locator('.project-world-source-visual')).toContainText('Not a recreated interface');
  await expect(page.locator('#zestt .project-world-visit')).toBeVisible();
});

test('no-JavaScript fallback retains complete reading order at the smallest viewport', async ({ browser }, testInfo) => {
  test.skip(testInfo.project.name !== 'desktop', 'The no-JavaScript check runs once in the desktop project.');

  const context = await browser.newContext({
    javaScriptEnabled: false,
    baseURL: 'http://127.0.0.1:4173',
    viewport: { width: 320, height: 568 }
  });
  const page = await context.newPage();
  await page.goto('/#contact', { waitUntil: 'domcontentloaded' });
  await expect(page.locator('#hero-title')).toContainText('ZESTT');
  await expect(page.locator('#identity-title')).toContainText('moment between');
  await expect(page.locator('#playground [data-experiment-panel]')).toHaveCount(3);
  await expect(page.locator('#contact [data-contact-field]')).toHaveCount(7);
  await expect(page.locator('#contact a[href="mailto:amansharmaofficial27@gmail.com"]')).toHaveCount(1);
  await context.close();
});
