import { useState } from 'react';
import type { PharmacyRegister, PharmacyRegisterResponse } from '../../types/register/pharmacy-register';
import { registerPharmacyService } from '@/services/register/register-pharmacyService';
import { LocalStorageInscriptionPharmacie } from '@/helpers/local-storage';

export const useRegisterPharmacy = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const register = async (credentials: PharmacyRegister): Promise<PharmacyRegisterResponse | null> => {
        setLoading(true);
        setError(null);
        try {
            const response = await registerPharmacyService.register(credentials);
            console.log('Réponse inscription pharmacie:', response);

            if (response && response.token && response.user) {
                try {
                    LocalStorageInscriptionPharmacie(response);
                } catch (storageError) {
                    console.error('Erreur lors de l’écriture de la session', storageError);
                }
            }

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
