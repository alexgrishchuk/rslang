import ENDPOINTS from './data/endpoints';
import { request } from './utils/common-request';
import { WordInfo } from './words-requests';
import { setWordToNew } from './user-words-requests';
import { getUserIdFromStorage } from '../storage/storage';

interface IUserStatistics {
  learnedWords: number;
  optional: {
    current: {
      date: string;
      audioCall: {
        newWordsCount: number;
        rightAnswersCount: number;
        answersCount: number;
        longestRightSequence: number;
      };
      sprint: {
        newWordsCount: number;
        rightAnswersCount: number;
        answersCount: number;
        longestRightSequence: number;
      };
    };
  };
}

function createDefaultStatistics(): IUserStatistics {
  return {
    learnedWords: 0,
    optional: {
      current: {
        date: '',
        audioCall: {
          newWordsCount: 0,
          rightAnswersCount: 0,
          answersCount: 0,
          longestRightSequence: 0,
        },
        sprint: {
          newWordsCount: 0,
          rightAnswersCount: 0,
          answersCount: 0,
          longestRightSequence: 0,
        },
      },
    },
  };
}

async function getUserStatistics(userId: string): Promise<IUserStatistics | null> {
  const init: RequestInit = { method: 'GET' };

  const response = await request(ENDPOINTS.getUserStatistics(userId), init);
  return response && response.ok ? response.json() : null;
}

export async function getCurrentUserStatistics(): Promise<IUserStatistics | null> {
  const userId = getUserIdFromStorage();
  return userId !== null ? getUserStatistics(userId) : null;
}

async function saveUserStatistics(userId: string, statistics: IUserStatistics): Promise<boolean> {
  const init: RequestInit = {
    method: 'PUT',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(statistics),
  };

  const response = await request(ENDPOINTS.saveUserStatistics(userId), init);
  return Boolean(response && response.ok);
}

async function saveCurrentUserStatistics(statistics: IUserStatistics): Promise<boolean> {
  const userId = getUserIdFromStorage();
  return userId !== null ? saveUserStatistics(userId, statistics) : false;
}

export async function saveGameStatistics(
  gameType: 'audioCall' | 'sprint',
  gameLongestRightSequence: number,
  statArray: { word: WordInfo; answer: string; result: boolean }[]
): Promise<boolean> {
  const backendStatistics = await getCurrentUserStatistics();
  const currentStatistics = backendStatistics || createDefaultStatistics();
  const { newWordsCount, rightAnswersCount, answersCount, longestRightSequence } =
    currentStatistics.optional.current[gameType];

  const gameAnswersCount = statArray.length;
  let gameRightAnswersCount = 0;
  let gameNewWordsCount = 0;
  statArray.forEach(async (playedWord) => {
    gameRightAnswersCount += +playedWord.result;
    const result = await setWordToNew(playedWord.word.id, playedWord.result);
    gameNewWordsCount += +result.isNew;
  });

  const updatedGameStat = {
    newWordsCount: newWordsCount + gameNewWordsCount,
    rightAnswersCount: rightAnswersCount + gameRightAnswersCount,
    answersCount: answersCount + gameAnswersCount,
    longestRightSequence: Math.max(longestRightSequence, gameLongestRightSequence),
  };

  currentStatistics.optional.current[gameType] = updatedGameStat;
  return saveCurrentUserStatistics(currentStatistics);
}
