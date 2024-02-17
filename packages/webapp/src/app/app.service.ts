import { Injectable } from '@angular/core';
import { User, WsMessage } from '@websocket/types';
import { BehaviorSubject } from 'rxjs';
import { WebSocketSubject, webSocket } from 'rxjs/webSocket';

@Injectable()
export class AppService {
  user$ = new BehaviorSubject<User>(undefined);
  socket: WebSocketSubject<WsMessage>;

  connect(name: string) {
    this.socket = webSocket(`ws://localhost:8080?name=${name}`);
    this.socket.subscribe((message) => this.onMessageFromServer(message));
  }

  onMessageFromServer(message: WsMessage) {
    console.log('From server: ', message);
    switch (message.event) {
      case 'login':
        this.user$.next(message.user);
        break;

      default:
        break;
    }
  }
}