import { Typography } from '@mui/material';
import React from 'react';
import SprintMenu from './components/sprint-menu/sprint-menu';

function Sprint() {
  return (
    <>
      <Typography variant="h2" m={2}>
        Мини-игра &quot;Спринт&quot;
      </Typography>
      <Typography variant="subtitle2" width={600} style={{ paddingLeft: 20 }}>
        Пользователю будет предлагаться слово на английском языке и его перевод. В течение 30 секунд нужно угадывать,
        верный перевод предложен к английскому слову или нет.
      </Typography>
      <SprintMenu />
    </>
  );
}

export default Sprint;
