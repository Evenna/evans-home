// ══════════════════════════════════════════
// app.js — tutorial navigation logic
// ══════════════════════════════════════════

(function () {
  const TOTAL = window.SLIDES.length; // auto from slides.js
  let cur = 0;

  const slidesEl = document.getElementById('tut-slides');
  const dotsEl   = document.getElementById('tut-dots');
  const barEl    = document.getElementById('tut-progress-bar');
  const labelEl  = document.getElementById('tut-step-label');
  const btnPrev  = document.getElementById('btn-prev');
  const btnNext  = document.getElementById('btn-next');

  // ── Build slides ────────────────────────
  window.SLIDES.forEach((s, i) => {
    const div = document.createElement('div');
    div.className = 'tut-slide';
    div.innerHTML = s.html;
    slidesEl.appendChild(div);
  });

  // ── Build dots ──────────────────────────
  window.SLIDES.forEach((_, i) => {
    const d = document.createElement('div');
    d.className = 'tut-dot';
    d.onclick = () => goTo(i);
    dotsEl.appendChild(d);
  });

  // ── Go to slide ─────────────────────────
  function goTo(n) {
    cur = Math.max(0, Math.min(TOTAL - 1, n));

    slidesEl.style.transform = `translateX(-${cur * 100}%)`;
    barEl.style.width = `${((cur + 1) / TOTAL) * 100}%`;
    labelEl.textContent = `${cur + 1} / ${TOTAL}`;

    // reset scroll of current slide
    slidesEl.children[cur].scrollTop = 0;

    // update dots
    Array.from(dotsEl.children).forEach((d, i) => {
      d.classList.toggle('on', i === cur);
    });

    btnPrev.disabled = cur === 0;
    btnNext.disabled = cur === TOTAL - 1;
  }

  window.tutPrev = () => goTo(cur - 1);
  window.tutNext = () => goTo(cur + 1);

  // ── Keyboard nav ────────────────────────
  document.addEventListener('keydown', e => {
    if (e.key === 'ArrowRight' || e.key === 'ArrowDown') tutNext();
    if (e.key === 'ArrowLeft'  || e.key === 'ArrowUp')  tutPrev();
  });

  // ── Touch / swipe on panel ──────────────
  let touchStartX = null;
  const panel = document.getElementById('tutorial-panel');
  panel.addEventListener('touchstart', e => {
    touchStartX = e.touches[0].clientX;
  }, { passive: true });
  panel.addEventListener('touchend', e => {
    if (touchStartX === null) return;
    const dx = e.changedTouches[0].clientX - touchStartX;
    if (dx < -40) tutNext();
    if (dx >  40) tutPrev();
    touchStartX = null;
  }, { passive: true });

  // ── Resize handle drag ───────────────────
  const handle  = document.getElementById('resize-handle');
  const simPanel = document.getElementById('sim-panel');
  const tutPanel = document.getElementById('tutorial-panel');

  let dragging = false;
  handle.addEventListener('mousedown', e => {
    dragging = true;
    document.body.style.cursor = 'ew-resize';
    document.body.style.userSelect = 'none';
    e.preventDefault();
  });
  document.addEventListener('mousemove', e => {
    if (!dragging) return;
    const vw = window.innerWidth;
    const panelW = Math.max(300, Math.min(600, vw - e.clientX));
    const simW = vw - panelW;
    simPanel.style.width = simW + 'px';
    tutPanel.style.width = panelW + 'px';
    handle.style.left = simW + 'px';
  });
  document.addEventListener('mouseup', () => {
    if (!dragging) return;
    dragging = false;
    document.body.style.cursor = '';
    document.body.style.userSelect = '';
  });

  // ── Init ────────────────────────────────
  goTo(0);

})();
