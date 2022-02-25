const startGame = () => {
  centerCamera("1165px");
  changeScreenOverlayElements();
  let myShip = new Ship();
  let myObstacle = new Obstacle();
};
const endGame = () => {
  window.location.reload();
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
let myCollisionDetector = new CollisionDetector();
animate();
/***********************************************/
