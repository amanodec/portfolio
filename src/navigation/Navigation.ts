export class Navigation {
  private readonly links = Array.from(document.querySelectorAll<HTMLAnchorElement>('.nav-link'));
  private readonly sections = Array.from(document.querySelectorAll<HTMLElement>('[data-section]'));
  private observer?: IntersectionObserver;

  constructor() {
    if (!('IntersectionObserver' in window)) return;
    this.observer = new IntersectionObserver((entries) => {
      const active = entries.filter((entry) => entry.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
      if (!active) return;
      this.links.forEach((link) => {
        const selected = link.getAttribute('href') === `#${active.target.id}`;
        link.classList.toggle('active', selected);
        if (selected) link.setAttribute('aria-current', 'location');
        else link.removeAttribute('aria-current');
      });
      document.body.dataset.currentScene = active.target.id;
    }, { rootMargin: '-18% 0px -64% 0px', threshold: [0.02, 0.15, 0.4] });
    this.sections.forEach((section) => this.observer?.observe(section));
  }

  destroy() {
    this.observer?.disconnect();
  }
}
