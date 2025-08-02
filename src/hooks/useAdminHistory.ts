

import { useEffect, useState } from 'react';
import { fetchAdminHistory } from '../services/admin-historyService';
import type { AdminHistoryItem } from '../types/admin-history.type';

export function useAdminHistory() {
    const [history, setHistory] = useState<AdminHistoryItem[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchAdminHistory()
            .then(setHistory)
            .catch(() => setHistory([]))
            .finally(() => setLoading(false));
    }, []);

    return { history, loading };
}
