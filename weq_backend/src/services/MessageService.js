import Message from "../beans/Message";

export default class MessageService {
  constructor(clientService) {
    this.clientService = clientService;
    this.sendMessage = this.sendMessage.bind(this);
  }

  sendMessage(message, sender) {
    this.clientService.getClientsByTopic(message.topic)
      .map(client => client.socket.send(new Message(message, sender).toString()));
  }
}
