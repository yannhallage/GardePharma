import type { UserProfile } from "@/types/UserProfilePharmacy";
import { http, axiosPharma } from "./axiosClient";

export const updateProfilPharmacy = {
    // get: () => http.get<UserProfile>('/user/profile'),
    update: (data: Partial<UserProfile>, id: string) => http.put<UserProfile, Partial<UserProfile>>(axiosPharma, `/modifierProfil/${id}`, data),
}