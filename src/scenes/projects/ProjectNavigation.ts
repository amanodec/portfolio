export class ProjectNavigation {
  private readonly section: HTMLElement;
  private readonly current: HTMLElement[];

  constructor(section: HTMLElement) {
    this.section = section;
    this.current = Array.from(section.querySelectorAll<HTMLElement>('[data-project-current]'));
    this.setProgress(0);
  }

  setProgress(progress: number) {
    this.current.forEach((item) => {
      item.setAttribute('aria-current', 'page');
      item.dataset.projectStage = progress > 0.7 ? 'proof' : progress > 0.28 ? 'signature' : 'entry';
    });
    this.section.style.setProperty('--project-navigation-progress', Math.max(0, Math.min(progress, 1)).toFixed(4));
  }

  destroy() {
    this.current.forEach((item) => delete item.dataset.projectStage);
  }
}
