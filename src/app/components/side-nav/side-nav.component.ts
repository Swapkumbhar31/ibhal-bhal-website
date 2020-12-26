import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/_services/authentication.service';
@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.scss']
})
export class SideNavComponent implements OnInit {
  public user;
  constructor(private _auth: AuthenticationService) { }

  ngOnInit() {
    this.user = this._auth.decode();
  }

  logout() {
    this._auth.logout();
  }

}
