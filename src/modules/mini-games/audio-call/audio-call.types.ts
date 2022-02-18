import { WordInfo } from '../../../backend-requests/words-requests';

export interface IStatistic {
  word: WordInfo;
  answer: string;
  result: boolean;
}
