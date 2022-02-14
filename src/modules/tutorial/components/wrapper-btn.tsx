import React, { ReactElement, useState } from 'react';

import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Add from '@mui/icons-material/Add';
import AddTask from '@mui/icons-material/AddTask';

function WrapperBtn(props: {
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
    data,
    data: { id },
  } = props;

  const [difficultWord, setDifficultWord] = useState(false);
  const [learnedWord, setLearnedWord] = useState(false);

  const changeDifficultWord = async () => {
    setDifficultWord(!difficultWord);
    console.log('id', id);
    console.log('data', data);
  };

  const changeLearnedWord = () => {
    setLearnedWord(!learnedWord);
    console.log('id', id);
    console.log('data', data);
  };

  return (
    <Stack direction="row" spacing={2} justifyContent="space-around" mt={2}>
      <Button
        onClick={changeDifficultWord}
        variant={difficultWord ? 'outlined' : 'contained'}
        startIcon={difficultWord ? <AddTask /> : <Add />}
      >
        Сложное
      </Button>
      <Button
        onClick={changeLearnedWord}
        variant={learnedWord ? 'outlined' : 'contained'}
        startIcon={learnedWord ? <AddTask /> : <Add />}
      >
        Изученное
      </Button>
    </Stack>
  );
}

export default WrapperBtn;
