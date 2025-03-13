import express from "express";
import http from "http";
import { Server } from "socket.io";

const app = express();
const server = http.createServer(app)
const io = new Server(server, {
    cors: {
        origin:"http://localhost:5173",
        methods: ["GET, POST"],
    },
});

io.on("connection",(socket => {
    console.log("WebSocket: A user connected", socket.id);

    socket.on("newStory",(message) => {
        console.log("updateStories", message)

        socket.broadcast.emit("receive_message", message);

        io.emit("updateStories", message);
    });

    socket.on("removeStory", (storyId) => {
        io.emit("deleteStory", storyId); // Remove expired story
    });

    socket.on("disconnect", () => {
        console.log("User Disconnected:", socket.id)
    });
}));


export { server, io}