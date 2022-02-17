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

async function removeUserWord(userId: string, wordId: string): Promise<boolean> {
  const init: RequestInit = { method: 'DELETE' };

  const response = await request(ENDPOINTS.removeUserWord(userId, wordId), init);
  return Boolean(response && response.ok);
}

export async function removeCurrentUserWord(wordId: string): Promise<boolean> {
  const userId = getUserIdFromStorage();
  return userId !== null ? removeUserWord(userId, wordId) : false;
}

async function getUserWord(userId: string, wordId: string): Promise<boolean> {
  const init: RequestInit = { method: 'GET' };

  const response = await request(ENDPOINTS.getUserWord(userId, wordId), init);
  return Boolean(response && response.ok);
}

export async function getCurrentUserWord(wordId: string): Promise<boolean> {
  const userId = getUserIdFromStorage();
  return userId !== null ? getUserWord(userId, wordId) : false;
}

async function putUserWord(userId: string, wordId: string, info: IWordInfo): Promise<boolean> {
  const init: RequestInit = {
    method: 'PUT',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(info),
  };

  const response = await request(ENDPOINTS.putUserWord(userId, wordId), init);
  return Boolean(response && response.ok);
}

export async function putCurrentUserWord(wordId: string, info: IWordInfo): Promise<boolean> {
  const userId = getUserIdFromStorage();
  return userId !== null ? putUserWord(userId, wordId, info) : false;
}
