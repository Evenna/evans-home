// r1.js — Chapters 1, 2, 3

function renderCh1(wrap) {
  wrap.innerHTML = `
    <div class="ch-eyebrow">Chapter 01 — 体验优先</div>
    <h2 class="ch-title">先玩一遍，<em style="font-style:italic;color:var(--txt2)">不用懂</em></h2>
    <p class="ch-lead">
      左边就是 animejs.com 的完整官网——已经做成了本地镜像，所有模型、动效都能正常跑。<br>
      先别看文字。拖动、滚动、观察——感受这些动画带来的「感觉」。
    </p>

    <div class="analogy">
      <div class="analogy-icon">🎮</div>
      <p>你不需要会开车，就能感受跑车和面包车的区别。<br>
      同样，你不需要会写代码，就能感受出<em>「有动画」和「没动画」</em>的区别，以及<em>好动画和烂动画</em>的区别。<br>
      这门课的目标：让你理解那种区别从哪来，怎么用 AI 复现出来。</p>
    </div>

    <div class="card">
      <div class="card-title"><span class="dot" style="background:var(--accent)"></span>观察清单——边看边问自己</div>
      <div class="card-body">
        <p style="margin-bottom:10px">① <strong style="color:var(--txt)">速度节奏</strong>——动画是匀速的吗？什么时候快、什么时候慢？</p>
        <p style="margin-bottom:10px">② <strong style="color:var(--txt)">先后顺序</strong>——多个元素是同时动的，还是有时间差？</p>
        <p style="margin-bottom:10px">③ <strong style="color:var(--txt)">触发时机</strong>——什么操作触发了动画？滚动、hover、还是自动？</p>
        <p style="margin-bottom:10px">④ <strong style="color:var(--txt)">3D 感</strong>——那些旋转的几何模型是怎么做的？</p>
        <p>⑤ <strong style="color:var(--txt)">整体节奏</strong>——这个网站给你什么情绪感受？快、慢、还是有层次？</p>
      </div>
    </div>

    <div class="card">
      <div class="card-title"><span class="dot" style="background:var(--green)"></span>你会在左边看到什么</div>
      <div class="card-body">
        <p style="margin-bottom:8px">• 首屏：<strong style="color:var(--txt)">巨大的 3D 几何体</strong>在旋转，鼠标移过去有反应</p>
        <p style="margin-bottom:8px">• 滚动后：每个 API 模块都有对应的<strong style="color:var(--txt)">交互式 3D 模型</strong>展示</p>
        <p style="margin-bottom:8px">• 文字和元素以<strong style="color:var(--txt)">滚动触发</strong>的方式逐步出现</p>
        <p>• 各模块还有<strong style="color:var(--txt)">可拖动的交互 demo</strong></p>
      </div>
    </div>

    <div style="text-align:center;margin-top:24px;">
      <p style="font-family:var(--mono);font-size:11px;color:var(--txt3)">观察完毕后 →</p>
      <p style="font-size:13px;color:var(--txt2);margin-top:6px">点右下角 <strong style="color:var(--txt)">→</strong> 进入第 2 章，开始理解背后的原理</p>
    </div>
  `;
}

function renderCh2(wrap) {
  wrap.innerHTML = `
    <div class="ch-eyebrow">Chapter 02 — 大局观</div>
    <h2 class="ch-title">它是什么</h2>
    <p class="ch-lead">
      理解 Anime.js 之前，先搞清楚它在整个网页技术栈里扮演什么角色。
    </p>

    <div class="analogy">
      <div class="analogy-icon">🎬</div>
      <p>把网页想象成一部电影的拍摄现场：<br>
      <em>HTML</em> 是布景和演员（决定有什么）<br>
      <em>CSS</em> 是服装和化妆（决定长什么样）<br>
      <em>Anime.js</em> 是导演——喊「第3秒，演员A向右走；第5秒，灯光变暗；第8秒，所有人同时转身」</p>
    </div>

    <canvas id="cv-arch" class="diagram" height="180"></canvas>
    <p class="diagram-caption">Anime.js 在技术栈中的位置 — 它是「动画调度层」</p>

    <div class="card">
      <div class="card-title"><span class="dot" style="background:var(--accent)"></span>Anime.js 能控制什么</div>
      <div class="card-body">
        <p style="margin-bottom:8px">• 任意 <strong style="color:var(--txt)">HTML 元素</strong>的位置、大小、颜色、透明度、旋转</p>
        <p style="margin-bottom:8px">• <strong style="color:var(--txt)">SVG 路径</strong>的长度、变形、描边</p>
        <p style="margin-bottom:8px">• CSS 变量、任意<strong style="color:var(--txt)">纯数字</strong>（比如计数器、进度条）</p>
        <p style="margin-bottom:8px">• 配合 Three.js 等库，还能间接控制 <strong style="color:var(--txt)">3D 场景</strong>里的一切</p>
        <p>本质：给它一个<em style="color:var(--accent)">起点值</em>、一个<em style="color:var(--accent)">终点值</em>、一个<em style="color:var(--accent)">时长</em>，它用缓动函数算出<strong style="color:var(--txt)">每一帧</strong>应该是多少</p>
      </div>
    </div>

    <div class="card">
      <div class="card-title"><span class="dot" style="background:var(--green)"></span>它和 CSS Animation 有什么区别</div>
      <div class="card-body">
        <p style="margin-bottom:8px">CSS Animation 是<strong style="color:var(--txt)">声明式的</strong>——在样式表里写「这个元素怎么动」，写完就固定了</p>
        <p style="margin-bottom:8px">Anime.js 是<strong style="color:var(--txt)">命令式的</strong>——在 JS 里随时控制「什么时候动、动多少、要不要暂停、要不要反转」</p>
        <p>简单说：CSS Animation 是<em style="color:var(--accent)">剧本写死了</em>，Anime.js 是<em style="color:var(--accent)">导演可以实时喊停</em></p>
      </div>
    </div>

    <div class="tag-row">
      <span class="tag blue">轻量 ~17KB gzip</span>
      <span class="tag blue">开源 MIT 协议</span>
      <span class="tag green">纯 JS，零依赖</span>
      <span class="tag orange">CDN 一行引入</span>
      <span class="tag purple">V4 最新架构</span>
    </div>
  `;

  requestAnimationFrame(() => {
    const cv = document.getElementById('cv-arch');
    if (!cv) return;
    cv.width = cv.parentElement.offsetWidth || 372;
    const W = cv.width, H = cv.height;
    const ctx = cv.getContext('2d');
    ctx.fillStyle = '#0d1015';
    ctx.fillRect(0, 0, W, H);

    const layers = [
      { label: 'HTML + CSS', sub: '结构 / 样式', color: '#30d158' },
      { label: 'Anime.js', sub: '动画调度层', color: '#4f8fff', highlight: true },
      { label: '+ Three.js 等库', sub: '可选：扩展能力', color: '#ff9f0a' },
      { label: '浏览器渲染引擎', sub: '用户看到的一切', color: '#bf5af2' },
    ];

    const bw = W - 64, bh = 34, gapY = 6;
    const totalH = layers.length * bh + (layers.length - 1) * gapY;
    let y0 = (H - totalH) / 2;

    layers.forEach((l, i) => {
      const y = y0 + i * (bh + gapY);
      if (l.highlight) {
        ctx.shadowColor = l.color; ctx.shadowBlur = 20;
      }
      ctx.fillStyle = l.highlight
        ? `rgba(${hexToRgb(l.color)},0.18)`
        : `rgba(${hexToRgb(l.color)},0.08)`;
      ctx.strokeStyle = l.highlight
        ? `rgba(${hexToRgb(l.color)},0.7)`
        : `rgba(${hexToRgb(l.color)},0.3)`;
      ctx.lineWidth = l.highlight ? 1 : 0.5;
      roundRect(ctx, 32, y, bw, bh, 7);
      ctx.fill(); ctx.stroke();
      ctx.shadowBlur = 0;

      ctx.fillStyle = l.color;
      ctx.font = l.highlight
        ? `600 13px 'Space Grotesk',sans-serif`
        : `400 12px 'Space Grotesk',sans-serif`;
      ctx.textAlign = 'left';
      ctx.fillText(l.label, 48, y + bh / 2 + 4);

      ctx.fillStyle = 'rgba(255,255,255,0.28)';
      ctx.font = `10px 'JetBrains Mono',monospace`;
      ctx.textAlign = 'right';
      ctx.fillText(l.sub, W - 48, y + bh / 2 + 4);
    });

    ctx.strokeStyle = 'rgba(255,255,255,0.1)';
    ctx.lineWidth = 1;
    ctx.setLineDash([3, 3]);
    for (let i = 0; i < layers.length - 1; i++) {
      const y1 = y0 + i * (bh + gapY) + bh;
      const y2 = y1 + gapY;
      const cx = W / 2;
      ctx.beginPath(); ctx.moveTo(cx, y1 + 1); ctx.lineTo(cx, y2 - 1); ctx.stroke();
      ctx.setLineDash([]);
      ctx.fillStyle = 'rgba(255,255,255,0.18)';
      ctx.beginPath();
      ctx.moveTo(cx, y2 + 1); ctx.lineTo(cx - 4, y2 - 4); ctx.lineTo(cx + 4, y2 - 4);
      ctx.closePath(); ctx.fill();
      ctx.setLineDash([3, 3]);
    }
    ctx.setLineDash([]);
  });
}

function renderCh3(wrap) {
  const modules = [
    {
      name: 'animate()', icon: '▶', color: 'var(--accent)',
      analogy: '跑步计划',
      desc: '最基础的工具。你给它一个目标元素、一组目标属性、时长和缓动，它算出每帧的中间值并自动播放。几乎所有动效的起点。',
      code: `anime({
  targets: '.box',
  translateX: 300,
  duration: 1200,
  easing: 'easeOutQuad'
});`
    },
    {
      name: 'createTimeline()', icon: '♩', color: 'var(--green)',
      analogy: '乐谱 / 时间轴',
      desc: '把多个动画排成一条时间线。钢琴第0秒进，小提琴第3秒进。可以精确控制哪段和哪段叠加、哪段要等哪段结束。',
      code: `const tl = anime.createTimeline();
tl.add('.title', { opacity:[0,1], translateY:[30,0] })
  .add('.body',  { opacity:[0,1] }, '+=200')
  .add('.btn',   { scale:[0,1], easing:'easeOutElastic' });`
    },
    {
      name: 'stagger()', icon: '≋', color: 'var(--orange)',
      analogy: '发牌 / 骨牌',
      desc: '批量动画的时间偏移函数。10个方块，每个比上一个晚 80ms 出现——只写一次规则，批量生效。是最容易制造视觉冲击的工具。',
      code: `anime({
  targets: '.item',
  translateY: [40, 0],
  opacity: [0, 1],
  delay: anime.stagger(80)
});`
    },
    {
      name: 'createScrollObserver()', icon: '☲', color: 'var(--purple)',
      analogy: '路灯感应器',
      desc: '监听元素进出视口。元素滚动进来就触发，离开就暂停或反转。可以把滚动进度直接映射成动画进度，做视差、进度条等效果。',
      code: `anime.createScrollObserver({
  target: '.section',
  enter: () => anime({ targets: '.section', opacity:[0,1] }),
  sync: true  // 进度同步模式
});`
    },
    {
      name: 'createDraggable()', icon: '✥', color: 'var(--gold)',
      analogy: '磁铁 / 弹弓',
      desc: '让元素可拖动，支持惯性甩飞、弹回锚点、边界限制。官网里那些可以拖动后弹回的小物体就是用这个做的。',
      code: `anime.createDraggable('.card', {
  x: { snap: 0 },  // 松手弹回 x=0
  y: { snap: 0 },
  releaseEasing: 'spring(1, 80, 10, 0)'
});`
    },
    {
      name: 'SVG 工具集', icon: '✏', color: '#ff6b6b',
      analogy: '钢笔在纸上留痕',
      desc: '路径绘制动画（从无到有「画出来」）、形状变形（一个图形变成另一个形状）、SVG 描边动画。左边官网里的线条和路径特效就出自这里。',
      code: `// 路径描边动画
anime({
  targets: 'path',
  strokeDashoffset: [anime.setDashoffset, 0],
  duration: 2000,
  easing: 'easeInOutQuad'
});`
    },
  ];

  wrap.innerHTML = `
    <div class="ch-eyebrow">Chapter 03 — 六大模块</div>
    <h2 class="ch-title">工具箱里有什么</h2>
    <p class="ch-lead">
      Anime.js 不是一个工具，是<strong style="color:var(--txt)">六个工具</strong>。就像厨房里有炒锅、蒸笼、烤箱——各有用途，组合起来才能做大餐。
    </p>

    <div class="analogy">
      <div class="analogy-icon">💡</div>
      <p>
        新手入门从 <em>animate() + stagger()</em> 开始就够了，能做出 80% 的常见效果。<br>
        Timeline 负责「排戏」，ScrollObserver 负责「触发」，三个加起来几乎万能。
      </p>
    </div>

    ${modules.map(m => `
    <div class="card" style="margin-bottom:12px">
      <div class="card-title">
        <span style="font-size:15px;color:${m.color}">${m.icon}</span>
        <span style="color:var(--txt);font-family:var(--mono);font-size:13px">${m.name}</span>
        <span style="font-size:11px;color:var(--txt3);margin-left:auto;font-family:var(--mono)">${m.analogy}</span>
      </div>
      <div class="card-body" style="margin-bottom:10px">${m.desc}</div>
      <pre style="background:rgba(0,0,0,0.3);border-radius:8px;padding:12px;font-family:var(--mono);font-size:10.5px;line-height:1.65;color:rgba(255,255,255,0.55);overflow-x:auto;margin:0;border:0.5px solid rgba(255,255,255,0.05)">${escHtml(m.code)}</pre>
    </div>`).join('')}
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

function escHtml(str) {
  return str.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
}
