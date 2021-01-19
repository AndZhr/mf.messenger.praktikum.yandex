import templateStr from './Button.hbs';
import { Block } from './../../libs/block';

export class Button extends Block {
  constructor(props: object) {
    super('div', [], props);
  }

  render() {
    return templateStr(this.props);
  }
}
