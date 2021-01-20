import request from './../libs/request';

type SignupFields = {
  'first_name': string,
  'second_name': string,
  login: string,
  email: string,
  password: string,
  phone: string
};

type SigninFields = {
  login: string,
  password: string
};

export const AuthAPI = {
  signup(fields: SignupFields): Promise<XMLHttpRequest> {
    return request('https://ya-praktikum.tech/api/v2/auth/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json; charset=utf-8'
      },
      data: JSON.stringify(fields)
    });
  },
  signin(fields: SigninFields): Promise<XMLHttpRequest> {
    return request('https://ya-praktikum.tech/api/v2/auth/signin', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json; charset=utf-8'
      },
      data: JSON.stringify(fields)
    });
  },
  userInfo(): Promise<XMLHttpRequest> {
    return request('https://ya-praktikum.tech/api/v2/auth/user', {
      method: 'GET'
    });
  },
  logout(): Promise<XMLHttpRequest> {
    return request('https://ya-praktikum.tech/api/v2/auth/logout', {
      method: 'POST'
    });
  }
};
