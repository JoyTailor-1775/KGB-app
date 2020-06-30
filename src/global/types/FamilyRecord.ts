import { NormalizedFamilyMember } from './NormalizedFamily';
import FamilyStatuses from './FamilyStatuses';

type FamilyRecord = {
  id: number | string;
  status: FamilyStatuses;
  data: NormalizedFamilyMember[];
};

export default FamilyRecord;
