import ENDPOINTS from './data/endpoints';

export type WordInfo = {
  id: string;
  group: number;
  page: number;
  word: string;
  image: string;
  audio: string;
  audioMeaning: string;
  audioExample: string;
  textMeaning: string;
  textExample: string;
  transcription: string;
  wordTranslate: string;
  textMeaningTranslate: string;
  textExampleTranslate: string;
};

export async function getWords(group: number, page: number): Promise<WordInfo[]> {
  return (await fetch(`${ENDPOINTS.words}?group=${group}&page=${page}`)).json();
}

export async function getWordById(wordId: string): Promise<WordInfo> {
  return (await fetch(ENDPOINTS.wordById(wordId))).json();
}
