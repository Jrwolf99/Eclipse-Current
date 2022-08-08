var form = document.querySelector(".namefield_form");
var input = document.querySelector(".namefield_input");
var names = document.querySelector(".names");

form.addEventListener("submit", function (e) {
  e.preventDefault();
  if (input.value) {
    socket.emit("name submission", input.value);
    input.value = "";
  }
});

socket.on("name submission", function (name) {
  var item = document.createElement("li");
  item.textContent = name;
  names.appendChild(item);
});
