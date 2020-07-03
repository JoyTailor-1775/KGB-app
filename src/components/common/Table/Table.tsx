import React, { Component, MouseEvent } from 'react';
import './Table.scss';
import {
  PaginationDirection,
  SortingObject,
  TableColumn,
  TableDataStructure,
  TableTheme,
} from './types';
import TableBody from './TableBody';
import TableHead from './TableHead';
import TableFooter from './TableFooter';

/*
  A Table component needs next required parameters to be used:
    1) columns: [Object] - an array of objects, which represents the properties of 
        the table columns. Each column objects next parameters:

        Required:
          - heading: String,
          - dataKey: String,

        Optional:
           - width: String,
           - sortable: Boolean,
           - sortFunc: Function,
           - render: Function,
           - onCellClick: Function
        
        heading - is a name of column, that will be displayed in the column head.
        dataKey - is a key, by which the column will get it's values from data prop.
        width - is a desired width of a column, should be represented in semantic css 
        size units: px, %, em, rem, etc. All columns width are set to 50px by default.
        sortable - determines wheter the column should be sortable.
        sortFunc: a function, which is called once the column is sorted.
        render: a function, that is called during the table rendering, this function
          may be used for putting special JSX-elements into table cells, or configuring
          rowSpan and colSpan attributes of the cell.  
        onCellClick: a function, that is called on the column's cell click.
    2) data - an array of objects, a data that will be shown in the table. The
        data won't be shown in the table, unless neccessary dataKeys are provides in 
        columns prop.

  The Table also has optional parameters:
    1) loading: Boolean (default value = false). Determines wheter to show a loading
        message.
    2) deletable: Boolean (default value = false). When setted to true, a Delete
        column is appeared in the table.
    3) onDelete: Function (default value = () => ({})). Used with deletable flag.
        A method, which is called whenever a Delete button is clicked on a certain
        row. Returns an id of the clicked row.
    4) onRowClick() - a method, which is called, after click on a certain table row. 
        Returns the row id.
    5) pagination: Boolean (default value = false) - enables/disables pagination.
    6) page - number (default value = 1) - pagination parameter, represents current page number.
    7) onPageChange: Function - pagination parameters, a function, that is called whenever
        pagination arrows are clicked. Returns page number and page change direction (asc or desc)
    8) totalPages: Number (default value = 1) - pagination paramter, used for correct
        pagination limitation work.
    9) theme: red | green | grey - determines a color theme of the table. Default theme is grey.
    10) rowKey - number | string, it's a unique key for every table row, could be any number or string
    , since it's uniqueness is assurred.
*/

interface TableState {
  sortingManager: SortingObject;
}

export interface TableProps {
  columns: TableColumn[];
  data: TableDataStructure[];
  rowKey?: string | number;
  onRowClick?: (id: string | number) => void;
  loading?: boolean;
  deletable?: boolean;
  onDelete?: (rowKey: string | number) => void;
  pagination?: boolean;
  page?: number;
  onPageChange?: (direction: PaginationDirection) => number;
  totalPages?: number;
  theme?: TableTheme;
}

export class Table extends Component<TableProps, TableState> {
  constructor(props: TableProps) {
    super(props);

    // Preparing an object for managing sortable talbe columns.
    const sortableColumns = this.props.columns
      .filter((el) => el.sortable)
      .map((el) => {
        return el.dataKey;
      });
    const sortingObj: SortingObject = {};
    sortableColumns.forEach((el) => (sortingObj[el] = 'asc'));
    this.state = {
      sortingManager: sortingObj,
    };
  }

  toggleSortOrder = (key: string): void => {
    const newColumnOrder =
      this.state.sortingManager[key] === 'asc' ? 'desc' : 'asc';
    this.setState({
      sortingManager: {
        ...this.state.sortingManager,
        [key]: newColumnOrder,
      },
    });
  };

  onSortColumn = (column: TableColumn): void => {
    this.toggleSortOrder(column.dataKey);
    column.sortFunc &&
      column.sortFunc({
        dataKey: column.dataKey,
        order: this.state.sortingManager[column.dataKey],
      });
  };

  onRowClickOwn = (
    e: MouseEvent<HTMLTableRowElement>,
    id: string | number,
  ): void => {
    if (e.currentTarget.nodeName === 'BUTTON') return;
    this.props.onRowClick && this.props.onRowClick(id);
  };

  onPageChangeOwn = (direction: 'asc' | 'desc'): void => {
    if (this.props.page === 1 && direction === 'desc') {
      return;
    }
    if (this.props.page === this.props.totalPages && direction === 'asc') {
      return;
    }
    this.props.onPageChange && this.props.onPageChange(direction);
  };

  render(): JSX.Element {
    const {
      columns,
      data,
      rowKey,
      loading = false,
      deletable = false,
      onDelete = () => ({}),
      pagination = false,
      page = 1,
      totalPages = 1,
      theme = 'grey',
    } = this.props;
    return (
      <table className={`table ${theme}`}>
        <TableHead
          columns={columns}
          sortingManager={this.state.sortingManager}
          onSortColumn={this.onSortColumn}
          deletable={deletable}
        />
        <TableBody
          loading={loading}
          data={data}
          rowKey={rowKey}
          onRowClickOwn={this.onRowClickOwn}
          columns={columns}
          deletable={deletable}
          onDelete={onDelete}
        />
        {pagination && (
          <TableFooter
            onPageChangeOwn={this.onPageChangeOwn}
            page={page}
            totalPages={totalPages}
          />
        )}
      </table>
    );
  }
}
