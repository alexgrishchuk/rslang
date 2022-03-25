import React from 'react';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

import ShortDescription from '../components/short-description';
import Footer from '../../shared/footer/footer';
import StartLearning from '../components/start-learning';
import OurAdvantages from '../components/our-advantages';
import TypeLearning from '../components/type-learning';

function Main() {
  return (
    <>
      <main>
        <Container maxWidth={false} sx={{ maxWidth: 1920 }}>
          <Typography variant="h2" gutterBottom component="h2">
            Главная
          </Typography>
          <ShortDescription />
          <OurAdvantages />
          <TypeLearning />
          <StartLearning />
        </Container>
      </main>
      <Footer />
    </>
  );
}

export default Main;
