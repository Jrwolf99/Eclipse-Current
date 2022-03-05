class Obstacle {
  constructor() {
    this.currXYCoords = [
      (Math.random() * findRingRadius() - findRingRadius() / 2) * 1.5,
      (Math.random() * findRingRadius() - findRingRadius() / 2) * 1.5,
    ];
    this.html = document.createElement("div");
    this.html.className = "obstacle";
    this.hasBeenHit = false;
    document.querySelector(".border").appendChild(this.html);
    animationObjectsArray.push(this);
    objectTransform(this.html, this.currXYCoords[0], this.currXYCoords[1], 0);
  }

  #createExplodeParticles() {
    console.log("ehdn");
  }

  explode() {
    this.currXYCoords = [
      (Math.random() * findRingRadius() - findRingRadius() / 2) * 1.5,
      (Math.random() * findRingRadius() - findRingRadius() / 2) * 1.5,
    ];
    objectTransform(this.html, this.currXYCoords[0], this.currXYCoords[1], 0);
    this.#createExplodeParticles();
    this.hasBeenHit = false;
  }

  eventLoop() {
    if (this.hasBeenHit) {
      this.explode();
    }
  }
}
