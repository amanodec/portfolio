import type { ExperienceRecord } from '../content/experience';

export class RoleEvidence {
  private readonly records: readonly ExperienceRecord[];
  private readonly panels: Map<string, HTMLElement>;
  private activeId = '';

  constructor(root: HTMLElement, records: readonly ExperienceRecord[]) {
    this.records = records;
    this.panels = new Map(
      Array.from(root.querySelectorAll<HTMLElement>('[data-experience-role]'))
        .reduce<Array<readonly [string, HTMLElement]>>((entries, panel) => {
          const id = panel.dataset.experienceRole;
          if (id) entries.push([id, panel]);
          return entries;
        }, [])
    );
  }

  setActive(id: string) {
    if (!this.records.some((record) => record.id === id)) return;
    this.activeId = id;
    this.panels.forEach((panel, panelId) => {
      const active = panelId === id;
      panel.hidden = !active;
      panel.dataset.roleActive = String(active);
      panel.setAttribute('aria-hidden', String(!active));
    });
  }

  get current() {
    return this.activeId;
  }

  destroy() {
    this.panels.forEach((panel) => {
      panel.hidden = false;
      panel.removeAttribute('aria-hidden');
      delete panel.dataset.roleActive;
    });
    this.panels.clear();
  }
}
