const WebSocket = require("ws");
const { randomUUID } = require("crypto");

const wss = new WebSocket.Server({ port: 3000 });

let playerList = [];

const handleOnConnection = (currUid) => {
  playerList.push({
    uid: currUid,
    name: `${currUid}`,
    gameStateData: { keyspressedarray: [] },
  });
  console.log(
    "new user found! here is the list before they type their name:",
    playerList
  );
};

const handleNameTransmission = (currUid, data) => {
  playerList.forEach((player, i) => {
    if (player.uid === currUid) playerList[i] = { ...player, name: data.name };
  });
  console.log(playerList);
  return {
    type: "name s2c",
    playerList: playerList,
  };
};

wss.on("connection", (ws) => {
  console.log("new client connection!");
  let currUid = randomUUID();

  handleOnConnection(currUid);

  ws.on("message", (data) => {
    data = JSON.parse(data);
    let msg2send = {};

    switch (data.type) {
      case "name c2s":
        msg2send = handleNameTransmission(currUid, data);
        break;

      default:
        break;
    }

    wss.clients.forEach((client) => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(JSON.stringify(msg2send));
      }
    });
  });

  ws.on("close", () => {
    console.log("Client has disconnected!");
  });
});

//------------------------------------------
// io.on("connection", (socket) => {
//   console.log("a user connected", socket.id);
//

//   socket.on("disconnect", () => {
//     console.log("user disconnected", socket.id);

//     playerList = playerList.filter((player) => {
//       return player.uid != socket.id;
//     });
//     console.log("after disconnect: ", playerList);
//   });

//   socket.on("name c2s", (name) => {
//     playerList.forEach((player, i) => {
//       if (player.uid === socket.id) playerList[i] = { ...player, name: name };
//     });

//     io.emit("playerlist s2c", playerList);
//   });

//   socket.on("gamestart c2s", (playerCount) => {
//     console.log("game started!");

//     io.emit("gamestart s2c", playerCount, playerList);
//   });

//   socket.on("gamestate c2s", (gameStateData) => {
//     playerList.forEach((player, i) => {
//       if (player.uid === socket.id) {
//         playerList[i] = { ...player, gameStateData: gameStateData };
//       }
//     });

//     io.emit("gamestate s2c", playerList);
//   });

//   socket.on("EnemyBulletShot c2s", () => {
//     io.emit("EnemyBulletShot s2c", socket.id);
//   });

//   // socket.on("EnemyBulletDelete c2s", () => {
//   //   io.emit("EnemyBulletDelete s2c", socket.id);
//   // });
// });

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
