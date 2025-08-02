

export interface AdminHistoryItem {
    reference: string;
    date: string;
    action: 'Ajout' | 'Modification' | 'Suppression';
    user: string;
    responsible: string;
    details?: string;
}
