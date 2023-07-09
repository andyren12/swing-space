// const io = require("socket.io")


const onConnect = (io) => (socket) => {
    // console.log("connected socket")
    socket.on("private message", ({ content, to }) => {
        // console.log(to, socket.id, socket.username)
        socket.to(to).emit("private message", {
            content: content,
            from: socket.id,
            fromUser: socket.username
        });
    });

    //dont actually need this for one-on-one, but for gcs maybe
    socket.on("join", (room_id) => {
        socket.join(room_id);
        console.log("joined room", room_id)
    })
}

module.exports = {onConnect}