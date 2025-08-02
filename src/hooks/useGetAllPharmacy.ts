import { useState, useEffect } from 'react';
import type { AddPharmacyUserPayload } from '../types/ListesPharmacy.type';
import { userService } from '../services/admin-ListesPharmacy';

export function useGetAllPharmacy(refreshKey = 0) {
    const [data, setData] = useState<AddPharmacyUserPayload[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await userService.GetAllListePharmacyByAdmin();
                setData(res);
            } catch (err: any) {
                setError(err.message || 'Erreur inconnue');
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [refreshKey]);

    return { data, loading, error };
}