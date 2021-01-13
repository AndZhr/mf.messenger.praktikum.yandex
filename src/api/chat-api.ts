import request from './../libs/request';

export class  ChatAPI {
   getChats() {
     return request(`https://ya-praktikum.tech/api/v2/chats`, {
       method: 'GET'
     });
   }

   createChat(title: string) {
     return request('https://ya-praktikum.tech/api/v2/chats', {
       method: 'POST',
       headers: {
         'Content-Type': 'application/json; charset=utf-8'
       },
       data: JSON.stringify({ title })
     });
   }

   deleteChat(chatId: number) {
     return request('https://ya-praktikum.tech/api/v2/chats', {
       method: 'DELETE',
       headers: {
         'Content-Type': 'application/json; charset=utf-8'
       },
       data: JSON.stringify({ chatId })
     });
   }

   getChatUsers(chatId: number) {
     return request(`https://ya-praktikum.tech/api/v2/chats/${chatId}/users`, {
       method: 'GET'
     });
   }

   getNewMessagesCount(chatId: any) {
     return request(`https://ya-praktikum.tech/api/v2/chats/new/${chatId}`, {
       method: 'GET'
     });
   }

   addUsersToChat(users: number[], chatId: number) {
     return request(`https://ya-praktikum.tech/api/v2/chats/users`, {
       method: 'PUT',
       headers: {
         'Content-Type': 'application/json; charset=utf-8'
       },
       data: JSON.stringify({
         users,
         chatId
       })
     });
   }

   removeUsersFromChat(users: number[], chatId: number) {
     return request(`https://ya-praktikum.tech/api/v2/chats/users`, {
       method: 'DELETE',
       headers: {
         'Content-Type': 'application/json; charset=utf-8'
       },
       data: JSON.stringify({
         users,
         chatId
       })
     });
   }
 }
