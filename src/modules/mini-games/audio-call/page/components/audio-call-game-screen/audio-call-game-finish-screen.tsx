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
  },
  heading: {
    color: '#FA8072',
  },
  heading2: {
    color: '#008000',
  },
});

interface IAudioCallGameFinishScreen {
  statistic: IStatistic[];
}

function AudioCallGameFinishScreen(props: IAudioCallGameFinishScreen) {
  const { statistic } = props;
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
  return (
    <div className={classes.container}>
      <div className={classes.minContainer}>
        <Typography variant="h3" className={classes.heading}>
          Не правильных ответов {falseAnswers.length}
        </Typography>
        <List>
          {falseAnswers.map((answer) => (
            <ListItem key={answer.word.id}>
              <div>
                <Typography variant="h4">{answer.word.word}</Typography>
                <Typography variant="h5">{answer.word.wordTranslate}</Typography>
              </div>
            </ListItem>
          ))}
        </List>
        <Typography variant="h3" className={classes.heading2}>
          Правильных ответов {trueAnswers.length}
        </Typography>
        <List>
          {trueAnswers.map((answer) => (
            <ListItem key={answer.word.id}>
              <div>
                <Typography variant="h4">{answer.word.word}</Typography>
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
