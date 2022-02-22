import { useEffect, useState } from 'react';
import { getWords, WordInfo } from '../../../../../../../backend-requests/words-requests';

function useCallMenuApi(group: number, page: number) {
  const [words, setWords] = useState<WordInfo[]>([]);
  const [wrongAnswers, setWrongAnswers] = useState<string[]>([]);

  useEffect(() => {
    if (group) {
      const pageNumber = !Number.isNaN(page) ? page : Math.trunc(Math.random() * 9.99);
      let pageNumberForWrong = pageNumber - 1;
      if (pageNumberForWrong < 0) {
        pageNumberForWrong = 1;
      }
      getWords(group - 1, pageNumber).then((data) => setWords(data));
      getWords(group - 1, pageNumberForWrong).then((data) => setWrongAnswers(data.map((word) => word.wordTranslate)));
    }
  }, [group, page]);

  return { words, wrongAnswers };
}
export default useCallMenuApi;
