import templateStr from './Button.js';
import { Block } from './../../libs/block.js';

export class Button extends Block {
  constructor(props: object) {
    super('div', [], props);
  }

  render() {
    // @ts-ignore
    let template = Handlebars.compile(templateStr);
    return template(this.props);
  }
}
