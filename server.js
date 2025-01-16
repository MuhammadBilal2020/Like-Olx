// import express from "express";
// import { Server as SocketIO } from "socket.io"; // Correct import
// import cors from "cors";

// const app = express();
// app.use(cors());

// // Basic route
// app.get("/", (req, res) => {
//   res.send("Welcome to the Socket.IO server");
// });

// // Create HTTP server and pass it to Socket.IO
// const server = app.listen(3000, () => console.log("Server running on port 3000"));

// const io = new SocketIO(server, {
//   cors: {
//     origin: "*", // Replace '*' with specific origin for better security
//     methods: ["GET", "POST"],
//   },
// });

// io.on("connection", (socket) => {
//   console.log("a user connected");

//   // Listen for joining a room (e.g., user-specific room)
//   socket.on("joinRoom", (roomId) => {
//     socket.join(roomId);
//     console.log(`User joined room: ${roomId}`);
//   });

//   // Listen for sendMessage event
//   socket.on("sendMessage", (data) => {
//     console.log("Message received: ", data);
//     // Emit the message to the specified room
//     io.to(data.receiver).emit("receiveMessage", data);
//   });

//   socket.on("disconnect", () => {
//     console.log("user disconnected");
//   });
// });
