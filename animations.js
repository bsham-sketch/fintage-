document.addEventListener("DOMContentLoaded", () => {
  const button = document.getElementById("mb");
  const navigation = document.getElementById("nv");
  if (button && navigation) {
    button.addEventListener("click", () => {
      const open = navigation.classList.toggle("open");
      button.setAttribute("aria-expanded", String(open));
    });
  }

  const page = document.querySelector(".view[data-page]");
  if (!page) return;
  document.querySelectorAll("nav a[data-n]").forEach((link) => {
    if (link.dataset.n === page.dataset.page) link.classList.add("on");
  });

  page.classList.add("page-enter");
  const progress = document.createElement("div");
  progress.className = "prog";
  document.body.prepend(progress);
  const heading = page.querySelector("h1.big");
  if (heading) {
    const title = heading.textContent.trim();
    heading.setAttribute("aria-label", title);
    heading.innerHTML = title.split(" ").map((word, index) =>
      `<span class="w" aria-hidden="true"><span style="--i:${index}">${word}</span></span>`
    ).join(" ");
  }
  const rings = page.querySelector(".rings");
  if (rings && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    requestAnimationFrame(() => setTimeout(() => rings.classList.add("on"), 150));
  }
  const targets = page.querySelectorAll(".hero2, .idea, .grid, .grid > .cell, .row, .band, form, form label, .hub, .mq, .scene");
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (reduceMotion || !("IntersectionObserver" in window)) {
    targets.forEach((element) => element.classList.add("visible"));
    return;
  }

  targets.forEach((element, index) => {
    element.classList.add("reveal");
    element.style.setProperty("--motion-delay", `${(index % 4) * 80}ms`);
  });
  let ticking = false;
  const updateProgress = () => {
    ticking = false;
    const range = document.documentElement.scrollHeight - window.innerHeight;
    progress.style.transform = `scaleX(${range > 0 ? Math.min(1, window.scrollY / range) : 0})`;
  };
  window.addEventListener("scroll", () => {
    if (!ticking) { ticking = true; requestAnimationFrame(updateProgress); }
  }, { passive: true });
  updateProgress();

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add("visible");
      observer.unobserve(entry.target);
    });
  }, { threshold: 0.12, rootMargin: "0px 0px -24px 0px" });
  targets.forEach((element) => observer.observe(element));

  if (window.matchMedia("(hover: hover)").matches) {
    page.querySelectorAll(".panel").forEach((panel) => panel.addEventListener("pointermove", (event) => {
      const box = panel.getBoundingClientRect();
      panel.style.setProperty("--mx", `${event.clientX - box.left}px`);
      panel.style.setProperty("--my", `${event.clientY - box.top}px`);
    }));
  }
});
