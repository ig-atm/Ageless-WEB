/* ====================================================
   AGELESS LONGEVITY — JavaScript
   - Navbar scroll state
   - Hero entrance animations
   - Hamburger menu toggle
==================================================== */

(function () {
  'use strict';

  // ── Navbar scroll behaviour ─────────────────────
  const navbar = document.getElementById('navbar');

  function handleNavbarScroll() {
    if (window.scrollY > 30) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  }

  window.addEventListener('scroll', handleNavbarScroll, { passive: true });
  handleNavbarScroll(); // run on load

  // ── Hamburger toggle ────────────────────────────
  const hamburger = document.getElementById('hamburger');
  const navLinks  = document.getElementById('navLinks');

  if (hamburger && navLinks) {
    hamburger.addEventListener('click', () => {
      const isOpen = navLinks.classList.toggle('open');
      hamburger.setAttribute('aria-expanded', isOpen);

      // Animate hamburger → ✕
      const spans = hamburger.querySelectorAll('span');
      if (isOpen) {
        spans[0].style.transform = 'rotate(45deg) translate(4px, 4px)';
        spans[1].style.opacity   = '0';
        spans[2].style.transform = 'rotate(-45deg) translate(4px, -4px)';
      } else {
        spans[0].style.transform = '';
        spans[1].style.opacity   = '';
        spans[2].style.transform = '';
      }
    });
  }

  // ── Hero entrance animations ────────────────────
  const animatables = document.querySelectorAll('[data-animate]');

  function triggerAnimations() {
    animatables.forEach((el) => {
      const delay = parseInt(el.dataset.delay || '0', 10);
      setTimeout(() => {
        el.classList.add('is-visible');
      }, delay + 200); // base offset after page load
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', triggerAnimations);
  } else {
    triggerAnimations();
  }

  // ── Subtle parallax on hero image ──────────────
  const heroImg = document.querySelector('.hero-img');

  function handleParallax() {
    if (!heroImg) return;
    const scrollY = window.scrollY;
    const max     = window.innerHeight;
    if (scrollY < max) {
      heroImg.style.transform = `scale(1) translateY(${scrollY * 0.15}px)`;
    }
  }

  window.addEventListener('scroll', handleParallax, { passive: true });

})();
