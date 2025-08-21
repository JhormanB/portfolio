// Mobile navigation toggle
const navToggle = document.querySelector('.nav-toggle');
const navMenu = document.querySelector('#nav-menu');
if (navToggle && navMenu) {
  navToggle.addEventListener('click', () => {
    const isOpen = navMenu.classList.toggle('open');
    navToggle.setAttribute('aria-expanded', String(isOpen));
  });
}

// Update current year in footer
const yearTarget = document.querySelector('#year');
if (yearTarget) {
  yearTarget.textContent = new Date().getFullYear();
}

// Initialize AOS (Animate On Scroll)
if (window.AOS) {
  AOS.init({
    duration: 700,
    easing: 'ease-out-quart',
    once: true,
    offset: 80,
  });
}


