import React, { Component } from 'react';
import FamilyRecord from '../../global/types/FamilyRecord';
import FamilyStatuses from '../../global/types/FamilyStatuses';
import { Family, FamilyMember } from '../../global/types/Family';

import {
  Table,
  TableColumn,
  RenderFuncArgs,
  CellRenderProps,
} from '../common/Table/Table';
import approvedStamp from '../../images/approved-stamp.png';
import declinedStamp from '../../images/declined-stamp.png';

interface NormalizedFamilyMember extends FamilyMember {
  memberType: string;
}

interface Props {
  cardInfo: FamilyRecord;
}

interface State {
  cardColumns: TableColumn[];
  formattedCardData: NormalizedFamilyMember[];
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
        {
          heading: 'Member Type',
          dataKey: 'memberType',
        },
        {
          heading: 'SSN',
          dataKey: 'ssn',
        },
        {
          heading: 'Gender',
          dataKey: 'gender',
        },
        {
          heading: 'Age',
          dataKey: 'age',
        },
        {
          heading: 'Name',
          dataKey: 'name',
        },
      ],
      formattedCardData: this.formatCardInfo(this.props.cardInfo),
    };
  }

  normalizeRegularFamilyMember = (
    familyMember: FamilyMember,
    familyMemberName: string,
  ): NormalizedFamilyMember => {
    return { memberType: familyMemberName, ...familyMember };
  };

  // Simply formats incoming data into array of objects format (usable for the Table component).
  formatCardInfo = (info: FamilyRecord): NormalizedFamilyMember[] => {
    const normalizedData: NormalizedFamilyMember[] = [];
    for (const familyMember in info.data) {
      if (!Array.isArray(info.data[familyMember])) {
        const normalizedFamilyMember = this.normalizeRegularFamilyMember(
          info.data[familyMember] as FamilyMember,
          familyMember,
        );
        normalizedData.push(normalizedFamilyMember);
      } else {
        (info.data[familyMember] as FamilyMember[]).forEach((familyMember) => {
          const normalizedFamilyMember = this.normalizeRegularFamilyMember(
            familyMember,
            'child',
          );
          normalizedData.push(normalizedFamilyMember);
        });
      }
    }
    return normalizedData;
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

  onChangeStatus = (): void => {
    console.log('Change status');
  };

  render(): JSX.Element {
    return (
      <Table
        columns={this.state.cardColumns}
        data={this.state.formattedCardData}
      />
    );
  }
}
