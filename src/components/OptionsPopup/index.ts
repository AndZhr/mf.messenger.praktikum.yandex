import templateStr from './OptionsPopup.hbs';
import { Block } from './../../libs/block';

export class OptionsPopup extends Block {
  constructor(props: object) {
    super('div', ['chat-popup', 'hidden'], props);
  }

  render() {
    return templateStr(this.props);
  }

  mounted() {
    this.initActions();
  }

  updated() {
    this.initActions();
  }

  initActions() {
    const formElement = this._element.querySelector('form');
    const selectElement = this._element.querySelector('select');

    if (formElement && selectElement) {
      formElement.addEventListener('submit', event => {
        event.preventDefault();

        if (!event.target || !(event.target instanceof HTMLElement) || !event.target.dataset.actionType) return;

        let actionType = event.target.dataset.actionType;
        let input = selectElement.value;

        if (!input) {
          let invalidElem = this._element.querySelector('.chat-input__invalid');
          if (invalidElem && invalidElem instanceof HTMLElement) {
            invalidElem.hidden = false;
          }

          return;
        }

        this.submit(actionType, input);

        this._element.classList.add('hidden');
      });
    }
  }

  submit(_actionType: string, _input: string) {}

  show(props?: object) {
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
