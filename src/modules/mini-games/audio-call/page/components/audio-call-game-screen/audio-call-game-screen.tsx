import { Button, Typography } from '@mui/material';

import React, { MouseEventHandler, useEffect, useState } from 'react';
import { WordInfo } from '../../../../../../backend-requests/words-requests';
import { IStatistic } from '../../../audio-call.types';
import AudioCallGameFinishScreen from './audio-call-game-finish-screen';
import useStyles from './audio-call-game-screen.styles';

interface IAudioCallGameScreen {
  wrongAnswers: string[];
  words: WordInfo[];
}

const LIMIT = 5;

function AudioCallGameScreen(props: IAudioCallGameScreen) {
  const { wrongAnswers, words } = props;
  const [count, setCounter] = useState<number>(0);
  const [statistic, setStatistic] = useState<IStatistic[]>([]);
  const [answers, setAnswers] = useState<string[]>([]);

  const classes = useStyles();

  function shuffleWords(arr: string[]): string[] {
    return arr.sort(() => (Math.random() > 0.5 ? -1 : 1));
  }

  function getAnswers(counter: number) {
    return shuffleWords([...shuffleWords(wrongAnswers).slice(wrongAnswers.length - 4), words[counter].wordTranslate]);
  }

  function answerHandler(event: MouseEvent) {
    const selectedAnswer = (event?.target as HTMLButtonElement).textContent || '';
    setStatistic([
      ...statistic,
      { word: words[count], answer: selectedAnswer, result: words[count].wordTranslate === selectedAnswer },
    ]);
  }

  function nextHandler() {
    setCounter(count + 1);
    setAnswers(getAnswers(count + 1));
  }
  const notKnowHandler = (): void => {
    setStatistic([...statistic, { word: words[count], answer: '', result: false }]);
  };

  /* eslint-disable */
  useEffect(() => {
    setAnswers(getAnswers(count));
  }, [wrongAnswers]);

  function getBorderColor(answer: string) {
    if (!statistic[count]) return '';
    const rightAnswer = statistic[count].word.wordTranslate;
    if (statistic[count].answer !== answer) {
      if (rightAnswer === answer) {
        return '2px solid green';
      }
      return '';
    }
    return rightAnswer !== answer ? '2px solid red' : '2px solid green';
  }

  const isGameFinished = statistic.length === LIMIT;
  return (
    <>
      {!isGameFinished && (
        <>
          <div className={classes.bullets}>
            {new Array(LIMIT).fill(0).map((word, index) => (
              <div key={word.word}>
                {statistic[index] && <div> {statistic[index].result ? '✔️' : '❌'}</div>}
                {!statistic[index] && <div>⬤</div>}
              </div>
            ))}
          </div>
          <div className={classes.allGameButtons}>
            <Typography variant="h3" style={{ minHeight: 60 }}>
              {statistic[count] ? words[count].word : ''}
            </Typography>
            <div>
              <Button className={classes.playSound} type="button">
                Прослушать
              </Button>
            </div>
            <div>
              {answers.map((answer) => (
                <Button
                  className={classes.playButton}
                  style={{ border: getBorderColor(answer) }}
                  key={`key_${answer}`}
                  type="button"
                  onClick={answerHandler as unknown as MouseEventHandler<HTMLButtonElement>}
                  disabled={Boolean(statistic[count])}
                >
                  {answer}
                </Button>
              ))}
            </div>
            <div>
              {!statistic[count] && (
                <Button className={classes.playButton} type="button" onClick={notKnowHandler}>
                  Не знаю
                </Button>
              )}
              {statistic[count] && (
                <Button
                  className={classes.playButton}
                  type="button"
                  onClick={nextHandler as unknown as MouseEventHandler<HTMLButtonElement>}
                >
                  Продолжить
                </Button>
              )}
            </div>
          </div>
        </>
      )}
      {isGameFinished && <AudioCallGameFinishScreen statistic={statistic} />}
    </>
  );
}
export default AudioCallGameScreen;
