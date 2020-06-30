export interface FamilyMember {
  name: string;
  gender: string;
  age: number;
  ssn: string;
}

export type Family = {
  primary: FamilyMember;
  spouse?: FamilyMember;
  children?: FamilyMember[];
};
