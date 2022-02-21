import { Typography } from '@mui/material';
import React from 'react';
import AppContainer from '../../../shared/app-container/app-container';
import RaceMenu from './components/race-menu/race-menu';

function Race() {
  return (
    <AppContainer>
      <Typography variant="h2" m={2}>
        Мини-игра &quot;Гонка&quot;
      </Typography>
      <Typography variant="subtitle2" style={{ paddingLeft: 20, maxWidth: 700, minWidth: 300, marginBottom: 20 }}>
        Игра позволяет развить навыки восприятия речи за очень ограниченное время. Пользователь только слышит и видит
        слово и видит 5 вариантов его перевода. Необходимо выбрать правильный перевод слова за 10 секунд.
      </Typography>
      <RaceMenu />
    </AppContainer>
  );
}

export default Race;
