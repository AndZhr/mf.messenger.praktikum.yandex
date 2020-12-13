import templateStr from './FilePopup.js';
import { Block } from './../../block.js';

export class FilePopup extends Block {
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
    if (target && (target instanceof HTMLElement) && !target.closest('.chat-popup__box')) {
      this._element.classList.add('hidden');
    }
  }
}
