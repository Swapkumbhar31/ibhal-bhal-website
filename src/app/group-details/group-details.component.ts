import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../_services/authentication.service';
import { SocketService } from '../_services/socket.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-group-details',
  templateUrl: './group-details.component.html',
  styleUrls: ['./group-details.component.scss']
})
export class GroupDetailsComponent implements OnInit {
  groupInformation: any;
  groupId: string;
  groupMembers: any[];
  groupAdmins: any[];
  constructor(private _auth: AuthenticationService, private s: SocketService, private route: ActivatedRoute) { }

  ngOnInit() {
    const self = this;
    self.route.paramMap.subscribe(params => {
      self.groupId = params.get("id")
      self.s.socket.emit("showGroupDetail", self._auth.getUserId(), this.groupId)
      self.s.socket.once(self._auth.getUserId(),
        (d, data, members) => {
          self.groupInformation = JSON.parse(data)[0];
          self.groupMembers = JSON.parse(members);
          self.groupAdmins = self.groupMembers.filter(o => o.is_admin)
          console.log(self.groupInformation)
          console.log(self.groupMembers)
        }
      )
    })
  }

  getMembersCount() {
    if (this.groupMembers)
      return this.groupMembers.length;
  }
  getAdminsCount() {
    if (this.groupAdmins)
      return this.groupAdmins.length;
  }

  groupAction() {
    const self = this;
    if (self.groupInformation.isAdded) {
      // leave group
      self.s.socket.emit("removeFromGroup", self._auth.getUserId(), this.groupId)
      self.s.socket.once(self._auth.getUserId(),
        (number, msg) => {
          self.groupInformation.isAdded = 0;
          self.s.socket.emit("showGroupDetail", self._auth.getUserId(), this.groupId)
          self.s.socket.once(self._auth.getUserId(),
            (d, data, members) => {
              self.groupMembers = JSON.parse(members);
              self.groupAdmins = self.groupMembers.filter(o => o.is_admin)
            }
          )
        }
      )
    } else {
      // join group
      self.s.socket.emit("addToGroup", self._auth.getUserId(), this.groupId)
      self.s.socket.once(self._auth.getUserId(),
        (number, msg) => {
          self.groupInformation.isAdded = 1;
          self.s.socket.emit("showGroupDetail", self._auth.getUserId(), this.groupId)
          self.s.socket.once(self._auth.getUserId(),
            (d, data, members) => {
              self.groupMembers = JSON.parse(members);
              self.groupAdmins = self.groupMembers.filter(o => o.is_admin)
            }
          )
        }
      )
    }

  }

}
