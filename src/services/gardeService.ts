import type { Garde } from '../types/garde';
import { GardeAPI } from '../api/garde.api';

export const GardeService = {
  getAllGardes: async (): Promise<Garde[]> => {
    return await GardeAPI.getAll();
  },
};
