export interface PharmacyGardeInfo {
    id?:string,
    nom_pharmacie: string;
    commune: string;
    statut: string;
    date: string;
    description: string;
    lieu: string;
    email: string;
    numero: string;
    image: string;
    isOnDuty?: true,
    rating?: 4.3,
    dutyHours?: '';
    distance?: '1.2 km',
    capacity?: 90,
    logo?: '💊',
    services?: ['Médicaments', 'Conseils', 'Vaccination'],
    itineraire: any;
}


export interface RawPharmacyFromBackend {
    id: string;
    identification: string;
    nom_pharmacie: string;
    chef_pharmacie: string;
    details?: string;
    commune: string;
    itineraire: string; // format "lat,lng"
    description?: string;
    lieu?: string;
    email?: string;
    numero?: string;
    password?: string;
    createdAt?: string;
    updatedAt?: string;
    __v?: number;
    image?: any;
    imageType?: string;
}

export type PharmacyGardeResponse = PharmacyGardeInfo[];
