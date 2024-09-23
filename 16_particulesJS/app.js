const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

class Particle {
  constructor(x, y, diretionX, directionY, size, color) {
    this.x = x;
    this.y = y;
    this.diretionX = diretionX;
    this.directionY = directionY;
    this.size = size;
    this.color = color;
  }
  // Methode pour dessiner les particules
  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fillStyle = this.color;
    ctx.fill();
  }

  // Methode pour mettre à jour la position de la particule
  update() {
    if (this.x > canvas.width || this.x < 0) {
      this.diretionX = -this.diretionX;
    } else if (this.y > canvas.height || this.y < 0) {
      this.directionY = -this.directionY;
    }
    this.x += this.diretionX;
    this.y += this.directionY;
    this.draw();
  }
}

const particle1 = new Particle(10, 10, 50, 55, 2, "#f1f1f1");
console.log(particle1);
