interface ICategories {
  id: number;
  name: string;
  color: string;
}

const URL_PATH = 'http://localhost:8000/';

const CATEGORIES: ICategories[] = [
  { id: 0, name: 'Раздел 1', color: '#df8ae5' },
  { id: 1, name: 'Раздел 2', color: '#ffc107' },
  { id: 2, name: 'Раздел 3', color: '#ff9800' },
  { id: 3, name: 'Раздел 4', color: '#f57c00' },
  { id: 4, name: 'Раздел 5', color: '#8bc34a' },
  { id: 5, name: 'Раздел 6', color: '#4caf50' },
  { id: 6, name: 'Сложные слова', color: '#d50000' },
];

export { CATEGORIES, URL_PATH };
