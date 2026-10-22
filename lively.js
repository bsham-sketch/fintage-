document.addEventListener("DOMContentLoaded", () => {
  if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  const canvas = document.createElement("canvas");
  canvas.id = "bg";
  document.body.prepend(canvas);
  const context = canvas.getContext("2d");
  let width = 0, height = 0, particles = [];
  const pointer = { x: -999, y: -999 };
  const resize = () => {
    const ratio = window.devicePixelRatio || 1;
    width = window.innerWidth; height = window.innerHeight;
    canvas.width = width * ratio; canvas.height = height * ratio;
    context.setTransform(ratio, 0, 0, ratio, 0, 0);
    const count = Math.round(Math.min(90, width * height / 16000));
    particles = Array.from({ length: count }, () => ({
      x: Math.random() * width, y: Math.random() * height,
      vx: (Math.random() - .5) * .4, vy: (Math.random() - .5) * .4,
      radius: 1.4 + Math.random() * 2
    }));
  };
  resize(); window.addEventListener("resize", resize);
  window.addEventListener("pointermove", event => { pointer.x = event.clientX; pointer.y = event.clientY; }, { passive: true });
  let running = true;
  document.addEventListener("visibilitychange", () => { running = !document.hidden; if (running) draw(); });
  const draw = () => {
    if (!running) return;
    context.clearRect(0, 0, width, height);
    particles.forEach(point => {
      point.x += point.vx; point.y += point.vy;
      if (point.x < 0 || point.x > width) point.vx *= -1;
      if (point.y < 0 || point.y > height) point.vy *= -1;
      const dx = point.x - pointer.x, dy = point.y - pointer.y;
      if (dx * dx + dy * dy < 14000) { point.x += dx * .012; point.y += dy * .012; }
      context.beginPath(); context.arc(point.x, point.y, point.radius, 0, Math.PI * 2);
      context.fillStyle = "rgba(168,118,50,.72)"; context.shadowColor = "#B88B4F"; context.shadowBlur = 6; context.fill();
    });
    context.shadowBlur = 0;
    for (let i = 0; i < particles.length; i++) for (let j = i + 1; j < particles.length; j++) {
      const a = particles[i], b = particles[j], dx = a.x - b.x, dy = a.y - b.y, distance = dx * dx + dy * dy;
      if (distance < 17000) {
        context.strokeStyle = `rgba(168,118,50,${.4 * (1 - distance / 17000)})`;
        context.lineWidth = 1; context.beginPath(); context.moveTo(a.x, a.y); context.lineTo(b.x, b.y); context.stroke();
      }
    }
    requestAnimationFrame(draw);
  };
  draw();
});
