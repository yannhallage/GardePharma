// useGardes.ts
import { useEffect, useState } from 'react';
import type { AttributCreerGarde } from '../types/garde';
import { GardeService } from '../services/gardeService';

export const useGardes = (userId?: string) => {
    const [gardes, setGardes] = useState<AttributCreerGarde[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    // useEffect(() => {
    //     const fetchGardes = async () => {
    //         setLoading(true);
    //         try {
    //             const data = await GardeService.getAllGardes();
    //             setGardes(data);
    //         } catch (err: any) {
    //             setError(err.message || 'Erreur inconnue');
    //         } finally {
    //             setLoading(false);
    //         }
    //     };

    //     fetchGardes();
    // }, [refreshKey]);
    useEffect(() => {
        if (!userId) return;

        GardeService.getAllGardes(userId)
            .then((res) => {
                const dataResponse = res?.data;

                if (!Array.isArray(dataResponse)) {
                    console.warn('Les données ne sont pas un tableau :', dataResponse);
                    return setGardes([]);
                }

                const mapped = dataResponse.map((item) => ({
                    id: item.id,
                    date: item.date,
                    type: item.type,
                    nom_pharmacie: item.nom_pharmacie,
                    responsable: item.responsable,
                    commune: item.commune,
                    statut: item.statut,
                    commentaire: item.commentaire,
                }));

                setGardes(mapped);
            })
            .catch((err) => {
                console.error('Erreur récupération de la liste des pharmacies :', err);
                setGardes([]);
            })
            .finally(() => setLoading(false));
    }, [userId]);
    return { gardes, loading, error };
};
