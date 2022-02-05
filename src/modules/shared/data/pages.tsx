import React from 'react';
import Main from '../../main/page/main';
import Tutorial from '../../tutorial/page/tutorial';
import AudioCall from '../../mini-games/audio-call/page/audio-call';
import Sprint from '../../mini-games/sprint/page/sprint';
import Statistics from '../../statistics/page/statistics';
import AboutTeam from '../../about-team/page/about-team';

const PAGES = {
  MAIN: { title: 'Главная', path: '/', element: <Main /> },
  TUTORIAL: { title: 'Учебник', path: 'tutorial', element: <Tutorial /> },
  AUDIO_CALL: { title: 'Аудиовызов', path: 'audio-call', element: <AudioCall /> },
  SPRINT: { title: 'Спринт', path: 'sprint', element: <Sprint /> },
  STATISTICS: { title: 'Статистика', path: 'statistics', element: <Statistics /> },
  ABOUT_TEAM: { title: 'О команде', path: 'about-team', element: <AboutTeam /> },
};

export default PAGES;
