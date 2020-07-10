export interface FamilyMember {
  name: string;
  gender: string;
  age: number;
  ssn: string;
  [key: string]: string | number;
}

type FamilyConstructor<FamilyMemberType> = {
  primary: FamilyMemberType;
  spouse?: FamilyMemberType;
  children?: FamilyMemberType[];
  [key: string]: FamilyMemberType | FamilyMemberType[] | undefined;
};

export type Family = FamilyConstructor<FamilyMember>;

export type FamilyMemberWithStatus = FamilyMember & {
  status: FamilyStatuses;
};

export type FamilyWithStatuses = FamilyConstructor<FamilyMemberWithStatus>;

export enum FamilyStatuses {
  APPROVED = 'Approved',
  DECLINED = 'Declined',
  UNREVIEWED = 'Unreviewed',
}

export type FamilyRecord = {
  id: number | string;
  data: FamilyWithStatuses;
};

export type FamiliesStats = {
  primary: number;
  primarySpouse: number;
  primarySpouseChildren: number;
};

export type FamiliesStatsWithStatus = FamiliesStats & {
  status: FamilyStatuses;
  [key: string]: number | FamilyStatuses;
};

export type FamilyTypes = 'primary' | 'primarySpouse' | 'primarySpouseChildren';
