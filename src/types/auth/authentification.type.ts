// cas de l'user (Pharmacy)
export interface Authentification {
    userType: string;
    email: string;
    password: string;
}

export interface AuthentificationResponse {
    token: string;
    user: {
        id: string;
        nom_pharmacie: string;
        chef_pharmacie:string;
        commune:string;
        details:string;
        numero:string;
        email: string;
        userType: string;
        [key: string]: any;
    };
}


