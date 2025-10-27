// src/services/gardeService.ts
import type { AttributCreerGarde, ListGardByAdminResponse } from '../types/garde';
import type { UpdateGardes } from '../types/garde';
import { GardeAPI } from '../api/garde.api';
import type { PharmacyGardeResponse, RawPharmacyFromBackend } from '../types/PharmacyGardeInfo';
import { http, axiosAdmin } from '@/api/axiosClient';
import { getSession } from '@/helpers/local-storage';


const session_id = getSession()?.userId;

if (!session_id) {
  console.log("Utilisateur non identifié");
}


interface UpdateOrDeleteGardePayload {
  id_garde: string;
  action: 'update' | 'delete';
  userId: string;
}

export const GardeService = {
  getAllGardes: async (id: string): Promise<ListGardByAdminResponse> => {
    return await GardeAPI.getAll(id);
  },

  getGardeById: async (id: string): Promise<AttributCreerGarde> => {
    return await GardeAPI.getById(id);
  },

  deleteGardeById: async (id: string): Promise<void> => {
    return await GardeAPI.delete(id);
  },

  updateGardeByPharma: (id: string, data: UpdateGardes) => {
    return GardeAPI.updateGardeByPharma(id, data);
  },

  updateOrDeleteGarde: (payload: UpdateOrDeleteGardePayload) => {
    const session_id = getSession()?.userId;
    if (!session_id) throw new Error("Utilisateur non identifié");

    return GardeAPI.updateGarde(payload, session_id);
  },


  updateStatutGarde: async (
    id: string,
    statut: 'En attente' | 'Validée' | 'Rejetée'
  ): Promise<AttributCreerGarde> => {
    return await GardeAPI.updateStatus(id, statut);
  },


  // obtenir toutes les pharmacies de garde
  ObtenirToutesLesPharmaciesDeGardes: async (): Promise<RawPharmacyFromBackend> => {
    return await GardeAPI.ObetenirToutesLesGardes();
  },

};
