import templateStr from './ButtonPopup.hbs';
import { Block } from './../../libs/block';

export class ButtonPopup extends Block {
  constructor(props: SimpleObject) {
    super('div', ['chat-popup', 'hidden'], props);
  }

  render():string {
    return templateStr(this.props);
  }

  mounted(): void {
    this.initActions();
  }

  updated(): void {
    this.initActions();
  }

  initActions(): void {
    const сancelBtn = this._element.querySelector('[data-btn-type=сancel]');
    const submitBtn = this._element.querySelector('[data-btn-type=submit]');

    if (сancelBtn && submitBtn) {
      сancelBtn.addEventListener('click', () => {
        this._element.classList.add('hidden');
      });

      submitBtn.addEventListener('click', () => {
        if (submitBtn instanceof HTMLButtonElement && submitBtn.dataset.actionType) {
          this.submit(submitBtn.dataset.actionType);

          this._element.classList.add('hidden');
        }
      });
    }
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars,@typescript-eslint/no-empty-function
  submit(_action: string): void {}

  show(props?: SimpleObject): void {
    if (props) {
      this.setProps(props);
    }

    this._element.classList.remove('hidden');
  }

  hide(target?: EventTarget): void {
    if (target && target instanceof Element && !target.closest('.chat-popup__box')) {
      this._element.classList.add('hidden');
    }
  }
}
