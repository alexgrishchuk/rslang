import { Typography } from '@mui/material';
import React from 'react';
import { useParams } from 'react-router-dom';
import AppContainer from '../../../shared/app-container/app-container';
import AudioCallMenu from './components/audio-call-menu/audio-call-menu';

function AudioCall() {
  const params = useParams();
  const section = Number(params.id);
  const page = Number(params.page);
  return (
    <AppContainer>
      <Typography variant="h2" m={2}>
        Мини-игра &quot;Аудиовызов&quot;
      </Typography>
      <Typography variant="subtitle2" style={{ paddingLeft: 20, maxWidth: 600, minWidth: 300, marginBottom: 20 }}>
        Аудирование развивает навыки восприятия речи. Пользователь только слышит слово и видит 5 вариантов его перевода.
        Необходимо выбрать правильный перевод озвученного слова.
      </Typography>
      <AudioCallMenu section={section} page={page} />
    </AppContainer>
  );
}

export default AudioCall;
