import WebSocket from 'ws';
import ClientService from './services/ClientsService';
import MessageService from './services/MessageService';
import WebSocketController from './controllers/WebSocketController';

const clientService = new ClientService();
const messageService = new MessageService(clientService);
const webSocketServer = new WebSocket.Server({ port: 8081 });

const getWebSocketController = (socket) => new WebSocketController(
  socket,
  clientService,
  messageService
);

webSocketServer.on('connection', getWebSocketController);
