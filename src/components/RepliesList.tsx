import { Reply as ReplyType } from '@/types/Reply';
import { Box } from '@mui/material';
import Reply from './Reply';

type RepliesListProps = {
  replies: ReplyType[];
  onReplyAdd: () => void;
  disableAddReply?: boolean;
};

const RepliesList: React.FC<RepliesListProps> = ({
  replies,
  onReplyAdd,
  disableAddReply
}) => {
  return (
    <Box sx={{ ml: 2 }}>
      {replies.map(reply => (
        <Reply
          key={reply._id}
          reply={reply}
          onReplyAdd={onReplyAdd}
          disableAddReply={disableAddReply}
        />
      ))}
    </Box>
  );
};

export default RepliesList;
