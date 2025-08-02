// src/api/gardeApi.ts
import type { AttributCreerGarde } from '../types/garde';
import { axiosClient } from './axiosClient';

export const GardeAPI = {
  getAll: async (): Promise<AttributCreerGarde[]> => {
    const res = await axiosClient.get('/gardes');
    return res.data;
  },

  getById: async (id: string): Promise<AttributCreerGarde> => {
    const res = await axiosClient.get(`/gardes/${id}`);
    return res.data;
  },

  delete: async (id: string): Promise<void> => {
    await axiosClient.delete(`/gardes/${id}`);
  },

  updateStatus: async (
    id: string,
    statut: 'En attente' | 'Validée' | 'Rejetée'
  ): Promise<AttributCreerGarde> => {
    const res = await axiosClient.patch(`/gardes/${id}`, { statut });
    return res.data;
  },
};
