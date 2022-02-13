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
    const audWord = new Audio(`${URL_PATH}${audio}`);
    const audMeaning = new Audio(`${URL_PATH}${audioMeaning}`);
    const audExample = new Audio(`${URL_PATH}${audioExample}`);

    setIsBtn(!isBtn);
    if (isBtn) {
      audWord.play();

      audWord.onended = () => {
        audMeaning.play();
      };

      audMeaning.onended = () => {
        audExample.play();
      };

      audExample.onended = () => {
        setIsBtn(true);
      };
    } else {
      audWord.pause();
      audWord.currentTime = 0;
      audExample.pause();
      audExample.currentTime = 0;
      audMeaning.pause();
      audMeaning.currentTime = 0;
    }
  };

  return (
    <IconButton onClick={play}>
      {isBtn ? <PlayCircleOutlinedIcon fontSize="large" /> : <PauseOutlined fontSize="large" />}
    </IconButton>
  );
}

export default AudioBtn;
