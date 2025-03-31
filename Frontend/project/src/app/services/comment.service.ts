import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Environment } from '../environment';
import { Comment, CreateCommentDto } from '../comment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommentService {
  constructor(private http: HttpClient) {}

  baseURL = Environment.baseURL;

  addCommentEnd = "comments/create";
  getCommentsEnd = "comments/";
  deleteCommentEnd = "comments/";

  createComment(comment: CreateCommentDto): Observable<any> {
    return this.http.post(this.baseURL + this.addCommentEnd, comment);
  }

  getComments(): Observable<any> {
    return this.http.get(this.baseURL + this.getCommentsEnd);
  }

  getCommentsByPostId(postId: number): Observable<any> {
    return this.http.get(`${this.baseURL}comments/post/${postId}`);
  }

  deleteComment(commentId: number): Observable<any> {
    const userId = Number(localStorage.getItem("userId")) || null;
    const companyId = Number(localStorage.getItem("companyId")) || null;
    return this.http.delete(`${this.baseURL}${this.deleteCommentEnd}${commentId}`, {
      body: { userId, companyId },
    });
  }
}