import { selectUser } from '@/api/selectors/authSelectors';
import { useAddReplyMutation } from '@/api/services/replyServices';
import { Send } from '@mui/icons-material';
import { Box, IconButton, Stack, TextField } from '@mui/material';
import { useRef } from 'react';
import { useSelector } from 'react-redux';

type AddReplyProps = {
  postId: string;
  commentId: string;
  replyTo: string;
  hideAddReply: () => void;
  onReplyAdd: () => void;
  isReplyToComment?: boolean;
};

const AddReply: React.FC<AddReplyProps> = ({
  postId,
  commentId,
  replyTo,
  hideAddReply,
  onReplyAdd,
  isReplyToComment
}) => {
  const user = useSelector(selectUser);
  const contentRef = useRef<HTMLInputElement | null>(null);
  const [doAddReply] = useAddReplyMutation();

  const handleSubmit = async (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const content: string = contentRef.current?.value || '';

    if (!user) return;

    doAddReply({
      postId,
      commentId,
      content,
      author: user._id
    });

    hideAddReply();
    onReplyAdd();
  };

  return (
    <Box component='form' noValidate sx={{ ml: isReplyToComment ? 2 : 0 }}>
      <Stack direction='row' gap={1} alignItems='end'>
        <TextField
          placeholder='Add a reply'
          defaultValue={`${replyTo}, `}
          variant='standard'
          inputRef={contentRef}
          sx={{ flex: 1 }}
          size='small'
          InputLabelProps={{ shrink: false }}
        />
        <IconButton
          type='submit'
          color='inherit'
          onClick={handleSubmit}
          size='small'
        >
          <Send />
        </IconButton>
      </Stack>
    </Box>
  );
};

export default AddReply;
