
import { getSocket } from '@/api/sockets/socket';

export const onNotification = (callback: (data: { message: string }) => void) => {
    const socket = getSocket();
    socket.on('notification', callback);
};

export const offNotification = (callback: (data: { message: string }) => void) => {
    const socket = getSocket();
    socket.off('notification', callback);
};
