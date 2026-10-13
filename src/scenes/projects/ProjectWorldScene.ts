import type { ProjectRecord } from '../../content/projects';

export type ProjectWorldScene = {
  readonly project: ProjectRecord;
  prepare(): Promise<void> | void;
  enter(): void;
  update(progress: number): void;
  leave(): void;
  suspend(): void;
  resume(): void;
  destroy(): void;
};
