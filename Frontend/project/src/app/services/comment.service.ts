import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Environment } from '../environment';
import { Comment } from '../comment';

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  constructor(private http: HttpClient) { }

  baseURL = Environment.baseURL;

  addCommentEnd = "comments/create";
  getCommentsEnd = "comments/";
  deleteCommentEnd = "comments/";

  createComment(comment: Comment) {
    return this.http.post(this.baseURL + this.addCommentEnd, comment);
  }

  getComments() {
    return this.http.get(this.baseURL + this.getCommentsEnd);
  }

  deleteComment(commentId: number) {
    return this.http.delete(`${this.baseURL}${this.deleteCommentEnd}${commentId}`);
  }
}
