import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { Routes } from './config/routes';
import CardsPage from './pages/CardsPage';
import StatsPage from './pages/StatsPage';

function App() {
  return (
    <Switch>
      <Route path={Routes.CARDS} component={CardsPage} />
      <Route path={Routes.STATS} component={StatsPage} />
      <Redirect to={Routes.CARDS} />
    </Switch>
  );
}

export default App;
