import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import { HttpParams, HttpClient } from '@angular/common/http';
import { AuthenticationService } from './authentication.service';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AppHttpService {

  constructor(
    private http: HttpClient,
    public router: Router,
    public authentication: AuthenticationService,
  ) { }

  private handleError(error: any) {
    let errMsg = (error.message) ? error.message :
      error.status ? `${error.status} - ${error.statusText}` : 'Server error';
    if (error.status === 401) {
      this.authentication.logout();
      this.router.navigate(['/login']);
    }
    return Observable.throw(errMsg);
  }

  request(url, values?: any): Observable<any> {
    const self = this;
    let params = new HttpParams();
    if (values) {
      Object.keys(values).map((o) => {
        params = params.append(o, values[o]);
      })
    }
    return self.http.get(environment.host + url, { params: params }).pipe(map((res) => {
      return res;
    }));
  }

  requestPost(url, values?: any, filesToUpload?: any[]): Observable<any> {
    const self = this;
    let formData: FormData = new FormData();
    console.log(values)
    Object.keys(values).forEach((o) => {
      formData.append(o, values[o]);
    })
    if (filesToUpload) {
      filesToUpload.forEach(file => {
        formData.append('files[]', file, file.name);
      })
    }
    return self.http.post(environment.host + url, formData);
  }

  multiPartRequest(url, values, filesToUpload?: any[]): Observable<any> {
    const self = this;
    let formData: FormData = new FormData();
    console.log(values)
    Object.keys(values).forEach((o) => {
      formData.append(o, values[o]);
    })
    if (filesToUpload) {
      filesToUpload.forEach(file => {
        formData.append('uploadFile', file, file.name);
      })
    }
    console.log(formData)
    // let headers = new Headers();
    // headers.append('Content-Type', 'multipart/form-data');
    // headers.append('Accept', 'application/json');
    // let options = new RequestOptions({ headers: headers });
    let link = environment.host + url;
    return this.http.post(link, values).pipe(map(res => res));
  }
}
