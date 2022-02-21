import { saveCurrentUserStatistics, getUpdatedStatistics } from './user-statistics';
import { WordInfo } from './words-requests';
import { saveWordGameResult } from './user-words-requests';

export default async function saveGameStatistics(
  gameType: 'audioCall' | 'sprint' | 'race',
  gameLongestRightSequence: number,
  statArray: { word: WordInfo; result: boolean }[]
): Promise<boolean> {
  const currentStatistics = await getUpdatedStatistics();
  const { newWordsCount, rightAnswersCount, answersCount, longestRightSequence } =
    currentStatistics.optional.current[gameType];

  const gameAnswersCount = statArray.length;
  const gameRightAnswersCount = statArray.reduce((count, current) => count + +current.result, 0);

  const promiseArray = statArray.map((playedWord) => saveWordGameResult(playedWord.word.id, playedWord.result));
  const results = await Promise.all(promiseArray);
  const gameNewWordsCount = results.reduce((count, current) => count + +current.isNew, 0);
  const gameLearnedWordsCount = results.reduce((count, current) => count + current.learnCount, 0);

  const updatedGameStat = {
    newWordsCount: newWordsCount + gameNewWordsCount,
    rightAnswersCount: rightAnswersCount + gameRightAnswersCount,
    answersCount: answersCount + gameAnswersCount,
    longestRightSequence: Math.max(longestRightSequence, gameLongestRightSequence),
  };

  currentStatistics.optional.current[gameType] = updatedGameStat;
  const { optional } = currentStatistics;
  let { learnedWords } = currentStatistics;
  optional.current.learnWordsCount += gameLearnedWordsCount;
  learnedWords += gameLearnedWordsCount;

  return saveCurrentUserStatistics({ learnedWords, optional });
}
