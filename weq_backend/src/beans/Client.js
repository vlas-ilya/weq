class Client {
    constructor(id, socket, info) {
        this.id = id;
        this.socket = socket;
        this.info = info;
    }

    send(message) {
        this.socket.send(message);
    }
}

module.exports = Client;

