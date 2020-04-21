import { Websocket, ws } from '@dazejs/websocket-provider'

@ws.port(9797)
export class ServerWebsocket extends Websocket {
  @ws.subscribe('network-down')
  networkDown(data: any) {
    console.log(data, 11111111)
  }

  @ws.subscribe('network-up')
  networkUp(data: any) {
    console.log(data, 11111111)
  }
}