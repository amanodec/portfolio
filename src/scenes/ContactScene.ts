import { ContactForm } from '../forms/ContactForm.ts';
import type { DeviceTier } from '../core/DeviceTier';
import type { MotionPreferences } from '../core/MotionPreferences';
import { ScrollState } from '../core/ScrollState';

export class ContactScene {
  private readonly section: HTMLElement;
  private readonly scroll: ScrollState;
  private readonly form: ContactForm;
  private readonly localTime: HTMLElement | null;
  private readonly footerYear: HTMLElement | null;
  private readonly unsubscribePreferences: () => void;
  private readonly onVisibility = () => {
    if (document.hidden) this.stopClock();
    else {
      this.updateClock();
      this.startClock();
    }
  };
  private clock = 0;
  private active = false;

  constructor(section: HTMLElement, preferences: MotionPreferences, tier: DeviceTier) {
    this.section = section;
    this.scroll = new ScrollState(section);
    this.form = new ContactForm(section);
    this.localTime = section.querySelector<HTMLElement>('[data-local-time]');
    this.footerYear = document.querySelector<HTMLElement>('[data-footer-year]');
    this.unsubscribePreferences = preferences.subscribe((_mode, effective) => {
      this.section.dataset.effects = effective;
      this.section.dataset.deviceTier = tier.name;
      this.section.dataset.motionState = effective === 'reduced' || tier.name === 'low' ? 'static' : 'responsive';
    });
    this.updateClock();
    document.addEventListener('visibilitychange', this.onVisibility);
  }

  enter() {
    this.active = true;
    this.section.dataset.sceneState = 'active';
    this.section.dataset.webgl = 'false';
    this.scroll.measure();
    this.startClock();
    this.update();
  }

  update(progress?: number) {
    if (!this.active) return;
    const value = Math.min(Math.max(progress ?? this.scroll.update().progress, 0), 1);
    this.section.style.setProperty('--contact-progress', value.toFixed(4));
    this.section.dataset.contactVisibility = value < 0.18 ? 'entry' : value > 0.82 ? 'complete' : 'ready';
  }

  leave() {
    this.active = false;
    this.section.dataset.sceneState = 'settled';
    this.stopClock();
  }

  destroy() {
    this.active = false;
    this.stopClock();
    document.removeEventListener('visibilitychange', this.onVisibility);
    this.unsubscribePreferences();
    this.form.destroy();
    this.scroll.destroy();
  }

  private updateClock() {
    const time = new Intl.DateTimeFormat('en-IN', {
      timeZone: 'Asia/Kolkata',
      hour: '2-digit',
      minute: '2-digit',
      hour12: false
    }).format(new Date());
    if (this.localTime) {
      this.localTime.textContent = `${time} IST`;
      this.localTime.setAttribute('datetime', new Date().toISOString());
    }
    if (this.footerYear) this.footerYear.textContent = String(new Date().getFullYear());
  }

  private startClock() {
    if (!this.active || document.hidden || this.clock) return;
    this.clock = window.setInterval(() => this.updateClock(), 60_000);
  }

  private stopClock() {
    if (!this.clock) return;
    window.clearInterval(this.clock);
    this.clock = 0;
  }
}
