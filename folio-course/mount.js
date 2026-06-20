/* ─── mount.js ─── */
(function () {
  const deck      = document.getElementById('deck');
  const navEl     = document.getElementById('nav');
  const counterEl = document.getElementById('counter');
  const progressEl= document.getElementById('progress');
  let current = 0;
  const total  = SLIDES.length;

  // Build slides
  SLIDES.forEach((slide, i) => {
    const section = document.createElement('section');
    section.className = 'slide';
    section.id = section.id || ('slide-' + i);
    slide.render(section);
    deck.appendChild(section);

    // Nav dot
    const dot = document.createElement('div');
    dot.className = 'dot' + (i === 0 ? ' active' : '');
    dot.title = slide.id || ('Slide ' + (i + 1));
    dot.addEventListener('click', () => goTo(i));
    navEl.appendChild(dot);
  });

  // Update UI for current slide
  function updateUI(idx) {
    current = idx;
    const pad = n => String(n).padStart(2, '0');
    counterEl.textContent = pad(idx + 1) + ' / ' + pad(total);
    progressEl.style.width = ((idx + 1) / total * 100) + '%';
    navEl.querySelectorAll('.dot').forEach((d, i) => d.classList.toggle('active', i === idx));
    deck.querySelectorAll('.slide').forEach((s, i) => s.classList.toggle('visible', i === idx));
  }

  // Scroll to slide
  function goTo(idx) {
    const sections = deck.querySelectorAll('.slide');
    if (sections[idx]) {
      sections[idx].scrollIntoView({ behavior: 'smooth' });
    }
  }

  // IntersectionObserver
  const observer = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting && e.intersectionRatio >= 0.5) {
        const idx = Array.from(deck.querySelectorAll('.slide')).indexOf(e.target);
        if (idx !== -1) updateUI(idx);
      }
    });
  }, { threshold: 0.5 });

  deck.querySelectorAll('.slide').forEach(s => observer.observe(s));

  // Keyboard nav
  document.addEventListener('keydown', e => {
    if (e.key === 'ArrowDown' || e.key === ' ' || e.key === 'PageDown') {
      e.preventDefault();
      goTo(Math.min(current + 1, total - 1));
    }
    if (e.key === 'ArrowUp' || e.key === 'PageUp') {
      e.preventDefault();
      goTo(Math.max(current - 1, 0));
    }
    if (e.key === 'Home') { e.preventDefault(); goTo(0); }
    if (e.key === 'End')  { e.preventDefault(); goTo(total - 1); }
  });

  // Touch swipe
  let touchY = 0;
  document.addEventListener('touchstart', e => { touchY = e.touches[0].clientY; }, { passive: true });
  document.addEventListener('touchend', e => {
    const dy = touchY - e.changedTouches[0].clientY;
    if (Math.abs(dy) > 40) {
      if (dy > 0) goTo(Math.min(current + 1, total - 1));
      else        goTo(Math.max(current - 1, 0));
    }
  }, { passive: true });

  // Init
  updateUI(0);
})();
