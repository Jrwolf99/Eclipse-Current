class Ship extends AnimationObjectInstructionHandler {
  constructor() {
    super();
    this.currXYCoords = [0, 0];
    this.nextXYCoords = [0, 0];
    this.directionalUnitVector = [0, 0];
    this.currShipRotationRadians = -Math.PI / 2;
    this.shipForwardSpeed = 3;
    this.shiphtml = document.querySelector(".ship");
    this.exhaustParticlesArray = [];
    this.hasBeenHit = false;
    animationObjectsArray.push(this);
    window.addEventListener("keydown", (e) => this.shipHandleKeyDown(e));
    window.addEventListener("keyup", (e) => this.shipHandleKeyUp(e));
  }

  #shootBullet() {
    let myBullet = animationObjectsArray.push(
      new Bullet(this.currXYCoords, this.directionalUnitVector)
    );
  }
  #deleteShipExhaust() {
    this.exhaustParticlesArray[0].html.remove();
    this.exhaustParticlesArray.shift();
  }

  #createShipExhaust() {
    this.exhaustParticlesArray.push(
      new Particle(
        this.directionalUnitVector,
        this.currXYCoords[0] + -50 * this.directionalUnitVector[0],
        this.currXYCoords[1] + -50 * this.directionalUnitVector[1]
      )
    );
    this.exhaustParticlesArray.forEach((particle) => {
      particle.move();
    });
    if (this.exhaustParticlesArray[0].size <= 0.2) this.#deleteShipExhaust();
  }

  #moveCameraWithShip() {
    let myMap = document.querySelector(".map");
    let cameraCenter = myMap.offsetWidth / 2 - window.innerWidth / 2;
    objectTransform(
      myMap,
      -this.currXYCoords[0] / 2 - cameraCenter,
      -this.currXYCoords[1] / 1.1 - 1165,
      0
    );
  }

  #moveForward() {
    if (this.shipForwardSpeed < 8) this.shipForwardSpeed += 0.05;
    this.currXYCoords = this.nextXYCoords;

    objectTransform(
      this.shiphtml,
      this.nextXYCoords[0],
      this.nextXYCoords[1],
      this.currShipRotationRadians + Math.PI / 2
    );
    this.#createShipExhaust();
    this.#moveCameraWithShip();

    if (isOutsideRing(this.currXYCoords)) {
      this.currXYCoords = backUpElement(this.currXYCoords);
    }
  }

  #moveRotate() {
    objectTransform(
      this.shiphtml,
      this.currXYCoords[0],
      this.currXYCoords[1],
      this.currShipRotationRadians + Math.PI / 2
    );
  }

  #updateShipsDirectionalUnitVector() {
    const unitRadius = 1;
    this.directionalUnitVector = polar2Rect(
      this.currShipRotationRadians,
      unitRadius
    );
  }

  #updateShipsNextCoords() {
    this.nextXYCoords = [
      this.currXYCoords[0] +
        this.directionalUnitVector[0] * this.shipForwardSpeed,
      this.currXYCoords[1] +
        this.directionalUnitVector[1] * this.shipForwardSpeed,
    ];
  }

  #updateShipDirection(direction) {
    if (direction == "left") {
      this.currShipRotationRadians =
        this.currShipRotationRadians - Math.PI / 50;
    }
    if (direction == "right") {
      this.currShipRotationRadians =
        this.currShipRotationRadians + Math.PI / 50;
    }
  }

  eventLoop() {
    this.#updateShipsDirectionalUnitVector();
    this.#updateShipsNextCoords();

    if (this.currKeysPressedArray.includes(38)) {
      this.#moveForward();
    }
    if (this.currKeysPressedArray.includes(37)) {
      this.#updateShipDirection("left");
      this.#moveRotate();
    }
    if (this.currKeysPressedArray.includes(39)) {
      this.#updateShipDirection("right");
      this.#moveRotate();
    }
  }

  shipHandleKeyDown(e) {
    this.handleKeyDown(e);
  }

  shipHandleKeyUp(e) {
    if (this.currKeysPressedArray.includes(32)) {
      this.#shootBullet();
    }
    this.handleKeyUp(e);
    if (e.keyCode == "38") this.shipForwardSpeed = 3;
    while (this.exhaustParticlesArray.length !== 0) this.#deleteShipExhaust();
  }
}
