const startGame = () => {
  centerCamera(1165);
  changeScreenOverlayElements();
  let myShip = new Ship();
  let myObstacle = new Obstacle();
  myCollisionDetector = new CollisionDetector();
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
  BackgroundSong.volume = 0.4;
  BackgroundSong.play();

  myMusicButtonSlash.style.color = "transparent";
};

const animate = () => {
  animationObjectsArray.forEach((object) => {
    object.eventLoop();
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
