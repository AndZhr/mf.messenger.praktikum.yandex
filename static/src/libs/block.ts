import { EventBus } from './event-bus.js';

interface SimpleObject {
    [key: string]: any
}

export class Block {
  static EVENTS = {
    INIT: 'init',
    FLOW_CDM: 'flow:component-did-mount',
    FLOW_CDU: 'flow:component-did-update',
    FLOW_RENDER: 'flow:render'
  };

  _element: HTMLElement;
  _meta: {
    tagName: string,
    elementClasses: string[],
    props: object
  };
  props: object;
  eventBus: () => EventBus

  constructor(tagName: string = 'div', elementClasses: string[], props: object = {}) {
    const eventBus = new EventBus();
    this._meta = {
      tagName,
      elementClasses,
      props
    };

    this.props = this._makePropsProxy(props);

    this.eventBus = () => eventBus;

    this._registerEvents(eventBus);
    eventBus.emit(Block.EVENTS.INIT);
  }

  _registerEvents(eventBus: EventBus) {
    eventBus.on(Block.EVENTS.INIT, this.init.bind(this));
    eventBus.on(Block.EVENTS.FLOW_CDM, this._componentDidMount.bind(this));
    eventBus.on(Block.EVENTS.FLOW_CDU, this._componentDidUpdate.bind(this));
    eventBus.on(Block.EVENTS.FLOW_RENDER, this._render.bind(this));
  }

  _createResources() {
    const { tagName, elementClasses } = this._meta;
    this._element = this._createDocumentElement(tagName);

    for (let className of elementClasses) {
      this._element.classList.add(className);
    }
  }

  init() {
    this._createResources();
    this.eventBus().emit(Block.EVENTS.FLOW_CDM);
  }

  _componentDidMount() {
    this.componentDidMount();
    this.eventBus().emit(Block.EVENTS.FLOW_RENDER);
    this.mounted();
  }

  componentDidMount() {}

  _componentDidUpdate(oldProps: any, newProps: any) {
    const response = this.componentDidUpdate(oldProps, newProps);

    if (!response) {
      return;
    }

    this._render();
    this.updated();
  }

  componentDidUpdate(oldProps: any, newProps: any) {
    return !this.isEqual(oldProps, newProps);
  }

  isEqual(a: SimpleObject, b: SimpleObject): boolean {
    for (let key of Object.keys(a)) {
      if ((a[key] && typeof a[key] === 'object') && (b[key] && typeof b[key] === 'object')) {
        if (!this.isEqual(a[key], b[key])) {
          return false;
        }
      } else if (a[key] !== b[key]) {
        return false;
      }

    }

    return true;
  }

  setProps = (nextProps: any) => {
    if (!nextProps) {
      return;
    }

    Object.assign(this.props, nextProps);
  };

  get element() {
    return this._element;
  }

  _render() {
    const block = this.render();
    this._element.innerHTML = block;
  }

  render(): string {
    return '';
  }

  getContent() {
    return this.element;
  }

  _makePropsProxy(props: any) {
    return new Proxy(props, {
      get(target, prop) {
        const value = target[prop];
        return typeof value === "function" ? value.bind(target) : value;
      },
      set: (target, prop, value) => {
        let originalObj = {...target};
        target[prop] = value;

        this.eventBus().emit(Block.EVENTS.FLOW_CDU, originalObj, target);
        return true;
      },
      deleteProperty() {
        throw new Error('Нет доступа');
      }
    });
  }

  _createDocumentElement(tagName: string) {
    // Можно сделать метод, который через фрагменты в цикле создает сразу несколько блоков
    return document.createElement(tagName);
  }

  show() {
    this.getContent().style.display = 'block';
  }

  hide() {
    this.getContent().style.display = 'none';
  }

  mounted() {}

  updated() {}
}
