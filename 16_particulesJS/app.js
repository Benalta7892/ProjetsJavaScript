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

let particlesArray;

function init() {
  particlesArray = [];

  const numberOfParticles = (canvas.height * canvas.width) / 4000;

  for (let i = 0; i < numberOfParticles; i++) {
    //[1, 3[ donc on veut des valeurs entre 1 et 2 donc on ajoute 1
    const size = Math.random() * 2 + 1;
    // return Math.random() * (max - min + 1) + min;
    const x = Math.random() * (innerWidth - 10 - 10 + 1) + 10;
    const y = Math.random() * (innerHeight - 10 - 10 + 1) + 10;

    const directionX = cleanDirection();
    const directionY = cleanDirection();
    particlesArray.push(new Particle(x, y, directionX, directionY, size, "#f1f1f1"));
  }
}

init();

function cleanDirection() {
  // 0 ou 1
  const random = Math.trunc(Math.random() * 2);
  if (random) {
    // de 0.5 à 1.5 non inclus, non trunc (avec des décimales) [0.5, 1.5[
    return Math.random() * 1 + 0.5;
  } else {
    // de -0.5 à -1.5 non inclus, non trunc (avec des décimales) ]-1.5, -0.5]
    return Math.random() * -1 + -0.5;
  }
}

function animate() {
  ctx.clearRect(0, 0, innerWidth, innerHeight);
  for (let i = 0; i < particlesArray.length; i++) {
    particlesArray[i].update();
  }
  connect();

  requestAnimationFrame(animate);
}

animate();

function connect() {
  for (let i = 0; i < particlesArray.length; i++) {
    for (let j = i + 1; j < particlesArray.length; j++) {
      const squaredDistanceX =
        (particlesArray[i].x - particlesArray[j].x) * (particlesArray[i].x - particlesArray[j].x);
      const squaredDistanceY =
        (particlesArray[i].y - particlesArray[j].y) * (particlesArray[i].y - particlesArray[j].y);

      const hypothenuse = squaredDistanceX + squaredDistanceY;

      if (hypothenuse < 135 * 135) {
        // Plus la distance est petite, plus la couleur est foncée
        ctx.strokeStyle = `rgba(240, 240, 240, ${1 - hypothenuse / (135 * 135)})`;
        ctx.lineWidth = 0.4;
        ctx.beginPath();
        ctx.moveTo(particlesArray[i].x, particlesArray[i].y);
        ctx.lineTo(particlesArray[j].x, particlesArray[j].y);
        ctx.stroke();
      }
    }
  }
}

window.addEventListener("resize", handleResize);

function handleResize() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  init();
}
