import { useEffect, useState } from 'react';
import { NotificationService } from '@/services/notification-service';
import type { INotification } from '@/types/notification';
import { getSession } from '@/helpers/local-storage';

export function useNotifications() {
    const [notifications, setNotifications] = useState<INotification[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const userId = getSession()?.userId;
        if (!userId) {
            setLoading(false);
            setNotifications([]);
            return;
        }

        NotificationService.getAll(userId)
            .then((res) => {
                setNotifications(res.data);
            })
            .catch((err) => {
                console.error('Erreur récupération notifications', err);
            })
            .finally(() => {
                setLoading(false);
            });
    }, []);

    return { notifications, loading };
}
