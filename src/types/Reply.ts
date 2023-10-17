import { User } from './User';

export type Reply = {
  _id: string;
  postId: string;
  commentId: string;
  author: User;
  content: string;
  date: string;
};
