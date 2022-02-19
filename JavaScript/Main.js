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

const handleLoad = () => {
  centerCamera("500px");
};

/***********Main****************************/
window.addEventListener("load", handleLoad);
let animationObjectsArray = [];
animate();
/***********************************************/
