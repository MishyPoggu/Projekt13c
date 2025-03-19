import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PostService } from '../services/post.service';
import { Post } from '../post';
import { Environment } from '../environment';
import { CommentService } from '../services/comment.service';
import { Comment } from '../comment';

@Component({
  selector: 'app-forum',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './forum.component.html',
  styleUrls: ['./forum.component.css']
})
export class ForumComponent implements OnInit {

  posts_: Post[] = [];
  userId: number = 0;
  newComments: { [postId: number]: Comment } = {}; 

  post: Post = { 
    postId: 0, 
    userId: Number(localStorage.getItem("userId")), 
    title: "", 
    content: "", 
    createdAt: "", 
    User: { username: "" } 
  };

  newComment: Comment = { 
    commentId: 0, 
    userId: Number(localStorage.getItem("userId")), 
    postId: 0, 
    content: "", 
    createdAt: "", 
    User: { username: "" } 
  };

  constructor(private http: HttpClient, private postService: PostService, private commentService: CommentService) {}

  ngOnInit() {
    this.loadElfsightScript();
    this.userId = Environment.userId;

    this.postService.getPost().subscribe({
      next: (res: any) => {
        this.posts_ = res.data;
        this.posts_.forEach(post => {
          if (!this.newComments[post.postId]) {
            this.newComments[post.postId] = { 
              commentId: 0, 
              userId: Number(localStorage.getItem("userId")), 
              postId: post.postId, 
              content: "", 
              createdAt: "", 
              User: { username: "" } 
            };
          }
        });
      },
      error: (err: HttpErrorResponse) => {
        alert(err.message);
      }
    });
  }

  loadElfsightScript() {
    const script = document.createElement('script');
    script.src = 'https://static.elfsight.com/platform/platform.js';
    script.async = true;
    document.body.appendChild(script);
  }

  createPost() { 
    this.postService.createPost(this.post).subscribe({
      next: (res: any) => {
        window.location.reload();
        alert("Post sikeresen hozzáadva");
      },
      error: (err: HttpErrorResponse) => {
        alert(err.message);
      }
    });
  }

  deletePost(postId: number) {
    this.postService.deletePost(postId).subscribe({
      next: (res: any) => {
        window.location.reload();
      },
      error: (err: HttpErrorResponse) => {
        alert(err.message);
      }
    });
  }

  createComment(postId: number) {
    const commentToSend = this.newComments[postId];

    if (!commentToSend || !commentToSend.content.trim()) return;
  
    this.commentService.createComment(commentToSend).subscribe({
      next: (res: any) => {
        const post = this.posts_.find(p => p.postId === postId);
        if (post) {
          const newComment = res.data || {
            commentId: res.commentId, 
            userId: commentToSend.userId,
            postId: postId,
            content: commentToSend.content,
            createdAt: new Date(),
            User: { username: localStorage.getItem("username") || "ismeretlen" }
          };
  
          if (!post.comments) {
            post.comments = [];
          }
          post.comments.push(newComment);
        }
        this.newComments[postId].content = "";
        alert("Hozzászólás sikeresen hozzáadva");
      },
      error: (err: HttpErrorResponse) => {
        alert(err.message);
      }
    });
  }

  deleteComment(commentId: number) {
    this.commentService.deleteComment(commentId).subscribe({
      next: (res: any) => {
        window.location.reload();
      },
      error: (err: HttpErrorResponse) => {
        alert(err.message);
      }
    });
  }
}
