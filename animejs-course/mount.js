(function () {
  const deck = document.getElementById('deck');
  const navEl = document.getElementById('nav');
  const counterEl = document.getElementById('counter');
  const progressEl = document.getElementById('progress');
  let current = 0;

  // Build slides
  SLIDES.forEach((slide, i) => {
    const el = document.createElement('section');
    el.className = 'slide';
    el.id = 'slide-' + i;
    slide.render(el);
    deck.appendChild(el);

    // Nav dot
    const dot = document.createElement('div');
    dot.className = 'dot' + (i === 0 ? ' active' : '');
    dot.title = slide.title;
    dot.addEventListener('click', () => goTo(i));
    navEl.appendChild(dot);
  });

  function updateUI(idx) {
    current = idx;
    // dots
    document.querySelectorAll('#nav .dot').forEach((d, i) =>
      d.classList.toggle('active', i === idx));
    // counter
    const pad = n => String(n).padStart(2, '0');
    counterEl.textContent = pad(idx + 1) + ' / ' + pad(SLIDES.length);
    // progress bar
    const pct = SLIDES.length > 1
      ? (idx / (SLIDES.length - 1)) * 100 : 0;
    progressEl.style.width = pct + '%';
  }

  function goTo(idx) {
    const target = document.getElementById('slide-' + idx);
    if (target) target.scrollIntoView({ behavior: 'smooth' });
  }

  // IntersectionObserver
  const io = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting && e.intersectionRatio >= 0.5) {
        const idx = parseInt(e.target.id.replace('slide-', ''), 10);
        updateUI(idx);
      }
    });
  }, { threshold: 0.5 });

  document.querySelectorAll('.slide').forEach(s => io.observe(s));

  // Keyboard nav
  document.addEventListener('keydown', e => {
    if (e.key === 'ArrowDown' || e.key === ' ' || e.key === 'PageDown') {
      e.preventDefault();
      goTo(Math.min(current + 1, SLIDES.length - 1));
    }
    if (e.key === 'ArrowUp' || e.key === 'PageUp') {
      e.preventDefault();
      goTo(Math.max(current - 1, 0));
    }
    if (e.key === 'Home') goTo(0);
    if (e.key === 'End') goTo(SLIDES.length - 1);
  });

  // Touch swipe
  let touchStartY = 0;
  document.addEventListener('touchstart', e => {
    touchStartY = e.touches[0].clientY;
  }, { passive: true });
  document.addEventListener('touchend', e => {
    const diff = touchStartY - e.changedTouches[0].clientY;
    if (Math.abs(diff) > 50) {
      goTo(diff > 0
        ? Math.min(current + 1, SLIDES.length - 1)
        : Math.max(current - 1, 0));
    }
  }, { passive: true });

  // Initial
  updateUI(0);
})();
