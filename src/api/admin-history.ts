import { http, axiosAdmin } from './axiosClient';
// import type { AdminHistoryItem } from '../types/admin-history.type';
import type { HistoriqueApiResponse } from '../types/historiques';


export const fetchAdminHistoryApi = (id: string) => {
    return http.get<HistoriqueApiResponse>(axiosAdmin, `/listehistorique/${id}`);
};
