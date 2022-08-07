class CollisionDetector {
  constructor() {
    animationObjectsArray.push(this);
    this.BulletArray = [];
    this.Obstacle;
    this.Ship;
  }

  thereWasCollision(Object2, Object1, detectionRadius) {
    let distanceOfObject2to1 = findMagnitude([
      Object2.currXYCoords[0] - Object1.currXYCoords[0],
      Object2.currXYCoords[1] - Object1.currXYCoords[1],
    ]);
    if (distanceOfObject2to1 < detectionRadius) return true;
    return false;
  }

  checkShipToObstacleHit() {
    if (
      this.thereWasCollision(this.Ship, this.Obstacle, 100) &&
      !this.Ship.hasBeenHit
    ) {
      this.Ship.hasBeenHit = true;
      console.log("END1");
      endGame();
    }
  }

  checkShipToBulletHit() {
    this.BulletArray.forEach((bullet) => {
      if (
        this.thereWasCollision(this.Ship, bullet, 50) &&
        !this.Ship.hasBeenHit
      ) {
        this.Ship.hasBeenHit = true;
        console.log("END2");
        endGame();
      }
    });
  }
  checkBulletToObstacle() {
    this.BulletArray.forEach((bullet) => {
      if (
        this.thereWasCollision(bullet, this.Obstacle, 100) &&
        !this.Obstacle.hasBeenHit
      ) {
        this.Obstacle.hasBeenHit = true;
        bullet.deleteSelf();
        this.Ship.updateScore();
      }
    });
  }

  eventLoop() {
    animationObjectsArray.forEach((element) => {
      if (element.constructor.name === "Obstacle") {
        this.Obstacle = element;
      }
      if (element.constructor.name === "Ship") {
        this.Ship = element;
      }
      if (element.constructor.name === "Bullet") {
        this.BulletArray.push(element);
      }
    });

    this.checkShipToObstacleHit();
    this.checkShipToBulletHit();
    this.checkBulletToObstacle();
  }
}
