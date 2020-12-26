import { Injectable } from '@angular/core';
declare const io: any;
@Injectable({
  providedIn: 'root'
})
export class SocketService {
  public socket = io.connect("https://iblah-blah.com:4300");
  constructor() { }
}
