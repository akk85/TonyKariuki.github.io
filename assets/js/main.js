/**
* Template Name: iPortfolio
* Template URL: https://bootstrapmade.com/iportfolio-bootstrap-portfolio-websites-template/
* Updated: Jun 29 2024 with Bootstrap v5.3.3
* Author: BootstrapMade.com
* License: https://bootstrapmade.com/license/
*/

(function() {
  "use strict";

  /**
   * Header toggle
   */
  const headerToggleBtn = document.querySelector('.header-toggle');

  function headerToggle() {
    document.querySelector('#header').classList.toggle('header-show');
    headerToggleBtn.classList.toggle('bi-list');
    headerToggleBtn.classList.toggle('bi-x');
  }
  headerToggleBtn.addEventListener('click', headerToggle);

  /**
   * Hide mobile nav on same-page/hash links
   */
  document.querySelectorAll('#navmenu a').forEach(navmenu => {
    navmenu.addEventListener('click', () => {
      if (document.querySelector('.header-show')) {
        headerToggle();
      }
    });

  });

  /**
   * Toggle mobile nav dropdowns
   */
  document.querySelectorAll('.navmenu .toggle-dropdown').forEach(navmenu => {
    navmenu.addEventListener('click', function(e) {
      e.preventDefault();
      this.parentNode.classList.toggle('active');
      this.parentNode.nextElementSibling.classList.toggle('dropdown-active');
      e.stopImmediatePropagation();
    });
  });

  /**
   * Preloader
   */
  const preloader = document.querySelector('#preloader');
  if (preloader) {
    window.addEventListener('load', () => {
      preloader.remove();
    });
  }

  /**
   * Scroll top button
   */
  let scrollTop = document.querySelector('.scroll-top');

  function toggleScrollTop() {
    if (scrollTop) {
      window.scrollY > 100 ? scrollTop.classList.add('active') : scrollTop.classList.remove('active');
    }
  }
  scrollTop.addEventListener('click', (e) => {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });

  window.addEventListener('load', toggleScrollTop);
  document.addEventListener('scroll', toggleScrollTop);

  /**
   * Animation on scroll function and init
   */
  function aosInit() {
    AOS.init({
      duration: 600,
      easing: 'ease-in-out',
      once: true,
      mirror: false
    });
  }
  window.addEventListener('load', aosInit);

  /**
   * Init typed.js
   */
  const selectTyped = document.querySelector('.typed');
  if (selectTyped) {
    let typed_strings = selectTyped.getAttribute('data-typed-items');
    typed_strings = typed_strings.split(',');
    new Typed('.typed', {
      strings: typed_strings,
      loop: true,
      typeSpeed: 100,
      backSpeed: 50,
      backDelay: 2000
    });
  }

  /**
   * Initiate Pure Counter
   */
  new PureCounter();

  /**
   * Animate the skills items on reveal
   */
  let skillsAnimation = document.querySelectorAll('.skills-animation');
  skillsAnimation.forEach((item) => {
    new Waypoint({
      element: item,
      offset: '80%',
      handler: function(direction) {
        let progress = item.querySelectorAll('.progress .progress-bar');
        progress.forEach(el => {
          el.style.width = el.getAttribute('aria-valuenow') + '%';
        });
      }
    });
  });

  /**
   * Initiate glightbox
   */
  const glightbox = GLightbox({
    selector: '.glightbox'
  });

  function initWaveform() {
    const canvas = document.getElementById("waveform");
    const ctx = canvas.getContext("2d");
    let animationFrame;
  
    canvas.width = canvas.parentElement.offsetWidth;
    let time = 0;
  
    function drawWave() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.beginPath();
      ctx.strokeStyle = "#00ADB5";
      ctx.lineWidth = 2;
  
      for (let x = 0; x < canvas.width; x++) {
        const y = Math.sin(x * 0.01 + time) * 50 + canvas.height / 2;
        x === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
      }
      ctx.stroke();
      time += 0.05;
      animationFrame = requestAnimationFrame(drawWave);
    }
    drawWave();
  
    window.addEventListener("resize", () => {
      canvas.width = canvas.parentElement.offsetWidth;
    });
  }
  initWaveform();

  
/**
 * Init isotope layout and filters
 */
document.querySelectorAll('.isotope-layout').forEach(function(isotopeItem) {
  let layout = isotopeItem.getAttribute('data-layout') ?? 'masonry';
  let filter = isotopeItem.getAttribute('data-default-filter') ?? '*';
  let sort = isotopeItem.getAttribute('data-sort') ?? 'original-order';

  let initIsotope;
  imagesLoaded(isotopeItem.querySelector('.isotope-container'), function() {
    initIsotope = new Isotope(isotopeItem.querySelector('.isotope-container'), {
      itemSelector: '.isotope-item',
      layoutMode: layout,
      filter: filter,
      sortBy: sort
    });
  });

  isotopeItem.querySelectorAll('.isotope-filters li').forEach(function(filters) {
    filters.addEventListener('click', function() {
      isotopeItem.querySelector('.isotope-filters .filter-active').classList.remove('filter-active');
      this.classList.add('filter-active');
      initIsotope.arrange({
        filter: this.getAttribute('data-filter')
      });
      if (typeof aosInit === 'function') {
        aosInit();
      }
    }, false);
  });

});

document.querySelectorAll(".portfolio-item").forEach((item) => {
  item.addEventListener("mouseenter", () => {
    gsap.to(item, {
      boxShadow: "0 0 30px rgba(0, 173, 181, 0.7)",
      scale: 1.05,
      duration: 0.3,
    });
  });
  item.addEventListener("mouseleave", () => {
    gsap.to(item, { boxShadow: "0 0 0 rgba(0, 173, 181, 0)", scale: 1, duration: 0.3 });
  });
});

  /**
   * Init swiper sliders
   */
  function initSwiper() {
    document.querySelectorAll(".init-swiper").forEach(function(swiperElement) {
      let config = JSON.parse(
        swiperElement.querySelector(".swiper-config").innerHTML.trim()
      );

      if (swiperElement.classList.contains("swiper-tab")) {
        initSwiperWithCustomPagination(swiperElement, config);
      } else {
        new Swiper(swiperElement, config);
      }
    });
  }

  window.addEventListener("load", initSwiper);

  /**
   * Correct scrolling position upon page load for URLs containing hash links.
   */
  window.addEventListener('load', function(e) {
    if (window.location.hash) {
      if (document.querySelector(window.location.hash)) {
        setTimeout(() => {
          let section = document.querySelector(window.location.hash);
          let scrollMarginTop = getComputedStyle(section).scrollMarginTop;
          window.scrollTo({
            top: section.offsetTop - parseInt(scrollMarginTop),
            behavior: 'smooth'
          });
        }, 100);
      }
    }
  });

  /**
   * Navmenu Scrollspy
   */
  let navmenulinks = document.querySelectorAll('.navmenu a');

  function navmenuScrollspy() {
    navmenulinks.forEach(navmenulink => {
      if (!navmenulink.hash) return;
      let section = document.querySelector(navmenulink.hash);
      if (!section) return;
      let position = window.scrollY + 200;
      if (position >= section.offsetTop && position <= (section.offsetTop + section.offsetHeight)) {
        document.querySelectorAll('.navmenu a.active').forEach(link => link.classList.remove('active'));
        navmenulink.classList.add('active');
      } else {
        navmenulink.classList.remove('active');
      }
    })
  }
  window.addEventListener('load', navmenuScrollspy);
  document.addEventListener('scroll', navmenuScrollspy);

})();

// --- Scroll-Triggered Section Animations ---
gsap.utils.toArray(".section-title").forEach((title) => {
  gsap.from(title, {
    opacity: 0,
    y: 50,
    duration: 1,
    scrollTrigger: { trigger: title, start: "top 80%" },
  });
});

// --- Portfolio Items: Circuit Glow Effect ---
document.querySelectorAll(".portfolio-item").forEach((item) => {
  item.addEventListener("mouseenter", () => {
    gsap.to(item, { boxShadow: "0 0 20px rgba(0, 173, 181, 0.5)", duration: 0.3 });
  });
  item.addEventListener("mouseleave", () => {
    gsap.to(item, { boxShadow: "0 0 0 rgba(0, 173, 181, 0)", duration: 0.3 });
  });

  gsap.from(item, {
    opacity: 0,
    scale: 0.9,
    duration: 0.8,
    scrollTrigger: { trigger: item, start: "top 85%" },
  });
});

// --- Skills: Interactive Tooltip ---
document.querySelectorAll(".skill-item").forEach((skill) => {
  skill.addEventListener("click", () => {
    const tooltip = document.createElement("div");
    tooltip.className = "skill-tooltip";
    tooltip.innerText = `Expertise in ${skill.querySelector("p").innerText.split(" ~")[0]}`;
    skill.appendChild(tooltip);
    gsap.fromTo(tooltip, { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: 0.5 });
    setTimeout(() => {
      gsap.to(tooltip, { opacity: 0, duration: 0.5, onComplete: () => tooltip.remove() });
    }, 2000);
  });
});

// --- Stats: Counter Animation ---
gsap.utils.toArray(".stats-item .purecounter").forEach((counter) => {
  gsap.from(counter, {
    innerText: 0,
    duration: 2,
    ease: "power1.out",
    snap: { innerText: 1 },
    scrollTrigger: { trigger: counter, start: "top 90%" },
    onUpdate: function () {
      counter.innerText = Math.ceil(this.targets()[0].innerText);
    },
  });
});

// --- Interactive Navigation ---
document.querySelectorAll(".navmenu a").forEach((link) => {
  link.addEventListener("mouseenter", () => {
    gsap.to(link, { color: "#00ADB5", x: 5, duration: 0.3 });
  });
  link.addEventListener("mouseleave", () => {
    gsap.to(link, { color: "#D3D3D3", x: 0, duration: 0.3 });
  });
});


// Highlight Ongoing Project
const ongoingItem = document.querySelector(".portfolio-item.ongoing");
if (ongoingItem) {
  gsap.to(ongoingItem, {
    scale: 1.02,
    duration: 1.5,
    repeat: -1,
    yoyo: true,
    ease: "sine.inOut",
  });

  ongoingItem.addEventListener("mouseenter", () => {
    gsap.to(ongoingItem, {
      boxShadow: "0 0 30px rgba(0, 173, 181, 0.7)",
      scale: 1.05,
      duration: 0.3,
      overwrite: true,
    });
  });
  ongoingItem.addEventListener("mouseleave", () => {
    gsap.to(ongoingItem, {
      boxShadow: "0 0 15px rgba(0, 173, 181, 0.3)",
      scale: 1,
      duration: 0.3,
    });
  });
}
// Hero Image Caption Interactivity
const heroImageWrapper = document.querySelector(".hero-image-wrapper");
const imageCaption = document.querySelector(".image-caption");

// Desktop: Show on hover (handled by CSS)
// Mobile: Toggle on click
let isCaptionVisible = false;

heroImageWrapper.addEventListener("click", (e) => {
  if (window.innerWidth <= 768) { // Mobile breakpoint
    isCaptionVisible = !isCaptionVisible;
    gsap.to(imageCaption, {
      opacity: isCaptionVisible ? 1 : 0,
      y: isCaptionVisible ? 0 : 10,
      duration: 0.3,
      ease: "power2.out",
    });
    e.preventDefault(); // Prevent unintended clicks
  }
});

// Optional: Fade in caption with image
gsap.from(".image-caption", {
  opacity: 0,
  y: 20,
  duration: 1,
  delay: 1.5, // Sync with hero text animation
  ease: "power3.out",
});


document.querySelector(".caption-toggle").addEventListener("click", () => {
  isCaptionVisible = !isCaptionVisible;
  gsap.to(imageCaption, {
    opacity: isCaptionVisible ? 1 : 0,
    y: isCaptionVisible ? 0 : 10,
    duration: 0.3,
  });
});

// Initialize AOS
AOS.init({
  duration: 1000,
  once: true,
});

// Register GSAP ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

// Particles.js for Hero
particlesJS("hero", {
  particles: {
    number: { value: 80, density: { enable: true, value_area: 800 } },
    color: { value: "#00ADB5" },
    shape: { type: "circle" },
    opacity: { value: 0.5, random: true },
    size: { value: 3, random: true },
    line_linked: { enable: true, distance: 150, color: "#00ADB5", opacity: 0.4, width: 1 },
    move: { enable: true, speed: 2, direction: "none", random: false, straight: false }
  },
  interactivity: {
    detect_on: "canvas",
    events: { onhover: { enable: true, mode: "repulse" }, onclick: { enable: true, mode: "push" } },
    modes: { repulse: { distance: 100, duration: 0.4 }, push: { particles_nb: 4 } }
  },
  retina_detect: true
});

// Hero Text Animation
gsap.from(".hero h2", { opacity: 0, y: 50, duration: 1.5, ease: "power3.out" });
gsap.from(".hero p", { opacity: 0, y: 30, duration: 1.5, delay: 0.5, ease: "power3.out" });
gsap.from(".hero .btn", { opacity: 0, scale: 0.8, duration: 1, delay: 1, ease: "back.out(1.7)" });

// Circuit Caption Animation
gsap.from(".circuit-caption", {
  opacity: 0,
  y: 20,
  duration: 1,
  delay: 1.5,
  ease: "power3.out",
});

// Three.js Setup (your existing init3D function can remain)
function init3D() {
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
  const renderer = new THREE.WebGLRenderer({ alpha: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.querySelector("#three-js-container").appendChild(renderer.domElement);

  const geometry = new THREE.PlaneGeometry(5, 3);
  const textureLoader = new THREE.TextureLoader();
  const texture = textureLoader.load("assets/img/portfolio/ithaca_rev2.png");
  const material = new THREE.MeshBasicMaterial({ map: texture, side: THREE.DoubleSide, transparent: true, opacity: 0.5 });
  const circuitBoard = new THREE.Mesh(geometry, material);
  scene.add(circuitBoard);

  camera.position.z = 5;
  scene.add(new THREE.AmbientLight(0xFFFFFF, 0.5));

  function animate() {
    requestAnimationFrame(animate);
    circuitBoard.rotation.x += 0.005;
    circuitBoard.rotation.y += 0.005;
    renderer.render(scene, camera);
  }
  animate();

  window.addEventListener("resize", () => {
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
  });
}
init3D();