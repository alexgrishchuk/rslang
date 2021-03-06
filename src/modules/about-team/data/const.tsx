interface IPeople {
  id: number;
  name: string;
  position: string;
  nameGithub: string;
  skills: Array<string>;
}

const PEOPLE: IPeople[] = [
  {
    id: 0,
    name: 'Александр',
    position: 'Team Lead, developer',
    nameGithub: 'alexgrishchuk',
    skills: ['Меню', 'Авторизация', 'Прогресс изучения', 'cтраница "Cтатистика"', 'Изученные слова'],
  },
  {
    id: 1,
    name: 'Марина',
    position: 'Developer',
    nameGithub: 'LukashkinaMarina',
    skills: [
      'Мини-игра "Аудиовызов"',
      'Мини-игра "Спринт"',
      'Мини-игра "Гонка"',
      'Прогресс изучения',
      'Изученные слова',
    ],
  },
  {
    id: 2,
    name: 'Сергей',
    position: 'Developer',
    nameGithub: 'barclays13',
    skills: ['Главная страница', 'Электронный учебник', 'Список слов', 'Страница "О команде""', 'Изученные слова'],
  },
];

export { PEOPLE };
export type { IPeople };
