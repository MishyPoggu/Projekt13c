import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-forum',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './forum.component.html',
  styleUrls: ['./forum.component.css']
})
export class ForumComponent implements OnInit {
  posts: any[] = [];
  newPost = { title: '', content: '' };
  newComment: { [key: number]: string } = {};

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.loadPosts();
    this.loadElfsightScript();
  }

  loadElfsightScript() {
    const script = document.createElement('script');
    script.src = 'https://static.elfsight.com/platform/platform.js';
    script.async = true;
    document.body.appendChild(script);
  }

  loadPosts() {
    this.http.get<any>('http://localhost:3000/posts').subscribe({
      next: (response) => {
        this.posts = response.data;
        this.posts.forEach(post => this.loadComments(post.postId));
      },
      error: (err) => console.error('Hiba a posztok betöltésekor:', err)
    });
  }

  loadComments(postId: number) {
    this.http.get<any>(`http://localhost:3000/comments/post/${postId}`).subscribe({
      next: (response) => {
        const post = this.posts.find(p => p.postId === postId);
        if (post) post.comments = response.data;
      },
      error: (err) => console.error('Hiba a kommentek betöltésekor:', err)
    });
  }

  createPost() {
    const userId = 1; // Hardcoded, autentikációval kell lecserélni
    this.http.post('http://localhost:3000/posts/create', { userId, ...this.newPost }).subscribe({
      next: () => {
        this.newPost = { title: '', content: '' };
        this.loadPosts();
      },
      error: (err) => console.error('Hiba a poszt létrehozásakor:', err)
    });
  }

  createComment(postId: number) {
    const userId = 1; // Hardcoded, autentikációval kell lecserélni
    const content = this.newComment[postId] || '';
    this.http.post('http://localhost:3000/comments/create', { userId, postId, content }).subscribe({
      next: () => {
        this.newComment[postId] = '';
        this.loadComments(postId);
      },
      error: (err) => console.error('Hiba a komment létrehozásakor:', err)
    });
  }

  deletePost(postId: number) {
    this.http.delete(`http://localhost:3000/posts/${postId}`).subscribe({
      next: () => this.loadPosts(),
      error: (err) => console.error('Hiba a poszt törlésekor:', err)
    });
  }

  deleteComment(commentId: number) {
    this.http.delete(`http://localhost:3000/comments/${commentId}`).subscribe({
      next: () => this.loadPosts(),
      error: (err) => console.error('Hiba a komment törlésekor:', err)
    });
  }
}
