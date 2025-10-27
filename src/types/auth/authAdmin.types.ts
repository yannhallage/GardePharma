

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
<<<<<<< HEAD
=======
        commune: string;
        lieu: string;
        details: string;
        [key: string]: any;
>>>>>>> eb0eb9cb56ab09290bdf7a8c48c965f510871f3d
    };
}