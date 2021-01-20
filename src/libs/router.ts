/* eslint-disable @typescript-eslint/no-explicit-any */
class Route {
  private _pathname: string;

  private _blockClass: any;

  private _block: any;

  private _props: any;

  constructor(pathname: string, view: any, props: SimpleObject) {
    this._pathname = pathname;
    this._blockClass = view;
    this._block = null;
    this._props = props;
  }

  navigate(pathname: string) {
    if (this.match(pathname)) {
      this._pathname = pathname;
      this.render();
    }
  }

  leave() {
    const root = document.querySelector(this._props.rootQuery);

    if (root) {
      root.innerHTML = '';
    }
  }

  match(pathname: string) {
    return isEqual(pathname, this._pathname);
  }

  render() {
    if (!this._block) {
      this._block = new this._blockClass();
    }

    this._render(this._props.rootQuery, this._block);
  }

  _render(query: string, block: any) {
    const root = document.querySelector(query);

    if (root) {
      root.append(block.getContent());
    }

    return root;
  }
}

type Redirect = {
  fromPathname: string,
  toPathname: string
};

export class Router {
  static instance: Router | undefined;

  private _rootQuery: string;

  private _currentRoute: Route | null;

  history: History;

  routes: Route[];

  redirects: Redirect[];

  constructor(rootQuery: string) {
    if (Router.instance) {
      return Router.instance;
    }

    this.routes = [];
    this.redirects = [];
    this.history = window.history;
    this._currentRoute = null;
    this._rootQuery = rootQuery;

    Router.instance = this;
  }

  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  use(pathname: string, block: any): this {
    const route = new Route(pathname, block, {
      rootQuery: this._rootQuery
    });

    this.routes.push(route);

    return this;
  }

  redirect(fromPathname: string, toPathname: string): this {
    this.redirects.push({
      fromPathname,
      toPathname
    });

    return this;
  }

  start(): void {
    window.onpopstate = (event: PopStateEvent) => {
      const target: any = event.target;

      if (target && target.location) {
        this._onRoute(target.location.pathname);
      }
    };

    this._onRoute(window.location.pathname);
  }

  _onRoute(pathname: string): void {
    const route = this.getRoute(pathname);

    if (!route) {
      const redirect = this.getRedirect(pathname);

      if (redirect) {
        this.go(redirect.toPathname);
      }
    } else {
      if (this._currentRoute) {
        this._currentRoute.leave();
      }

      this._currentRoute = route;
      route.render();
    }
  }

  go(pathname: string): void {
    if (this.beforeGo(window.location.pathname, pathname)) {
      this.history.pushState({}, '', pathname);
      this._onRoute(pathname);
    }
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  beforeGo(_from: string, _to: string): boolean {
    return true;
  }

  back(): void {
    window.history.back();
  }

  forward(): void {
    window.history.forward();
  }

  getRoute(pathname: string): Route | undefined {
    return this.routes.find(route => route.match(pathname));
  }

  getRedirect(pathname: string): Redirect | undefined {
    return this.redirects.find(redirect => {
      return (redirect.fromPathname === pathname
        || redirect.fromPathname === '*');
    });
  }
}

function isEqual(lhs: string, rhs: string) {
  return lhs === rhs;
}
