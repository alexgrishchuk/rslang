import ENDPOINTS from './data/endpoints';
import { request } from './utils/common-request';
import { getUserIdFromStorage } from '../storage/storage';

const EASY_RIGHT_SEQUENCE = 3;
const HARD_RIGHT_SEQUENCE = 5;

export interface IUserWordInfo {
  difficulty: 'hard' | 'easy';
  optional: {
    isLearned: boolean;
    isNew: boolean;
    attempts: number;
    rightAnswers: number;
    rightSequence: number;
  };
}

interface IPartialUserWordInfo {
  difficulty: 'hard' | 'easy';
  optional?: {
    isLearned?: boolean;
    isNew?: boolean;
    attempts?: number;
    rightAnswers?: number;
    rightSequence?: number;
  };
}

async function getAllUserWords(userId: string): Promise<IUserWordInfo[] | null> {
  const init: RequestInit = {
    method: 'GET',
  };

  const response = await request(ENDPOINTS.getAllUserWords(userId), init);

  return response && response.ok ? response.json() : null;
}

export async function getAllCurrentUserWords(): Promise<IUserWordInfo[] | null> {
  const userId = getUserIdFromStorage();
  return userId !== null ? getAllUserWords(userId) : null;
}

async function createUserWord(
  userId: string,
  wordId: string,
  {
    difficulty,
    optional: { isLearned = false, isNew = false, attempts = 0, rightAnswers = 0, rightSequence = 0 } = {},
  }: IPartialUserWordInfo | IUserWordInfo
): Promise<boolean> {
  const info: IUserWordInfo = {
    difficulty,
    optional: {
      isLearned,
      isNew,
      attempts,
      rightAnswers,
      rightSequence,
    },
  };
  const init: RequestInit = {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(info),
  };

  const response = await request(ENDPOINTS.createUserWord(userId, wordId), init);
  return Boolean(response && response.ok);
}

async function createCurrentUserWord(wordId: string, info: IPartialUserWordInfo | IUserWordInfo): Promise<boolean> {
  const userId = getUserIdFromStorage();
  return userId !== null ? createUserWord(userId, wordId, info) : false;
}

async function getUserWord(userId: string, wordId: string): Promise<IUserWordInfo | null> {
  const init: RequestInit = { method: 'GET' };

  const response = await request(ENDPOINTS.getUserWord(userId, wordId), init);
  return response && response.ok ? response.json() : null;
}

export async function getCurrentUserWord(wordId: string): Promise<IUserWordInfo | null> {
  const userId = getUserIdFromStorage();
  return userId !== null ? getUserWord(userId, wordId) : null;
}

async function updateUserWord(
  userId: string,
  wordId: string,
  info: IPartialUserWordInfo | IUserWordInfo
): Promise<boolean> {
  const init: RequestInit = {
    method: 'PUT',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(info),
  };

  const response = await request(ENDPOINTS.updateUserWord(userId, wordId), init);
  return Boolean(response && response.ok);
}

export async function updateCurrentUserWord(
  wordId: string,
  info: IPartialUserWordInfo | IUserWordInfo
): Promise<boolean> {
  const userId = getUserIdFromStorage();
  return userId !== null ? updateUserWord(userId, wordId, info) : false;
}

export async function setWordToHard(wordId: string): Promise<boolean> {
  const currentWord = await getCurrentUserWord(wordId);
  const optional = currentWord ? { ...currentWord.optional, isLearned: false } : { isLearned: false };
  const wordInfo: IPartialUserWordInfo = { difficulty: 'hard', optional };

  return currentWord ? updateCurrentUserWord(wordId, wordInfo) : createCurrentUserWord(wordId, wordInfo);
}

export async function setWordToEasy(wordId: string): Promise<boolean> {
  const currentWord = await getCurrentUserWord(wordId);

  if (currentWord) {
    const {
      optional: { rightSequence },
    }: IUserWordInfo = currentWord;

    const optional = { ...currentWord.optional, isLearned: rightSequence >= EASY_RIGHT_SEQUENCE };

    return updateCurrentUserWord(wordId, { difficulty: 'easy', optional });
  }

  return createCurrentUserWord(wordId, { difficulty: 'easy' });
}

export async function setWordToLearned(wordId: string): Promise<boolean> {
  const currentWord = await getCurrentUserWord(wordId);
  const optional = currentWord ? { ...currentWord.optional, isLearned: true } : { isLearned: true };
  const wordInfo: IPartialUserWordInfo = { difficulty: 'easy', optional };

  return currentWord ? updateCurrentUserWord(wordId, wordInfo) : createCurrentUserWord(wordId, wordInfo);
}

export async function setWordToNew(wordId: string, isRight: boolean): Promise<{ isNew: boolean; isSetToNew: boolean }> {
  const currentWord = await getCurrentUserWord(wordId);
  if (currentWord) {
    const {
      difficulty,
      optional: { isLearned, isNew, attempts, rightAnswers, rightSequence },
    }: IUserWordInfo = currentWord;
    const countForLearned = difficulty === 'easy' ? EASY_RIGHT_SEQUENCE : HARD_RIGHT_SEQUENCE;

    const updatedAttempts = attempts + 1;
    const updatedRightAnswers = rightAnswers + +isRight;
    const updatedRightSequence = isRight ? rightSequence + 1 : 0;
    const updatedIsLearned = isRight && (isLearned || updatedRightSequence >= countForLearned);
    const updatedDifficulty = updatedIsLearned ? 'easy' : difficulty;

    const wordInfo: IUserWordInfo = {
      difficulty: updatedDifficulty,
      optional: {
        isLearned: updatedIsLearned,
        isNew: true,
        attempts: updatedAttempts,
        rightAnswers: updatedRightAnswers,
        rightSequence: updatedRightSequence,
      },
    };

    const result = await updateCurrentUserWord(wordId, wordInfo);
    return { isNew: !isNew && result, isSetToNew: result };
  }

  const wordInfo: IUserWordInfo = {
    difficulty: 'easy',
    optional: {
      isLearned: isRight && EASY_RIGHT_SEQUENCE <= 1,
      isNew: true,
      attempts: 1,
      rightAnswers: +isRight,
      rightSequence: +isRight,
    },
  };

  const result = await createCurrentUserWord(wordId, wordInfo);
  return { isNew: result, isSetToNew: result };
}
