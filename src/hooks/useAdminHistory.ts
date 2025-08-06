import { useEffect, useState } from 'react';
import { fetchAdminHistory } from '../services/admin-historyService';
import type { AdminHistoryItem } from '../types/admin-history.type';

export function useAdminHistory(userId?: string) {
  const [history, setHistory] = useState<AdminHistoryItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!userId) return;

    fetchAdminHistory(userId)
      .then((res) => {
        const historique = res?.data;

        if (!Array.isArray(historique)) {
          console.warn('Les données ne sont pas un tableau :', historique);
          return setHistory([]);
        }

        const mapped = historique.map((item) => ({
          reference: item.reference,
          date: item.date,
          action: item.action ?? 'Ajout',
          user: item.user,
          responsable: item.responsable,
          details: item.details,
        }));

        setHistory(mapped);
      })
      .catch((err) => {
        console.error('Erreur récupération historique :', err);
        setHistory([]);
      })
      .finally(() => setLoading(false));
  }, [userId]);

  return { history, loading };
}
