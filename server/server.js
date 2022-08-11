const WebSocket = require("ws");
const { randomUUID } = require("crypto");

const wss = new WebSocket.Server({ port: 3000 });

let playerList = [];

const handleOnConnection = (currUid, ws) => {
  playerList.push({
    uid: currUid,
    name: `${currUid}`,
    gameStateData: { keyspressedarray: [] },
  });
  console.log(
    "new user found! here is the list before they type their name:",
    playerList
  );

  let msg = {
    type: "register UID",
    currUid: currUid,
  };
  msg = JSON.stringify(msg);
  ws.send(msg);
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

const handleGameStart = (data) => {
  console.log("game started!");

  return {
    type: "gamestart s2c",
    playerCount: data.playerCount,
    playerList: playerList,
  };
};

const handleGameStateChange = (currUid, data) => {
  playerList.forEach((player, i) => {
    if (player.uid === currUid) {
      playerList[i] = { ...player, gameStateData: data.gameStateData };
    }
  });

  return {
    type: "gamestate s2c",
    playerList: playerList,
  };
};

const broadcastSend = (msg) => {
  msg = JSON.stringify(msg);
  wss.clients.forEach((client) => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(msg);
    }
  });
};
const broadcastButMeSend = (msg, ws) => {
  msg = JSON.stringify(msg);
  wss.clients.forEach((client) => {
    if (client !== ws && client.readyState === WebSocket.OPEN) {
      client.send(msg);
    }
  });
};

wss.on("connection", (ws) => {
  console.log("new client connection!");
  let currUid = randomUUID();

  handleOnConnection(currUid, ws);

  ws.on("message", (data) => {
    data = JSON.parse(data);
    let msg2send = {};

    switch (data.type) {
      case "name c2s":
        msg2send = handleNameTransmission(currUid, data);
        broadcastSend(msg2send);

        break;

      case "gamestart c2s":
        msg2send = handleGameStart(currUid, data);
        broadcastSend(msg2send);

        break;

      case "gamestate c2s":
        msg2send = handleGameStateChange(currUid, data);
        broadcastButMeSend(msg2send, ws);
        break;

      default:
        break;
    }

    //potential problem, sending to everyone? maybe fixed by uids
  });

  ws.on("close", () => {
    console.log("Client has disconnected!");

    playerList = playerList.filter((player) => {
      return player.uid != currUid;
    });

    broadcastSend(handleNameTransmission(0, ""));
  });
});

//------------------------------------------

// socket.on("EnemyBulletShot c2s", () => {
//   io.emit("EnemyBulletShot s2c", socket.id);
// });

// socket.on("EnemyBulletDelete c2s", () => {
//   io.emit("EnemyBulletDelete s2c", socket.id);
// });
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
