import { Comment as CommentType } from '@/types/Comment';
import Comment from './Comment';

type CommentListProps = {
  comments: CommentType[];
  onReplyAdd: () => void;
};

const CommentList: React.FC<CommentListProps> = ({ comments, onReplyAdd }) => {
  return comments.map(comment => (
    <Comment key={comment._id} comment={comment} onReplyAdd={onReplyAdd} />
  ));
};

export default CommentList;
