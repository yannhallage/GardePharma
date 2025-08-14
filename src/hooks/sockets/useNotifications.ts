// src/hooks/useNotifications.ts
import { useEffect, useState } from 'react';
import { initSocket } from '@/api/sockets/socket';
import { onNotification, offNotification } from '@/services/sockets/notificationService';
import { toast } from 'react-hot-toast';

export const useNotification = (userId: string) => {
    const [lastNotification, setLastNotification] = useState<string | null>(null);
    useEffect(() => {
        if (!userId) return;

        // Initialise la connexion socket
        // console.log(userId)
        initSocket(userId);

        const handleNotification = (data: { message: string }) => {
            console.log("Notif reçue:", data);
            // toast.success(`Notification: ${data.message}`);
            setLastNotification(data.message);
        };

        // S'abonner aux notifications
        onNotification(handleNotification);

        return () => {
            // Se désabonner
            offNotification(handleNotification);
        };
    }, [userId]);
    return lastNotification;
};

