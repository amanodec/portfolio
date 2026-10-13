import { expect, test } from '@playwright/test';
import axe from 'axe-core';

test('quiet interval receives the playground and exposes two philosophy statements', async ({ page }) => {
  const errors = [];
  page.on('pageerror', (error) => errors.push(error.message));
  await page.goto('/#philosophy');
  const quiet = page.locator('#philosophy');
  await expect(quiet).toHaveAttribute('data-scene-state', 'active');
  await expect(quiet.locator('[data-philosophy-statement]')).toHaveCount(2);
  await expect(quiet.locator('.quiet-signal-point')).toBeVisible();
  await expect(quiet.locator('a[href="#contact"]')).toBeVisible();
  expect(errors).toEqual([]);
});

test('contact form preserves labels, invalid focus, and honest status', async ({ page }) => {
  await page.goto('/#contact');
  const contact = page.locator('#contact');
  await expect(contact).toHaveAttribute('data-scene-state', 'active');
  await expect(contact.locator('[data-contact-field]')).toHaveCount(7);
  await expect(contact.locator('[data-transmission-segment]')).toHaveCount(7);
  await contact.locator('button[type="submit"]').click();
  await expect(contact.locator('[data-contact-field="name"]')).toBeFocused();
  await expect(contact.locator('[data-contact-status]')).toHaveText('Please complete the highlighted fields.');
  await expect(contact.locator('[data-transmission-segment].is-complete')).toHaveCount(0);
  await expect(contact.locator('[data-contact-field="name"]')).toHaveAttribute('aria-invalid', 'true');
});

test('valid field completion lights the transmission from current validity', async ({ page }) => {
  await page.goto('/#contact');
  const contact = page.locator('#contact');
  await contact.locator('[data-contact-field="name"]').fill('Aman');
  await contact.locator('[data-contact-field="email"]').fill('hello@example.com');
  await contact.locator('[data-contact-field="project"]').selectOption({ label: 'Web or mobile product' });
  await contact.locator('[data-contact-field="timeline"]').selectOption({ label: 'Flexible' });
  await contact.locator('[data-contact-field="stage"]').selectOption({ label: 'Idea / brief' });
  await contact.locator('[data-contact-field="budget"]').selectOption({ label: 'Let’s discuss' });
  await contact.locator('[data-contact-field="message"]').fill('A clear product brief with a real interaction problem.');
  await expect(contact).toHaveAttribute('data-completed-fields', '7');
  await expect(contact.locator('[data-transmission-segment].is-complete')).toHaveCount(7);
  await contact.locator('[data-copy-email]').click();
  await expect(contact.locator('[data-copy-status]')).toHaveText(/Email copied\.|Copy unavailable/);
});

test('quiet and contact remain complete in reduced motion, forced colors, and no WebGL', async ({ page }) => {
  await page.emulateMedia({ forcedColors: 'active', reducedMotion: 'reduce' });
  await page.goto('/#philosophy');
  await expect(page.locator('html')).toHaveAttribute('data-effects', 'reduced');
  await expect(page.locator('#philosophy')).toHaveAttribute('data-webgl', 'false');
  await page.goto('/#contact');
  await expect(page.locator('#contact')).toHaveAttribute('data-webgl', 'false');
  await expect(page.locator('[data-contact-field="message"]')).toBeVisible();
});

test('contact fallback keeps direct mailto and complete form content without JavaScript', async ({ browser }) => {
  const context = await browser.newContext({ javaScriptEnabled: false, baseURL: 'http://127.0.0.1:4173' });
  const page = await context.newPage();
  await page.goto('/#contact');
  const contact = page.locator('#contact');
  await expect(contact.locator('[data-contact-field]')).toHaveCount(7);
  await expect(contact.locator('a[href="mailto:amansharmaofficial27@gmail.com"]')).toHaveCount(1);
  await expect(contact).toContainText('No data is stored or sent to a hidden service');
  await context.close();
});

test('closing sequence stays readable through repeated entry and 200%/400% zoom', async ({ page }) => {
  await page.goto('/#contact');
  await page.setViewportSize({ width: 390, height: 844 });
  for (const zoom of [2, 4]) {
    await page.evaluate((value) => { document.body.style.zoom = String(value); }, zoom);
    await expect(page.locator('#contact [data-contact-field]')).toHaveCount(7);
    await expect(page.locator('#contact [data-copy-email]')).toBeVisible();
  }
  await page.evaluate(() => { document.body.style.zoom = '1'; });
  await page.goto('/#philosophy');
  await expect(page.locator('#philosophy [data-philosophy-statement]')).toHaveCount(2);
});

test('contact boundary passes axe', async ({ page }) => {
  await page.goto('/#contact');
  await page.addScriptTag({ content: axe.source });
  const results = await page.evaluate(async () => window.axe.run(document.querySelector('#contact'), {
    runOnly: { type: 'tag', values: ['wcag2a', 'wcag2aa'] }
  }));
  expect(results.violations).toEqual([]);
});
