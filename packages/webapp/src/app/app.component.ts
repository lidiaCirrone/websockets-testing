import { Component, OnInit } from '@angular/core';
import { ChatRelayMessage, User } from '@websocket/types';
import { AppService } from './app.service';

@Component({
  selector: 'websocket-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'webapp';

  messages: ChatRelayMessage[] = [];
  currentUser: User;

  constructor(private appService: AppService) {}

  ngOnInit(): void {
    this.appService.chatMessage$.subscribe(
      (msg) => (this.messages = [...this.messages, msg])
    );
    this.appService.user$.subscribe((user) => (this.currentUser = user));
  }

  connect(usernameInput: HTMLInputElement) {
    const name = usernameInput.value;
    console.log(`Connecting as ${name}`);
    this.appService.connect(name);
  }

  send(chatInput: HTMLInputElement) {
    this.appService.send(chatInput.value);
    chatInput.value = '';
  }
}
