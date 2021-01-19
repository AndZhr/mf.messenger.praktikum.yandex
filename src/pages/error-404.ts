import { Block } from './../libs/block';
import formTemplate from './templates/error.hbs';

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
    return formTemplate(this.props);
  }
}
