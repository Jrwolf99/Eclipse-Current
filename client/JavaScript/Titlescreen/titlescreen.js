var form = document.querySelector(".namefield_form");
var input = document.querySelector(".namefield_input");
var names = document.querySelector(".names");

form.addEventListener("submit", function (e) {
  e.preventDefault();
  if (input.value) {
    socket.emit("name submission", input.value);
    input.value = "";
  }
  form.remove();
});

socket.on("gamestate transmission", function (gamestate) {
  console.log("gamestate!", gamestate);
  names.innerHTML = "";
  for (var i = 0; i < gamestate.playerList.length; i++) {
    var item = document.createElement("li");
    item.textContent = gamestate.playerList[i];
    names.appendChild(item);
    console.log("tets");
  }
});
