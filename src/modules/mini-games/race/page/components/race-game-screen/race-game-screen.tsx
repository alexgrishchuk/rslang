/* eslint-disable jsx-a11y/media-has-caption */
/* eslint-disable react-hooks/exhaustive-deps */
import { Button, Typography } from '@mui/material';

import React, { MouseEventHandler, useEffect, useRef, useState } from 'react';
import { WordInfo } from '../../../../../../backend-requests/words-requests';
import { URL_PATH } from '../../../../../tutorial/data/const';
import { IStatistic } from '../../../../mini-games.types';
import RaceGameFinishScreen from './race-game-finish-screen';
import useStyles from './race-game-screen.styles';
import useTimer from './useTimer';

interface IRaceGameScreen {
  wrongAnswers: string[];
  words: WordInfo[];
  onFinishGame: () => void;
}

const LIMIT = 10;

function RaceGameScreen(props: IRaceGameScreen) {
  const { wrongAnswers, words, onFinishGame } = props;
  const [count, setCounter] = useState<number>(0);
  const [statistic, setStatistic] = useState<IStatistic[]>([]);
  const [answers, setAnswers] = useState<string[]>([]);
  const { timer, resetTimer } = useTimer();
  const classes = useStyles();
  function shuffleWords(arr: string[]): string[] {
    return arr.sort(() => (Math.random() > 0.5 ? -1 : 1));
  }

  function getAnswers(counter: number) {
    return shuffleWords([...shuffleWords(wrongAnswers).slice(wrongAnswers.length - 4), words[counter].wordTranslate]);
  }

  function nextHandler() {
    setCounter(count + 1);
    setAnswers(getAnswers(count + 1));
    resetTimer();
  }

  function notKnowHandler() {
    setStatistic([...statistic, { word: words[count], answer: '', result: false }]);
    nextHandler();
  }

  function answerHandler(event: MouseEvent) {
    const selectedAnswer = (event?.target as HTMLButtonElement).textContent || '';
    setStatistic([
      ...statistic,
      { word: words[count], answer: selectedAnswer, result: words[count].wordTranslate === selectedAnswer },
    ]);
    nextHandler();
  }

  useEffect(() => {
    if (timer === 0) {
      notKnowHandler();
    }
  }, [timer]);

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

  const audioRef = useRef(null);
  const ref = useRef(null);

  const handlePlay = () => {
    return (audioRef.current as unknown as HTMLAudioElement)?.play();
  };

  useEffect(() => {
    setTimeout(() => {
      (ref?.current as unknown as HTMLInputElement)?.click();
    }, 0);
  }, [count]);

  return (
    <>
      {!isGameFinished && (
        <>
          <audio ref={audioRef} src={`${URL_PATH}${words[count].audio}`} />
          <div className={classes.bullets}>
            {new Array(LIMIT).fill(0).map((zero, index) => (
              <div key={`key_${words[index].word}`}>
                {statistic[index] && <div> {statistic[index].result ? '✔️' : '❌'}</div>}
                {!statistic[index] && <div>⬤</div>}
              </div>
            ))}
          </div>
          <div className={classes.counterContainer}>
            <button ref={ref} type="button" className={classes.timeStyle} onClick={handlePlay}>
              {timer}
            </button>
          </div>
          <div className={classes.allGameButtons}>
            <Typography variant="h3" style={{ minHeight: 60 }}>
              {words[count].word}
            </Typography>
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
              <Button
                className={classes.playButton}
                type="button"
                onClick={notKnowHandler as unknown as MouseEventHandler<HTMLButtonElement>}
                disabled={Boolean(statistic[count])}
              >
                Не знаю
              </Button>
            </div>
          </div>
        </>
      )}
      {isGameFinished && (
        <RaceGameFinishScreen
          statistic={statistic}
          onFinishGame={onFinishGame}
          clearStatistic={() => {
            setStatistic([]);
            setCounter(0);
            resetTimer();
          }}
        />
      )}
    </>
  );
}
export default RaceGameScreen;
