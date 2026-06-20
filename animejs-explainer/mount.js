// mount.js — navigation logic
(function() {
  let current = 0;
  const total = window.CHAPTERS.length;
  const renderMap = {
    renderCh1, renderCh2, renderCh3,
    renderCh4, renderCh5, renderCh6,
    renderCh7, renderCh8, renderCh9,
    renderCh10, renderCh11, renderCh12
  };

  const wrap     = document.getElementById('chapter-wrap');
  const tabs     = document.querySelectorAll('.tab');
  const btnPrev  = document.getElementById('btn-prev');
  const btnNext  = document.getElementById('btn-next');
  const label    = document.getElementById('chapter-label');
  const progressFill = document.getElementById('progress-fill');

  // iframe loading overlay
  const iframe  = document.getElementById('mirror-frame');
  const loading = document.getElementById('stage-loading');
  if (iframe && loading) {
    iframe.addEventListener('load', () => {
      loading.classList.add('hidden');
      setTimeout(() => { loading.style.display = 'none'; }, 700);
    });
  }

  function stopCanvasAnims() {
    const canvases = wrap.querySelectorAll('canvas');
    canvases.forEach(cv => { if (typeof cv._stopAnim === 'function') cv._stopAnim(); });
  }

  function goTo(i) {
    stopCanvasAnims();
    current = Math.max(0, Math.min(total - 1, i));

    // Render right panel
    const ch = window.CHAPTERS[current];
    const fn = renderMap[ch.render];
    if (fn) fn(wrap);
    wrap.scrollTop = 0;

    // Update tabs
    tabs.forEach((tab, idx) => tab.classList.toggle('active', idx === current));

    // Update nav buttons
    btnPrev.classList.toggle('disabled', current === 0);
    btnNext.classList.toggle('disabled', current === total - 1);

    // Update label & progress
    label.textContent = `${current + 1} / ${total}`;
    progressFill.style.width = `${((current + 1) / total) * 100}%`;
  }

  tabs.forEach((tab, idx) => tab.addEventListener('click', () => goTo(idx)));
  btnPrev.addEventListener('click', () => { if (current > 0) goTo(current - 1); });
  btnNext.addEventListener('click', () => { if (current < total - 1) goTo(current + 1); });
  document.addEventListener('keydown', e => {
    if (e.key === 'ArrowRight' || e.key === 'ArrowDown') goTo(current + 1);
    if (e.key === 'ArrowLeft'  || e.key === 'ArrowUp')   goTo(current - 1);
  });

  goTo(0);
})();
