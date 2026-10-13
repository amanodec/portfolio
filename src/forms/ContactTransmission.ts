export type ContactFieldState = {
  required: boolean;
  value: string;
  valid: boolean;
};

export function countCompletedFields(states: readonly ContactFieldState[]) {
  return states.filter((state) => state.required && state.value.trim().length > 0 && state.valid).length;
}

export class ContactTransmission {
  private readonly root: HTMLElement;
  private readonly form: HTMLFormElement;
  private readonly fields: Array<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>;
  private readonly segments: HTMLElement[];
  private focusedField = '';
  private readonly onInput = () => this.sync();
  private readonly onChange = () => this.sync();
  private readonly onFocusIn = (event: FocusEvent) => {
    const control = event.target instanceof HTMLInputElement || event.target instanceof HTMLSelectElement || event.target instanceof HTMLTextAreaElement
      ? event.target
      : null;
    this.focusedField = control?.dataset.contactField || '';
    this.sync();
  };
  private readonly onFocusOut = () => {
    this.focusedField = '';
    this.sync();
  };

  constructor(root: HTMLElement, form: HTMLFormElement) {
    this.root = root;
    this.form = form;
    this.fields = Array.from(form.querySelectorAll<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>('[data-contact-field]'));
    this.segments = Array.from(root.querySelectorAll<HTMLElement>('[data-transmission-segment]'));
    this.form.addEventListener('input', this.onInput);
    this.form.addEventListener('change', this.onChange);
    this.form.addEventListener('focusin', this.onFocusIn);
    this.form.addEventListener('focusout', this.onFocusOut);
    this.sync();
  }

  sync() {
    const states = this.fields.map((field) => ({
      required: field.required,
      value: field.value,
      valid: field.checkValidity()
    }));
    const completed = countCompletedFields(states);
    this.root.dataset.completedFields = String(completed);
    this.root.style.setProperty('--contact-completed', String(completed / Math.max(this.fields.length, 1)));
    this.segments.forEach((segment, index) => {
      const state = states[index];
      const complete = Boolean(state && state.required && state.value.trim() && state.valid);
      const focused = segment.dataset.transmissionSegment === this.focusedField;
      segment.classList.toggle('is-complete', complete);
      segment.classList.toggle('is-focused', focused);
    });
  }

  destroy() {
    this.form.removeEventListener('input', this.onInput);
    this.form.removeEventListener('change', this.onChange);
    this.form.removeEventListener('focusin', this.onFocusIn);
    this.form.removeEventListener('focusout', this.onFocusOut);
  }
}
