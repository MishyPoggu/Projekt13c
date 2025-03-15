export interface Comment {
    commentId: number;
    userId: number;
    postId: number;
    content: string;
    createdAt: string;
    User: {
      username: string;
    };
  }
  