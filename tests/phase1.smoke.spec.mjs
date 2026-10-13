import { expect, test } from '@playwright/test';
import axe from 'axe-core';

test('Zestt hero renders as semantic content with one decorative canvas', async ({ page }) => {
  const errors = [];
  page.on('pageerror', (error) => errors.push(error.message));
  await page.goto('/');
  await expect(page.locator('h1#hero-title')).toContainText('ZESTT');
  await expect(page.locator('#signal-canvas')).toHaveAttribute('aria-hidden', 'true');
  await expect(page.locator('canvas')).toHaveCount(1);
  await expect(page.locator('a[href="#zestt"]:visible').first()).toBeVisible();
  expect(errors).toEqual([]);
});

test('effects control exposes live full, reduced, and system choices', async ({ page }) => {
  await page.goto('/');
  const control = page.locator('#effects-control');
  await control.click();
  await expect(page.locator('#effects-menu')).toBeVisible();
  await page.locator('[data-effects="reduced"]').click();
  await expect(page.locator('html')).toHaveAttribute('data-effects', 'reduced');
  await control.click();
  await page.locator('[data-effects="system"]').click();
  await expect(page.locator('html')).toHaveAttribute('data-effects-preference', 'system');
});

test('mobile hero keeps readable content and normal-flow controls', async ({ page }) => {
  await page.goto('/');
  await expect(page.locator('.phase1-title-primary')).toBeVisible();
  await expect(page.locator('.phase1-actions a').first()).toBeVisible();
  if ((page.viewportSize()?.width ?? 1440) <= 760) {
    await expect(page.locator('.menu-toggle')).toBeVisible();
    await page.locator('.menu-toggle').click();
    await expect(page.locator('#mobile-menu')).toHaveAttribute('aria-hidden', 'false');
    await page.keyboard.press('Escape');
    await expect(page.locator('#mobile-menu')).toHaveAttribute('aria-hidden', 'true');
  }
});

test('no-WebGL fallback keeps the hero usable', async ({ page }) => {
  await page.addInitScript(() => {
    const original = HTMLCanvasElement.prototype.getContext;
    HTMLCanvasElement.prototype.getContext = function (type, ...args) {
      if (type === 'webgl' || type === 'webgl2') return null;
      return original.call(this, type, ...args);
    };
  });
  await page.goto('/');
  await expect(page.locator('#hero')).toHaveAttribute('data-webgl', 'false');
  await expect(page.locator('#hero-title')).toContainText('ZESTT');
});

test('no-JavaScript path keeps the Zestt hero and navigation readable', async ({ browser }) => {
  const context = await browser.newContext({ javaScriptEnabled: false, baseURL: 'http://127.0.0.1:4173' });
  const page = await context.newPage();
  await page.goto('/');
  await expect(page.locator('#hero-title')).toContainText('ZESTT');
  await expect(page.locator('a[href="#zestt"]:visible').first()).toBeVisible();
  await context.close();
});

test('keyboard path and system reduced motion remain available', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('/');
  await expect(page.locator('html')).toHaveAttribute('data-effects', 'reduced');
  await page.locator('.skip-link').focus();
  await expect(page.locator('.skip-link')).toBeFocused();
  await page.locator('#effects-control').focus();
  await page.keyboard.press('Enter');
  await expect(page.locator('#effects-menu')).toBeVisible();
  await page.keyboard.press('Escape');
  await page.locator('.phase1-actions a').first().focus();
  await expect(page.locator('.phase1-actions a').first()).toBeFocused();
});

test('identity scene exposes semantic manifesto text and a labeled native split control', async ({ page }) => {
  await page.goto('/');
  const identity = page.locator('#identity');
  await identity.scrollIntoViewIfNeeded();
  await expect(identity.locator('h2#identity-title')).toContainText('moment between');
  await expect(identity.locator('[data-split-text]')).toContainText('guest’s choice');
  await expect(identity.locator('#discipline-range')).toHaveAttribute('aria-describedby', 'discipline-help discipline-value');
  await expect(identity.locator('[data-discipline-reset]')).toBeVisible();
});

test('discipline split supports keyboard extremes and reversible midpoint reset', async ({ page }) => {
  await page.goto('/');
  const range = page.locator('#discipline-range');
  await range.scrollIntoViewIfNeeded();
  await range.focus();
  await page.keyboard.press('Home');
  await expect(page.locator('#discipline-value')).toContainText('0 / visual');
  await page.keyboard.press('End');
  await expect(page.locator('#discipline-value')).toContainText('100 / engineering');
  await page.locator('[data-discipline-reset]').click();
  await expect(page.locator('#discipline-value')).toContainText('50 / midpoint');
});

test('hero receives identity scene and the identity scene exits before legacy content', async ({ page }) => {
  await page.goto('/');
  await page.evaluate(() => window.scrollTo(0, document.querySelector('#identity').offsetTop));
  await page.waitForTimeout(80);
  await expect(page.locator('#identity')).toHaveAttribute('data-scene-state', 'active');
  await page.evaluate(() => window.scrollTo(0, document.querySelector('#services').offsetTop));
  await page.waitForTimeout(80);
  await expect(page.locator('#identity')).toHaveAttribute('data-scene-state', 'settled');
});

test('identity remains complete with reduced effects and without JavaScript', async ({ page, browser }) => {
  await page.goto('/');
  await page.locator('#effects-control').click();
  await page.locator('[data-effects="reduced"]').click();
  await page.locator('#identity').scrollIntoViewIfNeeded();
  await expect(page.locator('#identity')).toHaveAttribute('data-effects', 'reduced');
  await expect(page.locator('#identity-title')).toContainText('system’s response');

  const context = await browser.newContext({ javaScriptEnabled: false, baseURL: 'http://127.0.0.1:4173' });
  const noScriptPage = await context.newPage();
  await noScriptPage.goto('/');
  await noScriptPage.locator('#identity').scrollIntoViewIfNeeded();
  await expect(noScriptPage.locator('#identity-title')).toContainText('system’s response');
  await expect(noScriptPage.locator('#discipline-range')).toBeVisible();
  await context.close();
});

test('identity scene passes axe checks at its interactive boundary', async ({ page }) => {
  await page.goto('/');
  await page.locator('#identity').scrollIntoViewIfNeeded();
  await page.addScriptTag({ content: axe.source });
  const results = await page.evaluate(async () => window.axe.run(document.querySelector('#identity'), {
    runOnly: { type: 'tag', values: ['wcag2a', 'wcag2aa'] }
  }));
  expect(results.violations).toEqual([]);
});

test('identity keeps the source sentence selectable and the control usable in forced colors', async ({ page }) => {
  await page.emulateMedia({ forcedColors: 'active', reducedMotion: 'reduce' });
  await page.goto('/');
  await page.locator('#identity').scrollIntoViewIfNeeded();
  const selected = await page.evaluate(() => {
    const source = document.querySelector('.identity-split-source');
    const selection = window.getSelection();
    const range = document.createRange();
    range.selectNodeContents(source);
    selection?.removeAllRanges();
    selection?.addRange(range);
    return selection?.toString() ?? '';
  });
  expect(selected).toContain('moment between a guest’s choice');
  await expect(page.locator('#discipline-range')).toBeVisible();
  await expect(page.locator('[data-discipline-reset]')).toBeVisible();
});

test('Zestt project world exposes semantic proof, authentic source, and the complete sequence navigation', async ({ page }) => {
  const errors = [];
  page.on('pageerror', (error) => errors.push(error.message));
  await page.goto('/#zestt');
  const world = page.locator('#zestt');
  await expect(world.locator('h2#zestt-world-title')).toContainText('ZESTT');
  await expect(world.locator('#zestt-proof-title')).toContainText('handoff');
  await expect(world.locator('.project-world-facts')).toContainText('React');
  await expect(world.locator('[data-project-media] a')).toHaveAttribute('href', 'assets/zestt/guest-walkthrough.mp4');
  await expect(world.locator('.project-navigation [data-project-current]')).toHaveAttribute('aria-current', 'page');
  await expect(world.locator('.project-navigation a[href="#trading-leagues"]')).toContainText('Trading');
  expect(errors).toEqual([]);
});

test('Phase 4 exposes four ordered worlds with distinct semantic proof', async ({ page }) => {
  await page.goto('/#trading-leagues');
  const worlds = page.locator('[data-phase="project-world"]');
  await expect(worlds).toHaveCount(4);
  await expect(page.locator('#trading-leagues h2')).toContainText('TRADING');
  await expect(page.locator('#trading-leagues .project-world-source-visual')).toContainText('No authentic capture supplied');
  await expect(page.locator('#decisionarc h2')).toContainText('DECISION');
  await expect(page.locator('#decisionarc .decision-branch-field')).toBeVisible();
  await expect(page.locator('#vinayak-bikers h2')).toContainText('VINAYAK');
  await expect(page.locator('#vinayak-bikers .bikers-road')).toBeVisible();
  await expect(page.locator('[data-chapter], .chapter-rail, .project-plate')).toHaveCount(0);
});

test('Phase 4 direct navigation resolves each world and carries the match cut', async ({ page }) => {
  await page.goto('/#decisionarc');
  await expect(page.locator('#decisionarc')).toHaveAttribute('data-scene-state', 'active');
  await expect(page.locator('#decisionarc')).toHaveAttribute('data-project-state', 'entry');
  await page.evaluate(() => {
    const section = document.querySelector('#decisionarc');
    window.scrollTo(0, section.offsetTop + (section.offsetHeight - window.innerHeight) * .84);
  });
  await page.waitForTimeout(80);
  await expect(page.locator('#decisionarc')).toHaveAttribute('data-project-state', 'proof');
  await expect(page.locator('#decisionarc')).toHaveAttribute('data-match-cut', 'outgoing');
  await expect(page.locator('#vinayak-bikers')).toHaveAttribute('data-match-cut', 'incoming');
});

test('Phase 4 navigation supports direct links and browser history between worlds', async ({ page }) => {
  await page.goto('/#trading-leagues');
  const next = page.locator('#trading-leagues .project-navigation a[href="#decisionarc"]');
  await next.focus();
  await page.keyboard.press('Enter');
  await expect(page).toHaveURL(/#decisionarc$/);
  await expect(page.locator('#decision-world-title')).toBeVisible();
  await page.goBack();
  await expect(page).toHaveURL(/#trading-leagues$/);
  await expect(page.locator('#trading-world-title')).toBeVisible();
});

test('Phase 4 worlds keep proof complete with reduced effects and without WebGL', async ({ page }) => {
  await page.addInitScript(() => {
    localStorage.setItem('zestt-phase1-effects', 'reduced');
    const original = HTMLCanvasElement.prototype.getContext;
    HTMLCanvasElement.prototype.getContext = function (type, ...args) {
      if (type === 'webgl' || type === 'webgl2') return null;
      return original.call(this, type, ...args);
    };
  });
  await page.goto('/#vinayak-bikers');
  await expect(page.locator('html')).toHaveAttribute('data-effects', 'reduced');
  await expect(page.locator('#vinayak-bikers')).toHaveAttribute('data-webgl', 'false');
  await expect(page.locator('#vinayak-bikers .project-world-proof')).toContainText('Discovery should lead somewhere useful');
  await expect(page.locator('#vinayak-bikers .project-world-visit')).toBeVisible();
});

test('Phase 4 worlds remain readable without JavaScript and pass axe as a sequence', async ({ browser, page }) => {
  const context = await browser.newContext({ javaScriptEnabled: false, baseURL: 'http://127.0.0.1:4173' });
  const noScriptPage = await context.newPage();
  await noScriptPage.goto('/#trading-leagues');
  await expect(noScriptPage.locator('#trading-world-title')).toContainText('TRADING');
  await expect(noScriptPage.locator('#trading-leagues .project-world-facts')).toContainText('Next.js');
  await expect(noScriptPage.locator('#trading-leagues .project-world-visit')).toHaveAttribute('href', 'https://tradingleagues.app');
  await context.close();

  await page.goto('/#vinayak-bikers');
  await page.addScriptTag({ content: axe.source });
  const violations = await page.evaluate(async () => {
    const results = [];
    for (const section of document.querySelectorAll('[data-phase="project-world"]')) {
      const result = await window.axe.run(section, { runOnly: { type: 'tag', values: ['wcag2a', 'wcag2aa'] } });
      results.push(...result.violations);
    }
    return results;
  });
  expect(violations).toEqual([]);
});

test('Zestt project world moves through entry, signature, proof, and reverse exit states', async ({ page }) => {
  await page.goto('/');
  const world = page.locator('#zestt');
  await page.evaluate(() => window.scrollTo(0, document.querySelector('#zestt').offsetTop + 1));
  await page.waitForTimeout(80);
  await expect(world).toHaveAttribute('data-scene-state', 'active');
  await expect(world).toHaveAttribute('data-project-state', 'entry');
  await page.evaluate(() => {
    const section = document.querySelector('#zestt');
    window.scrollTo(0, section.offsetTop + (section.offsetHeight - window.innerHeight) * .45);
  });
  await page.waitForTimeout(80);
  await expect(world).toHaveAttribute('data-project-state', 'signature');
  await page.evaluate(() => {
    const section = document.querySelector('#zestt');
    window.scrollTo(0, section.offsetTop + (section.offsetHeight - window.innerHeight) * .82);
  });
  await page.waitForTimeout(80);
  await expect(world).toHaveAttribute('data-project-state', 'proof');
  await page.evaluate(() => window.scrollTo(0, document.querySelector('#services').offsetTop));
  await page.waitForTimeout(80);
  await expect(world).toHaveAttribute('data-scene-state', 'settled');
});

test('Zestt project world preserves keyboard links and direct hash entry', async ({ page }) => {
  await page.goto('/#zestt');
  const previous = page.locator('.project-navigation a[href="#identity"]');
  const index = page.locator('#zestt .project-navigation a[href="#projects"]');
  await expect(previous).toBeVisible();
  await expect(index).toBeVisible();
  await previous.focus();
  await expect(previous).toBeFocused();
  await page.keyboard.press('Enter');
  await expect(page).toHaveURL(/#identity$/);
  await page.goBack();
  await expect(page).toHaveURL(/#zestt$/);
  await expect(page.locator('#zestt-world-title')).toBeVisible();
});

test('Zestt project world keeps proof complete in reduced effects and without WebGL', async ({ page }) => {
  await page.addInitScript(() => {
    localStorage.setItem('zestt-phase1-effects', 'reduced');
    const original = HTMLCanvasElement.prototype.getContext;
    HTMLCanvasElement.prototype.getContext = function (type, ...args) {
      if (type === 'webgl' || type === 'webgl2') return null;
      return original.call(this, type, ...args);
    };
  });
  await page.goto('/#zestt');
  await expect(page.locator('html')).toHaveAttribute('data-effects', 'reduced');
  await expect(page.locator('#zestt')).toHaveAttribute('data-webgl', 'false');
  await expect(page.locator('#zestt-proof-title')).toContainText('handoff');
  await expect(page.locator('#zestt .project-world-visit')).toBeVisible();
});

test('Zestt project world remains readable without JavaScript', async ({ browser }) => {
  const context = await browser.newContext({ javaScriptEnabled: false, baseURL: 'http://127.0.0.1:4173' });
  const page = await context.newPage();
  await page.goto('/#zestt');
  await expect(page.locator('#zestt-world-title')).toContainText('ZESTT');
  await expect(page.locator('#zestt-proof-title')).toContainText('handoff');
  await expect(page.locator('#zestt .project-world-facts')).toContainText('Node API');
  await expect(page.locator('#zestt .project-world-visit')).toHaveAttribute('href', 'https://zestt.in');
  await expect(page.locator('#zestt .project-world-noscript')).toBeVisible();
  await context.close();
});

test('Zestt project world keeps an honest fallback when authentic media fails', async ({ page }) => {
  await page.route('**/assets/zestt/guest-walkthrough.mp4', (route) => route.abort());
  await page.goto('/#zestt');
  await expect(page.locator('#zestt [data-project-media]')).toHaveAttribute('data-media-state', /failed|aborted/);
  await expect(page.locator('#zestt [data-project-media] .project-world-source-visual')).toContainText('Not a recreated interface');
  await expect(page.locator('#zestt [data-project-media] a')).toBeVisible();
});

test('Zestt project world passes axe checks at entry and keeps the source selectable', async ({ page }) => {
  await page.goto('/#zestt');
  await page.locator('#zestt').scrollIntoViewIfNeeded();
  await page.addScriptTag({ content: axe.source });
  const results = await page.evaluate(async () => window.axe.run(document.querySelector('#zestt'), {
    runOnly: { type: 'tag', values: ['wcag2a', 'wcag2aa'] }
  }));
  expect(results.violations).toEqual([]);
  const selected = await page.evaluate(() => {
    const source = document.querySelector('.project-world-source-visual');
    const selection = window.getSelection();
    const range = document.createRange();
    range.selectNodeContents(source);
    selection?.removeAllRanges();
    selection?.addRange(range);
    return selection?.toString() ?? '';
  });
  expect(selected).toContain('Guest experience recording');
});

test('Zestt project world keeps its active frame cadence bounded during signature travel', async ({ page }) => {
  await page.goto('/');
  await page.evaluate(() => {
    const section = document.querySelector('#zestt');
    window.scrollTo(0, section.offsetTop + (section.offsetHeight - window.innerHeight) * .45);
  });
  await page.waitForTimeout(100);
  const cadence = await page.evaluate(() => new Promise((resolve) => {
    const intervals = [];
    let previous = 0;
    let frames = 0;
    const sample = (time) => {
      if (previous) intervals.push(time - previous);
      previous = time;
      frames += 1;
      if (frames >= 16) {
        resolve({
          average: intervals.reduce((sum, interval) => sum + interval, 0) / Math.max(intervals.length, 1),
          maximum: Math.max(...intervals)
        });
        return;
      }
      requestAnimationFrame(sample);
    };
    requestAnimationFrame(sample);
  }));
  expect(cadence.average).toBeLessThan(40);
  expect(cadence.maximum).toBeLessThan(100);
});
