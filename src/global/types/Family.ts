export interface FamilyMember {
  name: string;
  gender: string;
  age: number;
  ssn: string;
}

export type Family = {
  [index: string]: FamilyMember | FamilyMember[];
};
