export interface PharmacyRegister {
    nom_pharmacie: string;
    identification: string;
    chef_pharmacie: string;
<<<<<<< HEAD
    commune: string;
    details: string;
    numero: string;
    lieu: string;
=======
>>>>>>> eb0eb9cb56ab09290bdf7a8c48c965f510871f3d
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
        identification: string;
        chef_pharmacie: string;
        commune: string;
        lieu: string;
        details: string;
        numero: string;
        lieu: string;
        email: string;
        userType: string;
        [key: string]: any;
    };
}
