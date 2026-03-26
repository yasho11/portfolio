// ====== Helpers ======
const $ = (q) => document.querySelector(q);
const $$ = (q) => document.querySelectorAll(q);

const toast = (msg) => {
  const el = $("#toast");
  if (!el) return;
  el.textContent = msg;
  clearTimeout(window.__toastTimer);
  window.__toastTimer = setTimeout(() => (el.textContent = ""), 2500);
};

// ====== Year ======
$("#year").textContent = new Date().getFullYear();

// ====== Reveal on scroll ======
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) e.target.classList.add("show");
    });
  },
  { threshold: 0.08 }
);

$$(".reveal").forEach((el) => observer.observe(el));

// ====== Mobile menu ======
const burger = $("#burger");
const mobileMenu = $("#mobileMenu");

const closeMenu = () => {
  burger.setAttribute("aria-expanded", "false");
  mobileMenu.setAttribute("aria-hidden", "true");
  mobileMenu.classList.remove("open");
};

const openMenu = () => {
  burger.setAttribute("aria-expanded", "true");
  mobileMenu.setAttribute("aria-hidden", "false");
  mobileMenu.classList.add("open");
};

if (burger && mobileMenu) {
  burger.addEventListener("click", () => {
    const isOpen = burger.getAttribute("aria-expanded") === "true";
    isOpen ? closeMenu() : openMenu();
  });

  $$(".m-link").forEach((a) =>
    a.addEventListener("click", () => closeMenu())
  );
}

// ====== Copy email button ======
const copyBtn = $("#copyEmail");
if (copyBtn) {
  copyBtn.addEventListener("click", async () => {
    try {
      await navigator.clipboard.writeText("yashodeep.basnet@gmail.com");
      toast("✓ Email copied to clipboard");
    } catch {
      toast("Email: yashodeep.basnet@gmail.com");
    }
  });
}