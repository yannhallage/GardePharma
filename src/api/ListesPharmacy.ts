

import { http } from './axiosClient';
import type { AddPharmacyUserPayload, AddPharmacyUserResponse } from '../types/ListesPharmacy.type';

export const userApi = {
    createPharmacyUser: (data: AddPharmacyUserPayload) =>
        http.post<AddPharmacyUserResponse>('/pharmacies', data),
};
