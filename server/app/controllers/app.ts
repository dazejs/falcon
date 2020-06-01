import { Controller, rest, crossOrigin } from '@dazejs/framework';

@rest('/api/apps')
@crossOrigin('*')
export class App extends Controller {
  store() {

  }

  index() {
    return [{
      id: 1,
      name: 'dazejs'
    }]
  }
}