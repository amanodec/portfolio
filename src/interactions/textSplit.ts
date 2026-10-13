export type TextSplitController = {
  original: string;
  fragments: HTMLElement[];
  setProgress: (progress: number) => void;
  restore: () => void;
  destroy: () => void;
};

export const splitWords = (text: string) => text.trim().split(/(\s+)/).filter(Boolean);

/**
 * Creates a visual fragment layer while retaining one unfragmented accessible
 * source string. Destroying the controller restores the element exactly.
 */
export const splitText = (element: HTMLElement): TextSplitController => {
  const original = element.textContent ?? '';
  const originalAttributes = {
    ariaLabel: element.getAttribute('aria-label'),
    dataSplit: element.getAttribute('data-text-split')
  };
  const source = document.createElement('span');
  source.className = 'identity-split-source';
  source.textContent = original;
  source.setAttribute('aria-label', original);

  const visual = document.createElement('span');
  visual.className = 'identity-split-visual';
  visual.setAttribute('aria-hidden', 'true');
  const fragments: HTMLElement[] = [];
  splitWords(original).forEach((word, index) => {
    const fragment = document.createElement('span');
    fragment.className = 'identity-word';
    fragment.textContent = word;
    fragment.dataset.word = String(index);
    fragments.push(fragment);
    visual.append(fragment);
  });
  element.replaceChildren(source, visual);
  element.dataset.textSplit = 'ready';

  const setProgress = (progress: number) => {
    const bounded = Math.min(Math.max(progress, 0), 1);
    fragments.forEach((fragment, index) => {
      const direction = index % 2 === 0 ? -1 : 1;
      fragment.style.setProperty('--word-shift', `${(1 - bounded) * direction * 18}px`);
      fragment.style.setProperty('--word-rotate', `${(1 - bounded) * direction * 2.5}deg`);
      fragment.style.setProperty('--word-opacity', `${0.3 + bounded * 0.7}`);
    });
  };

  const restore = () => {
    element.replaceChildren(document.createTextNode(original));
    element.removeAttribute('data-text-split');
    if (originalAttributes.ariaLabel === null) element.removeAttribute('aria-label');
    else element.setAttribute('aria-label', originalAttributes.ariaLabel);
    if (originalAttributes.dataSplit === null) element.removeAttribute('data-text-split');
    else element.setAttribute('data-text-split', originalAttributes.dataSplit);
  };

  setProgress(0);
  return { original, fragments, setProgress, restore, destroy: restore };
};
