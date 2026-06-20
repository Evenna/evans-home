// r1.js — 章节 1-3 渲染函数

function renderCh1(el) {
  el.innerHTML = `
<div class="section">
  <div class="box blue">
    <strong>👆 左边就是真实网站，直接点击交互。</strong><br>
    试着往下滚动，观察文字是怎么出现的；试着把鼠标移到按钮上，看看有没有动画效果。先玩 1 分钟，再继续看讲解。
  </div>
</div>

<div class="section">
  <h3>你刚才看到了什么</h3>
  <div class="checklist">
    <div class="ci"><div class="ci-icon ok">✓</div><span>标题文字一个一个字母「飞进来」</span></div>
    <div class="ci"><div class="ci-icon ok">✓</div><span>滚动时，每个功能卡片依次淡出来</span></div>
    <div class="ci"><div class="ci-icon ok">✓</div><span>鼠标悬停时，元素有弹性的缩放</span></div>
    <div class="ci"><div class="ci-icon ok">✓</div><span>颜色、位置、透明度 — 所有东西都在「动」</span></div>
  </div>
</div>

<div class="section">
  <h3>这些效果是怎么来的</h3>
  <div class="analogy">
    <div class="analogy-icon">🎬</div>
    <div class="analogy-label">类比</div>
    <p>你在 PowerPoint 里给每张幻灯片加「进入动画」——点一下，文字飞进来，图片淡出来。<br><br>
    <em>Anime.js 就是网页版的「幻灯片动画面板」。</em><br><br>
    只不过它比 PPT 强100倍：可以精确控制每一毫秒、可以跟鼠标互动、可以根据滚动触发。</p>
  </div>
</div>

<div class="section">
  <h3>这个网站本身就是最好的演示</h3>
  <div class="hgrid">
    <div class="hcard">
      <div class="hc-icon">🧩</div>
      <div class="hc-title">官网即作品集</div>
      <div class="hc-body">animejs.com 用自己的库做的，每个特效都是真实案例</div>
    </div>
    <div class="hcard">
      <div class="hc-icon">👁</div>
      <div class="hc-title">设计语言</div>
      <div class="hc-body">极简黑白、精准克制 — 动画只为强调内容，不是炫技</div>
    </div>
  </div>
</div>`;
}

// ─────────────────────────────────────────
function renderCh2(el) {
  el.innerHTML = `
<div class="section">
  <h3>一句话定义</h3>
  <div class="analogy">
    <div class="analogy-icon">🎭</div>
    <div class="analogy-label">核心类比</div>
    <p>网页上的所有东西（文字、图片、按钮）默认都是<em>静止不动的纸片</em>。<br><br>
    Anime.js 是一个<em>「让纸片动起来的遥控器」</em>：你告诉它「这个方块，0.8秒内，从左边滑到右边，用弹性曲线」——它就帮你算出中间每一帧的位置，然后一帧一帧画出来。</p>
  </div>
</div>

<div class="section">
  <h3>跟普通方法有什么区别</h3>
  <div class="vs">
    <div class="vs-col bad">
      <h4>❌ 没有 Anime.js</h4>
      <p>自己写：每 16ms 算一次位置，考虑缓动，考虑暂停/继续，考虑多个动画同步……</p>
    </div>
    <div class="vs-col good">
      <h4>✓ 有 Anime.js</h4>
      <p>告诉它目标和时长，它帮你搞定一切。3 行完成一个丝滑动画。</p>
    </div>
  </div>
</div>

<div class="section">
  <h3>它是一个「库」，不是一个「工具」</h3>
  <div class="box gold">
    <strong>「库」是什么？</strong><br>
    想象你要盖一栋楼，「砖头」你要自己搬，「库」就是帮你批量订砖、送到工地的服务。你只需要说「要多少块」，不用管运输细节。<br><br>
    Anime.js 是别人写好的动画代码合集，你直接拿来用，不用从零造。
  </div>
</div>

<div class="section">
  <h3>它在整个技术栈里的位置</h3>
  <div class="vis" id="vis-stack">
    <canvas id="cv-stack" height="130"></canvas>
    <div class="vis-caption">Anime.js 运行在浏览器里，直接操控 HTML 元素和 CSS 属性</div>
  </div>
</div>

<div class="section">
  <h3>用数字感受一下它的规模</h3>
  <div class="hgrid">
    <div class="hcard">
      <div class="hc-icon">⭐</div>
      <div class="hc-title">52,000+ GitHub Stars</div>
      <div class="hc-body">相当于全球5万多个开发者给它点了赞</div>
    </div>
    <div class="hcard">
      <div class="hc-icon">📦</div>
      <div class="hc-title">极轻量</div>
      <div class="hc-body">整个库只有不到 20KB，比一张低质量照片还小</div>
    </div>
    <div class="hcard">
      <div class="hc-icon">🕐</div>
      <div class="hc-title">v4 全新重写</div>
      <div class="hc-body">2024年重写，速度提升 10 倍，这个网站展示的就是 v4</div>
    </div>
    <div class="hcard">
      <div class="hc-icon">🔧</div>
      <div class="hc-title">零依赖</div>
      <div class="hc-body">不需要 React、Vue 或任何其他框架，单独使用即可</div>
    </div>
  </div>
</div>`;

  requestAnimationFrame(() => {
    const cv = document.getElementById('cv-stack');
    if (!cv) return;
    cv.width = cv.parentElement.offsetWidth || 382;
    cv.height = 130;
    const ctx = cv.getContext('2d');
    const w = cv.width, h = cv.height;
    ctx.fillStyle = '#13161c';
    ctx.fillRect(0, 0, w, h);

    const layers = [
      { label: '浏览器 (Chrome / Firefox)', color: 'rgba(79,143,255,0.25)', border: '#4f8fff' },
      { label: 'HTML + CSS  ←  你的网页内容', color: 'rgba(48,209,88,0.15)', border: '#30d158' },
      { label: '✨ Anime.js  ←  让内容动起来', color: 'rgba(191,90,242,0.25)', border: '#bf5af2' },
    ];
    const bh = 30, gap = 8, startY = (h - (layers.length * bh + (layers.length - 1) * gap)) / 2;
    layers.forEach((l, i) => {
      const y = startY + i * (bh + gap);
      const bw = w - 48;
      const x = 24;
      ctx.fillStyle = l.color;
      ctx.strokeStyle = l.border;
      ctx.lineWidth = 0.5;
      ctx.beginPath();
      ctx.roundRect(x, y, bw, bh, 7);
      ctx.fill();
      ctx.stroke();
      ctx.fillStyle = '#e8e6e0';
      ctx.font = '12px "Space Grotesk", sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText(l.label, x + bw / 2, y + 19);
    });
  });
}

// ─────────────────────────────────────────
function renderCh3(el) {
  el.innerHTML = `
<div class="section">
  <h3>工具箱总览</h3>
  <div class="box blue">
    Anime.js v4 有 <strong>6 大核心模块</strong>，就像一个完整的动画工作室。下面用类比，把每个模块讲清楚。
  </div>
</div>

<div class="section">
  <h3>① Animation — 动画机器</h3>
  <div class="analogy">
    <div class="analogy-icon">🏃</div>
    <div class="analogy-label">类比</div>
    <p>你设定了一个跑步计划：「从 A 点跑到 B 点，用 2 秒，先快后慢」。<br><br>
    <em>Animation 模块</em>就是执行这个计划的人——你告诉它「这个方块，透明度从 0 变到 1，用 600ms」，它就自动计算每一帧该是多少，然后执行。</p>
  </div>
</div>

<div class="section">
  <h3>② Timeline — 乐谱</h3>
  <div class="analogy">
    <div class="analogy-icon">🎼</div>
    <div class="analogy-label">类比</div>
    <p>乐队演奏一首曲子：钢琴在第 0 秒进，小提琴在第 3 秒进，鼓在第 5 秒进。<br><br>
    <em>Timeline 模块</em>就是这张乐谱——你把多个动画排在时间轴上，精确控制「第几秒谁开始动、谁结束」。多个东西配合起来的复杂效果就靠它。</p>
  </div>
</div>

<div class="section">
  <h3>③ Stagger — 骨牌效应</h3>
  <div class="analogy">
    <div class="analogy-icon">🀄</div>
    <div class="analogy-label">类比</div>
    <p>你把100张扑克牌竖着排成一排，推倒第一张，后面依次倒下，有一个延迟间隔。<br><br>
    <em>Stagger 模块</em>就是这个骨牌机制——你有100个方块，一行代码让它们依次延迟 50ms 动起来，形成波浪效果。animejs.com 首页那个字母飞入就是这样做的。</p>
  </div>
</div>

<div class="section">
  <h3>④ Scroll Observer — 路灯感应器</h3>
  <div class="analogy">
    <div class="analogy-icon">🔦</div>
    <div class="analogy-label">类比</div>
    <p>有些路灯有感应器：人走近就亮，人离开就灭。<br><br>
    <em>Scroll Observer</em> 就是这个感应器——你滚动到某个区域，绑定的动画就触发；滚过去了，可以让它反向播放。网站上那种「越滚越出现」的效果就是它。</p>
  </div>
</div>

<div class="section">
  <h3>⑤ Draggable — 手感物理</h3>
  <div class="analogy">
    <div class="analogy-icon">🧲</div>
    <div class="analogy-label">类比</div>
    <p>你拖动一个磁铁，松手后它弹回到固定位置，带着惯性，甚至可以甩飞出去。<br><br>
    <em>Draggable 模块</em>让 HTML 元素可以被拖拽，并且内置物理感：惯性滑动、回弹、吸附到格子。做卡片滑动、拖拽排序都用它。</p>
  </div>
</div>

<div class="section">
  <h3>⑥ SVG 工具组 — 向量画笔</h3>
  <div class="analogy">
    <div class="analogy-icon">✏️</div>
    <div class="analogy-label">类比</div>
    <p>在纸上画一条线：先看到笔尖，然后线逐渐延伸，最后画完。<br><br>
    <em>SVG 模块</em>可以让网页上的矢量图形「被画出来」——Logo 动态描边、路径动画、形状变形都靠它。</p>
  </div>
</div>

<div class="section">
  <div class="box green">
    <strong>关键认知：</strong>你不需要同时用全部 6 个模块。<br>
    大部分项目只用 Animation + Timeline，其他模块按需加。
  </div>
</div>`;
}
