import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/_services/authentication.service';
import { SocketService } from 'src/app/_services/socket.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  msgCount = "0";
  notificationCount = "0";
  notifications = [];
  items: string[] = [
    'Message will be here',
    'Message will be here',
    'Message will be here',
    'Message will be here',
  ];
  constructor(private s: SocketService, public _auth: AuthenticationService) { }

  ngOnInit() {
    this.s.socket.on(this._auth.getUserId(), (number, data) => {
      if (number === 76) {
        this.notifications = data;
        console.log(data)
      }
    });
    this.s.socket.on(this._auth.getUserId(), (number, data1, data2) => {
      if (number === 79) {
        this.notificationCount = data1[0].count + "";
        this.msgCount = data2[0].msgCount + "";
      }
    });
    setTimeout(() => {
      this.s.socket.emit("getAllNotificationsCount", this._auth.getUserId());
    }, 3000)
  }

  getNotifications(isOpen) {
    if (isOpen) {
      this.s.socket.emit("getAllNotifications", this._auth.getUserId());
    } else {
      this.notifications = [];
    }
  }

}
