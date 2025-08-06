

export interface AdminHistoryItem {
    reference: string;
    date: string;
    action: string;
    user: string;
    responsable: string;
    details?: string;
}
// action: 'Ajout' | 'Modification' | 'Suppression';
