import { Typography } from '@mui/material';
import React from 'react';
import AudioCallMenu from './components/audio-call-menu/audio-call-menu';

function AudioCall() {
  return (
    <>
      <Typography variant="h2" m={2}>
        Мини-игра &quot;Аудиовызов&quot;
      </Typography>
      <Typography variant="subtitle2" width={600} style={{ paddingLeft: 20 }}>
        Аудирование развивает навыки восприятия речи. Пользователь только слышит слово и видит 5 вариантов его перевода.
        Необходимо выбрать правильный перевод озвученного слова.
      </Typography>
      <AudioCallMenu />
    </>
  );
}

export default AudioCall;
