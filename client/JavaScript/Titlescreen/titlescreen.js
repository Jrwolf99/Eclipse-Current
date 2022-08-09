var form = document.querySelector(".namefield_form");
var input = document.querySelector(".namefield_input");
var names = document.querySelector(".names");

form.addEventListener("submit", function (e) {
  e.preventDefault();
  if (input.value) {
    socket.emit("name submission", input.value);
    user = input.value;
    input.value = "";
  }
  form.remove();
});

const createLI = (content) => {
  var item = document.createElement("li");
  item.textContent = content;
  return item;
};

socket.on("gamestate transmission", function (gamestate) {
  names.innerHTML = "";
  var playerCount = createLI("Players: " + gamestate.playerList.length);
  names.appendChild(playerCount);
  for (var i = 0; i < gamestate.playerList.length; i++) {
    var playerName = createLI(gamestate.playerList[i]);
    names.appendChild(playerName);
  }
});

const startGameServer = () => {
  socket.emit("game start", state.playerList.length);
};
