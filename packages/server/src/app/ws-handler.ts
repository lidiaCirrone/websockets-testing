import { IncomingMessage } from 'http';
import { WebSocket, WebSocketServer, ServerOptions, RawData } from 'ws';
import { UserManager } from './user-manager';

export class WsHandler {
  private wsServer: WebSocketServer;
  private userManager: UserManager;

  initialize(options: ServerOptions) {
    this.wsServer = new WebSocketServer(options);
    this.userManager = new UserManager();

    this.wsServer.on('listening', () =>
      console.log(`Server listening on port ${options.port}`)
    );
    this.wsServer.on('connection', (socket, request) =>
      this.onSocketConnected(socket, request)
    );
  }

  onSocketConnected(socket: WebSocket, request: IncomingMessage) {
    console.log('New websocket connection!');
    this.userManager.add(socket);

    socket.on('message', (data) => this.onSocketMessage(socket, data));
    socket.on('close', (code, reason) =>
      this.onSocketClosed(socket, code, reason)
    );
  }

  onSocketMessage(socket: WebSocket, data: RawData) {
    const payload = JSON.parse(`${data}`);
    console.log('Received: ', payload);

    this.userManager.send(socket, { reply: 'Message received' });
  }

  onSocketClosed(socket: WebSocket, code: number, reason: Buffer) {
    console.log(`Client has disconnected; code=${code}, reason=${reason}`);
    this.userManager.remove(socket);
  }
}