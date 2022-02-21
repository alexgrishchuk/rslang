import { getUserIdFromStorage } from '../storage/storage';
import { request } from './utils/common-request';
import ENDPOINTS from './data/endpoints';
import { WordInfo } from './words-requests';

const WORDS_PER_PAGE_DEFAULT = 20;

interface ICount {
  count: number;
}

export interface IAgrWords {
  paginatedResults: Array<WordInfo>;
  totalCount: Array<ICount>;
}

async function getUserAggregatedWords(
  userId: string,
  group: number,
  page: number,
  wordsPerPage: number,
  filter: string
): Promise<IAgrWords[] | null> {
  const init: RequestInit = {
    method: 'GET',
  };

  const requestInfo = `${ENDPOINTS.getAggregatedWords(
    userId
  )}?group=${group}&page=${page}&wordsPerPage=${wordsPerPage}&filter=${filter}`;
  const response = await request(requestInfo, init);

  return response && response.ok ? response.json() : null;
}

export async function getCurrentUserAggregatedWords(group: number, page: number, wordsPerPage: number, filter: string) {
  const userId = getUserIdFromStorage();
  return userId !== null ? getUserAggregatedWords(userId, group, page, wordsPerPage, filter) : null;
}

export async function isAllWordsOnPageLearned(
  group: number,
  page: number,
  wordsPerPage: number = WORDS_PER_PAGE_DEFAULT
): Promise<boolean> {
  const wordsArray = await getCurrentUserAggregatedWords(
    group,
    page,
    wordsPerPage,
    `{"userWord.optional.isLearned":true}`
  );
  
  return !!wordsArray && !!wordsArray[0].totalCount.length && wordsArray[0].totalCount[0].count >= wordsPerPage;
}
