export class SourceThinking {
  private readonly openButton: HTMLButtonElement | null;
  private readonly panel: HTMLElement | null;
  private readonly closeButton: HTMLButtonElement | null;
  private readonly onOpen = () => this.open();
  private readonly onClose = () => this.close();
  private readonly onKeyDown = (event: KeyboardEvent) => {
    if (this.panel?.hidden || event.key !== 'Escape') return;
    event.preventDefault();
    this.close();
  };
  private previousFocus: HTMLElement | null = null;
  private openState = false;

  constructor(root: HTMLElement) {
    this.openButton = root.querySelector<HTMLButtonElement>('[data-source-thinking]');
    this.panel = root.querySelector<HTMLElement>('[data-source-thinking-panel]');
    this.closeButton = root.querySelector<HTMLButtonElement>('[data-source-thinking-close]');
    this.openButton?.addEventListener('click', this.onOpen);
    this.closeButton?.addEventListener('click', this.onClose);
    document.addEventListener('keydown', this.onKeyDown);
  }

  open() {
    if (!this.panel || this.openState) return;
    this.previousFocus = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    this.openState = true;
    this.panel.hidden = false;
    this.panel.inert = false;
    this.panel.setAttribute('aria-hidden', 'false');
    this.openButton?.setAttribute('aria-expanded', 'true');
    this.closeButton?.focus();
  }

  close(restoreFocus = true) {
    if (!this.panel) return;
    if (!this.openState) {
      this.panel.hidden = true;
      this.panel.inert = true;
      this.panel.setAttribute('aria-hidden', 'true');
      return;
    }
    this.openState = false;
    this.panel.hidden = true;
    this.panel.inert = true;
    this.panel.setAttribute('aria-hidden', 'true');
    this.openButton?.setAttribute('aria-expanded', 'false');
    if (restoreFocus && this.previousFocus?.isConnected) this.previousFocus.focus();
    this.previousFocus = null;
  }

  destroy() {
    this.openButton?.removeEventListener('click', this.onOpen);
    this.closeButton?.removeEventListener('click', this.onClose);
    document.removeEventListener('keydown', this.onKeyDown);
    this.close(false);
  }
}
