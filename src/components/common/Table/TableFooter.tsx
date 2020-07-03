import React from 'react';
import { PaginationDirection } from './types';

export interface Props {
  onPageChangeOwn: (direction: PaginationDirection) => void;
  page: number;
  totalPages: number;
}

const TableFooter = ({
  onPageChangeOwn,
  page,
  totalPages,
}: Props): JSX.Element => {
  return (
    <tfoot className="table__footer">
      <tr className="table__row--footer ">
        <td className="pagination">
          <div
            className={`pagination__arrow left ${page < 2 && 'disable'}`}
            onClick={() => onPageChangeOwn('desc')}
          ></div>
          <div className="pagination__page-number">{page}</div>
          <div
            className={`pagination__arrow right ${
              page >= totalPages && 'disable'
            }`}
            onClick={() => onPageChangeOwn('asc')}
          ></div>
        </td>
      </tr>
    </tfoot>
  );
};

export default TableFooter;
