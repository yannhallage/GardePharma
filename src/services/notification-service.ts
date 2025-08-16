

import { axiosPublic, http } from "@/api/axiosClient";
// import { Notification } from "@/api/notification.api";
import type { IGetAllNotificationsResponse } from "@/types/notification";


export const NotificationService = {
    getAll: (id: string) => {
        return http.get<IGetAllNotificationsResponse>(axiosPublic, `/notifications/${id}`);
    },
};