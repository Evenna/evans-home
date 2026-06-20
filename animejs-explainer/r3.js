// r3.js — 章节 7-9 渲染函数

function renderCh7(el) {
  el.innerHTML = `
<div class="section">
  <h3>思路：从最小可运行版本开始</h3>
  <div class="box blue">
    Vibe Coding 的核心原则：<strong>每一步都要能运行起来，看到结果</strong>。<br>
    不要一开始就想做完整版——先让一个圆动起来，再慢慢加。
  </div>
</div>

<div class="section">
  <h3>里程碑路线图</h3>
  <div class="vis">
    <canvas id="cv-milestones" height="190"></canvas>
    <div class="vis-caption">每个里程碑都是可以独立运行的版本，不要跳步</div>
  </div>
</div>

<div class="step">
  <div class="step-l"><div class="step-num">1</div><div class="step-line"></div></div>
  <div class="step-body">
    <h4>搭好空白房间</h4>
    <p>创建一个 HTML 文件，引入 Anime.js（一行代码），在页面上放一个方块。能看到这个方块就算成功。</p>
  </div>
</div>

<div class="step">
  <div class="step-l"><div class="step-num">2</div><div class="step-line"></div></div>
  <div class="step-body">
    <h4>让第一个东西动起来</h4>
    <p>告诉 Anime.js：「这个方块，移动200px，1秒，用 easeOutElastic」。刷新页面，看到它弹过去就成功了。</p>
  </div>
</div>

<div class="step">
  <div class="step-l"><div class="step-num">3</div><div class="step-line"></div></div>
  <div class="step-body">
    <h4>加上 Timeline</h4>
    <p>把三个动画排成序列：方块先移动，然后变色，然后缩小消失。感受多动画编排的感觉。</p>
  </div>
</div>

<div class="step">
  <div class="step-l"><div class="step-num">4</div><div class="step-line"></div></div>
  <div class="step-body">
    <h4>Stagger 多个元素</h4>
    <p>复制10个方块，用 Stagger 让它们依次飞入。看到骨牌效果就是成功。这一步会让你突然理解 Stagger 的威力。</p>
  </div>
</div>

<div class="step">
  <div class="step-l"><div class="step-num">5</div><div class="step-line"></div></div>
  <div class="step-body">
    <h4>加入滚动触发</h4>
    <p>页面做长一些，给第二个区域加上 Scroll Observer，滚到那里才出现。这一步是「现代网站感觉」的关键。</p>
  </div>
</div>

<div class="step">
  <div class="step-l"><div class="step-num">6</div><div class="step-line"></div></div>
  <div class="step-body">
    <h4>复刻一个真实场景</h4>
    <p>选 animejs.com 首页的一个小块效果（比如标题字母飞入），对着看，让 AI 帮你复刻。这是最好的学习方式。</p>
  </div>
</div>

<div class="step">
  <div class="step-l"><div class="step-num">7</div></div>
  <div class="step-body">
    <h4>把它发布出去</h4>
    <p>用 GitHub Pages 或 Netlify 把静态 HTML 部署上线，发链接给朋友看。看到真实 URL 是最大的成就感。</p>
  </div>
</div>`;

  requestAnimationFrame(() => {
    const cv = document.getElementById('cv-milestones');
    if (!cv) return;
    cv.width = cv.parentElement.offsetWidth || 382;
    cv.height = 190;
    const ctx = cv.getContext('2d');
    const W = cv.width, H = cv.height;
    ctx.fillStyle = '#0d1015';
    ctx.fillRect(0, 0, W, H);

    const steps = ['环境搭建', '首个动画', 'Timeline', 'Stagger', '滚动触发', '复刻场景', '上线发布'];
    const colors = ['#4f8fff','#30d158','#ff9f0a','#bf5af2','#c8a96e','#ff9f0a','#30d158'];
    const bw = Math.floor((W - 48 - 6 * 8) / 7);
    const bh = 56;
    const startX = 24;
    const y = (H - bh) / 2;

    steps.forEach((s, i) => {
      const x = startX + i * (bw + 8);
      ctx.fillStyle = `rgba(${hexToRgb(colors[i])},0.18)`;
      ctx.strokeStyle = colors[i];
      ctx.lineWidth = 0.75;
      ctx.beginPath(); ctx.roundRect(x, y, bw, bh, 6); ctx.fill(); ctx.stroke();

      ctx.fillStyle = colors[i];
      ctx.font = `bold 13px "Space Grotesk"`;
      ctx.textAlign = 'center';
      ctx.fillText(i + 1, x + bw / 2, y + 20);

      ctx.fillStyle = '#e8e6e0';
      ctx.font = `9px "Space Grotesk"`;
      ctx.textAlign = 'center';
      const words = s.split('');
      ctx.fillText(s.length <= 4 ? s : s.slice(0,4), x + bw / 2, y + 34);
      if (s.length > 4) ctx.fillText(s.slice(4), x + bw / 2, y + 46);

      // arrow
      if (i < steps.length - 1) {
        const ax = x + bw + 1, ay = y + bh / 2;
        ctx.strokeStyle = 'rgba(255,255,255,0.15)';
        ctx.lineWidth = 1;
        ctx.beginPath(); ctx.moveTo(ax, ay); ctx.lineTo(ax + 5, ay); ctx.stroke();
        ctx.fillStyle = 'rgba(255,255,255,0.15)';
        ctx.beginPath();
        ctx.moveTo(ax + 5, ay - 3); ctx.lineTo(ax + 8, ay); ctx.lineTo(ax + 5, ay + 3);
        ctx.fill();
      }
    });

    // labels
    ctx.fillStyle = '#4a4e57';
    ctx.font = '9px "JetBrains Mono"';
    ctx.textAlign = 'center';
    ctx.fillText('每步完成后再继续 → 不要跳步', W / 2, y + bh + 18);
  });
}

function hexToRgb(hex) {
  const r = parseInt(hex.slice(1,3),16);
  const g = parseInt(hex.slice(3,5),16);
  const b = parseInt(hex.slice(5,7),16);
  return `${r},${g},${b}`;
}

// ─────────────────────────────────────────
function renderCh8(el) {
  const prompts = [
    {
      title: '里程碑 1 — 搭环境',
      body: `帮我创建一个 HTML 文件，引入 Anime.js v4（用 CDN，不需要 npm），页面上放一个 100×100 的深色方块。引入成功后在控制台打印"Anime.js 加载成功"。我只需要复制粘贴一个完整的 index.html 文件，不需要任何其他文件。`
    },
    {
      title: '里程碑 2 — 第一个动画',
      body: `在我现有的 index.html 基础上，给那个方块加一个动画：页面加载后，它从左边（translateX: -200px）移动到原位，用时 800ms，缓动用 easeOutElastic。
我现在的代码是：[把你当前的 index.html 代码粘贴在这里]`
    },
    {
      title: '里程碑 3 — Timeline 序列',
      body: `继续在我的代码基础上，把原来的单个动画换成 Timeline：第 0 秒方块移动进来，第 0.8 秒背景色变成蓝色，第 1.2 秒方块缩小消失（scale: 0）。用 anime.createTimeline() 来实现。
我现在的代码是：[粘贴当前完整代码]`
    },
    {
      title: '里程碑 4 — Stagger 效果',
      body: `在我的代码基础上，把单个方块换成 10 个小方块横排，使用 anime.stagger(80) 让它们依次延迟 80ms 从下方（translateY: 40px）飞入，每个方块用不同颜色。
我现在的代码是：[粘贴当前完整代码]`
    },
    {
      title: '里程碑 5 — 滚动触发',
      body: `给我的页面加一个第二屏，里面有3个卡片。使用 Anime.js 的 ScrollObserver，让每个卡片在滚动进入视口时从下方飞入（translateY: 60px → 0，opacity: 0 → 1），用 stagger 间隔 100ms。
我现在的代码是：[粘贴当前完整代码]`
    },
    {
      title: '里程碑 6 — 复刻官网标题',
      body: `帮我复刻 animejs.com 首页标题的字母飞入效果：把一个标题的每个字母包在 span 里，页面加载时每个字母从 translateY: -30px 飞入并 opacity 从 0 到 1，用 stagger(40) 依次出现，缓动用 easeOutCubic。
我现在的代码是：[粘贴当前完整代码]`
    },
    {
      title: '里程碑 7 — 部署上线',
      body: `我的项目只有一个 index.html 文件，我想把它发布到 GitHub Pages，让别人能通过网址访问。帮我写出完整的操作步骤，我完全不懂 git，每个命令都要写清楚，按顺序执行。`
    }
  ];

  el.innerHTML = `
<div class="section">
  <h3>Vibe Coding 的核心习惯</h3>
  <div class="box green">
    每次给 AI 提需求时，<strong>把你当前完整的代码也粘进去</strong>。<br>
    只描述「我想要什么」而不给代码，AI 会凭空想象，越改越乱。给了代码，AI 才能在你的基础上精确修改。
  </div>
</div>

<div class="section">
  <h3>7 条即用提示词</h3>
  ${prompts.map((p, i) => `
  <div class="prompt">
    <div class="prompt-lbl">里程碑 ${i+1} — ${p.title.replace(/里程碑.+?—\s*/,'')}</div>
    <pre class="prompt-body" id="pb${i}">${p.body}</pre>
    <button class="copy-btn" id="cb${i}" onclick="copyPrompt(${i})">复制这条提示词</button>
  </div>`).join('')}
</div>

<div class="section">
  <h3>Vibe Coding 工作流图示</h3>
  <div class="checklist">
    <div class="ci"><div class="ci-icon ok">1</div><span>把当前完整代码 + 新需求一起发给 AI</span></div>
    <div class="ci"><div class="ci-icon ok">2</div><span>复制 AI 给的完整新代码，完全替换旧文件</span></div>
    <div class="ci"><div class="ci-icon ok">3</div><span>刷新浏览器，看效果</span></div>
    <div class="ci"><div class="ci-icon ok">4</div><span>有问题：把新代码 + 错误信息一起发给 AI</span></div>
    <div class="ci"><div class="ci-icon ok">5</div><span>循环，直到满意</span></div>
  </div>
</div>`;
}

// ─────────────────────────────────────────
function renderCh9(el) {
  const traps = [
    {
      title: '白屏——什么都看不到',
      icon: '⬛',
      body: '最常见的坑。原因通常是：Anime.js 没有正确引入，或者你选择元素的方式写错了（比如 CSS 类名拼写错误）。动画在「跑」，但选中的元素是空的。',
      fix: `我的页面是白屏，Anime.js 动画没有效果。帮我检查以下几点：1. CDN 链接是否正确 2. 选择器是否能选到元素（在控制台 document.querySelector 测试一下）3. animate 的调用语法是否正确。我的代码是：[粘贴代码]`
    },
    {
      title: '动画闪了一下就没了',
      icon: '⚡',
      body: '你的动画播了一遍就结束了，想循环播放。或者页面一刷新就能看到动画从头开始，但不想要这样。这是因为没有设置 loop 参数，或者 fill mode 没设好。',
      fix: `我的动画只播一次就停了，我想让它循环播放，或者让动画结束后保持在最终状态不恢复原位。帮我修改相关参数。我的代码是：[粘贴代码]`
    },
    {
      title: 'Stagger 没有依次出现，全部同时动',
      icon: '🔳',
      body: '你加了 stagger 但所有元素还是一起动。最常见原因：你的 HTML 里实际上只有一个元素（用 id 选择），而不是多个（用 class 选择）。或者 stagger 参数位置写错了。',
      fix: `我用了 stagger 但所有元素同时出现，没有依次延迟的效果。帮我找出问题：是元素选择的问题还是 stagger 写法的问题。我的代码是：[粘贴代码]`
    },
    {
      title: '滚动触发在手机上不工作',
      icon: '📱',
      body: '在电脑上好好的，手机上一点反应没有。原因：手机浏览器的滚动事件机制不同，ScrollObserver 需要特定的设置才能在移动端工作。',
      fix: `我的滚动触发动画在电脑上正常，手机浏览器上没效果。帮我检查 ScrollObserver 的设置，看是否需要加 { smooth: true } 或者其他移动端兼容配置。我的代码是：[粘贴代码]`
    },
    {
      title: 'AI 越改越乱，代码一团糟',
      icon: '🌀',
      body: '这是 Vibe Coding 最大的坑。每次只告诉 AI「改一下那个动画」，但没把完整代码给它。AI 猜测上一版代码是什么，越猜越偏，最后代码里有三份冲突的逻辑。',
      fix: `我的代码已经乱了，有很多冲突的逻辑。帮我整理一下：保留功能，删掉所有重复和冲突的部分，让代码重新干净起来。我当前的完整代码是：[粘贴所有代码]`
    }
  ];

  el.innerHTML = `
<div class="section">
  <h3>新手必遇的 5 个坑</h3>
  <div class="box orange">
    遇到问题时，先找下面 5 种情况对照一下。<strong>每个坑都附了一条修复提示词</strong>，直接复制给 AI 就能解决。
  </div>
</div>

${traps.map((trap, i) => `
<div class="trap">
  <div class="trap-title">${trap.icon} 坑 ${i+1}：${trap.title}</div>
  <div class="trap-body">${trap.body}</div>
  <div class="prompt" style="margin-bottom:0">
    <div class="prompt-lbl">修复提示词 — 直接复制给 AI</div>
    <pre class="prompt-body" id="tp${i}">${trap.fix}</pre>
    <button class="copy-btn" id="tc${i}" onclick="copyTrap(${i})">复制修复提示词</button>
  </div>
</div>`).join('')}

<div class="section" style="margin-top:20px">
  <h3>最重要的一条规则</h3>
  <div class="vs">
    <div class="vs-col bad">
      <h4>❌ 错误做法</h4>
      <p>「帮我修改一下那个按钮的动画，让它弹一下」</p>
    </div>
    <div class="vs-col good">
      <h4>✓ 正确做法</h4>
      <p>「在我的代码基础上，给按钮加弹性动画。[粘贴完整代码]」</p>
    </div>
  </div>
  <div class="box green">
    <strong>记住：AI 没有记忆。</strong><br>
    每次对话都是全新开始。每次都要把最新的完整代码粘给它，不要假设它还记得上次的代码。
  </div>
</div>`;
}
