class Client {
  constructor(id, socket, topics, name) {
    this.id = id;
    this.socket = socket;
    this.topics = topics;
    this.name = name;
  }
}

module.exports = Client;
