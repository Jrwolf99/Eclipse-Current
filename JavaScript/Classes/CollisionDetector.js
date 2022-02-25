class CollisionDetector {
  constructor() {
    animationObjectsArray.push(this);
  }

  checkForCollision(Object1, detectionRadius, Object2) {
    let distanceOfObject2to1 = findMagnitude([
      Object2.currXYCoords[0] - Object1.currXYCoords[0],
      Object2.currXYCoords[1] - Object1.currXYCoords[1],
    ]);
    console.log(distanceOfObject2to1);
  }

  eventLoop() {
    // for(let i=0; i<animationObjectsArray.length-1; i++) {
    //     let object = animationObjectsArray(i);
    //     if ()
    //   if (object.currXYCoords) {
    //         this.checkForCollision(object, object.style.width);
    //       }
    // }
  }
}
