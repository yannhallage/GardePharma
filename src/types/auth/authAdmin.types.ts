

export interface AuthAdmin {
    userType: string;
    email: string;
    password: string;
}

export interface AuthAdminResponse {
    token: string;
    user: {
        id: string;
        nom: string;
        prenom: string;
        numero: string
        email: string;
        commune: string;
        lieu: string;
        details: string;
        [key: string]: any;
    };
}