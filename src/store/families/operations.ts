import { Action } from 'redux';
import { ThunkAction } from 'redux-thunk';
import * as api from '../../api/families';
import normalizeFamilyApiData from '../../helpers/normalizeFamilyApiData';
import { FamilyRecord } from '../../global/types/Family';
import { FamilyState } from './types';
import actions from './actions';
import * as cache from '../../api/cachingProxy';

const uploadFamilies = (): ThunkAction<
  Promise<void>,
  FamilyState,
  unknown,
  Action<string>
> => async (dispatch) => {
  try {
    const cachedData = cache.getLSItem<FamilyRecord[]>('families');
    if (cachedData) {
      dispatch(actions.uploadFamilies(cachedData));
      return;
    }
    const response = await api.getFamilies();
    const normalizedApiData = normalizeFamilyApiData(response);
    dispatch(actions.uploadFamilies(normalizedApiData));
  } catch (error) {
    dispatch(actions.fetchError(error));
  }
};

export default { uploadFamilies };
