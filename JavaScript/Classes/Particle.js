class ParticleArray extends Array {
  constructor(directionalVector, currXYCoords, ParentHtml) {
    super();
  }

  remove() {
    particlesArray.shift();
    this.html.remove();
  }
}

class Particle {
  constructor(directionalVector, currXYCoords, ParentHtml) {
    this.directionalVector = directionalVector;
    [this.xPos, this.yPos] = currXYCoords;
    this.size = Math.random() * 20 + 1;

    this.particleSpeed = Math.random() * -7;
    this.html = document.createElement("div");
    this.ParentHtml = ParentHtml;
    this.color = "rgb(255, 81, 0)";
  }
  draw() {
    this.html.className = "particle";
    this.html.style.width = `${this.size}px`;
    this.html.style.height = `${this.size}px`;
    this.html.style.background = `${this.color}`;
    objectTransform(this.html, this.xPos, this.yPos, 0);

    this.ParentHtml.insertAdjacentElement("afterend", this.html);
  }

  move() {
    this.xPos += this.directionalVector[0] * this.particleSpeed;
    this.yPos += this.directionalVector[1] * this.particleSpeed;
    if (this.size > 0.2) this.size -= 2;
  }
}
