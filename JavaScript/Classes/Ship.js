class Ship {
  constructor() {
    this.currDegree = 0;
    this.currRadius = 0;
    this.currXYCoords = [0, 0];
    this.shipForwardSpeed = 3;
    this.nextXYCoords = [0, 0];
    this.html = document.querySelector(".ship");
  }

  //TODO, MAKE IT SO THE SHIP
  //CAN CONTROL ITS OWN KEYDOWN AND KEYUP LISTENERS.
  eventLoop() {
    console.log("reached Ship!");
  }

  moveForward() {}

  moveRotate() {}

  bounceBack() {}

  findShipsDirectionalUnitVector() {}

  findShipsNextCoords() {}
}
