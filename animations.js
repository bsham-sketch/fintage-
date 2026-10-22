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

  const targets = page.querySelectorAll(".idea, .grid, .grid > .cell, .row, .band, form, form label, .hub");
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (reduceMotion || !("IntersectionObserver" in window)) {
    targets.forEach((element) => element.classList.add("visible"));
    return;
  }

  targets.forEach((element, index) => {
    element.classList.add("reveal");
    element.style.setProperty("--motion-delay", `${(index % 4) * 80}ms`);
  });
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add("visible");
      observer.unobserve(entry.target);
    });
  }, { threshold: 0.12, rootMargin: "0px 0px -24px 0px" });
  targets.forEach((element) => observer.observe(element));
});
