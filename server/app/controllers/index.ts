import { Controller, route, http } from '@dazejs/framework';

@route()
export class Hello extends Controller {
  @http.get()
  index() {
    return this.render('index.html');
  }
}