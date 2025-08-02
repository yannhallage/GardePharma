
import type { Historique_Pharmacy } from "@/types/historiques";
import { axiosClient } from "./axiosClient";


export const HistoriqueAPI_Pharmacy = {
  getAll: async (): Promise<Historique_Pharmacy[]> => {
    const res = await axiosClient.get('/historique');
    return res.data;
  },
};