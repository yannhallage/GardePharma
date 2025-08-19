import { useEffect, useState } from 'react';
import type { PharmacyGardeResponse, RawPharmacyFromBackend } from '../types/PharmacyGardeInfo';
import { GardeService } from '../services/gardeService';

export interface Pharmacy {
    id: string;
    name: string;
    address: string;
    phone: string;
    mail: string;
    coordinates: [number, number];
    isOnDuty: boolean;
    dutyHours?: string;
    rating: number;
    distance: string;
    description: string;
    capacity: number;
    logo: string;
    services?: string[];
    image?: string;       // ⚡ Ici l'image en Base64 "data:image/jpeg;base64,..."
    imageType?: string;
    commune: string;
    details: string;
}

export function usePharmaciesDeGardes() {
    const [data, setData] = useState<Pharmacy[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchPharmacies = async () => {
            try {
                setLoading(true);
                const result: RawPharmacyFromBackend[] = await GardeService.ObtenirToutesLesPharmaciesDeGardes();
                console.log(result)
                const mapped: Pharmacy[] = result.map((raw) => {
                    const [lat, lng] = raw.itineraire.split(',').map(Number);

                    return {
                        id: raw.id,
                        name: raw.nom_pharmacie,
                        address: raw.details || raw.lieu || '',
                        commune: raw.commune,
                        description: raw.description,
                        phone: raw.numero,
                        mail:raw.email,
                        coordinates: [lat, lng] as [number, number],
                        isOnDuty: true,
                        imageUrl: raw.image || undefined,
                        rating: 4.3,
                        distance: '1.2 km',
                        capacity: 90,
                        logo: '💊',
                        services: ['Médicaments', 'Conseils', 'Vaccination'],
                    };
                });

                setData(mapped);
            } catch (err: any) {
                setError(err.message || "Une erreur est survenue");
            } finally {
                setLoading(false);
            }
        };

        fetchPharmacies();
    }, []);

    return { data, loading, error };
}
