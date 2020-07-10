import uniqid from 'uniqid';
import {
  Family,
  FamilyRecord,
  FamilyStatuses,
  FamilyMemberWithStatus,
  FamilyWithStatuses,
  FamilyMember,
} from '../global/types/Family';
import updateNestedObjectProprs from './updateNestedObjectProps';

// In real production, ssn actually is unique for every person, but
// since the test data from the api didn't provided uniqueness for the
// data, I used uiqid here just as a temporary decision.

const normalizeFamilyMember = (familyMember: FamilyMember): FamilyMemberWithStatus => {
  return { status: FamilyStatuses.UNREVIEWED, ...familyMember, ssn: uniqid() };
};

export default function normalizeFamilyApiData(data: Family[]): FamilyRecord[] {
  return data.map((family) => {
    const familyWithStatus = updateNestedObjectProprs<FamilyMember, FamilyMemberWithStatus>(
      family,
      normalizeFamilyMember,
    );
    return {
      id: uniqid(),
      data: { ...(familyWithStatus as FamilyWithStatuses) },
    };
  });
}
