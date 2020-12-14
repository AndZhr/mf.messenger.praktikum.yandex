import { Block } from './../block.js';
import { inputsValidate } from './../form-validate.js';
import { Button } from './../components/Button/index.js';

const registerForm: HTMLElement | null = document.getElementById('register-form');
const formTemplateElem = document.getElementById('register-template');
const formData = {
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
  submitBtn: Button;

  constructor(props: object) {
    super('div', ['chat-auth__form', 'chat-form'], props);

    this.submitBtn = new Button({
      classList: 'chat-main-btn',
      type: 'submit',
      text: 'Зарегистрироваться'
    });
  }

  placeBlock() {
    this.appendToHTML('#register-form', this);
    this.appendToHTML('[data-component=submit-btn]', this.submitBtn);

    if (isFormElement(registerForm)) {
      registerForm.addEventListener('blur', event => {
        inputsValidate(event, formData, registerForm);
      }, true);
      registerForm.addEventListener('submit', this.submitForm);
    }
  }

  render() {
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
}

const registerFormBlock = new RegisterForm(formData);
registerFormBlock.placeBlock();

function isFormElement(elem: HTMLElement | null): elem is HTMLFormElement {
  if (!elem) return false;

  return (elem.tagName === 'FORM');
}
