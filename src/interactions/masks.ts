import { clamp } from './springs.ts';

export const clampMaskProgress = (progress: number) => clamp(progress);

export type MaskController = {
  set: (progress: number) => void;
  destroy: () => void;
};

/**
 * CSS mask progress stays in the DOM layer so the identity scene remains
 * useful without WebGL. The controller only writes a bounded custom property.
 */
export const createMaskController = (element: HTMLElement | null): MaskController => {
  let current = 0;
  return {
    set(progress) {
      current = clampMaskProgress(progress);
      element?.style.setProperty('--mask-progress', current.toFixed(4));
    },
    destroy() {
      element?.style.removeProperty('--mask-progress');
    }
  };
};
