// ══════════════════════════════════════════
// slides.js — 7 张课件幻灯片数据
// ══════════════════════════════════════════

window.SLIDES = [

// ── Slide 0: Cover ──────────────────────────────────
{
  id: 'cover',
  html: `
<div class="cover-slide">
  <div class="cover-kicker">Vibe Coding · 技术解析</div>
  <div class="cover-h1">WebGL<br><em>流体模拟</em><br>是怎么做的？</div>
  <div class="cover-lead">
    你现在看到的这个会流动的彩色液体，<br>
    不是视频，不是 GIF——它是实时在你的显卡里跑的物理计算。<br><br>
    这个课件带你从 <strong style="color:var(--txt)">原理 → 技术 → 复刻步骤</strong> 全部搞懂。
  </div>
  <div class="s-tags">
    <span class="s-tag blue">WebGL</span>
    <span class="s-tag green">流体力学</span>
    <span class="s-tag orange">GLSL 着色器</span>
    <span class="s-tag purple">Vibe Coding</span>
  </div>
  <div class="cover-meta">共 7 页 · 左侧可随时体验 · 向右滑动或点 →</div>
</div>
`
},

// ── Slide 1: 这是什么 ────────────────────────────────
{
  id: 'what',
  html: `
<div class="s-eyebrow">第 1 页 · 这是什么</div>
<div class="s-title">你眼前的「液体」<br>到底是什么？</div>
<div class="s-sub">先搞清楚你在体验的东西，再谈怎么做。</div>

<div class="s-card">
  <div class="s-card-title">
    <span style="color:var(--blue)">●</span> 不是视频，是实时计算
  </div>
  <div class="s-card-body">
    每一帧（1/60秒）屏幕都在重新计算几十万个点的速度和颜色。
    你的每次拖动都是真实的「力」，液体会对它做出物理响应。
  </div>
</div>

<div class="s-card">
  <div class="s-card-title">
    <span style="color:var(--green)">●</span> 运行在 GPU 里，不是 CPU
  </div>
  <div class="s-card-body">
    普通 JS 代码跑在 CPU（一核一核地算）。<br>
    这个程序通过 <strong>WebGL</strong> 把计算扔给显卡，显卡有几千个核心<strong>同时并行</strong>算，所以才能这么流畅。
  </div>
</div>

<div class="s-card">
  <div class="s-card-title">
    <span style="color:var(--orange)">●</span> 背后的数学：Navier-Stokes 方程
  </div>
  <div class="s-card-body">
    流体力学里最著名的方程，描述液体/气体怎么流动。<br>
    听起来很难？程序帮你全部算好了，你只需要理解「它在模拟真实流体」。
  </div>
</div>

<div class="s-tip">
  <span class="s-tip-icon">💡</span>
  现在去左边用鼠标慢慢划一个圆——感受液体被带动的惯性。
</div>
`
},

// ── Slide 2: 技术栈 ──────────────────────────────────
{
  id: 'tech',
  html: `
<div class="s-eyebrow">第 2 页 · 用了什么技术</div>
<div class="s-title">三层技术叠在一起</div>
<div class="s-sub">从外到内拆开看，每一层都有它的分工。</div>

<div class="s-card">
  <div class="s-card-title">① HTML Canvas</div>
  <div class="s-card-body">
    就是网页里一个 <code>&lt;canvas&gt;</code> 标签，相当于一块画布。<br>
    WebGL 把渲染结果画在这块画布上，你才能看到。
  </div>
</div>

<div class="s-card">
  <div class="s-card-title">② WebGL（Web Graphics Library）</div>
  <div class="s-card-body">
    浏览器提供的 3D 绘图接口，可以直接控制显卡。<br>
    它的核心是：把<strong>数据传给 GPU</strong>，让 GPU 跑「着色器程序」，
    结果直接画在屏幕上。一行 CPU 代码 → 几千核 GPU 并行执行。
  </div>
</div>

<div class="s-card">
  <div class="s-card-title">③ GLSL 着色器（Shader）</div>
  <div class="s-card-body">
    跑在 GPU 上的小程序，写法像 C 语言。<br>
    这个项目里有 <strong>20+ 个着色器</strong>，分别负责：<br>
    · 计算速度场 → · 扩散颜色 → · 处理压力 → · 最终渲染发光效果
  </div>
</div>

<div class="s-card">
  <div class="s-card-title">④ JavaScript（粘合剂）</div>
  <div class="s-card-body">
    JS 不做计算，只做<strong>调度</strong>：<br>
    接收鼠标位置 → 告诉 WebGL 在哪里「泼一滴颜料」→ 每帧触发一次完整的模拟循环。
  </div>
</div>
`
},

// ── Slide 3: 工作原理 ────────────────────────────────
{
  id: 'how',
  html: `
<div class="s-eyebrow">第 3 页 · 工作原理</div>
<div class="s-title">每帧发生了什么？</div>
<div class="s-sub">液体模拟的核心循环，每秒重复 60 次。</div>

<ol class="s-steps">
  <li>
    <span class="step-num">1</span>
    <div>
      <strong>输入：鼠标 / 触摸事件</strong><br>
      JS 把鼠标拖动距离转换成「速度向量」和「颜色」，通过 WebGL 写入 GPU 纹理。
    </div>
  </li>
  <li>
    <span class="step-num">2</span>
    <div>
      <strong>平流（Advection）</strong><br>
      每个格子里的流体，沿着速度方向「往前搬」。颜色和速度都做这一步，这就是为什么颜色会顺着流动。
    </div>
  </li>
  <li>
    <span class="step-num">3</span>
    <div>
      <strong>扩散（Diffusion）</strong><br>
      速度和颜色会慢慢向周围扩散、衰减，模拟黏性（viscosity）。
    </div>
  </li>
  <li>
    <span class="step-num">4</span>
    <div>
      <strong>压力求解（Pressure）</strong><br>
      流体必须是「不可压缩的」（不能凭空消失），用 20 次迭代求解压力场来纠正速度。这是最贵的一步。
    </div>
  </li>
  <li>
    <span class="step-num">5</span>
    <div>
      <strong>Bloom + 光线散射（Sunrays）</strong><br>
      后处理效果：让亮色发光晕染，让整体看起来像发光液体。
    </div>
  </li>
  <li>
    <span class="step-num">6</span>
    <div>
      <strong>渲染到屏幕</strong><br>
      最终把颜色纹理画到 canvas 上，你就看到这一帧了。
    </div>
  </li>
</ol>
`
},

// ── Slide 4: 参数解读 ────────────────────────────────
{
  id: 'params',
  html: `
<div class="s-eyebrow">第 4 页 · 参数解读</div>
<div class="s-title">右上角那些数字<br>是什么意思？</div>
<div class="s-sub">去左边面板调一个，马上能看到变化。</div>

<div class="s-params">
  <div class="s-param">
    <div class="s-param-name">density diffusion</div>
    <div class="s-param-val">颜色消散速度</div>
    <div class="s-param-desc">越大颜色消失越快，调到 4 试试</div>
  </div>
  <div class="s-param">
    <div class="s-param-name">velocity diffusion</div>
    <div class="s-param-val">流速衰减速度</div>
    <div class="s-param-desc">接近 0 = 永不停止的湍流</div>
  </div>
  <div class="s-param">
    <div class="s-param-name">pressure</div>
    <div class="s-param-val">压力迭代强度</div>
    <div class="s-param-desc">越高流体越「弹」，有弹性感</div>
  </div>
  <div class="s-param">
    <div class="s-param-name">vorticity</div>
    <div class="s-param-val">涡旋强度</div>
    <div class="s-param-desc">调到 50+ 会产生卷曲的螺旋</div>
  </div>
  <div class="s-param">
    <div class="s-param-name">splat radius</div>
    <div class="s-param-val">笔触半径</div>
    <div class="s-param-desc">每次拖动倒入的「颜料量」</div>
  </div>
  <div class="s-param">
    <div class="s-param-name">sim resolution</div>
    <div class="s-param-val">模拟精度</div>
    <div class="s-param-desc">越高越细腻，越吃 GPU 性能</div>
  </div>
</div>

<div class="s-tip">
  <span class="s-tip-icon">💡</span>
  试试：vorticity 调到 80，velocity diffusion 调到 0.01——流体会变成永不平静的漩涡。
</div>
`
},

// ── Slide 5: Vibe Coding 复刻步骤 ───────────────────
{
  id: 'vibecode',
  html: `
<div class="s-eyebrow">第 5 页 · Vibe Coding 复刻</div>
<div class="s-title">怎么自己做一个？</div>
<div class="s-sub">不需要懂流体力学，这是 Vibe Coding 的魔法。</div>

<ol class="s-steps">
  <li>
    <span class="step-num">1</span>
    <div>
      <strong>找到开源源码</strong><br>
      GitHub 搜 <code>WebGL fluid simulation</code>，原作者 Pavel Dobryakov 的版本是最经典的，MIT 开源可以直接用。
    </div>
  </li>
  <li>
    <span class="step-num">2</span>
    <div>
      <strong>Fork 到自己的仓库</strong><br>
      在 GitHub 点 Fork → 改成自己的名字。开启 GitHub Pages，立刻就有一个公开链接。
    </div>
  </li>
  <li>
    <span class="step-num">3</span>
    <div>
      <strong>读懂 config 对象，改默认参数</strong><br>
      <code>script.js</code> 最上面有一个 <code>config</code> 对象，改 <code>CURL</code>/<code>SPLAT_RADIUS</code> 等默认值，让页面打开就有你想要的风格。
    </div>
  </li>
  <li>
    <span class="step-num">4</span>
    <div>
      <strong>用 AI 加自己的功能</strong><br>
      把 <code>script.js</code> 粘给 Claude/GPT，说「帮我加手势控制」「开场自动播放彩色 splat」，AI 会直接改代码。
    </div>
  </li>
  <li>
    <span class="step-num">5</span>
    <div>
      <strong>嵌入自己的项目</strong><br>
      用 <code>&lt;iframe&gt;</code> 就能把它嵌进任何网页——就像你现在看到的左侧。
    </div>
  </li>
</ol>
`
},

// ── Slide 6: Evans 版本 ──────────────────────────────
{
  id: 'evans',
  html: `
<div class="s-eyebrow">第 6 页 · Evans 版本改动</div>
<div class="s-title">这个版本做了<br>哪些定制？</div>
<div class="s-sub">在原版基础上加了手势控制层。</div>

<div class="s-card">
  <div class="s-card-title">
    <span style="color:var(--blue)">●</span> MediaPipe 手势识别
  </div>
  <div class="s-card-body">
    通过摄像头实时检测手部骨架（21个关键点），
    把手指位置转换成流体的「splat」坐标。
    不用触摸屏幕，在空气中挥手就能控制液体。
  </div>
</div>

<div class="s-card">
  <div class="s-card-title">
    <span style="color:var(--green)">●</span> 双通道注入
  </div>
  <div class="s-card-body">
    手势速度 → 速度场（<code>_splatVelocityOnly</code>）<br>
    摄像头画面 → 颜色纹理（<code>dye.read.texture</code>）<br>
    让流体的颜色里带着真实人像的影子。
  </div>
</div>

<div class="s-card">
  <div class="s-card-title">
    <span style="color:var(--orange)">●</span> 粒子球叠加
  </div>
  <div class="s-card-body">
    首页另有一个 WebGL 粒子球场景（Evans-home），
    用 Three.js 渲染，两极密集赤道稀疏的分布
    + 聚簇扰动算法，产生有机感的球体。
  </div>
</div>

<div class="s-tip">
  <span class="s-tip-icon">💡</span>
  整个项目的核心思路：<strong>找成熟开源 + AI 改造 + 自己的叙事层</strong>。技术不需要从零写，但用法和组合方式是你的。
</div>

<div class="s-divider"></div>
<div style="font-size:11px; color: var(--txt3); line-height:1.8;">
  源码：github.com/Evenna/WebGL-Fluid-Simulation<br>
  原作者：Pavel Dobryakov（MIT License）
</div>
`
},

];
