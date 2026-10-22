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
  if (page) {
    document.querySelectorAll("nav a[data-n]").forEach((link) => {
      if (link.dataset.n === page.dataset.page) link.classList.add("on");
    });
  }
});
