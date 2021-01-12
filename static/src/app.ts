import { Router } from './libs/router';
import { AuthAPI } from './api/auth-api'

import { Login } from './pages/login';
import { Register } from './pages/register';
import { Chats } from './pages/chat';
import { Profile } from './pages/profile';
import { Error404 } from './pages/error-404';
import { Error500 } from './pages/error-500';

export const router = new Router('#app');

router
  .use('/', Chats)
  .use('/register', Register)
  .use('/login', Login)
  .use('/profile', Profile)
  .use('/500', Error500)
  .use('/404', Error404)
  .redirect('*', '/404')
  .start();

class App {
  store: { isLogin: boolean; };

  constructor() {
    this.store = {
      isLogin: false
    }

    new AuthAPI().userInfo().then(xhr => {
      this.store.isLogin = (xhr.status === 200);

      let currentLocation = window.location.pathname;

      if (this.store.isLogin) {
        if ((currentLocation === '/login') || (currentLocation === '/register')) {
          router.go('/')
        }
      } else {
        if ((currentLocation !== '/login') && (currentLocation !== '/register')) {
          router.go('/login')
        }
      }
    });
  }
}

export const app = new App();

router.beforeGo = (from, to): boolean => {
  if (app.store.isLogin) {
    if ((to !== '/login') && (to !== '/register')) {
      return true;
    } else {
      return false;
    }

  } else {
    if ((to === '/login') || (to === '/register')) {
      return true;
    } else {
      return false;
    }

  }
}

const appElement: HTMLElement | null = document.querySelector('#app');

if (appElement) {
  appElement.addEventListener('click', event => {
    if (event.target && event.target.dataset.link) {
      event.preventDefault();

      router.go(event.target.dataset.link);
    }
  });
}
