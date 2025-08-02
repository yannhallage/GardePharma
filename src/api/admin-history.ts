import { http } from './axiosClient';
import type { AdminHistoryItem } from '../types/admin-history.type';


export const fetchAdminHistoryApi = () => {
    return http.get<AdminHistoryItem[]>('/admin-history');
};
