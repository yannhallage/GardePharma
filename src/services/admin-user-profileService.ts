
import type { UpdateUserProfilePayload } from '../types/user-profile.type';
import { updateUserProfile } from '../api/user-profile';

export const updateUserProfileService = async (data: UpdateUserProfilePayload, id: string) => {
    return await updateUserProfile(data, id);
};
