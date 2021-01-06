import { Block } from './../libs/block.js';
import formTemplate from './templates/error.tmp.js';

const pageData = {
  title: '500',
  text: 'Что-то пошло не так, но мы уже разбираемся'
};

export class Error500 extends Block {
  loginForm: HTMLElement | null;

  constructor() {
    super('div', [], pageData);
  }

  render(): string {
    let template = Handlebars.compile(formTemplate);
    return template(this.props);
  }
}
