import { useState } from 'react';
import type { PharmacyRegister, PharmacyRegisterResponse } from '../../types/register/pharmacy-register';
import { registerPharmacyService } from '@/services/register/register-pharmacyService';
import { LocalStorageInscriptionPharmacie } from '@/helpers/local-storage';

export const useRegisterPharmacy = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const register = async (
        credentials: PharmacyRegister
    ): Promise<PharmacyRegisterResponse | null> => {
        setLoading(true);
        setError(null);

        let payload: PharmacyRegister | FormData = credentials;

        if (credentials.images instanceof File) {
            const formData = new FormData();
            Object.entries(credentials).forEach(([key, value]) => {
                if (key === 'images' && value) {   // <-- corriger ici
                    formData.append('images', value as File);  // 'photo' doit matcher avec upload.single("photo")
                } else if (value !== undefined && value !== null) {
                    formData.append(key, String(value));
                }
            });
            payload = formData;
        }


        try {
            const response = await registerPharmacyService.register(payload);

            if (response && response.token && response.user) {
                console.log(response)
                LocalStorageInscriptionPharmacie(response);
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

