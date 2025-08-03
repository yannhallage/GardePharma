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
        userType: response.user.userType
    })
}