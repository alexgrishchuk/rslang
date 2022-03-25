import ENDPOINTS from './data/endpoints';
import { request } from './utils/common-request';
import { getUserIdFromStorage } from '../storage/storage';

export interface IStatForDay {
  date: string;
  newWordsCount: number;
  learnedWordsCount: number;
}

export interface IGameStatistics {
  newWordsCount: number;
  rightAnswersCount: number;
  answersCount: number;
  longestRightSequence: number;
}

export interface IUserStatistics {
  learnedWords: number;
  optional: {
    current: {
      learnWordsCount: number;
      timestamp: number;
      audioCall: IGameStatistics;
      sprint: IGameStatistics;
      race: IGameStatistics;
    };
    longTerm: string;
  };
}

export function createDefaultStatistics(): IUserStatistics {
  return {
    learnedWords: 0,
    optional: {
      current: {
        learnWordsCount: 0,
        timestamp: 0,
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
        race: {
          newWordsCount: 0,
          rightAnswersCount: 0,
          answersCount: 0,
          longestRightSequence: 0,
        },
      },
      longTerm: '[]',
    },
  };
}

export async function getUserStatistics(userId: string): Promise<IUserStatistics | null> {
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

export async function saveCurrentUserStatistics(statistics: IUserStatistics): Promise<boolean> {
  const userId = getUserIdFromStorage();
  return userId !== null ? saveUserStatistics(userId, statistics) : false;
}

async function updateLongTermStatistics(currentStatistics: IUserStatistics): Promise<boolean> {
  const { learnedWords, optional } = currentStatistics;
  const newWordsCount =
    optional.current.audioCall.newWordsCount +
    optional.current.sprint.newWordsCount +
    optional.current.race.newWordsCount;
  const newDate = new Date(optional.current.timestamp);
  const learnedWordsCount = learnedWords;

  const statForDay: IStatForDay = {
    date: newDate.toLocaleDateString(),
    newWordsCount,
    learnedWordsCount,
  };

  const longTermArray: IStatForDay[] = JSON.parse(optional.longTerm);
  longTermArray.push(statForDay);
  optional.longTerm = JSON.stringify(longTermArray);
  optional.current = createDefaultStatistics().optional.current;
  optional.current.timestamp = Date.now();

  return saveCurrentUserStatistics({ learnedWords, optional });
}

function isSameDay(firstTimestamp: number, secondTimestamp: number): boolean {
  const firstDate = new Date(firstTimestamp);
  const secondDate = new Date(secondTimestamp);
  return (
    firstDate.getFullYear() === secondDate.getFullYear() &&
    firstDate.getMonth() === secondDate.getMonth() &&
    firstDate.getDate() === secondDate.getDate()
  );
}

export async function getUpdatedStatistics(): Promise<IUserStatistics> {
  const newTimestamp = Date.now();
  let backendStatistics = await getCurrentUserStatistics();

  if (backendStatistics) {
    const prevTimestamp = backendStatistics.optional.current.timestamp;
    const isSameStatDay = isSameDay(prevTimestamp, newTimestamp);
    if (!isSameStatDay) {
      await updateLongTermStatistics(backendStatistics);
      backendStatistics = await getCurrentUserStatistics();
    }
  }

  const currentStatistics = backendStatistics || createDefaultStatistics();
  currentStatistics.optional.current.timestamp = newTimestamp;
  return currentStatistics;
}

export async function changeLearnedWordsCount(diffCount: number): Promise<boolean> {
  const currentStatistics = await getUpdatedStatistics();
  currentStatistics.learnedWords += diffCount;
  currentStatistics.optional.current.learnWordsCount += diffCount;
  return saveCurrentUserStatistics({
    learnedWords: currentStatistics.learnedWords,
    optional: currentStatistics.optional,
  });
}
