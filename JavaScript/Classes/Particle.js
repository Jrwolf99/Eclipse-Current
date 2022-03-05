class Particle {
  constructor(directionalVector, xPos, yPos) {
    this.directionalVector = directionalVector;
    [this.xPos, this.yPos] = [xPos, yPos];
    this.size = 1;
    this.particleSpeed = Math.random() * -7;
    this.ParentHtml = document.querySelector(".border");
    this.html = document.createElement("div");
    this.html.className = "particle";
    this.html.style.width = `${Math.random() * 20 + 1}px`;
    this.html.style.height = `${Math.random() * 20 + 1}px`;
    this.html.style.background = "rgb(255, 81, 0)";
    this.ParentHtml.appendChild(this.html);
    objectTransform(this.html, this.xPos, this.yPos, 0);
  }

  move() {
    this.xPos += this.directionalVector[0] * 20;
    this.yPos += this.directionalVector[1] * 20;
    if (this.size > 0.2) this.size -= 0.11;
    this.html.style.transform = `translate3d(${this.xPos}px, ${this.yPos}px, 0px) scale3d(${this.size}, ${this.size}, ${this.size})`;
  }
}
