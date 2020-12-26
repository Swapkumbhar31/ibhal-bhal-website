import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../_services/authentication.service';
import { SocketService } from '../_services/socket.service';

@Component({
  selector: 'app-blogs',
  templateUrl: './blogs.component.html',
  styleUrls: ['./blogs.component.scss']
})
export class BlogsComponent implements OnInit {
  public blogs = [];
  constructor(private s: SocketService, private _auth: AuthenticationService) {

  }

  ngOnInit() {
    this.s.socket.emit("showAllBlogs", this._auth.getUserId(), 1)
    this.s.socket.once(this._auth.getUserId(),
      (d, data, b) => {
        this.blogs = JSON.parse(data);
      }
    )
  }

  tabChange(type: string) {
    this.blogs = [];
    this.s.socket.emit(type, (this._auth.getUserId()))
  }

}
