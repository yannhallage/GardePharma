import { useState } from 'react';
import type { Authentification, AuthentificationResponse } from '@/types/auth/authentification.type';
import type { AuthAdmin, AuthAdminResponse } from '@/types/auth/authAdmin.types'
import { authService } from '@/services/auth/authService';
import { LocalStorage, LoginPharmacy } from '@/helpers/local-storage';

export const useAuth = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const login = async (credentials: Authentification): Promise<AuthentificationResponse | null> => {
        setLoading(true);
        setError(null);
        try {
            const response = await authService.login(credentials);
            console.log(response)
            LoginPharmacy(response)
            return response;
        } catch (err: any) {
            setError(err.response?.data?.message || 'Erreur de connexion');
            return null;
        } finally {
            setLoading(false);
        }
    };

    return { login, loading, error };
};

export const useAuthAdmin = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const loginAdmin = async (credentials: AuthAdmin): Promise<AuthAdminResponse | null> => {
        setLoading(true);
        setError(null);
        try {
            const response = await authService.loginAdmin(credentials);
            console.log(response)
            LocalStorage(response)
            return response;
        } catch (err: any) {
            setError(err.response?.data?.message || 'Erreur de connexion');
            return null;
        } finally {
            setLoading(false);
        }
    };

    return { loginAdmin, loading, error };
};


