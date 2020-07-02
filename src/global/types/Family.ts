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
