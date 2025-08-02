import { http } from "./axiosClient";
import type { AttributCreerGarde } from "@/types/garde";

export const PostGarde = {
    create: (data: AttributCreerGarde) => http.post<AttributCreerGarde, AttributCreerGarde>('/gardes', data),
};
