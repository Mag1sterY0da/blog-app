import { Comment } from '@/types/Comment';
import { formatDate } from '@/utils/formatDate';
import { Remove } from '@mui/icons-material';
import ReplyIcon from '@mui/icons-material/Reply';
import { IconButton, Stack, Typography } from '@mui/material';
import { useState } from 'react';
import AddReply from './AddReply';
import RepliesList from './RepliesList';

type CommentProps = {
  comment: Comment;
  onReplyAdd: () => void;
};

const Comment: React.FC<CommentProps> = ({ comment, onReplyAdd }) => {
  const [isShowAddReply, setIsShowAddReply] = useState<boolean>(false);

  const toggleAddReply = () => setIsShowAddReply(prev => !prev);

  const hideAddReply = () => setIsShowAddReply(false);

  return (
    <Stack>
      <Stack direction='row' alignItems='center' gap={1}>
        <Typography variant='body1' component='div'>
          {comment.author.name}
        </Typography>
        <Typography color='textSecondary' variant='body2'>
          {formatDate(comment.date)}
        </Typography>
      </Stack>
      <Stack direction='row' alignItems='center' gap={1}>
        <Typography variant='body1'>{comment.content}</Typography>
        <IconButton color='inherit' size='small' onClick={toggleAddReply}>
          {isShowAddReply ? <Remove /> : <ReplyIcon />}
        </IconButton>
      </Stack>
      {isShowAddReply && (
        <AddReply
          postId={comment.postId}
          commentId={comment._id}
          replyTo={comment.author.name}
          hideAddReply={hideAddReply}
          onReplyAdd={onReplyAdd}
          isReplyToComment={true}
        />
      )}
      {comment.replies.length > 0 && (
        <RepliesList replies={comment.replies} onReplyAdd={onReplyAdd} />
      )}
    </Stack>
  );
};

export default Comment;
