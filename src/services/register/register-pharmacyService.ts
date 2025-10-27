
import { registerPhamarcy } from '@/api/register/pharmacy-register';
import type { PharmacyRegister, PharmacyRegisterResponse } from '../../types/register/pharmacy-register';


export const registerPharmacyService = {
    register: async (data: PharmacyRegister | FormData): Promise<PharmacyRegisterResponse> => {
        return await registerPhamarcy.registerPhamarcy(data);
    }
};