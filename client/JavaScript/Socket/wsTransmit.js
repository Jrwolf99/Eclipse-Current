const ws = new WebSocket("ws://localhost:3000");

//websocket transmissions are conducted throughout the whole
//client project. All modules handle their own transmissions.

const wsEmit = (msg) => {
  ws.send(JSON.stringify(msg));
};
