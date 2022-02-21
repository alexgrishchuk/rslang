import React, { ReactElement } from 'react';

import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';
import AudiotrackTwoToneIcon from '@mui/icons-material/AudiotrackTwoTone';
import MobiledataOffTwoToneIcon from '@mui/icons-material/MobiledataOffTwoTone';

function GamesLinks(props: { isLearnedPage: boolean; group: number }): ReactElement {
  const navigate = useNavigate();
  const { isLearnedPage, group } = props;
  const linkTo = (path: string) => {
    navigate(path);
  };

  return (
    <Stack direction={{ xs: 'column', sm: 'row' }} justifyContent="space-around" alignItems="center" spacing={4}>
      <Button
        variant="outlined"
        disableElevation
        disabled={isLearnedPage}
        onClick={() => {
          linkTo(`/audio-call/${group}`);
        }}
        sx={{ m: 4, width: '30%', height: 100 }}
      >
        <AudiotrackTwoToneIcon sx={{ m: 2, fontSize: 40 }} />
        Мини-игра Аудивызов
      </Button>
      <Button
        variant="outlined"
        disabled={isLearnedPage}
        disableElevation
        onClick={() => {
          linkTo(`/sprint/${group}`);
        }}
        sx={{ width: '30%', height: 100 }}
      >
        <MobiledataOffTwoToneIcon sx={{ m: 2, fontSize: 40 }} />
        Мини-игра Спринт
      </Button>
      <Button
        variant="outlined"
        disabled={isLearnedPage}
        disableElevation
        onClick={() => {
          linkTo(`/race/${group}`);
        }}
        sx={{ width: '30%', height: 100 }}
      >
        <MobiledataOffTwoToneIcon sx={{ m: 2, fontSize: 40 }} />
        Мини-игра Гонка
      </Button>
    </Stack>
  );
}

export default GamesLinks;
