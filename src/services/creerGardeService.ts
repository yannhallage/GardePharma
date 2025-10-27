import { PostGarde } from "@/api/postGarde";
import type { AttributCreerGarde } from "@/types/garde";

export const GardeService = {
  createGarde: async (data: AttributCreerGarde, userID: string): Promise<void> => {
    await PostGarde.create(data, userID);
  },
};
