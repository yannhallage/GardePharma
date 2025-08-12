import { useState } from 'react';
import { toast } from 'react-hot-toast';
import { GardeService } from '@/services/gardeService';

export function useAcceptGarde() {
    const [loading, setLoading] = useState(false);

    const acceptGarde = async (id: string, userId: string) => {
        setLoading(true);
        try {
            await GardeService.updateOrDeleteGarde({
                id_garde: id,
                action: "update",
                userId,
            });
            toast.success('Garde acceptée.');
        } catch (err) {
            toast.error('Erreur acceptation.');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    return { acceptGarde, loading };
}
