import { Block } from './../block.js';
import { inputsValidate } from './../form-validate.js';
import { Button } from './../components/Button/index.js';

const loginForm: HTMLElement | null = document.getElementById('login-form');
const formTemplateElem: HTMLElement | null = document.getElementById('login-template');
const formData = {
  formValid: {
    login: true,
    password: true
  }
};

class LoginForm extends Block {
  submitBtn: Button;

  constructor(props: object) {
    super('div', ['chat-auth__form', 'chat-form'], props);

    this.submitBtn = new Button({
      classList: 'chat-main-btn',
      type: 'submit',
      text: 'Войти'
    });

    this.appendToHTML('#login-form', this);
    this.appendToHTML('[data-component=submit-btn]', this.submitBtn);

    if (isFormElement(loginForm)) {
      loginForm.addEventListener('blur', event => {
        inputsValidate(event, formData, loginForm);
      }, true);
      loginForm.addEventListener('submit', this.submitForm);
    }
  }

  render(): string {
    if (!formTemplateElem) return '';
    let template = Handlebars.compile(formTemplateElem.innerHTML);
    return template(this.props);
  }

  appendToHTML(query: string, block: any): void {
    const root: HTMLElement | null = document.querySelector(query);

    if (root) {
      root.append(block.getContent());
    }
  }

  submitForm(event: Event): void {
    event.preventDefault();

    if (!isFormElement(loginForm)) return;

    let formFields: FormData = new FormData(loginForm);
    let formIsValid = inputsValidate(event, formData, loginForm);

    if (formIsValid && formFields) {
      const fields = {
        login: formFields.get('login'),
        password: formFields.get('password')
      };

      console.log(fields);
    }
  }
}

const loginFormBlock = new LoginForm(formData);

function isFormElement(elem: HTMLElement | null): elem is HTMLFormElement {
  if (!elem) return false;

  return (elem.tagName === 'FORM');
}
