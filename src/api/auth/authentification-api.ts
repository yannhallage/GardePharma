
import { http } from '@/api/axiosClient';
import type { Authentification, AuthentificationResponse } from '@/types/auth/authentification.type'
import type { AuthAdmin, AuthAdminResponse } from '@/types/auth/authAdmin.types'

export const authApi = {
    login: (data: Authentification) =>
        http.post<AuthentificationResponse>('/auth/login', data),
};
export const authApiAdmin = {
    login: (data: AuthAdmin) =>
        http.post<AuthAdminResponse>('/auth/login', data),
};
