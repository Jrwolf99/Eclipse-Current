class CollisionDetector {
  constructor() {
    animationObjectsArray.push(this);
    this.ObstacleXYCoords;
    this.ShipXYCoords;
    this.ElementHasBeenHit = ["element", false];
  }

  checkForCollision(ObstacleXYCoords, detectionRadius, Object2) {
    let distanceOfObject2to1 = findMagnitude([
      Object2.currXYCoords[0] - ObstacleXYCoords[0],
      Object2.currXYCoords[1] - ObstacleXYCoords[1],
    ]);

    if (distanceOfObject2to1 < detectionRadius) return true;
    return false;
  }

  //todo Fix the nested if statements and also get this working to notify the elements that they have been hit
  eventLoop() {
    animationObjectsArray.forEach((element) => {
      if (element.constructor.name === "Obstacle") {
        if (this.ElementHasBeenHit == ["Obstacle", true]) {
          console.log(this.ElementHasBeenHit);

          element.hasBeenHit = true;
        }
        this.ObstacleXYCoords = element.currXYCoords;
      }
      if (element.constructor.name === "Ship") {
        this.ShipXYCoords = element.currXYCoords;
      }

      if (element.constructor.name === "Bullet") {
        if (this.checkForCollision(this.ObstacleXYCoords, 100, element)) {
          this.ElementHasBeenHit = ["Obstacle", true];
        }
      }
    });
  }
}
