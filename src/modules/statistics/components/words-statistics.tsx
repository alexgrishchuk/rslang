import React from 'react';
import StatisticsOutput from './statistics-output';

interface IWordsStatisticsProps {
  name: string;
  newWordsCount: number;
  learnWordsCount: number;
  rightAnswersPercent: number;
}

export default function WordsStatistics({
  name,
  newWordsCount,
  learnWordsCount,
  rightAnswersPercent,
}: IWordsStatisticsProps) {
  const stat1 = { caption: 'Количество новых слов', value: `${newWordsCount}` };
  const stat2 = { caption: 'Количество изученных слов', value: `${learnWordsCount}` };
  const stat3 = { caption: 'Процент правильных ответов', value: `${rightAnswersPercent}%` };

  return <StatisticsOutput name={name} stat1={stat1} stat2={stat2} stat3={stat3} />;
}
