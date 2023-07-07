// const io = require("socket.io")


const onConnect = (io) => (socket) => {
    socket.on("private message", ({ content, to }) => {
        socket.to(to).emit("private message", {
            content,
            from: socket.id,
            fromUser: socket.username
        });
    });
}

module.exports = {onConnect}