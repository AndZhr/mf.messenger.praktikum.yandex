import templateStr from './Button.hbs';
import { Block } from '@/libs/block';

export class Button extends Block {
  constructor(props: SimpleObject) {
    super('div', [], props);
  }

  render(): string {
    return templateStr(this.props);
  }
}
