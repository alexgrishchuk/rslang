import { WordInfo } from '../../../backend-requests/words-requests';

export const URL_PATH = 'http://localhost:8000/';
export interface IStatistic {
  word: WordInfo;
  answer: string;
  result: boolean;
}
