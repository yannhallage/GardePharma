export interface PharmacyRegister {
    nom_pharmacie: string;
    identification: string;
    chef_pharmacie: string;
    commune: string;
    details: string;
    numero: string;
    lieu: string;
    email: string;
    userType?: string;
    password: string;
}

export interface PharmacyRegisterResponse {
    token: string;
    user: {
        id: string;
        nom_pharmacie: string;
        identification: string;
        chef_pharmacie: string;
        commune: string;
        details: string;
        numero: string;
        lieu: string;
        email: string;
        userType?: string;
        [key: string]: any;
    };
}
