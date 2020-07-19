const app = require("express")();
const server = require("http").createServer(app);
const io = require("socket.io")(server);

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

io.sockets.on("connect", (socket) => {
  socket.on("input", (ms) => {
    io.sockets.emit("new", ms);
  });
});

server.listen(3003, () => {
  console.log("Started NodeJS server at port 3003");
});
