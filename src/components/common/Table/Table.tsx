import React, { Component, MouseEvent } from 'react';
import { Button, ButtonColorTypes } from '../Button/Button';
import Spinner from '../Spinner/Spinner';
import './Table.scss';
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

export interface TableDataStructure {
  [key: string]: string | number;
}

export interface ColumnSortingFunctionParams {
  dataKey: string;
  order: 'asc' | 'desc';
}

interface RowColSpanConfig {
  rowSpan?: number;
  colSpan?: number;
}

export interface CellRenderProps {
  children?: JSX.Element | string;
  props?: RowColSpanConfig;
}

export interface RenderFuncArgs {
  value: JSX.Element | string | number;
  index: number;
  rowKey: string | number;
  dataLength: number;
}

export interface TableColumn {
  heading: string;
  dataKey: string;
  width?: string;
  sortable?: boolean;
  sortFunc?: (args: ColumnSortingFunctionParams) => TableDataStructure;
  render?: (args: RenderFuncArgs) => CellRenderProps;
  onCellClick?: () => void;
}

export type TableTheme = 'grey' | 'red' | 'green';

interface TableProps {
  columns: TableColumn[];
  data: TableDataStructure[];
  rowKey?: string | number;
  onRowClick?: (id: string | number) => void;
  loading?: boolean;
  deletable?: boolean;
  onDelete?: (rowKey: string | number) => void;
  pagination?: boolean;
  page?: number;
  onPageChange?: (direction: 'asc' | 'desc') => number;
  totalPages?: number;
  theme?: TableTheme;
}

interface SortingObject {
  [key: string]: 'asc' | 'desc';
}

interface TableState {
  sortingManager: SortingObject;
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
      loading = false,
      deletable = false,
      onDelete = () => ({}),
      pagination = false,
      page = 1,
      totalPages = 1,
      theme = 'grey',
    } = this.props;
    return (
      <table className={`table ${theme} ${pagination ? '' : 'bottom-rounded'}`}>
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
                      className={`triangle ${
                        this.state.sortingManager[col.dataKey]
                      }`}
                      onClick={() => this.onSortColumn(col)}
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
        <tbody className="table__body">
          {loading ? (
            <tr className="table__spinner">
              <td>
                <Spinner />
              </td>
            </tr>
          ) : data.length < 1 ? (
            <tr className="table__row--no-data-msg">
              <td>No Data</td>
            </tr>
          ) : (
            data.map((obj, idx) => {
              // Taking rowKey and assigning default value if there is no one.
              const rowKey = this.props.rowKey ? this.props.rowKey : idx;
              return (
                <tr
                  className="table__row"
                  key={rowKey}
                  onClick={(e) => this.onRowClickOwn(e, obj[rowKey])}
                >
                  {columns.map((col, index) => {
                    const cellRenderObj =
                      col.render &&
                      col.render({
                        value: obj[col.dataKey] || '',
                        index: data.indexOf(obj),
                        rowKey: rowKey,
                        dataLength: data.length,
                      });
                    return cellRenderObj?.props?.colSpan === 0 ||
                      cellRenderObj?.props?.rowSpan === 0 ? null : (
                      <td
                        className="table__cell"
                        key={index}
                        style={{ width: col.width || '50px' }}
                        {...{ ...cellRenderObj?.props }}
                        {...(col.onCellClick
                          ? { onClick: col.onCellClick }
                          : {})}
                      >
                        {cellRenderObj && cellRenderObj.children
                          ? cellRenderObj.children
                          : obj[col.dataKey] || ''}
                      </td>
                    );
                  })}
                  {deletable && (
                    <td className="table__cell table__cell--delete">
                      <Button
                        text="X"
                        color={ButtonColorTypes.ERROR}
                        onClick={() => onDelete(obj[rowKey])}
                      />
                    </td>
                  )}
                </tr>
              );
            })
          )}
        </tbody>
        {pagination && (
          <tfoot className="table__footer">
            <tr className="table__row--footer ">
              <td className="pagination">
                <div
                  className={`pagination__arrow left ${page < 2 && 'disable'}`}
                  onClick={() => this.onPageChangeOwn('desc')}
                ></div>
                <div className="pagination__page-number">{page}</div>
                <div
                  className={`pagination__arrow right ${
                    page >= totalPages && 'disable'
                  }`}
                  onClick={() => this.onPageChangeOwn('asc')}
                ></div>
              </td>
            </tr>
          </tfoot>
        )}
      </table>
    );
  }
}
