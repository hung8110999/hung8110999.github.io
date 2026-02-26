// ===================================
// Main JavaScript — hung.github.io
// ===================================

document.addEventListener('DOMContentLoaded', () => {
  initNavbar();
  initScrollAnimations();
  initTopicToggles();
  setActiveNav();
});

// ---------- Navbar ----------
function initNavbar() {
  const navbar = document.querySelector('.navbar');
  const toggle = document.querySelector('.nav-toggle');
  const navLinks = document.querySelector('.nav-links');

  // Scroll effect
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });

  // Mobile toggle
  if (toggle && navLinks) {
    toggle.addEventListener('click', () => {
      toggle.classList.toggle('open');
      navLinks.classList.toggle('open');
    });

    // Close menu on link click
    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        toggle.classList.remove('open');
        navLinks.classList.remove('open');
      });
    });
  }
}

// ---------- Active Nav ----------
function setActiveNav() {
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  const studyPages = ['study.html', 'math.html', 'english.html', 'coding.html'];

  document.querySelectorAll('.nav-links a').forEach(link => {
    const href = link.getAttribute('href');
    if (!href) return;

    link.classList.remove('active');

    if (href === currentPage) {
      link.classList.add('active');
    }

    // Highlight Study in main nav if on any study sub-page
    if (studyPages.includes(currentPage) && href === 'study.html') {
      link.classList.add('active');
    }
  });

  // Highlight dropdown items
  document.querySelectorAll('.dropdown-menu a').forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPage) {
      link.classList.add('active');
    }
  });
}

// ---------- Scroll Animations ----------
function initScrollAnimations() {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  // Observe all animatable elements
  const selectors = '.animate-on-scroll, .timeline-item, .topic-card';
  document.querySelectorAll(selectors).forEach(el => {
    observer.observe(el);
  });
}

// ---------- Topic Toggles ----------
function initTopicToggles() {
  document.querySelectorAll('.topic-header').forEach(header => {
    header.addEventListener('click', () => {
      const card = header.closest('.topic-card');
      // Close others
      document.querySelectorAll('.topic-card.open').forEach(openCard => {
        if (openCard !== card) openCard.classList.remove('open');
      });
      card.classList.toggle('open');
    });
  });
}
