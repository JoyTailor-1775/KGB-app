import uniqid from 'uniqid';
import FamilyRecord from '../global/types/FamilyRecord';
import { Family } from '../global/types/Family';
import { NormalizedFamilyMember } from '../global/types/NormalizedFamily';
import FamilyStatuses from '../global/types/FamilyStatuses';

// export default function normalizeFamilyApiData(data: Family[]): FamilyRecord[] {
//   return data.map((el) => {
//     const normalizedObj: Partial<NormalizedFamilyMember> = {};
//     for (const prop in el) {
//       normalizedObj = {
//         memberType: prop,
//         ...el,
//       };
//     }
//     return {
//       id: uniqid(),
//       status: FamilyStatuses.UNREVIEWED,
//       data: normalizedObj,
//     };
//   });
// }
