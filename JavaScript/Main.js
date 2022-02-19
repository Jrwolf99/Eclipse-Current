const startGame = () => {
  centerCamera("1165px");
  changeScreenOverlayElements();
  createShip();
  createObstacle();
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
animate();
/***********************************************/
