// useGardes.ts
import { useEffect, useState } from 'react';
import type { AttributCreerGarde } from '../types/garde';
import { GardeService } from '../services/gardeService';

export const useGardes = (refreshKey = 0) => {
    const [gardes, setGardes] = useState<AttributCreerGarde[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchGardes = async () => {
            setLoading(true);
            try {
                const data = await GardeService.getAllGardes();
                setGardes(data);
            } catch (err: any) {
                setError(err.message || 'Erreur inconnue');
            } finally {
                setLoading(false);
            }
        };

        fetchGardes();
    }, [refreshKey]);

    return { gardes, loading, error };
};
