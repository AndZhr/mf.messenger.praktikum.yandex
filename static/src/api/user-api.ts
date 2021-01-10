import request from './../libs/request.js';

export class  UserAPI {
   changeProfile(userData: any) {
     return request('https://ya-praktikum.tech/api/v2/user/profile', {
       method: 'PUT',
       headers: {
         'Content-Type': 'application/json; charset=utf-8'
       },
       data: JSON.stringify(userData)
     });
   }

   changeProfileAvatar(avatar: File) {
     let formData = new FormData();
     formData.append('avatar', avatar)

     return request('https://ya-praktikum.tech/api/v2/user/profile/avatar', {
       method: 'PUT',
       data: formData
     });
   }

   changePassword(userPassword: any) {
     return request('https://ya-praktikum.tech/api/v2/user/password', {
       method: 'PUT',
       headers: {
         'Content-Type': 'application/json; charset=utf-8'
       },
       data: JSON.stringify(userPassword)
     });
   }

   getUserById(userId: any) {
     return request(`https://ya-praktikum.tech/api/v2/user/${userId}`, {
       method: 'GET'
     });
   }

   searchUserByLogin(login: string) {
     return request('https://ya-praktikum.tech/api/v2/user/search', {
       method: 'POST',
       headers: {
         'Content-Type': 'application/json; charset=utf-8'
       },
       data: JSON.stringify({ login })
     });
   }
 }
