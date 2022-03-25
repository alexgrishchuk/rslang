import React from 'react';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { IUserStatistics, IStatForDay } from '../../../backend-requests/user-statistics';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top' as const,
    },
  },
  scales: {
    y: {
      ticks: {
        stepSize: 1,
      },
    },
  },
};

interface ILongTermStatProps {
  stat: IUserStatistics;
  currentNewWordsCount: number;
}

function createData(longTermArray: IStatForDay[]) {
  const labels = longTermArray.map((item) => item.date);
  return {
    labels,
    datasets: [
      {
        label: 'Количество новых слов',
        data: longTermArray.map((item) => item.newWordsCount),
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      },
      {
        label: 'Общее количество изученных слов',
        data: longTermArray.map((item) => item.learnedWordsCount),
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
      },
    ],
  };
}

export default function LongTermStatistics({ stat, currentNewWordsCount }: ILongTermStatProps) {
  const { learnedWords, optional } = stat;
  const longTermArray: IStatForDay[] = JSON.parse(optional.longTerm);
  const currentStat: IStatForDay = {
    date: new Date(optional.current.timestamp).toLocaleDateString(),
    newWordsCount: currentNewWordsCount,
    learnedWordsCount: learnedWords,
  };
  longTermArray.push(currentStat);

  return <Bar style={{ minWidth: '400px' }} options={options} data={createData(longTermArray)} />;
}
