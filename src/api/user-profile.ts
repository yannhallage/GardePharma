import { http } from './axiosClient';
import type { UpdateUserProfilePayload } from '../types/user-profile.type';

export const updateUserProfile = (data: UpdateUserProfilePayload) => {
    const formData = new FormData();

    Object.entries(data).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
            formData.append(key, value as string | Blob);
        }
    });

    return http.put<any, FormData>('/users/profile', formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    });
};
