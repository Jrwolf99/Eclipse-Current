const WebSocket = require("ws");
const { randomUUID } = require("crypto");

const wss = new WebSocket.Server({ port: 3000 });

playerList = {};
let gameStarted = false;

// 1) receive the messages from a client -------------------------------------------

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
        msg2send = handleGameStart(data);
        gameStarted = true;
        broadcastSend(msg2send);

        break;

      case "gamestate c2s":
        msg2send = handleGameStateChange(currUid, data);
        gameStarted && broadcastButMeSend(msg2send, ws);
        break;

      case "bulletshoot c2s":
        msg2send = handleBulletShoot(data);
        gameStarted && broadcastButMeSend(msg2send, ws);
        break;

      case "deletebullet c2s":
        msg2send = handleBulletDelete(data);
        gameStarted && broadcastButMeSend(msg2send, ws);
        break;

      default:
        break;
    }
  });

  ws.on("close", () => {
    gameStarted = false;
    playerList = {};

    broadcastSend(handleGameEnd());
  });
});

// 2) manage and package the data to be sent to all clients----------------------------------------------

const handleOnConnection = (currUid, ws) => {
  playerList[currUid] = {
    name: "blank",
    gameStateData: {
      keyspressedarray: [],
      coordsarray: [],
      bulletcoordslist: {},
    },
  };

  let msg = {
    type: "register UID",
    currUid: currUid,
  };
  msg = JSON.stringify(msg);
  ws.send(msg);
};

const handleNameTransmission = (currUid, data) => {
  playerList[currUid] = { ...playerList[currUid], name: data.name };
  return {
    type: "name s2c",
    playerList: playerList,
  };
};

const handleGameStart = (data) => {
  console.log("game started!", data);
  return {
    type: "gamestart s2c",
    playerCount: data.playerCount,
    playerList: playerList,
  };
};

const handleGameEnd = (data) => {
  console.log("game ended!");
  return {
    type: "gameend s2c",
  };
};

const handleGameStateChange = (currUid, data) => {
  playerList[currUid] = {
    ...playerList[currUid],
    gameStateData: data.gameStateData,
  };

  return {
    type: "gamestate s2c",
    playerList: playerList,
  };
};

const handleBulletShoot = (data) => {
  return {
    type: "bulletshoot s2c",
    bulletUID: data.bulletUID,
  };
};
const handleBulletDelete = (data) => {
  return {
    type: "deletebullet s2c",
    bulletUID: data.bulletUID,
  };
};

// 3) send the msg to all clients ----------------------------------------------------

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
