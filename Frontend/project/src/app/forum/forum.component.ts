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

  constructor(private http: HttpClient, private postService: PostService, private commentService: CommentService) {}

  posts_: Post[] = [];
  userId: number = 0;
  
  ngOnInit() {
    this.loadElfsightScript();
    this.userId = Environment.userId;

    this.postService.getPost().subscribe({
      next: (res: any) => {
        this.posts_ = res.data;
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

  post: Post = { postId: 0, userId: Number(localStorage.getItem("userId")), title: "", content: "", createdAt: "", User: { username: "" } };
  createPost() { 
    console.log(this.post);
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

  newComment: Comment = { commentId: 0, userId: Number(localStorage.getItem("userId")), postId: 0, content: "", createdAt: "", User: { username: "" } };
  createComment(postId: number) {
    this.newComment.postId = postId;
    this.commentService.createComment(this.newComment).subscribe({
      next: (res: any) => {
        window.location.reload();
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
