import { Reply } from './Reply';
import { User } from './User';

export type Comment = {
  _id: string;
  postId: string;
  author: User;
  content: string;
  date: string;
  replies: Reply[];
};
