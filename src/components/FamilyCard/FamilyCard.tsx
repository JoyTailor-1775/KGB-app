import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import { FamilyRecord, FamilyStatuses, FamilyMemberWithStatus } from '../../global/types/Family';
import './FamilyCard.scss';
import { Table } from '../common/Table/Table';
import {
  TableColumn,
  RenderFuncArgs,
  CellRenderProps,
  OnCellClickArgs,
} from '../common/Table/types';
import Cross from '../icons/Cross';
import Tick from '../icons/Tick';
import familiesActions from '../../store/families/actions';
import {
  ChangeFamilyStatusAction,
  ChangeFamilyStatusPayload,
  FamilyActions,
} from '../../store/families/types';

interface NormalizedFamilyMember extends FamilyMemberWithStatus {
  memberType: string;
}

type State = {
  cardColumns: TableColumn[];
  formattedCardData: NormalizedFamilyMember[];
};

type OwnProps = {
  cardInfo: FamilyRecord;
};

type DispatchProps = {
  changeFamilyStatus: (payload: ChangeFamilyStatusPayload) => ChangeFamilyStatusAction;
};

type Props = OwnProps & DispatchProps;

class FamilyCard extends Component<Props, State> {
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
    };
  }

  normalizeRegularFamilyMember = (
    familyMember: FamilyMemberWithStatus,
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
          info.data[familyMember] as FamilyMemberWithStatus,
          familyMember,
        );
        normalizedData.push(normalizedFamilyMember);
      } else {
        (info.data[familyMember] as FamilyMemberWithStatus[]).forEach((familyMember) => {
          const normalizedFamilyMember = this.normalizeRegularFamilyMember(familyMember, 'child');
          normalizedData.push(normalizedFamilyMember);
        });
      }
    }
    return normalizedData;
  };

  renderStatusCell = ({ index }: RenderFuncArgs): CellRenderProps => {
    const cellRenderProps: CellRenderProps = {};
    const familyMemberStatus = this.state.formattedCardData[index].status;
    if (familyMemberStatus && familyMemberStatus !== FamilyStatuses.UNREVIEWED) {
      cellRenderProps.children =
        familyMemberStatus === FamilyStatuses.APPROVED ? (
          <Tick width="60px" color="#2fbd3e" />
        ) : (
          <Cross width="60px" color="#a30000" />
        );
    }
    return cellRenderProps;
  };

  onChangeStatus = ({ index }: OnCellClickArgs): void => {
    const familyMemberOnChange = this.state.formattedCardData[index];
    this.props.changeFamilyStatus({
      id: this.props.cardInfo.id,
      familyMember: familyMemberOnChange.memberType,
      memberSsn: familyMemberOnChange.ssn,
      status:
        familyMemberOnChange.status === FamilyStatuses.DECLINED
          ? FamilyStatuses.APPROVED
          : FamilyStatuses.DECLINED,
    });
  };

  componentDidUpdate(nextProps: Props) {
    if (nextProps.cardInfo.data !== this.props.cardInfo.data) {
      this.setState({
        formattedCardData: this.formatCardInfo(this.props.cardInfo),
      });
    }
  }

  render(): JSX.Element {
    return (
      <div className="family-card__container">
        <Table columns={this.state.cardColumns} data={this.state.formattedCardData} />
      </div>
    );
  }
}
const mapDispatchToProps = (dispatch: Dispatch<FamilyActions>) =>
  bindActionCreators(
    {
      changeFamilyStatus: familiesActions.changeFamilyStatus,
    },
    dispatch,
  );

export default connect(null, mapDispatchToProps)(FamilyCard);
