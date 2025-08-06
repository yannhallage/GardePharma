import { authApi, authApiAdmin } from '@/api/auth/authentification-api';
import type { Authentification, AuthentificationResponse } from '@/types/auth/authentification.type';
import type { AuthAdmin, AuthAdminResponse } from '@/types/auth/authAdmin.types'

export const authService = {
    login: async (data: Authentification): Promise<AuthentificationResponse> => {
        return await authApi.login(data);
    },
    loginAdmin: async (data: AuthAdmin): Promise<AuthAdminResponse> => {
        return await authApiAdmin.login(data)
    }
};
