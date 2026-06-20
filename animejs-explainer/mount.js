// mount.js — 导航、tab 渲染、键盘交互

(function () {
  let current = 0;
  const N = window.CHAPTERS.length;

  // Render function map
  const renderMap = {};
  window.CHAPTERS.forEach(ch => {
    renderMap[ch.id] = window[ch.renderFn];
  });

  function buildTabs() {
    const tabs = document.getElementById('tabs');
    tabs.innerHTML = '';
    window.CHAPTERS.forEach((ch, i) => {
      const t = document.createElement('div');
      t.className = 'tab' + (i === 0 ? ' active' : '');
      t.textContent = `${i + 1}`;
      t.title = ch.title;
      t.onclick = () => goTo(i);
      tabs.appendChild(t);
    });
  }

  function goTo(i) {
    if (i < 0 || i >= N) return;
    current = i;
    update();
  }

  function goRel(d) { goTo(current + d); }
  window.goRel = goRel;

  function update() {
    const ch = window.CHAPTERS[current];

    // tabs
    document.querySelectorAll('.tab').forEach((t, i) => {
      t.classList.toggle('active', i === current);
    });

    // progress
    document.getElementById('progress-fill').style.width = `${((current + 1) / N) * 100}%`;

    // header
    document.getElementById('ch-num').textContent = ch.num;
    document.getElementById('ch-title').textContent = ch.title;
    document.getElementById('ch-sub').textContent = ch.sub;

    // content
    const content = document.getElementById('content');
    content.innerHTML = '';
    content.scrollTop = 0;
    const fn = renderMap[ch.id];
    if (fn) fn(content);

    // nav buttons
    document.getElementById('btn-prev').disabled = current === 0;
    document.getElementById('btn-next').disabled = current === N - 1;
    document.getElementById('ch-counter').textContent = `${current + 1} / ${N}`;

    // scroll tab into view
    const activeTab = document.querySelectorAll('.tab')[current];
    if (activeTab) activeTab.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
  }

  // Keyboard navigation
  document.addEventListener('keydown', e => {
    if (e.key === 'ArrowRight' || e.key === 'ArrowDown') goRel(1);
    if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') goRel(-1);
  });

  // Copy prompt helper (chapter 8)
  window.copyPrompt = function (i) {
    const el = document.getElementById(`pb${i}`);
    const btn = document.getElementById(`cb${i}`);
    if (!el || !btn) return;
    navigator.clipboard.writeText(el.textContent).then(() => {
      btn.textContent = '✓ 已复制';
      btn.classList.add('copied');
      setTimeout(() => { btn.textContent = '复制这条提示词'; btn.classList.remove('copied'); }, 2000);
    });
  };

  // Copy trap helper (chapter 9)
  window.copyTrap = function (i) {
    const el = document.getElementById(`tp${i}`);
    const btn = document.getElementById(`tc${i}`);
    if (!el || !btn) return;
    navigator.clipboard.writeText(el.textContent).then(() => {
      btn.textContent = '✓ 已复制';
      btn.classList.add('copied');
      setTimeout(() => { btn.textContent = '复制修复提示词'; btn.classList.remove('copied'); }, 2000);
    });
  };

  // Init
  buildTabs();
  update();
})();
