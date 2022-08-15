class CollisionDetector {
  constructor() {
    animationObjectsArray.push(this);
    this.BulletList = {};
    this.EnemyShipsList = {};
    this.Obstacle;
    this.Ship;
  }

  thereWasCollision(Object2, Object1, detectionRadius) {
    let distanceOfObject2to1 = findMagnitude([
      Object2.currXYCoords[0] - Object1.currXYCoords[0],
      Object2.currXYCoords[1] - Object1.currXYCoords[1],
    ]);
    if (distanceOfObject2to1 < detectionRadius) {
      console.log("collision!");
      return true;
    }
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
    Object.keys(this.BulletList).forEach((key) => {
      let bullet = this.BulletList[key];

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
    Object.keys(this.BulletList).forEach((key) => {
      let bullet = this.BulletList[key];

      if (
        this.thereWasCollision(bullet, this.Obstacle, 100) &&
        !this.Obstacle.hasBeenHit
      ) {
        this.Obstacle.hasBeenHit = true;
        bullet.deleteSelf();
        delete this.BulletList[key];
        this.Ship.updateScore();
      }
    });
  }

  checkBulletToEnemyShip() {
    Object.keys(this.EnemyShipsList).forEach((enemyshipkey) => {
      let EnemyShip = this.EnemyShipsList[enemyshipkey];

      Object.keys(this.BulletList).forEach((bulletkey) => {
        let bullet = this.BulletList[bulletkey];

        console.log("bullet to enemy");

        if (this.thereWasCollision(bullet, EnemyShip, 50)) {
          this.Obstacle.hasBeenHit = true;
          bullet.deleteSelf();
          delete this.BulletList[bulletkey];
          this.Ship.updateScore();
        }
      });
    });
  }

  eventLoop() {
    animationObjectsArray.forEach((object) => {
      if (object instanceof Obstacle) {
        this.Obstacle = object;
      }
      if (object instanceof Ship) {
        this.Ship = object;
      }
      if (object instanceof EnemyShip) {
        if (!this.EnemyShipsList[object.uid]) {
          console.log("enemyship added here");
          this.EnemyShipsList[object.uid] = object;
        }
      }
      if (object instanceof Bullet) {
        if (!this.BulletList[object.uid]) {
          console.log("my bullet added here");
          this.BulletList[object.uid] = object;
        }
      }
    });

    this.checkShipToObstacleHit();
    this.checkShipToBulletHit();
    this.checkBulletToObstacle();
    this.checkBulletToEnemyShip();
  }
}
