let socket = new WebSocket("ws://localhost:8081");

document.forms.sendMessage.onsubmit = function() {
    const message = {
        type: 'sendMessage',
        topic: this.topic.value,
        message: this.message.value
    }
    socket.send(JSON.stringify(message));
    return false;
};

document.forms.updateClient.onsubmit = function() {
    debugger;
    const message = {
        type: 'updateClient',
        name: this.name.value,
        topics: this.topics.value.split(',').map(item => item.trim()).filter(item => !!item),
    }
    socket.send(JSON.stringify(message));
    return false;
};

socket.onmessage = function(event) {
    const message = JSON.parse(event.data);
    showMessage(message);
};

function showMessage(message) {
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
