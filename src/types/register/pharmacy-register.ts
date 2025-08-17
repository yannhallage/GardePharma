export interface PharmacyRegister {
    nom_pharmacie: string;
    chef_pharmacie: string;
    email: string;
    numero: string;
    commune: string;
    description: string;
    itineraire: string;
    images?: File | string; // <-- ici
    lieu: string;
    details: string;
    userType: string;
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
