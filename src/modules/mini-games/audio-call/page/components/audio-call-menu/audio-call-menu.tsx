import { makeStyles } from '@mui/styles';
import React, { useState } from 'react';
import AudioCallGameScreen from '../audio-call-game-screen/audio-call-game-screen';
import AudioCallMenuButton from './audio-call-menu-button/audio-call-menu-button';
import useCallMenuApi from './audio-call-menu-button/useCallMenuApi';

const useStyles = makeStyles({
  buttons: {
    display: 'flex',
    flexDirection: 'column',
  },
});

function AudioCallMenu({ section, page }: { section: number; page: number }) {
  const [selected, setSelected] = useState<number>(section || 0);
  const { words, wrongAnswers } = useCallMenuApi(selected, page);
  const classes = useStyles();
  return (
    <>
      {!selected && (
        <div className={classes.buttons}>
          <AudioCallMenuButton section={1} onClick={() => setSelected(1)} />
          <AudioCallMenuButton section={2} onClick={() => setSelected(2)} />
          <AudioCallMenuButton section={3} onClick={() => setSelected(3)} />
          <AudioCallMenuButton section={4} onClick={() => setSelected(4)} />
          <AudioCallMenuButton section={5} onClick={() => setSelected(5)} />
          <AudioCallMenuButton section={6} onClick={() => setSelected(6)} />
        </div>
      )}
      {!!selected && words.length > 0 && (
        <AudioCallGameScreen wrongAnswers={wrongAnswers} words={words} onFinishGame={() => setSelected(0)} />
      )}
    </>
  );
}
export default AudioCallMenu;
