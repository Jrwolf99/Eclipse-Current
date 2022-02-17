

const startGame = () => {
   centerCamera();
   changeScreenOverlayElements();
   createShip();
   createObstacle();
}

const endGame = () => {
  window.location.reload();
};



////////////////////////////////////////////////



const centerCamera = () => {
  const myMap = document.querySelector('.map');
  let cameraCenter = myMap.offsetWidth / 2 - window.innerWidth / 2;
  myMap.style.transform = `translate3d(-${cameraCenter}px, -1165px, 0px) rotate3d(0, 0, 1, 0deg)`;
}

const changeScreenOverlayElements = () => {

  let myTitlescreen = document.querySelector(".titlescreen");
  myTitlescreen.remove();

  let myScoreboard = document.querySelector(".scoreboard");
  myScoreboard.innerHTML =
    "<div class='bigdipper'> <img src='/Assets/SVGs/BigDipper.svg'></div>";
}


const createShip = () => {
  
}
const createObstacle = () => {
  
}
