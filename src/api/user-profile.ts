import { http, axiosAdmin } from './axiosClient';
import type { UpdateUserProfilePayload } from '../types/user-profile.type';

export const updateUserProfile = (data: UpdateUserProfilePayload, id: string) => {
    return http.put(axiosAdmin, `/mofifierProfil/${id}`, data);
};

