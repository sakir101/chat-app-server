"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.io = exports.getReceiverSocketId = exports.server = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const socket_io_1 = require("socket.io"); // Import Socket.IO
const app_1 = __importDefault(require("./app"));
const index_1 = __importDefault(require("./config/index"));
process.on('uncaughtException', (error) => {
    console.error('Uncaught Exception:', error);
    process.exit(1);
});
let server;
exports.server = server;
let io;
exports.io = io;
// Online users map
const userSocketMap = {};
// Function to get a receiver's socket ID
function getReceiverSocketId(userId) {
    return userSocketMap[userId];
}
exports.getReceiverSocketId = getReceiverSocketId;
function boostrap() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            // Connect to MongoDB
            yield mongoose_1.default.connect(index_1.default.database_url);
            console.log('Database is connected successfully!');
            // Start the HTTP server
            exports.server = server = app_1.default.listen(index_1.default.port, () => {
                console.log(`Server is running on port ${index_1.default.port}`);
            });
            // Initialize Socket.IO with the HTTP server
            exports.io = io = new socket_io_1.Server(server, {
                cors: {
                    origin: index_1.default.client_url, // Client origin
                }
            });
            // Listen for socket connections
            io.on('connection', (socket) => {
                console.log('A user connected:', socket.id);
                const userId = socket.handshake.query.userId;
                if (userId) {
                    userSocketMap[userId] = socket.id;
                }
                // Emit list of online users to all connected clients
                io.emit('getOnlineUsers', Object.keys(userSocketMap));
                // Handle custom events
                socket.on('message', (data) => {
                    console.log('Message received:', data);
                    // Emit the message back to all connected clients
                    io.emit('message', data);
                });
                // Handle disconnection
                socket.on('disconnect', () => {
                    console.log('A user disconnected:', socket.id);
                    if (userId) {
                        delete userSocketMap[userId];
                    }
                    // Update the list of online users
                    io.emit('getOnlineUsers', Object.keys(userSocketMap));
                });
            });
            console.log('Socket.IO is configured successfully!');
        }
        catch (err) {
            console.error('Error occurred:', err);
        }
        // Handle unhandled rejections
        process.on('unhandledRejection', (error) => {
            console.error('Unhandled Rejection occurred; closing the server...');
            if (server) {
                server.close(() => {
                    console.error(error);
                    process.exit(1);
                });
            }
            else {
                process.exit(1);
            }
        });
    });
}
boostrap();
// Handle SIGTERM signal
process.on('SIGTERM', () => {
    console.log('SIGTERM received');
    if (server) {
        server.close();
    }
});
