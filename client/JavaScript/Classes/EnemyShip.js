class EnemyShip extends Ship {
  constructor() {
    super();
    this.shiphtml.style.background = "red";
  }

  eventLoop() {
    console.log("enemy ship has an eventloop!");
  }

  // shipHandleKeyDown(e) {}

  // shipHandleKeyUp(e) {}

  //   eventLoop() {
  //     this.#updateShipsDirectionalUnitVector();
  //     this.#updateShipsNextCoords();

  //     if (this.currKeysPressedArray.includes(38)) {
  //       this.#moveForward();
  //     }
  //     if (this.currKeysPressedArray.includes(37)) {
  //       this.#updateShipDirection("left");
  //       this.#moveRotate();
  //     }
  //     if (this.currKeysPressedArray.includes(39)) {
  //       this.#updateShipDirection("right");
  //       this.#moveRotate();
  //     }
  //   }
}
