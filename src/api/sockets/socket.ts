import io from 'socket.io-client';

let socket: ReturnType<typeof io> | null = null;
const socketUrl = import.meta.env.VITE_API_URL_SOCKET;

export const initSocket = (userId: string) => {
    if (!socket) {
        socket = io(socketUrl);

        socket.on('connect', () => {
            console.log('Socket connecté', socket?.id);
            socket?.emit('joinRoom', userId);
        });

        socket.on('disconnect', () => {
            console.log('Socket déconnecté');
        });
    }
    return socket;
};

export const getSocket = () => {
    if (!socket) throw new Error('Socket non initialisé');
    return socket;
};
