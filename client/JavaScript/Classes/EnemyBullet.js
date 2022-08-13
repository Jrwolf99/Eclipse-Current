class EnemyBullet {
  constructor(currXYCoords, directionOfShot, uid, shipUid) {
    this.currXYCoords = [
      currXYCoords[0] + 75 * directionOfShot[0],
      currXYCoords[1] + 75 * directionOfShot[1],
    ];
    this.nextXYCoords;
    this.direction = directionOfShot;
    this.rotation;
    this.html = document.createElement("div");
    this.html.className = "bullet";
    document.querySelector(".border").appendChild(this.html);

    this.uid = uid;
    this.shipUid = shipUid;
  }

  deleteSelf() {
    const index = animationObjectsArray.indexOf(this);
    if (index > -1) {
      animationObjectsArray.splice(index, 1);
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

  #updateBulletNextCoords(bulletCoords) {
    this.nextXYCoords = bulletCoords;
    this.currXYCoords = this.nextXYCoords;
  }

  moveBullet(bulletCoords, direction) {
    if (typeof bulletCoords === "undefined") return;
    if (typeof direction === "undefined") return;
    this.#updateBulletNextCoords(bulletCoords);
    this.direction = direction;

    objectTransform(this.html, this.currXYCoords[0], this.currXYCoords[1], 0);
  }

  eventLoop({ coords, direction }) {
    this.moveBullet(coords, direction);

    this.#updateRotation();
  }
}
