import React from 'react';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';

import Footer from '../../shared/footer/footer';
import Person from '../components/person';

import { IPeople, PEOPLE } from '../data/const';

function AboutTeam() {
  return (
    <>
      <main>
        <Container>
          <h2> О команде</h2>
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
