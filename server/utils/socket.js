// const io = require("socket.io")
import { io } from "socket.io-client"


io.on("connect", (socket) => {

    const subscribed = [];
    for (let [id, socket] of io.of("/").sockets) {
        subscribed.push({
            userID: id,
            username: socket.username,
        });
    }
    socket.emit("users", subscribed);

    socket.broadcast.emit("user connected", {
        userID: socket.id,
        username: socket.username,
      });

    socket.on("disconnect", () => {
        socket.disconnect();
        console.log("🔥: A user disconnected");
    });

    socket.on("join", (room_id) => {
        console.log(`⚡: ${socket.id} joined room ${room_id}!`);
        socket.join(room_id); //handles socket actually joining room
    });

    socket.on("message", ({ content, to_id}) => {
        // console.log(msg_model.user, " sent a msg with ", msg_model.message);
        socket.to(to_id).emit("message", {
            content,
            from: socket.id,
        });
    })
})