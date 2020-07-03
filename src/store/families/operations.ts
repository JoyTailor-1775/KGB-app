import { Action } from 'redux';
import { ThunkAction } from 'redux-thunk';
import * as api from '../../api/families';
import normalizeFamilyApiData from '../../helpers/normalizeFamilyApiData';
import { Family } from '../../global/types/Family';
import { RootState } from './types';
import actions from './actions';

const uploadFamilies = (
  families: Family[],
): ThunkAction<void, RootState, unknown, Action<string>> => async (
  dispatch,
) => {
  const response = await api.getFamilies();
  const normalizedApiData = normalizeFamilyApiData(response);
  dispatch(actions.uploadFamilies(normalizedApiData));
};
