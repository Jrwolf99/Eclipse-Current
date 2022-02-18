class Particle {
  constructor(iDirection, jDirection, xPos, yPos, size, particleSpeed, color) {
    [this.iDirection, this.jDirection] = [iDirection, jDirection];
    [this.xPos, this.yPos] = [xPos, yPos];
    this.size = size;
    this.particleSpeed = particleSpeed;
    this.html = document.createElement("div");
    this.color = color;
  }
  draw() {
    this.html.className = "particle";
    this.html.style.width = `${this.size}px`;
    this.html.style.height = `${this.size}px`;
    this.html.style.background = `${this.color}`;
    objectTransform(this.x, this.y, 1, this.html);
    Ship.insertAdjacentElement("afterend", this.html);
  }

  update() {
    this.xPos += this.iDirection * this.particleSpeed;
    this.yPos += this.jDirection * this.particleSpeed;
    if (this.size > 0.2) this.size -= 2;
  }
}
