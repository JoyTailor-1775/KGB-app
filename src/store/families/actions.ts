import {
  Action,
  PayloadAction,
  FetchSuccessAction,
  FetchErrorAction,
  FetchRequestAction,
  UploadFamiliesAction,
  ChangeFamilyStatusAction,
  ChangeFamilyStatusPayload,
  FamilyActionTypes,
  FamiliesState,
  ErrorState,
} from './types';

const createAction = <Type extends string>(type: Type): Action<Type> => ({
  type,
});

const createPayloadAction = <Type extends string, Payload>(
  type: Type,
  payload: Payload,
): PayloadAction<Type, Payload> => ({
  ...createAction(type),
  payload,
});

const fetchSuccess = (): FetchSuccessAction => createAction(FamilyActionTypes.FETCH_SUCCESS);

const fetchRequest = (): FetchRequestAction => createAction(FamilyActionTypes.FETCH_REQUEST);

const fetchError = (error: ErrorState): FetchErrorAction =>
  createPayloadAction(FamilyActionTypes.FETCH_ERROR, error);

const uploadFamilies = (families: FamiliesState): UploadFamiliesAction =>
  createPayloadAction(FamilyActionTypes.UPLOAD_FAMILIES, families);

const changeFamilyStatus = (data: ChangeFamilyStatusPayload): ChangeFamilyStatusAction =>
  createPayloadAction(FamilyActionTypes.CHANGE_FAMILY_STATUS, data);

export default {
  fetchRequest,
  fetchError,
  fetchSuccess,
  changeFamilyStatus,
  uploadFamilies,
};
