import type { PlaygroundExperimentId } from '../content/playground.ts';
import { playgroundIds } from '../content/playground.ts';
import type { DeviceTier } from '../core/DeviceTier.ts';
import type { FrameLoop } from '../core/FrameLoop.ts';
import type { MotionPreferences } from '../core/MotionPreferences.ts';
import { ScrollState } from '../core/ScrollState.ts';
import { ExperimentControls } from '../components/ExperimentControls.ts';
import { ElasticType } from '../experiments/ElasticType.ts';
import { MotionCurveLab } from '../experiments/MotionCurveLab.ts';
import { ResponsiveComposition } from '../experiments/ResponsiveComposition.ts';

type PlaygroundExperiment = {
  activate: () => void;
  deactivate: () => void;
  setMotionMode: (mode: 'full' | 'reduced') => void;
  destroy: () => void;
};

export class PlaygroundScene {
  private readonly section: HTMLElement;
  private readonly frameLoop: FrameLoop;
  private readonly tier: DeviceTier;
  private readonly scroll: ScrollState;
  private readonly controls: ExperimentControls;
  private readonly panels: Map<PlaygroundExperimentId, HTMLElement>;
  private readonly experiments: Map<PlaygroundExperimentId, PlaygroundExperiment>;
  private readonly unsubscribePreferences: () => void;
  private activeId: PlaygroundExperimentId = 'elastic-type';
  private active = false;
  private explicitSelectionUntil = 0;
  private previousProgress = -1;
  private destroyed = false;

  constructor(section: HTMLElement, frameLoop: FrameLoop, preferences: MotionPreferences, tier: DeviceTier) {
    this.section = section;
    this.frameLoop = frameLoop;
    this.tier = tier;
    this.scroll = new ScrollState(section);
    this.panels = new Map(
      Array.from(section.querySelectorAll<HTMLElement>('[data-experiment-panel]'))
        .reduce<Array<readonly [PlaygroundExperimentId, HTMLElement]>>((entries, panel) => {
          const id = panel.dataset.experimentPanel as PlaygroundExperimentId | undefined;
          if (id && playgroundIds.includes(id)) entries.push([id, panel]);
          return entries;
        }, [])
    );
    const panel = (id: PlaygroundExperimentId) => this.panels.get(id) || section;
    this.experiments = new Map<PlaygroundExperimentId, PlaygroundExperiment>([
      ['elastic-type', new ElasticType(panel('elastic-type'), frameLoop)],
      ['responsive-composition', new ResponsiveComposition(panel('responsive-composition'))],
      ['motion-curves', new MotionCurveLab(panel('motion-curves'), frameLoop)]
    ]);
    this.controls = new ExperimentControls(section, (id) => this.select(id, true));
    this.unsubscribePreferences = preferences.subscribe((_mode, effective) => {
      const mode = effective === 'full' && tier.name !== 'low' ? 'full' : 'reduced';
      this.section.dataset.effects = effective;
      this.section.dataset.deviceTier = tier.name;
      this.section.dataset.motionState = mode === 'reduced' ? 'static' : 'responsive';
      this.experiments.forEach((experiment) => experiment.setMotionMode(mode));
    });
    this.select(this.activeId, false);
  }

  enter() {
    if (this.destroyed) return;
    this.active = true;
    this.section.dataset.sceneState = 'active';
    this.section.dataset.webgl = 'false';
    this.section.dataset.frameLoop = this.frameLoop.active ? 'shared' : 'idle';
    this.scroll.measure();
    this.update();
  }

  update(progress?: number) {
    if (!this.active || this.destroyed) return;
    const value = Math.min(Math.max(progress ?? this.scroll.update().progress, 0), 1);
    const changed = this.previousProgress < 0 || Math.abs(value - this.previousProgress) > .005;
    this.previousProgress = value;
    this.section.style.setProperty('--playground-progress', value.toFixed(4));
    this.section.dataset.playgroundState = value < .13 ? 'entry' : value > .87 ? 'exit' : 'play';
    const index = value < .34 ? 0 : value < .68 ? 1 : 2;
    const focusInsideCurrent = this.panels.get(this.activeId)?.contains(document.activeElement) ?? false;
    const explicit = Date.now() < this.explicitSelectionUntil || focusInsideCurrent;
    if ((changed && !explicit) || !this.explicitSelectionUntil) this.select(playgroundIds[index], false);
  }

  leave() {
    if (this.destroyed) return;
    this.active = false;
    this.experiments.get(this.activeId)?.deactivate();
    this.section.dataset.sceneState = 'settled';
    this.section.dataset.playgroundState = 'exit';
  }

  private select(id: PlaygroundExperimentId, moveFocus: boolean) {
    if (this.destroyed || !playgroundIds.includes(id)) return;
    const next = this.experiments.get(id);
    if (!next) return;
    if (id === this.activeId && this.section.dataset.activeExperiment === id) {
      this.explicitSelectionUntil = moveFocus ? Date.now() + 900 : this.explicitSelectionUntil;
      this.controls.setActive(id, moveFocus);
      return;
    }
    const previous = this.experiments.get(this.activeId);
    previous?.deactivate();
    this.activeId = id;
    this.explicitSelectionUntil = moveFocus ? Date.now() + 900 : 0;
    this.controls.setActive(id, moveFocus);
    this.panels.forEach((panel, panelId) => {
      const active = panelId === id;
      panel.hidden = !active;
      panel.classList.toggle('is-active', active);
      panel.setAttribute('aria-hidden', String(!active));
    });
    this.section.dataset.activeExperiment = id;
    this.section.style.setProperty('--active-experiment-color', this.colorFor(id));
    next.activate();
  }

  private colorFor(id: PlaygroundExperimentId) {
    return this.panels.get(id)?.dataset.experimentAccent || '#c8ff36';
  }

  destroy() {
    if (this.destroyed) return;
    this.destroyed = true;
    this.unsubscribePreferences();
    this.controls.destroy();
    this.experiments.forEach((experiment) => experiment.destroy());
    this.scroll.destroy();
  }
}
