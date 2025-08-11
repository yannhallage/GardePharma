import { useState } from 'react';
import type { UpdateUserProfilePayload } from '../types/user-profile.type';
import { updateUserProfileService } from '../services/admin-user-profileService';
import { setSession } from '@/helpers/local-storage';

export function useUpdateUserProfile() {
    const [loadings, setLoadings] = useState(false);
    const [errors, setErrors] = useState<string | null>(null);

    const update = async (payload: UpdateUserProfilePayload, userId: string) => {
        setLoadings(true);
        setErrors(null);
        try {
            await updateUserProfileService(payload, userId);
            // setSession
            // Cast double pour satisfaire TS
            setSession(payload as unknown as Record<string, unknown>);
        } catch (err: any) {
            setErrors(err.message || 'Erreur inconnue');
        } finally {
            setLoadings(false);
        }
    };

    return { update, loadings, errors };
}

