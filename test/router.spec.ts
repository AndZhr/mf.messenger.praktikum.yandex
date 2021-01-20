import { expect } from 'chai';
import { Router } from './../src/libs/router';
import { Block } from './../src/libs/block';

const router = new Router('body');

describe('Router:', () => {
  it('Проверяем что new Router() возвращает уже созданный экзэмпляр', () => {
    expect(new Router('body')).to.equal(router);
  });

  describe('Router.use:', () => {

    it('Проверяем что метод определён', () => {
      expect(router.use).to.exist;
    });

    it('Проверяем что метод добавляет новый route', () => {
      expect(router.routes).to.be.empty;

      router.use('/chats', Block);

      expect(router.routes).to.be.not.empty;
    });

    it('Проверяем что вызов возвращает router', () => {
      expect(router.use('/', Block)).to.equal(router);
    });
  });

  describe('Router.redirect:', () => {
    it('Проверяем что метод определён', () => {
      expect(router.redirect).to.exist;
    });

    it('Проверяем что метод добавляет новый redirect', () => {
      expect(router.redirects).to.be.empty;

      router.redirect('*', '/404')

      expect(router.redirects).to.be.not.empty;
    });

    it('Проверяем что вызов возвращает router', () => {
      expect(router.redirect('*', '/404')).to.equal(router);
    });
  });

  describe('Router.start:', () => {
    it('Проверяем что метод определён', () => {
      expect(router.start).to.exist;
    });
  });

  describe('Router.beforeGo:', () => {
    it('Проверяем что метод определён', () => {
      expect(router.beforeGo).to.exist;
    });
  });

  describe('Router.back:', () => {
    it('Проверяем что метод определён', () => {
      expect(router.back).to.exist;
    });
  });

  describe('Router.forward:', () => {
    it('Проверяем что метод определён', () => {
      expect(router.forward).to.exist;
    });
  });


  describe('Router.getRoute:', () => {
    it('Проверяем что метод определён', () => {
      expect(router.getRoute).to.exist;
    });

    it('Проверяем что метод возвращает route', () => {
      let route = router.getRoute('/chats');

      expect(route).to.exist;
      expect(route._pathname).to.equal('/chats');
    });
  });

  describe('Router.getRedirect:', () => {
    it('Проверяем что метод определён', () => {
      expect(router.getRedirect).to.exist;
    });

    it('Проверяем что метод возвращает redirect /404', () => {
      let redirect = router.getRedirect('/not-exist');

      expect(redirect).to.exist;
      expect(redirect.toPathname).to.equal('/404');
    });
  });
});
