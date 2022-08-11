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
  // socket.emit("gamestart c2s", pList.length);
};

// socket.on("gamestart s2c", function (playerCount, playerList) {
//   startGameClient(playerCount);

//   animationObjectsArray.forEach((object) => {
//     if (object instanceof Ship) object.setUID(socket.id);
//   });

//   playerList = playerList.filter((player) => player.uid != socket.id);

//   playerList.forEach((player) => {
//     for (let i = 0; i < animationObjectsArray.length; i++) {
//       let object = animationObjectsArray[i];

//       if (object instanceof EnemyShip) {
//         if (typeof object.uid === "undefined") {
//           object.setUID(player.uid);
//           break;
//         }
//       }
//     }
//   });
// });
