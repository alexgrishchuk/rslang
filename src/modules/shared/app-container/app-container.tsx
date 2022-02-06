import * as React from 'react';
import Container from '@mui/material/Container';

interface IProps {
  children: React.ReactNode;
}

function AppContainer({ children }: IProps) {
  return (
    <Container maxWidth={false} sx={{ maxWidth: 1920 }}>
      {children}
    </Container>
  );
}

export default AppContainer;
