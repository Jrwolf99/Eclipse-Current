const startGame = () => {
  centerCamera("1165px");
  changeScreenOverlayElements();
  createShip();
  createObstacle();
};
const endGame = () => {
  window.location.reload();
};
const handleLoad = () => {
  centerCamera("500px");
};


const animate = () => {
  animationObjectsArray.forEach((object) => {
    object.eventLoop();
  });
  window.requestAnimationFrame(animate);
};

//GLOBAL/////////////
window.addEventListener("load", handleLoad);

let animationObjectsArray = [];
animate();
/////////////////////
