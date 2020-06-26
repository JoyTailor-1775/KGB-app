import React, { Component } from 'react';
import Button from '../Button';
import Spinner from '../Spinner';
import './Table.scss';
/*
  A Table component needs next required parameters to be used:
    1) columns: [Object] - an array of objects, which represents the properties of 
        the table columns. Each column objects should looks like:
        {
          heading: String,
          dataKey: String,
          width: String,
          sortable: Boolean,
          sortFunc: Function,
        }
        heading - is a name of column, that will be displayed in the column head.
        dataKey - is a key, by which the column will get it's values from data prop.
        width - is a desired width of a column, should be represented in semantic css 
        size units: px, %, em, rem, etc. All columns width are set to 50px by default.
        sortable - determines wheter the column should be sortable.
        sortFunc: a function, which is called once the column is sorted.
    2) data - an array of objects, a data that will be shown in the table. The
        data won't be shown in the table, unless neccessary dataKeys are provides in 
        columns prop.
    3) onRowClick() - a method, which is called, after click on a certain table row. 
        Returns the row id.
    4) rowKey - any, it's a unique key for every table row, could be anything, since it's 
        uniqueness is assurred.

  The Table also has optional parameters:
    1) loading: Boolean (default value = false). Determines wheter to show a loading
        message.
    2) deletable: Boolean (default value = false). When setted to true, a Delete
        column is appeared in the table.
    3) onDelete: Function (default value = () => ({})). Used with deletable flag.
        A method, which is called whenever a Delete button is clicked on a certain
        row. Returns an id of the clicked row.
    4) pagination: Boolean (default value = false) - enables/disables pagination.
    4) page - number (default value = 1) - pagination parameter, represents current page number.
    5) onPageChange: Function - pagination parameters, a function, that is called whenever
        pagination arrows are clicked. Returns page number and page change direction (asc or desc)
    6) totalPages: Number (default value = 1) - pagination paramter, used for correct
        pagination limitation work.
*/

export default class Table extends Component {
  constructor(props) {
    super(props);

    // Preparing an object for managing sortable talbe columns.
    const sortableColumns = this.props.columns
      .filter((el) => el.sortable)
      .map((el) => {
        return el.dataKey;
      });
    const sortingObj = {};
    sortableColumns.forEach((el) => (sortingObj[el] = 'asc'));
    this.state = {
      sortingManager: sortingObj,
    };
  }

  toggleSortOrder = (key) => {
    const newColumnOrder = this.state.sortingManager[key] === 'asc' ? 'desc' : 'asc';
    this.setState({
      sortingManager: {
        ...this.state.sortingManager,
        [key]: newColumnOrder,
      },
    });
  };

  onSortColumn = (column) => {
    this.toggleSortOrder(column.dataKey);
    column.sortFunc({
      dataKey: column.dataKey,
      order: this.state.sortingManager[column.dataKey],
    });
  };

  onRowClickOwn = (e, id) => {
    if (e.target.nodeName === 'BUTTON') return;
    this.props.onRowClick(id);
  };

  onPageChangeOwn = (direction) => {
    console.log(this.props.page, this.props.totalPages);
    if (this.props.page === 1 && direction === 'desc') {
      return;
    }
    if (this.props.page === this.props.totalPages && direction === 'asc') {
      return;
    }
    this.props.onPageChange(direction);
  };

  render() {
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
    } = this.props;
    return (
      <table className={`table ${pagination && 'bottom-rounded'}`}>
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
            data.map((obj) => {
              return (
                <tr
                  className="table__row"
                  align="center"
                  valign="center"
                  key={obj[rowKey]}
                  onClick={(e) => this.onRowClickOwn(e, obj[rowKey])}
                >
                  {columns.map((col, idx) => {
                    return (
                      <td
                        className="table__cell"
                        key={idx}
                        style={{ width: col.width || '50px' }}
                      >
                        {obj[col.dataKey] || ''}
                      </td>
                    );
                  })}
                  {deletable && (
                    <td className="table__cell table__cell--delete">
                      <Button
                        text="X"
                        color="error"
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
