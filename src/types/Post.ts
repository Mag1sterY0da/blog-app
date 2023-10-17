import { Comment } from './Comment';
import { User } from './User';

export type Post = {
  _id: string;
  title: string;
  content: string;
  author: User;
  date: string;
  comments: Comment[];
};
