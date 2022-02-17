import { getUserIdFromStorage } from '../storage/storage';
import { request } from './utils/common-request';
import ENDPOINTS from './data/endpoints';
import { WordInfo } from './words-requests';

interface ICount {
  count: number;
}
export interface IAgrWords {
  paginatedResults: Array<WordInfo>;
  totalCount: Array<ICount>;
}

export async function getCurrentAggregatedWords(): Promise<IAgrWords[]> {
  const userId = getUserIdFromStorage();
  let response;
  const init: RequestInit = {
    method: 'GET',
  };

  if (userId) {
    response = await request(ENDPOINTS.getAggregatedWords(userId), init);
  }
  return response && response.ok ? response.json() : null;
}
