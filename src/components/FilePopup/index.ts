import templateStr from './FilePopup.hbs';
import { Block } from '@/libs/block';

export class FilePopup extends Block {
  file: File | null;

  constructor(props: SimpleObject) {
    super('div', ['chat-popup', 'hidden'], props);

    this.file = null;
  }

  render(): string {
    return templateStr(this.props);
  }

  mounted(): void {
    this.initActions();
  }

  updated(): void {
    this.initActions();
  }

  initActions(): void {
    const inputElement = this._element.querySelector('input');
    const buttonElement = this._element.querySelector('button');

    if (inputElement && buttonElement) {
      inputElement.addEventListener('change', (event: Event) => {
        if (event.target && event.target instanceof HTMLInputElement && event.target.files) {
          this.file = event.target.files[0];

          if (this.file) {
            this.setProps({
              label: this.file.name
            });

            const invalidElem = this._element.querySelector('.chat-btn-invalid');
            if (invalidElem && invalidElem instanceof HTMLElement) {
              invalidElem.hidden = true;
            }
          }
        }
      });

      buttonElement.addEventListener('click', event => {
        if (!event.target) return;

        if (!this.file) {
          const invalidElem = this._element.querySelector('.chat-btn-invalid');
          if (invalidElem && invalidElem instanceof HTMLElement) {
            invalidElem.hidden = false;
          }

          return;
        }

        this.submit(this.file);
        this.file = null;

        this._element.classList.add('hidden');
      });
    }
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars,@typescript-eslint/no-empty-function
  submit(_file: File): void {}

  show(props?: SimpleObject): void {
    if (props) {
      this.setProps(props);
    }

    this._element.classList.remove('hidden');
  }

  hide(target?: EventTarget): void {
    if (target && (target instanceof HTMLElement) && !target.closest('.chat-popup__box')) {
      this._element.classList.add('hidden');
    }
  }
}
