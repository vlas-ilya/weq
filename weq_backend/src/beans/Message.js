export default class Message {
  constructor(message, sender) {
    this.type = 'message';
    this.topic = message.topic;
    this.message = message.message;
    this.sender = sender.name;
  }

  toString = () => JSON.stringify({
    type: this.type,
    topic: this.topic,
    message: this.message,
    sender: this.sender
  });
}