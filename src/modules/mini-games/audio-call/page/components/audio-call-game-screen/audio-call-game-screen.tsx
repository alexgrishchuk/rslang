import { Button, Typography } from '@mui/material';

import React, { MouseEventHandler, useEffect, useRef, useState } from 'react';
import { WordInfo } from '../../../../../../backend-requests/words-requests';
import { URL_PATH } from '../../../../../tutorial/data/const';
import { IStatistic } from '../../../../mini-games.types';
import AudioCallGameFinishScreen from './audio-call-game-finish-screen';
import useStyles from './audio-call-game-screen.styles';

interface IAudioCallGameScreen {
  wrongAnswers: string[];
  words: WordInfo[];
  onFinishGame: () => void;
}

function AudioCallGameScreen(props: IAudioCallGameScreen) {
  const { wrongAnswers, words, onFinishGame } = props;
  const limit = words.length;
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

  const isGameFinished = statistic.length === limit;

  const handlePlayButtonClick = () => {
    (audioRef.current as unknown as HTMLAudioElement).play();
  };

  const ref1 = useRef(null);
  const ref2 = useRef(null);
  const ref3 = useRef(null);
  const ref4 = useRef(null);
  const ref5 = useRef(null);
  const refNk = useRef(null);
  const refNext = useRef(null);
  const refPlay = useRef(null);

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
      case 'Space':
        (refNext.current as unknown as HTMLImageElement).click();
        break;
      case 'KeyP':
        (refPlay.current as unknown as HTMLImageElement).click();
        break;
      default:
        (refNk.current as unknown as HTMLImageElement).click();
    }
  };

  useEffect(() => {
    document.addEventListener('keydown', logKey);
    return () => document.removeEventListener('keydown', logKey);
  }, []);

  const audioRef = useRef(null);
  return (
    <>
      {limit === 0 && <Typography>???????? ???????????????????????? ?????? ????????</Typography>}
      {!isGameFinished && limit !== 0 && (
        <>
          <audio ref={audioRef} src={`${URL_PATH}${words[count].audio}`} />
          <div className={classes.bullets}>
            {new Array(limit).fill(0).map((zero, index) => (
              <div key={`key_${words[index].word}`}>
                {statistic[index] && <div> {statistic[index].result ? '??????' : '???'}</div>}
                {!statistic[index] && <div>???</div>}
              </div>
            ))}
          </div>
          <div className={classes.allGameButtons}>
            <Typography variant="h3" style={{ minHeight: 60 }}>
              {statistic[count] ? words[count].word : ''}
            </Typography>
            <div>
              <Button ref={refPlay} className={classes.playSound} type="button" onClick={handlePlayButtonClick}>
                ????????????????????
              </Button>
            </div>
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
              {!statistic[count] && (
                <Button ref={refNk} className={classes.playButton} type="button" onClick={notKnowHandler}>
                  ???? ????????
                </Button>
              )}
              {statistic[count] && (
                <Button
                  ref={refNext}
                  className={classes.playButton}
                  type="button"
                  onClick={nextHandler as unknown as MouseEventHandler<HTMLButtonElement>}
                >
                  ????????????????????
                </Button>
              )}
            </div>
          </div>
        </>
      )}
      {isGameFinished && limit !== 0 && (
        <AudioCallGameFinishScreen
          statistic={statistic}
          onFinishGame={onFinishGame}
          clearStatistic={() => {
            setStatistic([]);
            setCounter(0);
          }}
        />
      )}
    </>
  );
}
export default AudioCallGameScreen;
