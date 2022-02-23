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

function RaceGameScreen(props: IRaceGameScreen) {
  const { wrongAnswers, words, onFinishGame } = props;
  const [count, setCounter] = useState<number>(0);
  const [statistic, setStatistic] = useState<IStatistic[]>([]);
  const [answers, setAnswers] = useState<string[]>([]);
  const { timer, resetTimer } = useTimer();
  const limit = words.length;
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

  const isGameFinished = statistic.length === limit;

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

  const ref1 = useRef(null);
  const ref2 = useRef(null);
  const ref3 = useRef(null);
  const ref4 = useRef(null);
  const ref5 = useRef(null);
  const refNk = useRef(null);

  const logKey = (key: KeyboardEvent): void => {
    switch (key.code) {
      case 'Digit1':
        (ref1.current as unknown as HTMLImageElement).click();
        break;
      case 'Digit2':
        (ref2.current as unknown as HTMLImageElement).click();
        break;
      case 'Digit3':
        (ref3.current as unknown as HTMLImageElement).click();
        break;
      case 'Digit4':
        (ref4.current as unknown as HTMLImageElement).click();
        break;
      case 'Digit5':
        (ref5.current as unknown as HTMLImageElement).click();
        break;
      default:
        (refNk.current as unknown as HTMLImageElement).click();
    }
  };

  useEffect(() => {
    document.addEventListener('keydown', logKey);
    return () => document.removeEventListener('keydown', logKey);
  }, []);

  return (
    <>
      {!isGameFinished && (
        <>
          <audio ref={audioRef} src={`${URL_PATH}${words[count].audio}`} />
          <div className={classes.bullets}>
            {new Array(limit).fill(0).map((zero, index) => (
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
              <Button
                ref={ref1}
                className={classes.playButton}
                style={{ border: getBorderColor(answers[0]) }}
                type="button"
                onClick={answerHandler as unknown as MouseEventHandler<HTMLButtonElement>}
                disabled={Boolean(statistic[count])}
              >
                {answers[0]}
              </Button>
              <Button
                ref={ref2}
                className={classes.playButton}
                style={{ border: getBorderColor(answers[1]) }}
                type="button"
                onClick={answerHandler as unknown as MouseEventHandler<HTMLButtonElement>}
                disabled={Boolean(statistic[count])}
              >
                {answers[1]}
              </Button>
              <Button
                ref={ref3}
                className={classes.playButton}
                style={{ border: getBorderColor(answers[2]) }}
                type="button"
                onClick={answerHandler as unknown as MouseEventHandler<HTMLButtonElement>}
                disabled={Boolean(statistic[count])}
              >
                {answers[2]}
              </Button>
              <Button
                ref={ref4}
                className={classes.playButton}
                style={{ border: getBorderColor(answers[3]) }}
                type="button"
                onClick={answerHandler as unknown as MouseEventHandler<HTMLButtonElement>}
                disabled={Boolean(statistic[count])}
              >
                {answers[3]}
              </Button>
              <Button
                ref={ref5}
                className={classes.playButton}
                style={{ border: getBorderColor(answers[4]) }}
                type="button"
                onClick={answerHandler as unknown as MouseEventHandler<HTMLButtonElement>}
                disabled={Boolean(statistic[count])}
              >
                {answers[4]}
              </Button>
            </div>
            <div>
              <Button
                ref={refNk}
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
            setAnswers(getAnswers(0));
            resetTimer();
          }}
        />
      )}
    </>
  );
}
export default RaceGameScreen;
