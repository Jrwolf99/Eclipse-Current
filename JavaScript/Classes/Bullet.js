class Bullet {
  constructor(currXYCoords, directionOfShot) {
    this.currXYCoords = [currXYCoords[0], currXYCoords[1]];
    this.nextXYCoords;
    this.direction = directionOfShot;
    this.speed = 8;
    this.rotation;
    this.html = document.createElement("div");
    this.html.className = "bullet";
    animationObjectsArray.push(this);

    document.querySelector(".border").appendChild(this.html);
  }

  #updateRotation() {
    [this.rotation] = rect2Polar(this.direction[0], this.direction[1]);
    this.rotation += Math.PI / 2;
    objectTransform(
      this.html,
      this.currXYCoords[0],
      this.currXYCoords[1],
      this.rotation
    );
  }

  #updateBulletDirection() {
    if (this.currXYCoords[0] > 0 && this.currXYCoords[1] < 0)
      this.direction = [-0.5, 0.5];
    if (this.currXYCoords[0] > 0 && this.currXYCoords[1] > 0)
      this.direction = [-0.5, -0.5];
    if (this.currXYCoords[0] < 0 && this.currXYCoords[1] < 0)
      this.direction = [0.5, 0.5];
    if (this.currXYCoords[0] < 0 && this.currXYCoords[1] > 0)
      this.direction = [0.5, -0.5];
  }

  #updateBulletNextCoords() {
    this.nextXYCoords = [
      this.currXYCoords[0] + this.speed * this.direction[0],
      this.currXYCoords[1] + this.speed * this.direction[1],
    ];
    this.currXYCoords = this.nextXYCoords;
  }

  #moveForward() {
    this.#updateBulletNextCoords();
    objectTransform(this.html, this.currXYCoords[0], this.currXYCoords[1], 0);
  }

  eventLoop() {
    this.#moveForward();
    if (isOutsideRing(this.currXYCoords)) {
      this.#updateBulletDirection();
    }
    this.#updateRotation();
  }
}
