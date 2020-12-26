import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../_services/authentication.service';
import { SocketService } from '../_services/socket.service';

@Component({
  selector: 'app-marketspace',
  templateUrl: './marketspace.component.html',
  styleUrls: ['./marketspace.component.scss']
})
export class MarketspaceComponent implements OnInit {
  public listing = [];
  constructor(private s: SocketService, private _auth: AuthenticationService) {

  }

  ngOnInit() {
    this.s.socket.emit("showAllLists", (this._auth.getUserId()))
    this.s.socket.once(this._auth.getUserId(),
      (d, data, b) => {
        this.listing = JSON.parse(data);
      }
    )
  }

  tabChange(type: string) {
    this.listing = [];
    this.s.socket.emit(type, (this._auth.getUserId()))
  }


}
