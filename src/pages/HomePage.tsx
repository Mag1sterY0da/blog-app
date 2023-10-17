import {
  selectIsAuthenticated,
  selectUser
} from '@/api/selectors/authSelectors';
import { useGetPostsQuery } from '@/api/services/postServices';
import AddPost from '@/components/AddPost';
import Loading from '@/components/Loading';
import PostList from '@/components/PostList';
import { Stack, Typography } from '@mui/material';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const HomePage: React.FC = () => {
  const navigate = useNavigate();
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const user = useSelector(selectUser);
  const { data: posts, refetch, isLoading } = useGetPostsQuery();

  const onPostAdd = () => refetch();
  const onCommentAdd = () => refetch();
  const onReplyAdd = () => refetch();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
    }
  }, [isAuthenticated, navigate]);

  if (!isAuthenticated || !user || !posts || isLoading) {
    return <Loading />;
  }

  return (
    <Stack gap={2} sx={{ my: 1, flex: 1 }}>
      <Typography variant='h4' align='center'>
        Home Page
      </Typography>
      <AddPost onPostAdd={onPostAdd} />
      <PostList
        posts={posts}
        onCommentAdd={onCommentAdd}
        onReplyAdd={onReplyAdd}
      />
    </Stack>
  );
};

export default HomePage;
