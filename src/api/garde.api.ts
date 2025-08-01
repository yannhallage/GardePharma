import type { Garde } from '../types/garde';
import { axiosClient } from './axiosClient';

export const GardeAPI = {
  getAll: async (): Promise<Garde[]> => {
    const res = await axiosClient.get('/gardes');
    return res.data;
  },
};
