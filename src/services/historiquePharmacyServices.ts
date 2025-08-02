
import { HistoriqueAPI_Pharmacy } from "@/api/historiquePharmacy";
import type { Historique_Pharmacy } from "@/types/historiques";

export const HistoriquePharmacyService = {
    getHistorique: async (): Promise<Historique_Pharmacy[]> => {
        return await HistoriqueAPI_Pharmacy.getAll();
    },
};