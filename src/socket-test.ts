// socket-test.ts
import io from 'socket.io-client';

// URL de ton serveur Socket.IO
const socket = io("http://localhost:5000", {
    transports: ["websocket"], // évite le polling
});

socket.on("connect", () => {
    console.log("✅ Connecté au serveur Socket.IO !");
    console.log("📡 ID du socket :", socket.id);

    // Test : rejoindre une room
    socket.emit("joinRoom", "12345");
});

socket.on("disconnect", () => {
    console.log("❌ Déconnecté du serveur");
});

// Écouter un event "notification"
socket.on("notification", (message:string) => {
    console.log("📩 Notification reçue :", message);
});
