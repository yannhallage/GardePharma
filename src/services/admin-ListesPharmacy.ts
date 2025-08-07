
import { userApi } from '../api/ListesPharmacy';
import type { ListPharmacyByAdminResponse, AddPharmacyUserPayload } from '../types/ListesPharmacy.type';

export const userService = {
    addPharmacyUser: async (data: AddPharmacyUserPayload, id: string) => {
        return await userApi.createPharmacyUser(data, id);
    },
    GetAllListePharmacyByAdmin: async (id: string): Promise<ListPharmacyByAdminResponse> => {
        return await userApi.getListePharmacy(id);
    },
    deletePharmacy: async (id: string): Promise<void> => {
        return await userApi.deletePharmacy(id);
    },

};