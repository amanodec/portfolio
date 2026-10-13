import type { ExperienceRecord } from '../content/experience';
import { RoleEvidence } from './RoleEvidence';

type SelectionReason = 'scroll' | 'pointer' | 'keyboard' | 'control' | 'anchor';

export class ExperienceTimeline {
  private readonly root: HTMLElement;
  private readonly records: readonly ExperienceRecord[];
  private readonly ids: readonly string[];
  private readonly controls: HTMLButtonElement[];
  private readonly stops: HTMLButtonElement[];
  private readonly evidence: RoleEvidence;
  private readonly year: HTMLElement | null;
  private readonly previous: HTMLButtonElement | null;
  private readonly next: HTMLButtonElement | null;
  private readonly handlers: Array<() => void> = [];
  private selectedId = '';
  private selectedIndex = 0;
  private visited = new Set<string>();
  private progress = -1;
  private explicitSelection = false;
  private explicitSelectionUntil = 0;

  constructor(root: HTMLElement, records: readonly ExperienceRecord[]) {
    this.root = root;
    this.records = records;
    this.ids = records.map(({ id }) => id);
    this.controls = Array.from(root.querySelectorAll<HTMLButtonElement>('[data-role-select]'));
    this.stops = Array.from(root.querySelectorAll<HTMLButtonElement>('[data-role-stop]'));
    this.evidence = new RoleEvidence(root, records);
    this.year = root.querySelector<HTMLElement>('[data-experience-year]');
    this.previous = root.querySelector<HTMLButtonElement>('[data-role-previous]');
    this.next = root.querySelector<HTMLButtonElement>('[data-role-next]');

    this.controls.forEach((control) => {
      const id = control.dataset.roleSelect;
      if (!id) return;
      const onClick = () => this.select(id, 'control', false);
      const onKeyDown = (event: KeyboardEvent) => this.onControlKeyDown(event, id);
      control.addEventListener('click', onClick);
      control.addEventListener('keydown', onKeyDown);
      this.handlers.push(() => {
        control.removeEventListener('click', onClick);
        control.removeEventListener('keydown', onKeyDown);
      });
    });

    this.stops.forEach((stop) => {
      const id = stop.dataset.roleStop;
      if (!id) return;
      const onClick = () => this.select(id, 'pointer', false);
      const onPointerEnter = () => this.preview(id);
      const onPointerLeave = () => this.clearPreview();
      stop.addEventListener('click', onClick);
      stop.addEventListener('pointerenter', onPointerEnter, { passive: true });
      stop.addEventListener('pointerleave', onPointerLeave, { passive: true });
      this.handlers.push(() => {
        stop.removeEventListener('click', onClick);
        stop.removeEventListener('pointerenter', onPointerEnter);
        stop.removeEventListener('pointerleave', onPointerLeave);
      });
    });

    const anchorLinks = Array.from(root.querySelectorAll<HTMLAnchorElement>('[data-role-anchor]'));
    anchorLinks.forEach((link) => {
      const id = link.dataset.roleAnchor;
      if (!id) return;
      const onClick = () => window.requestAnimationFrame(() => this.focusRole(id));
      link.addEventListener('click', onClick);
      this.handlers.push(() => link.removeEventListener('click', onClick));
    });

    const onPrevious = () => this.select(this.ids[Math.max(this.selectedIndex - 1, 0)], 'control', false);
    const onNext = () => this.select(this.ids[Math.min(this.selectedIndex + 1, this.ids.length - 1)], 'control', false);
    this.previous?.addEventListener('click', onPrevious);
    this.next?.addEventListener('click', onNext);
    this.handlers.push(() => {
      this.previous?.removeEventListener('click', onPrevious);
      this.next?.removeEventListener('click', onNext);
    });

    this.select(this.ids[0], 'scroll', false);
  }

  updateProgress(progress: number) {
    const nextProgress = Math.min(Math.max(progress, 0), 1);
    const progressChanged = this.progress < 0 || Math.abs(nextProgress - this.progress) > 0.005;
    this.progress = nextProgress;
    this.root.style.setProperty('--experience-progress', this.progress.toFixed(4));
    this.root.style.setProperty('--experience-line-progress', Math.min(this.progress * 1.18, 1).toFixed(4));
    const index = this.progress < 0.34 ? 0 : this.progress < 0.69 ? 1 : 2;
    this.root.dataset.experienceState = this.progress < 0.12 ? 'entry' : this.progress > 0.86 ? 'exit' : 'travel';
    this.root.dataset.experienceIndex = String(index);
    const explicitSelectionSettled = this.explicitSelection && Date.now() < this.explicitSelectionUntil;
    if ((progressChanged && !explicitSelectionSettled) || !this.explicitSelection) {
      this.explicitSelection = false;
      this.select(this.ids[index], 'scroll', false);
    }
  }

  select(id: string, reason: SelectionReason = 'control', moveFocus = false) {
    const index = this.ids.indexOf(id);
    if (index < 0) return;
    this.selectedId = id;
    this.selectedIndex = index;
    if (reason !== 'scroll') {
      this.explicitSelection = true;
      this.explicitSelectionUntil = Date.now() + 750;
    }
    this.visited.add(id);
    this.root.dataset.activeRole = id;
    this.root.style.setProperty('--active-role-index', String(index));
    this.root.style.setProperty('--active-role-color', this.records[index].accent);
    this.root.dataset.roleSelectionReason = reason;
    this.evidence.setActive(id);
    this.controls.forEach((control) => {
      const active = control.dataset.roleSelect === id;
      control.setAttribute('aria-selected', String(active));
      control.tabIndex = active ? 0 : -1;
      control.classList.toggle('is-active', active);
    });
    this.stops.forEach((stop) => {
      const active = stop.dataset.roleStop === id;
      stop.setAttribute('aria-pressed', String(active));
      stop.classList.toggle('is-active', active);
      const visited = Boolean(stop.dataset.roleStop && this.visited.has(stop.dataset.roleStop));
      stop.classList.toggle('is-visited', visited);
    });
    if (this.year) this.year.textContent = this.records[index].start.slice(0, 4);
    if (this.previous) this.previous.disabled = index === 0;
    if (this.next) this.next.disabled = index === this.ids.length - 1;
    if (moveFocus) this.focusRole(id);
  }

  focusRole(id: string) {
    this.select(id, 'anchor', false);
    const heading = this.root.querySelector<HTMLElement>(`[data-experience-role="${id}"] h3`);
    heading?.focus({ preventScroll: true });
  }

  destroy() {
    this.handlers.splice(0).forEach((remove) => remove());
    this.evidence.destroy();
  }

  private preview(id: string) {
    if (this.root.dataset.effects === 'reduced') return;
    this.root.dataset.previewRole = id;
  }

  private clearPreview() {
    delete this.root.dataset.previewRole;
  }

  private onControlKeyDown(event: KeyboardEvent, id: string) {
    const current = this.ids.indexOf(id);
    if (!['ArrowRight', 'ArrowDown', 'ArrowLeft', 'ArrowUp', 'Home', 'End', 'Enter', ' '].includes(event.key)) return;
    event.preventDefault();
    if (event.key === 'Enter' || event.key === ' ') {
      this.select(id, 'keyboard', false);
      return;
    }
    const next = event.key === 'Home'
      ? 0
      : event.key === 'End'
        ? this.ids.length - 1
        : event.key === 'ArrowRight' || event.key === 'ArrowDown'
          ? Math.min(current + 1, this.ids.length - 1)
          : Math.max(current - 1, 0);
    const control = this.controls.find((candidate) => candidate.dataset.roleSelect === this.ids[next]);
    control?.focus();
    this.select(this.ids[next], 'keyboard', false);
  }
}
