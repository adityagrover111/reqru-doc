// Navbar scroll effects
const navbar = document.getElementById("navbar");
const mobileMenuToggle = document.getElementById("mobileMenuToggle");
const mobileMenu = document.getElementById("mobileMenu");

// Add scroll effect to navbar
let lastScrollY = window.scrollY;

window.addEventListener("scroll", () => {
  const currentScrollY = window.scrollY;

  // Add scrolled class for blur effect
  if (currentScrollY > 50) {
    navbar.classList.add("scrolled");
  } else {
    navbar.classList.remove("scrolled");
  }

  lastScrollY = currentScrollY;
});

// Mobile menu toggle
mobileMenuToggle.addEventListener("click", (e) => {
  e.stopPropagation();
  mobileMenuToggle.classList.toggle("open");
  mobileMenu.classList.toggle("open");
});

// Close mobile menu when clicking outside
document.addEventListener("click", (e) => {
  if (!mobileMenu.contains(e.target) && !mobileMenuToggle.contains(e.target)) {
    mobileMenuToggle.classList.remove("open");
    mobileMenu.classList.remove("open");
  }
});

// Enhanced nav active link highlight
const links = document.querySelectorAll("nav a");
const sections = [...document.querySelectorAll("section")];

function setActiveLink() {
  let index = sections.length;
  while (--index && window.scrollY + 150 < sections[index].offsetTop) {}

  links.forEach((link) => link.classList.remove("active"));
  if (links[index]) {
    links[index].classList.add("active");
  }
}

// Throttle scroll events for better performance
let ticking = false;
function requestTick() {
  if (!ticking) {
    requestAnimationFrame(setActiveLink);
    ticking = true;
  }
}

setActiveLink();
window.addEventListener("scroll", () => {
  requestTick();
  ticking = false;
});

// Smooth scroll with offset for fixed nav
links.forEach((link) => {
  link.addEventListener("click", (e) => {
    e.preventDefault();
    const targetId = link.getAttribute("href");
    const targetSection = document.querySelector(targetId);

    if (targetSection) {
      const offsetTop = targetSection.offsetTop - 100;
      window.scrollTo({
        top: offsetTop,
        behavior: "smooth",
      });
    }

    // Close mobile menu if open
    mobileMenuToggle.classList.remove("open");
    mobileMenu.classList.remove("open");

    // Update active states
    links.forEach((l) => l.classList.remove("active"));
    link.classList.add("active");
  });
});
