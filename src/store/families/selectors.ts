import {
  Family,
  FamiliesStats,
  FamilyStatuses,
} from '../../global/types/Family';
import { RootState, FamiliesStatsStatuses, FamiliesTypes } from './types';

// Returns formatted statistics data of the families field in the app store.
const getFamiliesStatistics = (state: RootState): FamiliesStats[] => {
  const familiesReport: Record<FamiliesStatsStatuses, FamiliesTypes> = {
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

  const updateStatValue = (
    familyStatus: FamiliesStatsStatuses,
    familyType: string,
  ): void => {
    familiesReport[familyStatus][familyType] =
      familiesReport[familyStatus][familyType] + 1;
  };

  const updateAccordingFamilyStatsValue = (
    status: FamiliesStatsStatuses,
    family: Family,
  ): void => {
    if (family.spouse && family.children) {
      updateStatValue(status, 'primarySpouseChildren');
      return;
    }
    if (family.spouse) {
      updateStatValue(status, 'primarySpouse');
      return;
    }
    updateStatValue(status, 'primary');
  };

  const approvedFamilies = state.families.filter(
    (family) => family.status === FamilyStatuses.APPROVED,
  );
  approvedFamilies.forEach((family) =>
    updateAccordingFamilyStatsValue(FamilyStatuses.APPROVED, family.data),
  );

  const declinedFamilies = state.families.filter(
    (family) => family.status === FamilyStatuses.DECLINED,
  );
  declinedFamilies.forEach((family) =>
    updateAccordingFamilyStatsValue(FamilyStatuses.DECLINED, family.data),
  );

  const familiesStatistics: FamiliesStats[] = [];

  familiesStatistics.push(
    {
      status: FamilyStatuses.APPROVED,
      ...familiesReport.Approved,
    },
    { status: FamilyStatuses.DECLINED, ...familiesReport.Declined },
  );

  return familiesStatistics;
};

export { getFamiliesStatistics };
