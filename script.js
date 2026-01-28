// Reveal on scroll
const els = document.querySelectorAll(".reveal");
const io = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if(entry.isIntersecting){
      entry.target.classList.add("isIn");
      io.unobserve(entry.target);
    }
  });
}, {threshold: 0.12});

els.forEach(el => io.observe(el));

// FAQ: делаем так, чтобы открывался только один
const faqItems = document.querySelectorAll(".faq details");
faqItems.forEach(d => {
  d.addEventListener("toggle", () => {
    if(d.open){
      faqItems.forEach(other => {
        if(other !== d) other.open = false;
      });
    }
  });
});
const overlay = document.getElementById("menuOverlay");
const menuBtn = document.querySelector(".menuBtn");
const closeBtn = document.querySelector(".menuClose");
const menuLinks = document.querySelectorAll(".menuLink");

// если чего-то нет — выходим
if (!overlay || !menuBtn || !closeBtn) {
  console.warn("Menu elements not found");
} else {
  function openMenu() {
    overlay.classList.add("isOpen");
    overlay.setAttribute("aria-hidden","false");
    menuBtn.setAttribute("aria-expanded","true");
    document.body.style.overflow = "hidden";
  }

  function closeMenu() {
    overlay.classList.remove("isOpen");
    overlay.setAttribute("aria-hidden","true");
    menuBtn.setAttribute("aria-expanded","false");
    document.body.style.overflow = "";
  }

  menuBtn.addEventListener("click", () => {
    const expanded = menuBtn.getAttribute("aria-expanded") === "true";
    expanded ? closeMenu() : openMenu();
  });

    closeBtn.addEventListener("click", closeMenu);
  menuLinks.forEach(link => link.addEventListener("click", closeMenu));

  overlay.addEventListener("click", (e) => {
    if (e.target === overlay) closeMenu();
  });
  window.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeMenu();
  });
}
