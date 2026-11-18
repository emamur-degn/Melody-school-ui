const body = document.body;
const menuToggle = document.getElementById("menuToggle");
const closeMenu = document.getElementById("closeMenu");
const overlay = document.getElementById("mobileOverlay");
const sidebar = document.getElementById("mobileSidebar");

function openMenu() {
  body.classList.add("menu-open");
  menuToggle.setAttribute("aria-expanded", "true");
  sidebar.setAttribute("aria-hidden", "false");
}
function hideMenu() {
  body.classList.remove("menu-open");
  menuToggle.setAttribute("aria-expanded", "false");
  sidebar.setAttribute("aria-hidden", "true");
}
menuToggle.addEventListener("click", openMenu);
closeMenu.addEventListener("click", hideMenu);
overlay.addEventListener("click", hideMenu);
sidebar.querySelectorAll("a").forEach(link => link.addEventListener("click", hideMenu));
document.addEventListener("keydown", event => {
  if (event.key === "Escape") hideMenu();
});

// Reveal sections smoothly as they enter the viewport.
const revealObserver = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });
document.querySelectorAll(".reveal").forEach(el => revealObserver.observe(el));

// Update the active desktop navigation link while scrolling.
const sections = document.querySelectorAll("main section[id]");
const navLinks = document.querySelectorAll(".desktop-nav .nav-link");
const sectionObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navLinks.forEach(link => {
        link.classList.toggle("active", link.getAttribute("href") === `#${entry.target.id}`);
      });
    }
  });
}, { rootMargin: "-35% 0px -55% 0px" });
sections.forEach(section => sectionObserver.observe(section));

// Front-end demo form feedback. Connect to Laravel or another backend for real submissions.
document.getElementById("contactForm").addEventListener("submit", event => {
  event.preventDefault();
  document.getElementById("formMessage").classList.remove("hidden");
  event.target.reset();
});
