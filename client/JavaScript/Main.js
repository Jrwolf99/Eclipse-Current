const startGameClient = (playerCount) => {
  centerCamera(1165);
  changeScreenOverlayElements();
  let myShip = new Ship();
  for (let i = 0; i < playerCount - 1; i++) {
    let anEnemyShip = new EnemyShip();
  }
  // let myObstacle = new Obstacle();
  // myCollisionDetector = new CollisionDetector();
};

const endGame = () => {
  window.location.reload();
};

const showInfo = () => {
  alert(
    "Welcome to Eclipse! This is a game designed by Bailey Garner and developed by Jonathan Wolf. It is currently in progress, but feel free to use the arrow keys to control the ship, press space to shoot, and turn the sound on! (This app is best supported in Chrome or Firefox.)"
  );
};

const toggleMusic = () => {
  const myMusicButtonSlash = document.querySelector(".fa-slash");
  if (BackgroundSong.duration > 0 && !BackgroundSong.paused) {
    BackgroundSong.pause();
    myMusicButtonSlash.style.color = "white";
    return;
  }
  BackgroundSong.volume = 0.1;
  BackgroundSong.play();

  myMusicButtonSlash.style.color = "transparent";
};

var newPlayerList = {};
const animate = () => {
  var gameStateData = {
    keyspressedarray: [],
    coordsarray: [],
    bulletcoordslist: {},
  };

  //updating gamestate ----------------------
  animationObjectsArray.forEach((object) => {
    var objectEventPayload;

    //1) call event loops and package the data to be sent -----------------------------
    if (object instanceof Ship) {
      objectEventPayload = object.eventLoop();
      gameStateData = {
        ...gameStateData,
        keyspressedarray: objectEventPayload[0],
        coordsarray: objectEventPayload[1],
      };
    }

    if (object instanceof Bullet) {
      objectEventPayload = object.eventLoop();
      let bullet = objectEventPayload[1];
      let uid = objectEventPayload[0];
      gameStateData.bulletcoordslist[uid] = bullet;
    }

    // 3) upon receiving the data, assign the game state to their proper objects. ------------
    if (object instanceof EnemyShip) {
      let enemyProperties = newPlayerList[object.uid];
      enemyProperties &&
        object.eventLoop(
          newPlayerList[object.uid].gameStateData.coordsarray,
          newPlayerList[object.uid].gameStateData.keyspressedarray
        );
    }

    if (object instanceof EnemyBullet) {
      let bullet =
        newPlayerList[object.shipUid].gameStateData.bulletcoordslist[
          object.uid
        ];

      bullet && object.eventLoop(bullet);
    }
  });

  // 2) send the data to the server on every frame.
  wsEmit({
    type: "gamestate c2s",
    gameStateData: gameStateData,
  });
  window.requestAnimationFrame(animate);
};

window.onload = () => {
  centerCamera(500);
};

/***********Main****************************/
let animationObjectsArray = [];
let myCollisionDetector;
const BackgroundSong = new Audio("/Assets/sounds/trialsong1.mp3");

animate();
/***********************************************/
