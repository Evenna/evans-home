// mount.js — slide mounting + nav + keyboard
(function () {
  const deck = document.getElementById('deck');
  const navEl = document.getElementById('nav');
  const ctrEl = document.getElementById('ctr');
  let current = 0;

  // Build slides
  SLIDES.forEach((s, i) => {
    const el = document.createElement('section');
    el.className = 'slide';
    el.id = 'slide-' + i;
    s.render(el);
    deck.appendChild(el);

    // Nav dot
    const dot = document.createElement('div');
    dot.className = 'dot' + (i === 0 ? ' active' : '');
    dot.title = s.title;
    dot.addEventListener('click', () => goTo(i));
    navEl.appendChild(dot);
  });

  function updateNav(idx) {
    current = idx;
    document.querySelectorAll('.dot').forEach((d, i) => {
      d.classList.toggle('active', i === idx);
    });
    ctrEl.textContent = String(idx + 1).padStart(2, '0') + ' / ' + String(SLIDES.length).padStart(2, '0');
  }

  function goTo(idx) {
    const target = document.getElementById('slide-' + idx);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
      updateNav(idx);
    }
  }

  // IntersectionObserver for scroll detection
  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting && e.intersectionRatio >= 0.5) {
        const idx = parseInt(e.target.id.replace('slide-', ''));
        updateNav(idx);
      }
    });
  }, { threshold: 0.5 });

  document.querySelectorAll('.slide').forEach(s => io.observe(s));

  // Keyboard
  document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowDown' || e.key === 'ArrowRight' || e.key === ' ' || e.key === 'PageDown') {
      e.preventDefault();
      goTo(Math.min(current + 1, SLIDES.length - 1));
    } else if (e.key === 'ArrowUp' || e.key === 'ArrowLeft' || e.key === 'PageUp') {
      e.preventDefault();
      goTo(Math.max(current - 1, 0));
    } else if (e.key === 'Home') {
      e.preventDefault(); goTo(0);
    } else if (e.key === 'End') {
      e.preventDefault(); goTo(SLIDES.length - 1);
    }
  });

  // Touch swipe
  let touchY = null;
  document.addEventListener('touchstart', e => { touchY = e.touches[0].clientY; }, { passive: true });
  document.addEventListener('touchend', e => {
    if (touchY === null) return;
    const dy = touchY - e.changedTouches[0].clientY;
    if (Math.abs(dy) > 40) goTo(dy > 0 ? Math.min(current + 1, SLIDES.length - 1) : Math.max(current - 1, 0));
    touchY = null;
  }, { passive: true });

  updateNav(0);
})();
