import express from "express";
import http from "http";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import { Server } from "socket.io";
import cookie from "cookie";
dotenv.config();

const secretKey = process.env.ACCESS_SECRET;

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
    credentials: true,
  },
});

io.on("connection", (socket) => {
  const rawCookie = socket.handshake.headers.cookie;

  if (rawCookie) {
    console.log("cookiewebsocket", rawCookie);
    const parsedCookie = cookie.parse(rawCookie);
    console.log("Parsed keys:", Object.keys(parsedCookie));
    console.log(parsedCookie);
    
  }else{
    console.error("User Unauthorized");
  }

  // const token = socket.handshake.auth.token;

  // jwt.verify(token, secretKey, (err,decoded) => {
  //     if(err){
  //         console.log("Invalid Token, disconnecting socket...");
  //         socket.disconnect();
  //     } else {
  //         console.log("User Connected")
  //         console.log("WebSocket: A user connected", socket.id);
  //     }
  // })

  socket.on("newStory", (message) => {
    console.log("updateStories", message);

    socket.broadcast.emit("receive_message", message);

    io.emit("updateStories", message);
  });

  socket.on("removeStory", (storyId) => {
    io.emit("deleteStory", storyId); // Remove expired story
  });

  socket.on("disconnect", () => {
    console.log("User Disconnected:", socket.id);
  });

  socket.on("join_room", (roomId) => {
    socket.join(roomId);
    console.log(`User joined roomID:${roomId}`);
  });
});

export { server, io };
