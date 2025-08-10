import { useState, useEffect } from 'react';
import type { AddPharmacyUserPayload, ListPharmacyByAdminResponse } from '../types/ListesPharmacy.type';
import { userService } from '../services/admin-ListesPharmacy';

export function useGetAllPharmacy(userId?: string) {
    const [data, setData] = useState<AddPharmacyUserPayload[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    // useEffect(() => {
    //     if (!userId) return;
    //     const fetchData = async () => {
    //         try {
    //             const res = await userService.GetAllListePharmacyByAdmin(id);
    //             setData(res.data);
    //         } catch (err: any) {
    //             setError(err.message || 'Erreur inconnue');
    //         } finally {
    //             setLoading(false);
    //         }
    //     };

    //     fetchData();
    // }, [refreshKey]);
    useEffect(() => {
        if (!userId) return;

        userService.GetAllListePharmacyByAdmin(userId)
            .then((res) => {
                const dataResponse = res?.data;

                if (!Array.isArray(dataResponse)) {
                    console.warn('Les données ne sont pas un tableau :', dataResponse);
                    return setData([]);
                }
                console.log('Les données sont un tableau :', dataResponse);
                const mapped = dataResponse.map((item) => ({
                    id: item.id,
                    identification: item.identification,
                    nom_pharmacie: item.nom_pharmacie,
                    chef_pharmacie: item.chef_pharmacie,
                    lieu: item.lieu,
                    commune: item.commune,
                    numero: item.numero,
                    email: item.email,
                    details: item.details,
                }));

                setData(mapped);
            })
            .catch((err) => {
                console.error('Erreur récupération de la liste des pharmacies :', err);
                setData([]);
            })
            .finally(() => setLoading(false));
    }, [userId]);
    return { data, loading, error };
}