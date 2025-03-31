import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PostService } from '../services/post.service';
import { Post } from '../post';
import { CommentService } from '../services/comment.service';
import { Comment, CreateCommentDto } from '../comment';

@Component({
  selector: 'app-forum',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './forum.component.html',
  styleUrls: ['./forum.component.css'],
})
export class ForumComponent implements OnInit {
  posts_: Post[] = [];
  userId: number = 0;
  companyId: number | null = null;
  newComments: { [postId: number]: Comment } = {};

  post: Post = {
    postId: 0,
    userId: Number(localStorage.getItem("userId")) || null,
    companyId: Number(localStorage.getItem("companyId")) || null,
    title: "",
    content: "",
    createdAt: "",
    User: { username: "" },
    Company: { companyName: "" },
  };

  constructor(
    private http: HttpClient,
    private postService: PostService,
    private commentService: CommentService
  ) {}

  ngOnInit() {
    this.loadElfsightScript();
    this.userId = Number(localStorage.getItem("userId")) || 0;
    this.companyId = Number(localStorage.getItem("companyId")) || null;

    this.postService.getForumPosts().subscribe({
      next: (res: any) => {
        this.posts_ = res.data;

        this.posts_.forEach(post => {
          if (!this.newComments[post.postId]) {
            this.newComments[post.postId] = {
              commentId: 0,
              userId: this.userId || null,
              companyId: this.companyId || null,
              postId: post.postId,
              content: "",
              createdAt: "",
              User: { username: "" },
              Company: { companyName: "" },
            };
          }

          this.commentService.getCommentsByPostId(post.postId).subscribe({
            next: (commentRes: any) => {
              post.comments = commentRes.data || [];
            },
            error: (err: HttpErrorResponse) => {
              console.error("Error loading comments: ", err.message);
            },
          });
        });
      },
      error: (err: HttpErrorResponse) => {
        alert(err.message);
      },
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
      },
    });
  }

  deletePost(postId: number) {
    const post: Post | undefined = this.posts_.find(p => p.postId === postId);

    if (post && (post.userId === this.userId || post.companyId === this.companyId)) {
      this.postService.deletePost(postId).subscribe({
        next: () => {
          this.posts_ = this.posts_.filter(p => p.postId !== postId);
          alert("Poszt törölve.");
        },
        error: (err: HttpErrorResponse) => {
          alert(err.message);
        },
      });
    } else {
      alert("Nem törölheted más posztját!");
    }
  }

  createComment(postId: number) {
    const commentToSend = this.newComments[postId];

    if (!commentToSend || !commentToSend.content.trim()) {
      alert("A hozzászólás nem lehet üres!");
      return;
    }

    const post: Post | undefined = this.posts_.find(p => p.postId === postId);
    if (!post) {
      alert("A poszt nem található!");
      return;
    }

    const payload: CreateCommentDto = {
      userId: this.userId || null,
      companyId: this.companyId || null,
      postId: postId,
      content: commentToSend.content,
    };

    this.commentService.createComment(payload).subscribe({
      next: (res: any) => {
        const newComment: Comment = res.data || {
          commentId: res.commentId,
          userId: payload.userId,
          companyId: payload.companyId,
          postId: postId,
          content: payload.content,
          createdAt: new Date().toISOString(),
          User: { username: res.data?.User?.username || "" },
          Company: { companyName: res.data?.Company?.companyName || "" },
        };

        if (!post.comments) {
          post.comments = [];
        }
        post.comments.push(newComment);

        this.newComments[post.postId].content = "";
        alert("Hozzászólás sikeresen hozzáadva");
      },
      error: (err: HttpErrorResponse) => {
        console.error("Hiba a komment létrehozásakor:", err);
        alert("Hiba történt: " + err.message);
      },
    });
  }

  deleteComment(commentId: number) {
    const post = this.posts_.find(p =>
      p.comments && p.comments.some(c => c.commentId === commentId)
    );

    if (!post) {
      alert("A hozzászólás nem található!");
      return;
    }

    const comment = post.comments!.find(c => c.commentId === commentId);
    if (!comment) {
      alert("A hozzászólás nem található!");
      return;
    }

    if (comment.userId === this.userId || comment.companyId === this.companyId) {
      this.commentService.deleteComment(commentId).subscribe({
        next: () => {
          post.comments = post.comments!.filter(c => c.commentId !== commentId);
          alert("Hozzászólás törölve.");
        },
        error: (err: HttpErrorResponse) => {
          alert(err.message);
        },
      });
    } else {
      alert("Nem törölheted más hozzászólását!");
    }
  }

  scrollToNews() {
    const newsSection = document.getElementById("news");
    if (newsSection) {
      newsSection.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }
}