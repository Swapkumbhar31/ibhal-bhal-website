import { Component, OnInit, Input } from '@angular/core';
import { SocketService } from 'src/app/_services/socket.service';
import { AuthenticationService } from 'src/app/_services/authentication.service';
import { UUID } from 'angular2-uuid';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.scss']
})
export class CommentsComponent implements OnInit {
  public _comments: any[];
  public user: any;
  public comment = "";
  @Input('postId') postId = "";
  @Input()
  public set comments(val: any[]) {
    this._comments = val;
    // console.log(val)
    // this.getUserInfo();
  }
  constructor(private s: SocketService, private _auth: AuthenticationService) { }

  ngOnInit() {
    this.user = this._auth.decode();
  }

  getUserInfo() {
    if (this._comments.length) {
      this._comments.map(o => {
        this.s.socket.emit('getAllDetailOfUser', this._auth.getUserId(), o.user_id);
        this.s.socket.once(this._auth.getUserId(),
          (number, user_details, user_friends, user_photos) => {
            this._comments.forEach(o => {
              if (JSON.parse(user_details)[0]) {
                const t = JSON.parse(user_details)[0];
                if (o.user_id === t.user_id) {
                  o.user_details = JSON.parse(user_details)[0];
                }
              }
            });
          });
      })
    }
  }

  likeComment(comment_id) {
    const comment = this._comments.find(o => o.comment_id == comment_id);
    if (comment.isCmtLiked === 0) {
      this.s.socket.emit("likeAcomment", this._auth.getUserId(), comment.comment_id);
      comment.isCmtLiked = 1;
      comment.countLikes = comment.countLikes + 1;
    } else {
      this.s.socket.emit("unLikeAcomment", this._auth.getUserId(), comment.comment_id);
      comment.isCmtLiked = 0;
      comment.countLikes = comment.countLikes - 1;
    }
  }

  addComment() {
    console.log(this.postId)
    if (this.comment) {
      console.log(this.comment);
      this.s.socket.emit('commentONPost', this._auth.getUserId(), this.postId, this.comment, "", "", UUID.UUID(), "");
    }
  }



}
