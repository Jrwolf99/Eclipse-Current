const ws = new WebSocket("wss://mighty-cooks-smash-75-65-19-118.loca.lt");

//websocket transmissions are conducted throughout the whole
//client project. All modules handle their own transmissions.

//The modules conduct their own transmissions, but the gamestate
// transmission is handled in Main

const wsEmit = (msg) => {
  if (ws.readyState === ws.OPEN) {
    ws.send(JSON.stringify(msg));
  }
};
