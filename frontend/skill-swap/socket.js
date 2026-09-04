import { io } from "socket.io-client";

const socket = io(import.meta.env.VITE_SOCKET_URL || "https://skill-swap-backend-ew5e.onrender.com", {
  autoConnect: false,
});

export default socket;
