import FamilyStatuses from './FamilyStatuses';
import { Family } from './Family';

type FamilyRecord = {
  id: number | string;
  status: FamilyStatuses;
  data: Family;
};

export default FamilyRecord;
