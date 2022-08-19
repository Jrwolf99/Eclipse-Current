var form = document.querySelector(".namefield_form");
var input = document.querySelector(".namefield_input");
var names = document.querySelector(".names");

var startButton = document.querySelector(".titlescreen__button--start");

var pList;

form.addEventListener("submit", function (e) {
  e.preventDefault();
  startButton.style.display = "flex";

  if (input.value) {
    wsEmit({
      type: "name c2s",
      name: input.value,
    });
    input.value = "";
  }
  form.remove();
});

const createLI = (content) => {
  var item = document.createElement("li");
  item.textContent = content;
  return item;
};

const addNameToTitlescreen = (playerList) => {
  pList = playerList;
  names.innerHTML = "";
  Object.keys(playerList).forEach((key) => {
    var playerName = createLI(playerList[key].name);
    names.appendChild(playerName);
  });
};

const startGameServer = () => {
  wsEmit({
    type: "gamestart c2s",
    playerCount: Object.keys(pList).length,
  });
};
