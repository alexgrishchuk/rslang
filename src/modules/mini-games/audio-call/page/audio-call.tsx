import { Typography } from '@mui/material';
import React from 'react';
import AppContainer from '../../../shared/app-container/app-container';
import AudioCallMenu from './components/audio-call-menu/audio-call-menu';

function AudioCall() {
  return (
    <AppContainer>
      <Typography variant="h2" m={2}>
        Мини-игра &quot;Аудиовызов&quot;
      </Typography>
      <Typography variant="subtitle2" style={{ paddingLeft: 20, maxWidth: 600, minWidth: 300, marginBottom: 20 }}>
        Аудирование развивает навыки восприятия речи. Пользователь только слышит слово и видит 5 вариантов его перевода.
        Необходимо выбрать правильный перевод озвученного слова.
      </Typography>
      <AudioCallMenu />
    </AppContainer>
  );
}

export default AudioCall;
