import { projectRegistry } from './content/projects';
import { profileContent } from './content/profile';
import { CompositionMotion } from './motion/CompositionMotion';
import { CompositionLab } from './motion/CompositionLab';
import { DeveloperStory } from './motion/DeveloperStory';
import { HeroInteraction } from './motion/HeroInteraction';

const root = document.documentElement;
const query = <T extends HTMLElement>(selector: string) => document.querySelector<T>(selector)!;
const all = <T extends HTMLElement>(selector: string) => Array.from(document.querySelectorAll<T>(selector));
const controller = new AbortController();
const signal = controller.signal;
const systemMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)');
const motionButton = query<HTMLButtonElement>('.motion-toggle');
let paused = false;
try { paused = localStorage.getItem('aman-gallery-motion') === 'paused'; } catch { /* Storage is optional. */ }
let reduced = paused || systemMotion.matches;

type TiltState = { element: HTMLElement; x: number; y: number; tx: number; ty: number };
const tilts: TiltState[] = all<HTMLElement>('[data-tilt]').map(element => ({ element, x: 0, y: 0, tx: 0, ty: 0 }));
const magnetic = all<HTMLElement>('[data-magnetic]').map(element => ({ element, x: 0, y: 0, tx: 0, ty: 0 }));
let frameId = 0;
let previousFrame = 0;
let scrollDirty = true;
const progressBar = query<HTMLElement>('.scroll-progress');
const header = query<HTMLElement>('#header');
const sectionLinks = all<HTMLAnchorElement>('.desktop-nav a');
const sections = all<HTMLElement>('main > section[id]');
const projectArt = all<HTMLElement>('.project-art');
const walkthroughUrl = new URL('../assets/zestt/guest-walkthrough.mp4', import.meta.url).href;
const composition = new CompositionMotion(requestFrame, signal);
const lab = new CompositionLab(requestFrame, signal);
const developer = new DeveloperStory(requestFrame, signal);
const heroInteraction = new HeroInteraction(signal, !reduced);

function requestFrame() {
  if (!frameId && !document.hidden) frameId = requestAnimationFrame(updateFrame);
}
function updateFrame(time: number) {
  frameId = 0;
  const delta = Math.min(Math.max((time - previousFrame) / 16.67, .1), 3);
  previousFrame = time;
  const smoothing = 1 - Math.pow(.84, delta);
  let unsettled = false;
  if (scrollDirty) {
    const y = window.scrollY;
    const length = Math.max(document.documentElement.scrollHeight - window.innerHeight, 1);
    progressBar.style.transform = `scaleX(${Math.min(y / length, 1)})`;
    header.classList.toggle('is-scrolled', y > 25);
    let current = 'home';
    for (const section of sections) if (section.offsetTop <= y + window.innerHeight * .35) current = section.id;
    sectionLinks.forEach(link => {
      if (link.hash === `#${current}`) link.setAttribute('aria-current', 'location');
      else link.removeAttribute('aria-current');
    });
    if (!reduced) for (const art of projectArt) {
      const rect = art.getBoundingClientRect();
      if (rect.bottom < 0 || rect.top > window.innerHeight) continue;
      const position = (rect.top + rect.height / 2 - window.innerHeight / 2) / window.innerHeight;
      art.style.setProperty('--art-progress', Math.max(-1, Math.min(1, position)).toFixed(4));
    }
    scrollDirty = false;
  }
  for (const state of [...tilts, ...magnetic]) {
    state.x += (state.tx - state.x) * smoothing;
    state.y += (state.ty - state.y) * smoothing;
    if (Math.abs(state.tx - state.x) + Math.abs(state.ty - state.y) > .002) unsettled = true;
    if (state.element.hasAttribute('data-tilt')) {
      state.element.style.setProperty('--tilt-x', state.x.toFixed(4));
      state.element.style.setProperty('--tilt-y', state.y.toFixed(4));
    } else state.element.style.translate = `${state.x.toFixed(2)}px ${state.y.toFixed(2)}px`;
  }
  if (composition.update(delta)) unsettled = true;
  if (lab.update(delta / 60)) unsettled = true;
  if (developer.update(delta)) unsettled = true;
  if (unsettled) requestFrame();
}
for (const state of tilts) {
  state.element.addEventListener('pointermove', event => {
    if (reduced || !finePointer.matches || event.pointerType === 'touch') return;
    const bounds = state.element.getBoundingClientRect();
    state.tx = Math.max(-1, Math.min(1, ((event.clientX - bounds.left) / bounds.width - .5) * 2));
    state.ty = Math.max(-1, Math.min(1, ((event.clientY - bounds.top) / bounds.height - .5) * 2));
    requestFrame();
  }, { passive: true, signal });
  state.element.addEventListener('pointerleave', () => { state.tx = state.ty = 0; requestFrame(); }, { signal });
}
for (const state of magnetic) {
  state.element.addEventListener('pointermove', event => {
    if (reduced || !finePointer.matches || event.pointerType === 'touch') return;
    const bounds = state.element.getBoundingClientRect();
    state.tx = ((event.clientX - bounds.left) / bounds.width - .5) * 8;
    state.ty = ((event.clientY - bounds.top) / bounds.height - .5) * 6;
    requestFrame();
  }, { passive: true, signal });
  state.element.addEventListener('pointerleave', () => { state.tx = state.ty = 0; requestFrame(); }, { signal });
}
window.addEventListener('scroll', () => { scrollDirty = true; requestFrame(); }, { passive: true, signal });
window.addEventListener('resize', () => { scrollDirty = true; requestFrame(); }, { passive: true, signal });
document.addEventListener('visibilitychange', () => {
  document.body.classList.toggle('page-hidden', document.hidden);
  if (document.hidden) { cancelAnimationFrame(frameId); frameId = 0; }
  else { scrollDirty = true; requestFrame(); }
}, { signal });

const revealObserver = new IntersectionObserver(entries => {
  for (const entry of entries) {
    entry.target.classList.toggle('in-view', entry.isIntersecting);
    if (entry.isIntersecting) entry.target.classList.add('is-visible');
  }
}, { rootMargin: '0px 0px -5% 0px', threshold: .08 });
all<HTMLElement>('[data-reveal], .sculpture-wrap, .discipline-strip, .role').forEach(element => revealObserver.observe(element));

// A native, keyboard-safe menu; background content is inert while it is open.
const menu = query<HTMLElement>('#menu');
const menuButton = query<HTMLButtonElement>('.menu-toggle');
const menuClose = query<HTMLButtonElement>('.menu-close');
const inertTargets = [header, query<HTMLElement>('#main'), query<HTMLElement>('.footer')];
let menuOpen = false;
function syncOverlayLock() {
  document.body.classList.toggle('overlay-open', menuOpen || !!document.querySelector('dialog[open]'));
}
function setMenu(open: boolean, restoreFocus = true) {
  menuOpen = open;
  menu.hidden = !open;
  menu.inert = !open;
  menu.classList.toggle('is-open', open);
  menuButton.setAttribute('aria-expanded', String(open));
  inertTargets.forEach(element => { element.inert = open; });
  syncOverlayLock();
  if (open) menuClose.focus({ preventScroll: true });
  else if (restoreFocus) menuButton.focus({ preventScroll: true });
}
menuButton.addEventListener('click', () => setMenu(true), { signal });
menuClose.addEventListener('click', () => setMenu(false), { signal });
all<HTMLAnchorElement>('#menu nav a').forEach(link => link.addEventListener('click', () => {
  setMenu(false, false);
  const target = document.getElementById(link.hash.slice(1));
  if (target) { target.setAttribute('tabindex', '-1'); target.focus({ preventScroll: true }); }
}, { signal }));
document.addEventListener('keydown', event => {
  if (!menuOpen) return;
  if (event.key === 'Escape') { event.preventDefault(); setMenu(false); }
  if (event.key !== 'Tab') return;
  const items = all<HTMLElement>('#menu a, #menu button');
  const first = items[0];
  const last = items.at(-1)!;
  if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
  else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
}, { signal });
window.addEventListener('resize', () => { if (window.innerWidth > 760 && menuOpen) setMenu(false, false); }, { signal });

// Dialog content comes from the retained factual project registry.
const projectDialog = query<HTMLDialogElement>('#project-dialog');
const videoDialog = query<HTMLDialogElement>('#video-dialog');
const video = query<HTMLVideoElement>('#video-dialog video');
const details: Record<string, string> = {
  zestt: 'Designed and developed a full-stack restaurant SaaS platform with QR-based menus, customer ordering, and restaurant management workflows. Built role-based staff and admin interfaces for order management, access permissions, and operational dashboards. Implemented restaurant analytics and reporting with Supabase for order data, customer activity, and menu performance insights. Zestt also includes AI search. I built the product using AI workflows with Codex, Claude, and Antigravity. The frontend uses React, Next.js, TypeScript, and Tailwind CSS. The walkthrough on this page shows the actual guest interface.',
  'wedding-save-the-date': 'A personal digital save-the-date for my sister’s wedding. Its visual direction leans into Bollywood film posters: saturated maroon, warm gold, ornate framing, and a little cinematic romance.',
  decisionarc: 'A professional-services website with a clear content hierarchy and an experience designed to work across screen sizes. The frontend work used React, with attention to responsive composition and fast mobile rendering.',
  'vinayak-bikers': 'A local discovery website built with HTML and CSS. Structured content, technical SEO, and a purposeful browsing experience help connect the business with the people looking for it.'
};
const dialogTriggers = new WeakMap<HTMLDialogElement, HTMLElement>();
function openDialog(dialog: HTMLDialogElement, trigger: HTMLElement) {
  dialog.classList.remove('is-closing');
  dialogTriggers.set(dialog, trigger);
  dialog.showModal();
  dialog.scrollTop = 0;
  const source = trigger.getBoundingClientRect();
  // Layout coordinates stay stable while the opening transform is already running.
  const destination = { left: dialog.offsetLeft, top: dialog.offsetTop, width: dialog.offsetWidth, height: dialog.offsetHeight };
  const sourceX = source.left + source.width / 2;
  const sourceY = source.top + source.height / 2;
  dialog.style.setProperty('--origin-x', `${sourceX - destination.left}px`);
  dialog.style.setProperty('--origin-y', `${sourceY - destination.top}px`);
  dialog.style.setProperty('--from-x', `${(sourceX - destination.left - destination.width / 2) * .12}px`);
  dialog.style.setProperty('--from-y', `${(sourceY - destination.top - destination.height / 2) * .12}px`);
  syncOverlayLock();
}
async function closeDialog(dialog: HTMLDialogElement) {
  if (!dialog.open || dialog.classList.contains('is-closing')) return;
  if (dialog === videoDialog) video.pause();
  if (!reduced) {
    dialog.classList.add('is-closing');
    await Promise.allSettled(dialog.getAnimations().map(animation => animation.finished));
  }
  dialog.close();
  dialog.classList.remove('is-closing');
  syncOverlayLock();
  dialogTriggers.get(dialog)?.focus({ preventScroll: true });
}
all<HTMLButtonElement>('[data-project]').forEach(button => button.addEventListener('click', () => {
  const project = projectRegistry.find(record => record.slug === button.dataset.project);
  if (!project) return;
  query<HTMLElement>('[data-dialog-index]').textContent = `${String(project.order).padStart(2, '0')} / Selected work`;
  query<HTMLElement>('#dialog-title').textContent = project.title;
  query<HTMLElement>('.dialog-summary').textContent = project.summary;
  query<HTMLElement>('[data-dialog-role]').textContent = project.role;
  query<HTMLElement>('[data-dialog-stack]').textContent = project.stack.join(' / ');
  query<HTMLElement>('[data-dialog-format]').textContent = project.slug === 'wedding-save-the-date' ? 'Format' : 'Built with';
  query<HTMLElement>('.dialog-detail').textContent = details[project.slug];
  const visitLink = query<HTMLAnchorElement>('.dialog-visit');
  visitLink.href = project.url;
  visitLink.firstChild!.textContent = project.slug === 'wedding-save-the-date' ? 'View invitation ' : 'Visit live project ';
  openDialog(projectDialog, button);
}, { signal }));
query<HTMLButtonElement>('[data-close-dialog]').addEventListener('click', () => { void closeDialog(projectDialog); }, { signal });
query<HTMLButtonElement>('[data-close-video]').addEventListener('click', () => { void closeDialog(videoDialog); }, { signal });
for (const dialog of [projectDialog, videoDialog]) {
  dialog.addEventListener('cancel', event => { event.preventDefault(); void closeDialog(dialog); }, { signal });
  dialog.addEventListener('click', event => {
    if (event.target !== dialog) return;
    const rect = dialog.getBoundingClientRect();
    if (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) void closeDialog(dialog);
  }, { signal });
}
query<HTMLButtonElement>('[data-open-video]').addEventListener('click', event => {
  if (!video.src) { video.src = walkthroughUrl; video.load(); }
  openDialog(videoDialog, event.currentTarget as HTMLElement);
  void video.play().catch(() => { /* Native controls remain available if autoplay is blocked. */ });
}, { signal });
video.addEventListener('error', () => { query<HTMLElement>('.video-error').hidden = false; }, { signal });
query<HTMLAnchorElement>('.video-error a').href = walkthroughUrl;

function applyMotion() {
  reduced = paused || systemMotion.matches;
  root.dataset.motion = reduced ? 'reduced' : 'full';
  composition.setReduced(reduced);
  lab.setReduced(reduced);
  developer.setReduced(reduced);
  heroInteraction.setEnabled(!reduced);
  motionButton.setAttribute('aria-pressed', String(reduced));
  motionButton.disabled = systemMotion.matches;
  motionButton.setAttribute('aria-label', systemMotion.matches ? 'Reduced motion follows your system setting' : reduced ? 'Enable decorative motion' : 'Pause decorative motion');
  query<HTMLElement>('.motion-label').textContent = systemMotion.matches ? 'Reduced motion' : reduced ? 'Motion off' : 'Motion on';
  query<HTMLElement>('.motion-icon').textContent = reduced ? '▷' : 'Ⅱ';
  if (reduced) {
    for (const state of [...tilts, ...magnetic]) state.x = state.y = state.tx = state.ty = 0;
    requestFrame();
  }
}
motionButton.addEventListener('click', () => {
  paused = !paused;
  try { localStorage.setItem('aman-gallery-motion', paused ? 'paused' : 'full'); } catch { /* Keep the choice for this page even without storage. */ }
  applyMotion();
}, { signal });
systemMotion.addEventListener('change', applyMotion, { signal });
applyMotion();
root.classList.add('motion-ready');
requestFrame();

const email = profileContent.email;
const copyStatus = query<HTMLElement>('.copy-status');
let copyTimer = 0;
query<HTMLButtonElement>('.copy-email').addEventListener('click', async () => {
  window.clearTimeout(copyTimer);
  try {
    await navigator.clipboard.writeText(email);
    copyStatus.textContent = 'Copied. Say hello when you’re ready.';
  } catch {
    const range = document.createRange();
    range.selectNodeContents(query<HTMLElement>('.email-line > a'));
    const selection = window.getSelection();
    selection?.removeAllRanges();
    selection?.addRange(range);
    copyStatus.textContent = 'Address selected. Use your device’s copy command.';
  }
  copyTimer = window.setTimeout(() => { copyStatus.textContent = ''; }, 5500);
}, { signal });
function updateClock() {
  const now = new Date();
  query<HTMLElement>('[data-year]').textContent = new Intl.DateTimeFormat('en', { timeZone: 'Asia/Kolkata', year: 'numeric' }).format(now);
}
updateClock();
const clockTimer = window.setInterval(updateClock, 60000);
window.addEventListener('pageshow', () => { scrollDirty = true; requestFrame(); }, { signal });
window.addEventListener('pagehide', event => {
  if (event.persisted) { video.pause(); return; }
  controller.abort();
  cancelAnimationFrame(frameId);
  revealObserver.disconnect();
  window.clearInterval(clockTimer);
  window.clearTimeout(copyTimer);
  video.pause();
}, { signal });
