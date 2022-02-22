import { makeStyles } from '@mui/styles';
import React, { useState } from 'react';
import SprintGameScreen from '../sprint-game-screen/sprint-game-screen';
import SprintMenuButton from './sprint-menu-button/sprint-menu-button';
import useCallMenuApi from './sprint-menu-button/useSprintMenuApi';

const useStyles = makeStyles({
  buttons: {
    display: 'flex',
    flexDirection: 'column',
  },
});

function SprintMenu({ section, page }: { section: number; page: number }) {
  const [selected, setSelected] = useState<number>(section);
  const { words, wrongAnswers } = useCallMenuApi(selected, page);
  const classes = useStyles();
  return (
    <>
      {!selected && (
        <div className={classes.buttons}>
          <SprintMenuButton section={1} onClick={() => setSelected(1)} />
          <SprintMenuButton section={2} onClick={() => setSelected(2)} />
          <SprintMenuButton section={3} onClick={() => setSelected(3)} />
          <SprintMenuButton section={4} onClick={() => setSelected(4)} />
          <SprintMenuButton section={5} onClick={() => setSelected(5)} />
          <SprintMenuButton section={6} onClick={() => setSelected(6)} />
        </div>
      )}
      {!!selected && words.length > 0 && wrongAnswers.length > 0 && (
        <SprintGameScreen wrongAnswers={wrongAnswers} words={words} onFinishGame={() => setSelected(0)} />
      )}
    </>
  );
}
export default SprintMenu;
