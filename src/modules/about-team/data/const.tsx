interface IPeople {
  id: number;
  name: string;
  position: string;
  nameGithub: string;
  skills: Array<string>;
  urlImage: string;
}

const PEOPLE: IPeople[] = [
  {
    id: 0,
    name: 'Александ',
    position: 'Team Lead, developer',
    nameGithub: 'alexgrishchuk',
    skills: ['Главная страница', 'Авторизация', 'Прогресс изучения', 'cтраница "Cтатистика"', 'Изученные слова'],
    urlImage: 'files/team/alex.png',
  },
  {
    id: 1,
    name: 'Марина',
    position: 'Developer',
    nameGithub: 'LukashkinaMarina',
    skills: ['Мини-игра "Аудиовызов"', 'Мини-игра "Спринт"', 'Прогресс изучения', 'Изученные слова'],
    urlImage: 'files/team/marina.png',
  },
  {
    id: 2,
    name: 'Сергей',
    position: 'Developer',
    nameGithub: 'barclays13',
    skills: ['Главная страница', 'Электронный учебник', 'Список слов', 'Страница "О команде""', 'Изученные слова'],
    urlImage: 'files/team/sergey.jpg',
  },
];

export { PEOPLE };
export type { IPeople };
