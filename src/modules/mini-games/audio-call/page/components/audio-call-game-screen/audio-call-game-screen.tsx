import { Typography } from '@mui/material';
import React, { MouseEventHandler, useState } from 'react';
import { WordInfo } from '../../../../../../backend-requests/words-requests';
import AudioCallGameFinishScreen from './audio-call-game-finish-screen';

interface IAudioCallGameScreen {
  section: number;
  wrongAnswers: string[];
  words: WordInfo[];
}

const LIMIT = 5;

function AudioCallGameScreen(props: IAudioCallGameScreen) {
  const { section, wrongAnswers, words } = props;
  const [selected, setSelected] = useState<boolean | null>(null);
  const [selectedAnswers, setSelectedAnswers] = useState<boolean[]>([]);
  const [count, setCounter] = useState<number>(0);
  const [rightWords, setRightWord] = useState<string[]>([]);
  const [falseWords, setFalseWord] = useState<string[]>([]);
  function shuffleWords(arr: string[]): string[] {
    return arr.sort(() => (Math.random() > 0.5 ? -1 : 1));
  }
  const cutWrongAnswers = shuffleWords(wrongAnswers).slice(wrongAnswers.length - 4);
  const answers: string[] = shuffleWords([...cutWrongAnswers, words[count].wordTranslate]);

  function answerHandler(event: MouseEvent) {
    const selectedAnswer = (event?.target as HTMLButtonElement).textContent || '';
    if (words[count].wordTranslate === selectedAnswer) {
      setSelected(true);
      setSelectedAnswers([...selectedAnswers, true]);
      setRightWord([...rightWords, selectedAnswer]);
    } else {
      setSelected(false);
      setSelectedAnswers([...selectedAnswers, false]);
      setFalseWord([...falseWords, selectedAnswer]);
    }
  }

  function nextHandler() {
    setCounter(count + 1);
    setSelected(null);
  }

  function notKnowHandler() {
    setSelected(false);
    setSelectedAnswers([...selectedAnswers, false]);
  }

  const isGameFinished = selectedAnswers.length === LIMIT;
  return (
    <>
      {!isGameFinished && (
        <>
          {selected !== null && <div>answer {selected ? '✓' : '❌'}</div>}
          <h1>{section}</h1>
          {selected !== null && (
            <button
              type="button"
              className="resume"
              onClick={nextHandler as unknown as MouseEventHandler<HTMLButtonElement>}
            >
              продолжай
            </button>
          )}
          <Typography>{words[count].word}</Typography>
          <button type="button">Play</button>
          {answers.map((answer) => (
            <button
              key={`key_${answer}`}
              type="button"
              onClick={answerHandler as unknown as MouseEventHandler<HTMLButtonElement>}
              disabled={selected !== null}
            >
              {answer}
            </button>
          ))}
          <button type="button" onClick={notKnowHandler} disabled={selected !== null}>
            Не знаю
          </button>
        </>
      )}
      {isGameFinished && (
        <AudioCallGameFinishScreen trueAnswers={rightWords} falseAnswers={falseWords} allAnswers={selectedAnswers} />
      )}
    </>
  );
}
export default AudioCallGameScreen;
