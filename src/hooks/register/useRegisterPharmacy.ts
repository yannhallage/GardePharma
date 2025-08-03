import { useState } from 'react';
import type { PharmacyRegister, PharmacyRegisterResponse } from '../../types/register/pharmacy-register';
import { registerPharmacyService } from '@/services/register/register-pharmacyService';
import { LocalStorage } from '@/lib/local-storage';

export const useRegisterPharmacy = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const register = async (credentials: PharmacyRegister): Promise<PharmacyRegisterResponse | null> => {
        setLoading(true);
        setError(null);
        try {
            const response = await registerPharmacyService.register(credentials);
            LocalStorage(response)
            return response;
        } catch (err: any) {
            setError(err.response?.data?.message || 'Erreur de connexion');
            return null;
        } finally {
            setLoading(false);
        }
    };

    return { register, loading, error };
};