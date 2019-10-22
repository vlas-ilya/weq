import BaseWebSocketController from './BaseWebSocketController';

export default class WebSocketController extends BaseWebSocketController {
  constructor(socket, clientService, messageService) {
    super(socket, clientService);
    this.messageService = messageService;

    this.updateClient = this.updateClient.bind(this);
    this.sendMessage = this.sendMessage.bind(this);
  }

  updateClient(request) {
    const client = {
      id: this.client.id,
      topics: request.topics,
      name: request.name
    };

    this.client = this.clientService.update(client);
  }

  sendMessage(message) {
    this.messageService.sendMessage(message, this.client);
  }
}
