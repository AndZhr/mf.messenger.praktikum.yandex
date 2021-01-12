import { Block } from './../libs/block';
import { inputsValidate } from './../libs/form-validate';
import { Button } from './../components/Button/index';
import formTemplate from './templates/login.tmp';
import { AuthAPI } from './../api/auth-api';
import { Router } from './../libs/router';
import { app } from './../app';

const router = new Router('#app');

const formData = {
  formValid: {
    login: true,
    password: true
  }
};

export class Login extends Block {
  submitBtn: Button;
  loginForm: HTMLElement | null;

  constructor() {
    super('div', ['chat-auth__form', 'chat-form'], formData);

    this.submitBtn = new Button({
      classList: 'chat-main-btn',
      type: 'submit',
      text: 'Войти'
    });

    let submitBtnContainer = this._element.querySelector('[data-component=submit-btn]');

    if (submitBtnContainer) {
      submitBtnContainer.append(this.submitBtn.getContent());
    }

    this.loginForm = this._element.querySelector('#login-form');

    if (isFormElement(this.loginForm)) {
      this.loginForm.addEventListener('blur', event => {
        inputsValidate(event, this.props, this.loginForm);
      }, true);

      this.loginForm.addEventListener('submit', event => this.submitForm(event));
    }
  }

  render(): string {
    let template = Handlebars.compile(formTemplate);
    return template(this.props);
  }

  submitForm(event: Event): void {
    event.preventDefault();

    if (!isFormElement(this.loginForm)) return;

    let formFields: FormData = new FormData(this.loginForm);
    let formIsValid = inputsValidate(event, this.props, this.loginForm);

    if (formIsValid && formFields) {
      const fields = {
        login: formFields.get('login'),
        password: formFields.get('password')
      };

      new AuthAPI().signin(fields).then((xhr: XMLHttpRequest) => {
        if (xhr.status === 200) {
          app.store.isLogin = true;

          router.go('/');
        }
      });
    }
  }
}

function isFormElement(elem: HTMLElement | null): elem is HTMLFormElement {
  if (!elem) return false;

  return (elem.tagName === 'FORM');
}
