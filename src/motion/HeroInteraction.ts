/** A small, springy pointer field for the hero type. Runs only while it has work to do. */
type Glyph = { element: HTMLElement; cx: number; cy: number; x: number; y: number; tx: number; ty: number; angle: number; targetAngle: number; scale: number; targetScale: number };

export class HeroInteraction {
  private readonly hero: HTMLElement;
  private readonly heading: HTMLElement;
  private readonly marker: HTMLElement;
  private readonly glyphs: Glyph[] = [];
  private readonly finePointer = window.matchMedia('(hover: hover) and (pointer: fine)');
  private frame = 0;
  private enabled = true;
  private active = false;
  private readyTimer = 0;
  private introAnimations: Animation[] = [];
  private introStarted = false;
  private pointer = { x: 0, y: 0, tx: 0, ty: 0 };
  private onMove: (event: PointerEvent) => void;
  private onLeave: () => void;
  private onResize: () => void;

  constructor(signal: AbortSignal, enabled = true) {
    this.enabled = enabled;
    this.hero = document.querySelector<HTMLElement>('.hero-minimal')!;
    this.heading = this.hero.querySelector<HTMLElement>('#hero-title')!;
    this.marker = this.hero.querySelector<HTMLElement>('.hero-pointer')!;
    this.prepareGlyphs();
    this.onMove = event => {
      if (!this.enabled || !this.finePointer.matches || event.pointerType === 'touch') return;
      this.finishIntro();
      this.measureGlyphs();
      this.pointer.tx = event.clientX;
      this.pointer.ty = event.clientY;
      this.active = true;
      this.hero.dataset.pointerActive = 'true';
      this.marker.classList.add('is-visible');
      for (const glyph of this.glyphs) {
        const dx = glyph.cx - event.clientX;
        const dy = glyph.cy - event.clientY;
        const distance = Math.hypot(dx, dy);
        const influence = Math.max(0, 1 - distance / 175) ** 2;
        const direction = distance > 0 ? 1 / distance : 0;
        glyph.tx = dx * direction * 36 * influence;
        glyph.ty = dy * direction * 28 * influence;
        glyph.targetAngle = (dx < 0 ? -1 : 1) * 11 * influence;
        glyph.targetScale = 1 + .12 * influence;
      }
      this.frame ||= requestAnimationFrame(this.update);
    };
    this.onLeave = () => {
      this.active = false;
      this.hero.dataset.pointerActive = 'false';
      this.marker.classList.remove('is-visible');
      for (const glyph of this.glyphs) { glyph.tx = 0; glyph.ty = 0; glyph.targetAngle = 0; glyph.targetScale = 1; }
      this.frame ||= requestAnimationFrame(this.update);
    };
    this.onResize = () => {
      for (const glyph of this.glyphs) glyph.element.style.transform = 'none';
      requestAnimationFrame(() => this.measureGlyphs());
    };
    this.hero.addEventListener('pointermove', this.onMove, { passive: true, signal });
    this.hero.addEventListener('pointerleave', this.onLeave, { passive: true, signal });
    window.addEventListener('resize', this.onResize, { passive: true, signal });
    document.addEventListener('visibilitychange', () => {
      if (document.hidden) this.finishIntro();
    }, { signal });
    signal.addEventListener('abort', () => this.destroy(), { once: true });
    requestAnimationFrame(() => this.playIntro());
    this.readyTimer = window.setTimeout(() => {
      this.measureGlyphs();
      if (this.active) {
        for (const glyph of this.glyphs) {
          const dx = glyph.cx - this.pointer.tx;
          const dy = glyph.cy - this.pointer.ty;
          const distance = Math.hypot(dx, dy);
          const influence = Math.max(0, 1 - distance / 175) ** 2;
          const direction = distance > 0 ? 1 / distance : 0;
          glyph.tx = dx * direction * 36 * influence;
          glyph.ty = dy * direction * 28 * influence;
          glyph.targetAngle = (dx < 0 ? -1 : 1) * 11 * influence;
          glyph.targetScale = 1 + .12 * influence;
        }
        this.frame ||= requestAnimationFrame(this.update);
      }
    }, 3300);
  }

  setEnabled(enabled: boolean) {
    this.enabled = enabled;
    if (!this.enabled) { this.finishIntro(); this.onLeave(); }
  }

  private playIntro() {
    if (this.introStarted || !this.enabled) return;
    this.introStarted = true;
    this.hero.dataset.heroIntro = 'playing';
    const lines = Array.from(this.heading.querySelectorAll<HTMLElement>('.line'));
    const firstLine = lines[0];
    const touchLayout = !this.finePointer.matches;
    const fullStop = this.glyphs.find(glyph => glyph.element.textContent === '.');
    const fullStopRect = fullStop?.element.getBoundingClientRect();

    this.glyphs.forEach((glyph, index) => {
      const line = glyph.element.closest('.line');
      const inSecondLine = line !== firstLine;
      const italic = !!glyph.element.closest('em');
      const lineIndex = this.glyphs.slice(0, index).filter(item => item.element.closest('.line') === line).length;
      const delay = touchLayout
        ? (inSecondLine ? 110 : 0) + lineIndex * 26
        : !inSecondLine ? 80 + lineIndex * 38 : italic ? 1050 + lineIndex * 34 : 650 + lineIndex * 75;
      const duration = touchLayout ? 620 : !inSecondLine ? 1180 : italic ? 1260 : 1040;
      const side = Math.sin(index * 12.9898) < 0 ? -1 : 1;
      const startX = Math.round(Math.sin(index * 12.9898) * 330);
      const startY = Math.round(Math.cos(index * 7.231) * 300);
      const spinX = side * (360 + index % 3 * 180);
      const spinY = -side * (360 + index % 4 * 120);
      const spinZ = Math.round(Math.sin(index * 3.73) * 240);
      const keyframes: Keyframe[] = touchLayout
        ? [
            { opacity: 0, transform: `translateY(18px) rotate(${side * 5}deg) scale(.94)`, offset: 0 },
            { opacity: 1, transform: 'translateY(0) rotate(0deg) scale(1)', offset: 1 }
          ]
        : [
            { opacity: 0, transform: `translate3d(${startX}px, ${startY}px, -420px) rotateX(${spinX}deg) rotateY(${spinY}deg) rotateZ(${spinZ}deg) scale(.12)`, offset: 0 },
            { opacity: .82, transform: `translate3d(${startX * .58}px, ${startY * .58}px, -130px) rotateX(${spinX * .58}deg) rotateY(${spinY * .58}deg) rotateZ(${spinZ * .58}deg) scale(.58)`, offset: .36 },
            { opacity: 1, transform: `translate3d(0, 13px, 0) rotateX(-12deg) rotateY(0deg) rotateZ(${side * 8}deg) scale(1.26, .72)`, offset: .73 },
            { opacity: 1, transform: `translate3d(0, -12px, 0) rotateX(8deg) rotateY(0deg) rotateZ(${side * -3}deg) scale(.88, 1.14)`, offset: .86 },
            { opacity: 1, transform: `translate3d(0, 4px, 0) rotateX(-3deg) rotateY(0deg) scale(1.035, .97)`, offset: .94 },
            { opacity: 1, transform: 'translate3d(0, 0, 0) rotateX(0deg) rotateY(0deg) rotateZ(0deg) scale(1)', offset: 1 }
          ];
      const animation = glyph.element.animate(keyframes, { duration, delay, easing: 'cubic-bezier(.2, 1.15, .34, 1)', fill: 'both' });
      this.introAnimations.push(animation);
    });

    if (!touchLayout) lines.forEach((line, index) => {
      const word = line.querySelector<HTMLElement>(':scope > span');
      if (!word) return;
      this.introAnimations.push(word.animate([
        { transform: 'scale3d(1.06, .88, 1)', offset: 0 },
        { transform: 'scale3d(.94, 1.09, 1)', offset: .36 },
        { transform: 'scale3d(1.025, .98, 1)', offset: .65 },
        { transform: 'scale3d(1, 1, 1)', offset: 1 }
      ], { duration: 760 + index * 120, delay: index === 0 ? 1380 : 2420, easing: 'cubic-bezier(.22, 1.35, .36, 1)', fill: 'both' }));
    });

    if (this.finePointer.matches && fullStopRect) {
      const x = fullStopRect.left + fullStopRect.width / 2;
      const y = fullStopRect.top + fullStopRect.height / 2;
      this.marker.style.left = `${x}px`;
      this.marker.style.top = `${y}px`;
      this.marker.classList.add('is-intro');
      this.introAnimations.push(this.marker.animate([
        { opacity: 0, transform: 'translate(-50%, -50%) translate3d(-145px, -110px, 0) rotate(-100deg) scale(.35)', offset: 0 },
        { opacity: .9, transform: 'translate(-50%, -50%) translate3d(-92px, -152px, 0) rotate(-38deg) scale(.78)', offset: .42 },
        { opacity: 1, transform: 'translate(-50%, -50%) translate3d(-7px, -5px, 0) rotate(8deg) scale(1.12)', offset: .79 },
        { opacity: 1, transform: 'translate(-50%, -50%) translate3d(-7px, 5px, 0) rotate(-13deg) scale(.88)', offset: .89 },
        { opacity: 0, transform: 'translate(-50%, -50%) translate3d(-7px, 0, 0) rotate(0deg) scale(1)', offset: 1 }
      ], { duration: 1500, delay: 1250, easing: 'cubic-bezier(.45, 0, .55, 1)', fill: 'both' }));
    }
    Promise.allSettled(this.introAnimations.map(animation => animation.finished)).then(() => this.finishIntro());
  }

  private finishIntro() {
    if (!this.introAnimations.length && !this.marker.classList.contains('is-intro')) return;
    for (const animation of this.introAnimations) animation.cancel();
    this.introAnimations = [];
    this.marker.classList.remove('is-intro');
    this.hero.dataset.heroIntro = 'settled';
    for (const glyph of this.glyphs) glyph.element.style.transform = 'none';
  }

  private prepareGlyphs() {
    this.heading.setAttribute('aria-label', Array.from(this.heading.querySelectorAll('.line'), line => line.textContent?.trim() ?? '').join(' '));
    const walker = document.createTreeWalker(this.heading, NodeFilter.SHOW_TEXT);
    const nodes: Text[] = [];
    while (walker.nextNode()) nodes.push(walker.currentNode as Text);
    let index = 0;
    for (const node of nodes) {
      const fragment = document.createDocumentFragment();
      for (const char of node.textContent ?? '') {
        if (/\s/.test(char)) { fragment.append(document.createTextNode(char)); continue; }
        const glyph = document.createElement('span');
        glyph.className = 'hero-glyph';
        glyph.setAttribute('aria-hidden', 'true');
        glyph.style.setProperty('--glyph-index', String(index++));
        glyph.textContent = char;
        const state: Glyph = { element: glyph, cx: 0, cy: 0, x: 0, y: 0, tx: 0, ty: 0, angle: 0, targetAngle: 0, scale: 1, targetScale: 1 };
        this.glyphs.push(state);
        fragment.append(glyph);
      }
      node.replaceWith(fragment);
    }
  }

  private measureGlyphs() {
    for (const glyph of this.glyphs) {
      const rect = glyph.element.getBoundingClientRect();
      glyph.cx = rect.left + rect.width / 2;
      glyph.cy = rect.top + rect.height / 2;
      glyph.x = 0;
      glyph.y = 0;
    }
  }

  private update = () => {
    this.frame = 0;
    this.pointer.x += (this.pointer.tx - this.pointer.x) * .2;
    this.pointer.y += (this.pointer.ty - this.pointer.y) * .2;
    const lagX = Math.abs(this.pointer.tx - this.pointer.x);
    const lagY = Math.abs(this.pointer.ty - this.pointer.y);
    let moving = lagX + lagY > .3;
    if (this.active) {
      this.marker.style.left = `${this.pointer.x}px`;
      this.marker.style.top = `${this.pointer.y}px`;
      this.marker.style.setProperty('--pointer-turn', `${Math.atan2(this.pointer.y - this.pointer.ty, this.pointer.x - this.pointer.tx) * 10}deg`);
    }
    for (const glyph of this.glyphs) {
      glyph.x += (glyph.tx - glyph.x) * .22;
      glyph.y += (glyph.ty - glyph.y) * .22;
      glyph.angle += (glyph.targetAngle - glyph.angle) * .22;
      glyph.scale += (glyph.targetScale - glyph.scale) * .22;
      if (Math.abs(glyph.tx - glyph.x) + Math.abs(glyph.ty - glyph.y) + Math.abs(glyph.targetAngle - glyph.angle) + Math.abs(glyph.targetScale - glyph.scale) > .002) moving = true;
      glyph.element.style.transform = `translate3d(${glyph.x.toFixed(2)}px, ${glyph.y.toFixed(2)}px, 0) rotate(${glyph.angle.toFixed(2)}deg) scale(${glyph.scale.toFixed(3)})`;
    }
    if (moving) this.frame = requestAnimationFrame(this.update);
  };

  private destroy() {
    cancelAnimationFrame(this.frame);
    window.clearTimeout(this.readyTimer);
    this.finishIntro();
    this.marker.classList.remove('is-visible');
    this.hero.dataset.pointerActive = 'false';
  }
}
