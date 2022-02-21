import { Typography } from '@mui/material';
import React from 'react';
import { useParams } from 'react-router-dom';
import AppContainer from '../../../shared/app-container/app-container';
import SprintMenu from './components/sprint-menu/sprint-menu';

function Sprint() {
  const params = useParams();
  const section = Number(params.id);
  return (
    <AppContainer>
      <Typography variant="h2" m={2}>
        Мини-игра &quot;Спринт&quot;
      </Typography>
      <Typography variant="subtitle2" style={{ paddingLeft: 20, maxWidth: 600, minWidth: 300, marginBottom: 20 }}>
        Пользователю будет предлагаться слово на английском языке и его перевод. В течение 30 секунд нужно угадывать,
        верный перевод предложен к английскому слову или нет.
      </Typography>
      <SprintMenu section={section} />
    </AppContainer>
  );
}

export default Sprint;
