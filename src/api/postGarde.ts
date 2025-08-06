import { http, axiosPharma, axiosAdmin } from "./axiosClient";
import type { AttributCreerGarde } from "@/types/garde";

export const PostGarde = {
    create: (data: AttributCreerGarde, id: string) => http.post<AttributCreerGarde, AttributCreerGarde>(axiosPharma, `/creergardes/${id}`, data),
};
