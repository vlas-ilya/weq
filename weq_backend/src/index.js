const WebSocketServer = new require('ws');
const ClientService = require('./services/ClientsService');
const MessageService = require('./services/MessageService');
const WebSocketController = require('./controllers/WebSocketController');

const clientService = new ClientService();
const messageService = new MessageService(clientService);
const webSocketServer = new WebSocketServer.Server({ port: 8081 });

const getWebSocketController = (socket) => new WebSocketController(
  socket,
  clientService,
  messageService
);

webSocketServer.on('connection', getWebSocketController);
