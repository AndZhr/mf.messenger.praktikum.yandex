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
  constructor(props: object) {
    super('div', ['chat-auth__form', 'chat-form'], props);
  }

  render(): string {
    if (!formTemplateElem) return '';
    let template = Handlebars.compile(formTemplateElem.innerHTML);
    return template(this.props);
  }
}

const loginFormBlock = new LoginForm(formData);
const submitBtn = new Button({
  classList: 'chat-main-btn',
  type: 'submit',
  text: 'Войти'
});

render('#login-form', loginFormBlock);
render('[data-component=submit-btn]', submitBtn);

if (isFormElement(loginForm)) {
  loginForm.addEventListener('blur', event => {
    inputsValidate(event, formData, loginForm);
  }, true);
  loginForm.addEventListener('submit', submitForm);
}

function render(query: string, block: any): void {
  const root: HTMLElement | null = document.querySelector(query);

  if (root) {
    root.append(block.getContent());
  }
}

function submitForm(event: Event): void {
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

function isFormElement(elem: HTMLElement | null): elem is HTMLFormElement {
  if (!elem) return false;

  return (elem.tagName === 'FORM');
}
