// src/api/gardeApi.ts
import type { AttributCreerGarde, ListGardByAdminResponse } from '../types/garde';
import { axiosAdmin, axiosPharma } from './axiosClient';

interface UpdateOrDeleteGardePayload {
  id_garde: string;
  action: 'update' | 'delete';
  userId: string;
}


export const GardeAPI = {
  getAll: async (id: string): Promise<ListGardByAdminResponse> => {
    const res = await axiosAdmin.get(`/gererGardes/${id}`);
    return res.data;
  },

  getById: async (id: string): Promise<AttributCreerGarde> => {
    const res = await axiosPharma.get(`/consulterGardes/${id}`);
    return res.data;
  },

  updateGardeByPharma: async (
    id: string,
    data: { id_garde: string, newDate: string; statut: string; comments: string }
  ) => {
    const res = await axiosPharma.put(`/modifierGardes/${id}`, data);
    return res.data;
  },

  updateGarde: (payload: UpdateOrDeleteGardePayload,id: string) => {
    return axiosAdmin.post(`/sousrequete/${id}`, payload)
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
