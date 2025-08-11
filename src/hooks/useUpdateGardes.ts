import { useState } from 'react';
import { GardeService } from '../services/gardeService';
import type { UpdateGardes } from '../types/garde';

export function useUpdateGarde() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<null | string>(null);
    const [success, setSuccess] = useState(false);

    const updateGarde = async (userId: string, data: UpdateGardes) => {
        setLoading(true);
        setError(null);
        setSuccess(false);

        try {
            await GardeService.updateGardeByPharma(userId, data);
            setSuccess(true);
        } catch (err: any) {
            setError(err?.message || 'Erreur inconnue');
        } finally {
            setLoading(false);
        }
    };

    return {
        updateGarde,
        loading,
        error,
        success,
    };
}
