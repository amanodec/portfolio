export type Scene = {
  id: string;
  enter?: () => void;
  update?: (progress: number) => void;
  leave?: () => void;
  destroy?: () => void;
};

export class SceneDirector {
  private scenes = new Map<string, Scene>();
  private active: Scene | null = null;

  register(scene: Scene) {
    this.scenes.set(scene.id, scene);
    return () => this.scenes.delete(scene.id);
  }

  enter(id: string) {
    const next = this.scenes.get(id);
    if (!next || next === this.active) return;
    this.active?.leave?.();
    this.active = next;
    next.enter?.();
  }

  exit(id?: string) {
    if (id && this.active?.id !== id) return;
    this.active?.leave?.();
    this.active = null;
  }

  update(id: string, progress: number) {
    if (this.active?.id === id) this.active.update?.(progress);
  }

  destroy() {
    this.scenes.forEach((scene) => scene.destroy?.());
    this.scenes.clear();
    this.active = null;
  }
}
