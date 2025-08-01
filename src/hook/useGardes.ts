import { useEffect, useState } from 'react';
import type { Garde } from '../types/garde';
import { GardeService } from '../services/gardeService';

export const useGardes = () => {
    const [gardes, setGardes] = useState<Garde[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchGardes = async () => {
            try {
                const data = await GardeService.getAllGardes();
                if (data) {
                    setGardes(data);
                }
            } catch (err: any) {
                setError(err.message || 'Erreur inconnue');
            } finally {
                setLoading(false);
            }
        };

        fetchGardes();
    }, []);

    return { gardes, loading, error };
};
