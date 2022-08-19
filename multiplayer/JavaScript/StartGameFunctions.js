const centerCamera = (height) => {
  const myMap = document.querySelector(".map");
  let cameraCenter = myMap.offsetWidth / 2 - window.innerWidth / 2;
  objectTransform(myMap, -cameraCenter, -height, 0);
};

const createScoreBoard = (playerCount) => {
  let myScoreboard = document.querySelector(".scoreboard");
  myScoreboard.innerHTML =
    "<div class='bigdipper'><img src='/Assets/SVGs/BigDipper.svg'></div>";

  let myBigDipper = document.querySelector(".bigdipper");

  for (let i = 0; i < playerCount; i++) {
    console.log("ran through: ", i);
    let scoreElement = document.createElement("p");
    scoreElement.className = `score${i}`;
    scoreElement.textContent = `blank score`;
    console.log(scoreElement);

    myBigDipper.insertAdjacentElement("beforebegin", scoreElement);
    console.log(myScoreboard);
  }
};

const changeScreenOverlayElements = (playerCount) => {
  let myTitlescreen = document.querySelector(".titlescreen");
  myTitlescreen.remove();
  createScoreBoard(playerCount);
};
