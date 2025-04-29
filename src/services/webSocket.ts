import express from "express";
import http from "http";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import { Server } from "socket.io";

dotenv.config();

const secretKey = process.env.ACCESS_SECRET;

const app = express();
const server = http.createServer(app)
const io = new Server(server, {
    cors: {
        origin:"http://localhost:5173",
        methods: ["GET", "POST"],
    },
});

io.on("connection",(socket => {
    const token = socket.handshake.auth.token;

    jwt.verify(token, secretKey, (err,decoded) => {
        if(err){
            console.log("Invalid Token, disconnecting socket...");
            socket.disconnect();
        } else {
            console.log("User Connected")
            console.log("WebSocket: A user connected", socket.id);
        }
    })

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