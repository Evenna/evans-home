// r3.js — Chapters 10, 11, 12

function renderCh10(wrap) {
  const milestones = [
    { n: 1, title: '引入 CDN，Hello Anime', color: '#4f8fff',
      desc: '一行代码引入 Anime.js，创建一个蓝色方块，让它从左移到右。确认整个链路通了。',
      time: '15 分钟' },
    { n: 2, title: '缓动曲线对比', color: '#30d158',
      desc: '两个方块，一个 linear，一个 easeOutElastic，同时播放。亲眼看到「有灵魂」的差距。',
      time: '20 分钟' },
    { n: 3, title: 'Stagger 列表', color: '#ff9f0a',
      desc: '创建 8 个卡片，用 anime.stagger(80) 让它们依次从下方滑入。感受骨牌效果。',
      time: '25 分钟' },
    { n: 4, title: 'Timeline 入场动画', color: '#bf5af2',
      desc: '标题 → 副标题 → 按钮，三段动画用 Timeline 编排，像电影片头一样顺序出现。',
      time: '30 分钟' },
    { n: 5, title: 'Scroll Observer', color: '#c8a96e',
      desc: '让页面有 3 个 section，每个 section 滚动进入视野时才出现。绑定滚动触发。',
      time: '30 分钟' },
    { n: 6, title: 'Draggable 可拖组件', color: '#ff6b6b',
      desc: '让一个卡片可以拖动，松手后弹回原位（spring 缓动）。感受物理感。',
      time: '25 分钟' },
    { n: 7, title: 'SVG 路径绘制', color: '#4f8fff',
      desc: '一段 SVG 路径从无到有被「画出来」，模拟签名或图表绘制效果。',
      time: '30 分钟' },
    { n: 8, title: '整合完整展示页', color: '#30d158',
      desc: '把前7步整合成一个完整页面：首屏入场 + 卡片 Stagger + 滚动触发 + 可拖组件。',
      time: '45 分钟' },
  ];

  wrap.innerHTML = `
    <div class="ch-eyebrow">Chapter 10 — 8个里程碑</div>
    <h2 class="ch-title">怎么开始做</h2>
    <p class="ch-lead">
      不需要「先学完再做」。这 8 个里程碑，每一步都能独立运行看到效果。<br>
      总时间约 3.5 小时，全程配合 AI 完成，不需要自己想代码。
    </p>

    <div class="analogy">
      <div class="analogy-icon">🗺️</div>
      <p>
        Vibe Coding 铁律：<em>每走一步就必须能在浏览器里看到结果</em>。<br>
        不要闷头写完再看。跑不起来你不知道哪里错了，越积越难排查。<br>
        每个里程碑完成后，<em>打开浏览器确认，然后再继续</em>。
      </p>
    </div>

    <canvas id="cv-road" class="diagram" height="70"></canvas>
    <p class="diagram-caption">8 步路线图 — 每步可独立运行，总时长约 3.5 小时</p>

    <ul class="milestone-list">
      ${milestones.map(m => `
      <li class="milestone-item">
        <div class="milestone-num" style="background:rgba(${hexToRgb(m.color)},0.12);color:${m.color};border-color:rgba(${hexToRgb(m.color)},0.3)">${m.n}</div>
        <div class="milestone-text">
          <strong>${m.title}</strong>
          <span style="font-family:var(--mono);font-size:10px;color:var(--txt3);margin-left:8px">${m.time}</span>
          <br>${m.desc}
        </div>
      </li>`).join('')}
    </ul>

    <div class="card">
      <div class="card-title"><span class="dot" style="background:var(--accent)"></span>Vibe Coding 配套工具</div>
      <div class="card-body">
        <p style="margin-bottom:7px">• <strong style="color:var(--txt)">编辑器</strong>：VS Code（免费）+ Live Server 插件（保存自动刷新）</p>
        <p style="margin-bottom:7px">• <strong style="color:var(--txt)">AI</strong>：Claude / ChatGPT / Cursor——随时粘贴代码问问题</p>
        <p>• <strong style="color:var(--txt)">调试</strong>：Chrome DevTools（F12），Console 看报错，Elements 看元素</p>
      </div>
    </div>
  `;

  requestAnimationFrame(function init() {
    const cv = document.getElementById('cv-road');
    if (!cv) return;
    cv.width = cv.parentElement.offsetWidth || 372;
    const W = cv.width, H = cv.height;
    const ctx = cv.getContext('2d');
    const N = milestones.length;
    const bw = (W - 48 - (N-1)*6) / N;
    const bh = 34, y0 = (H-bh)/2;

    ctx.fillStyle = '#0d1015'; ctx.fillRect(0, 0, W, H);
    milestones.forEach((m, i) => {
      const x = 24 + i*(bw+6);
      ctx.fillStyle = `rgba(${hexToRgb(m.color)},0.12)`;
      ctx.strokeStyle = `rgba(${hexToRgb(m.color)},0.4)`;
      ctx.lineWidth = 0.5;
      roundRect(ctx, x, y0, bw, bh, 5);
      ctx.fill(); ctx.stroke();
      ctx.fillStyle = m.color;
      ctx.font = `bold 12px 'Space Grotesk',sans-serif`;
      ctx.textAlign = 'center';
      ctx.fillText(m.n, x+bw/2, y0+bh/2+5);
      if (i < N-1) {
        const ax = x+bw+1, ay = y0+bh/2;
        ctx.fillStyle = 'rgba(255,255,255,0.12)';
        ctx.beginPath();
        ctx.moveTo(ax+4, ay); ctx.lineTo(ax-1, ay-3); ctx.lineTo(ax-1, ay+3);
        ctx.closePath(); ctx.fill();
      }
    });
  });
}

function renderCh11(wrap) {
  const prompts = [
    {
      step: '里程碑 1 — 引入 CDN + 第一个动画',
      text: `帮我创建一个 index.html，要求：
1. 用 CDN 引入 Anime.js：https://cdn.jsdelivr.net/npm/animejs@4/lib/anime.iife.min.js
2. 页面有一个蓝色方块（id="box"），宽高各 60px，绝对居中
3. 页面加载后，方块从 translateX(0) 动画到 translateX(300px)
4. 时长 1200ms，缓动用 easeOutQuad
5. 动画结束后 console.log("✅ 动画完成")

只给我完整的 index.html，不需要解释。`
    },
    {
      step: '里程碑 2 — 缓动曲线对比',
      text: `帮我在现有 index.html 基础上修改，展示缓动曲线对比：
1. 两个方块，蓝色用 linear，紫色用 easeOutElastic
2. 页面上有"播放"按钮，点击后两个方块同时从左移到右
3. 能明显看出速度节奏的差异
4. 播放完后方块回到起点，可以再次点击

只给我完整的 index.html。
我现在的代码是：[粘贴你当前的 index.html]`
    },
    {
      step: '里程碑 3 — Stagger 列表动画',
      text: `帮我在现有 index.html 基础上修改，做 Stagger 骨牌效果：
1. 8 个卡片，每个卡片有彩色背景和编号
2. 页面加载后，8 个卡片依次从下方升起并淡入出现
3. 用 anime.stagger(80) 实现，不要写 8 段重复代码
4. 动画完成后 3 秒自动重播（循环感）

只给我完整的 index.html。
我现在的代码是：[粘贴你当前的 index.html]`
    },
    {
      step: '里程碑 4 — Timeline 入场动画',
      text: `帮我在现有 index.html 基础上用 Anime.js Timeline 做入场动画：
1. 页面有：大标题（h1）、副标题（p）、一个按钮（button）
2. Timeline 顺序：h1 从下方淡入（0ms）→ 等150ms → p 淡入 → 等100ms → button 弹出（easeOutElastic）
3. 用 anime.createTimeline() 实现，不要用多个独立 anime() 加 delay
4. 整体入场感觉像电影片头

只给我完整的 index.html。
我现在的代码是：[粘贴你当前的 index.html]`
    },
    {
      step: '里程碑 5 — Scroll Observer 触发',
      text: `帮我在现有 index.html 基础上加滚动触发动画：
1. 页面有 3 个 section，每个足够高（至少 80vh）
2. 第一个 section 直接显示（不触发动画）
3. 第二、三个 section 的内容，滚动进入视野时才淡入出现（从下方 30px 滑入）
4. 用 anime.createScrollObserver() 实现
5. 滚动条要可以滚动（body overflow: auto）

只给我完整的 index.html。
我现在的代码是：[粘贴你当前的 index.html]`
    },
    {
      step: '里程碑 6 — Draggable 拖动弹回',
      text: `帮我在现有 index.html 基础上添加一个可拖动的卡片：
1. 一张卡片，可以被鼠标拖动
2. 松手后用弹性缓动弹回到原始位置（用 spring 缓动）
3. 拖动时有轻微的旋转感（随拖动方向倾斜）
4. 用 anime.createDraggable() 实现

只给我完整的 index.html。
我现在的代码是：[粘贴你当前的 index.html]`
    },
    {
      step: '里程碑 7 — SVG 路径绘制',
      text: `帮我在现有 index.html 基础上做一个 SVG 路径绘制动画：
1. 一个 SVG 图形（比如星形或箭头路径），初始时不可见
2. 动画触发后，路径像被「画出来」一样从头到尾逐渐出现
3. 用 strokeDashoffset 技术实现，配合 anime.setDashoffset
4. 时长 2000ms，easeInOutQuad 缓动

只给我完整的 index.html。
我现在的代码是：[粘贴你当前的 index.html]`
    },
    {
      step: '里程碑 8 — 整合完整展示页',
      text: `帮我把所有效果整合成一个完整的动效展示页，在现有代码基础上修改：
1. 首屏：大标题 + 副标题 + CTA 按钮，Timeline 入场动画（Hero Section）
2. 第二屏：6 个特性卡片，Stagger 骨牌出现（ScrollObserver 触发）
3. 第三屏：一段核心文案 + 一个数字计数器（从 0 计到 2024），ScrollObserver 触发
4. 第四屏：一个可拖动的互动展示区

设计要求：深色背景、现代感、配色统一（可以用你认为好看的方案）
技术要求：只用 CDN，不需要任何构建工具，一个 index.html 搞定一切

只给我完整的 index.html。
我现在的代码是：[粘贴你当前的 index.html]`
    },
  ];

  wrap.innerHTML = `
    <div class="ch-eyebrow">Chapter 11 — 即用提示词</div>
    <h2 class="ch-title">怎么跟 AI 说</h2>
    <p class="ch-lead">
      每个里程碑都配了一条可以直接复制给 AI 的 Prompt。<br>
      记得把最后一行「我现在的代码是：」后面换成你自己的代码。
    </p>

    <div class="analogy">
      <div class="analogy-icon">✍️</div>
      <p>
        好 Prompt 的三要素：<em>明确需求</em>（要做什么）+ <em>完整上下文</em>（当前代码）+ <em>输出格式</em>（只给我完整的 index.html）。<br>
        最后一条很重要——如果不说，AI 可能只给你一段代码片段，你不知道放哪里。
      </p>
    </div>

    ${prompts.map((p, i) => `
    <div class="prompt">
      <div class="prompt-lbl">${p.step}</div>
      <pre class="prompt-body" id="pb${i}">${escHtml(p.text)}</pre>
      <button class="copy-btn" onclick="copyPrompt(${i})">复制</button>
    </div>`).join('')}
  `;

  window._prompts = prompts.map(p => p.text);
}

function copyPrompt(i) {
  const btn = document.querySelectorAll('.prompt:not(.trap .prompt) .copy-btn')[i];
  navigator.clipboard.writeText(window._prompts[i]).then(() => {
    if (btn) {
      btn.textContent = '已复制 ✓';
      btn.classList.add('copied');
      setTimeout(() => { btn.textContent = '复制'; btn.classList.remove('copied'); }, 2000);
    }
  });
}

function renderCh12(wrap) {
  const traps = [
    {
      name: '白屏 / "anime is not defined"',
      cause: 'CDN 没加载成功，或者你的 JS 代码写在了 CDN script 标签之前，Anime.js 还没加载你就调用了它。',
      fix: `帮我检查这个 index.html，我遇到了「anime is not defined」的报错。
请确认并修复：
1. CDN script 标签必须在 </body> 之前，并且在所有使用 anime() 的代码之前
2. CDN 链接是否有效（换成：cdn.jsdelivr.net/npm/animejs@4/lib/anime.iife.min.js）
3. 检查是否有拼写错误（anime 不是 Anime 也不是 animejs）

修复后给我完整的 index.html。
我现在的代码是：[粘贴你的 index.html]`
    },
    {
      name: '动画只播一次，元素消失了',
      cause: '动画播完停在终点状态，而终点是 opacity: 0 或 translateX 跑出了屏幕。动画没问题，是你设置的终点值让元素不可见了。',
      fix: `我的 Anime.js 动画播完后元素消失不见了。
请帮我：
1. 检查动画的 to 值是否会让元素不可见（opacity:0 / scale:0 / translateX 超出屏幕）
2. 如果想出现后消失再出现：加 direction: 'alternate', loop: true
3. 如果只想播一次然后保持终点状态：确认终点是可见状态
4. 如果想播完回到起点：加 loop: true 或在 onComplete 回调里 seek(0)

修复后给我完整的 index.html。
我现在的代码是：[粘贴你的 index.html]`
    },
    {
      name: 'Stagger 所有元素同时动，没有依次效果',
      cause: '选择器只选中了一个元素（用了 #id 而不是 .class），或者 HTML 里只有一个元素，Anime.js 没有「多个目标」就无法产生时间差。',
      fix: `我的 Stagger 动画没有依次效果，所有元素同时动。
请帮我检查并修复：
1. 选择器是否选到了多个元素（用 .item 而不是 #item，或者 querySelectorAll）
2. HTML 里是否真的有多个相同 class 的元素
3. anime.stagger() 是否被正确传入 delay 参数（不是 duration）
4. 如果用的是数组 [el1, el2]，确认数组里不止一个元素

修复后给我完整的 index.html。
我现在的代码是：[粘贴你的 index.html]`
    },
    {
      name: '滚动触发在手机上不生效',
      cause: 'iOS Safari 对 scroll 事件有特殊处理，overflow 滚动容器设置不对，或者元素的高度/可见性判断条件在移动端有偏差。',
      fix: `我的 Anime.js 滚动触发动画在电脑上正常，手机上完全不生效。
请帮我：
1. 确认 ScrollObserver 绑定在正确的滚动容器上（通常是 document.documentElement 或有 overflow:auto 的父元素）
2. 在 iOS Safari 上，确保 body 或 html 没有 overflow:hidden 把页面锁死
3. 检查元素在移动端是否因为布局原因根本没有进入视口
4. 如果用了 touch-action，确认没有阻止滚动事件

修复后给我完整的 index.html，同时保持 PC 效果不变。
我现在的代码是：[粘贴你的 index.html]`
    },
    {
      name: 'AI 越改越乱，改了 A 坏了 B',
      cause: '每次只给 AI 一部分代码，AI 在猜上下文。越猜越多错误，代码越来越混乱，最终成了谁也看不懂的状态。',
      fix: `我的代码经过多次修改后出现了很多冲突，现在一团乱。
请帮我重构整理：
1. 保留所有现有功能（列一下你看到有哪些功能）
2. 清理重复、冲突、无用的代码
3. 重新整理 script 标签顺序（CDN 先，自己的代码后）
4. 把分散的 anime() 调用整理成有逻辑的结构
5. 给我一个干净、有注释的完整 index.html

这是我现在的完整代码（必须是完整的，不能只给片段！）：
[粘贴你的完整 index.html]`
    },
    {
      name: 'Timeline 动画顺序乱了',
      cause: '偏移量语法用错了：用了绝对时间戳但逻辑算错了，或者混用了 += 和绝对值导致顺序冲突。',
      fix: `我的 Anime.js Timeline 动画顺序不对，元素出现的顺序乱了。
请帮我检查 Timeline 代码：
1. 检查每个 .add() 的第三个参数（时间偏移）是否正确：
   - '+=200' 表示"上一段结束后再等 200ms"
   - '-=200' 表示"比上一段早 200ms 开始（叠加）"  
   - 数字 1500 表示"时间轴第 1500ms 时开始"
2. 确认 createTimeline 的 defaults.duration 是否影响了预期顺序
3. 按我描述的期望顺序重新排列：[描述你想要的顺序]

修复后给我完整的 index.html。
我现在的代码是：[粘贴你的 index.html]`
    },
  ];

  wrap.innerHTML = `
    <div class="ch-eyebrow">Chapter 12 — 小白必看</div>
    <h2 class="ch-title">会踩什么坑</h2>
    <p class="ch-lead">
      这 6 个坑，几乎每个做 Anime.js 的新手都会踩一遍。<br>
      提前知道，省一半时间。每个坑都附了可直接给 AI 的修复 Prompt。
    </p>

    ${traps.map((trap, i) => `
    <div class="trap">
      <div class="trap-name">坑 ${i + 1}：${escHtml(trap.name)}</div>
      <div class="trap-cause" style="margin-bottom:10px">${escHtml(trap.cause)}</div>
      <div class="prompt" style="margin-bottom:0">
        <div class="prompt-lbl">修复 Prompt — 直接复制给 AI</div>
        <pre class="prompt-body" id="tp${i}">${escHtml(trap.fix)}</pre>
        <button class="copy-btn" onclick="copyTrap(${i})">复制</button>
      </div>
    </div>`).join('')}

    <div class="analogy" style="margin-top:20px">
      <div class="analogy-icon">🏁</div>
      <p>
        恭喜完成全部 12 章！你现在有了做 Anime.js 动效所需的完整认知地图：<br>
        工具原理 → 6 大模块 → 缓动 / Stagger / Scroll → <em>3D 模型技术栈</em> → 动效架构 → Timeline → 实战路线 → AI Prompt → 常见坑<br><br>
        下一步：<em>打开 VS Code，新建 index.html，从里程碑 1 开始，一步一步做出来</em>。<br>
        做出来才是真正学会了。
      </p>
    </div>
  `;

  window._traps = traps.map(t => t.fix);
}

function copyTrap(i) {
  const btns = document.querySelectorAll('.trap .copy-btn');
  const btn = btns[i];
  navigator.clipboard.writeText(window._traps[i]).then(() => {
    if (btn) {
      btn.textContent = '已复制 ✓';
      btn.classList.add('copied');
      setTimeout(() => { btn.textContent = '复制'; btn.classList.remove('copied'); }, 2000);
    }
  });
}
