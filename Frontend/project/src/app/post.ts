import { Comment } from './comment';

export interface Post {
  postId: number;
  userId: number | null;
  companyId: number | null;
  title: string;
  content: string;
  createdAt: string;
  User?: {
    username: string;
  };
  Company?: {
    companyName: string;
  };
  comments?: Comment[];
}