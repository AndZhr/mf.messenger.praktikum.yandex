import { expect } from 'chai';
import request from './../src/libs/request';

describe('Request', () => {
  it('Проверяем что метод определён', () => {
    expect(request).to.exist;
  });

  it('Проверяем что метод возвращает Promise', () => {
    expect(request('/')).to.be.an.instanceof(Promise);
  });
});
