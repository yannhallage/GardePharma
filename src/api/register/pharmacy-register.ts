
import { http, axiosAuth } from '@/api/axiosClient';
import type { PharmacyRegister, PharmacyRegisterResponse } from '@/types/register/pharmacy-register'


export const registerPhamarcy = {
    registerPhamarcy: (data: PharmacyRegister) =>
        http.post<PharmacyRegisterResponse>(axiosAuth,'/inscription', data),
};