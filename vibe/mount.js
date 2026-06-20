(function () {
  const deck = document.getElementById('deck');
  const navEl = document.getElementById('nav');
  const prog  = document.getElementById('prog');
  const ctr   = document.getElementById('ctr');
  const total = window.SLIDES.length;
  let cur = 0;

  // Build DOM
  window.SLIDES.forEach(function (s) {
    const el = document.createElement('div');
    el.className = 'slide';
    el.id = 'sl-' + s.id;
    deck.appendChild(el);
    s.fn(el);
  });

  // Nav dots
  window.SLIDES.forEach(function (_, i) {
    const d = document.createElement('div');
    d.className = 'd';
    d.addEventListener('click', function () { go(i); });
    navEl.appendChild(d);
  });

  function go(i) {
    const slides = document.querySelectorAll('.slide');
    if (slides[i]) slides[i].scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  function ui(i) {
    document.querySelectorAll('#nav .d').forEach(function (d, j) {
      d.classList.toggle('on', j === i);
    });
    prog.style.width = ((i + 1) / total * 100) + '%';
    ctr.textContent = String(i + 1).padStart(2, '0') + ' / ' + String(total).padStart(2, '0');
  }

  // IntersectionObserver
  const obs = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      if (e.intersectionRatio >= 0.5) {
        const idx = Array.from(document.querySelectorAll('.slide')).indexOf(e.target);
        if (idx >= 0) { cur = idx; ui(cur); }
      }
    });
  }, { threshold: [0, 0.5, 1] });
  document.querySelectorAll('.slide').forEach(function (el) { obs.observe(el); });

  // Keyboard
  document.addEventListener('keydown', function (e) {
    if (e.key === 'ArrowDown' || e.key === ' ' || e.key === 'PageDown') {
      e.preventDefault();
      if (cur < total - 1) { cur++; go(cur); }
    } else if (e.key === 'ArrowUp' || e.key === 'PageUp') {
      e.preventDefault();
      if (cur > 0) { cur--; go(cur); }
    }
  });

  // Touch
  let ty = null;
  document.addEventListener('touchstart', function (e) { ty = e.changedTouches[0].clientY; }, { passive: true });
  document.addEventListener('touchend', function (e) {
    if (ty === null) return;
    const dy = ty - e.changedTouches[0].clientY;
    if (Math.abs(dy) > 50) {
      if (dy > 0 && cur < total - 1) { cur++; go(cur); }
      else if (dy < 0 && cur > 0) { cur--; go(cur); }
    }
    ty = null;
  }, { passive: true });

  ui(0);
})();
