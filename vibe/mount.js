(function () {
  const deck = document.getElementById('deck');
  const nav = document.getElementById('nav');
  const counter = document.getElementById('counter');
  const progress = document.getElementById('progress');
  let current = 0;

  // Build slides
  SLIDES.forEach(function (s, i) {
    const el = document.createElement('section');
    el.className = 'slide';
    el.id = 'slide-' + i;
    s.render(el);
    deck.appendChild(el);

    // nav dot
    const dot = document.createElement('div');
    dot.className = 'dot' + (i === 0 ? ' active' : '');
    dot.title = s.id;
    dot.addEventListener('click', function () { goTo(i); });
    nav.appendChild(dot);
  });

  function updateUI(idx) {
    current = idx;
    const dots = nav.querySelectorAll('.dot');
    dots.forEach(function (d, i) {
      d.classList.toggle('active', i === idx);
    });
    const n = SLIDES.length;
    counter.textContent = String(idx + 1).padStart(2, '0') + ' / ' + String(n).padStart(2, '0');
    progress.style.width = ((idx / (n - 1)) * 100) + '%';
  }

  function goTo(idx) {
    const slides = deck.querySelectorAll('.slide');
    if (slides[idx]) {
      slides[idx].scrollIntoView({ behavior: 'smooth' });
    }
  }

  // IntersectionObserver
  const slides = deck.querySelectorAll('.slide');
  const io = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      if (e.isIntersecting && e.intersectionRatio >= 0.5) {
        const idx = Array.from(slides).indexOf(e.target);
        if (idx !== -1) updateUI(idx);
      }
    });
  }, { threshold: 0.5 });
  slides.forEach(function (s) { io.observe(s); });

  // Keyboard nav
  document.addEventListener('keydown', function (e) {
    if (e.key === 'ArrowDown' || e.key === ' ' || e.key === 'PageDown') {
      e.preventDefault();
      goTo(Math.min(current + 1, SLIDES.length - 1));
    }
    if (e.key === 'ArrowUp' || e.key === 'PageUp') {
      e.preventDefault();
      goTo(Math.max(current - 1, 0));
    }
    if (e.key === 'Home') { e.preventDefault(); goTo(0); }
    if (e.key === 'End') { e.preventDefault(); goTo(SLIDES.length - 1); }
  });

  // Touch swipe
  var touchY = 0;
  document.addEventListener('touchstart', function (e) {
    touchY = e.touches[0].clientY;
  }, { passive: true });
  document.addEventListener('touchend', function (e) {
    var dy = touchY - e.changedTouches[0].clientY;
    if (Math.abs(dy) > 40) {
      if (dy > 0) goTo(Math.min(current + 1, SLIDES.length - 1));
      else goTo(Math.max(current - 1, 0));
    }
  }, { passive: true });

  updateUI(0);
})();
