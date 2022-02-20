import ENDPOINTS from './data/endpoints';
import { request } from './utils/common-request';
import { saveUserInfoToStorage, removeUserInfoFromStorage, getUserIdFromStorage } from '../storage/storage';

interface IUser {
  id: string;
  name: string;
  email: string;
}

export async function createUser(name: string, email: string, password: string): Promise<Response> {
  const response = await fetch(ENDPOINTS.createUser, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ name, email, password }),
  });
  return response;
}

export async function getUser(userId: string): Promise<IUser | null> {
  const init: RequestInit = {
    method: 'GET',
  };

  const response = await request(ENDPOINTS.getUser(userId), init);
  return response && response.ok ? response.json() : null;
}

async function updateUser(userId: string, name: string, email: string, password: string): Promise<boolean> {
  const init: RequestInit = {
    method: 'PUT',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ name, email, password }),
  };

  const response = await request(ENDPOINTS.updateUser(userId), init);
  return Boolean(response && response.ok);
}

export async function updateCurrentUser(name: string, email: string, password: string): Promise<boolean> {
  const userId = getUserIdFromStorage();
  return userId !== null ? updateUser(userId, name, email, password) : false;
}

async function deleteUser(userId: string): Promise<boolean> {
  const init: RequestInit = {
    method: 'DELETE',
  };

  const response = await request(ENDPOINTS.deleteUser(userId), init);
  return Boolean(response && response.ok);
}

export async function deleteCurrentUser(): Promise<boolean> {
  const userId = getUserIdFromStorage();
  return userId !== null ? deleteUser(userId) : false;
}

export async function signIn(email: string, password: string): Promise<boolean> {
  const response = await fetch(ENDPOINTS.signIn, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password }),
  });

  if (response.ok) {
    saveUserInfoToStorage(await response.json());
    return true;
  }

  removeUserInfoFromStorage();
  return false;
}
