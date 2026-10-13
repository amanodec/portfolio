import type { ProjectWorldScene } from './ProjectWorldScene';

export type ProjectMatchCutState = 'idle' | 'incoming' | 'outgoing';

/** Keeps the shared Signal legible while each world changes its metaphor. */
export class ProjectMatchCut {
  private readonly sections: HTMLElement[];

  constructor(sections: readonly HTMLElement[]) {
    this.sections = [...sections];
  }

  apply(scene: ProjectWorldScene, progress: number) {
    const index = this.sections.findIndex((section) => section.dataset.project === scene.project.slug);
    if (index < 0) return;
    const previous = this.sections[index - 1];
    const current = this.sections[index];
    const next = this.sections[index + 1];
    this.sections.forEach((section) => {
      section.dataset.matchCut = 'idle';
    });
    if (progress > 0.82) {
      current.dataset.matchCut = 'outgoing';
      next?.setAttribute('data-match-cut', 'incoming');
    } else if (progress < 0.18) {
      current.dataset.matchCut = 'incoming';
      previous?.setAttribute('data-match-cut', 'outgoing');
    }
  }

  destroy() {
    this.sections.forEach((section) => delete section.dataset.matchCut);
  }
}
