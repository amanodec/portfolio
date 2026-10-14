import { ARRIVAL_DURATION, shouldPlayArrival } from './arrivalScore.ts';

/** One paper surface, one projected heading, one filament. All movement uses browser composites. */
export class HeroArrival {
  private root = document.documentElement;
  private overlay = document.querySelector<HTMLElement>('[data-hero-arrival]')!;
  private type = this.overlay.querySelector<HTMLElement>('.arrival-type')!;
  private paper = this.overlay.querySelector<HTMLElement>('.arrival-paper')!;
  private thread = this.overlay.querySelector<SVGPathElement>('.arrival-thread path')!;
  private active = false;
  private animations: Animation[] = [];
  private events = new AbortController();
  private timeout = 0;

  constructor(signal: AbortSignal, reduced: boolean) {
    const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming | undefined;
    if (this.root.dataset.arrival !== 'pending' || !shouldPlayArrival({
      reduced, hidden: document.hidden, hash: location.hash,
      scrollY: window.scrollY, navigationType: navigation?.type
    })) { this.finish(); return; }

    this.listenForInterruption(signal);
    if (!this.active) return;
    const heading = document.querySelector<HTMLElement>('#hero-title')!;
    this.type.innerHTML = heading.innerHTML;
    this.type.querySelectorAll('[id]').forEach(element => element.removeAttribute('id'));
    this.copyTypography(heading);
    this.place(this.type, heading.getBoundingClientRect());
    this.place(this.overlay.querySelector<SVGSVGElement>('.arrival-thread')!, document.querySelector('.hero-workbench')!.getBoundingClientRect());
    this.thread.setAttribute('d', document.querySelector('.hero-filament .filament-main')!.getAttribute('d') ?? '');
    this.thread.setAttribute('pathLength', '1');
    try { this.start(); } catch { this.finish(); }
  }

  private listenForInterruption(signal: AbortSignal) {
    this.active = true;
    const stop = () => this.finish();
    const options = { passive: true, capture: true, signal: this.events.signal };
    for (const event of ['wheel', 'touchstart', 'pointerdown', 'keydown', 'focusin']) document.addEventListener(event, stop, options);
    for (const event of ['scroll', 'resize', 'pagehide', 'hashchange']) window.addEventListener(event, stop, options);
    document.addEventListener('visibilitychange', () => { if (document.hidden) stop(); }, options);
    signal.addEventListener('abort', stop, { once: true });
  }

  private copyTypography(heading: HTMLElement) {
    const styles = getComputedStyle(heading);
    for (const property of ['font-family', 'font-size', 'font-weight', 'letter-spacing', 'line-height']) {
      this.type.style.setProperty(property, styles.getPropertyValue(property));
    }
    const sourceLines = heading.querySelectorAll<HTMLElement>('.line');
    this.type.querySelectorAll<HTMLElement>('.line').forEach((line, index) => {
      const source = getComputedStyle(sourceLines[index]);
      for (const property of ['margin-left', 'padding-top', 'padding-bottom']) line.style.setProperty(property, source.getPropertyValue(property));
    });
  }

  private place(element: HTMLElement | SVGSVGElement, rect: DOMRect) {
    element.style.left = `${rect.left}px`;
    element.style.top = `${rect.top}px`;
    element.style.width = `${rect.width}px`;
    element.style.height = `${rect.height}px`;
  }

  private start() {
    const d = ARRIVAL_DURATION;
    const ease = 'cubic-bezier(.22,1,.36,1)';
    this.active = true;
    this.root.dataset.arrival = 'playing';
    // The printed surface makes a short, tactile impact, then clears the real DOM.
    this.animations.push(this.paper.animate([
      { transform: 'translate3d(-3vw,2vh,0) rotateX(19deg) rotateY(-12deg) rotateZ(-5deg) scale(1.17)', offset: 0 },
      { transform: 'translate3d(0,1.5vh,20px) rotateX(7deg) rotateY(-4deg) rotateZ(1deg) scale(1.035)', offset: .17 },
      { transform: 'translate3d(-18vw,-12vh,-60px) rotateX(-8deg) rotateY(15deg) rotateZ(-5deg) scale(.9)', offset: .55 },
      { transform: 'translate3d(-108vw,-88vh,-240px) rotateX(-18deg) rotateY(29deg) rotateZ(-17deg) scale(.2)', offset: 1 }
    ], { duration: d, easing: ease, fill: 'forwards' }));
    // Identical DOM text and measured final coordinates give the landing its exact fit.
    this.animations.push(this.type.animate([
      { transform: 'translate3d(-12vw,14vh,280px) scale(2.62) rotateX(34deg) rotateY(-20deg) rotateZ(-14deg)', offset: 0 },
      { transform: 'translate3d(-7vw,7vh,165px) scale(1.87) rotateX(24deg) rotateY(-12deg) rotateZ(-9deg)', offset: .28 },
      { transform: 'translate3d(0,-8px,20px) scale(1.025) rotateX(4deg) rotateY(2deg) rotateZ(1.4deg)', offset: .83 },
      { transform: 'none', offset: 1 }
    ], { duration: d, easing: ease, fill: 'forwards' }));
    this.animations.push(this.thread.animate([
      { strokeDashoffset: '1', opacity: 1, offset: 0 },
      { strokeDashoffset: '.08', opacity: 1, offset: .62 },
      { strokeDashoffset: '0', opacity: 1, offset: .83 },
      { strokeDashoffset: '0', opacity: 0, offset: 1 }
    ], { duration: d, easing: 'cubic-bezier(.16,1,.3,1)', fill: 'forwards' }));
    this.animations.push(this.overlay.animate([
      { opacity: 1, offset: 0 }, { opacity: 1, offset: .78 }, { opacity: 0, offset: 1 }
    ], { duration: d, easing: 'linear', fill: 'forwards' }));
    this.animations.push(document.querySelector<HTMLElement>('.hero-copy')!.animate([
      { opacity: 0, offset: 0 }, { opacity: 0, offset: .94 }, { opacity: 1, offset: 1 }
    ], { duration: d, easing: 'linear', fill: 'forwards' }));
    this.timeout = window.setTimeout(() => this.finish(), d + 300);
  }

  setReduced(reduced: boolean) { if (reduced) this.finish(); }

  private finish() {
    if (!this.active && this.root.dataset.arrival === 'done') return;
    this.active = false;
    this.root.dataset.arrival = 'done';
    this.overlay.hidden = true;
    this.events.abort();
    for (const animation of this.animations) animation.cancel();
    this.animations = [];
    window.clearTimeout(this.timeout);
  }
}
