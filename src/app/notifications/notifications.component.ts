import { Component, OnInit } from '@angular/core';
import { SocketService } from '../_services/socket.service';
import { AuthenticationService } from '../_services/authentication.service';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.scss']
})
export class NotificationsComponent implements OnInit {
  notifications = [];
  constructor(private s: SocketService, public _auth: AuthenticationService) { }

  ngOnInit() {
    this.s.socket.on(this._auth.getUserId(), (number, data) => {
      if (number === 76) {
        this.notifications = data;
      }
    });
    this.s.socket.emit("getAllNotifications", this._auth.getUserId());
  }
  clearAllNotification() {
    this.notifications = [];
    this.s.socket.emit("dltAllNotifications", this._auth.getUserId());
  }
}
