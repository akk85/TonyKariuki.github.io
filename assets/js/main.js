// === Tony Kariuki Portfolio | Fast Robot Style JS ===
"use strict";
gsap.registerPlugin(ScrollTrigger);

// === Scroll-to-Top Button ===
const scrollTop = document.querySelector('.scroll-top');
window.addEventListener('scroll', () => {
  scrollTop?.classList.toggle('active', window.scrollY > 100);
});
scrollTop?.addEventListener('click', e => {
  e.preventDefault();
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

// === Preloader ===
window.addEventListener('load', () => {
  document.querySelector('#preloader')?.remove();
});

// === Typed Text Animation ===
const selectTyped = document.querySelector('.typed');
if (selectTyped) {
  const items = selectTyped.getAttribute('data-typed-items').split(',');
  new Typed('.typed', {
    strings: items,
    loop: true,
    typeSpeed: 100,
    backSpeed: 50,
    backDelay: 2000
  });
}

// === AOS Animations ===
AOS.init({ duration: 1000, once: true });

// === Scroll Animations for Sections ===
gsap.utils.toArray("section").forEach(section => {
  gsap.from(section, {
    scrollTrigger: { trigger: section, start: "top 85%" },
    opacity: 0,
    y: 50,
    duration: 0.8,
    ease: "power2.out"
  });
});

// === Portfolio Items Hover Glow ===
document.querySelectorAll(".portfolio-item").forEach(item => {
  item.addEventListener("mouseenter", () => {
    gsap.to(item, { boxShadow: "0 0 20px rgba(0, 173, 181, 0.5)", scale: 1.05, duration: 0.3 });
  });
  item.addEventListener("mouseleave", () => {
    gsap.to(item, { boxShadow: "0 0 0 rgba(0, 0, 0, 0)", scale: 1, duration: 0.3 });
  });
  gsap.from(item, {
    scrollTrigger: { trigger: item, start: "top 85%" },
    opacity: 0,
    scale: 0.95,
    duration: 0.6,
    ease: "power2.out"
  });
});

// === Highlight Ongoing Project ===
const ongoing = document.querySelector(".portfolio-item.ongoing");
if (ongoing) {
  gsap.to(ongoing, {
    scale: 1.02,
    duration: 1.5,
    repeat: -1,
    yoyo: true,
    ease: "sine.inOut"
  });
}

// === Image Lazy Fade In ===
document.addEventListener("DOMContentLoaded", () => {
  const imgs = document.querySelectorAll(".portfolio-content img");
  imgs.forEach(img => {
    img.style.opacity = '0';
    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = '1';
          entry.target.style.animation = 'fadeIn 1s ease-out forwards';
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });
    observer.observe(img);
  });
});

// === Smooth Anchor Scroll ===
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener("click", e => {
    const target = document.querySelector(link.getAttribute("href"));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  });
});

// === Hero Text Animation ===
gsap.from(".hero h2", { opacity: 0, y: 50, duration: 1.5, ease: "power3.out" });
gsap.from(".hero p", { opacity: 0, y: 30, duration: 1.5, delay: 0.5, ease: "power3.out" });
gsap.from(".hero .btn", { opacity: 0, scale: 0.8, duration: 1, delay: 1, ease: "back.out(1.7)" });

// === ParticlesJS in Hero Background ===
particlesJS("hero", {
  particles: {
    number: { value: 80, density: { enable: true, value_area: 800 } },
    color: { value: "#00ADB5" },
    shape: { type: "circle" },
    opacity: { value: 0.5, random: true },
    size: { value: 3, random: true },
    line_linked: { enable: true, distance: 150, color: "#00ADB5", opacity: 0.4, width: 1 },
    move: { enable: true, speed: 2 }
  },
  interactivity: {
    detect_on: "canvas",
    events: {
      onhover: { enable: true, mode: "repulse" },
      onclick: { enable: true, mode: "push" }
    },
    modes: {
      repulse: { distance: 100, duration: 0.4 },
      push: { particles_nb: 4 }
    }
  },
  retina_detect: true
});
