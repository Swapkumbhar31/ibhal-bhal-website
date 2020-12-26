import { Component, OnInit, Input, TemplateRef, Output, EventEmitter } from '@angular/core';
import { SocketService } from 'src/app/_services/socket.service';
import { AuthenticationService } from 'src/app/_services/authentication.service';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { HttpClient } from '@angular/common/http';
declare const $: any;

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.scss']
})
export class FeedComponent implements OnInit {
  public images: string[];
  public _post;
  public isFullScreen: boolean = false;
  public isCommentShowing = false;
  @Output() postDeleted = new EventEmitter<any>();
  @Input()
  public set post(val: any[]) {
    this._post = val;
    this.images = this._post.images.split(",").filter(o => {
      if (o) {
        return true
      }
    }).map(o => {
      if (o) {
        return 'https://iblah-blah.com/iblah/images/' + o
      }
    })
    this._post.lon = parseFloat(this._post.lon);
    this._post.lat = parseFloat(this._post.lat);
    if (!this._post.location && this._post.lat) {
      this.http.get('https://maps.googleapis.com/maps/api/geocode/json?latlng=' + this._post.lat + ',' + this._post.lon + '&sensor=false&key=AIzaSyAlkzGVPNL2_7tWJFqKOlYBAmda4W4Xqg4')
        .subscribe((d: any) => {
          console.log(d);
        })
    }
    this._post.discription = this._post.discription.replace(new RegExp(this.escapeRegExp(","), 'g'), ", ");
    // this.getUserInfo();
  }

  escapeRegExp(string) {
    return string.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  }

  public comments = [];
  modalRef: BsModalRef;
  constructor(private s: SocketService, public _auth: AuthenticationService, private modalService: BsModalService, private http: HttpClient) { }

  ngOnInit() {
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }

  likePost() {
    if (this._post.likestatus === 0) {
      this.s.socket.emit("likeApost", this._auth.getUserId(), this._post.post_id, "", this._post.type, "");
      this._post.likestatus = 1;
      this._post.countLikes = this._post.countLikes + 1;
    } else {
      this.s.socket.emit("unlikeApost", this._auth.getUserId(), this._post.post_id);
      this._post.likestatus = 0;
      this._post.countLikes = this._post.countLikes - 1;
    }
  }

  confirm() {
    let title = this._post.title;
    let discription = this._post.discription;
    let posttype = this._post.posttype;
    let lat = this._post.lat;
    let lon = this._post.lon;
    let video = this._post.video;
    let images = this._post.images;
    let videosThumbs = this._post.videosThumbs;
    let type = this._post.type;
    let location = this._post.location;
    let original_user = this._post.original_user;
    let taggedFriends = this._post.taggedFriends;
    this.s.socket.emit("sharePost", this._auth.getUserId(), this._post.post_id,
      title, discription, posttype, lat, lon, video, images, videosThumbs, type,
      location, original_user, taggedFriends);
    this.modalRef.hide();
  }

  decline() {
    this.modalRef.hide();
  }

  toggleComments() {
    this.isCommentShowing = !this.isCommentShowing;
    if (!this.comments.length) {
      this.s.socket.emit("getcmnts", this._auth.getUserId(), this._post.post_id);
      // this.s.socket.emit("getIMGcmnts", this._auth.getUserId(), this._post.post_id);
      this.s.socket.once(this._auth.getUserId(),
        (number, comments) => {
          if (comments) {
            this.comments = comments;
          }
        });
    } else {
      this.comments = [];
    }
  }

  hidePost() {
    this.s.socket.emit("remove_post", this._auth.getUserId(), this._post.post_id);
    this.postDeleted.emit({ postId: this._post.post_id });
  }

  deletePost() {
    this.s.socket.emit("delete_post", this._post.post_id);
    this.postDeleted.emit({ postId: this._post.post_id });
  }

  toggleFullscreen() {
    this.isFullScreen = !this.isFullScreen;
    console.log(this._post)
    if (this.isFullScreen) {
      $('body').addClass('no-scrollable');
      this.s.socket.emit("addToView", '', this._post.post_id);
    } else {
      $('body').removeClass('no-scrollable');
    }
  }
}
