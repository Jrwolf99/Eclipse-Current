const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);

const { Server } = require("socket.io");
const io = new Server(server);
var path = require("path");

let { playerList } = require("./players");

//we have to tell the express server that this root dir has all of out site assets.
app.use(express.static(__dirname + "./../client"));

app.get("/", (req, res) => {
  res.sendFile(path.resolve(__dirname + "/../client/index.html"));
});

io.on("connection", (socket) => {
  console.log("a user connected");
  console.log(
    "new user found! here is the list before they type their name:",
    playerList
  );
  socket.on("disconnect", () => {
    console.log("user disconnected");
  });

  socket.on("name submission", (name) => {
    console.log("name: " + name);
    playerList.push(name);
    io.emit("gamestate transmission", { playerList: playerList });
  });

  socket.on("game start", (playerCount) => {
    console.log("game started!");
    io.emit("game start", playerCount);
  });
});

server.listen(3000, () => {
  console.log("listening on *:3000");
});
