import React from 'react';
import { TableColumn, SortingObject } from './types';

export interface Props {
  columns: TableColumn[];
  sortingManager: SortingObject;
  onSortColumn: (column: TableColumn) => void;
  deletable: boolean;
}

const TableHead = ({
  columns,
  sortingManager,
  onSortColumn,
  deletable,
}: Props): JSX.Element => {
  return (
    <thead className="table__head">
      <tr className="table__row">
        {columns.map((col, idx) => {
          return (
            <th
              className="table__heading"
              style={{ width: col.width ? col.width : '50px' }}
              key={idx}
            >
              <span className="text">{col.heading}</span>
              {col.sortable && (
                <div
                  className={`triangle ${sortingManager[col.dataKey]}`}
                  onClick={() => onSortColumn(col)}
                ></div>
              )}
            </th>
          );
        })}
        {deletable && (
          <th className="table__heading table__heading--delete">Delete</th>
        )}
      </tr>
    </thead>
  );
};

export default TableHead;
