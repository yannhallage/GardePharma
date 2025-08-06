
import type { Historique_Pharmacy } from "@/types/historiques";
import { axiosPharma } from "./axiosClient";


export const HistoriqueAPI_Pharmacy = {
  getAll: async (id: string): Promise<Historique_Pharmacy[]> => {
    const res = await axiosPharma.get(`/histroriquesGardes/${id}`);
    return res.data;
  },
  // getAllHistoriqueByAdmin: async (id: string): Promise<Historique_Pharmacy[]> => {
  //   const res = await axiosAdmin.get(`/listehistorique/${id}`);
  //   return res.data;
  // },
};