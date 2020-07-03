import React from 'react';
import { connect } from 'react-redux';
import { Table, TableColumn } from '../common/Table/Table';
import { FamiliesStats } from '../../global/types/Family';
import './StatsTable.scss';
import { RootState } from '../../store/types';
import familySelectors from '../../store/families/selectors';

const tableColumns: TableColumn[] = [
  { heading: 'Status', dataKey: 'status', width: '90px' },
  { heading: 'Primary', dataKey: 'primary', width: '90px' },
  { heading: 'Primary + Spouse', dataKey: 'primarySpouse', width: '100px' },
  {
    heading: 'Primary + Spouse + Children',
    dataKey: 'primarySpouseChildren',
    width: '120px',
  },
];

type Props = {
  familiesStats: FamiliesStats[];
};

const StatsTable = (props: Props): JSX.Element => {
  return (
    <div className="stats-table__container">
      <Table columns={tableColumns} data={props.familiesStats} theme="grey" />
    </div>
  );
};

const mapStateToProps = (state: RootState) => ({
  familiesStats: familySelectors.getFamiliesStatistics(state.families),
});

export default connect(mapStateToProps)(StatsTable);
