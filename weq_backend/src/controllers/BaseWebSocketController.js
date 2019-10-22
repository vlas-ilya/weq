import { emptyFunction } from '../utils/function.utils'

export default class BaseWebSocketController {
  constructor(socket, clientService) {
    this.clientService = clientService;
    this.client = clientService.create(socket);

    socket.on('message', this.onMessage);
    socket.on('close', () => clientService.delete(this.client));

    this.onMessage = this.onMessage.bind(this);
    this.searchMethod = this.searchMethod.bind(this);
  }

  onMessage(message) {
    try {
      message = JSON.parse(message);
      const method = this.searchMethod(message.type);
      return method(message);
    } catch (e) {
      console.log(e);
    }
  }

  searchMethod(type) {
    if (!type) {
      return emptyFunction;
    }

    const method = this[type];

    if (typeof method !== 'function') {
      return emptyFunction;
    }

    return method;
  }
}
