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

io.on("connecton",(socket => {
    console.log("WebSocket: A user connected", socket.id);

    socket.on("newStory",(message) => {
        console.log("updateStories", message)

        io.emit("updateStories", message);
    });

    socket.on("removeStory", (storyId) => {
        io.emit("deleteStory", storyId); // Remove expired story
    });

    socket.on("disconnect", () => {
        console.log("User Disconnected:", socket.id)
    });
}));

server.listen(3000, () => {
    console.log("Webscoket runnin on poert 3000")
})