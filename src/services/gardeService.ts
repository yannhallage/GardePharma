// src/services/gardeService.ts
import type { AttributCreerGarde, ListGardByAdminResponse } from '../types/garde';
import type { UpdateGardes } from '../types/garde';
import { GardeAPI } from '../api/garde.api';

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

  updateStatutGarde: async (
    id: string,
    statut: 'En attente' | 'Validée' | 'Rejetée'
  ): Promise<AttributCreerGarde> => {
    return await GardeAPI.updateStatus(id, statut);
  },
};
