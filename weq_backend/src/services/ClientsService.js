const uuid = require('uuid/v4');
const Client = require('../beans/Client');


class ClientsService {
    constructor() {
        this.clients = { };

        this.getClientsByTopic = this.getClientsByTopic.bind(this);
        this.create = this.create.bind(this);
        this.update = this.update.bind(this);
        this.delete = this.delete.bind(this);
    }

    getClientsByTopic(topic) {
        return Object.values(this.clients)
            .filter(client => client.topics && client.topics.length > 0)
            .filter(client => client.topics.includes(topic));
    }
    
    create(socket) {
        const id = uuid();
        const client = new Client(id, socket, null);
        this.clients[id] = client;
        return client;
    }

    update(client) {
        const persisted = this.clients[client.id];
        persisted.topics = client.topics;
        persisted.name = client.name;
        return persisted;
    }

    delete(client) {
        delete this.clients[client.id];
        return client.id;
    }
}


module.exports = ClientsService;