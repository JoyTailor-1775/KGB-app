import { combineReducers } from 'redux';
import { Reducer } from 'redux';
import {
  ErrorState,
  LoadingState,
  FamiliesState,
  FamilyActionTypes,
  FamilyActions,
  FetchErrorAction,
  UploadFamiliesAction,
  ChangeFamilyStatusAction,
} from './types';

const handleError = (
  state: ErrorState,
  action: FetchErrorAction,
): ErrorState => {
  return action.payload;
};

const errorReducer: Reducer<ErrorState, FamilyActions> = (
  state = null,
  action,
) => {
  switch (action.type) {
    case FamilyActionTypes.FETCH_ERROR:
      return handleError(state, action as FetchErrorAction);

    case FamilyActionTypes.FETCH_SUCCESS:
      return null;

    default:
      return state;
  }
};

const loadingReducer: Reducer<LoadingState, FamilyActions> = (
  state = false,
  action,
) => {
  switch (action.type) {
    case FamilyActionTypes.FETCH_REQUEST:
      return true;

    case FamilyActionTypes.FETCH_SUCCESS:
    case FamilyActionTypes.FETCH_ERROR:
      return false;

    default:
      return state;
  }
};

const handleFamiliesUpload = (
  state: FamiliesState,
  action: UploadFamiliesAction,
): FamiliesState => {
  return action.payload;
};

const handleFamilyStatusChange = (
  state: FamiliesState,
  action: ChangeFamilyStatusAction,
): FamiliesState => {
  return state.map((family) => {
    if (family.id === action.payload.id) {
      return { ...family, status: action.payload.status };
    }
    return family;
  });
};

const familiesReducer: Reducer<FamiliesState, FamilyActions> = (
  state = [],
  action,
) => {
  switch (action.type) {
    case FamilyActionTypes.UPLOAD_FAMILIES:
      return handleFamiliesUpload(state, action as UploadFamiliesAction);

    case FamilyActionTypes.CHANGE_FAMILY_STATUS:
      return handleFamilyStatusChange(
        state,
        action as ChangeFamilyStatusAction,
      );

    default:
      return state;
  }
};

export default combineReducers({
  families: familiesReducer,
  loading: loadingReducer,
  error: errorReducer,
});
