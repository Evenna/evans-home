// r3.js — Chapters 7, 8, 9

function renderCh7(wrap) {
  const milestones = [
    { n: 1, title: '引入 CDN', desc: '一行代码，把 Anime.js 加到 HTML 里。不需要安装任何软件。' },
    { n: 2, title: '第一个动画', desc: '让一个方块从左移到右。确认 Anime.js 工作正常。' },
    { n: 3, title: '加缓动曲线', desc: '把 linear 换成 easeOutElastic，感受「有灵魂」的区别。' },
    { n: 4, title: 'Stagger 多元素', desc: '创建 8 个方块，让它们依次出现。感受骨牌效果。' },
    { n: 5, title: 'Timeline 编排', desc: '让 3 个动画按顺序/叠加播放，像乐谱一样控制时间。' },
    { n: 6, title: 'Scroll Observer', desc: '绑定滚动触发，让页面元素随滚动逐步出现。' },
    { n: 7, title: '完整页面', desc: '整合前 6 步，做一个有标题、有内容、有交互的完整展示页。' },
  ];

  wrap.innerHTML = `
    <div class="ch-eyebrow">Chapter 07 — 7个里程碑</div>
    <h2 class="ch-title">怎么开始做</h2>
    <p class="ch-lead">
      不需要「先学完再做」。按这 7 个里程碑走，每一步都能独立运行看到效果。
    </p>

    <canvas id="cv-road" class="diagram" height="80"></canvas>
    <p class="diagram-caption">7 步路线图 — 每步可独立运行</p>

    <ul class="milestone-list">
      ${milestones.map(m => `
      <li class="milestone-item">
        <div class="milestone-num">${m.n}</div>
        <div class="milestone-text"><strong>${m.title}</strong><br>${m.desc}</div>
      </li>`).join('')}
    </ul>

    <div class="analogy">
      <div class="analogy-icon">🗺️</div>
      <p>
        Vibe Coding 的核心规则：<em>每走一步就能看到结果</em>。<br>
        不要闷头写完再看——跑不起来你不知道哪里错了。<br>
        每个里程碑完成后，<em>打开浏览器确认效果</em>，再继续。
      </p>
    </div>
  `;

  requestAnimationFrame(function init() {
    const cv = document.getElementById('cv-road');
    if (!cv) return;
    cv.width = cv.parentElement.offsetWidth || 372;
    const W = cv.width, H = cv.height;
    const ctx = cv.getContext('2d');
    const N = 7;
    const bw = (W - 48 - (N - 1) * 8) / N;
    const bh = 36;
    const y0 = (H - bh) / 2;
    const colors = ['#4f8fff','#30d158','#ff9f0a','#bf5af2','#4f8fff','#30d158','#ff9f0a'];

    ctx.fillStyle = '#0d1015'; ctx.fillRect(0, 0, W, H);

    for (let i = 0; i < N; i++) {
      const x = 24 + i * (bw + 8);
      ctx.fillStyle = `rgba(${hexToRgb(colors[i])},0.12)`;
      ctx.strokeStyle = `rgba(${hexToRgb(colors[i])},0.35)`;
      ctx.lineWidth = 0.5;
      roundRect(ctx, x, y0, bw, bh, 6);
      ctx.fill(); ctx.stroke();

      ctx.fillStyle = colors[i];
      ctx.font = `bold 13px 'Space Grotesk',sans-serif`;
      ctx.textAlign = 'center';
      ctx.fillText(i + 1, x + bw / 2, y0 + bh / 2 + 5);

      if (i < N - 1) {
        const ax = x + bw + 1, ay = y0 + bh / 2;
        ctx.fillStyle = 'rgba(255,255,255,0.15)';
        ctx.beginPath();
        ctx.moveTo(ax + 5, ay);
        ctx.lineTo(ax, ay - 3);
        ctx.lineTo(ax, ay + 3);
        ctx.closePath(); ctx.fill();
      }
    }
  });
}

function renderCh8(wrap) {
  const prompts = [
    {
      step: '里程碑 1 — 引入 CDN',
      text: `帮我在现有的 index.html 基础上引入 anime.js。
我只需要复制粘贴一个完整的 index.html 文件。
要求：
1. 用 CDN 引入：https://cdn.jsdelivr.net/npm/animejs@4/lib/anime.iife.min.js
2. 页面有一个蓝色方块（id="box"），宽高各 60px，居中显示
3. 确认 anime.js 加载成功（console.log 一下版本号）

我现在的代码是：[把你当前的 index.html 粘贴在这里]`
    },
    {
      step: '里程碑 2 — 第一个动画',
      text: `帮我在现有的 index.html 基础上添加第一个 Anime.js 动画。
要求：
1. 页面加载后，id="box" 的方块从 x=0 移动到 x=300px
2. 时长 1200ms，缓动曲线用 easeOutQuad
3. 动画结束后在 console 打印「动画完成！」

我只需要完整的 index.html 文件。
我现在的代码是：[把你当前的 index.html 粘贴在这里]`
    },
    {
      step: '里程碑 3 — 缓动曲线对比',
      text: `帮我做一个缓动曲线对比演示，在现有 index.html 基础上修改。
要求：
1. 两个方块，上面蓝色用 linear，下面紫色用 easeOutElastic
2. 点击「播放」按钮，两个方块同时从左移到右
3. 能看出明显的速度节奏差异

我只需要完整的 index.html。
我现在的代码是：[把你当前的 index.html 粘贴在这里]`
    },
    {
      step: '里程碑 4 — Stagger',
      text: `帮我做一个 Stagger（骨牌效果）演示，在现有 index.html 基础上修改。
要求：
1. 10 个彩色方块排成一排
2. 页面加载后依次从上方落下，每个比上一个延迟 80ms
3. 用 anime.stagger(80) 实现，不要写10段重复代码
4. 动画完成后自动循环

我只需要完整的 index.html。
我现在的代码是：[把你当前的 index.html 粘贴在这里]`
    },
    {
      step: '里程碑 5 — Timeline',
      text: `帮我用 Anime.js 的 Timeline 功能，在现有 index.html 基础上修改。
要求：
1. 三个元素：标题（h1）、描述文字（p）、按钮（button）
2. Timeline 顺序：h1 先淡入从下方移入 → 等200ms → p 淡入 → 等100ms → button 弹出
3. 像乐谱一样，有明确的先后顺序感

我只需要完整的 index.html。
我现在的代码是：[把你当前的 index.html 粘贴在这里]`
    },
    {
      step: '里程碑 6 — Scroll Observer',
      text: `帮我在现有 index.html 里加入滚动触发动画（Scroll Observer）。
要求：
1. 页面足够高（3个屏幕高度），有3段内容区块
2. 每个区块滚动进入视野时，从下方淡入出现
3. 用 anime.createScrollObserver 实现
4. 第一屏内容不需要触发（直接显示）

我只需要完整的 index.html。
我现在的代码是：[把你当前的 index.html 粘贴在这里]`
    },
    {
      step: '里程碑 7 — 完整展示页',
      text: `帮我把前面做的所有效果整合成一个完整展示页面，在现有 index.html 基础上修改。
要求：
1. 首屏：大标题 + 副标题，用 Timeline 入场动画
2. 第二屏：Stagger 展示卡片列表（6个卡片）
3. 第三屏：一段文字 + 按钮，用 Scroll Observer 触发
4. 整体设计：深色背景，现代感，配色统一
5. 所有 Anime.js 用 CDN 引入，不需要构建工具

我只需要完整的 index.html。
我现在的代码是：[把你当前的 index.html 粘贴在这里]`
    }
  ];

  wrap.innerHTML = `
    <div class="ch-eyebrow">Chapter 08 — 即用提示词</div>
    <h2 class="ch-title">怎么跟 AI 说</h2>
    <p class="ch-lead">
      每个里程碑都有一条可以直接复制给 AI 的 Prompt。<br>
      记得把最后一行「我现在的代码是：」后面换成你自己的代码。
    </p>
    ${prompts.map((p, i) => `
    <div class="prompt">
      <div class="prompt-lbl">${p.step}</div>
      <pre class="prompt-body" id="pb${i}">${escHtml(p.text)}</pre>
      <button class="copy-btn" onclick="copyPrompt(${i})">复制</button>
    </div>`).join('')}
  `;

  // Store prompts globally for copy
  window._prompts = prompts.map(p => p.text);
}

function copyPrompt(i) {
  const btn = document.querySelectorAll('.copy-btn')[i];
  navigator.clipboard.writeText(window._prompts[i]).then(() => {
    if (btn) {
      btn.textContent = '已复制 ✓';
      btn.classList.add('copied');
      setTimeout(() => { btn.textContent = '复制'; btn.classList.remove('copied'); }, 2000);
    }
  });
}

function renderCh9(wrap) {
  const traps = [
    {
      name: '白屏 / 控制台报错「anime is not defined」',
      cause: 'CDN 链接没有正确加载，或者 Anime.js 的代码在 CDN 引入之前就运行了。',
      fix: `帮我检查这个 index.html，我遇到了「anime is not defined」的错误。
请确认：
1. CDN script 标签在所有 JavaScript 代码之前（<body> 末尾最先出现）
2. CDN 链接本身是否有效（换成 cdn.jsdelivr.net/npm/animejs@4/lib/anime.iife.min.js）
3. 修复后给我完整的 index.html

我现在的代码是：[粘贴你的 index.html]`
    },
    {
      name: '动画只播一次，之后消失不见',
      cause: '没有设置循环，动画播完就停在终点，但终点状态可能是「透明度0」或「跑出屏幕外」。',
      fix: `我的 Anime.js 动画播放完就消失了，元素不见了。
请帮我：
1. 检查动画的目标状态是否会让元素不可见（opacity:0 / translateX超出范围）
2. 如果需要循环：加上 loop: true
3. 如果需要来回：加上 direction: 'alternate', loop: true
4. 给我完整修复后的 index.html

我现在的代码是：[粘贴你的 index.html]`
    },
    {
      name: 'Stagger 所有方块同时动，没有依次效果',
      cause: '选择器选到了单个元素（比如 #box），而不是一组元素（比如 .box）。Anime.js 需要选到多个元素才能产生 Stagger 间隔。',
      fix: `我的 Stagger 动画没有依次效果，所有元素同时动。
请帮我检查：
1. 选择器是否选到了多个元素（应该用 class 选择器如 .item，不是 id 选择器 #item）
2. HTML 里是否有多个相同 class 的元素
3. stagger() 参数是否正确传入
4. 给我修复后的完整 index.html

我现在的代码是：[粘贴你的 index.html]`
    },
    {
      name: '手机上滚动触发完全不起效',
      cause: '移动端浏览器对 scroll 事件有不同的处理方式，某些情况下 Scroll Observer 需要额外配置才能在触摸屏上正常工作。',
      fix: `我的 Anime.js Scroll Observer 动画在手机上不起效，PC 正常。
请帮我：
1. 在 ScrollObserver 配置里加上移动端兼容处理
2. 确认 overflow 容器设置正确（通常要在 document 或特定的滚动容器上监听）
3. 给我完整修复的 index.html，同时保持 PC 效果不变

我现在的代码是：[粘贴你的 index.html]`
    },
    {
      name: 'AI 越改越乱，改一个地方坏另一个地方',
      cause: '没有把完整代码给 AI，AI 在猜测上下文。每次只给一部分代码，AI 不知道整体结构，越改越混乱。',
      fix: `我的代码现在有点乱，多次修改后出现了冲突。
请帮我整理和重构这段代码：
1. 保留所有现有功能
2. 清理重复或冲突的代码
3. 重新整理 script 标签的顺序
4. 给我一个干净的完整 index.html

这是我现在的完整代码（很重要：一定要给完整的！）：
[粘贴你的完整 index.html]`
    }
  ];

  wrap.innerHTML = `
    <div class="ch-eyebrow">Chapter 09 — 小白必看</div>
    <h2 class="ch-title">会踩什么坑</h2>
    <p class="ch-lead">
      每个人做 Anime.js 都会碰到这 5 个问题。提前知道，省一半时间。
    </p>

    ${traps.map((trap, i) => `
    <div class="trap">
      <div class="trap-name">坑 ${i + 1}：${escHtml(trap.name)}</div>
      <div class="trap-cause">${escHtml(trap.cause)}</div>
      <div class="prompt" style="margin-bottom:0">
        <div class="prompt-lbl">修复 Prompt — 直接复制给 AI</div>
        <pre class="prompt-body" id="tp${i}">${escHtml(trap.fix)}</pre>
        <button class="copy-btn" onclick="copyTrap(${i})">复制</button>
      </div>
    </div>`).join('')}

    <div class="analogy" style="margin-top:20px">
      <div class="analogy-icon">🏁</div>
      <p>
        完成了 9 章？你已经有了做一个 <em>Anime.js 动效网页</em>所需的全部认知地图。<br>
        下一步：<em>打开一个 index.html，从里程碑 1 开始，跟着 AI 一步步做出来</em>。<br>
        做出来了才是真正学会了。
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

function escHtml(str) {
  return str.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
}
