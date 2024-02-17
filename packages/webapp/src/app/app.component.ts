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
    this.messages = [
      {
        event: 'chatRelay',
        author: { name: 'Jane', id: 1 },
        contents: 'Hi, this is Jane',
      },
      {
        event: 'chatRelay',
        author: { name: 'Henry', id: 2 },
        contents: 'Hello Jane, I am Henry',
      },
    ];

    this.appService.user$.subscribe((user) => (this.currentUser = user));
  }

  connect(usernameInput: HTMLInputElement) {
    const name = usernameInput.value;
    console.log(`Connecting as ${name}`);
    this.appService.connect(name);
  }
}
