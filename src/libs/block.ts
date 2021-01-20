import { EventBus } from './event-bus';

type SimpleObject = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any,
  formValid?: {[key: string]: boolean}
};

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
    props: SimpleObject
  };

  props: SimpleObject;

  eventBus: () => EventBus

  constructor(tagName = 'div', elementClasses: string[], props: SimpleObject = {}) {
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

  _registerEvents(eventBus: EventBus): void {
    eventBus.on(Block.EVENTS.INIT, this.init.bind(this));
    eventBus.on(Block.EVENTS.FLOW_CDM, this._componentDidMount.bind(this));
    eventBus.on(Block.EVENTS.FLOW_CDU, this._componentDidUpdate.bind(this));
    eventBus.on(Block.EVENTS.FLOW_RENDER, this._render.bind(this));
  }

  _createResources(): void {
    const { tagName, elementClasses } = this._meta;
    this._element = this._createDocumentElement(tagName);

    elementClasses.forEach(className => {
      this._element.classList.add(className);
    });
  }

  init(): void {
    this._createResources();
    this.eventBus().emit(Block.EVENTS.FLOW_CDM);
  }

  _componentDidMount(): void {
    this.eventBus().emit(Block.EVENTS.FLOW_RENDER);
    this.mounted();
  }

  _componentDidUpdate(oldProps: SimpleObject, newProps: SimpleObject): void {
    const response = this.componentDidUpdate(oldProps, newProps);

    if (response) {
      this._render();
      this.updated();
    }
  }

  componentDidUpdate(oldProps: SimpleObject, newProps: SimpleObject): boolean {
    return !this.isEqual(oldProps, newProps);
  }

  isEqual(a: SimpleObject, b: SimpleObject): boolean {
    if (Object.keys(a).length !== Object.keys(b).length) {
      return false;
    }

    // eslint-disable-next-line no-restricted-syntax
    for (const key of Object.keys(a)) {
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

  setProps = (nextProps: SimpleObject): void => {
    if (!nextProps) {
      return;
    }

    Object.assign(this.props, nextProps);
  };

  get element(): HTMLElement {
    return this._element;
  }

  _render(): void {
    const block = this.render();
    this._element.innerHTML = block;
  }

  render(): string {
    return '';
  }

  getContent(): HTMLElement {
    return this.element;
  }

  _makePropsProxy(props: SimpleObject): SimpleObject {
    return new Proxy(props, {
      get(target, prop: string) {
        const value = target[prop];
        return typeof value === 'function' ? value.bind(target) : value;
      },
      set: (target, prop: string, value) => {
        const originalObj = { ...target };
        // eslint-disable-next-line no-param-reassign
        target[prop] = value;

        this.eventBus().emit(Block.EVENTS.FLOW_CDU, originalObj, target);
        return true;
      },
      deleteProperty() {
        throw new Error('Нет доступа');
      }
    });
  }

  _createDocumentElement(tagName: string): HTMLElement {
    return document.createElement(tagName);
  }

  show(): void {
    this.getContent().style.display = 'block';
  }

  hide(): void {
    this.getContent().style.display = 'none';
  }

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  mounted(): void {}

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  updated(): void {}
}
