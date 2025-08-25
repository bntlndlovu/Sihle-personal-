const canvas = document.getElementById("heart-canvas");
const ctx = canvas.getContext("2d");

let width, height;
function resizeCanvas() {
  width = window.innerWidth;
  height = window.innerHeight;
  canvas.width = width;
  canvas.height = height;
}
resizeCanvas();
window.addEventListener("resize", resizeCanvas);

let hearts = [];

function drawHeart(x, y, size, alpha) {
  ctx.save();
  ctx.translate(x, y);
  ctx.scale(size, size);
  ctx.beginPath();
  ctx.moveTo(0, 0);
  ctx.bezierCurveTo(0, -3, -5, -15, -25, -15);
  ctx.bezierCurveTo(-55, -15, -55, 22.5, -55, 22.5);
  ctx.bezierCurveTo(-55, 40, -35, 62, 0, 80);
  ctx.bezierCurveTo(35, 62, 55, 40, 55, 22.5);
  ctx.bezierCurveTo(55, 22.5, 55, -15, 25, -15);
  ctx.bezierCurveTo(10, -15, 0, -3, 0, 0);
  ctx.closePath();
  ctx.fillStyle = `rgba(255, 0, 100, ${alpha})`;
  ctx.fill();
  ctx.restore();
}

function createHeart() {
  const x = Math.random() * width;
  const y = height + 50;
  const size = Math.random() * 0.6 + 0.2;
  const speed = Math.random() * 1 + 0.5;
  const alpha = Math.random() * 0.5 + 0.3;
  hearts.push({ x, y, size, speed, alpha });
}

function animate() {
  ctx.clearRect(0, 0, width, height);
  if (Math.random() < 0.1) createHeart();

  hearts.forEach((heart, i) => {
    heart.y -= heart.speed;
    drawHeart(heart.x, heart.y, heart.size * 20, heart.alpha);
    if (heart.y < -100) hearts.splice(i, 1);
  });

  requestAnimationFrame(animate);
}
animate();
