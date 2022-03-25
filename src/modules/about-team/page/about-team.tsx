import React from 'react';
import { Grid, Container, Typography } from '@mui/material/';

import Footer from '../../shared/footer/footer';
import Person from '../components/person';

import { IPeople, PEOPLE } from '../data/const';

function AboutTeam() {
  return (
    <>
      <main>
        <Container maxWidth={false} sx={{ maxWidth: 1920 }}>
          <Typography variant="h2" gutterBottom component="h2">
            О команде
          </Typography>
          <Grid container className="team" direction="column" alignItems="center" spacing={1}>
            {PEOPLE.map((elem: IPeople) => (
              <Grid item className="team__person" key={elem.id}>
                <Person data={elem} />
              </Grid>
            ))}
          </Grid>
        </Container>
      </main>
      <Footer />
    </>
  );
}

export default AboutTeam;
