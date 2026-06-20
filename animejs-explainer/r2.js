// r2.js — 章节 4-6 渲染函数

function renderCh4(el) {
  el.innerHTML = `
<div class="section">
  <h3>先感受再理解</h3>
  <div class="box blue">
    下面这个动画里，<strong>同样的距离、同样的时长</strong>，但两个球的「感觉」完全不一样。这就是缓动曲线的力量。
  </div>
  <div class="vis">
    <canvas id="cv-ease" height="160"></canvas>
    <div class="vis-caption">上：linear（匀速，像机器人）  下：easeOutElastic（弹性，像生物）</div>
  </div>
</div>

<div class="section">
  <h3>缓动曲线是什么</h3>
  <div class="analogy">
    <div class="analogy-icon">🏎</div>
    <div class="analogy-label">类比</div>
    <p>赛车起步时猛踩油门，进弯时刹车，出弯时再加速。<br>
    速度不是一直恒定的——快慢的变化本身就创造了「感觉」。<br><br>
    <em>缓动曲线</em>描述的就是「动画速度随时间的变化方式」。<br>
    匀速运动看起来机械死板；有缓动的运动看起来自然有生命。</p>
  </div>
</div>

<div class="section">
  <h3>Anime.js 内置了多少种缓动</h3>
  <div class="hgrid">
    <div class="hcard">
      <div class="hc-icon">📈</div>
      <div class="hc-title">easeIn 系列</div>
      <div class="hc-body">慢→快。像球从斜面滚下来——先慢慢动，越来越快</div>
    </div>
    <div class="hcard">
      <div class="hc-icon">📉</div>
      <div class="hc-title">easeOut 系列</div>
      <div class="hc-body">快→慢。像刹车——冲过来然后轻轻停下，最自然</div>
    </div>
    <div class="hcard">
      <div class="hc-icon">🌊</div>
      <div class="hc-title">easeInOut 系列</div>
      <div class="hc-body">慢→快→慢。优雅的全程过渡，常用于页面切换</div>
    </div>
    <div class="hcard">
      <div class="hc-icon">🔁</div>
      <div class="hc-title">Elastic / Spring</div>
      <div class="hc-body">弹性超出目标再回弹。最有「手感」，Anime.js 的招牌</div>
    </div>
  </div>
</div>

<div class="section">
  <h3>Spring（弹簧）— 最特别的那个</h3>
  <div class="analogy">
    <div class="analogy-icon">🪀</div>
    <div class="analogy-label">类比</div>
    <p>你把一根橡皮筋拉到终点位置然后松手——它不是直接停在那里，而是先超过，再弹回来，振荡几次才停稳。<br><br>
    Anime.js 的 <em>Spring 弹簧</em>就是这个效果。你可以调节「硬度」「质量」「阻尼」，就像调弹簧的物理参数一样自然。</p>
  </div>
</div>`;

  requestAnimationFrame(() => {
    const cv = document.getElementById('cv-ease');
    if (!cv) return;
    cv.width = cv.parentElement.offsetWidth || 382;
    cv.height = 160;
    const ctx = cv.getContext('2d');
    const W = cv.width, H = cv.height;
    let t = 0;

    function ease(x) { return x; } // linear
    function easeElastic(x) {
      const c4 = (2 * Math.PI) / 3;
      if (x === 0) return 0;
      if (x === 1) return 1;
      return Math.pow(2, -10 * x) * Math.sin((x * 10 - 0.75) * c4) + 1;
    }

    function draw() {
      ctx.clearRect(0, 0, W, H);
      ctx.fillStyle = '#0d1015';
      ctx.fillRect(0, 0, W, H);

      const progress = (t % 120) / 120;
      const trackStart = 32, trackEnd = W - 32;
      const trackLen = trackEnd - trackStart;

      // Ball 1 — linear
      const x1 = trackStart + ease(progress) * trackLen;
      const y1 = H * 0.33;
      // trail
      ctx.strokeStyle = 'rgba(79,143,255,0.15)';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(trackStart, y1);
      ctx.lineTo(trackEnd, y1);
      ctx.stroke();
      // ball
      ctx.fillStyle = '#4f8fff';
      ctx.beginPath();
      ctx.arc(x1, y1, 9, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = '#8a8f98';
      ctx.font = '10px "JetBrains Mono"';
      ctx.textAlign = 'left';
      ctx.fillText('linear', trackStart, y1 - 16);

      // Ball 2 — elastic
      const x2 = trackStart + Math.max(0, Math.min(1, easeElastic(progress))) * trackLen;
      const y2 = H * 0.67;
      ctx.strokeStyle = 'rgba(191,90,242,0.15)';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(trackStart, y2);
      ctx.lineTo(trackEnd, y2);
      ctx.stroke();
      ctx.fillStyle = '#bf5af2';
      ctx.beginPath();
      ctx.arc(x2, y2, 9, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = '#8a8f98';
      ctx.fillText('easeOutElastic', trackStart, y2 - 16);

      t++;
      requestAnimationFrame(draw);
    }
    draw();
  });
}

// ─────────────────────────────────────────
function renderCh5(el) {
  el.innerHTML = `
<div class="section">
  <h3>问题：100个元素同时动</h3>
  <div class="box orange">
    假设你有100个方块，你想让它们一个接一个地飞进来，每个延迟 50ms。<br><br>
    如果手动写，你要给每个方块单独设置延迟……那是 100 行重复代码。
  </div>
</div>

<div class="section">
  <h3>Stagger 的解法</h3>
  <div class="analogy">
    <div class="analogy-icon">🀄</div>
    <div class="analogy-label">类比</div>
    <p>你站在骨牌阵的一头，推倒第一张。接下来的事你不用管——每张牌自动感知自己的序号，延迟相应的时间倒下。<br><br>
    <em>Stagger</em> 就是给每个元素「告诉它自己排第几」，然后自动乘以延迟时间。你只写一次规则，它应用到全部元素上。</p>
  </div>
</div>

<div class="section">
  <h3>动态演示</h3>
  <div class="vis">
    <canvas id="cv-stagger" height="120"></canvas>
    <div class="vis-caption">每个方块延迟 60ms 依次飞入 — 这就是 Stagger 效果</div>
  </div>
</div>

<div class="section">
  <h3>Stagger 还能做什么</h3>
  <div class="checklist">
    <div class="ci"><div class="ci-icon tip">⚡</div><span><strong>从中心向外扩散</strong>：让最中间的元素先动，两边依次延迟</span></div>
    <div class="ci"><div class="ci-icon tip">⚡</div><span><strong>随机延迟</strong>：每个元素的延迟是随机的，产生「混乱飞入」效果</span></div>
    <div class="ci"><div class="ci-icon tip">⚡</div><span><strong>二维网格</strong>：按行列顺序，像波纹一样向外扩散</span></div>
    <div class="ci"><div class="ci-icon tip">⚡</div><span><strong>值也能 Stagger</strong>：不只是时间，颜色、位置、大小都能递增变化</span></div>
  </div>
</div>

<div class="section">
  <div class="box green">
    <strong>animejs.com 首页的字母动画</strong>就是 Stagger——每个字母 delay 递增，形成文字「打字机 × 飞入」的组合效果。
  </div>
</div>`;

  requestAnimationFrame(() => {
    const cv = document.getElementById('cv-stagger');
    if (!cv) return;
    cv.width = cv.parentElement.offsetWidth || 382;
    cv.height = 120;
    const ctx = cv.getContext('2d');
    const W = cv.width, H = cv.height;
    const N = 10;
    const bw = 24, bh = 24, gap = 6;
    const totalW = N * (bw + gap) - gap;
    const startX = (W - totalW) / 2;
    const startY = (H - bh) / 2;
    const CYCLE = 160;
    const STAGGER = 16;
    let t = 0;

    const colors = ['#4f8fff','#bf5af2','#30d158','#ff9f0a','#c8a96e','#4f8fff','#bf5af2','#30d158','#ff9f0a','#c8a96e'];

    function easeOut(x) { return 1 - Math.pow(1 - x, 3); }

    function draw() {
      ctx.clearRect(0, 0, W, H);
      ctx.fillStyle = '#0d1015';
      ctx.fillRect(0, 0, W, H);

      for (let i = 0; i < N; i++) {
        const delay = i * STAGGER;
        const progress = Math.max(0, Math.min(1, ((t - delay) % CYCLE) / (CYCLE * 0.45)));
        const ep = easeOut(Math.min(1, progress));
        const x = startX + i * (bw + gap);
        const y = startY + (1 - ep) * 40;
        const alpha = ep;

        ctx.globalAlpha = alpha;
        ctx.fillStyle = colors[i];
        ctx.beginPath();
        ctx.roundRect(x, y, bw, bh, 5);
        ctx.fill();
        ctx.globalAlpha = 1;

        // index label
        ctx.fillStyle = 'rgba(255,255,255,0.3)';
        ctx.font = '8px "JetBrains Mono"';
        ctx.textAlign = 'center';
        ctx.fillText(i + 1, x + bw / 2, startY + bh + 14);
      }
      t += 1.5;
      requestAnimationFrame(draw);
    }
    draw();
  });
}

// ─────────────────────────────────────────
function renderCh6(el) {
  el.innerHTML = `
<div class="section">
  <h3>什么是滚动触发</h3>
  <div class="analogy">
    <div class="analogy-icon">🛣</div>
    <div class="analogy-label">类比</div>
    <p>高速公路上每隔一段有路灯感应器：<em>车开过去，灯亮；车离开，灯灭</em>。<br><br>
    Scroll Observer 就是给网页元素装了这个感应器——<em>用户滚动到这里，动画开始；滚走了，动画可以反向播放</em>。</p>
  </div>
</div>

<div class="section">
  <h3>三种触发模式</h3>
  <div class="checklist">
    <div class="ci"><div class="ci-icon ok">▶</div><span><strong>进入视口 → 播放</strong>：元素滚到屏幕里，动画开始一次，不倒带</span></div>
    <div class="ci"><div class="ci-icon info">⇄</div><span><strong>进出同步</strong>：滚进来时正向播，滚出去时反向播</span></div>
    <div class="ci"><div class="ci-icon tip">🔗</div><span><strong>滚动进度绑定</strong>：动画进度 = 滚动进度，滚到哪动到哪，完全同步</span></div>
  </div>
</div>

<div class="section">
  <h3>滚动进度绑定的原理</h3>
  <div class="vis">
    <canvas id="cv-scroll" height="150"></canvas>
    <div class="vis-caption">滚动条位置 → 直接控制动画播放进度</div>
  </div>
</div>

<div class="section">
  <h3>animejs.com 上哪里用了它</h3>
  <div class="checklist">
    <div class="ci"><div class="ci-icon ok">✓</div><span>每个功能模块滚进来时，标题和说明从下往上飞入</span></div>
    <div class="ci"><div class="ci-icon ok">✓</div><span>「Lightweight and modular」那一段，模块条目依次出现</span></div>
    <div class="ci"><div class="ci-icon ok">✓</div><span>赞助商部分，卡片跟随滚动横向位移</span></div>
  </div>
</div>

<div class="section">
  <h3>它比 CSS 滚动动画强在哪</h3>
  <div class="hgrid">
    <div class="hcard">
      <div class="hc-icon">⚙️</div>
      <div class="hc-title">精确阈值</div>
      <div class="hc-body">可以设置「元素进入屏幕 30%」才触发，而不是一露头就触发</div>
    </div>
    <div class="hcard">
      <div class="hc-icon">🔄</div>
      <div class="hc-title">可逆</div>
      <div class="hc-body">CSS 动画触发后无法反向，Anime.js 可以滚回去时倒放</div>
    </div>
    <div class="hcard">
      <div class="hc-icon">🎯</div>
      <div class="hc-title">任意属性</div>
      <div class="hc-body">不只是透明度/位置，颜色、SVG路径、任何数字都能跟滚动联动</div>
    </div>
    <div class="hcard">
      <div class="hc-icon">🧩</div>
      <div class="hc-title">与 Timeline 组合</div>
      <div class="hc-body">把一整段 Timeline 动画绑到滚动进度上，做出电影级滚动叙事</div>
    </div>
  </div>
</div>`;

  requestAnimationFrame(() => {
    const cv = document.getElementById('cv-scroll');
    if (!cv) return;
    cv.width = cv.parentElement.offsetWidth || 382;
    cv.height = 150;
    const ctx = cv.getContext('2d');
    const W = cv.width, H = cv.height;
    let scrollPos = 0, dir = 1;

    function draw() {
      ctx.clearRect(0, 0, W, H);
      ctx.fillStyle = '#0d1015';
      ctx.fillRect(0, 0, W, H);

      // Scrollbar visualization
      const sbX = 20, sbY = 20, sbW = 12, sbH = H - 40;
      ctx.fillStyle = '#1e2128';
      ctx.beginPath(); ctx.roundRect(sbX, sbY, sbW, sbH, 6); ctx.fill();
      const thumbH = 30;
      const thumbY = sbY + (scrollPos / 100) * (sbH - thumbH);
      ctx.fillStyle = '#4f8fff';
      ctx.beginPath(); ctx.roundRect(sbX, thumbY, sbW, thumbH, 6); ctx.fill();
      ctx.fillStyle = '#8a8f98';
      ctx.font = '9px "JetBrains Mono"';
      ctx.textAlign = 'center';
      ctx.fillText('滚动条', sbX + sbW / 2, H - 4);

      // Arrow
      const arrX = sbX + sbW + 20;
      ctx.strokeStyle = '#4a4e57';
      ctx.lineWidth = 1;
      ctx.setLineDash([4, 4]);
      ctx.beginPath();
      ctx.moveTo(arrX, H / 2);
      ctx.lineTo(arrX + 30, H / 2);
      ctx.stroke();
      ctx.setLineDash([]);
      ctx.fillStyle = '#4a4e57';
      ctx.beginPath();
      ctx.moveTo(arrX + 30, H / 2 - 5);
      ctx.lineTo(arrX + 40, H / 2);
      ctx.lineTo(arrX + 30, H / 2 + 5);
      ctx.fill();
      ctx.fillStyle = '#4a4e57';
      ctx.font = '9px "JetBrains Mono"';
      ctx.textAlign = 'center';
      ctx.fillText('进度', arrX + 20, H / 2 - 8);

      // Animated element
      const elX = arrX + 50;
      const progress = scrollPos / 100;
      const targetX = elX + 30 + progress * (W - elX - 100);
      const alpha = 0.2 + progress * 0.8;
      const ew = 60, eh = 36;
      ctx.globalAlpha = alpha;
      ctx.fillStyle = '#bf5af2';
      ctx.beginPath();
      ctx.roundRect(targetX, H / 2 - eh / 2, ew, eh, 8);
      ctx.fill();
      ctx.globalAlpha = 1;
      ctx.fillStyle = '#e8e6e0';
      ctx.font = '10px "Space Grotesk"';
      ctx.textAlign = 'center';
      ctx.fillText('元素', targetX + ew / 2, H / 2 + 4);

      ctx.fillStyle = '#8a8f98';
      ctx.font = '9px "JetBrains Mono"';
      ctx.fillText(`进度 ${Math.round(progress * 100)}%`, targetX + ew / 2, H - 4);

      scrollPos += dir * 0.6;
      if (scrollPos >= 100) dir = -1;
      if (scrollPos <= 0) dir = 1;
      requestAnimationFrame(draw);
    }
    draw();
  });
}
