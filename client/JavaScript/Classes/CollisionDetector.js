class CollisionDetector {
  constructor() {
    animationObjectsArray.push(this);
    this.BulletArray = [];
    this.EnemyShipsArray = [];
    this.Obstacle;
    this.Ship;

    console.log("collision detector made!");
  }

  thereWasCollision(Object2, Object1, detectionRadius) {
    console.log("collision!");

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

  checkBulletToEnemyShip() {
    this.EnemyShipsArray.forEach((EnemyShip, i) => {
      this.BulletArray.forEach((bullet) => {
        if (
          this.thereWasCollision(bullet, EnemyShip, 50) &&
          !this.EnemyShipsArray[i].hasBeenHit
        ) {
          this.EnemyShipsArray[i].hasBeenHit = true;
          bullet.deleteSelf();
          this.Ship.updateScore();
        }
      });
    });
  }

  eventLoop() {
    animationObjectsArray.forEach((object) => {
      console.log("entered here");

      if (object instanceof Obstacle) {
        this.Obstacle = object;
      }
      if (object instanceof Ship) {
        this.Ship = object;
      }
      if (object instanceof EnemyShip) {
        this.EnemyShipsArray.push(object);
      }
      if (object instanceof Bullet) {
        this.BulletArray.push(object);
      }
    });

    this.checkShipToObstacleHit();
    this.checkShipToBulletHit();
    this.checkBulletToObstacle();

    // this.checkBulletToEnemyShip();
  }
}
