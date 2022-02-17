class Ship {
  constructor() {
    this.currXYCoords = [0, 0];
    this.nextXYCoords = [0, 0];
    this.directionalUnitVector = [0, 0];
    this.currShipRotationRadians = -Math.PI / 2;
    this.shipForwardSpeed = 10;
    this.html = document.querySelector(".ship");
    this.currKeysPressedArray = [];
  }

  #moveForward() {
    console.log("forward Chauncy!");
    objectTransform(this.html, this.nextXYCoords[0], this.nextXYCoords[1], 0);
    this.currXYCoords = this.nextXYCoords;
  }

  #moveRotate(direction) {
    this.currShipRotationRadians = this.currShipRotationRadians + Math.PI / 90;
    objectTransform(
      this.html,
      this.currXYCoords[0],
      this.currXYCoords[1],
      this.currShipRotationRadians
    );
  }

  #bounceBack() {}

  #findShipNextRotationRadian() {}

  #findShipsDirectionalUnitVector() {
    const unitRadius = 1;
    return polar2Rect(this.currShipRotationRadians, unitRadius);
  }

  #findShipsNextCoords() {
    return new Array(
      this.currXYCoords[0] +
        this.directionalUnitVector[0] * this.shipForwardSpeed,

      this.currXYCoords[1] +
        this.directionalUnitVector[1] * this.shipForwardSpeed
    );
  }

  #updateShipParameters() {
    this.directionalUnitVector = this.#findNewShipsDirectionalUnitVector();
    this.nextXYCoords = this.#findShipsNextCoords();
  }

  eventLoop() {
    this.#updateShipParameters();

    if (this.currKeysPressedArray.includes(38)) {
      this.#moveForward();
    }
    if (this.currKeysPressedArray.includes(37)) {
      this.#moveRotate("left");
    }
    if (this.currKeysPressedArray.includes(39)) {
      this.#moveRotate("right");
    }
  }

  handleKeyDown(e) {
    if (!this.currKeysPressedArray.includes(e.keyCode)) {
      this.currKeysPressedArray.push(e.keyCode);
    }
  }

  handleKeyUp(e) {
    const keyCodePressedIndex = this.currKeysPressedArray.indexOf(e.keyCode);
    this.currKeysPressedArray.splice(keyCodePressedIndex, 1);
  }
}
