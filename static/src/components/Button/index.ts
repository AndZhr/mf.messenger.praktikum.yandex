import templateStr from './Button';
import { Block } from './../../libs/block';

export class Button extends Block {
  constructor(props: object) {
    super('div', [], props);
  }

  render() {
    let template = Handlebars.compile(templateStr);
    return template(this.props);
  }
}
