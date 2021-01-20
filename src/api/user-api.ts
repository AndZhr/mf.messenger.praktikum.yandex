import request from './../libs/request';

type UserData = {
  'first_name': string,
  'second_name': string,
  'display_name': string,
  login: string,
  email: string,
  phone: string
};

type UserPassword = {
  oldPassword: string,
  newPassword: string
};

export const UserAPI = {
  changeProfile(userData: UserData): Promise<XMLHttpRequest> {
    return request('https://ya-praktikum.tech/api/v2/user/profile', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json; charset=utf-8'
      },
      data: JSON.stringify(userData)
    });
  },
  changeProfileAvatar(avatar: File): Promise<XMLHttpRequest> {
    const formData = new FormData();
    formData.append('avatar', avatar);

    return request('https://ya-praktikum.tech/api/v2/user/profile/avatar', {
      method: 'PUT',
      data: formData
    });
  },
  changePassword(userPassword: UserPassword): Promise<XMLHttpRequest> {
    return request('https://ya-praktikum.tech/api/v2/user/password', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json; charset=utf-8'
      },
      data: JSON.stringify(userPassword)
    });
  },
  getUserById(userId: number): Promise<XMLHttpRequest> {
    return request(`https://ya-praktikum.tech/api/v2/user/${userId}`, {
      method: 'GET'
    });
  },
  searchUserByLogin(login: string): Promise<XMLHttpRequest> {
    return request('https://ya-praktikum.tech/api/v2/user/search', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json; charset=utf-8'
      },
      data: JSON.stringify({ login })
    });
  }
};
