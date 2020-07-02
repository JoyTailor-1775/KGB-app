import React, { Component } from 'react';
import '../../global/stylesheets/page.scss';
import StatsTable from '../../components/StatsTable/StatsTable';

export default class StatsPage extends Component {
  render(): JSX.Element {
    return (
      <main className="page">
        <div className="stats-container">
          <StatsTable />
        </div>
      </main>
    );
  }
}
