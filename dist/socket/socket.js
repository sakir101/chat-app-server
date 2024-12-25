"use strict";
// import { Server as SocketIOServer } from 'socket.io';
// import { server } from '../server';
// const io = new SocketIOServer(server, {
//     cors: {
//         origin: "http://localhost:3000", // Allow requests from your client-side app
//         methods: ["GET", "POST"],       // HTTP methods allowed
//     },
//     transports: ["websocket", "polling"], // Enable both websocket and polling
// });
// // Online users map
// const userSocketMap: Record<string, string> = {};
// // Function to get a receiver's socket ID
// export function getReceiverSocketId(userId: string): string | undefined {
//     return userSocketMap[userId];
// }
// // Listen for socket connections
// io.on('connection', (socket) => {
//     console.log('A user connected', socket.id);
//     const userId = socket.handshake.query.userId as string | undefined;
//     if (userId) {
//         userSocketMap[userId] = socket.id;
//     }
//     // Emit list of online users to all connected clients
//     io.emit('getOnlineUsers', Object.keys(userSocketMap));
//     socket.on('disconnect', () => {
//         console.log('A user disconnected', socket.id);
//         if (userId) {
//             delete userSocketMap[userId];
//         }
//         io.emit('getOnlineUsers', Object.keys(userSocketMap));
//     });
// });
// export { io };
