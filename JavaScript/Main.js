const startGame = () => {
  centerCamera("1165px");
  changeScreenOverlayElements();
  let myShip = new Ship();
  let myObstacle = new Obstacle();
  myCollisionDetector = new CollisionDetector();
};
const endGame = () => {
  window.location.reload();
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
  centerCamera("500px");
};

/***********Main****************************/
let animationObjectsArray = [];
let myCollisionDetector;
const BackgroundSong = new Audio("/Assets/sounds/trialsong1.mp3");

animate();
/***********************************************/
