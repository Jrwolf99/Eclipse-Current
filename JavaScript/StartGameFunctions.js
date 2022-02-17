const centerCamera = (height) => {
  const myMap = document.querySelector(".map");
  let cameraCenter = myMap.offsetWidth / 2 - window.innerWidth / 2;
  myMap.style.transform = `translate3d(-${cameraCenter}px, -${height}, 0px) rotate3d(0, 0, 1, 0deg)`;
};

const changeScreenOverlayElements = () => {
  let myTitlescreen = document.querySelector(".titlescreen");
  myTitlescreen.remove();
  let myScoreboard = document.querySelector(".scoreboard");
  myScoreboard.innerHTML =
    "<div class='bigdipper'> <img src='/Assets/SVGs/BigDipper.svg'></div>";
};

const createShip = () => {
  const myShip = new Ship();
  animationObjectsArray.push(myShip);
  window.addEventListener("keydown", (e) => myShip.handleKeyDown(e));
  window.addEventListener("keyup", (e) => myShip.handleKeyUp(e));
};

const createObstacle = () => {
  animationObjectsArray.push(new Obstacle());
};
