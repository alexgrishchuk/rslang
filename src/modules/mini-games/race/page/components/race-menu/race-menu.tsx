import { Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import React, { useState } from 'react';
import useGameApi from '../../../../useGameApi';
import RaceGameScreen from '../race-game-screen/race-game-screen';
import RaceMenuButton from './race-menu-button/race-menu-button';

const useStyles = makeStyles({
  buttons: {
    display: 'flex',
    flexDirection: 'column',
  },
});

function RaceMenu({ section, page }: { section: number; page: number }) {
  const [selected, setSelected] = useState<number>(section || 0);
  const { words, wrongAnswers, loaded } = useGameApi(selected, page);
  const classes = useStyles();
  return (
    <>
      {Boolean(selected) && words.length === 0 && loaded && (
        <Typography variant="h2">Слов недостаточно для игры</Typography>
      )}
      {!selected && (
        <div className={classes.buttons}>
          <RaceMenuButton section={1} onClick={() => setSelected(1)} />
          <RaceMenuButton section={2} onClick={() => setSelected(2)} />
          <RaceMenuButton section={3} onClick={() => setSelected(3)} />
          <RaceMenuButton section={4} onClick={() => setSelected(4)} />
          <RaceMenuButton section={5} onClick={() => setSelected(5)} />
          <RaceMenuButton section={6} onClick={() => setSelected(6)} />
        </div>
      )}
      {!!selected && words.length > 0 && wrongAnswers.length > 0 && (
        <RaceGameScreen wrongAnswers={wrongAnswers} words={words} onFinishGame={() => setSelected(0)} />
      )}
    </>
  );
}
export default RaceMenu;
