import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../_services/authentication.service';
import { SocketService } from '../_services/socket.service';
@Component({
  selector: 'app-groups',
  templateUrl: './groups.component.html',
  styleUrls: ['./groups.component.scss']
})
export class GroupsComponent implements OnInit {
  public groups = [];
  constructor(private _auth: AuthenticationService, private s: SocketService) {
  }

  ngOnInit() {
    const _this = this;
    _this.s.socket.emit("showAllGroups", _this._auth.getUserId())
    _this.s.socket.once(_this._auth.getUserId(),
      (d, data, b) => {
        _this.groups = JSON.parse(data);
      }
    )
  }

  tabChange(type: string) {
    const _this = this;
    _this.groups = [];
    _this.s.socket.emit(type, _this._auth.getUserId())
    _this.s.socket.once(_this._auth.getUserId(),
      (d, data, b) => {
        _this.groups = JSON.parse(data);
      }
    )
  }

}
