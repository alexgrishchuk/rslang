import { getUserIdFromStorage } from '../storage/storage';
import { request } from './utils/common-request';
import ENDPOINTS from './data/endpoints';
import { WordInfo, getWords } from './words-requests';
import config from '../config.json';

const WORDS_PER_PAGE_DEFAULT = +config.wordsPerPageDefault;
const PAGES_COUNT = +config.pagesCount;
const WORDS_PER_GROUP = WORDS_PER_PAGE_DEFAULT * PAGES_COUNT;

interface ModifiedWordInfo extends Omit<WordInfo, 'id'> {
  _id: string;
}

interface ICount {
  count: number;
}

export interface IAgrWords {
  paginatedResults: Array<ModifiedWordInfo>;
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

async function getCurrentUserAggregatedWords(
  group: number,
  page: number,
  wordsPerPage: number,
  filter: string
): Promise<IAgrWords[] | null> {
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
    `{"$and":[{"userWord.optional.isLearned":true}, {"group":${group}}, {"page":${page}}]}`
  );

  return !!wordsArray && !!wordsArray[0].totalCount.length && wordsArray[0].totalCount[0].count >= wordsPerPage;
}

async function getUserUserWordsByGroup(
  userId: string,
  group: number,
  wordsPerPage: number,
  filter: string
): Promise<IAgrWords[] | null> {
  const init: RequestInit = {
    method: 'GET',
  };

  const requestInfo = `${ENDPOINTS.getAggregatedWords(
    userId
  )}?group=${group}&wordsPerPage=${wordsPerPage}&filter=${filter}`;
  const response = await request(requestInfo, init);

  return response && response.ok ? response.json() : null;
}

async function getCurrentUserWordsByGroup(
  group: number,
  wordsPerPage: number,
  filter: string
): Promise<IAgrWords[] | null> {
  const userId = getUserIdFromStorage();
  return userId !== null ? getUserUserWordsByGroup(userId, group, wordsPerPage, filter) : null;
}

export async function getNotLearnedWords(group: number, page: number, wordsCount: number): Promise<WordInfo[]> {
  const learnedWordsArray = await getCurrentUserWordsByGroup(
    group,
    WORDS_PER_GROUP,
    `{"$and":[{"userWord.optional.isLearned":true}, {"group":${group}}]}`
  );

  const promises: Promise<WordInfo[]>[] = [];
  for (let i = 0; i <= page; i += 1) {
    promises.push(getWords(group, i));
  }

  const allWordsToPage = (await Promise.all(promises)).reduce((prev, item) => prev.concat(item), []);

  const learnedWordsIdArray = learnedWordsArray ? learnedWordsArray[0].paginatedResults.map((word) => word._id) : [];
  const learnedWordsSet = new Set(learnedWordsIdArray);

  const resultArray: WordInfo[] = [];
  let currentPage = page;
  const filterFunction = (word: WordInfo) => word.page === currentPage && !learnedWordsSet.has(word.id);

  do {
    const notLearnedArray = allWordsToPage.filter(filterFunction);
    const addSize = wordsCount - resultArray.length;
    resultArray.push(...notLearnedArray.slice(0, addSize));
    currentPage -= 1;
  } while (currentPage >= 0 && resultArray.length < wordsCount);

  return resultArray;
}
