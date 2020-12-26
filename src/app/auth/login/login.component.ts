import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/_services/authentication.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AppHttpService } from 'src/app/_services/app-http.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  constructor(private _auth: AuthenticationService, private _http: AppHttpService) {
    this.loginForm = new FormGroup({
      'email': new FormControl('', Validators.required),
      'password': new FormControl('', Validators.required),
      'action': new FormControl('manullyLogin'),
      'tokenDevice': new FormControl('')
    });
  }

  ngOnInit() {
  }

  login() {
    if (this.loginForm.valid) {
      this._auth.login(this.loginForm.value);
    }
  }

  forgot_password() {
    this._http.request('userapi.php', { action: 'manullyLogin' }).subscribe((res) => {
      console.log(res)
    });
  }

}
