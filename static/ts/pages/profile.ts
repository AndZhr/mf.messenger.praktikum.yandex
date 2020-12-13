import { Block } from './../block.js';
import { inputsValidate } from './../form-validate.js';
import { FilePopup } from './../components/FilePopup/index.js';
import { Button } from './../components/Button/index.js';

const profileTemplateElem = document.getElementById('profile-template');
// const popupTemplate = document.getElementById('popup-template');

const profileData = {
  state: {
    showInfo: true,
    changeData: false,
    changePassword: false
  },
  data: {
    'first_name': 'Михаил',
    email: 'mishamachin@ya.ru',
    login: 'mishamachin',
    'second_name': 'Мячин',
    phone: '+79991234567',
    'display_name': 'Михаил'
  }
};

class ProfilePage extends Block {
  constructor(props: object) {
    super('div', [], props);
  }

  render() {
    if (!profileTemplateElem) return '';
    // @ts-ignore
    let template = Handlebars.compile(profileTemplateElem.innerHTML);
    return template(this.props);
  }
}

const profilePage = new ProfilePage(profileData);
const avatarPopup = new FilePopup({
  title: 'Загрузите изображение',
  label: 'Выберете файл на компьютере',
  btnText: 'Поменять'
});
const changeInfoBtn = new Button({
  classList: 'chat-main-btn',
  type: 'button',
  dataType: 'change-data',
  text: 'Изменить данные'
});
const changePasswordBtn = new Button({
  classList: 'chat-main-btn',
  type: 'button',
  dataType: 'change-password',
  text: 'Изменить пароль'
});
const exitBtn = new Button({
  classList: 'chat-warning-btn',
  type: 'button',
  dataType: 'exit',
  text: 'Выйти'
});
const saveBtn = new Button({
  classList: 'chat-main-btn',
  type: 'submit',
  text: 'Сохранить'
});

render('#profile-container', profilePage);
render('#chat-popup', avatarPopup);
initShowData();

function render(query: string, block: any): void {
  const root: HTMLElement | null = document.querySelector(query);

  if (root) {
    root.append(block.getContent());
  }
}

document.addEventListener('click', (event: Event | null) => {
  if (event && event.target) {
    avatarPopup.hide(event.target);
  }
});

function initShowData() {
  render('[data-component=change-info-btn]', changeInfoBtn);
  render('[data-component=change-password-btn]', changePasswordBtn);
  render('[data-component=exit-btn]', exitBtn);

  const profileBtn = document.getElementById('profile-btn');
  const avatarBtn = document.getElementById('avatar-btn');

  if (!avatarBtn || !profileBtn) return;

  avatarBtn.addEventListener('click', event => {
    event.stopPropagation();
    avatarPopup.show();
  });

  profileBtn.addEventListener('click', (event: Event) => {
    if (event.target && event.target instanceof HTMLElement) {
      const state = {
        showInfo: false,
        changeData: false,
        changePassword: false
      };

      let actionType: string | undefined = event.target.dataset.type;

      if (actionType === 'change-data') {
        state.changeData = true;
        profilePage.setProps({ state });

        initChangeData();

      } else if (actionType === 'change-password') {
        state.changePassword = true;
        profilePage.setProps({ state });

        initChangePassword();

      } else if (actionType === 'exit') {
        console.log('[ EXIT Action ]')
      }
    }
  });
}

function initChangeData() {
  render('[data-component=save-btn]', saveBtn);

  const profileForm: HTMLElement | null = document.getElementById('profile-form');
  const formData = {
    inputsRegexp: {
      'first_name': /^[a-zа-яё\-]+$/i,
      'second_name': /^[a-zа-яё\-]+$/i,
      email: /^\S+@\S+\.\S+$/,
      phone: /^\+?(7|8)\d{10}$/,
      login: /^[a-z\_\-\.]{6,}$/i,
      'display_name': /^[a-zа-яё \-]+$/i
    },
    formValid: {
      'first_name': true,
      'second_name': true,
      email: true,
      phone: true,
      login: true,
      password: true,
      'display_name': true
    }
  };
  const state = {
    showInfo: true,
    changeData: false,
    changePassword: false
  };

  if (!isFormElement(profileForm)) return;

  profileForm.addEventListener('blur', event => {
    inputsValidate(event, formData, profileForm);
  }, true);

  profileForm.addEventListener('submit', event => {
    event.preventDefault();

    let formFields: FormData = new FormData(profileForm);
    let formIsValid = inputsValidate(event, formData, profileForm);

    if (formIsValid && formFields) {
      const fields = {
        'first_name': formFields.get('first_name'),
        'second_name': formFields.get('second_name'),
        email: formFields.get('email'),
        login: formFields.get('login'),
        phone: formFields.get('phone'),
        'display_name': formFields.get('display_name')
      };

      console.log(fields);

      profilePage.setProps({
        state,
        data: fields
      });
      initShowData();
    }
  });
}

function initChangePassword() {
  render('[data-component=save-btn]', saveBtn);

  const passwordForm: HTMLElement | null = document.getElementById('password-form');
  const formData = {
    inputsRegexp: {
      'old_password': /^.{8,}$/,
      'new_password': /^.{8,}$/,
      'new_password_confirm': /^.{8,}$/
    },
    formValid: {
      'old_password': true,
      'new_password': true,
      'new_password_confirm': true
    }
  };

  const state = {
    showInfo: true,
    changeData: false,
    changePassword: false
  };

  if (!isFormElement(passwordForm)) return;

  passwordForm.addEventListener('blur', event => {
    inputsValidate(event, formData, passwordForm);
  }, true);

  passwordForm.addEventListener('submit', event => {
    event.preventDefault();

    let formFields: FormData = new FormData(passwordForm);
    let formIsValid = inputsValidate(event, formData, passwordForm);

    if (formIsValid && formFields) {
      if (formFields.get('new_password') !== formFields.get('new_password_confirm')) {
        let invalidDiv = passwordForm.querySelector('[data-input-name=new_password_confirm]');

        if (!invalidDiv) return;

        invalidDiv.classList.toggle('hidden', false);
        formData.formValid['new_password_confirm'] = false;

        return;
      }

      const fields = {
        oldPassword: formFields.get('old_password'),
        newPassword: formFields.get('new_password'),
        newPasswordConfirm: formFields.get('new_password_confirm')
      };

      console.log(fields);

      profilePage.setProps({ state });
      initShowData();
    }
  });
}

function isFormElement(elem: HTMLElement | null): elem is HTMLFormElement {
  if (!elem) return false;

  return (elem.tagName === 'FORM');
}
