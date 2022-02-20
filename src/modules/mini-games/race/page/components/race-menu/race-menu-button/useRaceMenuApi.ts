import { useEffect, useState } from 'react';
import { getWords, WordInfo } from '../../../../../../../backend-requests/words-requests';

function useRaceMenuApi(group: number) {
  const [words, setWords] = useState<WordInfo[]>([]);
  const [wrongAnswers, setWrongAnswers] = useState<string[]>([]);

  useEffect(() => {
    if (group) {
      const pageNumber = Math.trunc(Math.random() * 9.99);
      const pageNumberForWrong = pageNumber + 10;
      getWords(group - 1, pageNumber).then((data) => setWords(data));
      getWords(group - 1, pageNumberForWrong).then((data) => setWrongAnswers(data.map((word) => word.wordTranslate)));
    }
  }, [group]);

  return { words, wrongAnswers };
}
export default useRaceMenuApi;
