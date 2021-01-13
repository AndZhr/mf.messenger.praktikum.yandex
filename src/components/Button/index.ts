import templateStr from './Button';
import { Block } from './../../libs/block';

export class Button extends Block {
  constructor(props: object) {
    super('div', [], props);
  }

  render() {
    return Handlebars.compile(templateStr)(this.props);
  }
}
