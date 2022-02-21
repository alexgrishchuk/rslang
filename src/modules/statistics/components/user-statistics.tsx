import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import GameStatistics from './game-statistics';
import WordsStatistics from './words-statistics';
import AppContainer from '../../shared/app-container/app-container';

import {
  getUpdatedStatistics,
  IUserStatistics,
  createDefaultStatistics,
  IGameStatistics,
} from '../../../backend-requests/user-statistics';

function getGameRightAnswersPercent(gameStat: IGameStatistics): number {
  return gameStat.answersCount ? Math.round((gameStat.rightAnswersCount / gameStat.answersCount) * 100) : 0;
}

function getWordsRightAnswersPercent(stat: IUserStatistics): number {
  const {
    optional: {
      current: { sprint, audioCall, race },
    },
  } = stat;

  const allRightAnswersCount = sprint.rightAnswersCount + audioCall.rightAnswersCount + race.rightAnswersCount;
  const allAnswersCount = sprint.answersCount + audioCall.answersCount + race.answersCount;

  return allAnswersCount ? Math.round((allRightAnswersCount / allAnswersCount) * 100) : 0;
}

function getNewWordsCount(stat: IUserStatistics): number {
  const {
    optional: {
      current: { sprint, audioCall, race },
    },
  } = stat;
  return sprint.newWordsCount + audioCall.newWordsCount + race.newWordsCount;
}

export default function UserStatistics() {
  const [userStat, setUserStat] = useState<IUserStatistics>(createDefaultStatistics());
  const {
    optional: {
      current: { learnWordsCount, sprint, audioCall, race },
    },
  } = userStat;

  useEffect(() => {
    (async () => {
      const statistics: IUserStatistics = await getUpdatedStatistics();
      setUserStat(statistics);
    })();
  }, []);

  return (
    <Box>
      <Paper elevation={3}>
        <Accordion>
          <AppContainer>
            <AccordionSummary
              sx={{ padding: 0 }}
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Typography sx={{ fontWeight: 'bold', fontSize: 'subtitle1.fontSize' }}>Статистика за сегодня</Typography>
            </AccordionSummary>
          </AppContainer>
          <AccordionDetails sx={{ padding: 0, mb: 2 }}>
            <AppContainer>
              <div>
                <GameStatistics
                  name="Спринт"
                  newWordsCount={sprint.newWordsCount}
                  rightAnswersPercent={getGameRightAnswersPercent(sprint)}
                  longestRightSequence={sprint.longestRightSequence}
                />
                <GameStatistics
                  name="Аудиовызов"
                  newWordsCount={audioCall.newWordsCount}
                  rightAnswersPercent={getGameRightAnswersPercent(audioCall)}
                  longestRightSequence={audioCall.longestRightSequence}
                />
                <GameStatistics
                  name="Гонка"
                  newWordsCount={race.newWordsCount}
                  rightAnswersPercent={getGameRightAnswersPercent(race)}
                  longestRightSequence={race.longestRightSequence}
                />
              </div>
              <WordsStatistics
                name="Общая статистика по словам"
                newWordsCount={getNewWordsCount(userStat)}
                learnWordsCount={learnWordsCount}
                rightAnswersPercent={getWordsRightAnswersPercent(userStat)}
              />
            </AppContainer>
          </AccordionDetails>
        </Accordion>
      </Paper>
    </Box>
  );
}