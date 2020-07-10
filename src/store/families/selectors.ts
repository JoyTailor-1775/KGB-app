import {
  FamiliesStats,
  FamilyStatuses,
  FamilyWithStatuses,
  FamiliesStatsWithStatus,
  FamilyTypes,
} from '../../global/types/Family';
import { FamilyState, FamiliesStatsStatuses } from './types';

// Returns formatted statistics data of the families field in the app store.
const getFamiliesStatistics = (state: FamilyState): FamiliesStatsWithStatus[] => {
  const familiesReport: Record<FamiliesStatsStatuses, FamiliesStats> = {
    [FamilyStatuses.APPROVED]: {
      primary: 0,
      primarySpouse: 0,
      primarySpouseChildren: 0,
    },
    [FamilyStatuses.DECLINED]: {
      primary: 0,
      primarySpouse: 0,
      primarySpouseChildren: 0,
    },
  };

  const updateStatValue = (familyStatus: FamiliesStatsStatuses, familyType: FamilyTypes): void => {
    familiesReport[familyStatus][familyType] = familiesReport[familyStatus][familyType] + 1;
  };

  const getFamilyTypeAndUpdateWithStatus = (
    family: FamilyWithStatuses,
    status: FamiliesStatsStatuses,
  ): void => {
    if (family.children) {
      const childrenStatuses = family.children.map((child) => child.status);
      if (childrenStatuses.every((childStatus) => childStatus === status)) {
        updateStatValue(status, 'primarySpouseChildren');
        return;
      }
    }
    if (family.spouse && family.spouse.status === status) {
      updateStatValue(status, 'primarySpouse');
      return;
    }
    updateStatValue(status, 'primary');
  };

  const updateAccordingFamilyStatsValue = (family: FamilyWithStatuses): void => {
    if (family.primary.status === FamilyStatuses.APPROVED) {
      getFamilyTypeAndUpdateWithStatus(family, FamilyStatuses.APPROVED);
    }
    if (family.primary.status === FamilyStatuses.DECLINED) {
      getFamilyTypeAndUpdateWithStatus(family, FamilyStatuses.DECLINED);
    }
  };

  state.families.forEach((family) => updateAccordingFamilyStatsValue(family.data));

  const familiesStatistics: FamiliesStatsWithStatus[] = [];

  familiesStatistics.push(
    {
      status: FamilyStatuses.APPROVED,
      ...familiesReport.Approved,
    },
    { status: FamilyStatuses.DECLINED, ...familiesReport.Declined },
  );

  return familiesStatistics;
};

export default { getFamiliesStatistics };
