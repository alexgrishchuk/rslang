import React, { Component } from 'react';

import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Add from '@mui/icons-material/Add';
import AddTask from '@mui/icons-material/AddTask';
import Box from '@mui/material/Box';

import { URL_PATH } from '../data/const';
import AudioBtn from './audio';
import { WordInfo } from '../../../backend-requests/words-requests';
import {
  IUserWordInfoWithId,
  setWordToEasy,
  setWordToHard,
  IUserWordInfo,
} from '../../../backend-requests/user-words-requests';

interface IState {
  difficultWord: boolean;
  learnedWord: boolean;
  playedWord: IUserWordInfo | null;
}

type IProps = {
  colorCard: string;
  isAuthenticated: boolean;
  data: WordInfo;
  userItems: IUserWordInfoWithId[];
};

class CardTutorial extends Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);

    this.state = {
      difficultWord: false,
      learnedWord: false,
      playedWord: null,
    };
  }

  async componentDidMount() {
    const {
      userItems,
      data: { id },
    } = this.props;

    const isDifficultWord = userItems.find(
      (elem: IUserWordInfoWithId) => elem.wordId === id && elem.difficulty === 'hard'
    );

    const isLearnedWord = userItems.find(
      (elem: IUserWordInfoWithId) => elem.wordId === id && elem.difficulty === 'easy'
    );

    const optionWords = userItems.find((elem: IUserWordInfoWithId) => elem.optional.isNew && elem.wordId === id);
    if (optionWords) {
      this.setState({ playedWord: optionWords });
    }

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
      setWordToHard(id);
    }

    if (!difficultWord && learnedWord) {
      setWordToHard(id);
      this.setState({ learnedWord: false });
    }

    if (difficultWord && !learnedWord) {
      setWordToEasy(id);
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
      setWordToEasy(id);
    }

    if (learnedWord && !difficultWord) {
      setWordToHard(id);
      this.setState({ difficultWord: true });
    }

    if (!learnedWord && difficultWord) {
      setWordToEasy(id);
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
    const { learnedWord, difficultWord, playedWord } = this.state;

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
        <CardMedia component="img" image={urlImg} alt={word} height="275" />
        <CardContent className={classNameBG}>
          <Stack direction="row" justifyContent="space-between" alignItems="center" spacing={2}>
            <Typography gutterBottom variant="h4" color={colorCard} mb={0}>
              {word}
            </Typography>
            <AudioBtn data={{ audio, audioExample, audioMeaning }} />
          </Stack>
          <Typography variant="h6" color="text.secondary">
            {wordTranslate} - {transcription}
          </Typography>
          <Box sx={{ height: 100 }}>
            <Typography
              dangerouslySetInnerHTML={{ __html: textMeaning }}
              variant="subtitle2"
              sx={{ mt: 1, maxHeight: 40 }}
            />
            <Typography variant="caption" color="text.secondary" sx={{ mt: 1, maxHeight: 60 }}>
              {textMeaningTranslate}
            </Typography>
          </Box>
          <hr color={colorCard} />
          <Box sx={{ height: 100 }}>
            <Typography
              dangerouslySetInnerHTML={{ __html: textExample }}
              variant="subtitle2"
              sx={{ mt: 1, minHeight: 40 }}
            />
            <Typography variant="caption" color="text.secondary" sx={{ mt: 1, minHeight: 60 }}>
              {textExampleTranslate}
            </Typography>
          </Box>
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
          <Box className="card__play-answer" mt={1} height={20}>
            {playedWord && (
              <Typography variant="h6" display="block" color={colorCard} gutterBottom align="center">
                Статистика в мини-играх: {playedWord.optional.rightAnswers} из {playedWord.optional.attempts}
              </Typography>
            )}
          </Box>
        </CardContent>
      </Card>
    );
  }
}

export default CardTutorial;
