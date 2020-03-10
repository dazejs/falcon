import { Controller, route, http } from '@dazejs/framework';

@route('/apps')
export class App extends Controller {
  /**
   * 创建应用
   */
  @http.post()
  store() {

  }
}