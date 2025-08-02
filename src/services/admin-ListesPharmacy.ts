
import { userApi } from '../api/ListesPharmacy';
import type { AddPharmacyUserPayload } from '../types/ListesPharmacy.type';

export const userService = {
    addPharmacyUser: async (data: AddPharmacyUserPayload) => {
        return await userApi.createPharmacyUser(data);
    },
    GetAllListePharmacyByAdmin: async (): Promise<AddPharmacyUserPayload[]> => {
        return await userApi.getListePharmacy();
    }

};