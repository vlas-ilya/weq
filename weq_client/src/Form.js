export default class Form {
  constructor(socket, connectForm, sendMessageForm, updateClientForm) {
    this.socket = socket;
    this.sendMessageButtonSubmit = this.sendMessageButtonSubmit.bind(this);
    this.updateClientButtonSubmit = this.updateClientButtonSubmit.bind(this);
    this.loadInfo = this.loadInfo.bind(this);
    this.connectForm = connectForm;
    this.sendMessageForm = sendMessageForm;
    this.updateClientForm = updateClientForm;

    this.sendMessageForm.onsubmit = this.sendMessageButtonSubmit;
    this.updateClientForm.onsubmit = this.updateClientButtonSubmit;

    socket.onmessage = Form.onMessage;
  }

  loadInfo() {
    this.socket.send(this.connectForm.id.value);
  }

  sendMessageButtonSubmit() {
    const message = {
      type: 'sendMessage',
      topic: this.sendMessageForm.topic.value,
      message: this.sendMessageForm.message.value
    };
    this.socket.send(JSON.stringify(message));
    return false;
  };

  updateClientButtonSubmit() {
    const message = {
      type: 'updateClient',
      name: this.updateClientForm.name.value,
      topics: this.updateClientForm.topics.value
        .split(',')
        .map(item => item.trim())
        .filter(item => !!item),
    };
    this.socket.send(JSON.stringify(message));
    return false;
  }

  static onMessage(event) {
    const message = JSON.parse(event.data);
    if (message.type === 'message') {
      Form.showMessage(message);
    }
  };

  static showMessage(message) {
    const template = `
      <div class="message">
        <div>Topic: ${message.topic}</div>
        <div>Message: ${message.message}</div>
        <div>Sender: ${message.sender}</div>
      </div>
    `;
    const messageElem = document.createElement('div');
    messageElem.innerHTML = template;
    document.getElementById('messages').appendChild(messageElem);
  }
}