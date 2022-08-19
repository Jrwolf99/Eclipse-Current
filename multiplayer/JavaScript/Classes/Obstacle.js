class Obstacle {
  constructor(obstacleData) {
    this.currXYCoords = [
      (obstacleData[0] * findRingRadius() - findRingRadius() / 2) * 1,
      (obstacleData[1] * findRingRadius() - findRingRadius() / 2) * 1,
    ];
    this.html = document.createElement("div");
    this.html.className = "obstacle";
    this.explodeParticlesArray = [];
    this.hasBeenHit = false;
    document.querySelector(".border").appendChild(this.html);
    animationObjectsArray.push(this);
    objectTransform(this.html, this.currXYCoords[0], this.currXYCoords[1], 0);

    this.ExplosionSound = new Audio("/Assets/sounds/Explosion1.mp3");
  }

  #deleteExplodeParticles() {
    this.explodeParticlesArray[0].html.remove();
    this.explodeParticlesArray.shift();
  }

  #createExplodeParticles() {
    for (let i = 0; i < 10; i++)
      this.explodeParticlesArray.push(
        new Particle(
          [Math.random() - 0.5, Math.random() - 0.5],
          this.currXYCoords[0],
          this.currXYCoords[1],
          "#7B6E6F",
          2
        )
      );
  }

  #moveExplodeParticles() {
    this.explodeParticlesArray.forEach((particle) => {
      particle.move();
      particle.size <= 0.2 && this.#deleteExplodeParticles();
    });
  }

  explode(nextXYCoords) {
    this.ExplosionSound.pause();
    this.ExplosionSound.currentTime = 0;
    this.ExplosionSound.play();

    this.#createExplodeParticles();

    this.currXYCoords = nextXYCoords;

    objectTransform(this.html, this.currXYCoords[0], this.currXYCoords[1], 0);
    this.hasBeenHit = false;
  }

  eventLoop() {
    if (this.hasBeenHit) {
      let nextXYCoords = [
        (Math.random() * findRingRadius() - findRingRadius() / 2) * 1.5,
        (Math.random() * findRingRadius() - findRingRadius() / 2) * 1.5,
      ];

      this.explode(nextXYCoords);

      wsEmit({
        type: "obstaclehit c2s",
        nextXYCoords: nextXYCoords,
      });
    }
    this.#moveExplodeParticles();
  }
}
