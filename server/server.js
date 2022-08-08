const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);

const { Server } = require("socket.io");
const io = new Server(server);
var path = require("path");

//we have to tell the express server that this root dir has all of out site assets.
app.use(express.static(__dirname + "./../client"));

app.get("/", (req, res) => {
  res.sendFile(path.resolve(__dirname + "/../client/index.html"));
});

io.on("connection", (socket) => {
  console.log("a user connected");
  socket.on("disconnect", () => {
    console.log("user disconnected");
  });

  socket.on("name submission", (name) => {
    console.log("name: " + name);
    io.emit("name submission", name);
  });
});

server.listen(3000, () => {
  console.log("listening on *:3000");
});
