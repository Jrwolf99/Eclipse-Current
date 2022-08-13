let myUID;

ws.addEventListener("open", () => {
  console.log("we have connected!");
});

ws.addEventListener("message", ({ data }) => {
  data = JSON.parse(data);

  //upon receiving a message, coming in more than 60fps, we need to
  //differentiate game state change from events. data will have a type,
  //and that type can allow us to pick out game state or event.

  switch (data.type) {
    case "register UID":
      myUID = data.currUid;
      break;
    case "name s2c":
      addNameToTitlescreen(data.playerList);
      break;
    case "gamestart s2c":
      console.log("data: ", data);
      handleGameStart(data);
      break;
    case "gameend s2c":
      console.log("ending game!");
      endGame();
      break;

    case "gamestate s2c":
      handleGameStateChange(data);
      break;

    case "bulletshoot s2c":
      handleBulletShoot(data);
      break;

    case "deletebullet s2c":
      handleBulletDelete(data);
      break;

    default:
      break;
  }
});

// Functions that are executed as per instructions sent by server. ------------------------

const handleGameStart = ({ playerList, playerCount }) => {
  startGameClient(playerCount);

  animationObjectsArray.forEach((object, i) => {
    if (object instanceof Ship) object.setUID(myUID);
  });

  let uidArray = Object.keys(playerList);
  for (let i = 0; i < uidArray.length; i++) {
    let key = uidArray[i];
    if (key === myUID) continue;

    for (let i = 0; i < animationObjectsArray.length; i++) {
      let object = animationObjectsArray[i];
      if (object instanceof EnemyShip) {
        if (typeof object.uid === "undefined") {
          object.setUID(key);
          break;
        }
      }
    }
  }

  console.log("here is the player list: ", playerList);
};

const handleGameStateChange = ({ playerList }) => {
  newPlayerList = playerList;
};

const handleBulletShoot = ({ bulletUID }) => {
  for (let i = 0; i < animationObjectsArray.length; i++) {
    let object = animationObjectsArray[i];
    if (object instanceof EnemyShip) {
      object.shootBullet(bulletUID);
    }
  }
};

const handleBulletDelete = ({ bulletUID }) => {
  for (let i = 0; i < animationObjectsArray.length; i++) {
    let object = animationObjectsArray[i];
    if (object instanceof EnemyBullet && object.uid === bulletUID) {
      object.deleteSelf();
    }
  }
};
