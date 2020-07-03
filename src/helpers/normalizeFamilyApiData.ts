import uniqid from 'uniqid';
import { Family, FamilyRecord, FamilyStatuses } from '../global/types/Family';

export default function normalizeFamilyApiData(data: Family[]): FamilyRecord[] {
  return data.map((family) => {
    return {
      id: uniqid(),
      status: FamilyStatuses.UNREVIEWED,
      data: family,
    };
  });
}
