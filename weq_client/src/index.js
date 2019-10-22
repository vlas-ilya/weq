import Form from './Form'

document.forms.connect.onsubmit = function() {
  const socket = new WebSocket("ws://localhost:8081");

  new Form(
    socket,
    document.forms.connect,
    document.forms.sendMessage,
    document.forms.updateClient
  );

  return false;
};

