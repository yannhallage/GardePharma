// des actions sur la pharmacies a partie de l'administrateur 

import { http, axiosClient } from './axiosClient';
import type { AddPharmacyUserPayload, AddPharmacyUserResponse } from '../types/ListesPharmacy.type';

export const userApi = {
    createPharmacyUser: (data: AddPharmacyUserPayload) =>
        http.post<AddPharmacyUserResponse>('/pharmacies', data),

    getListePharmacy: async (): Promise<AddPharmacyUserPayload[]> => {
        const res = await axiosClient.get('/pharmacies');
        return res.data;
    },
    deletePharmacy: async (identification: string): Promise<void> => {
        await axiosClient.delete(`/pharmacies/supprimer/${identification}`);
    },

}
