const BaseController = require('./BaseController');


class WebSocketController extends BaseController {
    constructor(socket, clientService, messageService) {
        super();
        this.clientService = clientService;
        this.messageService = messageService;
        this.client = clientService.create(socket);

        socket.on('message', this.onMessage);
        socket.on('close', () => clientService.delete(this.client));

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

module.exports = WebSocketController;