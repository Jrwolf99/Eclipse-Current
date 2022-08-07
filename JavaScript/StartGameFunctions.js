const centerCamera = (height) => {
  const myMap = document.querySelector(".map");
  let cameraCenter = myMap.offsetWidth / 2 - window.innerWidth / 2;
  console.log("cameraCenter: ", cameraCenter, "Height: ", height);
  objectTransform(myMap, -cameraCenter, -height, 0);
};

const changeScreenOverlayElements = () => {
  let myTitlescreen = document.querySelector(".titlescreen");
  myTitlescreen.remove();
  let myScoreboard = document.querySelector(".scoreboard");
  myScoreboard.innerHTML =
    "<div class='bigdipper'> <img src='/Assets/SVGs/BigDipper.svg'></div>";
};
