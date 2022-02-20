import React, { ReactElement } from 'react';

import Divider from '@mui/material/Divider';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';
import AudiotrackTwoToneIcon from '@mui/icons-material/AudiotrackTwoTone';
import MobiledataOffTwoToneIcon from '@mui/icons-material/MobiledataOffTwoTone';

function GamesLinks(props: { isLearnedPage: boolean }): ReactElement {
  const navigate = useNavigate();
  const { isLearnedPage } = props;
  const linkTo = (path: string) => {
    navigate(path);
  };

  return (
    <Stack
      direction="row"
      justifyContent="space-around"
      alignItems="center"
      spacing={4}
      divider={<Divider orientation="vertical" flexItem />}
    >
      <Button
        variant="outlined"
        disableElevation
        disabled={isLearnedPage}
        onClick={() => {
          linkTo(`/audio-call`);
        }}
        sx={{ m: 4, width: '50%', height: 100 }}
      >
        <AudiotrackTwoToneIcon sx={{ mr: 5, fontSize: 40 }} />
        Мини-игра Аудивызов
      </Button>
      <Button
        variant="outlined"
        disabled={isLearnedPage}
        disableElevation
        onClick={() => {
          linkTo(`/sprint`);
        }}
        sx={{ width: '50%', height: 100 }}
      >
        <MobiledataOffTwoToneIcon sx={{ mr: 5, fontSize: 40 }} />
        Мини-игра Спринт
      </Button>
    </Stack>
  );
}

export default GamesLinks;
