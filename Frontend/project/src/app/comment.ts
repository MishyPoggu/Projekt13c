export interface Comment {
  commentId: number;
  userId: number | null;
  companyId: number | null;
  postId: number;
  content: string;
  createdAt: string;
  User?: {
    username: string;
  };
  Company?: {
    companyName: string;
  };
}

export interface CreateCommentDto {
  userId: number | null;
  companyId: number | null;
  postId: number;
  content: string;
}