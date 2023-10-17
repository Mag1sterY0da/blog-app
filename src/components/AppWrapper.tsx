import { Box } from '@mui/material';

type AppWrapperProps = {
  children: React.ReactNode;
};

const AppWrapper: React.FC<AppWrapperProps> = ({ children }) => {
  return (
    <Box
      component='main'
      sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}
    >
      {children}
    </Box>
  );
};

export default AppWrapper;
