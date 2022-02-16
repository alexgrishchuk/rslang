import React, { ReactElement } from 'react';

import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

import { URL_PATH, IUserWord } from '../data/const';
import AudioBtn from './audio';
import WrapperBtn from './wrapper-btn';
import { WordInfo } from '../../../backend-requests/words-requests';

function CardTutorial(props: {
  colorCard: string;
  isAuthenticated: boolean;
  data: WordInfo;
  userItems: Array<IUserWord>;
}): ReactElement {
  const {
    userItems,
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
        {isAuthenticated && <WrapperBtn userItems={userItems} data={data} />}
      </CardContent>
    </Card>
  );
}

export default CardTutorial;
