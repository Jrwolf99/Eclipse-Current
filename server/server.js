const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);

const { Server } = require("socket.io");
const io = new Server(server);
var path = require("path");

let { playerList } = require("./data");

//we have to tell the express server that this root dir has all of out site assets.
app.use(express.static(__dirname + "./../client"));

app.get("/", (req, res) => {
  res.sendFile(path.resolve(__dirname + "/../client/index.html"));
});

io.on("connection", (socket) => {
  console.log("a user connected", socket.id);
  playerList.push({
    uid: socket.id,
    name: "blank",
    gameStateData: { keyspressedarray: [] },
  });
  console.log(
    "new user found! here is the list before they type their name:",
    playerList
  );

  socket.on("disconnect", () => {
    console.log("user disconnected", socket.id);

    playerList = playerList.filter((player) => {
      return player.uid != socket.id;
    });
    console.log("after disconnect: ", playerList);
  });

  socket.on("name c2s", (name) => {
    playerList.forEach((player, i) => {
      if (player.uid === socket.id) playerList[i] = { ...player, name: name };
    });

    io.emit("playerlist s2c", playerList);
  });

  socket.on("gamestart c2s", (playerCount) => {
    console.log("game started!");

    io.emit("gamestart s2c", playerCount, playerList);
  });

  socket.on("gamestate c2s", (gameStateData) => {
    playerList.forEach((player, i) => {
      if (player.uid === socket.id) {
        playerList[i] = { ...player, gameStateData: gameStateData };
      }
    });

    io.emit("gamestate s2c", playerList);
  });

  socket.on("EnemyBulletShot c2s", () => {
    io.emit("EnemyBulletShot s2c", socket.id);
  });

  // socket.on("EnemyBulletDelete c2s", () => {
  //   io.emit("EnemyBulletDelete s2c", socket.id);
  // });
});

server.listen(3000, () => {
  console.log("listening on *:3000");
});

/*

What needs to be communicated:

Ship
----
the coordinates for movement ===== send every event loop
the commands for movement  ======= send every event loop

bullet
-------
bullet shot ========================= send once on bullet shot event
bullet coordinates for movement ===== send every event loop
bullet deletion ===================== send once on bullet delete event

game start
----------
name send =========================== send once on name submission
start game trigger ================== send once to start game. 










*/
