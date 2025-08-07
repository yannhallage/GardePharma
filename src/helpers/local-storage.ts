import type { AuthentificationResponse } from '../types/auth/authentification.type';

import type { AuthAdminResponse } from '../types/auth/authAdmin.types';
import type { PharmacyRegisterResponse } from '../types/register/pharmacy-register';


export const setSession = (data: Record<string, string>) => {
    Object.entries(data).forEach(([key, value]) => {
        localStorage.setItem(key, value);
    });
};


export const removeSession = () => {
    localStorage.clear();
    console.log('session suppremée')
};


export const LocalStorage = (response: AuthentificationResponse | AuthAdminResponse | PharmacyRegisterResponse) => {
    console.log('session crée')
    return setSession({
        authToken: response.token,
        userEmail: response.user.email,
        userType: response.user.userType,
        userNumero: response.user.numero,
        userId: response.user.id,
        userNom: response.user.nom,
        userPrenom: response.user.prenom,
    })
}

export const getSession = () => {
    const token = localStorage.getItem('authToken');
    const userEmail = localStorage.getItem('userEmail');
    const userType = localStorage.getItem('userType');
    const userId = localStorage.getItem('userId');
    const userNom = localStorage.getItem('userNom');
    const userNumero = localStorage.getItem('userNumero');
    const userPrenom = localStorage.getItem('userPrenom');

    if (!token || !userEmail || !userType) return null;

    return {
        token,
        userEmail,
        userType,
        userId,
        userNom,
        userPrenom,
        userNumero
    };
};
