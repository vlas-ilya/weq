class MessageService {
    constructor(clientService) {
        this.clientService = clientService;

        this.sendMessage = this.sendMessage.bind(this);
    }

    sendMessage(message, sender) {
        this.clientService.getClientsByTopic(message.topic)
            .map(client => client.socket.send(this._createMessage(message, sender)));
    }

    _createMessage(message, sender) {
        return JSON.stringify({
            topic: message.topic,
            message: message.message,
            sender: sender.name
        });
    }
}

module.exports = MessageService;