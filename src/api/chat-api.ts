import request from '@/libs/request';

export const ChatAPI = {
  getChats(): Promise<XMLHttpRequest> {
    return request('https://ya-praktikum.tech/api/v2/chats');
  },
  createChat(title: string): Promise<XMLHttpRequest> {
    return request('https://ya-praktikum.tech/api/v2/chats', {
      method: 'POST',
      data: JSON.stringify({ title })
    });
  },
  deleteChat(chatId: number): Promise<XMLHttpRequest> {
    return request('https://ya-praktikum.tech/api/v2/chats', {
      method: 'DELETE',
      data: JSON.stringify({ chatId })
    });
  },
  getChatUsers(chatId: number): Promise<XMLHttpRequest> {
    return request(`https://ya-praktikum.tech/api/v2/chats/${chatId}/users`);
  },
  getNewMessagesCount(chatId: number): Promise<XMLHttpRequest> {
    return request(`https://ya-praktikum.tech/api/v2/chats/new/${chatId}`);
  },
  addUsersToChat(users: number[], chatId: number): Promise<XMLHttpRequest> {
    return request('https://ya-praktikum.tech/api/v2/chats/users', {
      method: 'PUT',
      data: JSON.stringify({
        users,
        chatId
      })
    });
  },
  removeUsersFromChat(users: number[], chatId: number): Promise<XMLHttpRequest> {
    return request('https://ya-praktikum.tech/api/v2/chats/users', {
      method: 'DELETE',
      data: JSON.stringify({
        users,
        chatId
      })
    });
  },
  getChatsToken(chatId: number): Promise<XMLHttpRequest> {
    return request(`https://ya-praktikum.tech/api/v2/chats/token/${chatId}`, {
      method: 'POST'
    });
  }
};
