import React, { ReactElement } from 'react';

import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { URL_PATH } from '../data/const';
import AudioBtn from './audio';
import WrapperBtn from './wrapper-btn';

function CardTutorial(props: {
  colorCard: string;
  isAuthenticated: boolean;
  data: {
    id: string;
    image: string;
    wordTranslate: string;
    word: string;
    transcription: string;
    textExample: string;
    textExampleTranslate: string;
    textMeaning: string;
    textMeaningTranslate: string;
    audio: string;
    audioExample: string;
    audioMeaning: string;
  };
}): ReactElement {
  const {
    colorCard,
    data,
    isAuthenticated,
    data: {
      image,
      wordTranslate,
      word,
      transcription,
      textExampleTranslate,
      textExample,
      textMeaning,
      textMeaningTranslate,
      audio,
      audioExample,
      audioMeaning,
    },
  } = props;
  const urlImg = `${URL_PATH}${image}`;

  return (
    <Card sx={{ maxWidth: 400 }}>
      <CardMedia component="img" height="250" image={urlImg} alt={word} />
      <CardContent>
        <Typography gutterBottom variant="h3" color={colorCard} component="p">
          {word}
          <AudioBtn data={{ audio, audioExample, audioMeaning }} />
        </Typography>
        <Typography variant="h5" color="text.secondary">
          {wordTranslate} - {transcription}
        </Typography>
        <Typography dangerouslySetInnerHTML={{ __html: textMeaning }} variant="subtitle2" mt={2} />
        <Typography variant="body2" color="text.secondary">
          {textMeaningTranslate}
        </Typography>
        <hr color={colorCard} />
        <Typography dangerouslySetInnerHTML={{ __html: textExample }} variant="subtitle2" mt={2} />
        <Typography variant="body2" color="text.secondary">
          {textExampleTranslate}
        </Typography>
        {isAuthenticated && <WrapperBtn data={data} />}
      </CardContent>
    </Card>
  );
}

export default CardTutorial;
