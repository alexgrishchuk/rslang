import React, { ReactElement, useState } from 'react';

import IconButton from '@mui/material/IconButton';

import PlayCircleOutlinedIcon from '@mui/icons-material/PlayCircleOutlined';
import PauseOutlined from '@mui/icons-material/PauseOutlined';
import { URL_PATH } from '../data/const';

function AudioBtn(props: {
  data: {
    audio: string;
    audioExample: string;
    audioMeaning: string;
  };
}): ReactElement {
  const {
    data: { audio, audioExample, audioMeaning },
  } = props;

  const [isBtn, setIsBtn] = useState(true);

  const play = (): void => {
    const audWord: HTMLAudioElement = new Audio(`${URL_PATH}${audio}`);
    const audMeaning: HTMLAudioElement = new Audio(`${URL_PATH}${audioMeaning}`);
    const audExample: HTMLAudioElement = new Audio(`${URL_PATH}${audioExample}`);

    if (isBtn) {
      setIsBtn(false);
      audWord.play();
      audWord.onended = () => audMeaning.play();
      audMeaning.onended = () => audExample.play();
      audExample.onended = () => setIsBtn(true);
    }
  };

  return (
    <IconButton onClick={play}>
      {isBtn ? <PlayCircleOutlinedIcon fontSize="large" /> : <PauseOutlined fontSize="large" />}
    </IconButton>
  );
}

export default AudioBtn;
