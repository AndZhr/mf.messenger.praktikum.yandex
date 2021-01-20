import { Block } from './../libs/block';
import { FilePopup } from './../components/FilePopup/index';
import { InputPopup } from './../components/InputPopup/index';
import { OptionsPopup } from './../components/OptionsPopup/index';
import { ButtonPopup } from './../components/ButtonPopup/index';
import { Button } from './../components/Button/index';
import chatListTemplate from './templates/chat-list.hbs';
import chatListContainerTemplate from './templates/chat-list-container.hbs';
import chatTemplate from './templates/chat.hbs';
import { ChatAPI } from './../api/chat-api';
import { UserAPI } from './../api/user-api';

type ChatObj = {
    id: number,
    firstLetter?: string,
    title: string,
    messageList: SimpleObject[]
};

type ChatListInter = {
  chatsList: ChatObj[]
};

type chatData = {
  slectedChat: number | null,
  chatName: string,
  messageList: SimpleObject[],
  usersList: SimpleObject[]
};

const chatListData: ChatListInter = {
  chatsList: []
};

const chatData: chatData = {
  slectedChat: null,
  chatName: '',
  messageList: [],
  usersList: []
};

class ChatBody extends Block {
  inputPopup: InputPopup;

  filePopup: FilePopup;

  buttonPopup: ButtonPopup;

  submitBtn: Button;

  optionPopup: OptionsPopup;

  constructor(props: chatData) {
    super('div', ['chat-body'], props);

    this.inputPopup = new InputPopup({
      title: 'Поиск пользователя',
      label: 'Логин',
      btnText: 'Искать',
      invalidText: 'Укажите логин',
      action: 'add-user'
    });

    this.optionPopup = new OptionsPopup({
      title: '',
      label: '',
      btnText: '',
      invalidText: '',
      list: [],
      action: ''
    });

    this.filePopup = new FilePopup({
      title: '',
      label: '',
      btnText: ''
    });

    this.buttonPopup = new ButtonPopup({
      title: 'Вы действительно хотите удалить чат?',
      btnText: 'Удалить',
      action: 'remove-chat'
    });

    this.submitBtn = new Button({
      classList: 'message-feed__footer-send-btn icon icon-arrow-right-solid',
      type: 'submit',
      text: ''
    });

    this.initChat();

    document.addEventListener('click', (event: Event | null) => {
      if (event && event.target) {
        this.filePopup.hide(event.target);
        this.inputPopup.hide(event.target);
        this.optionPopup.hide(event.target);
        this.buttonPopup.hide(event.target);
      }

      const dropDownList = this._element.querySelectorAll('[data-dropdown]');

      dropDownList.forEach(dropdown => {
        dropdown.classList.remove('show');
      });
    });
  }

  render(): string {
    return chatTemplate(this.props);
  }

  appendToHTML(query: string, block: Block): void {
    const root: HTMLElement | null = this._element.querySelector(query);

    if (root) {
      root.append(block.getContent());
    }
  }

  updated() {
    this.initChat();
  }

  initChat() {
    this.appendToHTML('[data-component=submit-btn]', this.submitBtn);

    this._element.append(this.inputPopup.getContent());
    this._element.append(this.optionPopup.getContent());
    this._element.append(this.filePopup.getContent());
    this._element.append(this.buttonPopup.getContent());

    this.inputPopup.submit = (actionType: string, input: string) => {
      if (actionType === 'add-user') {
        UserAPI.searchUserByLogin(input).then(xhr => {
          if (xhr.status === 200) {
            const list = JSON.parse(xhr.response);

            this.optionPopup.show({
              title: 'Добавить пользователя',
              label: 'Пользователи',
              btnText: 'Добавить',
              invalidText: 'Выберете пользователя',
              list,
              action: 'add-user'
            });
          }
        });
      }
    };

    this.optionPopup.submit = (actionType: string, input: string) => {
      if (actionType === 'remove-user') {
        ChatAPI.removeUsersFromChat([parseInt(input, 10)], this.props.slectedChat);
      } else if (actionType === 'add-user') {
        ChatAPI.addUsersToChat([parseInt(input, 10)], this.props.slectedChat);
      }
    };

    this.buttonPopup.submit = (action: string) => {
      if (action === 'remove-chat') {
        ChatAPI.deleteChat(this.props.slectedChat);
      }
    };

    const messageForm: HTMLElement | null = this._element.querySelector('#message-form');
    const dropDownList = this._element.querySelectorAll('[data-dropdown]');

    if (isFormElement(messageForm)) {
      messageForm.addEventListener('submit', event => {
        event.preventDefault();

        // const formFields: FormData = new FormData(messageForm);

        // if (formFields && formFields.get('message')) {
        //   const fields = {
        //     message: formFields.get('message')
        //   };

        //   console.log(fields);
        // }
      });
    }

    dropDownList.forEach(dropdown => {
      const dropdownActiveBtn: HTMLElement | null = dropdown.querySelector('[data-dropdown-btn]');
      const dropdownBody: HTMLElement | null = dropdown.querySelector('[data-dropdown-body]');

      if (dropdownActiveBtn) {
        dropdownActiveBtn.addEventListener('click', event => {
          event.stopPropagation();

          dropdown.classList.toggle('show');
        });
      }

      if (dropdownBody) {
        dropdownBody.addEventListener('click', event => {
          event.stopPropagation();
          const targetElem: EventTarget | null = event.target;

          if (targetElem && targetElem instanceof Element) {
            dropdown.classList.remove('show');
            const btnElem: HTMLElement | null = targetElem.closest('[data-btn-action]');

            if (btnElem) {
              if (btnElem.dataset.btnAction === 'add-user') {
                this.inputPopup.show();
              } else if (btnElem.dataset.btnAction === 'remove-user') {
                ChatAPI.getChatUsers(this.props.slectedChat).then(xhr => {
                  if (xhr.status === 200) {
                    const list = JSON.parse(xhr.response);

                    this.optionPopup.show({
                      title: 'Удалить пользователя',
                      label: 'Пользователи',
                      btnText: 'Удалить',
                      invalidText: 'Выберете пользователя',
                      list,
                      action: 'remove-user'
                    });
                  }
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
    });
  }
}

class ChatList extends Block {
  chatBody: ChatBody;

  inputPopup: InputPopup;

  chats: ChatObj[];

  constructor(props: ChatListInter, chatBody: ChatBody) {
    super('ul', ['chat-list__list'], props);

    this.inputPopup = new InputPopup({
      title: 'Создать чат',
      label: 'Название чата',
      btnText: 'Создать',
      invalidText: 'Введите название',
      action: 'add-chat'
    });

    this.inputPopup.submit = (_actionType: string, input: string) => {
      ChatAPI.createChat(input).then(xhr => {
        if (xhr.status === 200) {
          this.requestChatList();
        }
      });
    };

    this.chatBody = chatBody;
    this.initChatList();
  }

  mounted() {
    this.requestChatList();
  }

  updated() {
    this.initChatList();
  }

  render() {
    return chatListContainerTemplate(this.props);
  }

  requestChatList() {
    ChatAPI.getChats().then(xhr => {
      if (xhr.status === 200) {
        let data = JSON.parse(xhr.response);
        const requestList: Promise<XMLHttpRequest>[] = [];

        data = data.map((item: ChatObj) => {
          requestList.push(ChatAPI.getNewMessagesCount(item.id));

          return {
            firstLetter: item.title.charAt(0),
            ...item
          };
        });

        Promise.all(requestList).then(resultList => {
          resultList.forEach((xhrRes: XMLHttpRequest, idx: number) => {
            data[idx].unreadCount = xhrRes.response.unread_count;
          });

          this.chats = data.slice();

          this.setProps({
            chatsList: data
          });
        });
      }
    });
  }

  initChatList() {
    this._element.append(this.inputPopup.getContent());

    this._element.addEventListener('click', event => {
      const targetElem: EventTarget | null = event.target;

      if (!targetElem || !(targetElem instanceof Element)) return;

      const chatListItem: HTMLElement | null = targetElem.closest('.chat-list__item');
      let selectedChat;

      if (chatListItem) {
        event.stopPropagation();

        let chatId: string | number = chatListItem.id;

        if (chatId === 'add-chat') {
          this.inputPopup.show();
        } else {
          chatId = parseInt(chatId, 10);

          selectedChat = chatListData.chatsList.find(item => {
            return item.id === chatId;
          });
        }
      }

      if (!selectedChat) return;

      this.chatBody.setProps({
        chatFirstLetter: selectedChat.firstLetter,
        chatName: selectedChat.title,
        slectedChat: selectedChat.id,
        messageList: selectedChat.messageList
      });
    });
  }
}

type ChatListBodyProp = {
  chatBody: ChatBody
};

class ChatListBody extends Block {
  chatList: ChatList;

  constructor(props: ChatListBodyProp) {
    super('div', ['chat-list'], props);
  }

  render(): string {
    return chatListTemplate(this.props);
  }

  mounted() {
    const chatListContainer = this._element.querySelector('#chat-list-container');
    this.chatList = new ChatList(chatListData, this.props.chatBody);

    if (chatListContainer) {
      chatListContainer.append(this.chatList.getContent());
    }

    const searchInput = this._element.querySelector('#chat-list-search');

    if (searchInput) {
      searchInput.addEventListener('input', event => {
        const targetElem: EventTarget | null = event.target;

        if (!targetElem || !(targetElem instanceof HTMLInputElement)) return;

        const searchValue = targetElem.value;

        if (searchValue) {
          const filterChatList = this.chatList.chats.filter(
            chat => chat.title.indexOf(searchValue) !== -1
          );

          this.chatList.setProps({
            chatsList: filterChatList
          });
        } else {
          this.chatList.setProps({
            chatsList: this.chatList.chats
          });
        }
      });
    }
  }
}

export class Chats extends Block {
  constructor() {
    super('div', ['chat-container']);

    const chatBody = new ChatBody(chatData);

    this._element.append(new ChatListBody({ chatBody }).getContent());
    this._element.append(chatBody.getContent());
  }
}

function isFormElement(elem: HTMLElement | null): elem is HTMLFormElement {
  if (!elem) return false;

  return (elem.tagName === 'FORM');
}
