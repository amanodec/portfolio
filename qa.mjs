#!/usr/bin/env node

import { execFileSync } from 'node:child_process';
import { existsSync, readFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';

const root = dirname(new URL(import.meta.url).pathname);
const htmlPath = resolve(root, 'index.html');
const cssPath = resolve(root, 'style.css');
const jsPath = resolve(root, 'script.js');
const html = readFileSync(htmlPath, 'utf8');
const css = readFileSync(cssPath, 'utf8');
const js = readFileSync(jsPath, 'utf8');
const publicMarkup = html.replace(/<link\s+rel="icon"[^>]*>/i, '');
const failures = [];
const warnings = [];
const check = (condition, message) => condition ? undefined : failures.push(message);
const warn = (condition, message) => condition ? undefined : warnings.push(message);

check(/^<!doctype html>/i.test(html), 'index.html is missing a doctype.');
check(/<html\b[^>]*\blang="[a-z-]+"/i.test(html), 'The document needs an html lang attribute.');
check(/<meta\b[^>]*name="viewport"/i.test(html), 'The document needs a viewport meta tag.');
check(/<main\b[^>]*id="main-content"/i.test(html), 'The page needs a named main landmark.');
check(/href="#main-content"/.test(html), 'The skip link target is missing.');
check(/<title>[^<]+<\/title>/i.test(html), 'The document needs a non-empty title.');
check(/<script\s+type="module"\s+src="src\/main\.ts"/i.test(html), 'Phase 1 needs the TypeScript runtime entry point.');
check(/<canvas\b[^>]*id="signal-canvas"[^>]*aria-hidden="true"/i.test(html), 'Phase 1 needs one decorative, aria-hidden Signal canvas.');
check((html.match(/<canvas\b/gi) || []).length === 1, 'Phase 1 must keep exactly one canvas.');
check(/id="hero-title"[^>]*>[\s\S]*ZESTT/i.test(html), 'The Phase 1 hero must identify Zestt as the primary subject.');
check(/id="effects-control"/.test(html) && /data-effects="full"/.test(html) && /data-effects="reduced"/.test(html) && /data-effects="system"/.test(html), 'The Phase 1 effects control needs system, full, and reduced modes.');
check(/id="identity"[^>]*data-phase="identity"/.test(html), 'Phase 2 needs a semantic identity scene boundary.');
check(/data-split-text/.test(html), 'Phase 2 needs an unfragmented manifesto source for visual text splitting.');
check(/data-discipline-split/.test(html) && /id="discipline-range"[^>]*type="range"/.test(html), 'Phase 2 needs a native labeled discipline split control.');
check(/data-discipline-reset/.test(html), 'Phase 2 needs a reversible split reset control.');
check(/id="zestt"[^>]*data-phase="project-world"[^>]*data-project="zestt"/.test(html), 'Phase 3 needs one semantic Zestt benchmark project world.');
check(/id="zestt-world-title"/.test(html) && /id="zestt-proof-title"/.test(html), 'Phase 3 needs a readable benchmark title and proof layer.');
check(/data-project-media/.test(html) && /guest-experience\.mov/.test(html), 'Phase 3 needs an honest authentic-source media contract.');
check(['zestt', 'trading-leagues', 'decisionarc', 'vinayak-bikers'].every((slug) => new RegExp(`id="${slug}"[^>]*data-phase="project-world"[^>]*data-project="${slug}"`).test(html)), 'Phase 4 needs four ordered semantic project worlds.');
check((html.match(/data-project="[^"]+"/g) || []).length >= 4 && /project-world-index-list/.test(html), 'Phase 4 needs an ordered project index and navigation contract.');
check(!/data-chapter|chapter-rail|zestt-video|concept-preview|zestt-walkthrough|assets\/zestt\/0[1-9]-/i.test(html), 'Phase 4 must remove the legacy Zestt chapter and synthetic-media paths.');
check(!/proof-strip|proof-ledger|data-count|data-suffix/i.test(html + css + js), 'Phase 11 must remove the legacy unverified proof ledger and its counter runtime.');
check(!/(?:30%|1000\+|100%|25%)/.test(publicMarkup), 'Phase 11 must not publish the unverified legacy portfolio metrics.');
check(/src\/styles\/scenes\/project-worlds\.css/.test(html), 'Phase 3 needs a dedicated project-world style layer.');
check(!/href="tel:/i.test(html), 'The Phase 0 privacy decision hides the public phone number.');
check(!/concept-preview|chapter-rail|product-chapter|project-plate|zestt-intro|capture-fallback|capture-mobile|capture-desktop|order-relay|recording-timeline|architecture-core|tenant-boundary|zestt-close|(?:^|[^\w])capture(?:[^\w]|$)|project-top/i.test(css), 'Phase 4 must remove unused legacy project/capture CSS.');
check(/data-phase="capability"/.test(html), 'Phase 5 needs a capability reactor boundary.');
check((html.match(/data-capability-select="[^"]+"/g) || []).length === 6, 'Phase 5 needs six explicit capability selection controls.');
check((html.match(/data-capability-layer="[^"]+"/g) || []).length === 6, 'Phase 5 needs six identifiable Signal layers.');
check((html.match(/data-capability-evidence="[^"]+"/g) || []).length === 6, 'Phase 5 needs six semantic capability evidence sections.');
check(/data-source-thinking-panel/.test(html) && /data-source-thinking-close/.test(html), 'Phase 5 needs an explicit, reversible source-thinking cross-section.');
check(/role="radiogroup"/.test(html) && /role="radio"/.test(html), 'Phase 5 capability selection needs a single-selection accessibility contract.');
check(!/service-tab|skill-filters|evidence-table/i.test(html + css + js), 'Phase 5 must remove the legacy services/skills/evidence behavior.');
check(/id="experience"[^>]*data-phase="experience"/.test(html), 'Phase 6 needs a spatial professional-experience boundary.');
check((html.match(/data-experience-role="[^"]+"/g) || []).length === 3, 'Phase 6 needs exactly three semantic role evidence panels.');
check((html.match(/data-role-select="[^"]+"/g) || []).length === 3 && (html.match(/data-role-stop="[^"]+"/g) || []).length === 3, 'Phase 6 needs three explicit role controls and three spatial stops.');
check(/data-role-previous/.test(html) && /data-role-next/.test(html) && (html.match(/data-role-anchor="[^"]+"/g) || []).length === 3, 'Phase 6 needs previous/next controls and direct role anchors.');
check(/id="playground"[^>]*data-phase="playground"/.test(html), 'Phase 7 needs a semantic playground scene boundary.');
check(!/timeline-progress|timeline-entry|timeline-rule|timeline-card/i.test(html + css + js), 'Phase 6 must remove the legacy experience timeline behavior.');
const experienceMarkup = html.match(/<section[^>]*id="experience"[\s\S]*?<\/section>/i)?.[0] || '';
check(!/%|\b\d+\s*\+/.test(experienceMarkup), 'Phase 6 public experience copy must withhold unverified metrics.');
check((html.match(/data-experiment-panel="[^"]+"/g) || []).length === 3, 'Phase 7 needs exactly three semantic experiment panels.');
check((html.match(/data-experiment-select="[^"]+"/g) || []).length === 3, 'Phase 7 needs three keyboard/touch experiment selection controls.');
check((html.match(/data-experiment-reset="[^"]+"/g) || []).length === 3, 'Phase 7 needs one reset control per experiment.');
check(/data-elastic-surface/.test(html) && /data-elastic-range/.test(html), 'Phase 7 needs the elastic type manipulation surface and range fallback.');
check(/data-composition-boundary/.test(html) && (html.match(/data-composition-preset="[^"]+"/g) || []).length === 3, 'Phase 7 needs a responsive boundary and three real composition presets.');
check((html.match(/data-curve-mode="[^"]+"/g) || []).length === 3 && /data-curve-replay/.test(html) && /data-curve-pause/.test(html), 'Phase 7 needs direct, spring, cinematic, replay, and pause controls.');
check(!/id="playground-boundary"[^>]*data-phase="playground-anchor"|data-phase="playground-anchor"/.test(html), 'Phase 7 must replace the dormant playground anchor with the live scene.');
check(/id="philosophy"[^>]*data-phase="quiet"/.test(html), 'Phase 8 needs a semantic quiet philosophy scene boundary.');
check((html.match(/data-philosophy-statement/g) || []).length === 2, 'Phase 8 needs exactly two philosophy statements.');
check(/id="contact"[^>]*data-phase="contact"/.test(html) && /data-contact-form/.test(html), 'Phase 8 needs the semantic contact scene and enhanced form contract.');
check((html.match(/data-contact-field="[^"]+"/g) || []).length === 7, 'Phase 8 needs seven preserved contact fields.');
check((html.match(/data-transmission-segment="[^"]+"/g) || []).length === 7, 'Phase 8 needs one decorative transmission segment per contact field.');
check(/data-contact-monogram/.test(html) && /Delivery is not confirmed/.test(readFileSync(resolve(root, 'src/forms/ContactForm.ts'), 'utf8')), 'Phase 8 must use an honest mail-client status and deferred monogram resolution.');

const ids = [...html.matchAll(/\bid="([^"\s]+)"/g)].map((match) => match[1]);
const duplicateIds = [...new Set(ids.filter((id, index) => ids.indexOf(id) !== index))];
check(!duplicateIds.length, `Duplicate IDs: ${duplicateIds.join(', ')}`);
const idSet = new Set(ids);

for (const match of html.matchAll(/\b(?:href|src|poster)="([^"]+)"/g)) {
  const ref = match[1];
  if (ref.startsWith('#')) check(idSet.has(ref.slice(1)), `Missing internal target: ${ref}`);
  if (/^(?:https?:|data:|mailto:|tel:|\/\/)/i.test(ref) || ref.startsWith('#')) continue;
  const cleanRef = ref.split(/[?#]/)[0];
  const present = existsSync(resolve(root, cleanRef));
  warn(present, `Provisional or missing local media: ${cleanRef}`);
}

for (const match of html.matchAll(/<img\b([^>]*)>/gi)) {
  const attrs = match[1];
  check(/\balt="[^"]*"/i.test(attrs), 'Every image needs an alt attribute.');
  check(/\bwidth="\d+"/i.test(attrs) && /\bheight="\d+"/i.test(attrs), 'Every image needs explicit width and height.');
}

for (const match of html.matchAll(/<button\b([^>]*)>/gi)) {
  check(/\btype="(?:button|submit|reset)"/i.test(match[1]), 'Every button needs an explicit type.');
}

for (const match of html.matchAll(/<a\b([^>]*)>/gi)) {
  const attrs = match[1];
  if (/\btarget="_blank"/i.test(attrs)) check(/\brel="[^"]*noopener/i.test(attrs), 'Every new-tab link needs rel="noopener".');
}

for (const match of html.matchAll(/<(?:input|select|textarea)\b([^>]*)>/gi)) {
  const describedBy = match[1].match(/\baria-describedby="([^"]+)"/i)?.[1];
  if (describedBy) describedBy.split(/\s+/).forEach((id) => check(idSet.has(id), `Missing aria-describedby target: #${id}`));
}
for (const match of html.matchAll(/\baria-(?:labelledby|controls)="([^"]+)"/gi)) {
  match[1].split(/\s+/).forEach((id) => check(idSet.has(id), `Missing ARIA reference target: #${id}`));
}

const videos = html.match(/<video\b[^>]*>/gi) || [];
check(videos.length <= 1, 'Only one video should be present so playback remains coordinated.');
if (videos.length) {
  check(/<video\b[^>]*\bcontrols\b/i.test(html), 'Any project video needs native controls.');
  check(/<video\b[^>]*\bpreload="metadata"/i.test(html), 'Any project video should use metadata preload.');
  check(/<track\b[^>]*kind="captions"/i.test(html), 'Any project video needs a captions track.');
}
check(!/<video\b[^>]*\bautoplay\b/i.test(html), 'Project videos must not autoplay.');

const cssWithoutComments = css.replace(/\/\*[\s\S]*?\*\//g, '');
check((cssWithoutComments.match(/{/g) || []).length === (cssWithoutComments.match(/}/g) || []).length, 'style.css has unbalanced braces.');
try {
  execFileSync(process.execPath, ['--check', jsPath], { stdio: 'pipe' });
} catch (error) {
  failures.push(`script.js syntax check failed: ${error.stderr?.toString().trim() || error.message}`);
}

if (failures.length) {
  console.error(`QA FAIL · ${failures.length} issue(s)`);
  failures.forEach((message) => console.error(`  ✗ ${message}`));
  process.exitCode = 1;
} else {
  console.log('QA PASS · document structure, references, media semantics, CSS balance, and JavaScript syntax');
}
if (warnings.length) {
  console.log(`QA NOTE · ${warnings.length} provisional/missing local asset(s) intentionally remain`);
  warnings.forEach((message) => console.log(`  · ${message}`));
}
