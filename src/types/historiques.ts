import type { AdminHistoryItem } from './admin-history.type';

export interface Historique_Pharmacy {
  reference: string;
  date: string;
  type: string;
  nom_pharmacie: string;
  responsable: string;
  commune: string;
  statut: string;
  commentaire: string;
}


export type HistoriqueApiResponse = {
  success: boolean;
  message: string;
  data: AdminHistoryItem[];
};
