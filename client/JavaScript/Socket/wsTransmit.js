const ws = new WebSocket("ws://localhost:3000");
// const ws = new WebSocket("wss://eclipse-server1.herokuapp.com/");

//websocket transmissions are conducted throughout the whole
//client project. All modules handle their own transmissions.

//The modules conduct their own transmissions, but the gamestate
// transmission is handled in Main

const wsEmit = (msg) => {
  if (ws.readyState === ws.OPEN) {
    ws.send(JSON.stringify(msg));
  }
};
