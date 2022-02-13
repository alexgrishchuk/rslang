type UserInfo = {
  message: string;
  name: string;
  refreshToken: string;
  token: string;
  userId: string;
};

export type UserTokens = {
  token: string;
  userId: string;
};

function getUserInfoFromStorage(): UserInfo | null {
  const userInfoStr = localStorage.getItem('userInfo');
  if (userInfoStr) {
    return JSON.parse(userInfoStr);
  }

  return null;
}

export function getTokenFromStorage(): string | null {
  const userInfo = getUserInfoFromStorage();
  return userInfo ? userInfo.token : null;
}

export function getRefreshTokenFromStorage(): string | null {
  const userInfo = getUserInfoFromStorage();
  return userInfo ? userInfo.refreshToken : null;
}

export function saveTokensToStorage(newTokens: UserTokens): void {
  const userInfo = getUserInfoFromStorage();
  if (userInfo) {
    localStorage.setItem('userInfo', JSON.stringify({ ...userInfo, ...newTokens }));
  }
}

export function saveUserInfoToStorage(userInfo: UserInfo): void {
  localStorage.setItem('userInfo', JSON.stringify(userInfo));
}

export function removeUserInfoFromStorage(): void {
  localStorage.removeItem('userInfo');
}

export function getUserIdFromStorage(): string | null {
  const userInfo = getUserInfoFromStorage();
  return userInfo ? userInfo.userId : null;
}

export function isAuthenticated(): boolean {
  const userInfo = getUserInfoFromStorage();
  return !!(userInfo && userInfo.message === 'Authenticated');
}
