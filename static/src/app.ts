import { Router } from './libs/router.js';
import { Store } from './libs/store.js'

import { Login } from './pages/login.js';
import { Register } from './pages/register.js';
import { Chats } from './pages/chat.js';
import { Profile } from './pages/profile.js';
import { Error404 } from './pages/error-404.js';
import { Error500 } from './pages/error-500.js';

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

export const store = new Store();

const appElement: HTMLElement | null = document.querySelector('#app');

if (appElement) {
  appElement.addEventListener('click', event => {
    if (event.target && event.target.dataset.link) {
      event.preventDefault();

      router.go(event.target.dataset.link);
    }
  });
}
