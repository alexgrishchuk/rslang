import React from 'react';

interface IAudioCallGameFinishScreen {
  trueAnswers: string[];
  falseAnswers: string[];
  allAnswers: boolean[];
}

function AudioCallGameFinishScreen(props: IAudioCallGameFinishScreen) {
  const { trueAnswers, falseAnswers, allAnswers } = props;
  function getSeries() {
    const arr: number[] = [];
    let acc = 0;
    allAnswers.forEach((value) => {
      if (value) {
        acc += 1;
      } else {
        arr.push(acc);
        acc = 0;
      }
    });
    arr.push(acc);
    return Math.max(...arr);
  }
  console.log(allAnswers);
  return (
    <>
      {' '}
      <div>Не правильных ответов {falseAnswers.length}</div>
      {falseAnswers.map((answer) => (
        <div>{answer}</div>
      ))}
      <div>Правильных ответов {trueAnswers.length}</div>
      {trueAnswers.map((answer) => (
        <div>{answer}</div>
      ))}
      <div>Самая длинная серия {getSeries()}</div>
    </>
  );
}
export default AudioCallGameFinishScreen;
