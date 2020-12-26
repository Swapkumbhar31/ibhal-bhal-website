import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../_services/authentication.service';
import { SocketService } from '../_services/socket.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-page-details',
  templateUrl: './page-details.component.html',
  styleUrls: ['./page-details.component.scss']
})
export class PageDetailsComponent implements OnInit {
  pageInformation: any;
  pageAdmins: any[];
  pageMembers: any[];
  pageImages: any[];
  pageId: string;
  constructor(private _auth: AuthenticationService, private s: SocketService, private route: ActivatedRoute) { }

  ngOnInit() {
    const self = this;
    self.route.paramMap.subscribe(params => {
      self.pageId = params.get("id")
      self.s.socket.emit("showPageDetail", self._auth.getUserId(), this.pageId)
      self.s.socket.once(self._auth.getUserId(),
        (d, data, members) => {
          self.pageInformation = JSON.parse(data)[0];
          self.pageMembers = JSON.parse(members);
          self.pageAdmins = self.pageMembers.filter(o => o.is_admin)
          console.log(self.pageInformation)
          console.log(self.pageMembers)
        }
      )
    })
  }

  getMembersCount() {
    if (this.pageMembers)
      return this.pageMembers.length;
  }
  getAdminsCount() {
    if (this.pageAdmins)
      return this.pageAdmins.length;
  }

  pageAction() {
    const self = this;
    if (self.pageInformation.isAdded) {
      // leave group
      self.s.socket.emit("removeFromPage", self._auth.getUserId(), this.pageId)
      self.s.socket.once(self._auth.getUserId(),
        (number, msg) => {
          self.pageInformation.isAdded = 0;
          self.s.socket.emit("showPageDetail", self._auth.getUserId(), this.pageId)
          self.s.socket.once(self._auth.getUserId(),
            (d, data, members) => {
              self.pageMembers = JSON.parse(members);
              self.pageAdmins = self.pageMembers.filter(o => o.is_admin)
            }
          )
        }
      )
    } else {
      // join group
      self.s.socket.emit("addToPage", self._auth.getUserId(), this.pageId)
      self.s.socket.once(self._auth.getUserId(),
        (number, msg) => {
          self.pageInformation.isAdded = 1;
          self.s.socket.emit("showPageDetail", self._auth.getUserId(), this.pageId)
          self.s.socket.once(self._auth.getUserId(),
            (d, data, members) => {
              self.pageMembers = JSON.parse(members);
              self.pageAdmins = self.pageMembers.filter(o => o.is_admin)
            }
          )
        }
      )
    }

  }


  getAllPageImages() {
    const self = this;
    self.s.socket.emit("showAllPageImages", self._auth.getUserId(), this.pageId)
    self.s.socket.once(self._auth.getUserId(),
      (number, data) => {
        self.pageImages = JSON.parse(data);
        console.log(self.pageImages)
      }
    )
  }
}
