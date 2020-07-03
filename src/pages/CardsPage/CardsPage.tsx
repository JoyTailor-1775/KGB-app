import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Action, bindActionCreators, Dispatch } from 'redux';
import { ThunkAction } from 'redux-thunk';
import FamilyCard from '../../components/FamilyCard/FamilyCard';
import Spinner from '../../components/common/Spinner/Spinner';
import { FamilyRecord } from '../../global/types/Family';
import '../../global/stylesheets/page.scss';
import './CardsPage.scss';
import familiesOperations from '../../store/families/operations';
import { FamilyState, FamilyActions } from '../../store/families/types';
import { RootState } from '../../store/types';
import * as cache from '../../api/cachingProxy';

type ReduxProps = {
  families: FamilyRecord[];
  loading: boolean;
};

type DispatchProps = {
  uploadFamilies: () => ThunkAction<
    Promise<void>,
    FamilyState,
    unknown,
    Action<string>
  >;
};

type Props = ReduxProps & DispatchProps;

class CardsPage extends Component<Props> {
  async componentDidMount() {
    await this.props.uploadFamilies();
  }

  // Saving business data in LocalStorage, like it's done here, is of course temporary decision
  // just for test task scope purposes. In reality all the data would be manipulated via client-server
  // connection, while LocalStorage may be used only for storing a little portion of data, like auth
  // token, etc.
  componentWillUnmount() {
    if (this.props.families.length > 0) {
      cache.setLSItem<FamilyRecord[]>('families', this.props.families);
    }
  }

  render(): JSX.Element {
    return (
      <main className="page">
        <div className="cards-container">
          {this.props.loading ? (
            <Spinner />
          ) : (
            this.props.families &&
            this.props.families.map((el, idx) => (
              <FamilyCard cardInfo={el} key={idx} />
            ))
          )}
        </div>
      </main>
    );
  }
}
const mapDispatchToProps = (dispatch: Dispatch<FamilyActions>) =>
  bindActionCreators(
    {
      uploadFamilies: familiesOperations.uploadFamilies,
    },
    dispatch,
  );

const mapStateToProps = (state: RootState) => ({
  families: state.families.families,
  loading: state.families.loading,
});

export default connect(mapStateToProps, mapDispatchToProps)(CardsPage);
