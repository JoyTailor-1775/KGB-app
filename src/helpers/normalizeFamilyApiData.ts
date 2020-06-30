import uniqid from 'uniqid';
import FamilyRecord from '../global/types/FamilyRecord';
import { Family, FamilyMember } from '../global/types/Family';
import { NormalizedFamilyMember } from '../global/types/NormalizedFamily';
import FamilyStatuses from '../global/types/FamilyStatuses';

export default function normalizeFamilyApiData(data: Family[]): FamilyRecord[] {
  return data.map((el) => {
    const normalizedFamily: NormalizedFamilyMember[] = [];
    for (const prop in el) {
      const { ...rest } = el[prop];
      const normalizedObj: NormalizedFamilyMember = {
        memberType: prop,
        ...rest,
      };
    }
    return {
      id: uniqid(),
      status: FamilyStatuses.UNREVIEWED,
      data: normalizedObj,
    };
  });
}
