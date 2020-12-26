import { Component, OnInit, TemplateRef } from '@angular/core';
import { AuthenticationService } from '../_services/authentication.service';
import { SocketService } from '../_services/socket.service';
import { AppHttpService } from '../_services/app-http.service';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
declare const $: any;
@Component({
  selector: 'app-news-feed',
  templateUrl: './news-feed.component.html',
  styleUrls: ['./news-feed.component.scss']
})
export class NewsFeedComponent implements OnInit {
  public posts = [];
  postingType = "";
  postDecription = "";
  private page_number = 0;
  private loading = true;
  posttype = "0";
  public taggedFriends = '';
  public taggedFriendsName = '';
  public linkText = '';
  friendList = [];
  fileThumbs = [];
  taggedFriendList = [];
  modalRef: BsModalRef;
  location = {
    lat: 0,
    lon: 0
  }
  fileToUpload: File[] = [];
  constructor(private s: SocketService, private modalService: BsModalService, private _auth: AuthenticationService, private _http: AppHttpService) { }
  getLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((data: any) => {
        this.location.lat = data.coords.latitude;
        this.location.lon = data.coords.longitude;
        console.log(this.location)
      });
    } else {
      console.log("Geolocation is not supported by this browser.");
    }
  }
  ngOnInit() {
    this.getLocation();
    this.s.socket.emit("getAllPost", this._auth.getUserId(), "", this.page_number)
    this.s.socket.once(this._auth.getUserId(),
      (d, data, b) => {
        this.loading = false;
        this.page_number = this.page_number + 1;
        this.posts = [...this.posts, ...JSON.parse(data)];
        console.log(JSON.parse(data))
      }
    )
  }

  closePosting() {
    this.postingType = null;
  }

  tagFriend(event, friend) {
    if (event.target.checked) {
      this.taggedFriendList.push(friend);
    } else {
      this.taggedFriendList.splice(this.taggedFriendList.findIndex(o => o.user_id === friend.user_id), 1)
    }
    this.getTaggedFriendName();
  }

  getTaggedFriendName() {
    this.taggedFriendsName = '';
    this.taggedFriendList.forEach(o => {
      this.taggedFriendsName = this.taggedFriendsName + o.name + ',';
    });
    this.taggedFriendsName = this.taggedFriendsName.substr(0, this.taggedFriendsName.length - 1);
  }

  getTaggedFriendId() {
    let ids = '';
    this.taggedFriendList.forEach(o => {
      ids = ids + o.user_id + ',';
    });
    return ids.substr(0, ids.length - 1);
  }

  isTagged(friend) {
    return this.taggedFriendList.filter(o => o.user_id === friend.user_id).length > 0;
  }

  openModal(template: TemplateRef<any>, cb?: Function) {
    this.modalRef = this.modalService.show(template, { animated: false });
    if (cb) cb();
  }

  toggleLinkPost() {
    if (this.postingType === 'link') {
      this.postingType = 'text';
    } else {
      this.postingType = 'link';
    }
  }

  handleFileInput(files: FileList) {
    this.fileToUpload = [];
    this.fileThumbs = [];
    for (let i = 0; i < files.length; i++) {
      this.fileToUpload.push(files.item(i))
      let reader = new FileReader();
      reader.onloadend = () => {
        this.fileThumbs.push(reader.result);
      }
      reader.readAsDataURL(files.item(i));
    }
    console.log(this.fileToUpload);
  }

  loadFriends() {
    this.s.socket.emit("showAllMyFriends", this._auth.getUserId(), 0, "")
    this.s.socket.on(this._auth.getUserId(),
      (d, data) => {
        if (d === 14) {
          this.friendList = JSON.parse(data);
        }
      }
    )
  }

  openSelectFile() {
    $('#fileUploadBtn').click();
  }

  postText() {
    window.scrollTo(0, 0);
    this.postingType = 'text';
  }
  postLocation() {
    window.scrollTo(0, 0);
    this.postingType = 'location';
  }
  postImage() {
    window.scrollTo(0, 0);
    this.postingType = 'image';
  }

  handleScroll(event) {
    if (event.isReachingBottom) {
      if (!this.loading) {
        this.loading = true;
        this.s.socket.emit("getAllPost", this._auth.getUserId(), "", this.page_number)
        this.s.socket.once(this._auth.getUserId(),
          (d, data, b) => {
            this.loading = false;
            this.page_number = this.page_number + 1;
            this.posts = [...this.posts, ...JSON.parse(data)];
            console.log(JSON.parse(data))
          }
        )
      }
    }
  }

  shareTextPost() {
    if (this.postingType === 'link') {
      if (this.linkText)
        this.shareLinkPost();
      return;
    }
    const values = {
      action: "addNewPost",
      user_id: this._auth.getUserId(),
      title: '',
      discription: this.postDecription,
      posttype: this.posttype,
      lat: '',
      lon: '',
      type: 0,
      location: '',
      country: '',
      link: '',
      tagFriends: this.getTaggedFriendId(),
    }
    this._http.requestPost("postapi.php", values, this.fileToUpload).subscribe((res) => {
      console.log(res);
    });
  }

  shareLinkPost() {
    const values = {
      action: "addNewPost",
      user_id: this._auth.getUserId(),
      title: '',
      discription: this.postDecription,
      posttype: this.posttype,
      lat: '',
      lon: '',
      type: 3,
      location: '',
      country: '',
      link: this.linkText,
      tagFriends: '',
    }
    this._http.requestPost("postapi.php", values, this.fileToUpload).subscribe((res) => {
      console.log(res);
    });
  }

  shareLocationPost() {
    const values = {
      action: "addNewPost",
      user_id: this._auth.getUserId(),
      title: '',
      discription: '',
      posttype: this.posttype,
      lat: this.location.lat,
      lon: this.location.lon,
      type: 2,
      location: '',
      country: '',
      link: '',
      tagFriends: '',
    }
    this._http.requestPost("postapi.php", values, this.fileToUpload).subscribe((res) => {
      console.log(res);
      this.getLocation();
    });
  }

  postDeleted(event) {
    this.posts.splice(this.posts.findIndex(o => o.post_id === event.postId), 1)
  }
}



// Type 0 : Image post, Text post
// Type 1 : Event
// Type 2 : Location
// Type 3 : Link