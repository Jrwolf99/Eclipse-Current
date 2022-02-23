class Particle {
  constructor(directionalVector, currXYCoords) {
    this.directionalVector = directionalVector;
    [this.xPos, this.yPos] = currXYCoords;
    this.size = Math.random() * 20 + 1;
    this.particleSpeed = Math.random() * -7;
    this.ParentHtml = document.querySelector(".border");
    this.html = document.createElement("div");
    this.color = "rgb(255, 81, 0)";
  }
  draw() {
    this.html.className = "particle";
    this.html.style.width = `${this.size}px`;
    this.html.style.height = `${this.size}px`;
    this.html.style.background = `${this.color}`;
    objectTransform(this.html, this.xPos, this.yPos, 0);

    this.ParentHtml.appendChild(this.html);
  }

  move() {
    this.xPos += this.directionalVector[0] * this.particleSpeed;
    this.yPos += this.directionalVector[1] * this.particleSpeed;
    if (this.size > 0.2) this.size -= 2;
  }
}
