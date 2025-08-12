// src/hooks/useNotifications.ts
import { useEffect } from 'react';
import { initSocket } from '@/api/sockets/socket';
import { onNotification, offNotification } from '@/services/sockets/notificationService';
import { toast } from 'react-hot-toast';

export const useNotifications = (userId: string | undefined) => {
    useEffect(() => {
        if (!userId) return;

        // Initialise la connexion socket
        initSocket(userId);

        // Callback à appeler à chaque notif
        const handleNotification = (data: { message: string }) => {
            toast.success(`Notification: ${data.message}`);
        };

        // S'abonner aux notifications
        onNotification(handleNotification);

        return () => {
            // Se désabonner proprement
            offNotification(handleNotification);
        };
    }, [userId]);
};
