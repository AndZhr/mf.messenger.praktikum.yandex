import { Block } from './../block.js';
import { FilePopup } from './../components/FilePopup/index.js';
import { InputPopup } from './../components/InputPopup/index.js';
import { ButtonPopup } from './../components/ButtonPopup/index.js';
import { Button } from './../components/Button/index.js';

const chatListTemplateElem: HTMLElement | null = document.getElementById('chat-list-template');
const chatBodyTemplateElem = document.getElementById('chat-template');

const chatListData = {
  chatsList: [
    {
      id: 'chat_0',
      firstLetter: 'А',
      name: 'Андрей',
      time: '19:39',
      message: 'Отель на Мальдивах предложил неограниченное проживание в...',
      yourMessageFlag: false,
      notReadCount: 2,
      messageList: []
    },
    {
      id: 'chat_1',
      firstLetter: 'Н',
      name: 'Никита',
      time: '19:42',
      message: 'Теперь понял, откуда ты узнал об этом сайте) тоже посмотрел',
      yourMessageFlag: false,
      notReadCount: 1,
      messageList: []
    },
    {
      id: 'chat_2',
      firstLetter: 'С',
      name: 'Славик',
      time: '02:24',
      message: 'Что-то срочное? Я на встрече с Геннадием Валентиновичем',
      yourMessageFlag: false,
      notReadCount: 0,
      messageList: []
    },
    {
      id: 'chat_3',
      firstLetter: 'П',
      name: 'Петр Хадяков',
      time: 'Пт',
      message: 'Да нет, всё понятно. Это уж она сама выберет, какие ей хочется.',
      yourMessageFlag: false,
      notReadCount: 1,
      messageList: []
    },
    {
      id: 'chat_4',
      firstLetter: 'И',
      name: 'Илья Варламов',
      time: 'Пт',
      message: 'Выборы президента США — главное событие поздней осени...',
      yourMessageFlag: false,
      notReadCount: 0,
      messageList: []
    },
    {
      id: 'chat_5',
      firstLetter: 'И',
      name: 'Ира',
      time: 'Чт',
      message: 'Придумаем что-нибудь)',
      yourMessageFlag: true,
      notReadCount: 0,
      messageList: []
    },
    {
      id: 'chat_6',
      firstLetter: 'Р',
      name: 'Роман',
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
      name: 'Юля',
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
  constructor(props: object) {
    super('div', [], props);
  }

  render() {
    // @ts-ignore
    let template = Handlebars.compile(chatListTemplateElem?.innerHTML);
    return template(this.props);
  }
}

class ChatBody extends Block {
  constructor(props: object) {
    super('div', ['chat-body__message-feed', 'message-feed'], props);
  }

  render() {
    // @ts-ignore
    let template = Handlebars.compile(chatBodyTemplateElem?.innerHTML);
    return template(this.props);
  }
}

const chatListBlock = new ChatList(chatListData);
const chatBodyBlock = new ChatBody(chatData);
const inputPopup = new InputPopup({
  title: '',
  label: '',
  btnText: '',
  invalidText: ''
});
const filePopup = new FilePopup({
  title: '',
  label: '',
  btnText: ''
});
const buttonPopup = new ButtonPopup({
  title: 'Вы действительно хотите удалить чат?',
  btnText: 'Удалить'
});
const submitBtn = new Button({
  classList: 'message-feed__footer-send-btn icon icon-arrow-right-solid',
  type: 'submit',
  text: ''
});

render('#chat-list-container', chatListBlock, initChatList);
render('#chat-body', chatBodyBlock, initChat);
render('#input-popup', inputPopup);
render('#file-popup', filePopup);
render('#button-popup', buttonPopup);

function render(query: string, block: any, callBack?: (firstInit: boolean) => void): void {
  const root: HTMLElement | null = document.querySelector(query);

  if (root) {
    root.append(block.getContent());

    if(callBack) {
      callBack(true);
    }

  }
}

function initChatList(firstInit?: boolean) {
  if (firstInit) {
    const searchInput = document.getElementById('chat-list-search');
    const originalChatsList = chatListData.chatsList.slice();

    if (searchInput) {
      searchInput.addEventListener('input', event => {
        let targetElem: EventTarget | null = event.target;

        if (!targetElem || !(targetElem instanceof HTMLInputElement)) return;

        let searchValue = targetElem.value;

        if (searchValue) {
          let filterChatList = originalChatsList.filter(chat => chat.name.indexOf(searchValue) !== -1);

          chatListBlock.setProps({
            chatsList: filterChatList
          });

          initChatList();

        } else {
          chatListBlock.setProps({
            chatsList: originalChatsList
          });

          initChatList();
        }

      });
    }
  }

  const chatList: HTMLElement | null = document.getElementById('chat-list');

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

      chatBodyBlock.setProps({
        chatFirstLetter: selectedChat.firstLetter,
        chatName: selectedChat.name,
        slectedChat: selectedChat.id,
        messageList: selectedChat.messageList
      });

      initChat();
    });
  }
}

document.addEventListener('click', (event: Event | null) => {
  if (event && event.target) {
    filePopup.hide(event.target);
    inputPopup.hide(event.target);
    buttonPopup.hide(event.target);
  }

  const dropDownList = document.querySelectorAll('[data-dropdown]');

  for (let dropdown of dropDownList) {
    dropdown.classList.remove('show');
  }
});

function initChat() {
  render('[data-component=submit-btn]', submitBtn);

  const messageForm: HTMLElement | null = document.getElementById('message-form');
  const dropDownList = document.querySelectorAll('[data-dropdown]');

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
              inputPopup.show({
                title: 'Добавить пользователя',
                label: 'Логин',
                btnText: 'Добавить',
                invalidText: 'Укажите логин'
              });

            } else if (btnElem.dataset.btnAction === 'remove-user') {
              inputPopup.show({
                title: 'Удалить пользователя',
                label: 'Логин',
                btnText: 'Удалить',
                invalidText: 'Укажите логин'
              });

            } else if (btnElem.dataset.btnAction === 'remove-chat') {
              buttonPopup.show();

            } else if (btnElem.dataset.btnAction === 'send-photo') {
              filePopup.show({
                title: 'Загрузите файл',
                label: 'Выберете фото или видео на компьютере',
                btnText: 'Загрузить'
              });

            } else if (btnElem.dataset.btnAction === 'send-file') {
              filePopup.show({
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

function isFormElement(elem: HTMLElement | null): elem is HTMLFormElement {
  if (!elem) return false;

  return (elem.tagName === 'FORM');
}
