

import { updateProfilPharmacyService } from '@/services/updateProfilPharmacyService';
import type { UserProfile } from '@/types/UserProfilePharmacy';

// export const useUserProfilePharmacy = () => {
//   const getProfilePharmacy = async (): Promise<UserProfile> => {
//     return await updateProfilPharmacyService.getProfile();
//   };

//   return { getProfilePharmacy };
// };

export const useUpdateUserProfilePharmacy = () => {
  const updateProfilePharmacy = async (data: Partial<UserProfile> , userId: string)=> {
    return await updateProfilPharmacyService.updateProfile(data,userId);
  };

  return { updateProfilePharmacy };
};
