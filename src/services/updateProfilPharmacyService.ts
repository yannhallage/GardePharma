import type { UserProfile } from '@/types/UserProfilePharmacy';
import { updateProfilPharmacy } from '@/api/updateProfilPharmay';

export const updateProfilPharmacyService = {
    getProfile: async (): Promise<UserProfile> => {
        return await updateProfilPharmacy.get();
    },

    updateProfile: async (data: Partial<UserProfile>): Promise<UserProfile> => {
        return await updateProfilPharmacy.update(data);
    },
};
