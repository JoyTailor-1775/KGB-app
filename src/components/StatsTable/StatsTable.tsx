import React from 'react';
import { Table, TableColumn, TableTheme } from '../common/Table/Table';
import FamilyStatuses from '../../global/types/FamilyStatuses';
import './StatsTable.scss';

const testData: FamiliesStats[] = [
  {
    status: FamilyStatuses.APPROVED,
    primary: 4,
    primarySpouse: 2,
    primarySpouseChildren: 3,
  },
  {
    status: FamilyStatuses.DECLINED,
    primary: 3,
    primarySpouse: 5,
    primarySpouseChildren: 4,
  },
];

interface FamiliesStats {
  status: FamilyStatuses;
  primary: number;
  primarySpouse: number;
  primarySpouseChildren: number;
  [key: string]: number | FamilyStatuses;
}

const tableColumns: TableColumn[] = [
  { heading: 'Status', dataKey: 'status', width: '90px' },
  { heading: 'Primary', dataKey: 'primary', width: '90px' },
  { heading: 'Primary + Spouse', dataKey: 'primary', width: '100px' },
  {
    heading: 'Primary + Spouse + Children',
    dataKey: 'primarySpouseChildren',
    width: '120px',
  },
];

const StatsTable = (): JSX.Element => {
  return (
    <div className="stats-table__container">
      <Table columns={tableColumns} data={testData} theme="grey" />
    </div>
  );
};

export default StatsTable;
