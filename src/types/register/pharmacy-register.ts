export interface PharmacyRegister {
    nom_pharmacie: string;
    chef_pharmacie: string;
    commune: string;
    lieu: string;
    details: string;
    numero: string;
    email: string;
    userType?: string;
    password: string;
}

export interface PharmacyRegisterResponse {
    token: string;
    user: {
        id: string;
        identification: string;
        nom_pharmacie: string;
        chef_pharmacie: string;
        commune: string;
        lieu: string;
        details: string;
        numero: string;
        email: string;
        userType: string;
        [key: string]: any;
    };
}
