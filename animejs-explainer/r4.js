// r4.js — Chapters 7, 8, 9 (3D Models + Architecture + Timeline)

// ── Chapter 7: 官网的 3D 模型 ──
function renderCh7(wrap) {
  wrap.innerHTML = `
    <div class="ch-eyebrow">Chapter 07 — 解密压轴技术</div>
    <h2 class="ch-title">官网的 3D 模型</h2>
    <p class="ch-lead">
      左边官网那些会旋转、会随滚动变形的几何体——它们不是 Anime.js 自己做的。<br>
      Anime.js 只负责「调度」，真正渲染 3D 的是另一个库：<strong style="color:var(--txt)">Three.js</strong>。
    </p>

    <div class="analogy">
      <div class="analogy-icon">🎭</div>
      <p>
        把这个组合想成一场舞台剧：<br>
        <em>Three.js</em> 是舞台、灯光、演员（负责把 3D 画出来）<br>
        <em>Anime.js</em> 是导演（负责喊「第3秒旋转、第5秒变形、跟着滚动同步」）<br>
        两者分工明确，缺一不可。
      </p>
    </div>

    <div class="card">
      <div class="card-title"><span class="dot" style="background:var(--accent)"></span>Three.js 是什么</div>
      <div class="card-body">
        <p style="margin-bottom:8px">Three.js 是浏览器里最流行的 <strong style="color:var(--txt)">3D 渲染库</strong>，底层用 WebGL（显卡加速）</p>
        <p style="margin-bottom:8px">它的职责：管理<strong style="color:var(--txt)">场景、摄像机、灯光、网格模型、材质</strong></p>
        <p>每帧调用 <code style="font-family:var(--mono);font-size:11px;color:var(--accent)">renderer.render(scene, camera)</code> 就能把 3D 画面输出到 canvas</p>
      </div>
    </div>

    <canvas id="cv-3d-arch" class="diagram" height="200"></canvas>
    <p class="diagram-caption">官网 3D 动效的技术栈拆解</p>

    <div class="card">
      <div class="card-title"><span class="dot" style="background:var(--green)"></span>GLB 模型文件是什么</div>
      <div class="card-body">
        <p style="margin-bottom:8px"><strong style="color:var(--txt)">GLB</strong>（GL Binary）是 3D 模型的标准格式，相当于 3D 版的 JPG</p>
        <p style="margin-bottom:8px">官网的 22 个模型文件（<code style="font-family:var(--mono);font-size:11px;color:var(--accent)">assets/models/module-*.glb</code>）就是每个 API 模块对应的几何体</p>
        <p style="margin-bottom:8px">这些 GLB 文件还用了 <strong style="color:var(--txt)">Draco 压缩</strong>——一种专门给 3D 顶点数据设计的压缩算法，比 zip 压缩效率高 10 倍以上</p>
        <p>加载时需要 <code style="font-family:var(--mono);font-size:11px;color:var(--accent)">DRACOLoader</code> 解码，解码器本身是一段 WebAssembly（.wasm）文件，在浏览器里直接运行</p>
      </div>
    </div>

    <div class="card">
      <div class="card-title"><span class="dot" style="background:var(--orange)"></span>关键技术：Draco 压缩</div>
      <div class="card-body">
        <pre style="background:rgba(0,0,0,0.3);border-radius:8px;padding:12px;font-family:var(--mono);font-size:10.5px;line-height:1.65;color:rgba(255,255,255,0.55);overflow-x:auto;border:0.5px solid rgba(255,255,255,0.05)">// 加载 Draco 压缩的 GLB 模型（Three.js 代码）
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader';

const dracoLoader = new DRACOLoader();
// 指定解码器 WASM 文件的路径
dracoLoader.setDecoderPath('./assets/draco/');

const gltfLoader = new GLTFLoader();
gltfLoader.setDRACOLoader(dracoLoader);

// 加载模型
gltfLoader.load('assets/models/module-animate-01.glb', (gltf) => {
  scene.add(gltf.scene);
});</pre>
        <p style="margin-top:8px;color:var(--txt3);font-size:12px">💡 这是镜像修复时踩的真实坑：忘了放 draco/ 目录，模型全部加载失败但没报错</p>
      </div>
    </div>

    <div class="card">
      <div class="card-title"><span class="dot" style="background:var(--purple)"></span>Anime.js 怎么控制 3D 对象</div>
      <div class="card-body">
        <p style="margin-bottom:8px">Three.js 的 3D 对象有 <code style="font-family:var(--mono);font-size:11px;color:var(--accent)">position.x/y/z</code>、<code style="font-family:var(--mono);font-size:11px;color:var(--accent)">rotation.x/y/z</code>、<code style="font-family:var(--mono);font-size:11px;color:var(--accent)">scale</code> 等数值属性</p>
        <p style="margin-bottom:8px">Anime.js 可以直接把这些数值作为动画目标——本质上只是「改数字」</p>
        <pre style="background:rgba(0,0,0,0.3);border-radius:8px;padding:12px;font-family:var(--mono);font-size:10.5px;line-height:1.65;color:rgba(255,255,255,0.55);overflow-x:auto;border:0.5px solid rgba(255,255,255,0.05)">// Anime.js 控制 Three.js 对象旋转
anime({
  targets: mesh.rotation,   // ← 直接传 Three.js 对象的属性
  y: Math.PI * 2,           // 旋转一圈
  duration: 4000,
  easing: 'linear',
  loop: true
});

// 控制位置
anime({
  targets: mesh.position,
  y: [0, 2, 0],             // 上下浮动
  duration: 2000,
  easing: 'easeInOutSine',
  loop: true,
  direction: 'alternate'
});</pre>
      </div>
    </div>

    <div class="analogy">
      <div class="analogy-icon">🔬</div>
      <p>
        核心秘密：Anime.js 不在乎你给它的是 DOM 元素还是 3D 对象——<br>
        <em>它只管改数字</em>。只要是数值属性，它都能动画化。<br>
        这就是它能跟任何库配合的原因。
      </p>
    </div>
  `;

  // Draw 3D architecture diagram
  requestAnimationFrame(() => {
    const cv = document.getElementById('cv-3d-arch');
    if (!cv) return;
    cv.width = cv.parentElement.offsetWidth || 372;
    const W = cv.width, H = cv.height;
    const ctx = cv.getContext('2d');
    ctx.fillStyle = '#0d1015'; ctx.fillRect(0, 0, W, H);

    const items = [
      { x: 0.1, y: 0.15, w: 0.35, h: 0.22, label: 'GLB 模型文件', sub: '22个 Draco 压缩', color: '#c8a96e', conn: [1] },
      { x: 0.55, y: 0.15, w: 0.35, h: 0.22, label: 'DRACOLoader', sub: 'WASM 解码器', color: '#ff9f0a', conn: [2] },
      { x: 0.1, y: 0.55, w: 0.35, h: 0.22, label: 'Three.js', sub: '场景/摄像机/渲染', color: '#30d158', conn: [3] },
      { x: 0.55, y: 0.55, w: 0.35, h: 0.22, label: 'Anime.js', sub: '旋转/位移/缓动', color: '#4f8fff', conn: [4] },
      { x: 0.25, y: 0.82, w: 0.5, h: 0.13, label: 'Canvas (WebGL)', sub: '用户看到的画面', color: '#bf5af2', conn: [] },
    ];

    // draw connections first
    items.forEach((item, i) => {
      item.conn.forEach(j => {
        const src = items[i], dst = items[j];
        const x1 = (src.x + src.w/2) * W, y1 = (src.y + src.h) * H;
        const x2 = (dst.x + dst.w/2) * W, y2 = dst.y * H;
        ctx.strokeStyle = 'rgba(255,255,255,0.1)';
        ctx.lineWidth = 1;
        ctx.setLineDash([3,3]);
        ctx.beginPath(); ctx.moveTo(x1,y1); ctx.lineTo(x2,y2); ctx.stroke();
        ctx.setLineDash([]);
      });
    });
    // special connection: Three.js + Anime.js → Canvas
    [[2,4],[3,4]].forEach(([ai, bi]) => {
      const a = items[ai], b = items[4];
      const x1 = (a.x + a.w/2)*W, y1 = (a.y + a.h)*H;
      const x2 = (b.x + b.w/2)*W, y2 = b.y*H;
      ctx.strokeStyle = 'rgba(255,255,255,0.1)';
      ctx.setLineDash([3,3]);
      ctx.beginPath(); ctx.moveTo(x1,y1); ctx.lineTo(x2,y2); ctx.stroke();
      ctx.setLineDash([]);
    });

    // draw boxes
    items.forEach(item => {
      const bx = item.x*W, by = item.y*H, bw2 = item.w*W, bh2 = item.h*H;
      ctx.shadowColor = item.color; ctx.shadowBlur = 10;
      ctx.fillStyle = `rgba(${hexToRgb(item.color)},0.1)`;
      ctx.strokeStyle = `rgba(${hexToRgb(item.color)},0.5)`;
      ctx.lineWidth = 0.5;
      roundRect(ctx, bx, by, bw2, bh2, 7);
      ctx.fill(); ctx.stroke();
      ctx.shadowBlur = 0;

      ctx.fillStyle = item.color;
      ctx.font = `500 11px 'Space Grotesk',sans-serif`;
      ctx.textAlign = 'center';
      ctx.fillText(item.label, bx + bw2/2, by + bh2*0.42);

      ctx.fillStyle = 'rgba(255,255,255,0.3)';
      ctx.font = `9px 'JetBrains Mono',monospace`;
      ctx.fillText(item.sub, bx + bw2/2, by + bh2*0.75);
    });
  });
}

// ── Chapter 8: 动效架构拆解 ──
function renderCh8(wrap) {
  wrap.innerHTML = `
    <div class="ch-eyebrow">Chapter 08 — 看懂背后逻辑</div>
    <h2 class="ch-title">动效架构拆解</h2>
    <p class="ch-lead">
      一个复杂的动效网站，不是一堆动画代码随机堆在一起的。<br>
      它有清晰的架构——理解这个架构，你就能读懂任何动效代码。
    </p>

    <canvas id="cv-arch2" class="diagram" height="160"></canvas>
    <p class="diagram-caption">动效运行时架构 — 四个层级</p>

    <div class="card">
      <div class="card-title"><span class="dot" style="background:var(--accent)"></span>层级 1：Engine（引擎）</div>
      <div class="card-body">
        <p style="margin-bottom:8px">Anime.js V4 引入了独立的 <strong style="color:var(--txt)">Engine</strong> 概念——一个全局时钟，驱动所有动画同步</p>
        <p style="margin-bottom:8px">每个 <code style="font-family:var(--mono);font-size:11px;color:var(--accent)">requestAnimationFrame</code> 回调里，Engine 会更新所有正在播放的动画的当前进度</p>
        <p>你可以暂停整个引擎（全局 pause），让页面里所有动画同时冻结——Tab 切走时自动暂停就是这么实现的</p>
      </div>
    </div>

    <div class="card">
      <div class="card-title"><span class="dot" style="background:var(--green)"></span>层级 2：Animation（单个动画）</div>
      <div class="card-body">
        <p style="margin-bottom:8px">每个 <code style="font-family:var(--mono);font-size:11px;color:var(--accent)">anime({...})</code> 调用都创建一个 Animation 实例</p>
        <p style="margin-bottom:8px">它持有：目标对象引用、属性 Tween 列表、当前进度、缓动函数、完成回调</p>
        <pre style="background:rgba(0,0,0,0.3);border-radius:8px;padding:12px;font-family:var(--mono);font-size:10.5px;line-height:1.65;color:rgba(255,255,255,0.55);overflow-x:auto;border:0.5px solid rgba(255,255,255,0.05)">const anim = anime({
  targets: '.box',
  translateX: 300,
  autoplay: false  // 创建但先不播
});

// 手动控制
anim.play();
anim.pause();
anim.seek(500);   // 跳到第500ms
anim.reverse();   // 反转方向</pre>
      </div>
    </div>

    <div class="card">
      <div class="card-title"><span class="dot" style="background:var(--orange)"></span>层级 3：Tween（属性插值）</div>
      <div class="card-body">
        <p style="margin-bottom:8px">每个被动画化的属性对应一个 <strong style="color:var(--txt)">Tween</strong>——它知道起始值、结束值、如何插值</p>
        <p style="margin-bottom:8px">Anime.js V4 引入了<strong style="color:var(--txt)">关键帧数组</strong>，一个属性可以有多段 Tween：</p>
        <pre style="background:rgba(0,0,0,0.3);border-radius:8px;padding:12px;font-family:var(--mono);font-size:10.5px;line-height:1.65;color:rgba(255,255,255,0.55);overflow-x:auto;border:0.5px solid rgba(255,255,255,0.05)">anime({
  targets: '.box',
  translateX: [
    { to: 200, duration: 500, easing: 'easeOutQuad' },  // 第一段
    { to: 0,   duration: 800, easing: 'easeOutElastic' } // 第二段接着跑
  ]
});</pre>
      </div>
    </div>

    <div class="card">
      <div class="card-title"><span class="dot" style="background:var(--purple)"></span>层级 4：Observer（外部触发器）</div>
      <div class="card-body">
        <p style="margin-bottom:8px">ScrollObserver、Draggable 等不直接控制动画播放——而是<strong style="color:var(--txt)">修改动画的 seek 位置或触发 play</strong></p>
        <p>本质是把「外部输入（滚动量、鼠标位置）」转化成「动画进度数字」，然后喂给 Animation 的 seek 方法</p>
      </div>
    </div>

    <div class="card">
      <div class="card-title"><span class="dot" style="background:var(--gold)"></span>官网的完整数据流</div>
      <div class="card-body">
        <pre style="background:rgba(0,0,0,0.3);border-radius:8px;padding:12px;font-family:var(--mono);font-size:10.5px;line-height:1.65;color:rgba(255,255,255,0.55);overflow-x:auto;border:0.5px solid rgba(255,255,255,0.05)">用户滚动
  → ScrollObserver 计算 progress (0→1)
    → anim.seek(progress * anim.duration)
      → Tween 用缓动函数计算当前值
        → 写入 mesh.rotation.y (Three.js 对象)
          → Three.js 下一帧 render 时用新值绘制
            → 用户看到模型转动了</pre>
      </div>
    </div>

    <div class="analogy">
      <div class="analogy-icon">🧠</div>
      <p>
        理解了这个架构，你就明白为什么：<br>
        • Anime.js 能控制任意对象（只要有数值属性）<br>
        • <em>暂停/恢复/反转</em>都是免费的（操控进度数字就行）<br>
        • 复杂的多对象同步效果，本质上只是<em>共享同一个进度源</em>
      </p>
    </div>
  `;

  requestAnimationFrame(() => {
    const cv = document.getElementById('cv-arch2');
    if (!cv) return;
    cv.width = cv.parentElement.offsetWidth || 372;
    const W = cv.width, H = cv.height;
    const ctx = cv.getContext('2d');
    ctx.fillStyle = '#0d1015'; ctx.fillRect(0, 0, W, H);

    const layers = [
      { label: 'Engine', sub: '全局时钟 · rAF 驱动', color: '#ff9f0a' },
      { label: 'Timeline / Animation', sub: '编排层 · 进度管理', color: '#4f8fff' },
      { label: 'Tween', sub: '属性插值 · 缓动计算', color: '#30d158' },
      { label: 'DOM / Three.js / 任意对象', sub: '最终写入目标', color: '#bf5af2' },
    ];
    const bw = W - 60, bh = 28, gapY = 8;
    const totalH = layers.length * bh + (layers.length-1)*gapY;
    let y0 = (H - totalH)/2;

    layers.forEach((l, i) => {
      const y = y0 + i*(bh+gapY);
      ctx.shadowColor = l.color; ctx.shadowBlur = (i===0||i===3) ? 12 : 6;
      ctx.fillStyle = `rgba(${hexToRgb(l.color)},${i===0?0.18:0.08})`;
      ctx.strokeStyle = `rgba(${hexToRgb(l.color)},${i===0?0.7:0.35})`;
      ctx.lineWidth = i===0 ? 1 : 0.5;
      roundRect(ctx, 30, y, bw, bh, 6);
      ctx.fill(); ctx.stroke();
      ctx.shadowBlur = 0;

      ctx.fillStyle = l.color;
      ctx.font = `500 11px 'Space Grotesk',sans-serif`;
      ctx.textAlign = 'left';
      ctx.fillText(l.label, 44, y+bh/2+4);
      ctx.fillStyle = 'rgba(255,255,255,0.25)';
      ctx.font = `9px 'JetBrains Mono',monospace`;
      ctx.textAlign = 'right';
      ctx.fillText(l.sub, W-44, y+bh/2+4);

      if (i < layers.length-1) {
        const ax = W/2, ay1 = y+bh+1, ay2 = ay1+gapY-1;
        ctx.strokeStyle = 'rgba(255,255,255,0.12)';
        ctx.setLineDash([2,3]);
        ctx.beginPath(); ctx.moveTo(ax,ay1); ctx.lineTo(ax,ay2); ctx.stroke();
        ctx.setLineDash([]);
        ctx.fillStyle = 'rgba(255,255,255,0.18)';
        ctx.beginPath();
        ctx.moveTo(ax,ay2+2); ctx.lineTo(ax-3,ay2-3); ctx.lineTo(ax+3,ay2-3);
        ctx.closePath(); ctx.fill();
      }
    });
  });
}

// ── Chapter 9: Timeline ──
function renderCh9(wrap) {
  wrap.innerHTML = `
    <div class="ch-eyebrow">Chapter 09 — 时间乐谱</div>
    <h2 class="ch-title">Timeline 编排</h2>
    <p class="ch-lead">
      一个有质感的页面，从不是所有元素「同时蹦出来」的。<br>
      Timeline 让你像作曲一样，精确安排每段动画什么时候开始、持续多久、和谁叠加。
    </p>

    <div class="analogy">
      <div class="analogy-icon">🎼</div>
      <p>
        想象一首弦乐四重奏的乐谱：<br>
        <em>大提琴</em>第0秒低音进场，<em>中提琴</em>第1秒跟进，<em>小提琴</em>第2秒加入高音，<em>钢琴</em>第3秒叠加旋律——<br>
        Timeline 做的就是这件事：<em>让多段动画有秩序地编排在同一条时间轴上</em>。
      </p>
    </div>

    <canvas id="cv-timeline" class="diagram" height="180"></canvas>
    <p class="diagram-caption">Timeline 可视化 — 5 个动画段在时间轴上的编排（循环播放）</p>

    <div class="card">
      <div class="card-title"><span class="dot" style="background:var(--green)"></span>Timeline 的三种偏移语法</div>
      <div class="card-body">
        <pre style="background:rgba(0,0,0,0.3);border-radius:8px;padding:12px;font-family:var(--mono);font-size:10.5px;line-height:1.65;color:rgba(255,255,255,0.55);overflow-x:auto;border:0.5px solid rgba(255,255,255,0.05)">const tl = anime.createTimeline({ defaults: { duration: 600 } });

tl
  // 1. 默认：接在上一段结束后
  .add('.title',   { opacity: [0,1], translateY: [30,0] })

  // 2. +=200 表示"上一段结束后再等 200ms"
  .add('.subtitle',{ opacity: [0,1] }, '+=200')

  // 3. -=300 表示"和上一段叠加，提前 300ms 开始"
  .add('.badge',   { scale: [0,1], easing: 'easeOutElastic' }, '-=300')

  // 4. 具体时间戳（ms）：精确到毫秒
  .add('.btn',     { opacity: [0,1], translateY: [20,0] }, 1500);</pre>
      </div>
    </div>

    <div class="card">
      <div class="card-title"><span class="dot" style="background:var(--accent)"></span>Timeline 的实用技巧</div>
      <div class="card-body">
        <p style="margin-bottom:8px">• <strong style="color:var(--txt)">defaults</strong>——在 createTimeline 里设置默认时长/缓动，避免重复写</p>
        <p style="margin-bottom:8px">• <strong style="color:var(--txt)">callbacks</strong>——<code style="font-family:var(--mono);font-size:11px;color:var(--accent)">onComplete</code> 在整条时间线结束后触发</p>
        <p style="margin-bottom:8px">• <strong style="color:var(--txt)">loop</strong>——整条时间线可以整体循环</p>
        <p>• <strong style="color:var(--txt)">与 ScrollObserver 结合</strong>——把 Timeline 的 autoplay 设为 false，再用 scroll 驱动 seek，实现滚动版剧情动画</p>
      </div>
    </div>

    <div class="card">
      <div class="card-title"><span class="dot" style="background:var(--orange)"></span>官网入场动画拆解</div>
      <div class="card-body">
        <p style="margin-bottom:8px">官网首屏的 Logo、标题、副标题、按钮——它们的出现顺序就是一条 Timeline：</p>
        <pre style="background:rgba(0,0,0,0.3);border-radius:8px;padding:12px;font-family:var(--mono);font-size:10.5px;line-height:1.65;color:rgba(255,255,255,0.55);overflow-x:auto;border:0.5px solid rgba(255,255,255,0.05)">// 伪代码还原官网入场 Timeline
anime.createTimeline()
  .add('.logo',    { opacity:[0,1], scale:[0.8,1] },    0)
  .add('.hero-h1', { opacity:[0,1], translateY:[40,0] },'+=100')
  .add('.hero-p',  { opacity:[0,1], translateY:[20,0] },'+=80')
  .add('.hero-btn',{ opacity:[0,1], scale:[0.9,1],
                     easing:'easeOutElastic' },          '+=60')
  .add('.nav',     { opacity:[0,1] },                   '-=400');</pre>
      </div>
    </div>

    <div class="analogy">
      <div class="analogy-icon">⏱️</div>
      <p>
        单个 <code style="color:var(--accent)">anime()</code> 是「一句台词」，Timeline 是「整场戏」。<br>
        当你需要让 3 个以上元素<em>有顺序地</em>出现或消失时，就应该用 Timeline 而不是多个独立 anime()——<br>
        否则 delay 会越调越乱，Timeline 是唯一优雅的解法。
      </p>
    </div>
  `;

  // Timeline visualization canvas
  let rafId9 = null, t9 = 0;
  requestAnimationFrame(function init() {
    const cv = document.getElementById('cv-timeline');
    if (!cv) return;
    cv.width = cv.parentElement.offsetWidth || 372;
    const W = cv.width, H = cv.height;
    const ctx = cv.getContext('2d');

    // Timeline segments: [start%, duration%, label, color]
    const segments = [
      { start: 0,    dur: 0.28, label: '.logo',    color: '#c8a96e' },
      { start: 0.18, dur: 0.22, label: '.title',   color: '#4f8fff' },
      { start: 0.32, dur: 0.20, label: '.subtitle',color: '#30d158' },
      { start: 0.42, dur: 0.25, label: '.badge',   color: '#bf5af2' },
      { start: 0.55, dur: 0.30, label: '.button',  color: '#ff9f0a' },
    ];

    const CYCLE = 240;
    const trackY0 = 28, trackH2 = 22, trackGap = 8;
    const timelineX = 24, timelineW = W - 48;

    function draw() {
      ctx.clearRect(0, 0, W, H);
      ctx.fillStyle = '#0d1015'; ctx.fillRect(0, 0, W, H);

      const globalProgress = (t9 % CYCLE) / CYCLE;

      // Time axis
      ctx.strokeStyle = 'rgba(255,255,255,0.06)';
      ctx.lineWidth = 0.5;
      const axisY = H - 18;
      ctx.beginPath(); ctx.moveTo(timelineX, axisY); ctx.lineTo(timelineX+timelineW, axisY); ctx.stroke();

      // Time markers
      for (let i = 0; i <= 5; i++) {
        const mx = timelineX + (i/5)*timelineW;
        ctx.fillStyle = 'rgba(255,255,255,0.2)';
        ctx.font = `8px 'JetBrains Mono',monospace`;
        ctx.textAlign = 'center';
        ctx.fillText((i/5*1.5).toFixed(1)+'s', mx, axisY+10);
        ctx.strokeStyle = 'rgba(255,255,255,0.05)';
        ctx.beginPath(); ctx.moveTo(mx, trackY0); ctx.lineTo(mx, axisY); ctx.stroke();
      }

      // Segments
      segments.forEach((seg, idx) => {
        const sx = timelineX + seg.start * timelineW;
        const sw = seg.dur * timelineW;
        const sy = trackY0 + idx*(trackH2+trackGap);
        const segEnd = seg.start + seg.dur;
        const active = globalProgress >= seg.start && globalProgress <= segEnd;
        const done = globalProgress > segEnd;
        const alpha = done ? 0.35 : (active ? 1 : 0.5);

        ctx.globalAlpha = alpha;
        ctx.shadowColor = seg.color; ctx.shadowBlur = active ? 10 : 0;
        ctx.fillStyle = `rgba(${hexToRgb(seg.color)},${active ? 0.3 : 0.1})`;
        ctx.strokeStyle = `rgba(${hexToRgb(seg.color)},${active ? 0.9 : 0.4})`;
        ctx.lineWidth = active ? 1 : 0.5;
        roundRect(ctx, sx, sy, sw, trackH2, 4);
        ctx.fill(); ctx.stroke();
        ctx.shadowBlur = 0;

        ctx.fillStyle = seg.color;
        ctx.font = `9px 'JetBrains Mono',monospace`;
        ctx.textAlign = 'left';
        ctx.fillText(seg.label, sx+5, sy+trackH2/2+3);
        ctx.globalAlpha = 1;
      });

      // Playhead
      const phX = timelineX + globalProgress * timelineW;
      ctx.strokeStyle = 'rgba(255,255,255,0.7)';
      ctx.lineWidth = 1.5;
      ctx.shadowColor = '#fff'; ctx.shadowBlur = 6;
      ctx.beginPath(); ctx.moveTo(phX, trackY0-4); ctx.lineTo(phX, axisY); ctx.stroke();
      ctx.shadowBlur = 0;
      // triangle top
      ctx.fillStyle = 'rgba(255,255,255,0.8)';
      ctx.beginPath();
      ctx.moveTo(phX, trackY0-4);
      ctx.lineTo(phX-5, trackY0-11);
      ctx.lineTo(phX+5, trackY0-11);
      ctx.closePath(); ctx.fill();

      t9++;
      rafId9 = requestAnimationFrame(draw);
    }
    draw();
    cv._stopAnim = () => { if (rafId9) cancelAnimationFrame(rafId9); };
  });
}
