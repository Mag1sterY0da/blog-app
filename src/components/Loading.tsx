import { Box, CircularProgress } from '@mui/material';

const Loading: React.FC = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1
      }}
    >
      <CircularProgress />
    </Box>
  );
};

export default Loading;
