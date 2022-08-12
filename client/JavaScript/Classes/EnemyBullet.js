class EnemyBullet {
  constructor(currXYCoords, directionOfShot, uid) {
    this.currXYCoords = [
      currXYCoords[0] + 75 * directionOfShot[0],
      currXYCoords[1] + 75 * directionOfShot[1],
    ];
    this.nextXYCoords;
    this.direction = directionOfShot;
    this.speed = 8;
    this.rotation;
    this.html = document.createElement("div");
    this.html.className = "bullet";
    document.querySelector(".border").appendChild(this.html);

    this.uid = uid;
  }

  deleteSelf() {
    const index = animationObjectsArray.indexOf(this);
    if (index > -1) {
      animationObjectsArray.splice(index, 1);
      //move the bullet out of the way (and out of ring) to 2000,2000.
      //this is a bad and hacky implementation and should be fixed.
      this.currXYCoords = [2000, 2000];
      this.html.remove();
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
    if (this.currXYCoords[0] > 0 && this.currXYCoords[1] < 0)
      this.direction = [-0.5, 0.5];
    if (this.currXYCoords[0] > 0 && this.currXYCoords[1] > 0)
      this.direction = [-0.5, -0.5];
    if (this.currXYCoords[0] < 0 && this.currXYCoords[1] < 0)
      this.direction = [0.5, 0.5];
    if (this.currXYCoords[0] < 0 && this.currXYCoords[1] > 0)
      this.direction = [0.5, -0.5];
  }

  #updateBulletNextCoords(bulletCoords) {
    this.nextXYCoords = bulletCoords;
    this.currXYCoords = this.nextXYCoords;
  }

  moveBullet(bulletCoords, direction) {
    console.log("bulletCoords: ", bulletCoords);
    console.log("direction: ", direction);

    this.#updateBulletNextCoords(bulletCoords);
    this.direction = direction;

    objectTransform(this.html, this.currXYCoords[0], this.currXYCoords[1], 0);
  }

  eventLoop(data) {
    if (typeof data === "undefined") return;
    this.moveBullet(data[0], data[1]);

    this.#updateRotation();
  }
}
