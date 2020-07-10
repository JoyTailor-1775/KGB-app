import React, { MouseEvent } from 'react';
import { TableDataStructure, TableColumn } from './types';
import Spinner from '../../common/Spinner/Spinner';
import { Button, ButtonColorTypes } from '../../common/Button/Button';

export interface Props {
  data: TableDataStructure[];
  columns: TableColumn[];
  rowKey?: string | number;
  onRowClickOwn: (e: MouseEvent<HTMLTableRowElement>, id: string | number) => void;
  loading?: boolean;
  deletable?: boolean;
  onDelete?: (rowKey: string | number) => void;
}

const TableBody = ({
  loading,
  data,
  rowKey,
  onRowClickOwn,
  columns,
  deletable,
  onDelete,
}: Props): JSX.Element => {
  return (
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
          const rowKeyOwn = rowKey ? rowKey : idx;
          return (
            <tr
              className="table__row"
              key={rowKeyOwn}
              onClick={(e) => onRowClickOwn(e, obj[rowKeyOwn])}
            >
              {columns.map((col, index) => {
                const cellRenderObj =
                  col.render &&
                  col.render({
                    value: obj[col.dataKey] || '',
                    index: data.indexOf(obj),
                    rowKey: rowKeyOwn,
                    dataLength: data.length,
                  });
                return cellRenderObj?.props?.colSpan === 0 ||
                  cellRenderObj?.props?.rowSpan === 0 ? null : (
                  <td
                    className="table__cell"
                    key={index}
                    style={{ width: col.width || '50px' }}
                    {...{ ...cellRenderObj?.props }}
                    {...{
                      onClick: () =>
                        col.onCellClick &&
                        col.onCellClick({
                          dataKey: col.dataKey,
                          value: obj[col.dataKey],
                          index: data.indexOf(obj),
                        }),
                    }}
                  >
                    {cellRenderObj && cellRenderObj.children
                      ? cellRenderObj.children
                      : obj[col.dataKey] !== undefined
                      ? obj[col.dataKey]
                      : ''}
                  </td>
                );
              })}
              {deletable && onDelete && (
                <td className="table__cell table__cell--delete">
                  <Button
                    text="X"
                    color={ButtonColorTypes.ERROR}
                    onClick={() => onDelete(obj[rowKeyOwn])}
                  />
                </td>
              )}
            </tr>
          );
        })
      )}
    </tbody>
  );
};

export default TableBody;
