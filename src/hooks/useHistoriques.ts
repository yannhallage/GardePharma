import { useEffect, useState } from 'react';
import { HistoriquePharmacyService } from '@/services/historiquePharmacyServices';
import type { Historique_Pharmacy } from '@/types/historiques';

export const useHistorique = () => {
    const [data, setData] = useState<Historique_Pharmacy[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await HistoriquePharmacyService.getHistorique();
                setData(res);
            } catch (err: any) {
                setError(err.message || 'Erreur inconnue');
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    return { data, loading, error };
};
