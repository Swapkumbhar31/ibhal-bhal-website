import { Injectable } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { environment } from 'src/environments/environment';
import { HttpParams, HttpClient } from '@angular/common/http';

@Injectable()
export class AuthenticationService {
  constructor(
    private http: HttpClient,
    private router: Router,
    private route: ActivatedRoute, ) { }

  isAuthenticated() {
    return localStorage.getItem('user') !== null ? true : false;
  }

  getUserId() {
    return JSON.parse(localStorage.getItem('user')).user_id;
  }

  decode() {
    return localStorage.getItem('user') !== null ? JSON.parse(localStorage.getItem('user')) : false;
  }

  login(values, cb?: Function): any {
    let params = new HttpParams();
    Object.keys(values).map((o) => {
      params = params.append(o, values[o]);
    })
    params = params.append('action', 'manullyLogin');
    this.http.get(environment.host + "userapi.php", { params: params }).subscribe(
      (response: any) => {
        if (cb) { cb(response); }
        if (response.code === 403) {
          localStorage.removeItem('user');
          this.router.navigate(['/'], { relativeTo: this.route });
          return false;
        } else {
          if (response.code === "200") {
            localStorage.setItem('user', JSON.stringify(response.user_detail));
            this.router.navigate(['/'], { relativeTo: this.route });
            return true;
          } else {
            return false;
          }
        }
      },
      (error) => {
        console.log(error);
        return false;
      }
    );
  }


  logout() {
    localStorage.removeItem('user');
    this.router.navigate(['/login'], { relativeTo: this.route })
  }
}
