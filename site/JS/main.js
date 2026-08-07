(function () {
  var navToggle = document.getElementById('navToggle');
  var navbar = document.getElementById('navbar');

  if (navToggle && navbar) {
    navToggle.addEventListener('click', function () {
      var isOpen = navbar.classList.toggle('is-open');
      navToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    });

    navbar.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        navbar.classList.remove('is-open');
        navToggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  var dcBtn = document.getElementById('dcBtn');
  var dcModal = document.getElementById('dcModal');
  var dcClose = document.getElementById('dcClose');

  if (dcBtn && dcModal) {
    dcBtn.addEventListener('click', function (e) {
      e.preventDefault();
      dcModal.classList.add('is-open');
    });

    dcClose.addEventListener('click', function () {
      dcModal.classList.remove('is-open');
    });

    dcModal.addEventListener('click', function (e) {
      if (e.target === dcModal) {
        dcModal.classList.remove('is-open');
      }
    });

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') {
        dcModal.classList.remove('is-open');
      }
    });
  }

  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var revealEls = document.querySelectorAll('[data-reveal]');

  if (revealEls.length && !reduceMotion && 'IntersectionObserver' in window) {
    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            var delay = entry.target.getAttribute('data-reveal-delay') || 0;
            entry.target.style.animationDelay = delay + 'ms';
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.2 }
    );

    revealEls.forEach(function (el) {
      observer.observe(el);
    });
  } else {
    revealEls.forEach(function (el) {
      el.classList.add('is-visible');
    });
  }
})();
