import { Block } from './../libs/block';
import { inputsValidate } from './../libs/form-validate';
import { Button } from './../components/Button/index';
import formTemplate from './templates/register-tmp';
import { AuthAPI } from './../api/auth-api';

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

export class Register extends Block {
  submitBtn: Button;
  registerForm: HTMLElement | null;

  constructor() {
    super('div', [], formData);

    this.submitBtn = new Button({
      classList: 'chat-main-btn',
      type: 'submit',
      text: 'Зарегистрироваться'
    });

    let submitBtnContainer = this._element.querySelector('[data-component=submit-btn]');

    if (submitBtnContainer) {
      submitBtnContainer.append(this.submitBtn.getContent());
    }

    this.registerForm = this._element.querySelector('#register-form');

    if (isFormElement(this.registerForm)) {
      this.registerForm.addEventListener('blur', event => {
        inputsValidate(event, this.props, this.registerForm);
      }, true);

      this.registerForm.addEventListener('submit', event => this.submitForm(event));
    }
  }

  render() {
    return Handlebars.compile(formTemplate)(this.props);
  }

  submitForm(event: Event): void {
    event.preventDefault();

    if (!isFormElement(this.registerForm)) return;

    let formFields: FormData = new FormData(this.registerForm);
    let formIsValid = inputsValidate(event, formData, this.registerForm);

    if (formIsValid && formFields) {
      if (formFields.get('password') !== formFields.get('password_confirm')) {
        let invalidDiv = document.querySelector('[data-input-name=password_confirm]');

        if (!invalidDiv) return;

        invalidDiv.classList.toggle('hidden', false);
        formData.formValid['password_confirm'] = false;

        return;
      }

      const fields = {
        'first_name': formFields.get('first_name'),
        'second_name': formFields.get('second_name'),
        'login': formFields.get('login'),
        'email': formFields.get('email'),
        'password': formFields.get('password'),
        'phone': formFields.get('phone')
      };

      new AuthAPI().signup(fields).then((xhr: XMLHttpRequest) => {
        console.log(xhr.response)
      });
    }
  }
}

// const registerFormBlock = new RegisterForm(formData);
// registerFormBlock.placeBlock();

function isFormElement(elem: HTMLElement | null): elem is HTMLFormElement {
  if (!elem) return false;

  return (elem.tagName === 'FORM');
}
