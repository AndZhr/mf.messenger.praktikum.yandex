import { expect } from 'chai';
import { Block } from './../src/libs/block';

describe('Block:', () => {
  class TestBlock extends Block {
    constructor(props: any) {
      super('div', [], props);
    }

    render() {
      return '<span>Hello, world!</span>';
    }
  }

  const block = new TestBlock({ a: 'Hello, world!' });

  describe('Метод init:', () => {
    it('Проверяем что метод определён', () => {
      expect(block.init).to.exist;
    });
  });

  describe('Метод componentDidUpdate:', () => {
    it('Проверяем что метод определён', () => {
      expect(block.componentDidUpdate).to.exist;
    });

    it('Проверяем что метод возвращает true при разных значениях', () => {
      expect(block.componentDidUpdate({ a: 1 }, { a: 2 })).to.be.true;
    });

    it('Проверяем что метод возвращает false при одинаковых значениях', () => {
      expect(block.componentDidUpdate({ a: 1 }, { a: 1 })).to.be.false;
    });
  });

  describe('Метод isEqual:', () => {
    it('Проверяем что метод определён', () => {
      expect(block.isEqual).to.exist;
    });

    it('Проверяем что метод корректно сравнивает объекты с примитивами', () => {
      expect(block.isEqual({ a: 1 }, { a: 1 })).to.be.true;

      expect(block.isEqual({ a: 1 }, { a: 2 })).to.be.false;
    });

    it('Проверяем что метод корректно сравнивает объекты с вложенными структурами', () => {
      expect(block.isEqual(
        { a: 1, b: { c: { d: [1, 2, 3, 4] } } },
        { a: 1, b: { c: { d: [1, 2, 3, 4] } } }
      )).to.be.true;

      expect(block.isEqual(
        { a: 1, b: { c: { d: [1, 2, 3, 4] } } },
        { a: 1, b: { c: { d: [1, 3, 3, 4] } } }
      )).to.be.false;
    });
  });

  describe('Метод setProps:', () => {
    it('Проверяем что метод определён', () => {
      expect(block.setProps).to.exist;
    });

    it('Проверяем что метод устанавливает props', () => {
      block.setProps({ a: 'Bye, world!' });

      expect(block.props).to.deep.equal({ a: 'Bye, world!' });
    });
  });

  describe('Метод render:', () => {
    it('Проверяем что метод определён', () => {
      expect(block.render).to.exist;
    });

    it('Проверяем что метод возвразает шаблон', () => {
      expect(block.render()).to.equal('<span>Hello, world!</span>');
    });
  });

  describe('Метод getContent:', () => {
    it('Проверяем что метод определён', () => {
      expect(block.getContent).to.exist;
    });

    it('Проверяем что метод возвращает HTML блок', () => {
      expect(block.getContent()).to.exist;
    });
  });

  describe('Метод show:', () => {
    it('Проверяем что метод определён', () => {
      expect(block.show).to.exist;
    });

    it('Проверяем что метод показывает элемент', () => {
      block.show();

      expect(block.getContent().style.display).to.equal('block');
    });
  });

  describe('Метод hide:', () => {
    it('Проверяем что метод определён', () => {
      expect(block.hide).to.exist;
    });

    it('Проверяем что метод скрывает элемент', () => {
      block.hide();

      expect(block.getContent().style.display).to.equal('none');
    });
  });
});
