
import type { UpdateUserProfilePayload } from '../types/user-profile.type';
import { updateUserProfile } from '../api/user-profile';

export const updateUserProfileService = async (data: UpdateUserProfilePayload) => {
    return await updateUserProfile(data);
};
