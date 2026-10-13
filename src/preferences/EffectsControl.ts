import type { MotionMode, MotionPreferences } from '../core/MotionPreferences';

const labels: Record<MotionMode, string> = {
  system: 'System effects',
  full: 'Full effects',
  reduced: 'Reduced effects'
};

export class EffectsControl {
  private readonly preferences: MotionPreferences;
  private readonly control = document.querySelector<HTMLButtonElement>('#effects-control');
  private readonly menu = document.querySelector<HTMLElement>('#effects-menu');
  private readonly label = document.querySelector<HTMLElement>('#effects-label');
  private readonly options = Array.from(document.querySelectorAll<HTMLButtonElement>('[data-effects]'));
  private readonly onDocumentClick = (event: MouseEvent) => {
    if (this.menu && !this.menu.hidden && !this.menu.contains(event.target as Node) && !this.control?.contains(event.target as Node)) this.close();
  };
  private readonly onKeyDown = (event: KeyboardEvent) => {
    if (event.key === 'Escape') {
      this.close();
      this.control?.focus();
    }
  };
  private readonly listeners: Array<() => void> = [];
  private unsubscribePreferences?: () => boolean;

  constructor(preferences: MotionPreferences) {
    this.preferences = preferences;
    const onControlClick = () => this.toggle();
    this.control?.addEventListener('click', onControlClick);
    this.listeners.push(() => this.control?.removeEventListener('click', onControlClick));
    this.options.forEach((option) => {
      const onOptionClick = () => {
      const mode = option.dataset.effects as MotionMode;
      if (mode === 'system' || mode === 'full' || mode === 'reduced') this.preferences.set(mode);
      this.close();
      this.control?.focus();
      };
      option.addEventListener('click', onOptionClick);
      this.listeners.push(() => option.removeEventListener('click', onOptionClick));
    });
    document.addEventListener('click', this.onDocumentClick);
    document.addEventListener('keydown', this.onKeyDown);
    this.unsubscribePreferences = this.preferences.subscribe((mode, effective) => {
      document.documentElement.dataset.effects = effective;
      document.documentElement.dataset.effectsPreference = mode;
      if (this.label) this.label.textContent = labels[mode];
      this.options.forEach((option) => option.setAttribute('aria-checked', String(option.dataset.effects === mode)));
    });
  }

  private toggle() {
    if (!this.menu || !this.control) return;
    const open = this.menu.hidden;
    this.menu.hidden = !open;
    this.control.setAttribute('aria-expanded', String(open));
    if (open) this.options[0]?.focus();
  }

  private close() {
    if (!this.menu || !this.control) return;
    this.menu.hidden = true;
    this.control.setAttribute('aria-expanded', 'false');
  }

  destroy() {
    this.listeners.splice(0).forEach((remove) => remove());
    document.removeEventListener('click', this.onDocumentClick);
    document.removeEventListener('keydown', this.onKeyDown);
    this.unsubscribePreferences?.();
    this.unsubscribePreferences = undefined;
    this.close();
  }
}
