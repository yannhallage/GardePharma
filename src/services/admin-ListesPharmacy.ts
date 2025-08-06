
import { userApi } from '../api/ListesPharmacy';
import type {ListPharmacyByAdminResponse } from '../types/ListesPharmacy.type';

export const userService = {
    // addPharmacyUser: async (data: AddPharmacyUserPayload) => {
    //     return await userApi.createPharmacyUser(data);
    // },
    GetAllListePharmacyByAdmin: async (id:string): Promise<ListPharmacyByAdminResponse> => {
        return await userApi.getListePharmacy(id);
    },
    deletePharmacy: async (id: string): Promise<void> => {
        return await userApi.deletePharmacy(id);
    },

};