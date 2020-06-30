import React, { Component } from 'react';
import FamilyRecord from '../../global/types/FamilyRecord';
import FamilyStatuses from '../../global/types/FamilyStatuses';
import {
  Table,
  TableColumn,
  RenderFuncArgs,
  CellRenderProps,
} from '../common/Table/Table';
import approvedStamp from '../../images/approved-stamp.png';
import declinedStamp from '../../images/declined-stamp.png';

interface Props {
  cardInfo: FamilyRecord;
}

interface State {
  cardColumns: TableColumn[];
}

export default class FamilyCard extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      cardColumns: [
        {
          heading: 'Status',
          dataKey: '',
          width: '60px',
          render: this.renderStatusCell,
        },
      ],
    };
  }
  onChangeStatus = (): void => {
    console.log('Change status');
  };

  renderStatusCell = ({
    index,
    dataLength,
  }: RenderFuncArgs): CellRenderProps => {
    const cellRenderProps: CellRenderProps = {};

    if (index === 0) {
      if (this.props.cardInfo.status !== FamilyStatuses.UNREVIEWED) {
        const imgSrc =
          this.props.cardInfo.status === FamilyStatuses.APPROVED
            ? approvedStamp
            : declinedStamp;
        cellRenderProps.children = (
          <img
            className="family-card__stamp"
            src={imgSrc}
            height="auto"
            width="80px"
          />
        );
      }
      cellRenderProps.props = {
        rowSpan: dataLength,
      };
    }
    return cellRenderProps;
  };

  render(): JSX.Element {
    return (
      <table className="family-card">
        <thead className="family-card__head">
          <tr className="family-card__row"></tr>
        </thead>
      </table>
    );
  }
}
