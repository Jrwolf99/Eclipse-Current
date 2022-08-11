var form = document.querySelector(".namefield_form");
var input = document.querySelector(".namefield_input");
var names = document.querySelector(".names");

var pList;

form.addEventListener("submit", function (e) {
  e.preventDefault();
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
  var playerCount = createLI("Players: " + playerList.length);
  names.appendChild(playerCount);
  for (var i = 0; i < playerList.length; i++) {
    var playerName = createLI(playerList[i].name);
    names.appendChild(playerName);
  }
};

const startGameServer = () => {
  wsEmit({
    type: "gamestart c2s",
    playerCount: pList.length,
  });
};
