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
import {
  FamilyRecord,
  FamilyWithStatuses,
  FamilyMemberWithStatus,
} from '../../global/types/Family';

const handleError = (state: ErrorState, action: FetchErrorAction): ErrorState => {
  return action.payload;
};

const errorReducer: Reducer<ErrorState, FamilyActions> = (state = null, action) => {
  switch (action.type) {
    case FamilyActionTypes.FETCH_ERROR:
      return handleError(state, action as FetchErrorAction);

    case FamilyActionTypes.FETCH_SUCCESS:
      return null;

    default:
      return state;
  }
};

const loadingReducer: Reducer<LoadingState, FamilyActions> = (state = false, action) => {
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
  const { id, status, familyMember, memberSsn } = action.payload;
  return state.map((family) => {
    if (family.id === id) {
      let newFamily: Partial<FamilyWithStatuses> = {};
      // Updating statuses inside every element of the children array,
      // or inside simple familyMember object.
      if (familyMember === 'child' && family.data.children) {
        const indexOfChild = family.data.children.findIndex((child) => child.ssn === memberSsn);
        const newChildren = family.data.children.slice();
        newChildren[indexOfChild] = {
          ...family.data.children[indexOfChild],
          status: status,
        };
        newFamily = { ...family.data, children: newChildren };
      } else {
        const newFamilyMember = { ...family.data[familyMember], status: status };
        newFamily = {
          ...family.data,
          [familyMember]: newFamilyMember as FamilyMemberWithStatus,
        };
      }

      return { ...family, data: { ...(newFamily as FamilyWithStatuses) } };
    }
    return family;
  });
};

const familiesReducer: Reducer<FamiliesState, FamilyActions> = (state = [], action) => {
  switch (action.type) {
    case FamilyActionTypes.UPLOAD_FAMILIES:
      return handleFamiliesUpload(state, action as UploadFamiliesAction);

    case FamilyActionTypes.CHANGE_FAMILY_STATUS:
      return handleFamilyStatusChange(state, action as ChangeFamilyStatusAction);

    default:
      return state;
  }
};

export default combineReducers({
  families: familiesReducer,
  loading: loadingReducer,
  error: errorReducer,
});
