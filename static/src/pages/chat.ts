import { Block } from './../libs/block.js';
import { FilePopup } from './../components/FilePopup/index.js';
import { InputPopup } from './../components/InputPopup/index.js';
import { ButtonPopup } from './../components/ButtonPopup/index.js';
import { Button } from './../components/Button/index.js';
import chatListTemplate from './templates/chat-list.tmp.js';
import chatTemplate from './templates/chat.tmp.js';
import { ChatAPI } from './../api/chat-api.js';

const chatListData = {
  chatsList: [
    {
      id: 'chat_0',
      firstLetter: 'А',
      title: 'Андрей',
      time: '19:39',
      message: 'Отель на Мальдивах предложил неограниченное проживание в...',
      yourMessageFlag: false,
      notReadCount: 2,
      messageList: []
    },
    {
      id: 'chat_1',
      firstLetter: 'Н',
      title: 'Никита',
      time: '19:42',
      message: 'Теперь понял, откуда ты узнал об этом сайте) тоже посмотрел',
      yourMessageFlag: false,
      notReadCount: 1,
      messageList: []
    },
    {
      id: 'chat_2',
      firstLetter: 'С',
      title: 'Славик',
      time: '02:24',
      message: 'Что-то срочное? Я на встрече с Геннадием Валентиновичем',
      yourMessageFlag: false,
      notReadCount: 0,
      messageList: []
    },
    {
      id: 'chat_3',
      firstLetter: 'П',
      title: 'Петр Хадяков',
      time: 'Пт',
      message: 'Да нет, всё понятно. Это уж она сама выберет, какие ей хочется.',
      yourMessageFlag: false,
      notReadCount: 1,
      messageList: []
    },
    {
      id: 'chat_4',
      firstLetter: 'И',
      title: 'Илья Варламов',
      time: 'Пт',
      message: 'Выборы президента США — главное событие поздней осени...',
      yourMessageFlag: false,
      notReadCount: 0,
      messageList: []
    },
    {
      id: 'chat_5',
      firstLetter: 'И',
      title: 'Ира',
      time: 'Чт',
      message: 'Придумаем что-нибудь)',
      yourMessageFlag: true,
      notReadCount: 0,
      messageList: []
    },
    {
      id: 'chat_6',
      firstLetter: 'Р',
      title: 'Роман',
      time: 'Чт',
      message: 'Скоро буду',
      yourMessageFlag: true,
      notReadCount: 0,
      messageList: [
        {
          text: 'Мы уже на месте, остановились примерно в 10 км от трассы М95, здесь очень крутое место\nМы сейчас перекусим и немного прогуляемся здесь, будем ждать тебя',
          imageSrc: '',
          time: '19:23',
          yourMessageFlag: false
        },
        {
          text: '',
          imageSrc: 'images/message-img.jpg',
          time: '19:24',
          yourMessageFlag: false
        },
        {
          text: 'Скоро буду',
          imageSrc: '',
          time: '19:26',
          yourMessageFlag: true,
          deliveredFlag: true
        }
      ]
    },
    {
      id: 'chat_7',
      firstLetter: 'Ю',
      title: 'Юля',
      time: '06.11.20',
      message: 'У меня сегодня заказ',
      yourMessageFlag: false,
      notReadCount: 0,
      messageList: []
    }
  ]
};

const chatData = {
  slectedChat: '',
  chatName: '',
  messageList: []
};


class ChatList extends Block {
  chatBody: ChatBody;

  constructor(props: object, chatBody: ChatBody) {
    super('div', ['chat-list'], props);

    this.chatBody = chatBody;
    this.initChatList(true);
  }

  mounted() {
    new ChatAPI().getChats().then(xhr => {
      if (xhr.status === 200) {
        let data = JSON.parse(xhr.response);

        console.log(data);
      }
    });
  }

  render() {
    let template = Handlebars.compile(chatListTemplate);
    return template(this.props);
  }

  initChatList(firstInit?: boolean) {
    if (firstInit) {
      const searchInput = this._element.querySelector('#chat-list-search');
      const originalChatsList = chatListData.chatsList.slice();

      if (searchInput) {
        searchInput.addEventListener('input', event => {
          let targetElem: EventTarget | null = event.target;

          if (!targetElem || !(targetElem instanceof HTMLInputElement)) return;

          let searchValue = targetElem.value;

          if (searchValue) {
            let filterChatList = originalChatsList.filter(chat => chat.name.indexOf(searchValue) !== -1);

            this.setProps({
              chatsList: filterChatList
            });

            this.initChatList();

          } else {
            this.setProps({
              chatsList: originalChatsList
            });

            this.initChatList();
          }

        });
      }
    }

    const chatList: HTMLElement | null = this._element.querySelector('#chat-list');

    if (chatList) {
      chatList.addEventListener('click', event => {
        let targetElem: EventTarget | null = event.target;

        if (!targetElem || !(targetElem instanceof Element)) return;

        let chatListItem: HTMLElement | null = targetElem.closest('.chat-list__item');

        let selectedChat = chatListData.chatsList.find(item => {
          if (!chatListItem) return false;
          return item.id === chatListItem.id;
        });

        if (!selectedChat) return;

        this.chatBody.setProps({
          chatFirstLetter: selectedChat.firstLetter,
          chatName: selectedChat.name,
          slectedChat: selectedChat.id,
          messageList: selectedChat.messageList
        });

        this.chatBody.initChat();
      });
    }
  }
}

class ChatBody extends Block {
  inputPopup: InputPopup;
  filePopup: FilePopup;
  buttonPopup: ButtonPopup;
  submitBtn: Button;

  constructor(props: object) {
    super('div', ['chat-body'], props);

    this.inputPopup = new InputPopup({
      title: '',
      label: '',
      btnText: '',
      invalidText: ''
    });

    this.filePopup = new FilePopup({
      title: '',
      label: '',
      btnText: ''
    });

    this.buttonPopup = new ButtonPopup({
      title: 'Вы действительно хотите удалить чат?',
      btnText: 'Удалить'
    });

    this.submitBtn = new Button({
      classList: 'message-feed__footer-send-btn icon icon-arrow-right-solid',
      type: 'submit',
      text: ''
    });

    this.initChat();

    this.appendToHTML('#input-popup', this.inputPopup);
    this.appendToHTML('#file-popup', this.filePopup);
    this.appendToHTML('#button-popup', this.buttonPopup);

    this._element.addEventListener('click', (event: Event | null) => {
      if (event && event.target) {
        this.filePopup.hide(event.target);
        this.inputPopup.hide(event.target);
        this.buttonPopup.hide(event.target);
      }

      const dropDownList = this._element.querySelectorAll('[data-dropdown]');

      for (let dropdown of dropDownList) {
        dropdown.classList.remove('show');
      }
    });
  }

  render() {
    let template = Handlebars.compile(chatTemplate);
    return template(this.props);
  }

  appendToHTML(query: string, block: any): void {
    const root: HTMLElement | null = this._element.querySelector(query);

    if (root) {
      root.append(block.getContent());
    }
  }

  initChat() {
    this.appendToHTML('[data-component=submit-btn]', this.submitBtn);

    const messageForm: HTMLElement | null = this._element.querySelector('#message-form');
    const dropDownList = this._element.querySelectorAll('[data-dropdown]');

    if (isFormElement(messageForm)) {
      messageForm.addEventListener('submit', event => {
        event.preventDefault();

        let formFields: FormData = new FormData(messageForm);

        if (formFields && formFields.get('message')) {
          const fields = {
            message: formFields.get('message')
          };

          console.log(fields);
        }
      });
    }

    for (let dropdown of dropDownList) {
      let dropdownActiveBtn: HTMLElement | null = dropdown.querySelector('[data-dropdown-btn]');
      let dropdownBody: HTMLElement | null = dropdown.querySelector('[data-dropdown-body]');

      if (dropdownActiveBtn) {
        dropdownActiveBtn.addEventListener('click', event => {
          event.stopPropagation();

          dropdown.classList.toggle('show');
        });
      }

      if (dropdownBody) {
        dropdownBody.addEventListener('click', event => {
          event.stopPropagation();
          let targetElem: EventTarget | null = event.target;

          if (targetElem && targetElem instanceof Element) {
            dropdown.classList.remove('show');
            let btnElem: HTMLElement | null = targetElem.closest('[data-btn-action]');

            if (btnElem) {
              if (btnElem.dataset.btnAction === 'add-user') {
                this.inputPopup.show({
                  title: 'Добавить пользователя',
                  label: 'Логин',
                  btnText: 'Добавить',
                  invalidText: 'Укажите логин'
                });

              } else if (btnElem.dataset.btnAction === 'remove-user') {
                this.inputPopup.show({
                  title: 'Удалить пользователя',
                  label: 'Логин',
                  btnText: 'Удалить',
                  invalidText: 'Укажите логин'
                });

              } else if (btnElem.dataset.btnAction === 'remove-chat') {
                this.buttonPopup.show();

              } else if (btnElem.dataset.btnAction === 'send-photo') {
                this.filePopup.show({
                  title: 'Загрузите файл',
                  label: 'Выберете фото или видео на компьютере',
                  btnText: 'Загрузить'
                });

              } else if (btnElem.dataset.btnAction === 'send-file') {
                this.filePopup.show({
                  title: 'Загрузите файл',
                  label: 'Выберете файл на компьютере',
                  btnText: 'Загрузить'
                });

              }
            }
          }
        });
      }

    }
  }
}

export class Chats extends Block {

  constructor() {
    super('div', ['chat-container']);

    const chatBody = new ChatBody(chatData);

    this._element.append(new ChatList(chatListData, chatBody).getContent());
    this._element.append(chatBody.getContent());
  }
}

function isFormElement(elem: HTMLElement | null): elem is HTMLFormElement {
  if (!elem) return false;

  return (elem.tagName === 'FORM');
}
