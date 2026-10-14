import { clamp, compositionScore } from './score';

/** Shares the gallery's on-demand frame loop. No scroll hijacking or extra ticker. */
export class CompositionMotion {
  private scene = document.querySelector<HTMLElement>('.composition')!;
  private hero = document.querySelector<HTMLElement>('.hero')!;
  private stage = document.querySelector<HTMLElement>('.composition-stage')!;
  private chapters = Array.from(document.querySelectorAll<HTMLElement>('.composition-chapters span'));
  private mainPath = document.querySelector<SVGPathElement>('.thread-main')!;
  private echoPath = document.querySelector<SVGPathElement>('.thread-echo')!;
  private node = document.querySelector<SVGCircleElement>('.thread-node')!;
  private projects = Array.from(document.querySelectorAll<HTMLElement>('.project-art'));
  private contact = document.querySelector<HTMLElement>('.contact')!;
  private cursor: HTMLDivElement;
  private reduced = false;
  private pointer = { x: 0, y: 0, tx: 0, ty: 0, active: false };
  private scenePointer = { x: 0, y: 0 };
  private lastChapter = -1;
  private bounds: { top: number; height: number; viewport: number } = { top: 0, height: 1, viewport: 1 };
  private resize: ResizeObserver;

  constructor(private requestFrame: () => void, signal: AbortSignal) {
    this.splitHeadings();
    this.cursor = document.createElement('div');
    this.cursor.className = 'intent-cursor';
    this.cursor.setAttribute('aria-hidden', 'true');
    document.body.append(this.cursor);
    const fine = window.matchMedia('(hover: hover) and (pointer: fine)');
    document.addEventListener('pointermove', event => {
      if (this.reduced || !fine.matches || event.pointerType === 'touch') return;
      this.pointer.tx = event.clientX;
      this.pointer.ty = event.clientY;
      const target = event.target instanceof Element ? event.target : null;
      const art = target?.closest('.project-art, .sculpture');
      const interactive = target?.closest('a, button');
      this.pointer.active = !!art && !document.querySelector('dialog[open]') && !document.body.classList.contains('overlay-open');
      this.cursor.dataset.kind = art?.classList.contains('sculpture') ? 'sculpture' : 'project';
      const unfolded = art?.closest('[data-art-angle="1"]');
      this.cursor.textContent = art?.classList.contains('sculpture') ? unfolded ? 'REASSEMBLE ↙︎' : 'UNFOLD ↗︎' : interactive ? 'EXPLORE ↗︎' : 'VIEW THE BUILD ↘︎';
      this.cursor.classList.toggle('is-visible', this.pointer.active);
      this.requestFrame();
    }, { passive: true, signal });
    document.addEventListener('pointerleave', () => { this.pointer.active = false; this.cursor.classList.remove('is-visible'); }, { signal });
    document.addEventListener('scroll', () => { this.cursor.classList.remove('is-visible'); }, { passive: true, signal });
    this.stage.addEventListener('pointermove', event => {
      if (this.reduced || !fine.matches) return;
      const rect = this.stage.getBoundingClientRect();
      this.scenePointer.x = clamp((event.clientX - rect.left) / rect.width, 0, 1) - .5;
      this.scenePointer.y = clamp((event.clientY - rect.top) / rect.height, 0, 1) - .5;
      this.requestFrame();
    }, { passive: true, signal });
    this.stage.addEventListener('pointerleave', () => {
      this.scenePointer.x = this.scenePointer.y = 0;
      this.requestFrame();
    }, { signal });
    this.resize = new ResizeObserver(() => { this.measure(); this.requestFrame(); });
    this.resize.observe(document.body);
    window.addEventListener('resize', () => this.measure(), { signal });
    signal.addEventListener('abort', () => { this.resize.disconnect(); this.cursor.remove(); }, { once: true });
    this.measure();
  }

  private splitHeadings() {
    document.querySelectorAll<HTMLElement>('h2[data-reveal]').forEach(heading => {
      // Preserve the heading's semantic text while decorative glyphs move independently.
      heading.setAttribute('aria-label', heading.innerText.replace(/\s+/g, ' ').trim());
      const walker = document.createTreeWalker(heading, NodeFilter.SHOW_TEXT);
      const nodes: Text[] = [];
      while (walker.nextNode()) nodes.push(walker.currentNode as Text);
      let index = 0;
      for (const node of nodes) {
        const fragment = document.createDocumentFragment();
        for (const token of (node.textContent ?? '').split(/(\s+)/)) {
          if (!token) continue;
          if (/^\s+$/.test(token)) { fragment.append(document.createTextNode(token)); continue; }
          const word = document.createElement('span');
          word.className = 'type-word';
          word.setAttribute('aria-hidden', 'true');
          for (const character of token) {
            const glyph = document.createElement('span');
            glyph.className = 'type-glyph';
            glyph.style.setProperty('--glyph-index', String(index++));
            glyph.textContent = character;
            word.append(glyph);
          }
          fragment.append(word);
        }
        node.replaceWith(fragment);
      }
      heading.classList.add('type-composed');
    });
  }

  private measure() {
    this.bounds = {
      top: this.scene.getBoundingClientRect().top + window.scrollY,
      height: this.scene.offsetHeight,
      viewport: window.innerHeight
    };
  }

  setReduced(reduced: boolean) {
    this.reduced = reduced;
    this.cursor.classList.remove('is-visible');
    this.pointer.active = false;
    this.measure();
    this.requestFrame();
  }

  update(delta: number): boolean {
    if (this.reduced) return false;
    const { top, height, viewport } = this.bounds;
    const y = window.scrollY;
    const progress = clamp((y - top) / Math.max(1, height - viewport));
    const score = compositionScore(progress);
    if (y + viewport >= top && y <= top + height) {
      this.scene.style.setProperty('--release', score.release.toFixed(4));
      this.scene.style.setProperty('--union', score.union.toFixed(4));
      this.scene.style.setProperty('--resolve', score.resolve.toFixed(4));
      this.scene.style.setProperty('--score', progress.toFixed(4));
      const bend = score.release * (1 - score.union);
      const dx = this.scenePointer.x * 85 * bend;
      const dy = this.scenePointer.y * 100 * bend;
      const path = `M 120 325 C ${340 + dx} ${325 - bend * 490 + dy}, ${340 - dx} ${325 + bend * 490}, 600 325 S ${860 + dx} ${325 - bend * 490 - dy}, 1080 325`;
      this.mainPath.setAttribute('d', path);
      this.echoPath.setAttribute('d', path);
      this.node.setAttribute('cx', String(120 + progress * 960));
      this.node.setAttribute('cy', '325');
      if (score.chapter !== this.lastChapter) {
        this.chapters.forEach((chapter, index) => chapter.classList.toggle('is-active', index === score.chapter));
        this.lastChapter = score.chapter;
      }
    }
    if (y < this.hero.offsetHeight) {
      this.hero.style.setProperty('--hero-depart', clamp(y / this.hero.offsetHeight).toFixed(4));
    }
    // Only touch visible project layers; the frame loop sleeps once input settles.
    for (const art of this.projects) {
      const rect = art.getBoundingClientRect();
      if (rect.bottom < 0 || rect.top > viewport) continue;
      const entrance = clamp((viewport - rect.top) / Math.min(rect.height, viewport));
      art.style.setProperty('--project-enter', entrance.toFixed(4));
    }
    const contactRect = this.contact.getBoundingClientRect();
    if (contactRect.top < viewport && contactRect.bottom > 0) {
      this.contact.style.setProperty('--contact-enter', clamp((viewport - contactRect.top) / viewport).toFixed(4));
    }
    const smoothing = 1 - Math.pow(.76, delta);
    this.pointer.x += (this.pointer.tx - this.pointer.x) * smoothing;
    this.pointer.y += (this.pointer.ty - this.pointer.y) * smoothing;
    this.cursor.style.transform = `translate3d(${this.pointer.x.toFixed(2)}px, ${this.pointer.y.toFixed(2)}px, 0)`;
    return this.pointer.active && Math.abs(this.pointer.x - this.pointer.tx) + Math.abs(this.pointer.y - this.pointer.ty) > .2;
  }
}
