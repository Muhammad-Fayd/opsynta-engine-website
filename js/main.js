(function () {
  'use strict';

  /* ---------------- Mobile nav toggle ---------------- */
  var toggle = document.getElementById('navToggle');
  var nav = document.getElementById('mainNav');

  if (toggle && nav) {
    toggle.addEventListener('click', function () {
      var open = nav.classList.toggle('open');
      toggle.setAttribute('aria-expanded', String(open));
    });

    nav.addEventListener('click', function (e) {
      if (e.target.closest('a')) {
        nav.classList.remove('open');
        toggle.setAttribute('aria-expanded', 'false');
      }
    });
  }

  /* ---------------- Sticky header shadow on scroll ---------------- */
  var header = document.querySelector('.site-header');
  if (header) {
    var onScroll = function () {
      if (window.scrollY > 8) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  /* ---------------- Scroll reveal ---------------- */
  var revealEls = document.querySelectorAll('.stat-card, .diag-card, .cap-card, .layer, .vert-card, .fieldnote-card, .flow-step, .sdk-code, .price-card, .res-step, .socratic-card, .capability-quicklist');

  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

    revealEls.forEach(function (el) {
      el.classList.add('reveal');
      io.observe(el);
    });
  } else {
    revealEls.forEach(function (el) {
      el.classList.add('reveal', 'visible');
    });
  }

  /* ---------------- Active nav link highlighting ---------------- */
  var sections = document.querySelectorAll('main section[id]');
  var navLinks = Array.prototype.slice.call(nav ? nav.querySelectorAll('a[href^="#"]') : []);

  if ('IntersectionObserver' in window && sections.length && navLinks.length) {
    var sectionIo = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        var id = entry.target.getAttribute('id');
        navLinks.forEach(function (link) {
          link.classList.toggle('active', link.getAttribute('href') === '#' + id);
        });
      });
    }, { rootMargin: '-45% 0px -50% 0px' });

    sections.forEach(function (s) { sectionIo.observe(s); });
  }
})();