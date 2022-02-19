import React from 'react';
import { Button, List, ListItem, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { IStatistic, URL_PATH } from '../../../audio-call.types';

const useStyles = makeStyles({
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  minContainer: {
    width: 600,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    border: '3px solid #1976d2',
    borderRadius: 12,
    padding: 10,
    height: '500px',
    overflowY: 'scroll',
  },
  heading: {
    color: '#B22222',
  },
  heading2: {
    color: '#008000',
  },
  buttonPlayWords: {
    display: 'flex',
    fontSize: 30,
    padding: 0,
    margin: 0,
    border: 'none',
    backgroundColor: 'transparent',
    cursor: 'pointer',
  },
  moveButtons: {
    color: '#FFFFFF',
    backgroundColor: '#1976d2',
    margin: 10,
    '&:hover': {
      backgroundColor: '#5986F2',
      color: 'white',
    },
  },
  moveButtons2: {
    display: 'flex',
    justifyContent: 'center',
  },
});

interface IAudioCallGameFinishScreen {
  statistic: IStatistic[];
  onFinishGame: () => void;
  clearStatistic: () => void;
}

function AudioCallGameFinishScreen(props: IAudioCallGameFinishScreen) {
  const { statistic, onFinishGame, clearStatistic } = props;
  const { length } = statistic;
  const falseAnswers = statistic.filter((s) => !s.result);
  const trueAnswers = statistic.filter((s) => s.result);

  const handleButtonClick = () => {
    return onFinishGame();
  };

  const handlerRepetition = () => {
    clearStatistic();
  };

  function getColor(answer: number) {
    return answer >= 70 ? '#008000' : '#FF0000';
  }

  function hideAnswerMessage(l: number) {
    return l > 0;
  }

  function getBestSeries() {
    const arr: number[] = [];
    let acc = 0;
    statistic.forEach((value) => {
      if (value.result) {
        acc += 1;
      } else {
        arr.push(acc);
        acc = 0;
      }
    });
    arr.push(acc);
    return Math.max(...arr);
  }
  const audio = statistic.map((stat) => {
    return {
      audio: new Audio(`${URL_PATH}${stat.word.audio}`),
      id: stat.word.id,
    };
  });

  const classes = useStyles();
  const percent = Math.trunc((trueAnswers.length / length) * 100);
  const bestSeries = getBestSeries();
  return (
    <>
      <div className={classes.container}>
        <div className={classes.minContainer}>
          <Typography variant="h4" style={{ color: getColor(percent) }}>
            Процент правильных ответов {percent} %
          </Typography>
          {hideAnswerMessage(trueAnswers.length) && (
            <Typography variant="h4" className={classes.heading}>
              Не правильных ответов {falseAnswers.length}
            </Typography>
          )}
          <List>
            {falseAnswers.map((answer) => (
              <ListItem key={answer.word.id}>
                <div>
                  <div className={classes.buttonPlayWords}>
                    <button
                      type="button"
                      className={classes.buttonPlayWords}
                      onClick={() => audio.find((el) => el.id === answer.word.id)?.audio.play()}
                    >
                      ▶️
                    </button>
                    <Typography variant="h4">{answer.word.word}</Typography>
                  </div>
                  <Typography variant="h5">{answer.word.wordTranslate}</Typography>
                </div>
              </ListItem>
            ))}
          </List>
          {hideAnswerMessage(trueAnswers.length) && (
            <Typography variant="h4" className={classes.heading2}>
              Правильных ответов {trueAnswers.length}
            </Typography>
          )}
          <List>
            {trueAnswers.map((answer) => {
              return (
                <ListItem key={answer.word.id}>
                  <div>
                    <div className={classes.buttonPlayWords}>
                      <button
                        type="button"
                        className={classes.buttonPlayWords}
                        onClick={() => audio.find((el) => el.id === answer.word.id)?.audio.play()}
                      >
                        ▶️
                      </button>
                      <Typography variant="h4">{answer.word.word}</Typography>
                    </div>
                    <Typography variant="h5">{answer.word.wordTranslate}</Typography>
                  </div>
                </ListItem>
              );
            })}
          </List>
          <Typography variant="h5"> Самая длинная серия {bestSeries}</Typography>
        </div>
      </div>
      <div className={classes.moveButtons2}>
        <Button type="button" className={classes.moveButtons} onClick={handlerRepetition}>
          Повторить
        </Button>
        <Button type="button" className={classes.moveButtons} onClick={handleButtonClick}>
          Закончить
        </Button>
      </div>
    </>
  );
}
export default AudioCallGameFinishScreen;
