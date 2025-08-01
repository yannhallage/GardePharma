import type { UserProfile } from "@/types/UserProfilePharmacy";
import { http } from "./axiosClient";

export const updateProfilPharmacy = {
    get: () => http.get<UserProfile>('/user/profile'),
    update: (data: Partial<UserProfile>) => http.put<UserProfile, Partial<UserProfile>>('/user/profile', data),
}