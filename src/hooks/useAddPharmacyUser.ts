
import { useState } from 'react';
import type { AddPharmacyUserPayload } from '../types/ListesPharmacy.type';
import { userService } from '../services/admin-ListesPharmacy';

export function useAddPharmacyUser() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const add = async (data: AddPharmacyUserPayload) => {
        setLoading(true);
        setError(null);
        try {
            const response = await userService.addPharmacyUser(data);
            return response;
        } catch (err: any) {
            setError(err?.response?.data?.message || 'Une erreur est survenue');
            throw err;
        } finally {
            setLoading(false);
        }
    };

    return { add, loading, error };
}
