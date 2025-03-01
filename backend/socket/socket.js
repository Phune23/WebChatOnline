import { Server } from "socket.io";
import http from "http";
import express from "express";
import { Socket } from "dgram";

const app = express();

const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: ["http://localhost:3000"],
        methods: ["GET", "POST"],
    },
});

const userSocketMap = {}; // {userId: socketId}

export const getReceiverSocketId = (receiverId) => {
    return userSocketMap[receiverId];
};

io.on("connection", (socket) => {
    console.log("A user connected", socket.id);

    const userId = socket.handshake.query.userId;
    if (userId != "undefined") {
        userSocketMap[userId] = socket.id;
    }

    // socket.on() is used to send events to all the connected clients
    io.emit("getOnlineUsers", Object.keys(userSocketMap));

    // Listen for the "messageHidden" event
    socket.on("messageHidden", ({ messageId }) => {
        const receiverSocketId = getReceiverSocketId(socket.handshake.query.receiverId);
        if (receiverSocketId) {
            io.to(receiverSocketId).emit("messageHidden", { messageId });
        }
    });

    // Handle user disconnection
    socket.on("disconnect", () => {
        console.log("User disconnected", socket.id);
        delete userSocketMap[userId];
        io.emit("getOnlineUsers", Object.keys(userSocketMap));
    });
});

export { app, io, server };