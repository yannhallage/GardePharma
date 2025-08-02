import { PostGarde } from "@/api/postGarde";
import type { AttributCreerGarde } from "@/types/garde";

export const GardeService = {
  createGarde: async (data: AttributCreerGarde): Promise<void> => {
    await PostGarde.create(data);
  },
};
