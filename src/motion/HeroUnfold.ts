import { advanceSpring, axis } from './labPhysics.ts';
import { clampPull, filamentPath, orderSummary, releasePull } from './heroModel.ts';

/** One physical input, shared by every hero layer. Runs on the gallery's sleeping frame loop. */
export class HeroUnfold {
  private root = document.querySelector<HTMLElement>('[data-hero-unfold]')!;
  private stage = this.root.querySelector<HTMLElement>('.hero-workbench')!;
  private handle = this.root.querySelector<HTMLButtonElement>('.hero-pull')!;
  private track = this.root.querySelector<HTMLElement>('.hero-pull-track')!;
  private product = this.root.querySelector<HTMLElement>('.hero-product')!;
  private label = this.root.querySelector<HTMLElement>('[data-hero-pull-label]')!;
  private status = this.root.querySelector<HTMLElement>('[data-hero-status]')!;
  private help = this.root.querySelector<HTMLElement>('#hero-pull-help')!;
  private paths = Array.from(this.root.querySelectorAll<SVGPathElement>('.hero-filament path'));
  private spring = axis();
  private opened = false;
  private reduced = false;
  private visible = true;
  private quantity = 0;
  private suppressClick = false;
  private travel = 120;
  private endpoint = { x: 0, y: 0, scale: 1 };
  private drag?: { id: number; start: number; origin: number; wasOpen: boolean; moved: boolean };
  private resize: ResizeObserver;
  private visibility: IntersectionObserver;

  constructor(private requestFrame: () => void, signal: AbortSignal) {
    this.handle.addEventListener('pointerdown', event => {
      if (event.button !== 0 || !event.isPrimary || this.drag) return;
      this.suppressClick = false;
      this.drag = { id: event.pointerId, start: event.clientX, origin: this.spring.value, wasOpen: this.opened, moved: false };
      this.handle.setPointerCapture(event.pointerId);
      this.root.classList.add('is-pulling');
    }, { signal });
    this.handle.addEventListener('pointermove', event => {
      const drag = this.drag;
      if (!drag || drag.id !== event.pointerId) return;
      const distance = event.clientX - drag.start;
      if (Math.abs(distance) > 5) drag.moved = true;
      if (!drag.moved) return;
      this.spring.target = clampPull(drag.origin / 1000 + distance / this.travel) * 1000;
      if (this.reduced) this.snap();
      this.requestFrame();
    }, { signal });
    this.handle.addEventListener('pointerup', event => {
      const drag = this.drag;
      if (!drag || drag.id !== event.pointerId) return;
      this.suppressClick = drag.moved;
      this.clearDrag();
      if (drag.moved) this.setOpen(releasePull(this.spring.target / 1000, drag.wasOpen));
    }, { signal });
    this.handle.addEventListener('pointercancel', () => this.cancelDrag(), { signal });
    this.handle.addEventListener('lostpointercapture', () => this.cancelDrag(), { signal });
    this.handle.addEventListener('click', event => {
      if (event.detail > 0 && this.suppressClick) { this.suppressClick = false; return; }
      this.setOpen(!this.opened);
    }, { signal });
    this.root.addEventListener('keydown', event => {
      if (event.key === 'Escape' && (this.opened || this.drag)) {
        event.preventDefault();
        this.clearDrag();
        this.setOpen(false);
      }
    }, { signal });
    this.root.querySelector('[data-hero-add]')!.addEventListener('click', () => this.changeQuantity(1), { signal });
    this.root.querySelector('[data-hero-remove]')!.addEventListener('click', () => this.changeQuantity(-1), { signal });
    window.addEventListener('blur', () => this.cancelDrag(), { signal });
    document.addEventListener('visibilitychange', () => { if (document.hidden) { this.cancelDrag(); this.snap(); } }, { signal });
    this.resize = new ResizeObserver(() => { this.cancelDrag(); this.measure(); this.render(); });
    this.resize.observe(this.stage);
    this.visibility = new IntersectionObserver(entries => {
      this.visible = entries[0].isIntersecting;
      if (!this.visible) { this.cancelDrag(); this.snap(); }
      else this.requestFrame();
    });
    this.visibility.observe(this.root);
    signal.addEventListener('abort', () => { this.clearDrag(); this.resize.disconnect(); this.visibility.disconnect(); }, { once: true });
    this.measure();
    this.render();
  }

  private measure() {
    const stage = this.stage.getBoundingClientRect();
    const track = this.track.getBoundingClientRect();
    this.travel = Math.max(40, this.track.clientWidth - this.handle.offsetWidth);
    this.endpoint = {
      x: (track.left - stage.left + this.handle.offsetWidth / 2) / Math.max(stage.width, 1) * 1200,
      y: (track.top - stage.top + this.handle.offsetHeight / 2) / Math.max(stage.height, 1) * 600,
      scale: 1200 / Math.max(stage.width, 1)
    };
    this.root.style.setProperty('--pull-travel', `${this.travel}px`);
  }

  private clearDrag() {
    const id = this.drag?.id;
    this.drag = undefined;
    this.root.classList.remove('is-pulling');
    if (id !== undefined && this.handle.hasPointerCapture(id)) this.handle.releasePointerCapture(id);
  }

  private cancelDrag() {
    if (!this.drag) return;
    const wasOpen = this.drag.wasOpen;
    this.clearDrag();
    this.suppressClick = true;
    this.setOpen(wasOpen);
  }

  private setOpen(open: boolean) {
    this.opened = open;
    this.spring.target = open ? 1000 : 0;
    this.handle.setAttribute('aria-expanded', String(open));
    this.label.textContent = open ? 'Bring it together' : 'Pull it apart';
    this.help.textContent = open ? 'Drag left, click, or press Escape.' : 'Drag right, or click to open.';
    this.status.textContent = open ? 'Under the surface: something you can use.' : 'A small demonstration. Go on, pull.';
    this.root.classList.toggle('is-unfolded', open);
    if (!open && this.product.contains(document.activeElement)) this.handle.focus({ preventScroll: true });
    if (this.reduced || !this.visible) this.snap();
    this.requestFrame();
  }

  private changeQuantity(delta: number) {
    const summary = orderSummary(this.quantity + delta);
    this.quantity = summary.count;
    this.root.querySelector<HTMLOutputElement>('[data-hero-quantity]')!.value = String(summary.count);
    this.root.querySelector<HTMLElement>('[data-hero-cart-label]')!.textContent = summary.label;
    this.root.querySelector<HTMLElement>('[data-hero-total]')!.textContent = summary.count ? `₹${summary.total}` : 'On the menu ↗︎';
    this.root.querySelector<HTMLButtonElement>('[data-hero-remove]')!.disabled = summary.count === 0;
    this.root.querySelector<HTMLButtonElement>('[data-hero-add]')!.disabled = summary.count === 9;
    this.product.classList.toggle('has-items', summary.count > 0);
  }

  private snap() {
    this.spring.value = this.spring.target;
    this.spring.velocity = 0;
    this.render();
  }

  setReduced(reduced: boolean) {
    this.cancelDrag();
    this.reduced = reduced;
    this.snap();
  }

  private render() {
    const p = clampPull(this.spring.value / 1000);
    this.root.style.setProperty('--unfold', p.toFixed(5));
    const usable = this.opened && p > .92 && !this.drag;
    this.product.inert = !usable;
    this.product.setAttribute('aria-hidden', String(!usable));
    this.product.classList.toggle('is-usable', usable);
    const path = filamentPath(p, this.endpoint.x + p * this.travel * this.endpoint.scale, this.endpoint.y);
    for (const element of this.paths) element.setAttribute('d', path);
  }

  update(seconds: number): boolean {
    if (!this.visible || this.reduced) return false;
    const active = advanceSpring(this.spring, seconds, 155, 24);
    if (active || this.spring.value === this.spring.target) this.render();
    return active;
  }
}
