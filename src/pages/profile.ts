import { Block } from './../libs/block';
import { inputsValidate } from './../libs/form-validate';
import { FilePopup } from './../components/FilePopup/index';
import { Button } from './../components/Button/index';
import profileTemplate from './templates/profile-tmp';
import { AuthAPI } from './../api/auth-api';
import { UserAPI } from './../api/user-api';
import { Router } from './../libs/router';
import { app } from './../app';

const router = new Router('#app');

const profileData = {
  state: {
    showInfo: true,
    changeData: false,
    changePassword: false
  },
  data: {
    'first_name': '',
    email: '',
    login: '',
    'second_name': '',
    phone: '',
    'display_name': ''
  }
};

export class Profile extends Block {
  avatarPopup: FilePopup;
  changePasswordBtn: Button;
  changeInfoBtn: Button;
  exitBtn: Button;
  saveBtn: Button;

  constructor() {
    super('div', [], profileData);
  }

  render() {
    return Handlebars.compile(profileTemplate)(this.props);
  }

  appendToHTML(query: string, block: any): void {
    const root: HTMLElement | null = this._element.querySelector(query);

    if (root) {
      root.append(block.getContent());
    }
  }

  mounted() {
    this.avatarPopup = new FilePopup({
      title: '',
      label: '',
      btnText: ''
    });

    this.changeInfoBtn = new Button({
      classList: 'chat-main-btn',
      type: 'button',
      dataType: 'change-data',
      text: 'Изменить данные'
    });

    this.changePasswordBtn = new Button({
      classList: 'chat-main-btn',
      type: 'button',
      dataType: 'change-password',
      text: 'Изменить пароль'
    });

    this.exitBtn = new Button({
      classList: 'chat-warning-btn',
      type: 'button',
      dataType: 'exit',
      text: 'Выйти'
    });

    this.saveBtn = new Button({
      classList: 'chat-main-btn',
      type: 'submit',
      text: 'Сохранить'
    });

    document.addEventListener('click', (event: Event | null) => {
      if (event && event.target) {
        this.avatarPopup.hide(event.target);
      }
    });

    this.initShowData();
  }

  updated() {
    this.initShowData();
  }

  initShowData() {
    new AuthAPI().userInfo().then(xhr => {
      if (xhr.status === 200) {
        let userInfo = JSON.parse(xhr.response);

        this.setProps({ data: userInfo });
      }
    });

    this._element.append(this.avatarPopup.getContent());

    this.appendToHTML('[data-component=change-info-btn]', this.changeInfoBtn);
    this.appendToHTML('[data-component=change-password-btn]', this.changePasswordBtn);
    this.appendToHTML('[data-component=exit-btn]', this.exitBtn);

    this.avatarPopup.submit = file => {
      new UserAPI().changeProfileAvatar(file).then(xhr => {
        if (xhr.status === 200) {
          let userInfo = JSON.stringify(xhr.response);

          this.setProps({ data: userInfo });
        }
      });
    }

    const profileBtn = this._element.querySelector('#profile-btn');
    const avatarBtn = this._element.querySelector('#avatar-btn');

    if (!avatarBtn || !profileBtn) return;

    avatarBtn.addEventListener('click', event => {
      event.stopPropagation();
      this.avatarPopup.show({
        title: 'Загрузите изображение',
        label: 'Выберете файл на компьютере',
        btnText: 'Поменять'
      });
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
          this.setProps({ state });

          this.initChangeData();

        } else if (actionType === 'change-password') {
          state.changePassword = true;
          this.setProps({ state });

          this.initChangePassword();

        } else if (actionType === 'exit') {
          new AuthAPI().logout().then((xhr: XMLHttpRequest) => {
            if (xhr.status === 200) {
              app.store.isLogin = false;

              router.go('/login');
            }
          });
        }
      }
    });
  }

  initChangeData() {
    this.appendToHTML('[data-component=save-btn]', this.saveBtn);

    const profileForm: HTMLElement | null = document.getElementById('profile-form');
    const formData = {
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

        new UserAPI().changeProfile(fields).then((xhr: XMLHttpRequest) => {
          if (xhr.status === 200) {
            this.setProps({
              state,
              data: fields
            });
          }
        });
      }
    });
  }

  initChangePassword() {
    this.appendToHTML('[data-component=save-btn]', this.saveBtn);

    const passwordForm: HTMLElement | null = document.getElementById('password-form');
    const formData = {
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
          newPassword: formFields.get('new_password')
        };

        new UserAPI().changePassword(fields).then((xhr: XMLHttpRequest) => {
          if (xhr.status === 200) {
            this.setProps({ state });
          }
        });
      }
    });
  }
}

// const profilePage = new ProfilePage(profileData);
// profilePage.placeBlock();

function isFormElement(elem: HTMLElement | null): elem is HTMLFormElement {
  if (!elem) return false;

  return (elem.tagName === 'FORM');
}
