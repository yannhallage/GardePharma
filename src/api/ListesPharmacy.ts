// des actions sur la pharmacies a partie de l'administrateur 

import { http, axiosPharma, axiosAdmin } from './axiosClient';
import type { AddPharmacyUserPayload, AddPharmacyUserResponse } from '../types/ListesPharmacy.type';

export const userApi = {
    createPharmacyUser: async (data: AddPharmacyUserPayload, id: string) =>
        http.post<AddPharmacyUserResponse>(axiosAdmin, `/creerPharmacy/${id}`, data),

    getListePharmacy: async (id: string): Promise<AddPharmacyUserPayload[]> => {
        const res = await axiosAdmin.get(`/obtenirListePharmacy/${id}`);
        return res.data;
    },
    deletePharmacy: async (identification: string): Promise<void> => {
        await axiosAdmin.delete(`/pharmacies/supprimer/${identification}`);
    },

}
