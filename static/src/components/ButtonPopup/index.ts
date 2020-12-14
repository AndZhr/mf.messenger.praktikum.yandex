import templateStr from './ButtonPopup.js';
import { Block } from './../../libs/block.js';

export class ButtonPopup extends Block {
  constructor(props: object) {
    super('div', ['chat-popup', 'hidden'], props);
  }

  render() {
    // @ts-ignore
    let template = Handlebars.compile(templateStr);
    return template(this.props);
  }

  show(props?: object) {
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
