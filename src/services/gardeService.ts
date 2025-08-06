// src/services/gardeService.ts
import type { AttributCreerGarde,ListGardByAdminResponse } from '../types/garde';
import { GardeAPI } from '../api/garde.api';

export const GardeService = {
  getAllGardes: async (id:string): Promise<ListGardByAdminResponse> => {
    return await GardeAPI.getAll(id);
  },

  getGardeById: async (id: string): Promise<AttributCreerGarde> => {
    return await GardeAPI.getById(id);
  },

  deleteGardeById: async (id: string): Promise<void> => {
    return await GardeAPI.delete(id);
  },

  updateStatutGarde: async (
    id: string,
    statut: 'En attente' | 'Validée' | 'Rejetée'
  ): Promise<AttributCreerGarde> => {
    return await GardeAPI.updateStatus(id, statut);
  },
};
