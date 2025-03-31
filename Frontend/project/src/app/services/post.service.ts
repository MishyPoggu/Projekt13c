import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Environment } from '../environment';

@Injectable({
  providedIn: 'root'
})
export class PostService {
  constructor(private http: HttpClient) {}

  baseURL = Environment.baseURL;
  addPostEnd = "posts/create";
  getPostsEnd = "posts/";

  createFormPost(formData: FormData) {
    return this.http.post(`${this.baseURL}${this.addPostEnd}`, formData);
  }

  createPost(post: any) {
    return this.http.post(`${this.baseURL}${this.addPostEnd}`, post);
  }

  getForumPosts() {
    return this.http.get(`${this.baseURL}${this.getPostsEnd}?type=forum`);
  }

  getLocations() {
    return this.http.get(`${this.baseURL}${this.getPostsEnd}?type=location`);
  }

  deletePost(postId: number) {
    const userId = Number(localStorage.getItem("userId")) || null;
    const companyId = Number(localStorage.getItem("companyId")) || null;
    return this.http.delete(`${this.baseURL}${this.getPostsEnd}${postId}`, {
      body: { userId, companyId },
    });
  }
}