import request from './../libs/request';

export const ChatAPI = {
  getChats(): Promise<XMLHttpRequest> {
    return request('https://ya-praktikum.tech/api/v2/chats', {
      method: 'GET'
    });
  },
  createChat(title: string): Promise<XMLHttpRequest> {
    return request('https://ya-praktikum.tech/api/v2/chats', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json; charset=utf-8'
      },
      data: JSON.stringify({ title })
    });
  },
  deleteChat(chatId: number): Promise<XMLHttpRequest> {
    return request('https://ya-praktikum.tech/api/v2/chats', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json; charset=utf-8'
      },
      data: JSON.stringify({ chatId })
    });
  },
  getChatUsers(chatId: number): Promise<XMLHttpRequest> {
    return request(`https://ya-praktikum.tech/api/v2/chats/${chatId}/users`, {
      method: 'GET'
    });
  },
  getNewMessagesCount(chatId: number): Promise<XMLHttpRequest> {
    return request(`https://ya-praktikum.tech/api/v2/chats/new/${chatId}`, {
      method: 'GET'
    });
  },
  addUsersToChat(users: number[], chatId: number): Promise<XMLHttpRequest> {
    return request('https://ya-praktikum.tech/api/v2/chats/users', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json; charset=utf-8'
      },
      data: JSON.stringify({
        users,
        chatId
      })
    });
  },
  removeUsersFromChat(users: number[], chatId: number): Promise<XMLHttpRequest> {
    return request('https://ya-praktikum.tech/api/v2/chats/users', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json; charset=utf-8'
      },
      data: JSON.stringify({
        users,
        chatId
      })
    });
  },
  getChatsToken(chatId: number): Promise<XMLHttpRequest> {
    return request(`https://ya-praktikum.tech/api/v2/chats/token/${chatId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json; charset=utf-8'
      }
    });
  }
};
