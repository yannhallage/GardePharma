import { http, axiosAdmin } from './axiosClient';
import type { IGetAllNotificationsResponse } from '../types/notification';


export const Notification = {
    getAll: (id: string) => {
        return http.get<IGetAllNotificationsResponse>(axiosAdmin, `/notifications/${id}`);
    },
};