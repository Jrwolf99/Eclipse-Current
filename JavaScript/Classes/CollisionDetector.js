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
    if (this.thereWasCollision(this.Ship, this.Obstacle, 100)) {
      console.log("ship to obstacle");
      endGame();
    }
  }

  checkShipToBulletHit() {
    this.BulletArray.forEach((bullet) => {
      if (this.thereWasCollision(this.Ship, bullet, 50)) {
        console.log("ship to bullet");
        endGame();
      }
    });
  }
  checkBulletToObstacle() {
    this.BulletArray.forEach((bullet) => {
      if (this.thereWasCollision(bullet, this.Obstacle, 100)) {
        console.log("bullet to obstacle");

        this.Obstacle.hasBeenHit = true;
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
