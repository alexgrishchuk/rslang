import ENDPOINTS from './data/endpoints';
import { request } from './utils/common-request';
import { getUserIdFromStorage } from '../storage/storage';

interface IWordInfo {
  difficulty: string;
  optional: {
    [propName: string]: string;
  };
}

async function getAllUserWords(userId: string) {
  const init: RequestInit = {
    method: 'GET',
  };

  const response = await request(ENDPOINTS.getAllUserWords(userId), init);

  return response && response.ok ? response.json() : null;
}

export async function getAllCurrentUserWords() {
  const userId = getUserIdFromStorage();
  return userId !== null ? getAllUserWords(userId) : null;
}

async function createUserWord(userId: string, wordId: string, info: IWordInfo): Promise<boolean> {
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

export async function createCurrentUserWord(wordId: string, info: IWordInfo): Promise<boolean> {
  const userId = getUserIdFromStorage();
  return userId !== null ? createUserWord(userId, wordId, info) : false;
}
