import { advanceSpring, axis, limit, movementBounds, rebuildLayout, releasePosition } from './labPhysics';
import type { Axis, Bounds } from './labPhysics';
import { createCompositionPrint, printColours } from './labPrint';
import type { PrintColour } from './labPrint';

type PieceName = 'type' | 'card';
type Piece = { element: HTMLElement; button: HTMLButtonElement; x: Axis; y: Axis; left: number; top: number; width: number; height: number; bounds: Bounds };
type Drag = { name: PieceName; id: number; startX: number; startY: number; originX: number; originY: number; neighbourX: number; neighbourY: number; lastX: number; lastY: number; time: number; vx: number; vy: number; moved: boolean; rotation: number; lift: boolean; rebuilt: boolean; phase: string; label: string };

export class CompositionLab {
  private root = document.querySelector<HTMLElement>('[data-lab]')!;
  private canvas = this.root.querySelector<HTMLElement>('[data-lab-canvas]')!;
  private status = this.root.querySelector<HTMLElement>('[data-lab-status]')!;
  private stateLabel = this.root.querySelector<HTMLElement>('[data-lab-state]')!;
  private guide = this.root.querySelector<SVGPathElement>('[data-lab-guide]')!;
  private pin = this.root.querySelector<SVGCircleElement>('[data-lab-pin]')!;
  private pieces: Record<PieceName, Piece>;
  private rotation = axis(-5);
  private lift = axis();
  private drag?: Drag;
  private suppressedClick?: PieceName;
  private reduced = false;
  private visible = true;
  private width = 1;
  private height = 1;
  private intent = 0;
  private energy = 0;
  private edition = 1;
  private colour: PrintColour = 'vermilion';
  private rebuilt = false;
  private resize: ResizeObserver;
  private visibility: IntersectionObserver;
  private downloadURL?: string;

  constructor(private requestFrame: () => void, signal: AbortSignal) {
    const piece = (name: PieceName, selector: string): Piece => ({
      element: this.root.querySelector<HTMLElement>(selector)!,
      button: this.root.querySelector<HTMLButtonElement>(`[data-lab-grab="${name}"]`)!,
      x: axis(), y: axis(), left: 0, top: 0, width: 0, height: 0,
      bounds: { minX: 0, maxX: 0, minY: 0, maxY: 0 }
    });
    this.pieces = { type: piece('type', '[data-lab-title]'), card: piece('card', '[data-lab-object]') };
    for (const name of ['type', 'card'] as const) {
      const button = this.pieces[name].button;
      button.addEventListener('pointerdown', event => this.startDrag(event, name), { signal });
      button.addEventListener('pointermove', event => this.moveDrag(event), { signal });
      button.addEventListener('pointerup', event => this.endDrag(event), { signal });
      button.addEventListener('pointercancel', () => this.cancelDrag(), { signal });
      button.addEventListener('lostpointercapture', () => { if (this.drag?.name === name) this.cancelDrag(); }, { signal });
      button.addEventListener('keydown', event => this.onKey(event, name), { signal });
      button.addEventListener('click', event => {
        if (event.detail > 0 && this.suppressedClick === name) { this.suppressedClick = undefined; return; }
        if (name === 'card') {
          this.setLift(this.lift.target < .5);
          this.energy = Math.max(this.energy, .25);
          this.markChanged(this.lift.target > .5 ? 'Surface. Image. Typography. One interface, three decisions.' : 'The layers come together. The detail stays.');
        } else {
          this.nudge(name, this.pieces.type.x.target > 30 ? -48 : 48, -12);
        }
        this.requestFrame();
      }, { signal });
    }
    this.root.querySelector('[data-lab-rebuild]')!.addEventListener('click', () => this.rebuild(), { signal });
    this.root.querySelector('[data-lab-reset]')!.addEventListener('click', () => this.reset(), { signal });
    this.root.querySelector('[data-lab-save]')!.addEventListener('click', () => this.save(), { signal });
    this.root.querySelectorAll<HTMLButtonElement>('[data-lab-colour]').forEach(button => button.addEventListener('click', () => {
      this.setColour(button.dataset.labColour === 'cobalt' ? 'cobalt' : 'vermilion');
      this.status.textContent = `${this.colour === 'cobalt' ? 'Cobalt' : 'Vermilion'}. A different colour, a different character.`;
    }, { signal }));
    document.addEventListener('keydown', event => {
      if (event.key === 'Escape' && this.drag) { event.preventDefault(); this.cancelDrag(); }
    }, { signal });
    document.addEventListener('visibilitychange', () => { if (document.hidden) this.cancelDrag(); }, { signal });
    window.addEventListener('blur', () => this.cancelDrag(), { signal });
    this.resize = new ResizeObserver(() => { this.cancelDrag(); this.measure(); if (this.rebuilt) this.placeRebuilt(); this.requestFrame(); });
    this.resize.observe(this.canvas);
    this.visibility = new IntersectionObserver(entries => {
      this.visible = entries[0].isIntersecting;
      if (!this.visible) { this.cancelDrag(); this.snap(); this.render(); }
      else this.requestFrame();
    }, { rootMargin: '100px' });
    this.visibility.observe(this.root);
    signal.addEventListener('abort', () => {
      this.cancelDrag(); this.resize.disconnect(); this.visibility.disconnect();
      if (this.downloadURL) URL.revokeObjectURL(this.downloadURL);
    }, { once: true });
    this.measure();
    this.render();
  }

  private measure() {
    this.width = Math.max(this.canvas.clientWidth, 1);
    this.height = Math.max(this.canvas.clientHeight, 1);
    for (const piece of Object.values(this.pieces)) {
      piece.left = piece.element.offsetLeft; piece.top = piece.element.offsetTop;
      piece.width = piece.element.offsetWidth; piece.height = piece.element.offsetHeight;
      piece.bounds = movementBounds(this.width, this.height, piece.left, piece.top, piece.width, piece.height, piece === this.pieces.card ? 36 : 18);
      piece.x.target = limit(piece.x.target, piece.bounds.minX, piece.bounds.maxX);
      piece.y.target = limit(piece.y.target, piece.bounds.minY, piece.bounds.maxY);
      piece.x.value = limit(piece.x.value, piece.bounds.minX, piece.bounds.maxX);
      piece.y.value = limit(piece.y.value, piece.bounds.minY, piece.bounds.maxY);
    }
  }

  private startDrag(event: PointerEvent, name: PieceName) {
    if (event.button !== 0 || this.drag || !event.isPrimary) return;
    const piece = this.pieces[name], neighbour = this.pieces[name === 'type' ? 'card' : 'type'];
    this.suppressedClick = undefined;
    this.drag = { name, id: event.pointerId, startX: event.clientX, startY: event.clientY, originX: piece.x.value, originY: piece.y.value, neighbourX: neighbour.x.value, neighbourY: neighbour.y.value, lastX: event.clientX, lastY: event.clientY, time: event.timeStamp, vx: 0, vy: 0, moved: false, rotation: this.rotation.target, lift: this.lift.target > .5, rebuilt: this.rebuilt, phase: this.root.dataset.phase ?? 'composed', label: this.stateLabel.textContent ?? '' };
    piece.button.setPointerCapture(event.pointerId);
    piece.button.focus({ preventScroll: true });
    piece.button.classList.add('is-held');
    piece.x.target = piece.x.value; piece.y.target = piece.y.value;
    piece.x.velocity = piece.y.velocity = 0;
  }

  private moveDrag(event: PointerEvent) {
    const drag = this.drag;
    if (!drag || event.pointerId !== drag.id) return;
    const dx = event.clientX - drag.startX, dy = event.clientY - drag.startY;
    if (!drag.moved && Math.hypot(dx, dy) < 5) return;
    drag.moved = true;
    this.rebuilt = false;
    this.root.dataset.phase = 'playing';
    this.stateLabel.textContent = 'Following your lead';
    const piece = this.pieces[drag.name];
    const dt = Math.max(event.timeStamp - drag.time, 8) / 1000;
    drag.vx = drag.vx * .35 + ((event.clientX - drag.lastX) / dt) * .65;
    drag.vy = drag.vy * .35 + ((event.clientY - drag.lastY) / dt) * .65;
    drag.lastX = event.clientX; drag.lastY = event.clientY; drag.time = event.timeStamp;
    piece.x.target = piece.x.value = limit(drag.originX + dx, piece.bounds.minX, piece.bounds.maxX);
    piece.y.target = piece.y.value = limit(drag.originY + dy, piece.bounds.minY, piece.bounds.maxY);
    this.respond(drag.name, dx, dy, drag.neighbourX, drag.neighbourY);
    if (drag.name === 'card') { this.setLift(true); this.rotation.target = limit(-5 + dx * .035 + drag.vx * .003, -17, 17); }
    this.requestFrame();
  }

  private respond(name: PieceName, dx: number, dy: number, originX: number, originY: number) {
    const neighbour = this.pieces[name === 'type' ? 'card' : 'type'];
    neighbour.x.target = limit(originX - dx * .16, neighbour.bounds.minX, neighbour.bounds.maxX);
    neighbour.y.target = limit(originY - dy * .1, neighbour.bounds.minY, neighbour.bounds.maxY);
    if (name === 'type') this.rotation.target = limit(-5 - dx * .045, -17, 17);
  }

  private endDrag(event: PointerEvent) {
    const drag = this.drag;
    if (!drag || event.pointerId !== drag.id) return;
    const piece = this.pieces[drag.name];
    this.drag = undefined;
    piece.button.classList.remove('is-held');
    if (piece.button.hasPointerCapture(drag.id)) piece.button.releasePointerCapture(drag.id);
    if (!drag.moved) return;
    this.suppressedClick = drag.name;
    const stale = event.timeStamp - drag.time > 90;
    const vx = stale ? 0 : drag.vx, vy = stale ? 0 : drag.vy;
    const landing = releasePosition(piece.x.value, piece.y.value, vx, vy, piece.bounds, this.reduced);
    piece.x.target = landing.x; piece.y.target = landing.y;
    piece.x.velocity = this.reduced ? 0 : limit(vx, -1800, 1800) * .45;
    piece.y.velocity = this.reduced ? 0 : limit(vy, -1800, 1800) * .45;
    this.remember(drag.name, landing.x, landing.y, Math.hypot(vx, vy));
    this.markChanged(landing.decisive ? 'That had some energy. I’ll remember it when we rebuild.' : 'One move. The whole composition finds a new balance.');
    this.requestFrame();
  }

  private cancelDrag() {
    const drag = this.drag;
    if (!drag) return;
    this.drag = undefined;
    const piece = this.pieces[drag.name];
    piece.button.classList.remove('is-held');
    this.suppressedClick = drag.name;
    if (piece.button.hasPointerCapture(drag.id)) piece.button.releasePointerCapture(drag.id);
    piece.x.target = drag.originX; piece.y.target = drag.originY;
    piece.x.velocity = piece.y.velocity = 0;
    const neighbour = this.pieces[drag.name === 'type' ? 'card' : 'type'];
    neighbour.x.target = drag.neighbourX; neighbour.y.target = drag.neighbourY;
    this.rotation.target = drag.rotation;
    this.setLift(drag.lift);
    this.rebuilt = drag.rebuilt;
    this.root.dataset.phase = drag.phase;
    this.stateLabel.textContent = drag.label;
    this.status.textContent = 'Drag undone. Try another direction.';
    this.requestFrame();
  }

  private onKey(event: KeyboardEvent, name: PieceName) {
    const directions: Record<string, [number, number]> = { ArrowLeft: [-1, 0], ArrowRight: [1, 0], ArrowUp: [0, -1], ArrowDown: [0, 1] };
    const direction = directions[event.key];
    if (!direction) return;
    event.preventDefault();
    this.cancelDrag();
    this.nudge(name, direction[0] * (event.shiftKey ? 48 : 22), direction[1] * (event.shiftKey ? 48 : 22));
  }

  private nudge(name: PieceName, dx: number, dy: number) {
    const piece = this.pieces[name], neighbour = this.pieces[name === 'type' ? 'card' : 'type'];
    piece.x.target = limit(piece.x.target + dx, piece.bounds.minX, piece.bounds.maxX);
    piece.y.target = limit(piece.y.target + dy, piece.bounds.minY, piece.bounds.maxY);
    this.respond(name, dx, dy, neighbour.x.target, neighbour.y.target);
    if (name === 'card') this.setLift(true);
    this.remember(name, piece.x.target, piece.y.target, 0);
    this.markChanged(name === 'type' ? 'The type moves. The artwork makes room.' : 'The artwork moves. The type gives it space.');
    this.requestFrame();
  }

  private remember(name: PieceName, x: number, y: number, speed: number) {
    this.intent = limit((name === 'type' ? x : -x) / this.width, -1, 1);
    this.energy = Math.max(this.energy, limit(Math.hypot(x / this.width, y / this.height) * 2 + speed / 2200, 0, 1));
  }

  private markChanged(message: string) {
    this.rebuilt = false;
    this.root.dataset.phase = 'playing';
    this.stateLabel.textContent = 'A composition in progress';
    this.status.textContent = message;
  }

  private setLift(open: boolean) {
    this.lift.target = open ? 1 : 0;
    this.pieces.card.button.setAttribute('aria-pressed', String(open));
    this.pieces.card.button.setAttribute('aria-label', open ? 'Reassemble the artwork layers' : 'Lift the artwork into layers');
    this.root.querySelector<HTMLElement>('.specimen-grab-hint > span')!.textContent = open ? 'Three decisions. One object.' : 'Lift the artwork';
  }

  private placeRebuilt() {
    const layout = rebuildLayout(this.intent, this.energy, window.innerWidth <= 760);
    for (const [name, x, y] of [['type', layout.titleX, layout.titleY], ['card', layout.cardX, layout.cardY]] as const) {
      const piece = this.pieces[name];
      piece.x.target = limit(x * this.width - piece.left, piece.bounds.minX, piece.bounds.maxX);
      piece.y.target = limit(y * this.height - piece.top, piece.bounds.minY, piece.bounds.maxY);
      piece.x.velocity = piece.y.velocity = 0;
    }
    this.rotation.target = layout.rotation;
    this.setLift(false);
    this.root.dataset.balance = layout.reverse ? 'reverse' : 'open';
  }

  private rebuild() {
    this.cancelDrag();
    this.edition++;
    this.rebuilt = true;
    this.placeRebuilt();
    this.root.dataset.phase = 'rebuilding';
    this.root.querySelector<HTMLElement>('[data-lab-edition]')!.textContent = String(this.edition).padStart(3, '0');
    this.stateLabel.textContent = 'Finding its balance';
    this.status.textContent = 'Your gestures, brought into balance. This one is yours.';
    this.requestFrame();
  }

  private setColour(colour: PrintColour) {
    this.colour = colour;
    this.root.style.setProperty('--print-accent', printColours[colour]);
    this.root.querySelectorAll<HTMLButtonElement>('[data-lab-colour]').forEach(button => button.setAttribute('aria-pressed', String(button.dataset.labColour === colour)));
    this.root.querySelector<HTMLElement>('[data-lab-colour-name]')!.textContent = colour === 'cobalt' ? 'Cobalt / 02' : 'Vermilion / 01';
  }

  private reset() {
    this.cancelDrag(); this.rebuilt = false; this.intent = this.energy = 0; this.edition = 1;
    for (const piece of Object.values(this.pieces)) { piece.x.target = piece.y.target = 0; piece.x.velocity = piece.y.velocity = 0; }
    this.rotation.target = -5; this.setLift(false); this.setColour('vermilion');
    this.root.dataset.phase = 'composed'; this.root.dataset.balance = 'open';
    this.root.querySelector<HTMLElement>('[data-lab-edition]')!.textContent = '001';
    this.stateLabel.textContent = 'Yours to reshape';
    this.status.textContent = 'A fresh sheet. Follow a different instinct.';
    this.requestFrame();
  }

  private save() {
    const type = this.pieces.type, card = this.pieces.card;
    const titleFont = parseFloat(getComputedStyle(this.root.querySelector('.atelier-title-line')!).fontSize) / this.width;
    const svg = createCompositionPrint({ titleX: (type.left + type.x.value) / this.width, titleY: (type.top + type.y.value) / this.height, titleFont, aspectRatio: this.width / this.height, cardX: (card.left + card.x.value) / this.width, cardY: (card.top + card.y.value) / this.height, cardWidth: card.width / this.width, rotation: this.rotation.value, edition: this.edition, colour: this.colour });
    if (this.downloadURL) URL.revokeObjectURL(this.downloadURL);
    this.downloadURL = URL.createObjectURL(new Blob([svg], { type: 'image/svg+xml;charset=utf-8' }));
    const link = document.createElement('a'); link.href = this.downloadURL;
    link.download = `aman-composition-${String(this.edition).padStart(3, '0')}.svg`;
    document.body.append(link); link.click(); link.remove();
    this.status.textContent = 'Your SVG print is ready. A little piece of the lab to keep.';
  }

  private snap() {
    for (const state of this.axes()) { state.value = state.target; state.velocity = 0; }
  }

  private axes() { return [this.pieces.type.x, this.pieces.type.y, this.pieces.card.x, this.pieces.card.y, this.rotation, this.lift]; }

  setReduced(reduced: boolean) {
    this.reduced = reduced;
    if (reduced) this.snap();
    this.render(); this.requestFrame();
  }

  update(seconds: number): boolean {
    if (!this.visible) return false;
    let active = false;
    if (this.reduced) this.snap();
    else for (const state of this.axes()) if (advanceSpring(state, seconds)) active = true;
    // Momentum may approach an edge at speed; keep the complete controls reachable.
    for (const piece of Object.values(this.pieces)) {
      const x = limit(piece.x.value, piece.bounds.minX, piece.bounds.maxX);
      const y = limit(piece.y.value, piece.bounds.minY, piece.bounds.maxY);
      if (x !== piece.x.value) { piece.x.value = x; piece.x.velocity = 0; }
      if (y !== piece.y.value) { piece.y.value = y; piece.y.velocity = 0; }
    }
    this.render();
    if (!active && this.root.dataset.phase === 'rebuilding') { this.root.dataset.phase = 'composed'; this.stateLabel.textContent = 'Composed by you'; }
    return active;
  }

  private render() {
    const type = this.pieces.type, card = this.pieces.card;
    const css = this.root.style;
    css.setProperty('--type-x', `${type.x.value.toFixed(2)}px`); css.setProperty('--type-y', `${type.y.value.toFixed(2)}px`);
    css.setProperty('--card-x', `${card.x.value.toFixed(2)}px`); css.setProperty('--card-y', `${card.y.value.toFixed(2)}px`);
    css.setProperty('--card-angle', `${this.rotation.value.toFixed(2)}deg`); css.setProperty('--lift', limit(this.lift.value, 0, 1).toFixed(4));
    css.setProperty('--response-x', `${(type.x.value * -.12).toFixed(2)}px`); css.setProperty('--response-y', `${(type.y.value * -.13).toFixed(2)}px`);
    const x1 = type.left + type.x.value + type.width * .8, y1 = type.top + type.y.value + type.height * .9;
    const x2 = card.left + card.x.value + card.width * .5, y2 = card.top + card.y.value + card.height * .45;
    this.guide.setAttribute('d', `M ${x1} ${y1} C ${x1 + 60} ${y1 + 80}, ${x2 - 90} ${y2 + 80}, ${x2} ${y2}`);
    this.pin.setAttribute('cx', String(x2)); this.pin.setAttribute('cy', String(y2));
  }
}
