export interface FamilyMember {
  name: string;
  gender: string;
  age: number;
  ssn: string;
  [key: string]: string | number;
}

export type Family = {
  primary: FamilyMember;
  spouse?: FamilyMember;
  children?: FamilyMember[];
  [key: string]: FamilyMember | FamilyMember[] | undefined;
};

export enum FamilyStatuses {
  APPROVED = 'Approved',
  DECLINED = 'Declined',
  UNREVIEWED = 'Unreviewed',
}

export type FamilyRecord = {
  id: number | string;
  status: FamilyStatuses;
  data: Family;
};

export interface FamiliesStats {
  status: FamilyStatuses;
  primary: number;
  primarySpouse: number;
  primarySpouseChildren: number;
  [key: string]: number | FamilyStatuses;
}
