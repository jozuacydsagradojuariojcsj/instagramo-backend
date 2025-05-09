import express from "express";
import http from "http";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import { Server } from "socket.io";
import * as Cookie from "cookie";
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

io.use((socket, next) => {
  const cookie = socket.handshake.headers.cookie;

  if(!cookie) {
    console.error("No Cookies");
    return;
  }

  const parsedCookie = Cookie.parse(cookie);

  const accessToken = parsedCookie["accessToken"];

  if (!accessToken) {
    console.error("No access token found in cookies");
    return;
  }

  jwt.verify(accessToken, process.env.ACCESS_SECRET, (err,decoded) => {
    if(err){
      console.error("No Websocket For U!")
    }
    next();
  });
});


var users = [];
io.on("connection",(socket) => {

  socket.on("connected",(userid) => {
    users[userid] = socket.id;
  });

  socket.on("join_room", (roomId) => {
    socket.join(roomId);
    console.log(`User joined roomID:${roomId}`);
  });

  socket.on("disconnect", () => {
    console.log("User Disconnected:", socket.id);
  });

});

// io.on("connection", (socket) => {
//   // const token = socket.handshake.auth.token;

//   // jwt.verify(token, secretKey, (err,decoded) => {
//   //     if(err){
//   //         console.log("Invalid Token, disconnecting socket...");
//   //         socket.disconnect();
//   //     } else {
//   //         console.log("User Connected")
//   //         console.log("WebSocket: A user connected", socket.id);
//   //     }
//   // })

//   socket.on("newStory", (message) => {
//     console.log("updateStories", message);

//     socket.broadcast.emit("receive_message", message);

//     io.emit("updateStories", message);
//   });

//   socket.on("removeStory", (storyId) => {
//     io.emit("deleteStory", storyId); // Remove expired story
//   });

//   socket.on("disconnect", () => {
//     console.log("User Disconnected:", socket.id);
//   });

//   socket.on("join_room", (roomId) => {
//     socket.join(roomId);
//     console.log(`User joined roomID:${roomId}`);
//   });
// });

export { server, io };
