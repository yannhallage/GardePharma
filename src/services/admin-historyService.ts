
import { fetchAdminHistoryApi } from '../api/admin-history';
import type { AdminHistoryItem } from '../types/admin-history.type';

export const fetchAdminHistory = async (): Promise<AdminHistoryItem[]> => {
    return await fetchAdminHistoryApi();
};
