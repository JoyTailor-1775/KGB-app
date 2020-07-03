import React, { Component } from 'react';
import { FamilyRecord } from '../../global/types/Family';
import { FamilyStatuses } from '../../global/types/Family';
import { FamilyMember } from '../../global/types/Family';
import './FamilyCard.scss';
import {
  Table,
  TableColumn,
  TableTheme,
  RenderFuncArgs,
  CellRenderProps,
} from '../common/Table/Table';
import Cross from '../icons/Cross';
import Tick from '../icons/Tick';

interface NormalizedFamilyMember extends FamilyMember {
  memberType: string;
}

interface Props {
  cardInfo: FamilyRecord;
}

interface State {
  cardColumns: TableColumn[];
  formattedCardData: NormalizedFamilyMember[];
  cardColor: TableTheme;
}

export default class FamilyCard extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      cardColumns: [
        {
          heading: 'Status',
          dataKey: '',
          width: '100px',
          onCellClick: this.onChangeStatus,
          render: this.renderStatusCell,
        },
        {
          heading: 'Member Type',
          dataKey: 'memberType',
          width: '60px',
        },
        {
          heading: 'SSN',
          dataKey: 'ssn',
          width: '100px',
        },
        {
          heading: 'Gender',
          dataKey: 'gender',
          width: '30px',
        },
        {
          heading: 'Age',
          dataKey: 'age',
          width: '30px',
        },
        {
          heading: 'Name',
          dataKey: 'name',
          width: '110px',
        },
      ],
      formattedCardData: this.formatCardInfo(this.props.cardInfo),
      cardColor: this.defineCardColor(),
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
        cellRenderProps.children =
          this.props.cardInfo.status === FamilyStatuses.APPROVED ? (
            <Tick width="60px" color="#2fbd3e" />
          ) : (
            <Cross width="60px" color="#a30000" />
          );
      }
      cellRenderProps.props = {
        rowSpan: dataLength,
      };
    } else {
      cellRenderProps.props = {
        rowSpan: 0,
      };
    }
    return cellRenderProps;
  };

  defineCardColor = (): TableTheme => {
    let color;
    switch (this.props.cardInfo.status) {
      case FamilyStatuses.UNREVIEWED:
        color = 'grey';
        break;
      case FamilyStatuses.APPROVED:
        color = 'green';
        break;
      case FamilyStatuses.DECLINED:
        color = 'red';
        break;
    }
    return color as TableTheme;
  };

  onChangeStatus = (): void => {
    console.log('Change status');
  };

  render(): JSX.Element {
    return (
      <div className="family-card__container">
        <Table
          columns={this.state.cardColumns}
          data={this.state.formattedCardData}
          theme={this.state.cardColor}
        />
      </div>
    );
  }
}
