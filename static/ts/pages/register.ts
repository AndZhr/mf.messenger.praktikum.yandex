import { Block } from './../block.js';
import { inputsValidate } from './../form-validate.js';
import { Button } from './../components/Button/index.js';

const registerForm: HTMLElement | null = document.getElementById('register-form');
const formTemplateElem = document.getElementById('register-template');
const formData = {
  inputsRegexp: {
    email: /^\S+@\S+\.\S+$/,
    login: /^[a-z\_\-\.]{6,}$/i,
    'first_name': /^[a-zа-яё\-]+$/i,
    'second_name': /^[a-zа-яё\-]+$/i,
    phone: /^\+?(7|8)\d{10}$/,
    password: /^.{8,}$/,
    'password_confirm': /^.{8,}$/
  },
  formValid: {
    email: true,
    login: true,
    'first_name': true,
    'second_name': true,
    phone: true,
    password: true,
    'password_confirm': true
  }
};

class RegisterForm extends Block {
  constructor(props: object) {
    super('div', ['chat-auth__form', 'chat-form'], props);
  }

  render() {
    if (!formTemplateElem) return '';
    // @ts-ignore
    let template = Handlebars.compile(formTemplateElem.innerHTML);
    return template(this.props);
  }
}

const registerFormBlock = new RegisterForm(formData);
const submitBtn = new Button({
  classList: 'chat-main-btn',
  type: 'submit',
  text: 'Зарегистрироваться'
});

render('#register-form', registerFormBlock);
render('[data-component=submit-btn]', submitBtn);

if (isFormElement(registerForm)) {
  registerForm.addEventListener('blur', event => {
    inputsValidate(event, formData, registerForm);
  }, true);
  registerForm.addEventListener('submit', submitForm);
}

function render(query: string, block: any): void {
  const root: HTMLElement | null = document.querySelector(query);

  if (root) {
    root.append(block.getContent());
  }
}

function submitForm(event: Event): void {
  event.preventDefault();

  if (!isFormElement(registerForm)) return;

  let formFields: FormData = new FormData(registerForm);
  let formIsValid = inputsValidate(event, formData, registerForm);

  if (formIsValid && formFields) {
    if (formFields.get('password') !== formFields.get('password_confirm')) {
      let invalidDiv = document.querySelector('[data-input-name=password_confirm]');

      if (!invalidDiv) return;

      invalidDiv.classList.toggle('hidden', false);
      formData.formValid['password_confirm'] = false;

      return;
    }

    const fields = {
      email: formFields.get('email'),
      login: formFields.get('login'),
      firstName: formFields.get('first_name'),
      secondName: formFields.get('second_name'),
      phone: formFields.get('phone'),
      password: formFields.get('password'),
      passwordConfirm: formFields.get('password_confirm')
    };

    console.log(fields);
  }
}

function isFormElement(elem: HTMLElement | null): elem is HTMLFormElement {
  if (!elem) return false;

  return (elem.tagName === 'FORM');
}
