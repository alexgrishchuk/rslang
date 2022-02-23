/* eslint-disable jsx-a11y/media-has-caption */
/* eslint-disable react-hooks/exhaustive-deps */
import { Button, Typography } from '@mui/material';

import React, { MouseEventHandler, useEffect, useRef, useState } from 'react';
import { WordInfo } from '../../../../../../backend-requests/words-requests';
import { URL_PATH } from '../../../../../tutorial/data/const';
import { IStatistic } from '../../../../mini-games.types';
import SprintGameFinishScreen from './sprint-game-finish-screen';
import useStyles from './sprint-game-screen.styles';
import useTimer from './useTimer';

interface ISprintGameScreen {
  wrongAnswers: string[];
  words: WordInfo[];
  onFinishGame: () => void;
}

function SprintGameScreen(props: ISprintGameScreen) {
  const { wrongAnswers, words, onFinishGame } = props;
  const limit = words.length;
  const [count, setCounter] = useState<number>(0);
  const [statistic, setStatistic] = useState<IStatistic[]>([]);
  const [question, setQuestion] = useState<string>('');
  const { timer, resetTimer } = useTimer(30);
  const classes = useStyles();

  function getAnswers(counter: number) {
    return [words[counter].wordTranslate, wrongAnswers[count]];
  }

  const setQuestionForView = (arr: string[]) => setQuestion(arr[Math.trunc(Math.random() * 1.99)]);

  function nextHandler() {
    setCounter(count + 1);
    const newAnswers = getAnswers(count + 1);
    setQuestionForView(newAnswers);
    resetTimer();
  }

  function notKnowHandler() {
    setStatistic([...statistic, { word: words[count], answer: '', result: false }]);
    nextHandler();
  }

  function answerHandler(value: boolean) {
    const result =
      (question === words[count].wordTranslate) === value || (question !== words[count].wordTranslate) !== value;
    setStatistic([
      ...statistic,
      {
        word: words[count],
        answer: result ? words[count].wordTranslate : question,
        result,
      },
    ]);
    nextHandler();
  }

  useEffect(() => {
    if (timer === 0) {
      notKnowHandler();
    }
  }, [timer]);

  const audioRef = useRef(null);
  const ref = useRef(null);

  const handlePlay = () => {
    return (audioRef.current as unknown as HTMLAudioElement)?.play();
  };

  useEffect(() => {
    if (ref?.current) {
      (ref?.current as unknown as HTMLInputElement).click();
    }
  }, [question]);

  useEffect(() => {
    const newAnswers = getAnswers(count + 1);
    setQuestionForView(newAnswers);
  }, [wrongAnswers]);

  const isGameFinished = statistic.length === limit;
  const refY = useRef(null);
  const refN = useRef(null);

  const logKey = (key: KeyboardEvent): void => {
    switch (key.code) {
      case 'KeyY':
        (refY.current as unknown as HTMLImageElement).click();
        break;
      case 'KeyL':
        (refY.current as unknown as HTMLImageElement).click();
        break;
      default:
        (refN.current as unknown as HTMLImageElement).click();
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
            <button type="button" ref={ref} className={classes.timeStyle} onClick={handlePlay}>
              {timer}
            </button>
          </div>
          <div className={classes.allGameButtons}>
            <Typography variant="h3" style={{ minHeight: 60 }}>
              {question}
            </Typography>
            <div>
              <Button ref={refY} className={classes.playButton} type="button" onClick={() => answerHandler(true)}>
                Да
              </Button>
              <Button ref={refN} className={classes.playButton} type="button" onClick={() => answerHandler(false)}>
                Нет
              </Button>
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
        <SprintGameFinishScreen
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
export default SprintGameScreen;
