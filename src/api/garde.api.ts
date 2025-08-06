// src/api/gardeApi.ts
import type { AttributCreerGarde,ListGardByAdminResponse } from '../types/garde';
import { axiosAdmin,axiosPharma } from './axiosClient';

export const GardeAPI = {
  getAll: async (id: string): Promise<ListGardByAdminResponse> => {
    const res = await axiosAdmin.get(`/gererGardes/${id}`);
    return res.data;
  },

  getById: async (id: string): Promise<AttributCreerGarde> => {
    const res = await axiosPharma.get(`/consulterGardes/${id}`);
    return res.data;
  },

  delete: async (id: string): Promise<void> => {
    await axiosAdmin.delete(`/gardes/${id}`);
  },

  updateStatus: async (
    id: string,
    statut: 'En attente' | 'Validée' | 'Rejetée'
  ): Promise<AttributCreerGarde> => {
    const res = await axiosAdmin.patch(`/gardes/${id}`, { statut });
    return res.data;
  },
};
