import { Typography } from '@mui/material';
import React from 'react';
import RaceMenu from './components/race-menu/race-menu';

function Race() {
  return (
    <>
      <Typography variant="h2" m={2}>
        Мини-игра &quot;Гонка&quot;
      </Typography>
      <Typography variant="subtitle2" width={700} style={{ paddingLeft: 20 }}>
        Игра позволяет развить навыки восприятия речи за очень ограниченное время. Пользователь только слышит и видит
        слово и видит 5 вариантов его перевода. Необходимо выбрать правильный перевод слова за 10 секунд.
      </Typography>
      <RaceMenu />
    </>
  );
}

export default Race;
