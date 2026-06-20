/* course-mount.js — builds nav, renders chapters, wires navigation */
(function () {
  const navEl     = document.getElementById('chapter-nav');
  const scroll    = document.getElementById('content-scroll');
  const progress  = document.getElementById('ch-progress');
  const counter   = document.getElementById('ch-counter');
  const btnPrev   = document.getElementById('btn-prev');
  const btnNext   = document.getElementById('btn-next');
  const highlight = document.getElementById('demo-highlight');
  let current = 0;
  const total = CHAPTERS.length;

  // Build nav tabs
  CHAPTERS.forEach((ch, i) => {
    const tab = document.createElement('div');
    tab.className = 'ch-tab' + (i === 0 ? ' active' : '');
    tab.textContent = ch.tab;
    tab.addEventListener('click', () => goTo(i));
    navEl.appendChild(tab);
  });

  // Show a chapter
  function goTo(idx) {
    current = Math.max(0, Math.min(idx, total - 1));
    const ch = CHAPTERS[current];

    // Update tabs
    navEl.querySelectorAll('.ch-tab').forEach((t, i) => t.classList.toggle('active', i === current));

    // Progress bar
    progress.style.width = ((current + 1) / total * 100) + '%';

    // Counter
    counter.textContent = (current + 1) + ' / ' + total;

    // Buttons
    btnPrev.disabled = current === 0;
    btnNext.disabled = current === total - 1;

    // Content
    scroll.scrollTop = 0;
    scroll.innerHTML = '';

    // Header
    const header = document.createElement('div');
    header.style.marginBottom = '20px';
    header.innerHTML = `
      <div class="ch-eyebrow">${String(current + 1).padStart(2,'0')} / ${String(total).padStart(2,'0')} · ${ch.tab}</div>
      <div class="ch-title">${ch.title}<br><em>${ch.titleEm}</em></div>
      <div class="ch-lead">${ch.lead}</div>`;
    scroll.appendChild(header);

    // Render content section
    const body = document.createElement('div');
    const renderer = window.RENDERERS && window.RENDERERS[ch.content];
    if (renderer) renderer(body);
    else body.innerHTML = `<p style="color:var(--txt3)">内容准备中…</p>`;
    scroll.appendChild(body);

    // Demo pane hint
    if (highlight) {
      highlight.textContent = ch.demoHint || '';
      highlight.classList.add('show');
      clearTimeout(highlight._t);
      highlight._t = setTimeout(() => highlight.classList.remove('show'), 4000);
    }

    // Sync nav tab into view
    const activeTab = navEl.querySelectorAll('.ch-tab')[current];
    if (activeTab) activeTab.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
  }

  btnPrev.addEventListener('click', () => goTo(current - 1));
  btnNext.addEventListener('click', () => goTo(current + 1));

  document.addEventListener('keydown', e => {
    if (e.key === 'ArrowRight' || e.key === 'ArrowDown') goTo(current + 1);
    if (e.key === 'ArrowLeft'  || e.key === 'ArrowUp')   goTo(current - 1);
  });

  goTo(0);
})();
