

import { useState } from 'react';
import type { UpdateUserProfilePayload } from '../types/user-profile.type';
import { updateUserProfileService } from '../services/admin-user-profileService';

export function useUpdateUserProfile() {
    const [loadings, setLoadings] = useState(false);
    const [errors, setErrors] = useState<string | null>(null);

    const update = async (payload: UpdateUserProfilePayload, userId: string) => {
        setLoadings(true);
        setErrors(null);
        try {
            await updateUserProfileService(payload, userId);
        } catch (err: any) {
            setErrors(err.message || 'Erreur inconnue');
        } finally {
            setLoadings(false);
        }
    };

    return { update, loadings, errors };
}
