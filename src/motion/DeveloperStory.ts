import { chapterPosition, developerScore } from './developerScore';

/** One persistent specimen, three decisions. Uses the gallery's existing sleeping frame loop. */
export class DeveloperStory {
  private story = document.querySelector<HTMLElement>('[data-developer-story]')!;
  private visual = this.story.querySelector<HTMLElement>('.developer-visual')!;
  private chapters = Array.from(this.story.querySelectorAll<HTMLElement>('[data-developer-chapter]'));
  private links = Array.from(this.story.querySelectorAll<HTMLAnchorElement>('.developer-scene-nav a'));
  private caption = this.story.querySelector<HTMLElement>('[data-developer-caption]')!;
  private traveller = this.story.querySelector<SVGCircleElement>('[data-developer-traveller]')!;
  private compare = this.story.querySelector<HTMLButtonElement>('[data-developer-compare]')!;
  private compareStatus = this.story.querySelector<HTMLElement>('[data-developer-compare-status]')!;
  private anchors: number[] = [];
  private top = 0;
  private bottom = 0;
  private measureDirty = true;
  private reduced = false;
  private detail = 1;
  private detailChoice: number | undefined;
  private compareY: number | undefined;
  private current = -1;
  private lastY = -1;
  private settled = false;
  private resize: ResizeObserver;

  constructor(private requestFrame: () => void, signal: AbortSignal) {
    this.compare.addEventListener('click', () => {
      const firstPass = this.compare.getAttribute('aria-pressed') !== 'true';
      this.compare.setAttribute('aria-pressed', String(firstPass));
      this.compare.firstChild!.textContent = firstPass ? 'Return to the refinement ' : 'See the first pass ';
      this.compareStatus.textContent = firstPass ? 'First pass / notice the left edges, spacing, and arrow.' : 'Refined / hierarchy, spacing, alignment.';
      this.detailChoice = firstPass ? 0 : 1;
      this.compareY = window.scrollY;
      this.settled = false;
      this.requestFrame();
    }, { signal });
    document.querySelector<HTMLAnchorElement>('.developer-index-link')!.addEventListener('click', () => {
      const experience = document.querySelector<HTMLDetailsElement>('#developer-experience')!;
      experience.open = true;
      experience.querySelector('summary')!.focus({ preventScroll: true });
    }, { signal });
    document.querySelectorAll<HTMLDetailsElement>('.developer-dossier').forEach(details => details.addEventListener('toggle', () => {
      this.measureDirty = true;
      this.requestFrame();
    }, { signal }));
    this.resize = new ResizeObserver(() => { this.measureDirty = true; this.requestFrame(); });
    this.resize.observe(document.body);
    this.resize.observe(this.story);
    window.addEventListener('resize', () => { this.measureDirty = true; this.requestFrame(); }, { signal });
    window.addEventListener('pageshow', () => { this.measureDirty = true; this.requestFrame(); }, { signal });
    signal.addEventListener('abort', () => this.resize.disconnect(), { once: true });
  }

  setReduced(reduced: boolean) {
    this.reduced = reduced;
    this.measureDirty = true;
    this.settled = false;
    this.requestFrame();
  }

  private measure() {
    const y = window.scrollY;
    const scrollPadding = parseFloat(getComputedStyle(document.documentElement).scrollPaddingTop) || 0;
    this.anchors = this.chapters.map(chapter => {
      const rect = chapter.getBoundingClientRect();
      const scrollMargin = parseFloat(getComputedStyle(chapter).scrollMarginTop) || 0;
      return rect.top + y - scrollPadding - scrollMargin;
    });
    const rect = this.story.getBoundingClientRect();
    this.top = rect.top + y;
    this.bottom = rect.bottom + y;
    this.measureDirty = false;
  }

  update(delta: number): boolean {
    const y = window.scrollY;
    if (this.measureDirty) { this.measure(); this.settled = false; }
    if (y === this.lastY && this.settled) return false;
    this.lastY = y;
    if (y + window.innerHeight < this.top || y > this.bottom) { this.settled = true; return false; }
    if (this.compareY !== undefined && Math.abs(y - this.compareY) > 24) this.compareY = undefined;
    const score = developerScore(this.compareY === undefined ? chapterPosition(y, this.anchors) : 0, this.reduced);
    const targetDetail = this.detailChoice ?? score.detail;
    this.detail = this.reduced ? targetDetail : this.detail + (targetDetail - this.detail) * (1 - Math.pow(.76, delta));
    const active = Math.abs(targetDetail - this.detail) > .001;
    if (!active) this.detail = targetDetail;
    const style = this.visual.style;
    style.setProperty('--detail', this.detail.toFixed(4));
    style.setProperty('--system', score.system.toFixed(4));
    style.setProperty('--ownership', score.ownership.toFixed(4));
    style.setProperty('--signal', score.signal.toFixed(4));
    this.traveller.setAttribute('cy', String(260 + score.signal * 260));
    if (this.current !== score.chapter) {
      this.current = score.chapter;
      this.chapters.forEach((chapter, index) => chapter.classList.toggle('is-current', index === score.chapter));
      this.links.forEach((link, index) => {
        if (index === score.chapter) link.setAttribute('aria-current', 'step');
        else link.removeAttribute('aria-current');
      });
      this.caption.textContent = [
        '01 / The eye — every detail earns its place.',
        '02 / The thinking — one action, connected decisions.',
        '03 / The ownership — bringing people and product together.'
      ][score.chapter];
    }
    this.settled = !active;
    return active;
  }
}
