import { useState } from "react";
import type { AttributCreerGarde } from "@/types/garde";
import { GardeService } from "@/services/creerGardeService";

export const useCreateGarde = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState(false);

    const create = async (data: AttributCreerGarde) => {
        setLoading(true);
        setError(null);
        setSuccess(false);
        try {
            await GardeService.createGarde(data);
            setSuccess(true);
        } catch (err: any) {
            setError(err.response?.data?.message || err.message || "Erreur lors de la création");
            throw err;
        } finally {
            setLoading(false);
        }
    };

    return {
        create,
        loading,
        error,
        success,
    };
};
