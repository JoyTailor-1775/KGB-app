import { FamilyMember } from './Family';

export interface NormalizedFamilyMember extends FamilyMember {
  memberType: 'primary' | 'spouse' | 'children';
}
