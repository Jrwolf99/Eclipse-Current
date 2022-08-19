class Particle {
  constructor(directionalVector, xPos, yPos, color, size) {
    this.directionalVector = directionalVector;
    [this.xPos, this.yPos] = [xPos, yPos];
    this.size = size;
    this.random = Math.random() * 20 + 1;
    this.particleSpeed = Math.random() * -7;
    this.ParentHtml = document.querySelector(".border");
    this.html = document.createElement("div");
    this.html.className = "particle";
    this.html.style.width = `${this.random}px`;
    this.html.style.height = `${this.random}px`;
    this.html.style.background = color;
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
