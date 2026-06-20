// mount.js — navigation logic

(function() {
  let current = 0;
  const total = window.CHAPTERS.length;
  const renderMap = {
    renderCh1, renderCh2, renderCh3,
    renderCh4, renderCh5, renderCh6,
    renderCh7, renderCh8, renderCh9
  };

  const wrap = document.getElementById('chapter-wrap');
  const tabs = document.querySelectorAll('.tab');
  const btnPrev = document.getElementById('btn-prev');
  const btnNext = document.getElementById('btn-next');
  const label = document.getElementById('chapter-label');
  const progressFill = document.getElementById('progress-fill');

  // Stop any running canvas animations in the current chapter
  function stopCanvasAnims() {
    const canvases = wrap.querySelectorAll('canvas');
    canvases.forEach(cv => {
      if (typeof cv._stopAnim === 'function') cv._stopAnim();
    });
  }

  function goTo(i) {
    stopCanvasAnims();
    current = Math.max(0, Math.min(total - 1, i));

    // Render
    const ch = window.CHAPTERS[current];
    const fn = renderMap[ch.render];
    if (fn) fn(wrap);
    wrap.scrollTop = 0;

    // Update tabs
    tabs.forEach((tab, idx) => {
      tab.classList.toggle('active', idx === current);
    });

    // Update nav buttons
    btnPrev.classList.toggle('disabled', current === 0);
    btnNext.classList.toggle('disabled', current === total - 1);

    // Update label
    label.textContent = `${current + 1} / ${total}`;

    // Update progress bar
    progressFill.style.width = `${((current + 1) / total) * 100}%`;
  }

  // Tab clicks
  tabs.forEach((tab, idx) => {
    tab.addEventListener('click', () => goTo(idx));
  });

  // Nav buttons
  btnPrev.addEventListener('click', () => { if (current > 0) goTo(current - 1); });
  btnNext.addEventListener('click', () => { if (current < total - 1) goTo(current + 1); });

  // Keyboard
  document.addEventListener('keydown', e => {
    if (e.key === 'ArrowRight' || e.key === 'ArrowDown') goTo(current + 1);
    if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') goTo(current - 1);
  });

  // Init
  goTo(0);
})();
