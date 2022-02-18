import React, { Component } from 'react';

import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Add from '@mui/icons-material/Add';
import AddTask from '@mui/icons-material/AddTask';

import { URL_PATH, IUserWord } from '../data/const';
import AudioBtn from './audio';
import { WordInfo } from '../../../backend-requests/words-requests';
import { createCurrentUserWord, putCurrentUserWord } from '../../../backend-requests/user-words-requests';

interface IState {
  difficultWord: boolean;
  learnedWord: boolean;
}

type IProps = {
  colorCard: string;
  isAuthenticated: boolean;
  data: WordInfo;
  userItems: Array<IUserWord>;
};

class CardTutorial extends Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);

    this.state = {
      difficultWord: false,
      learnedWord: false,
    };
  }

  async componentDidMount() {
    console.log('componentDidMount');
    const {
      userItems,
      data: { id },
    } = this.props;
    const isDifficultWord = userItems.find((elem: IUserWord) => elem.wordId === id && elem.difficulty === 'hard');
    const isLearnedWord = userItems.find((elem: IUserWord) => elem.wordId === id && elem.difficulty === 'easy');

    if (isDifficultWord) {
      this.setState({ difficultWord: true });
    } else {
      this.setState({ difficultWord: false });
    }

    if (isLearnedWord) {
      this.setState({ learnedWord: true });
    } else {
      this.setState({ learnedWord: false });
    }
  }

  changeDifficultWord = () => {
    const { difficultWord, learnedWord } = this.state;
    const {
      data: { id },
    } = this.props;

    if (!difficultWord && !learnedWord) {
      createCurrentUserWord(id, { difficulty: 'hard', optional: {} });
    }

    if (!difficultWord && learnedWord) {
      putCurrentUserWord(id, { difficulty: 'hard', optional: {} });
      this.setState({ learnedWord: false });
    }

    if (difficultWord && !learnedWord) {
      putCurrentUserWord(id, { difficulty: 'easy', optional: {} });
      this.setState({ learnedWord: true });
    }

    this.setState({ difficultWord: !difficultWord });
  };

  changeLearnedWord = () => {
    const { difficultWord, learnedWord } = this.state;
    const {
      data: { id },
    } = this.props;

    if (!learnedWord && !difficultWord) {
      createCurrentUserWord(id, { difficulty: 'easy', optional: {} });
    }

    if (learnedWord && !difficultWord) {
      putCurrentUserWord(id, { difficulty: 'hard', optional: {} });
      this.setState({ difficultWord: true });
    }

    if (!learnedWord && difficultWord) {
      putCurrentUserWord(id, { difficulty: 'easy', optional: {} });
      this.setState({ difficultWord: false });
    }

    this.setState({ learnedWord: !learnedWord });
  };

  render() {
    const {
      colorCard,
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
    } = this.props;
    const { learnedWord, difficultWord } = this.state;
    const urlImg = `${URL_PATH}${image}`;
    let classNameBG = '';

    if (difficultWord) {
      classNameBG = 'hard-card';
    }

    if (learnedWord) {
      classNameBG = 'easy-card';
    }

    return (
      <Card sx={{ minHeight: 600 }}>
        <CardMedia component="img" image={urlImg} alt={word} height="220" />
        <CardContent className={classNameBG}>
          <Typography gutterBottom variant="h4" color={colorCard} mb={0}>
            {word}
            <AudioBtn data={{ audio, audioExample, audioMeaning }} />
          </Typography>
          <Typography variant="h6" color="text.secondary">
            {wordTranslate} - {transcription}
          </Typography>
          <Typography
            dangerouslySetInnerHTML={{ __html: textMeaning }}
            variant="subtitle2"
            sx={{ mt: 1, minHeight: 50 }}
            align="center"
          />
          <Typography variant="body2" color="text.secondary" sx={{ mt: 1, minHeight: 50 }}>
            {textMeaningTranslate}
          </Typography>
          <hr color={colorCard} />
          <Typography
            dangerouslySetInnerHTML={{ __html: textExample }}
            variant="subtitle2"
            sx={{ mt: 1, minHeight: 50 }}
          />
          <Typography variant="body2" color="text.secondary" sx={{ mt: 1, minHeight: 50 }}>
            {textExampleTranslate}
          </Typography>
          {isAuthenticated && (
            <Stack direction="row" spacing={2} justifyContent="space-around">
              <Button
                onClick={this.changeDifficultWord}
                variant={difficultWord ? 'outlined' : 'contained'}
                startIcon={difficultWord ? <AddTask /> : <Add />}
              >
                Сложное
              </Button>
              <Button
                onClick={this.changeLearnedWord}
                variant={learnedWord ? 'outlined' : 'contained'}
                startIcon={learnedWord ? <AddTask /> : <Add />}
              >
                Изученное
              </Button>
            </Stack>
          )}
        </CardContent>
      </Card>
    );
  }
}

export default CardTutorial;
