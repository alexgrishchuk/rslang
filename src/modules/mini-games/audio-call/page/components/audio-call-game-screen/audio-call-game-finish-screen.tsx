import React from 'react';
import { List, ListItem, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { IStatistic } from '../../../audio-call.types';

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
    height: '600px',
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
  },
});

interface IAudioCallGameFinishScreen {
  statistic: IStatistic[];
}

function getColor(answer: number) {
  return answer >= 70 ? '#008000' : '#FF0000';
}

function hideAnswerMessage(length: number) {
  return length > 0;
}

function AudioCallGameFinishScreen(props: IAudioCallGameFinishScreen) {
  const { statistic } = props;
  const { length } = statistic;
  const falseAnswers = statistic.filter((s) => !s.result);
  const trueAnswers = statistic.filter((s) => s.result);
  function getSeries() {
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

  const classes = useStyles();
  const percent = Math.trunc((trueAnswers.length / length) * 100);
  return (
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
                  <button type="button" className={classes.buttonPlayWords}>
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
          {trueAnswers.map((answer) => (
            <ListItem key={answer.word.id}>
              <div>
                <div className={classes.buttonPlayWords}>
                  <button type="button" className={classes.buttonPlayWords}>
                    ▶️
                  </button>
                  <Typography variant="h4">{answer.word.word}</Typography>
                </div>
                <Typography variant="h5">{answer.word.wordTranslate}</Typography>
              </div>
            </ListItem>
          ))}
        </List>
        <Typography variant="h5"> Самая длинная серия {getSeries()}</Typography>
      </div>
    </div>
  );
}
export default AudioCallGameFinishScreen;
