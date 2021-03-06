import React, { ReactElement } from 'react';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Link from '@mui/material/Link';
import GitHubIcon from '@mui/icons-material/GitHub';

import { IPeople } from '../data/const';
import MarinaImg from '../data/marina.png';
import SergeyImg from '../data/sergey.png';
import AlexImg from '../data/alex.png';

function Person(props: { data: IPeople }): ReactElement {
  const {
    data: { name, position, nameGithub, skills },
  } = props;

  return (
    <Paper className="person" elevation={24} sx={{ display: 'flex' }}>
      <Box className="person__hover">.</Box>
      {nameGithub === 'barclays13' && (
        <CardMedia component="img" sx={{ maxWidth: 300 }} image={SergeyImg} alt={`${name} photo`} />
      )}
      {nameGithub === 'LukashkinaMarina' && (
        <CardMedia component="img" sx={{ maxWidth: 300 }} image={MarinaImg} alt={`${name} photo`} />
      )}
      {nameGithub === 'alexgrishchuk' && (
        <CardMedia component="img" sx={{ maxWidth: 300 }} image={AlexImg} alt={`${name} photo`} />
      )}
      <Box>
        <CardContent>
          <Grid container sx={{ display: 'flex' }} direction="column" justifyContent="space-around" alignItems="center">
            <Typography component="div" variant="h5">
              {name}
            </Typography>
            <Link
              className="git-person"
              href={`https://github.com/${nameGithub}`}
              color="inherit"
              sx={{ display: 'flex' }}
              alignItems="center"
              gap={1}
              target="_blank"
            >
              <GitHubIcon />
              {nameGithub}
            </Link>
            <Typography variant="subtitle1" color="text.secondary" component="p">
              {position}
            </Typography>
          </Grid>
          <List>
            {skills.map((elem, index) => (
              <ListItem key={elem}>
                {index + 1}. {elem}
              </ListItem>
            ))}
          </List>
        </CardContent>
      </Box>
    </Paper>
  );
}

export default Person;
