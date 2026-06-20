// r1.js — Chapters 1, 2, 3

function renderCh1(wrap) {
  wrap.innerHTML = `
    <div class="ch-eyebrow">Chapter 01 — 体验优先</div>
    <h2 class="ch-title">先玩一遍，<em style="font-style:italic;color:var(--txt2)">不用懂</em></h2>
    <p class="ch-lead">
      左边就是 animejs.com 的官网。别急着看文字，先拖动、滚动、点击各个动效——感受一下这些动画带来的「感觉」。
    </p>

    <div class="analogy">
      <div class="analogy-icon">🎮</div>
      <p>你不需要会开车，就能感受出跑车和面包车的区别。<br>
      同样，你不需要会写代码，就能感受出<em>「有动画」和「没动画」</em>的区别。<br>
      这个课件的目标：让你理解那种区别从哪来，怎么用 AI 做出来。</p>
    </div>

    <div class="card">
      <div class="card-title"><span class="dot" style="background:var(--accent)"></span>你要注意的三件事</div>
      <div class="card-body">
        <p style="margin-bottom:10px">① <strong style="color:var(--txt)">速度节奏</strong>——动画不是匀速的，它会先快后慢或先慢后快</p>
        <p style="margin-bottom:10px">② <strong style="color:var(--txt)">先后顺序</strong>——多个元素不是同时动的，有时间差</p>
        <p>③ <strong style="color:var(--txt)">触发时机</strong>——滚动、hover、点击，不同操作触发不同动画</p>
      </div>
    </div>

    <div class="card">
      <div class="card-title"><span class="dot" style="background:var(--green)"></span>Anime.js 是什么</div>
      <div class="card-body">
        一个 <strong style="color:var(--txt)">JavaScript 动画库</strong>。你可以把它想成网页版的「幻灯片动画面板」——但比 PPT 的动画强 100 倍：
        精确到毫秒、能跟鼠标互动、能跟滚动触发、能同时控制几十个元素。
      </div>
    </div>

    <div style="text-align:center;margin-top:24px;">
      <p style="font-family:var(--mono);font-size:11px;color:var(--txt3)">探索完毕后 →</p>
      <p style="font-size:13px;color:var(--txt2);margin-top:6px">点右下角 <strong style="color:var(--txt)">→</strong> 进入第 2 章</p>
    </div>
  `;
}

function renderCh2(wrap) {
  wrap.innerHTML = `
    <div class="ch-eyebrow">Chapter 02 — 大局观</div>
    <h2 class="ch-title">它是什么</h2>
    <p class="ch-lead">
      理解 Anime.js 之前，先理解它在整个网页里扮演什么角色。
    </p>

    <div class="analogy">
      <div class="analogy-icon">🎬</div>
      <p>把网页想象成一部电影的拍摄现场：<br>
      <em>HTML</em> 是布景和演员（决定有什么）<br>
      <em>CSS</em> 是服装和化妆（决定长什么样）<br>
      <em>Anime.js</em> 是导演——喊「第3秒，演员A向右走；第5秒，灯光变暗」</p>
    </div>

    <canvas id="cv-arch" class="diagram" height="160"></canvas>
    <p class="diagram-caption">Anime.js 在技术栈中的位置</p>

    <div class="card">
      <div class="card-title"><span class="dot" style="background:var(--accent)"></span>Anime.js 能控制什么</div>
      <div class="card-body">
        <p style="margin-bottom:8px">• 任意 <strong style="color:var(--txt)">HTML 元素</strong>的位置、大小、颜色、透明度</p>
        <p style="margin-bottom:8px">• <strong style="color:var(--txt)">SVG 图形</strong>的路径、线条、变形</p>
        <p style="margin-bottom:8px">• CSS 变量、数字——几乎一切<strong style="color:var(--txt)">数值类的东西</strong></p>
        <p>本质上：给它一个<em style="color:var(--accent)">起点</em>、一个<em style="color:var(--accent)">终点</em>、一个<em style="color:var(--accent)">时长</em>，它负责算中间每一帧</p>
      </div>
    </div>

    <div class="tag-row">
      <span class="tag blue">轻量</span>
      <span class="tag blue">开源免费</span>
      <span class="tag green">纯 JS，无依赖</span>
      <span class="tag orange">CDN 一行引入</span>
      <span class="tag purple">V4 最新版</span>
    </div>
  `;

  // Draw architecture diagram
  requestAnimationFrame(() => {
    const cv = document.getElementById('cv-arch');
    if (!cv) return;
    cv.width = cv.parentElement.offsetWidth || 372;
    const ctx = cv.getContext('2d');
    const W = cv.width, H = cv.height;
    ctx.clearRect(0, 0, W, H);
    ctx.fillStyle = '#0d1015';
    ctx.fillRect(0, 0, W, H);

    const layers = [
      { label: 'HTML + CSS', sub: '结构与样式', color: '#30d158' },
      { label: 'Anime.js', sub: '动画控制器', color: '#4f8fff' },
      { label: '浏览器屏幕', sub: '用户看到的一切', color: '#bf5af2' },
    ];

    const bw = W - 48, bh = 36, gapY = 8;
    const totalH = layers.length * bh + (layers.length - 1) * gapY;
    let y0 = (H - totalH) / 2;

    layers.forEach((l, i) => {
      const y = y0 + i * (bh + gapY);
      // glow
      ctx.shadowColor = l.color;
      ctx.shadowBlur = 12;
      // box
      ctx.fillStyle = `rgba(${hexToRgb(l.color)},0.1)`;
      ctx.strokeStyle = `rgba(${hexToRgb(l.color)},0.4)`;
      ctx.lineWidth = 0.5;
      roundRect(ctx, 24, y, bw, bh, 8);
      ctx.fill(); ctx.stroke();
      ctx.shadowBlur = 0;

      // label
      ctx.fillStyle = l.color;
      ctx.font = `500 13px 'Space Grotesk',sans-serif`;
      ctx.textAlign = 'left';
      ctx.fillText(l.label, 40, y + bh / 2 + 1);

      // sub
      ctx.fillStyle = 'rgba(255,255,255,0.35)';
      ctx.font = `10px 'JetBrains Mono',monospace`;
      ctx.textAlign = 'right';
      ctx.fillText(l.sub, W - 40, y + bh / 2 + 1);
    });

    // arrows between layers
    ctx.strokeStyle = 'rgba(255,255,255,0.12)';
    ctx.lineWidth = 1;
    ctx.setLineDash([3, 3]);
    for (let i = 0; i < layers.length - 1; i++) {
      const y1 = y0 + i * (bh + gapY) + bh;
      const y2 = y1 + gapY;
      const cx = W / 2;
      ctx.beginPath(); ctx.moveTo(cx, y1 + 2); ctx.lineTo(cx, y2 - 2); ctx.stroke();
      // arrowhead
      ctx.setLineDash([]);
      ctx.fillStyle = 'rgba(255,255,255,0.2)';
      ctx.beginPath();
      ctx.moveTo(cx, y2 + 1);
      ctx.lineTo(cx - 4, y2 - 4);
      ctx.lineTo(cx + 4, y2 - 4);
      ctx.closePath(); ctx.fill();
      ctx.setLineDash([3, 3]);
    }
    ctx.setLineDash([]);
  });
}

function renderCh3(wrap) {
  const modules = [
    { name: 'Animation', icon: '▶', color: 'var(--accent)', analogy: '跑步计划执行者', desc: '你设定起点/终点/时长，它算每帧位置' },
    { name: 'Timeline', icon: '♩', color: 'var(--green)', analogy: '乐谱', desc: '钢琴第0秒进，小提琴第3秒进——多个动画按剧本走' },
    { name: 'Stagger', icon: '≋', color: 'var(--orange)', analogy: '骨牌', desc: '推第一张，后面依次倒下，你只设间隔规则' },
    { name: 'Scroll Observer', icon: '☲', color: 'var(--purple)', analogy: '路灯感应器', desc: '元素进入视野就触发，离开就暂停或反转' },
    { name: 'Draggable', icon: '✥', color: 'var(--gold)', analogy: '磁铁', desc: '拖动后松手弹回固定点，带惯性，可以甩飞' },
    { name: 'SVG 工具', icon: '✏', color: '#ff6b6b', analogy: '画笔在纸上留痕', desc: '线条被「画出来」而不是直接出现，形状可以变形' },
  ];

  wrap.innerHTML = `
    <div class="ch-eyebrow">Chapter 03 — 6大模块</div>
    <h2 class="ch-title">工具箱里有什么</h2>
    <p class="ch-lead">
      Anime.js 不是一个工具，是六个工具。就像厨房里有炒锅、蒸笼、烤箱——各有用途，组合起来才能做出大餐。
    </p>
    ${modules.map(m => `
    <div class="card" style="margin-bottom:10px">
      <div class="card-title">
        <span style="font-size:16px;color:${m.color}">${m.icon}</span>
        <span style="color:var(--txt)">${m.name}</span>
        <span style="font-size:11px;color:var(--txt3);margin-left:auto;font-family:var(--mono)">${m.analogy}</span>
      </div>
      <div class="card-body">${m.desc}</div>
    </div>`).join('')}

    <div class="analogy" style="margin-top:18px">
      <div class="analogy-icon">💡</div>
      <p>
        做一个网页动效，你通常只需要用其中 <em>1–2 个工具</em>。<br>
        新手入门从 <em>Animation + Stagger</em> 开始就够了，能做出 80% 的效果。
      </p>
    </div>
  `;
}

// ── utilities shared across render files ──
function hexToRgb(hex) {
  const h = hex.replace('#','');
  const r = parseInt(h.slice(0,2),16);
  const g = parseInt(h.slice(2,4),16);
  const b = parseInt(h.slice(4,6),16);
  return `${r},${g},${b}`;
}

function roundRect(ctx, x, y, w, h, r) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.lineTo(x + w - r, y);
  ctx.quadraticCurveTo(x + w, y, x + w, y + r);
  ctx.lineTo(x + w, y + h - r);
  ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
  ctx.lineTo(x + r, y + h);
  ctx.quadraticCurveTo(x, y + h, x, y + h - r);
  ctx.lineTo(x, y + r);
  ctx.quadraticCurveTo(x, y, x + r, y);
  ctx.closePath();
}
