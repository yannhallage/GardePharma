
import { fetchAdminHistoryApi } from '../api/admin-history';
// import type { AdminHistoryItem } from '../types/admin-history.type';
import type { HistoriqueApiResponse } from '../types/historiques';


export const fetchAdminHistory = async (id: string): Promise<HistoriqueApiResponse> => {
    return await fetchAdminHistoryApi(id);
};
