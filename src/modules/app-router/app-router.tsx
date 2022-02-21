import React, { useState } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import ResponsiveAppBar from '../main-menu/main-menu';
import PAGES from '../shared/data/pages';
import { removeUserInfoFromStorage, isUserAuthenticated } from '../../storage/storage';

import Main from '../main/page/main';
import Tutorial from '../tutorial/page/tutorial';
import Sprint from '../mini-games/sprint/page/sprint';
import AudioCall from '../mini-games/audio-call/page/audio-call';
import Statistics from '../statistics/page/statistics';
import AboutTeam from '../about-team/page/about-team';
import Race from '../mini-games/race/page/race';

function AppRouter() {
  const [isAuthenticated, setAuthenticated] = useState(isUserAuthenticated());
  const navigate = useNavigate();

  const LogInUser = () => {
    setAuthenticated(true);
  };

  const LogOutUser = () => {
    setAuthenticated(false);
    removeUserInfoFromStorage();
    navigate(PAGES.MAIN.path);
  };

  return (
    <div className="App">
      <ResponsiveAppBar isAuthenticated={isAuthenticated} onLogIn={LogInUser} onLogOut={LogOutUser} />
      <Routes>
        <Route path={PAGES.MAIN.path} element={<Main />} />
        <Route path={PAGES.TUTORIAL.path} element={<Tutorial isAuthenticated={isAuthenticated} />} />
        <Route path={PAGES.AUDIO_CALL.path} element={<AudioCall />} />
        <Route path={PAGES.SPRINT.path} element={<Sprint />} />
        <Route path={PAGES.RACE.path} element={<Race />} />
        <Route path={PAGES.STATISTICS.path} element={<Statistics isAuthenticated={isAuthenticated} />} />
        <Route path={PAGES.ABOUT_TEAM.path} element={<AboutTeam />} />
      </Routes>
    </div>
  );
}

export default AppRouter;
