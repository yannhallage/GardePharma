import type { AuthentificationResponse } from '../types/auth/authentification.type';

import type { AuthAdminResponse } from '../types/auth/authAdmin.types';
import type { PharmacyRegisterResponse } from '../types/register/pharmacy-register';


export const setSession = (data: Record<string, unknown>) => {
    Object.entries(data).forEach(([key, value]) => {
        if (!key.startsWith('user') && key !== 'authToken') {
            return;
        }
        if (value !== undefined && value !== null) {
            localStorage.setItem(key, String(value));
        }
    });
};


export const updateSessionValue = (key: string, value: string) => {
    if (!key) {
        console.warn('Clé invalide pour updateSessionValue');
        return;
    }
    try {
        localStorage.setItem(key, value);
        console.log(`Clé "${key}" mise à jour avec la valeur "${value}"`);
    } catch (error) {
        console.error('Erreur lors de la mise à jour du localStorage :', error);
    }
};



export const removeSession = () => {
    localStorage.clear();
    console.log('session suppremée')
};


export const LocalStorage = (response: AuthentificationResponse | AuthAdminResponse | PharmacyRegisterResponse) => {
    setSession({
        authToken: response.token,
        userEmail: response.user.email,
        userType: response.user.userType,
        userNumero: response.user.numero,
        userId: response.user.id,
        userNom: response.user.nom,
        userPrenom: response.user.prenom,
    })
    return console.log('Session enregistrée avec succès');
}
export const LocalStorageInscriptionPharmacie = (response: PharmacyRegisterResponse) => {
    console.log('session crée', response);
    // localStorage.setItem('authToken', response.token);
    setSession({
        authToken: response.token,
        userEmail: response.user.email,
        userType: response.user.userType, // sécurité sur userType ou role
        userNumero: response.user.numero,
        userId: response.user.id,
        userNom: response.user.nom_pharmacie,
        userPrenom: response.user.chef_pharmacie,
    });
    return console.log('Session enregistrée avec succès');
}
export const LoginPharmacy = (response: AuthentificationResponse) => {
    setSession({
        authToken: response.token,
        userEmail: response.user.email,
        userType: response.user.userType, // sécurité sur userType ou role
        userNumero: response.user.numero,
        userId: response.user.identification,
        userNom: response.user.nom_pharmacie,
        userPrenom: response.user.chef_pharmacie,
    });
    return console.log('Session enregistrée avec succès');
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
