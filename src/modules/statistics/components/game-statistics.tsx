import React from 'react';
import StatisticsOutput from './statistics-output';

interface IGameStatisticsProps {
  name: string;
  newWordsCount: number;
  rightAnswersPercent: number;
  longestRightSequence: number;
}

export default function GameStatistics({
  name,
  newWordsCount,
  rightAnswersPercent,
  longestRightSequence,
}: IGameStatisticsProps) {
  const stat1 = { caption: 'Количество новых слов', value: `${newWordsCount}` };
  const stat2 = { caption: 'Процент правильных ответов', value: `${rightAnswersPercent}%` };
  const stat3 = { caption: 'Самая длинная серия правильных ответов', value: `${longestRightSequence}` };

  return <StatisticsOutput name={name} stat1={stat1} stat2={stat2} stat3={stat3} />;
}
