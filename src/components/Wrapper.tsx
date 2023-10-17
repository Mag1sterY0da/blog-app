import { Container } from '@mui/material';

type WrapperProps = {
  children: React.ReactNode;
};

const Wrapper: React.FC<WrapperProps> = ({ children }) => {
  return (
    <Container maxWidth='lg' sx={{ display: 'flex', flex: 1, width: '100%' }}>
      {children}
    </Container>
  );
};

export default Wrapper;
