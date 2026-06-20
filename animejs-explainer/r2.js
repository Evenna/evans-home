// r2.js — Chapters 4, 5, 6 (with Canvas animations)

function easeOutQuad(t) { return 1 - (1 - t) * (1 - t); }
function easeInOutQuad(t) { return t < 0.5 ? 2*t*t : 1-Math.pow(-2*t+2,2)/2; }
function easeOutElastic(t) {
  if (t === 0 || t === 1) return t;
  return Math.pow(2, -10*t) * Math.sin((t*10 - 0.75) * (2*Math.PI)/3) + 1;
}
function easeOutBounce(t) {
  const n1 = 7.5625, d1 = 2.75;
  if (t < 1/d1) return n1*t*t;
  else if (t < 2/d1) return n1*(t -= 1.5/d1)*t + 0.75;
  else if (t < 2.5/d1) return n1*(t -= 2.25/d1)*t + 0.9375;
  else return n1*(t -= 2.625/d1)*t + 0.984375;
}

// ── Chapter 4: Easing ──
function renderCh4(wrap) {
  wrap.innerHTML = `
    <div class="ch-eyebrow">Chapter 04 — 让动作有灵魂</div>
    <h2 class="ch-title">缓动曲线</h2>
    <p class="ch-lead">
      同样是「从A移动到B」，速度节奏不同，感觉完全不同。<br>
      缓动曲线（Easing）是区别「工具动画」和「有生命的动画」的最关键要素。
    </p>

    <div class="analogy">
      <div class="analogy-icon">🏎️</div>
      <p>
        想象 4 辆赛车从起点到终点：<br>
        <em>linear</em>——机器人速度，感觉很假<br>
        <em>easeOut</em>——冲过来轻轻停下，最像真实物理<br>
        <em>easeOutElastic</em>——超过终点，弹回来，像橡皮筋<br>
        <em>easeOutBounce</em>——像皮球落地，弹几下才停住
      </p>
    </div>

    <canvas id="cv-ease" class="diagram" height="210"></canvas>
    <p class="diagram-caption">四种缓动对比 — 同起点同终点，节奏完全不同（循环播放）</p>

    <div class="card">
      <div class="card-title"><span class="dot" style="background:var(--accent)"></span>常用缓动速查</div>
      <div class="card-body">
        <p style="margin-bottom:7px">• <strong style="color:var(--txt)">easeOut</strong> <span style="color:var(--txt3);font-family:var(--mono);font-size:10px">— 最常用</span>，冲过来轻轻停下，自然、干净</p>
        <p style="margin-bottom:7px">• <strong style="color:var(--txt)">easeInOut</strong>，慢→快→慢，页面切换、滚动过渡首选</p>
        <p style="margin-bottom:7px">• <strong style="color:var(--txt)">easeOutElastic</strong>，弹弹弹，UI 弹出框、提示气泡最合适</p>
        <p style="margin-bottom:7px">• <strong style="color:var(--txt)">easeOutBounce</strong>，皮球感，游戏 UI、角色落地</p>
        <p>• <strong style="color:var(--txt)">spring(mass, stiffness, damping, velocity)</strong>，真实物理弹簧，最高级</p>
      </div>
    </div>

    <div class="card">
      <div class="card-title"><span class="dot" style="background:var(--green)"></span>Anime.js 里怎么写</div>
      <div class="card-body">
        <pre style="background:rgba(0,0,0,0.3);border-radius:8px;padding:12px;font-family:var(--mono);font-size:10.5px;line-height:1.65;color:rgba(255,255,255,0.55);overflow-x:auto;border:0.5px solid rgba(255,255,255,0.05)">anime({
  targets: '.box',
  translateX: 300,
  duration: 1200,
  easing: 'easeOutElastic(1, 0.5)'
  // 括号里可以调参数：amplitude, period
  // 或用 spring：easing: 'spring(1, 80, 10, 0)'
});</pre>
      </div>
    </div>

    <div class="analogy">
      <div class="analogy-icon">👁️</div>
      <p>你看不到缓动曲线本身，但你<em>感受得到</em>它的存在。<br>
      区别高手和新手动效的最大秘密：<em>会选缓动</em>。同一个动画，换个 easing，档次差一个量级。</p>
    </div>
  `;

  let rafId4 = null, t4 = 0;
  requestAnimationFrame(function init() {
    const cv = document.getElementById('cv-ease');
    if (!cv) return;
    cv.width = cv.parentElement.offsetWidth || 372;
    const W = cv.width, H = cv.height;
    const ctx = cv.getContext('2d');
    const CYCLE = 160, TRACK = W - 100, startX = 44;
    const easings = [
      { name: 'linear',          fn: t => t,              color: '#4a4e57' },
      { name: 'easeOut',         fn: easeOutQuad,          color: '#4f8fff' },
      { name: 'easeOutElastic',  fn: easeOutElastic,       color: '#bf5af2' },
      { name: 'easeOutBounce',   fn: easeOutBounce,        color: '#ff9f0a' },
    ];
    const trackH = (H - 20) / easings.length;

    function draw() {
      ctx.clearRect(0, 0, W, H);
      ctx.fillStyle = '#0d1015'; ctx.fillRect(0, 0, W, H);

      const progress = (t4 % CYCLE) / CYCLE;

      easings.forEach((e, idx) => {
        const ty = 12 + idx * trackH + trackH / 2;
        const ballR = 8;
        const val = Math.max(-0.15, Math.min(1.15, e.fn(progress)));

        // track line
        ctx.strokeStyle = 'rgba(255,255,255,0.05)';
        ctx.lineWidth = 1.5;
        ctx.beginPath(); ctx.moveTo(startX, ty); ctx.lineTo(startX + TRACK, ty); ctx.stroke();

        // label
        ctx.fillStyle = `rgba(${hexToRgb(e.color.replace('var(--','').replace(')',''))},0.7)` || 'rgba(255,255,255,0.3)';
        ctx.fillStyle = e.color;
        ctx.globalAlpha = 0.6;
        ctx.font = `10px 'JetBrains Mono',monospace`;
        ctx.textAlign = 'right';
        ctx.fillText(e.name, startX - 6, ty + 3);
        ctx.globalAlpha = 1;

        // ball
        const bx = startX + Math.max(0, Math.min(1, val)) * TRACK;
        ctx.shadowColor = e.color; ctx.shadowBlur = 14;
        ctx.fillStyle = e.color;
        ctx.beginPath(); ctx.arc(bx, ty, ballR, 0, Math.PI * 2); ctx.fill();
        ctx.shadowBlur = 0;

        // dot at true position (including overshoot)
        if (val < 0 || val > 1) {
          const trueBx = startX + val * TRACK;
          ctx.globalAlpha = 0.35;
          ctx.fillStyle = e.color;
          ctx.beginPath(); ctx.arc(trueBx, ty, ballR, 0, Math.PI * 2); ctx.fill();
          ctx.globalAlpha = 1;
        }
      });

      t4++;
      rafId4 = requestAnimationFrame(draw);
    }
    draw();
    cv._stopAnim = () => { if (rafId4) cancelAnimationFrame(rafId4); };
  });
}

// ── Chapter 5: Stagger ──
function renderCh5(wrap) {
  wrap.innerHTML = `
    <div class="ch-eyebrow">Chapter 05 — 批量美学</div>
    <h2 class="ch-title">Stagger 骨牌效应</h2>
    <p class="ch-lead">
      想让 12 个方块依次出现？不需要写 12 段动画代码。<br>
      告诉 Anime.js「每个方块比上一个晚 80ms」，剩下的它全包了。
    </p>

    <canvas id="cv-stagger" class="diagram" height="150"></canvas>
    <p class="diagram-caption">12 个色块依次从下方升起 · 骨牌间隔 = 60ms（循环演示）</p>

    <div class="analogy">
      <div class="analogy-icon">🃏</div>
      <p>
        就像发牌——庄家不是把所有牌同时扔出去，<br>
        而是<em>一张一张带节奏地滑出</em>。<br>
        Stagger 的本质：<em>把一个规则施加给一组元素，自动错开时间</em>。
      </p>
    </div>

    <div class="card">
      <div class="card-title"><span class="dot" style="background:var(--orange)"></span>三种 Stagger 模式</div>
      <div class="card-body">
        <pre style="background:rgba(0,0,0,0.3);border-radius:8px;padding:12px;font-family:var(--mono);font-size:10.5px;line-height:1.65;color:rgba(255,255,255,0.55);overflow-x:auto;margin-bottom:10px;border:0.5px solid rgba(255,255,255,0.05)">// 1. 时间 Stagger：每个元素晚 80ms 出现
delay: anime.stagger(80)

// 2. 从中心向外扩散（grid 模式）
delay: anime.stagger(80, { from: 'center' })

// 3. 数值 Stagger：每个元素尺寸递增
width: anime.stagger([20, 100])  // 从20px渐增到100px</pre>
        <p style="margin-bottom:7px">• <strong style="color:var(--txt)">时间 Stagger</strong>——每个元素晚 n 毫秒出现，最常用</p>
        <p style="margin-bottom:7px">• <strong style="color:var(--txt)">数值 Stagger</strong>——每个元素的大小/颜色/位移依次变化</p>
        <p>• <strong style="color:var(--txt)">从中心/边缘扩散</strong>——grid 布局里特别好看</p>
      </div>
    </div>

    <div class="card">
      <div class="card-title"><span class="dot" style="background:var(--accent)"></span>官网里 Stagger 的影子</div>
      <div class="card-body">
        <p style="margin-bottom:7px">左边官网里，每当你滚动到新的 section，那些<strong style="color:var(--txt)">文字逐字/逐行出现</strong>的效果——</p>
        <p>就是 Stagger 把段落里每个 <code style="font-family:var(--mono);font-size:11px;color:var(--accent)">span</code> 错开时间逐个淡入的结果。</p>
      </div>
    </div>

    <div class="analogy">
      <div class="analogy-icon">✨</div>
      <p>
        Stagger 是<em>让平淡列表变成视觉表演</em>的最快方法。<br>
        加一行代码 <code style="color:var(--accent)">delay: anime.stagger(80)</code>，立刻高级 10 倍。
      </p>
    </div>
  `;

  let rafId5 = null, t5 = 0;
  requestAnimationFrame(function init() {
    const cv = document.getElementById('cv-stagger');
    if (!cv) return;
    cv.width = cv.parentElement.offsetWidth || 372;
    const W = cv.width, H = cv.height;
    const ctx = cv.getContext('2d');
    const N = 12, STAGGER = 8, CYCLE = 200;
    const colors = ['#4f8fff','#30d158','#ff9f0a','#bf5af2','#ff6b6b','#4f8fff',
                    '#30d158','#ff9f0a','#bf5af2','#c8a96e','#4f8fff','#30d158'];
    const bw = (W - 48 - (N - 1) * 4) / N;
    const bh = 52, startY = H * 0.28;

    function draw() {
      ctx.clearRect(0, 0, W, H);
      ctx.fillStyle = '#0d1015'; ctx.fillRect(0, 0, W, H);

      for (let i = 0; i < N; i++) {
        const delay = i * STAGGER;
        const raw = ((t5 - delay) % CYCLE) / (CYCLE * 0.5);
        const ep = easeOutQuad(Math.max(0, Math.min(1, raw)));
        const x = 24 + i * (bw + 4);
        const y = startY + (1 - ep) * 45;

        ctx.globalAlpha = ep * 0.95;
        ctx.shadowColor = colors[i]; ctx.shadowBlur = ep * 12;
        ctx.fillStyle = colors[i];
        roundRect(ctx, x, y, bw, bh, 5);
        ctx.fill();
        ctx.shadowBlur = 0;
        ctx.globalAlpha = 1;

        // delay indicator dots at bottom
        const dotY = startY + bh + 22;
        ctx.fillStyle = `rgba(${hexToRgb(colors[i])},${0.15 + ep * 0.5})`;
        ctx.beginPath(); ctx.arc(x + bw/2, dotY, 2.5, 0, Math.PI*2); ctx.fill();

        // number
        if (ep > 0.3) {
          ctx.fillStyle = `rgba(255,255,255,${(ep-0.3)/0.7 * 0.5})`;
          ctx.font = `bold 9px 'JetBrains Mono',monospace`;
          ctx.textAlign = 'center';
          ctx.fillText(i + 1, x + bw/2, y + bh/2 + 3);
        }
      }
      t5++;
      rafId5 = requestAnimationFrame(draw);
    }
    draw();
    cv._stopAnim = () => { if (rafId5) cancelAnimationFrame(rafId5); };
  });
}

// ── Chapter 6: Scroll Observer ──
function renderCh6(wrap) {
  wrap.innerHTML = `
    <div class="ch-eyebrow">Chapter 06 — 滚动感应器</div>
    <h2 class="ch-title">Scroll Observer</h2>
    <p class="ch-lead">
      现代网站的动画，有 80% 是「滚动触发」的。元素滑入视野才动，滑出去就停或反转。<br>
      左边官网里几乎所有内容的出现方式，都靠这个机制驱动。
    </p>

    <canvas id="cv-scroll" class="diagram" height="170"></canvas>
    <p class="diagram-caption">左：滚动条位置　→　右：动画进度实时同步（循环演示）</p>

    <div class="analogy">
      <div class="analogy-icon">💡</div>
      <p>
        就像路边的感应路灯——<em>人走近就亮，人走远就灭</em>。<br>
        Scroll Observer 监听你的滚动位置，<em>把进度数字喂给动画</em>，动画实时跟着动。
      </p>
    </div>

    <div class="card">
      <div class="card-title"><span class="dot" style="background:var(--purple)"></span>三种使用模式</div>
      <div class="card-body">
        <pre style="background:rgba(0,0,0,0.3);border-radius:8px;padding:12px;font-family:var(--mono);font-size:10.5px;line-height:1.65;color:rgba(255,255,255,0.55);overflow-x:auto;border:0.5px solid rgba(255,255,255,0.05)">// 模式 1：进入视野一次性触发
anime.createScrollObserver({
  target: '.card',
  enter: (self) => anime({ targets: '.card', opacity: [0,1], translateY: [30,0] })
});

// 模式 2：进度同步（滚动到哪动到哪）
anime.createScrollObserver({
  target: '#hero',
  sync: true,  // 动画进度 = 滚动进度
  animation: anime({ targets: '#hero', translateY: [-50, 50], autoplay: false })
});

// 模式 3：视差（不同速度）
anime.createScrollObserver({
  target: '.bg-layer',
  sync: 0.5  // 以 0.5 倍速滚动，产生景深感
});</pre>
      </div>
    </div>

    <div class="card">
      <div class="card-title"><span class="dot" style="background:var(--green)"></span>官网里滚动触发的地方</div>
      <div class="card-body">
        <p style="margin-bottom:7px">• 每个 API 模块的<strong style="color:var(--txt)">标题和描述文字</strong>——滚动进入才出现</p>
        <p style="margin-bottom:7px">• 3D 模型的<strong style="color:var(--txt)">旋转角度</strong>——随滚动进度同步转动</p>
        <p>• 页面顶部的<strong style="color:var(--txt)">进度指示条</strong>——实时反映当前阅读位置</p>
      </div>
    </div>

    <div class="analogy">
      <div class="analogy-icon">🎬</div>
      <p>
        滚动触发把「静态翻页」变成了「<em>电影叙事</em>」。<br>
        用户每次滚动都有新鲜感，内容像被「展开」而不是「出现」。<br>
        这是当代高端网站的标配。
      </p>
    </div>
  `;

  let rafId6 = null, t6 = 0;
  requestAnimationFrame(function init() {
    const cv = document.getElementById('cv-scroll');
    if (!cv) return;
    cv.width = cv.parentElement.offsetWidth || 372;
    const W = cv.width, H = cv.height;
    const ctx = cv.getContext('2d');

    function draw() {
      ctx.clearRect(0, 0, W, H);
      ctx.fillStyle = '#0d1015'; ctx.fillRect(0, 0, W, H);

      const cycle = 200, half = cycle / 2;
      const raw = t6 % cycle;
      const progress = easeInOutQuad(raw < half ? raw/half : 1-(raw-half)/half);

      // LEFT: scrollbar widget
      const sbX = 24, sbY = 16, sbW = 14, sbH = H - 32;
      ctx.strokeStyle = 'rgba(255,255,255,0.05)';
      ctx.lineWidth = 0.5;
      roundRect(ctx, sbX, sbY, sbW, sbH, 7);
      ctx.stroke();

      const thumbH = 30;
      const thumbY = sbY + (sbH - thumbH) * progress;
      ctx.shadowColor = '#4f8fff'; ctx.shadowBlur = 10;
      ctx.fillStyle = '#4f8fff';
      roundRect(ctx, sbX, thumbY, sbW, thumbH, 7);
      ctx.fill(); ctx.shadowBlur = 0;

      ctx.fillStyle = 'rgba(255,255,255,0.25)';
      ctx.font = `9px 'JetBrains Mono',monospace`;
      ctx.textAlign = 'center';
      ctx.fillText('scroll', sbX + sbW/2, sbY - 5);
      ctx.fillStyle = '#4f8fff';
      ctx.fillText(Math.round(progress*100)+'%', sbX + sbW/2, sbY + sbH + 12);

      // MIDDLE: arrow + label
      const midX = W * 0.42;
      ctx.setLineDash([3,4]);
      ctx.strokeStyle = 'rgba(255,255,255,0.12)';
      ctx.lineWidth = 1;
      ctx.beginPath(); ctx.moveTo(sbX+sbW+8, H/2); ctx.lineTo(midX-10, H/2); ctx.stroke();
      ctx.setLineDash([]);
      ctx.fillStyle = 'rgba(255,255,255,0.18)';
      ctx.beginPath();
      ctx.moveTo(midX, H/2); ctx.lineTo(midX-9, H/2-5); ctx.lineTo(midX-9, H/2+5);
      ctx.closePath(); ctx.fill();

      ctx.fillStyle = 'rgba(255,255,255,0.2)';
      ctx.font = `8px 'JetBrains Mono',monospace`;
      ctx.textAlign = 'center';
      ctx.fillText('进度映射', (sbX+sbW+midX)/2, H/2 - 8);

      // RIGHT: 3 animated elements
      const rightX = midX + 8;
      const items = [
        { label: '标题', color: '#4f8fff', w: W-rightX-16, h: 26, delay: 0 },
        { label: '段落', color: '#30d158', w: W-rightX-28, h: 18, delay: 0.15 },
        { label: '按钮', color: '#ff9f0a', w: 60,           h: 20, delay: 0.3 },
      ];
      const totalRH = items.reduce((s,it)=>s+it.h+6,0) - 6;
      let ry = (H - totalRH) / 2;
      items.forEach(item => {
        const ip = Math.max(0, Math.min(1, (progress - item.delay) / (1 - item.delay)));
        const ep = easeOutQuad(ip);
        const ix = rightX + (1-ep) * 20;
        ctx.globalAlpha = ep * 0.9;
        ctx.shadowColor = item.color; ctx.shadowBlur = ep * 8;
        ctx.fillStyle = `rgba(${hexToRgb(item.color)},0.25)`;
        ctx.strokeStyle = `rgba(${hexToRgb(item.color)},0.5)`;
        ctx.lineWidth = 0.5;
        roundRect(ctx, ix, ry, item.w, item.h, 5);
        ctx.fill(); ctx.stroke();
        ctx.shadowBlur = 0;
        ctx.globalAlpha = ep * 0.5;
        ctx.fillStyle = item.color;
        ctx.font = `9px 'JetBrains Mono',monospace`;
        ctx.textAlign = 'left';
        ctx.fillText(item.label, ix+8, ry+item.h/2+3);
        ctx.globalAlpha = 1;
        ry += item.h + 6;
      });

      t6++;
      rafId6 = requestAnimationFrame(draw);
    }
    draw();
    cv._stopAnim = () => { if (rafId6) cancelAnimationFrame(rafId6); };
  });
}
