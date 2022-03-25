import PAGES from '../../modules/shared/data/pages';
import ENDPOINTS from '../data/endpoints';
import {
  getTokenFromStorage,
  getRefreshTokenFromStorage,
  UserTokens,
  saveTokensToStorage,
  getUserIdFromStorage,
  removeUserInfoFromStorage,
} from '../../storage/storage';

export interface IRequestArgs {
  userId: string;
  [propName: string]: string;
}

async function getNewTokens(): Promise<UserTokens | null> {
  const refreshToken = getRefreshTokenFromStorage();

  if (refreshToken === null) {
    return null;
  }

  const userId = getUserIdFromStorage();

  if (userId === null) {
    return null;
  }

  const response = await fetch(`${ENDPOINTS.getNewTokens(userId)}`, {
    method: 'GET',
    headers: { Authorization: `Bearer ${refreshToken}` },
  });

  return response.ok ? response.json() : null;
}

async function updateTokens(): Promise<void> {
  const newTokens = await getNewTokens();
  if (newTokens !== null) {
    saveTokensToStorage(newTokens);
  } else {
    removeUserInfoFromStorage();
    window.location.pathname = PAGES.MAIN.path;
  }
}

export async function request(info: RequestInfo, init: RequestInit): Promise<Response | null> {
  let token = getTokenFromStorage();
  if (token === null) {
    return null;
  }

  const newHeaders = { headers: { ...init.headers, ...{ Authorization: `Bearer ${token}` } } };

  const updatedInit: RequestInit = { ...init, ...newHeaders };

  const response = await fetch(info, updatedInit);

  if (response.status !== 401) {
    return response;
  }

  await updateTokens();

  token = getTokenFromStorage();

  return token !== null ? fetch(info, updatedInit) : null;
}
