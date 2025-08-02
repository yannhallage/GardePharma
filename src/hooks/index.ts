// Export all hooks for easy importing
export { useToast } from './use-toast';
export { useFormSubmission } from './use-form-submission';
export { usePharmacyAccounts } from './use-pharmacy-accounts';
export { useManualOnCallAssignment } from './use-manual-oncall';
export { useProfileForm } from './use-profile-form';

// Export pharmacy-specific hooks
export { usePharmacyDashboard } from './use-pharmacy-dashboard';
export { usePharmacyGardes } from './use-pharmacy-gardes';
export { usePharmacyProfile } from './use-pharmacy-profile';
export { usePharmacyPlanning } from './use-pharmacy-planning';

// Export types
export type { ValidationRule, ValidationSchema, FormSubmissionOptions } from './use-form-submission';
export type { PharmacyFormData, PharmacyResponse } from './use-pharmacy-accounts';
export type { OnCallAssignmentData, OnCallAssignmentResponse } from './use-manual-oncall';
export type { ProfileFormData, ProfileResponse } from './use-profile-form';

// Export pharmacy-specific types
export type { 
  GardeEvent, 
  DashboardStats, 
  PharmacieEnGarde 
} from './use-pharmacy-dashboard';

export type { 
  GardeData, 
  GardeFormData, 
  GardeResponse 
} from './use-pharmacy-gardes';

export type { 
  PharmacyProfile, 
  ProfileUpdateData, 
  PasswordChangeData, 
  EmailChangeData 
} from './use-pharmacy-profile';

export type { 
  PlanningEvent, 
  PlanningFilters, 
  PlanningStats 
} from './use-pharmacy-planning'; 