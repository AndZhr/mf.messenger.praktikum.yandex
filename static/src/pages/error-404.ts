import { Block } from './../libs/block.js';
import formTemplate from './templates/error.tmp.js';

const pageData = {
  title: '404',
  text: 'Такой страницы не существует'
};

export class Error404 extends Block {
  loginForm: HTMLElement | null;

  constructor() {
    super('div', [], pageData);
  }

  render(): string {
    let template = Handlebars.compile(formTemplate);
    return template(this.props);
  }
}
