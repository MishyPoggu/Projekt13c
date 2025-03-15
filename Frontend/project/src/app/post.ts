import { Comment } from './comment';

export interface Post {
  postId: number;
  userId: number;
  title: string;
  content: string;
  createdAt: string;
  User: {
    username: string;
  };
  comments?: Comment[];  
}
