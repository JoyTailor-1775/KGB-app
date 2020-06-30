import FamilyMember from './FamilyMember';

type Family = {
  [key in 'primary' | 'spouse' | 'children']?: FamilyMember;
};

export default Family;
