import { Server } from 'http';
import mongoose from 'mongoose';
import { Server as SocketIOServer } from 'socket.io'; // Import Socket.IO
import app from './app';
import config from './config/index';

process.on('uncaughtException', (error) => {
  console.error('Uncaught Exception:', error);
  process.exit(1);
});

let server: Server;
let io: SocketIOServer;

// Online users map
const userSocketMap: Record<string, string> = {};

// Function to get a receiver's socket ID
function getReceiverSocketId(userId: string): string | undefined {
  return userSocketMap[userId];
}

async function boostrap() {
  try {
    // Connect to MongoDB
    await mongoose.connect(config.database_url as string);
    console.log('Database is connected successfully!');

    // Start the HTTP server
    server = app.listen(config.port, () => {
      console.log(`Server is running on port ${config.port}`);
    });

    // Initialize Socket.IO with the HTTP server
    io = new SocketIOServer(server, {
      cors: {
        origin: config.client_url, // Client origin
      }
    });

    // Listen for socket connections
    io.on('connection', (socket) => {
      console.log('A user connected:', socket.id);

      const userId = socket.handshake.query.userId as string | undefined;
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
  } catch (err) {
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
    } else {
      process.exit(1);
    }
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

// Export the server and helper functions for use in other files
export { server, getReceiverSocketId, io };
