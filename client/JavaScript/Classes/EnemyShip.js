//enemy ships must move their positions such that they reflect the game state every eventloop.

class EnemyShip {
  constructor() {
    this.score = 0;
    this.currXYCoords = [0, 0];
    this.nextXYCoords = [0, 0];
    this.directionalUnitVector = [0, 0];
    this.currShipRotationRadians = -Math.PI / 2;
    this.shipForwardSpeed = 3;

    this.shiphtml = document.createElement("div");
    this.shiphtml.className = "enemy-ship";

    this.uid;

    document
      .querySelector(".ring_glow")
      .insertAdjacentElement("afterend", this.shiphtml);

    this.exhaustParticlesArray = [];
    this.hasBeenHit = false;
    animationObjectsArray.push(this);
    window.addEventListener("keydown", this.shipHandleKeyDown);
    window.addEventListener("keyup", this.shipHandleKeyUp);
    this.ShotSound = new Audio("/Assets/sounds/Shot1.mp3");
  }

  setUID(uid) {
    this.uid = uid;
  }

  shootBullet() {
    console.log("shooting!");

    this.ShotSound.pause();
    this.ShotSound.currentTime = 0;
    this.ShotSound.play();
    let myBullet = animationObjectsArray.push(
      new EnemyBullet(this.currXYCoords, this.directionalUnitVector, this.uid)
    );
  }

  #deleteShipExhaust() {
    this.exhaustParticlesArray[0].html.remove();
    this.exhaustParticlesArray.shift();
  }

  #createShipExhaust() {
    this.exhaustParticlesArray.push(
      new Particle(
        [0, 0],
        this.currXYCoords[0] + -50 * this.directionalUnitVector[0],
        this.currXYCoords[1] + -50 * this.directionalUnitVector[1],
        "rgb(51, 27, 199)",
        1
      )
    );
    this.exhaustParticlesArray.forEach((particle) => {
      particle.move();
    });
    if (this.exhaustParticlesArray[0].size <= 0.2) this.#deleteShipExhaust();
  }

  moveForward() {
    if (this.shipForwardSpeed < 8) this.shipForwardSpeed += 0.05;
    this.currXYCoords = this.nextXYCoords;

    objectTransform(
      this.shiphtml,
      this.nextXYCoords[0],
      this.nextXYCoords[1],
      this.currShipRotationRadians + Math.PI / 2
    );
    this.#createShipExhaust();

    if (isOutsideRing(this.currXYCoords)) {
      this.currXYCoords = backUpElement(this.currXYCoords);
    }
  }

  moveRotate() {
    objectTransform(
      this.shiphtml,
      this.currXYCoords[0],
      this.currXYCoords[1],
      this.currShipRotationRadians + Math.PI / 2
    );
  }

  updateShipsDirectionalUnitVector() {
    const unitRadius = 1;
    this.directionalUnitVector = polar2Rect(
      this.currShipRotationRadians,
      unitRadius
    );
  }

  updateShipsNextCoords(coords) {
    this.nextXYCoords = [coords[0], coords[1]];
  }

  updateShipDirection(coords) {
    this.currShipRotationRadians = coords[2];
  }

  gamestateDataReflect(array, coords) {
    this.updateShipsNextCoords(coords);

    this.updateShipsDirectionalUnitVector();

    if (array && array.includes(38)) {
      this.moveForward();
    }
    if (array && array.includes(37)) {
      this.updateShipDirection(coords);
      this.moveRotate();
    }
    if (array && array.includes(39)) {
      this.updateShipDirection(coords);
      this.moveRotate();
    }

    if (array && array.length < 1 && this.exhaustParticlesArray.length > 0) {
      this.#deleteShipExhaust();
    }
  }

  eventLoop() {}
}
