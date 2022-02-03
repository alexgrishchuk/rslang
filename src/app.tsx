import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Main from './modules/main/page/main';
import Tutorial from './modules/tutorial/page/tutorial';
import Statistics from './modules/statistics/page/statistics';
import AboutTeam from './modules/about-team/page/about-team';

import './app.css';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="tutorial" element={<Tutorial />} />
          <Route path="statistics" element={<Statistics />} />
          <Route path="about-team" element={<AboutTeam />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
