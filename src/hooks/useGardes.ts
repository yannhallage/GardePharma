// useGardes.ts
import { useEffect, useState } from 'react';
import type { AttributCreerGarde, GardeFromAPI, ListGardByAdminResponse } from '../types/garde';
import { GardeService } from '../services/gardeService';

export const useGardes = (userId?: string, utilisateur_type?: string) => {
    const [gardes, setGardes] = useState<AttributCreerGarde[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!userId) return;

        if (utilisateur_type === 'admin') {
            GardeService.getAllGardes(userId)
                .then((res: ListGardByAdminResponse) => {
                    const dataResponse = res.data;
                    if (!Array.isArray(dataResponse)) {
                        return setGardes([]);
                    }

                    const mapped: AttributCreerGarde[] = dataResponse.map((item) => ({
                        _id: item._id,
                        reference: item.reference,
                        identification_pharma: item.identification_pharma,
                        date: item.date,
                        type: item.type,
                        nom_pharmacie: item.nom_pharmacie,
                        responsable: item.responsable,
                        commune: item.commune,
                        statut: item.statut,
                        commentaire: item.commentaire,
                        userId: item.userId,
                    }));

                    setGardes(mapped);
                })
                .catch((err) => {
                    console.error('Erreur récupération de la liste des pharmacies :', err);
                    setGardes([]);
                })
                .finally(() => setLoading(false));

        } else {
            GardeService.getGardeById(userId)
                .then((res:GardeFromAPI) => {
                    const dataResponse = res;
                    console.log(dataResponse);

                    if (!Array.isArray(dataResponse)) {
                        console.warn('Les données ne sont pas un tableau :', dataResponse);
                        return setGardes([]);
                    }

                    const mapped: AttributCreerGarde[] = dataResponse.map((item) => ({
                        _id: item._id,
                        reference: item.reference,
                        identification_pharma: item.identification_pharma,
                        date: item.date,
                        type: item.type,
                        nom_pharmacie: item.nom_pharmacie,
                        responsable: item.responsable,
                        commune: item.commune,
                        statut: item.statut,
                        commentaire: item.commentaire,
                        userId: item.userId
                    }));

                    setGardes(mapped);
                })
                .catch((err) => {
                    console.error('Erreur récupération de la liste des pharmacies :', err);
                    setGardes([]);
                })
                .finally(() => setLoading(false));
        }
    }, [userId, utilisateur_type]);

    return { gardes, loading, error };
};
