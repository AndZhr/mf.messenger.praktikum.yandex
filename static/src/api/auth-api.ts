import request from './../libs/request.js';

export class AuthAPI {
   signup(fields: any): Promise<XMLHttpRequest> {
     return request('https://ya-praktikum.tech/api/v2/auth/signup', {
       method: 'POST',
       headers: {
         'Content-Type': 'application/json; charset=utf-8'
       },
       data: JSON.stringify(fields)
     });
   }

   signin(fields: any): Promise<XMLHttpRequest> {
     return request('https://ya-praktikum.tech/api/v2/auth/signin', {
       method: 'POST',
       headers: {
         'Content-Type': 'application/json; charset=utf-8'
       },
       data: JSON.stringify(fields)
     });
   }

   userInfo(): Promise<XMLHttpRequest> {
     return request('https://ya-praktikum.tech/api/v2/auth/user', {
       method: 'GET'
     });
   }

   logout(): Promise<XMLHttpRequest> {
     return request('https://ya-praktikum.tech/api/v2/auth/logout', {
       method: 'POST'
     });
   }
 }
