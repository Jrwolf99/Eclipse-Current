class Bullet {
  constructor(currXYCoords, directionOfShot) {
    this.currXYCoords = [
      currXYCoords[0] + 75 * directionOfShot[0],
      currXYCoords[1] + 75 * directionOfShot[1],
    ];
    this.nextXYCoords;
    this.direction = directionOfShot;
    this.speed = 18;

    this.wallHitCount = 0;

    this.rotation;
    this.html = document.createElement("div");
    this.html.className = "bullet";
    document.querySelector(".border").appendChild(this.html);
    this.uid = crypto.randomUUID();
  }

  deleteSelf() {
    const index = animationObjectsArray.indexOf(this);
    if (index > -1) {
      animationObjectsArray.splice(index, 1);
      this.currXYCoords = [2000, 2000];
      this.html.remove();

      wsEmit({
        type: "deletebullet c2s",
        bulletUID: this.uid,
      });

      //send bullet delete event. attach bullet this.UID to package.
    }
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
    this.wallHitCount++;
    if (this.wallHitCount > 1) this.deleteSelf();

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

    return [
      this.uid,
      {
        coords: this.currXYCoords,
        direction: this.direction,
      },
    ];
  }
}
