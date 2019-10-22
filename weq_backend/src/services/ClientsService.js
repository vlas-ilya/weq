import uuid from 'uuid/v4';
import Client from '../beans/Client';

export default class ClientsService {
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

  update(date) {
    const client = this.clients[date.id];
    client.topics = date.topics;
    client.name = date.name;
    return client;
  }

  delete(date) {
    delete this.clients[date.id];
    return date.id;
  }
}
