import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { routes } from './config/routes';
import Header from './components/Header';
import CardsPage from './pages/CardsPage';
import StatsPage from './pages/StatsPage';

function App() {
  return (
    <>
      <Header />
      <Switch>
        <Route path={routes.CARDS} component={CardsPage} />
        <Route path={routes.STATS} component={StatsPage} />
        <Redirect to={routes.CARDS} />
      </Switch>
    </>
  );
}

export default App;
