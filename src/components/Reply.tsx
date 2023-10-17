import { Reply as ReplyType } from '@/types/Reply';
import { formatDate } from '@/utils/formatDate';
import { Remove } from '@mui/icons-material';
import ReplyIcon from '@mui/icons-material/Reply';
import { IconButton, Stack, Typography } from '@mui/material';
import { useState } from 'react';
import AddReply from './AddReply';

type ReplyProps = {
  reply: ReplyType;
  onReplyAdd: () => void;
  disableAddReply?: boolean;
};

const Reply: React.FC<ReplyProps> = ({
  reply,
  onReplyAdd,
  disableAddReply
}) => {
  const [isShowAddReply, setIsShowAddReply] = useState<boolean>(false);

  const toggleAddReply = () => setIsShowAddReply(prev => !prev);

  const hideAddReply = () => setIsShowAddReply(false);

  return (
    <Stack>
      <Stack direction='row' alignItems='center' gap={1}>
        <Typography variant='body1' component='div'>
          {reply.author.name}
        </Typography>
        <Typography color='textSecondary' variant='body2'>
          {formatDate(reply.date)}
        </Typography>
      </Stack>
      <Stack direction='row' alignItems='center' gap={1}>
        <Typography
          variant='body1'
          sx={{ color: theme => theme.palette.text.secondary }}
        >
          {reply.content}
        </Typography>

        {!disableAddReply && (
          <IconButton color='inherit' size='small' onClick={toggleAddReply}>
            {isShowAddReply ? <Remove /> : <ReplyIcon />}
          </IconButton>
        )}
      </Stack>
      {isShowAddReply && !disableAddReply && (
        <AddReply
          postId={reply.postId}
          commentId={reply.commentId}
          replyTo={reply.author.name}
          hideAddReply={hideAddReply}
          onReplyAdd={onReplyAdd}
        />
      )}
    </Stack>
  );
};

export default Reply;
