import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../_services/authentication.service';
import { SocketService } from '../_services/socket.service';

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styleUrls: ['./pages.component.scss']
})
export class PagesComponent implements OnInit {
  public pages = [];
  constructor(private s: SocketService, private _auth: AuthenticationService) {

  }

  ngOnInit() {
    this.s.socket.emit("showAllPages", (this._auth.getUserId()))
    this.s.socket.once(this._auth.getUserId(),
      (d, data, b) => {
        this.pages = JSON.parse(data);
      }
    )
  }

  tabChange(type: string) {
    this.pages = [];
    this.s.socket.emit(type, (this._auth.getUserId()))
  }


}
