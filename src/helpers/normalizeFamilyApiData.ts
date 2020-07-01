import uniqid from 'uniqid';
import FamilyRecord from '../global/types/FamilyRecord';
import { Family } from '../global/types/Family';
import FamilyStatuses from '../global/types/FamilyStatuses';

export default function normalizeFamilyApiData(data: Family[]): FamilyRecord[] {
  return data.map((family) => {
    return {
      id: uniqid(),
      status: FamilyStatuses.UNREVIEWED,
      data: family,
    };
  });
}
