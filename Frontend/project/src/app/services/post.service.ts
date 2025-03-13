import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Environment } from '../environment';
import { Post } from '../post';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  constructor(private http:HttpClient) { }

  baseURL = Environment.baseURL;

  addPostEnd="posts/create";
  getPostsEnd="posts/"

  createPost(post:Post) {
    return this.http.post(this.baseURL+this.addPostEnd, post);
  }


  getPost() {
    return this.http.get(this.baseURL+this.getPostsEnd);
  }

  deletePost(postId:number) {
    return this.http.delete(`${this.baseURL}${this.getPostsEnd}${postId}`);
  }
}
