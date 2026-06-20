// r2.js — Chapters 4, 5, 6 (Canvas animations)

// ── easing helpers ──
function easeOutQuad(t) { return 1 - (1 - t) * (1 - t); }
function easeOutElastic(t) {
  if (t === 0 || t === 1) return t;
  const c4 = (2 * Math.PI) / 3;
  return Math.pow(2, -10 * t) * Math.sin((t * 10 - 0.75) * c4) + 1;
}

// ── Chapter 4: Easing ──
function renderCh4(wrap) {
  wrap.innerHTML = `
    <div class="ch-eyebrow">Chapter 04 — 让动作有灵魂</div>
    <h2 class="ch-title">缓动曲线</h2>
    <p class="ch-lead">
      同样是「从A移动到B」，速度节奏不同，感觉完全不同。这就是缓动曲线（Easing）的魔法。
    </p>

    <div class="analogy">
      <div class="analogy-icon">🏎️</div>
      <p>
        想象赛车从起点到终点：<br>
        <em>linear（匀速）</em>——机器一样，感觉假<br>
        <em>easeOut（先快后慢）</em>——刹车停稳，最自然<br>
        <em>easeElastic（弹性）</em>——像橡皮筋，超过终点再弹回
      </p>
    </div>

    <canvas id="cv-ease" class="diagram" height="170"></canvas>
    <p class="diagram-caption">蓝色 = linear 匀速　紫色 = easeOutElastic 弹性（循环播放）</p>

    <div class="card">
      <div class="card-title"><span class="dot" style="background:var(--accent)"></span>常用缓动速查</div>
      <div class="card-body">
        <p style="margin-bottom:6px">• <strong style="color:var(--txt)">easeOut</strong>——最常用，冲过来轻轻停下，自然</p>
        <p style="margin-bottom:6px">• <strong style="color:var(--txt)">easeInOut</strong>——慢→快→慢，页面切换首选</p>
        <p style="margin-bottom:6px">• <strong style="color:var(--txt)">easeElastic</strong>——弹弹弹，游戏 UI 必备</p>
        <p>• <strong style="color:var(--txt)">spring</strong>——物理弹簧，模拟真实质量感</p>
      </div>
    </div>

    <div class="analogy">
      <div class="analogy-icon">👁️</div>
      <p>你看不到缓动曲线本身，但你<em>感受得到</em>它的存在。<br>
      区别高手和新手的一个关键：<em>会不会选缓动</em>。</p>
    </div>
  `;

  // Animate easing comparison
  let rafId4 = null;
  let t4 = 0;
  requestAnimationFrame(function init() {
    const cv = document.getElementById('cv-ease');
    if (!cv) return;
    cv.width = cv.parentElement.offsetWidth || 372;
    const W = cv.width, H = cv.height;
    const ctx = cv.getContext('2d');
    const CYCLE = 140, TRACK = W - 80, startX = 40;

    function draw() {
      ctx.clearRect(0, 0, W, H);
      ctx.fillStyle = '#0d1015';
      ctx.fillRect(0, 0, W, H);

      const progress = (t4 % CYCLE) / CYCLE;

      // Track 1: linear
      const y1 = H * 0.35, y2 = H * 0.65;
      const ballR = 9;
      const labels = ['linear', 'easeOutElastic'];
      const colors = ['#4f8fff', '#bf5af2'];
      const trackYs = [y1, y2];
      const progValues = [progress, Math.max(0, Math.min(1.3, easeOutElastic(progress)))];

      trackYs.forEach((ty, idx) => {
        // track line
        ctx.strokeStyle = 'rgba(255,255,255,0.07)';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(startX, ty);
        ctx.lineTo(startX + TRACK, ty);
        ctx.stroke();

        // end markers
        ctx.fillStyle = 'rgba(255,255,255,0.15)';
        ctx.beginPath(); ctx.arc(startX, ty, 3, 0, Math.PI * 2); ctx.fill();
        ctx.beginPath(); ctx.arc(startX + TRACK, ty, 3, 0, Math.PI * 2); ctx.fill();

        // label
        ctx.fillStyle = 'rgba(255,255,255,0.25)';
        ctx.font = `10px 'JetBrains Mono',monospace`;
        ctx.textAlign = 'left';
        ctx.fillText(labels[idx], startX, ty - 14);

        // ball
        const bx = startX + Math.max(0, Math.min(1, progValues[idx])) * TRACK;
        ctx.shadowColor = colors[idx];
        ctx.shadowBlur = 14;
        ctx.fillStyle = colors[idx];
        ctx.beginPath(); ctx.arc(bx, ty, ballR, 0, Math.PI * 2); ctx.fill();
        ctx.shadowBlur = 0;
      });

      t4++;
      rafId4 = requestAnimationFrame(draw);
    }
    draw();

    // cleanup on chapter change
    cv._stopAnim = () => { if (rafId4) cancelAnimationFrame(rafId4); };
  });
}

// ── Chapter 5: Stagger ──
function renderCh5(wrap) {
  wrap.innerHTML = `
    <div class="ch-eyebrow">Chapter 05 — 批量美学</div>
    <h2 class="ch-title">Stagger 骨牌效应</h2>
    <p class="ch-lead">
      想让 10 个方块依次出现，你不需要写 10 段动画代码——只需要告诉 Anime.js「每个方块比上一个晚 80 毫秒」。
    </p>

    <canvas id="cv-stagger" class="diagram" height="140"></canvas>
    <p class="diagram-caption">10 个色块依次从上方落下（骨牌效应，循环）</p>

    <div class="analogy">
      <div class="analogy-icon">🃏</div>
      <p>
        就像打牌时发牌——庄家不是把所有牌同时扔出去，<br>
        而是<em>一张一张带间隔地滑出</em>。<br>
        Stagger 做的就是这件事：<em>只写一次规则，批量生效</em>。
      </p>
    </div>

    <div class="card">
      <div class="card-title"><span class="dot" style="background:var(--orange)"></span>三种 Stagger 模式</div>
      <div class="card-body">
        <p style="margin-bottom:8px">• <strong style="color:var(--txt)">时间 Stagger</strong>——每个元素延迟 n 毫秒出现</p>
        <p style="margin-bottom:8px">• <strong style="color:var(--txt)">数值 Stagger</strong>——每个元素的大小/颜色/位移依次递增</p>
        <p>• <strong style="color:var(--txt)">从中心扩散</strong>——先中间后两边，或先两边后中间</p>
      </div>
    </div>

    <div class="analogy">
      <div class="analogy-icon">✨</div>
      <p>
        Stagger 是<em>让平淡列表变成视觉表演</em>的最快方法。<br>
        加一行代码，立刻高级 10 倍。
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
    const N = 10, STAGGER = 10, CYCLE = 180;
    const colors = ['#4f8fff','#30d158','#ff9f0a','#bf5af2','#ff6b6b','#4f8fff','#30d158','#ff9f0a','#bf5af2','#c8a96e'];
    const bw = (W - 48 - (N - 1) * 6) / N;
    const bh = 50, startY = H * 0.3;

    function draw() {
      ctx.clearRect(0, 0, W, H);
      ctx.fillStyle = '#0d1015'; ctx.fillRect(0, 0, W, H);

      for (let i = 0; i < N; i++) {
        const delay = i * STAGGER;
        const raw = ((t5 - delay) % CYCLE) / (CYCLE * 0.45);
        const ep = easeOutQuad(Math.max(0, Math.min(1, raw)));
        const x = 24 + i * (bw + 6);
        const y = startY + (1 - ep) * 50;
        const alpha = ep;

        ctx.globalAlpha = alpha;
        ctx.shadowColor = colors[i];
        ctx.shadowBlur = ep * 10;
        ctx.fillStyle = colors[i];
        roundRect(ctx, x, y, bw, bh, 6);
        ctx.fill();
        ctx.shadowBlur = 0;
        ctx.globalAlpha = 1;

        // number below
        ctx.fillStyle = `rgba(255,255,255,${0.2 * ep})`;
        ctx.font = `9px 'JetBrains Mono',monospace`;
        ctx.textAlign = 'center';
        ctx.fillText(i + 1, x + bw / 2, startY + bh + 20);
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
      现代网站的动画，有 80% 是「滚动触发」的——元素滑入视野才动，滑出去就停。Scroll Observer 就是做这件事的工具。
    </p>

    <canvas id="cv-scroll" class="diagram" height="160"></canvas>
    <p class="diagram-caption">滚动进度 → 同步驱动元素位移 + 透明度（循环演示）</p>

    <div class="analogy">
      <div class="analogy-icon">💡</div>
      <p>
        就像路边的感应路灯——<em>人走近就亮，人走远就灭</em>。<br>
        Scroll Observer 监听你的滚动位置，<em>把进度数字喂给动画</em>，动画跟着动。
      </p>
    </div>

    <div class="card">
      <div class="card-title"><span class="dot" style="background:var(--purple)"></span>三种同步模式</div>
      <div class="card-body">
        <p style="margin-bottom:8px">• <strong style="color:var(--txt)">enter/leave 触发</strong>——进入视野一次性触发动画</p>
        <p style="margin-bottom:8px">• <strong style="color:var(--txt)">progress 同步</strong>——动画进度实时等于滚动进度</p>
        <p>• <strong style="color:var(--txt)">parallax</strong>——不同速度滚动，制造深度感</p>
      </div>
    </div>

    <div class="card">
      <div class="card-title"><span class="dot" style="background:var(--green)"></span>为什么现代网站都用它</div>
      <div class="card-body">
        滚动触发把「静态翻页」变成了「电影叙事」。<br>
        用户每次滚动都有新鲜感，停留时间 ×3。
      </div>
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

      // oscillate scroll 0→100
      const cycle = 180;
      const half = cycle / 2;
      const raw = (t6 % cycle);
      const progress = raw < half ? raw / half : 1 - (raw - half) / half;

      // LEFT: scrollbar
      const sbX = 30, sbY = 20, sbW = 12, sbH = H - 40;
      ctx.strokeStyle = 'rgba(255,255,255,0.06)';
      ctx.lineWidth = 0.5;
      roundRect(ctx, sbX, sbY, sbW, sbH, 6);
      ctx.stroke();

      const thumbH = 28;
      const thumbY = sbY + (sbH - thumbH) * progress;
      ctx.fillStyle = '#4f8fff';
      ctx.shadowColor = '#4f8fff'; ctx.shadowBlur = 8;
      roundRect(ctx, sbX, thumbY, sbW, thumbH, 6);
      ctx.fill(); ctx.shadowBlur = 0;

      // label above scrollbar
      ctx.fillStyle = 'rgba(255,255,255,0.3)';
      ctx.font = `9px 'JetBrains Mono',monospace`;
      ctx.textAlign = 'center';
      ctx.fillText('scroll', sbX + sbW/2, sbY - 6);

      // dashed arrow
      const arrowX1 = sbX + sbW + 8;
      const arrowX2 = W / 2 - 20;
      const arrowY = H / 2;
      ctx.setLineDash([3, 4]);
      ctx.strokeStyle = 'rgba(255,255,255,0.15)';
      ctx.lineWidth = 1;
      ctx.beginPath(); ctx.moveTo(arrowX1, arrowY); ctx.lineTo(arrowX2, arrowY); ctx.stroke();
      ctx.setLineDash([]);
      ctx.fillStyle = 'rgba(255,255,255,0.2)';
      ctx.beginPath();
      ctx.moveTo(arrowX2 + 6, arrowY);
      ctx.lineTo(arrowX2 - 2, arrowY - 5);
      ctx.lineTo(arrowX2 - 2, arrowY + 5);
      ctx.closePath(); ctx.fill();

      // RIGHT: animated element
      const elW = 90, elH = 44;
      const elBaseX = W / 2 + 10;
      const maxDist = W - elBaseX - elW - 20;
      const elX = elBaseX + progress * maxDist;
      const elY = (H - elH) / 2;
      const elAlpha = 0.15 + progress * 0.85;
      ctx.globalAlpha = elAlpha;
      ctx.fillStyle = '#bf5af2';
      ctx.shadowColor = '#bf5af2'; ctx.shadowBlur = elAlpha * 16;
      roundRect(ctx, elX, elY, elW, elH, 8);
      ctx.fill(); ctx.shadowBlur = 0;
      ctx.globalAlpha = 1;

      // progress % label
      ctx.fillStyle = `rgba(191,90,242,${elAlpha * 0.8})`;
      ctx.font = `bold 11px 'JetBrains Mono',monospace`;
      ctx.textAlign = 'center';
      ctx.fillText(Math.round(progress * 100) + '%', elX + elW / 2, elY + elH / 2 + 4);

      // label above box
      ctx.fillStyle = 'rgba(255,255,255,0.25)';
      ctx.font = `9px 'JetBrains Mono',monospace`;
      ctx.fillText('动画进度', elX + elW / 2, elY - 6);

      t6++;
      rafId6 = requestAnimationFrame(draw);
    }
    draw();
    cv._stopAnim = () => { if (rafId6) cancelAnimationFrame(rafId6); };
  });
}
