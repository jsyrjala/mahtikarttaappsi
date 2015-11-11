import WebSocketService from 'service/WebSocketService'
export default function startup(store) {
  console.info('Startup')
  const ws = new WebSocketService(store.dispatch, 'ws://localhost:3100/ws')
  ws.startWebSocket()
}