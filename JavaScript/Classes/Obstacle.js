class Obstacle {
  constructor() {
    this.currXYCoords = [
      (Math.random() * findRingRadius() - findRingRadius() / 2) * 1.5,
      (Math.random() * findRingRadius() - findRingRadius() / 2) * 1.5,
    ];
    this.html = document.createElement("div");
    this.html.className = "obstacle";

    document.querySelector(".border").appendChild(this.html);
    animationObjectsArray.push(this);
    objectTransform(this.html, this.currXYCoords[0], this.currXYCoords[1], 0);
  }

  eventLoop() {}
}
