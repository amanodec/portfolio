import { contactContent, type ContactFieldName } from '../content/contact.ts';
import { ContactTransmission } from './ContactTransmission.ts';

export type ContactValues = Partial<Record<ContactFieldName, string>>;

export function collectContactValues(form: HTMLFormElement): ContactValues {
  return contactContent.fields.reduce<ContactValues>((values, field) => {
    const control = form.elements.namedItem(field);
    if (control instanceof HTMLInputElement || control instanceof HTMLSelectElement || control instanceof HTMLTextAreaElement) {
      values[field] = control.value.trim();
    }
    return values;
  }, {});
}

export function buildMailto(values: ContactValues, recipient = contactContent.email) {
  const subject = `Project inquiry: ${values.project || 'new project'}`;
  const message = [
    'Hi Aman,', '',
    `I'm ${values.name || 'getting in touch'} (${values.email || 'email not provided'}).`, '',
    `Project type: ${values.project || 'Not specified'}`,
    `Ideal timeline: ${values.timeline || 'Not specified'}`,
    `Current stage: ${values.stage || 'Not specified'}`,
    `Approximate budget: ${values.budget || 'Not specified'}`, '',
    `${values.message || 'I would like to discuss a project.'}`, '',
    'Looking forward to discussing it.'
  ].join('\n');
  return `mailto:${recipient}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(message)}`;
}

type ContactControl = HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement;

export class ContactForm {
  private readonly root: HTMLElement;
  private readonly form: HTMLFormElement | null;
  private readonly status: HTMLElement | null;
  private readonly transmission: ContactTransmission | null;
  private readonly controls: ContactControl[];
  private readonly copyButton: HTMLButtonElement | null;
  private readonly copyStatus: HTMLElement | null;
  private readonly monogram: HTMLElement | null;
  private readonly listeners: Array<() => void> = [];
  private resetTimer = 0;
  private destroyed = false;

  constructor(root: HTMLElement) {
    this.root = root;
    this.form = root.querySelector<HTMLFormElement>('[data-contact-form]');
    this.status = root.querySelector<HTMLElement>('[data-contact-status]');
    this.copyButton = root.querySelector<HTMLButtonElement>('[data-copy-email]');
    this.copyStatus = root.querySelector<HTMLElement>('[data-copy-status]');
    this.monogram = root.querySelector<HTMLElement>('[data-contact-monogram]');
    this.controls = this.form ? Array.from(this.form.querySelectorAll<ContactControl>('[data-contact-field]')) : [];
    this.transmission = this.form ? new ContactTransmission(root, this.form) : null;
    this.bind();
  }

  private bind() {
    this.controls.forEach((control) => {
      const onBlur = () => this.validateControl(control);
      const onInput = () => {
        if (control.closest('[data-contact-field-wrap]')?.classList.contains('is-invalid')) this.validateControl(control);
        this.transmission?.sync();
      };
      const onChange = () => {
        if (control.closest('[data-contact-field-wrap]')?.classList.contains('is-invalid')) this.validateControl(control);
        this.transmission?.sync();
      };
      control.addEventListener('blur', onBlur);
      control.addEventListener('input', onInput);
      control.addEventListener('change', onChange);
      this.listeners.push(
        () => control.removeEventListener('blur', onBlur),
        () => control.removeEventListener('input', onInput),
        () => control.removeEventListener('change', onChange)
      );
    });

    if (this.form) {
      const onSubmit = (event: SubmitEvent) => this.submit(event);
      const onReset = () => {
        window.clearTimeout(this.resetTimer);
        this.resetTimer = window.setTimeout(() => {
          if (this.destroyed) return;
          this.controls.forEach((control) => this.clearControl(control));
          this.root.dataset.contactState = 'ready';
          this.setStatus('');
          this.transmission?.sync();
        }, 0);
      };
      this.form.addEventListener('submit', onSubmit);
      this.form.addEventListener('reset', onReset);
      this.listeners.push(
        () => this.form?.removeEventListener('submit', onSubmit),
        () => this.form?.removeEventListener('reset', onReset)
      );
    }

    if (this.copyButton) {
      const onCopy = () => this.copyEmail();
      this.copyButton.addEventListener('click', onCopy);
      this.listeners.push(() => this.copyButton?.removeEventListener('click', onCopy));
    }
  }

  private validateControl(control: ContactControl) {
    const valid = control.checkValidity();
    const field = control.closest<HTMLElement>('[data-contact-field-wrap]');
    field?.classList.toggle('is-invalid', !valid);
    control.setAttribute('aria-invalid', String(!valid));
    return valid;
  }

  private clearControl(control: ContactControl) {
    control.setAttribute('aria-invalid', 'false');
    control.closest<HTMLElement>('[data-contact-field-wrap]')?.classList.remove('is-invalid');
  }

  private submit(event: SubmitEvent) {
    event.preventDefault();
    if (!this.form) return;
    const invalid = this.controls.filter((control) => !this.validateControl(control));
    this.transmission?.sync();
    if (invalid.length) {
      this.root.dataset.contactState = 'invalid';
      this.setStatus('Please complete the highlighted fields.');
      invalid[0].focus({ preventScroll: true });
      return;
    }

    const mailto = buildMailto(collectContactValues(this.form));
    this.root.dataset.contactState = 'launching';
    this.monogram?.classList.add('is-resolved');
    this.setStatus('Prepared locally. Opening your email app. Delivery is not confirmed.');
    window.location.href = mailto;
  }

  private async copyEmail() {
    let helper: HTMLTextAreaElement | null = null;
    try {
      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(contactContent.email);
      } else {
        helper = document.createElement('textarea');
        helper.value = contactContent.email;
        helper.setAttribute('readonly', 'true');
        helper.style.cssText = 'position:fixed;opacity:0;pointer-events:none';
        document.body.append(helper);
        helper.select();
        if (!document.execCommand('copy')) throw new Error('Copy command failed');
      }
      if (!this.destroyed) this.copyStatus && (this.copyStatus.textContent = 'Email copied.');
    } catch {
      if (!this.destroyed) this.copyStatus && (this.copyStatus.textContent = 'Copy unavailable. Select the address instead.');
    } finally {
      helper?.remove();
    }
  }

  private setStatus(message: string) {
    if (this.status) this.status.textContent = message;
  }

  destroy() {
    this.destroyed = true;
    window.clearTimeout(this.resetTimer);
    this.listeners.forEach((remove) => remove());
    this.listeners.length = 0;
    this.transmission?.destroy();
  }
}
