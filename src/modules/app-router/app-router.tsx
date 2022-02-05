import React from 'react';
import { useRoutes } from 'react-router-dom';
import ResponsiveAppBar from '../shared/main-menu/main-menu';
import routes from './routes';

function AppRouter() {
  return (
    <div className="App">
      <ResponsiveAppBar />
      {useRoutes(routes)}
    </div>
  );
}

export default AppRouter;
