document.addEventListener("DOMContentLoaded", () => {
  if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  const canvas = document.createElement("canvas");
  canvas.id = "bg";
  document.body.prepend(canvas);
  const context = canvas.getContext("2d");
  let width = 0, height = 0, particles = [];
  const pointer = { x: -9999, y: -9999 };
  const resize = () => {
    const ratio = window.devicePixelRatio || 1;
    width = window.innerWidth; height = window.innerHeight;
    canvas.width = width * ratio; canvas.height = height * ratio;
    context.setTransform(ratio, 0, 0, ratio, 0, 0);
    const count = Math.round(Math.min(120, width * height / 14000));
    particles = Array.from({ length: count }, () => ({
      x: Math.random() * width, y: Math.random() * height,
      vx: (Math.random() - .5) * .25, vy: (Math.random() - .5) * .25,
      radius: 1.2 + Math.random() * 1.8,
      angle: Math.random() * Math.PI * 2,
      orbitSpeed: .0008 + Math.random() * .0012,
      orbitRadius: 60 + Math.random() * 140,
      orbitCenterX: Math.random() * width,
      orbitCenterY: Math.random() * height
    }));
  };
  resize(); window.addEventListener("resize", resize);
  window.addEventListener("pointermove", event => { pointer.x = event.clientX; pointer.y = event.clientY; }, { passive: true });
  let running = true;
  document.addEventListener("visibilitychange", () => { running = !document.hidden; if (running) draw(); });
  const draw = () => {
    if (!running) return;
    context.clearRect(0, 0, width, height);
    particles.forEach((point, i) => {
      point.angle += point.orbitSpeed;
      point.x = point.orbitCenterX + Math.cos(point.angle) * point.orbitRadius;
      point.y = point.orbitCenterY + Math.sin(point.angle) * point.orbitRadius;
      point.x += point.vx; point.y += point.vy;
      if (point.x < 0 || point.x > width) point.vx *= -1;
      if (point.y < 0 || point.y > height) point.vy *= -1;
      const dx = point.x - pointer.x, dy = point.y - pointer.y;
      if (dx * dx + dy * dy < 20000) {
        point.x -= dx * .008; point.y -= dy * .008;
      }
      context.beginPath(); context.arc(point.x, point.y, point.radius, 0, Math.PI * 2);
      context.fillStyle = "rgba(184,139,79,.65)"; context.shadowColor = "#B88B4F"; context.shadowBlur = 4; context.fill();
    });
    context.shadowBlur = 0;
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const a = particles[i], b = particles[j], dx = a.x - b.x, dy = a.y - b.y, distance = dx * dx + dy * dy;
        if (distance < 16000) {
          context.strokeStyle = `rgba(184,139,79,${.35 * (1 - distance / 16000)})`;
          context.lineWidth = .8; context.beginPath(); context.moveTo(a.x, a.y); context.lineTo(b.x, b.y); context.stroke();
        }
      }
    }
    requestAnimationFrame(draw);
  };
  draw();
});
