// slides.js — 从零用AI做出WebGL流体效果，零基础操作手册

window.SLIDES = [

// ── Slide 0: Cover ──────────────────────────────────
{
  id: 'cover',
  html: `
<div class="cover-slide">
  <div class="cover-kicker">零基础 · 纯 AI 对话 · 从零实现</div>
  <div class="cover-h1">从一个<br>空白文件，<br><em>说出这个效果</em></div>
  <div class="cover-lead">
    不找现成代码，不复制粘贴。<br>
    只用 AI 对话，从零告诉它你想要什么，
    一步步把这个流动的液体做出来。
  </div>
  <div class="s-tags">
    <span class="s-tag blue">0 行代码基础</span>
    <span class="s-tag green">只需 Claude / ChatGPT</span>
    <span class="s-tag orange">约 1 小时完成</span>
  </div>
  <div class="cover-meta">共 8 页 · 左侧是最终效果 · 点 → 开始</div>
</div>
`
},

// ── Slide 1: 你在做一件什么事 ────────────────────────
{
  id: 'what',
  html: `
<div class="s-eyebrow">第 1 页 · 先理解目标</div>
<div class="s-title">你在做的东西<br>是什么？</div>
<div class="s-sub">跟 AI 说话之前，你得先知道自己在做什么。</div>

<div class="s-card">
  <div class="s-card-title"><span style="color:var(--blue)">●</span> 一个网页文件</div>
  <div class="s-card-body">
    最终你会得到一个 <strong>index.html</strong> 文件。<br>
    双击就能在浏览器打开，发给任何人都能看，不用安装任何东西。
  </div>
</div>

<div class="s-card">
  <div class="s-card-title"><span style="color:var(--green)">●</span> 液体是「算」出来的</div>
  <div class="s-card-body">
    不是视频，不是 GIF。每当你移动鼠标，浏览器实时计算液体怎么流动，
    然后把结果画到屏幕上。你的每一次操作，它都会响应。
  </div>
</div>

<div class="s-card">
  <div class="s-card-title"><span style="color:var(--orange)">●</span> 它用了显卡来计算</div>
  <div class="s-card-body">
    流体模拟的计算量很大。浏览器通过一个叫 <strong>WebGL</strong> 的接口，
    把计算交给电脑的显卡来做——显卡有几千个核心同时跑，
    所以才能做到实时流畅。这就是为什么它这么好看又不卡。
  </div>
</div>

<div class="s-tip">
  <span class="s-tip-icon">💡</span>
  记住：你最终要得到一个 <strong>index.html</strong>，里面包含让显卡画液体的代码。AI 来写，你来描述你想要什么。
</div>
`
},

// ── Slide 2: 涉及哪些技术（大白话）─────────────────
{
  id: 'tech',
  html: `
<div class="s-eyebrow">第 2 页 · 涉及哪些技术</div>
<div class="s-title">这一页你只需要<br>「听说过」就够了</div>
<div class="s-sub">不需要学会它们，你只需要能跟 AI 说出这些词。</div>

<div class="s-card">
  <div class="s-card-title">HTML / CSS / JavaScript</div>
  <div class="s-card-body">
    网页的三件套。HTML 是骨架，CSS 是样式，JavaScript 是行为逻辑。
    你的 index.html 里三个都有，但都由 AI 写。
  </div>
</div>

<div class="s-card">
  <div class="s-card-title">WebGL</div>
  <div class="s-card-body">
    浏览器调用显卡的接口。流体模拟运行在这里，AI 会帮你写，
    你只需要知道「流体效果靠 WebGL 驱动」这一句话。
  </div>
</div>

<div class="s-card">
  <div class="s-card-title">GLSL 着色器（Shader）</div>
  <div class="s-card-body">
    跑在显卡里的小程序，负责算每个像素的颜色和流动速度。
    一个流体模拟里有十几个 Shader 协作。
    你不用看懂它，但你要告诉 AI「我需要流体模拟的着色器」。
  </div>
</div>

<div class="s-card">
  <div class="s-card-title">Navier-Stokes（流体方程）</div>
  <div class="s-card-body">
    物理学里描述流体运动的方程。听起来很难——
    但你只需要告诉 AI「用 Navier-Stokes 做实时流体模拟」，
    它知道怎么实现。
  </div>
</div>
`
},

// ── Slide 3: 第一步对话 ──────────────────────────────
{
  id: 'step1',
  html: `
<div class="s-eyebrow">第 3 页 · 开始动手 Step 1</div>
<div class="s-title">第一句话<br>怎么说？</div>
<div class="s-sub">打开 Claude 或 ChatGPT，把下面这段话发给它。</div>

<div class="s-code">
  <pre><span class="cm">/* 直接复制发给 AI */</span>

我想做一个网页，打开后全屏显示一个
实时流体模拟效果，像彩色液体在流动。
用 WebGL 实现，鼠标拖动时在那个位置
倒入彩色颜料，颜料会顺着物理规律扩散。
背景是黑色，颜色鲜艳。

帮我生成一个完整的 index.html 文件，
所有代码都在这一个文件里，
不要分成多个文件，不要依赖外部库。</pre>
</div>

<div class="s-card">
  <div class="s-card-title"><span style="color:var(--green)">✓</span> 拿到代码之后</div>
  <div class="s-card-body">
    AI 会给你一大段代码。<br>
    在电脑上新建一个文件，命名为 <strong>index.html</strong>，
    把代码全部粘进去，保存。<br>
    然后<strong>双击文件</strong>，在浏览器里打开——应该就能看到流体效果了。
  </div>
</div>

<div class="s-tip">
  <span class="s-tip-icon">💡</span>
  如果打开是空白页，把空白页截图发给 AI：「打开是空白，帮我看看哪里有问题。」
</div>
`
},

// ── Slide 4: 迭代——让效果更好看 ────────────────────
{
  id: 'step2',
  html: `
<div class="s-eyebrow">第 4 页 · 开始动手 Step 2</div>
<div class="s-title">效果出来了，<br>但不够好看？</div>
<div class="s-sub">这是正常的——AI 第一版通常是「能用但不惊艳」。现在开始迭代。</div>

<ol class="s-steps">
  <li>
    <span class="step-num">1</span>
    <div>
      <strong>让颜色更漂亮</strong><br>
      「颜色太暗了，我想要更鲜艳的霓虹色调，像紫色、青色、粉色。
      帮我修改颜色生成的部分，给我完整修改后的 index.html。」
    </div>
  </li>
  <li>
    <span class="step-num">2</span>
    <div>
      <strong>加发光效果</strong><br>
      「我想让液体看起来会发光，颜色往外晕染，像霓虹灯效果。
      帮我加一个 Bloom（发光）后处理效果。」
    </div>
  </li>
  <li>
    <span class="step-num">3</span>
    <div>
      <strong>让流动更自然</strong><br>
      「现在液体消散太快，我想让它流动得更久，更有惯性感。
      帮我调整速度衰减和颜色衰减的参数。」
    </div>
  </li>
  <li>
    <span class="step-num">4</span>
    <div>
      <strong>加开场动画</strong><br>
      「页面打开后自动喷出几朵彩色液体花，持续 3 秒，
      然后等待用户操作。帮我加这个开场效果。」
    </div>
  </li>
</ol>

<div class="s-tip">
  <span class="s-tip-icon">💡</span>
  每次改完都重新打开 index.html 看效果。不满意继续描述给 AI，这就是 Vibe Coding 的核心节奏：<strong>看 → 描述 → 改 → 看</strong>。
</div>
`
},

// ── Slide 5: 加自己的内容 ────────────────────────────
{
  id: 'step3',
  html: `
<div class="s-eyebrow">第 5 页 · 开始动手 Step 3</div>
<div class="s-title">让它变成<br>「你的」作品</div>
<div class="s-sub">流体只是画布，上面加什么是你的事。</div>

<div class="s-card">
  <div class="s-card-title"><span style="color:var(--blue)">●</span> 叠加文字</div>
  <div class="s-card-body">
    「在流体上方叠一层文字，居中显示我的名字『Evans』，
    字体很大，白色半透明，用细字重。文字悬浮在液体上方，
    不影响液体交互。」
  </div>
</div>

<div class="s-card">
  <div class="s-card-title"><span style="color:var(--green)">●</span> 加一句话</div>
  <div class="s-card-body">
    「在名字下方加一行小字，内容是『共生 · Symbiosis』，
    字母间距大一点，颜色更淡。」
  </div>
</div>

<div class="s-card">
  <div class="s-card-title"><span style="color:var(--orange)">●</span> 修改交互方式</div>
  <div class="s-card-body">
    「我想改成：鼠标不动时，液体自动缓慢流动，有呼吸感。
    鼠标移动时才激烈响应。帮我实现。」
  </div>
</div>

<div class="s-card">
  <div class="s-card-title"><span style="color:var(--purple)">●</span> 加点击彩蛋</div>
  <div class="s-card-body">
    「点击任意位置时，爆发一圈放射状的彩色液体，
    像扔了一颗颜料炸弹。」
  </div>
</div>

<div class="s-tip">
  <span class="s-tip-icon">💡</span>
  每个功能独立说，不要一次说太多。AI 一次做好一件事的成功率远高于一次做十件。
</div>
`
},

// ── Slide 6: 发布上线 ────────────────────────────────
{
  id: 'publish',
  html: `
<div class="s-eyebrow">第 6 页 · 发布上线</div>
<div class="s-title">做好了，<br>怎么让别人看到？</div>
<div class="s-sub">GitHub Pages = 免费网站托管，三步搞定。</div>

<ol class="s-steps">
  <li>
    <span class="step-num">1</span>
    <div>
      <strong>注册 GitHub，新建仓库</strong><br>
      去 github.com 注册账号，点右上角 + → New repository，
      起个名字比如 <strong>fluid-demo</strong>，公开（Public），创建。
    </div>
  </li>
  <li>
    <span class="step-num">2</span>
    <div>
      <strong>上传 index.html</strong><br>
      进入仓库，点 <strong>Add file → Upload files</strong>，
      把你的 index.html 拖进去，点 Commit changes 保存。
    </div>
  </li>
  <li>
    <span class="step-num">3</span>
    <div>
      <strong>开启 Pages</strong><br>
      点仓库的 <strong>Settings → Pages → Source 选 main → Save</strong>。<br>
      等 1-2 分钟，你会得到一个链接：<br>
      <strong>https://你的用户名.github.io/fluid-demo/</strong>
    </div>
  </li>
</ol>

<div class="s-card" style="margin-top:12px;">
  <div class="s-card-title"><span style="color:var(--green)">✓</span> 以后更新怎么办</div>
  <div class="s-card-body">
    每次让 AI 改完代码，重新上传 index.html 替换旧文件，等 1 分钟刷新链接就生效。
  </div>
</div>

<div class="s-tip">
  <span class="s-tip-icon">💡</span>
  搞不定 GitHub 操作？截图发给 AI：「我在 GitHub 想上传文件，截图在这，下一步怎么点？」
</div>
`
},

// ── Slide 7: 遇到问题 ────────────────────────────────
{
  id: 'debug',
  html: `
<div class="s-eyebrow">第 7 页 · 遇到问题</div>
<div class="s-title">改坏了 /<br>看不懂 / 没效果</div>
<div class="s-sub">每一种问题都有对应的问法。</div>

<div class="s-card">
  <div class="s-card-title"><span style="color:var(--orange)">▲</span> 页面空白或报错</div>
  <div class="s-card-body">
    按 <strong>F12</strong> 打开开发者工具，点 <strong>Console（控制台）</strong>，
    看红色错误文字，截图发给 AI：<br>
    「出现了这个报错，帮我修复，给我完整的 index.html。」
  </div>
</div>

<div class="s-card">
  <div class="s-card-title"><span style="color:var(--orange)">▲</span> 效果和我说的不一样</div>
  <div class="s-card-body">
    不要说「不对」。要说具体哪里不对：<br>
    「你做的发光效果太强了，我想要更微弱、更优雅的那种。
    现在是这样（描述），我想要那样（描述）。」
  </div>
</div>

<div class="s-card">
  <div class="s-card-title"><span style="color:var(--orange)">▲</span> 代码太长不知道改哪里</div>
  <div class="s-card-body">
    不要自己改。直接说：<br>
    「我想改 ___，帮我定位到代码里哪个位置，
    并给我修改后的完整 index.html。」<br>
    永远让 AI 给完整文件。
  </div>
</div>

<div class="s-card">
  <div class="s-card-title"><span style="color:var(--green)">✓</span> 最万能的句子</div>
  <div class="s-card-body">
    「我现在的 index.html 是这个（粘贴全部代码）。
    我想实现 ___，帮我修改，给我完整的新版本。」
  </div>
</div>
`
},

// ── Slide 8: 思路总结 ────────────────────────────────
{
  id: 'summary',
  html: `
<div class="s-eyebrow">第 8 页 · 思路总结</div>
<div class="s-title">Vibe Coding<br>的本质是什么？</div>
<div class="s-sub">做完这件事，你学到的不是 WebGL，是一种工作方式。</div>

<div class="s-card">
  <div class="s-card-title"><span style="color:var(--blue)">●</span> 你在做导演，AI 在写代码</div>
  <div class="s-card-body">
    导演不需要会拍摄、剪辑、调色——但导演知道自己想要什么画面。
    你的工作是<strong>把脑子里的画面用语言描述清楚</strong>，AI 负责实现。
  </div>
</div>

<div class="s-card">
  <div class="s-card-title"><span style="color:var(--green)">●</span> 描述越具体，结果越准</div>
  <div class="s-card-body">
    「好看一点」→ AI 猜你的审美，大概率猜错<br>
    「颜色改成深紫色 #6B21A8，发光晕染半径小一点，更克制」→ 精准
  </div>
</div>

<div class="s-card">
  <div class="s-card-title"><span style="color:var(--orange)">●</span> 迭代是正常的，不是失败</div>
  <div class="s-card-body">
    第一版出来一定不完美。专业的 Vibe Coding 流程就是：
    出一版 → 看哪里不对 → 描述给 AI → 出下一版。
    改 10 次很正常，改 30 次也很正常。
  </div>
</div>

<div class="s-divider"></div>

<div style="font-size:12.5px; color:var(--txt2); line-height:2;">
  <strong style="color:var(--txt)">你今天做了什么：</strong><br>
  用自然语言指挥 AI，从一个空文件，做出了一个调用显卡、
  实时模拟流体物理、运行在浏览器里的互动网页。<br><br>
  <strong style="color:var(--txt)">你不需要懂技术，你需要懂你想要什么。</strong>
</div>
`
},

];
