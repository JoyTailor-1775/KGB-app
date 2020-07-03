import { FamilyRecord, FamilyStatuses } from '../../global/types/Family';
import { Action as ReduxAction } from 'redux';

export type Action<Type> = ReduxAction<Type>;

export type PayloadAction<Type, Payload> = Action<Type> & {
  readonly payload: Payload;
};

export type ErrorState = Error | null;
export type LoadingState = boolean;
export type FamiliesState = FamilyRecord[];

export interface RootState {
  error: ErrorState;
  loading: LoadingState;
  families: FamiliesState;
}

export enum FamilyActionTypes {
  FETCH_REQUEST = 'families/FETCH_REQUEST',
  FETCH_ERROR = 'families/FETCH_ERROR',
  FETCH_SUCCESS = 'families/FETCH_SUCCESS',
  CHANGE_FAMILY_STATUS = 'families/CHANGE_FAMILY_STATUS',
  UPLOAD_FAMILIES = 'families/UPLOAD_FAMILIES',
}

export type ChangeFamilyStatusPayload = {
  id: string | number;
  status: FamilyStatuses;
};

export type FetchSuccessAction = Action<FamilyActionTypes.FETCH_SUCCESS>;
export type FetchRequestAction = Action<FamilyActionTypes.FETCH_REQUEST>;
export type FetchErrorAction = PayloadAction<
  FamilyActionTypes.FETCH_ERROR,
  ErrorState
>;
export type UploadFamiliesAction = PayloadAction<
  FamilyActionTypes.UPLOAD_FAMILIES,
  FamiliesState
>;

export type ChangeFamilyStatusAction = PayloadAction<
  FamilyActionTypes.CHANGE_FAMILY_STATUS,
  ChangeFamilyStatusPayload
>;

export type FamilyActions =
  | FetchSuccessAction
  | FetchErrorAction
  | FetchRequestAction
  | UploadFamiliesAction
  | ChangeFamilyStatusAction;

export type FamiliesTypes = {
  primary: number;
  primarySpouse: number;
  primarySpouseChildren: number;
  [key: string]: number;
};

export type FamiliesStatsStatuses =
  | FamilyStatuses.APPROVED
  | FamilyStatuses.DECLINED;
