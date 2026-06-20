// slides.js — 展开版，每页内容更详细

window.SLIDES = [

// ── Slide 0: Cover ──────────────────────────────────
{
  id: 'cover',
  html: `
<div class="cover-slide">
  <div class="cover-kicker">零基础 · 纯 AI 对话 · 从零实现</div>
  <div class="cover-h1">从一个<br>空白文件，<br><em>说出这个效果</em></div>
  <div class="cover-lead">
    你现在左边看到的——彩色液体实时流动，鼠标一划就响应——
    不是视频，不是特效软件，是一个普通的网页文件。<br><br>
    这个课件教你用 AI 对话，从一个完全空白的文件开始，
    一步步把这个效果做出来。<strong style="color:var(--txt)">你不需要写任何代码。</strong>
  </div>
  <div class="s-tags">
    <span class="s-tag blue">0 行代码基础</span>
    <span class="s-tag green">只需 Claude / ChatGPT</span>
    <span class="s-tag orange">约 1 小时完成</span>
  </div>
  <div class="cover-meta">共 8 页 · 左侧随时体验 · 点 → 开始</div>
</div>
`
},

// ── Slide 1: 你在做一件什么事 ────────────────────────
{
  id: 'what',
  html: `
<div class="s-eyebrow">第 1 页 · 先理解目标</div>
<div class="s-title">你在做的东西<br>到底是什么？</div>
<div class="s-sub">在动手之前，先花两分钟搞清楚你在做什么。跟 AI 说话的时候你才知道说什么。</div>

<div class="s-card">
  <div class="s-card-title"><span style="color:var(--blue)">●</span> 一个 HTML 文件</div>
  <div class="s-card-body">
    你最终会得到一个叫 <strong>index.html</strong> 的文件。<br>
    HTML 是网页的基础格式，就像 Word 文档之于文字。
    双击这个文件，浏览器自动打开，就是你的作品。
    发给别人一个链接，他们也能直接在浏览器里看，
    不需要安装任何软件。
  </div>
</div>

<div class="s-card">
  <div class="s-card-title"><span style="color:var(--green)">●</span> 液体是实时「算」出来的</div>
  <div class="s-card-body">
    和视频最大的区别是：每一帧（1/60 秒）屏幕都在重新计算一次。<br>
    你拖动鼠标，程序把你的位置和速度变成「对液体施加的力」，
    然后算出液体下一步怎么流。<br>
    所以你每次划出来的形状都不一样——它是真实响应你的。
  </div>
</div>

<div class="s-card">
  <div class="s-card-title"><span style="color:var(--orange)">●</span> 计算跑在显卡上，不是 CPU</div>
  <div class="s-card-body">
    流体模拟要同时计算屏幕上几十万个像素点的运动，
    普通 CPU（电脑大脑）一次只能算一个，太慢了。<br>
    浏览器通过 <strong>WebGL</strong> 这个接口，把计算交给显卡（GPU）。
    显卡有几千个核心，能同时算几十万个点，所以才流畅。<br>
    这就是这个效果在技术上特别的地方。
  </div>
</div>

<div class="s-tip">
  <span class="s-tip-icon">💡</span>
  记住这三个词就够了：<strong>index.html / 实时计算 / WebGL（显卡接口）</strong>。后面跟 AI 说话会用到。
</div>
`
},

// ── Slide 2: 涉及哪些技术 ────────────────────────────
{
  id: 'tech',
  html: `
<div class="s-eyebrow">第 2 页 · 涉及哪些技术</div>
<div class="s-title">你不需要学这些，<br>但你需要「认识」它们</div>
<div class="s-sub">就像你不需要会开挖掘机，但你得知道挖掘机是干什么的，才能跟施工队说清楚你要挖什么。</div>

<div class="s-card">
  <div class="s-card-title">① HTML + JavaScript</div>
  <div class="s-card-body">
    HTML 是页面的骨架，JavaScript 是让页面「动」的逻辑。<br>
    你的 index.html 文件里两个都有：HTML 放一个画布元素，
    JavaScript 控制整个流体模拟的运行、接收鼠标输入、每帧触发计算。<br>
    <strong>AI 来写，你不需要读懂每一行。</strong>
  </div>
</div>

<div class="s-card">
  <div class="s-card-title">② WebGL</div>
  <div class="s-card-body">
    浏览器内置的图形接口，专门用来调用显卡。
    你告诉 AI「用 WebGL 实现」，它就知道要用这套系统来写代码。
    没有 WebGL，流体模拟会慢到无法使用。
  </div>
</div>

<div class="s-card">
  <div class="s-card-title">③ GLSL 着色器（Shader）</div>
  <div class="s-card-body">
    跑在显卡里的小程序，语法像 C 语言。
    流体模拟里有十几个着色器各司其职：<br>
    · 一个算速度扩散<br>
    · 一个算颜色扩散<br>
    · 一个处理压力使液体「不压缩」<br>
    · 一个最终把颜色画到屏幕上<br>
    你不用写它，但你要知道跟 AI 说「我需要流体模拟的着色器」。
  </div>
</div>

<div class="s-card">
  <div class="s-card-title">④ Navier-Stokes 方程</div>
  <div class="s-card-body">
    19 世纪物理学家写下的描述流体运动的方程，
    是现代流体模拟的数学基础。听起来很难，但你只需要
    把这个词告诉 AI，它就知道用什么算法模拟流体。
    你自己完全不用理解方程本身。
  </div>
</div>

<div class="s-tip">
  <span class="s-tip-icon">💡</span>
  能读完这一页就够了。记不住没关系，后面的 Prompt 模板里会直接给你用。
</div>
`
},

// ── Slide 3: 第一步——让 AI 写出基础效果 ──────────────
{
  id: 'step1',
  html: `
<div class="s-eyebrow">第 3 页 · Step 1</div>
<div class="s-title">第一句话<br>怎么说？</div>
<div class="s-sub">打开 Claude 或 ChatGPT，把下面这段话原样发给它。</div>

<div class="s-code">
  <pre><span class="cm">/* 复制这段发给 AI */</span>

我想做一个网页，打开后全屏显示
实时流体模拟效果，像彩色液体在流动。
用 WebGL 实现，基于 Navier-Stokes
流体方程。鼠标拖动时在那个位置倒入
彩色颜料，颜料顺着物理规律扩散流动。
背景黑色，颜色鲜艳。

帮我生成一个完整的 index.html，
所有代码在这一个文件里，
不依赖外部 CDN 或库文件。</pre>
</div>

<div class="s-card">
  <div class="s-card-title"><span style="color:var(--green)">✓</span> 拿到代码后，这样操作</div>
  <div class="s-card-body">
    1. 在桌面新建一个文本文件<br>
    2. 把 AI 给的所有代码粘进去<br>
    3. 另存为 <strong>index.html</strong>（注意后缀是 .html，不是 .txt）<br>
    4. 双击文件，在浏览器里打开<br>
    5. 试着在页面上拖动鼠标
  </div>
</div>

<div class="s-card">
  <div class="s-card-title"><span style="color:var(--orange)">▲</span> 可能遇到的情况</div>
  <div class="s-card-body">
    · <strong>能看到流体，效果一般</strong> → 正常，继续下一步迭代<br>
    · <strong>页面空白</strong> → 按 F12 看报错，截图发给 AI 让它修<br>
    · <strong>AI 给了多个文件</strong> → 告诉它「帮我合并成一个 index.html」
  </div>
</div>

<div class="s-tip">
  <span class="s-tip-icon">💡</span>
  第一版 AI 给的效果通常「能跑但不惊艳」——这完全正常。重要的是先跑起来，再一步步改好。
</div>
`
},

// ── Slide 4: 迭代——让效果更好看 ────────────────────
{
  id: 'step2',
  html: `
<div class="s-eyebrow">第 4 页 · Step 2</div>
<div class="s-title">效果跑起来了，<br>怎么变好看？</div>
<div class="s-sub">Vibe Coding 的核心节奏：看 → 哪里不对 → 描述给 AI → 改 → 再看。每次只改一件事。</div>

<ol class="s-steps">
  <li>
    <span class="step-num">1</span>
    <div>
      <strong>先让颜色更鲜艳</strong><br>
      「颜色太暗了，我想要更鲜艳的霓虹感，
      主要用紫色、青色、粉色这几个色调，
      颜色要饱和度高、发光强。
      帮我修改颜色生成部分，给我完整的 index.html。」
    </div>
  </li>
  <li>
    <span class="step-num">2</span>
    <div>
      <strong>加 Bloom 发光效果</strong><br>
      「我想让液体看起来像霓虹灯——亮色往外晕染发光。
      帮我加一个 Bloom 后处理效果，
      发光不要太强，要优雅克制，给我完整的 index.html。」
    </div>
  </li>
  <li>
    <span class="step-num">3</span>
    <div>
      <strong>让流动更有惯性</strong><br>
      「现在颜色消散太快，我想要液体流动得更久、更有惯性感，
      像真实的液体那种拖拽感。
      帮我把速度衰减和颜色衰减调慢，给我完整的 index.html。」
    </div>
  </li>
  <li>
    <span class="step-num">4</span>
    <div>
      <strong>加涡旋感</strong><br>
      「我想让液体划动之后产生卷曲的漩涡，
      而不是直接扩散开，要有旋转的感觉。
      帮我增加 vorticity（涡旋）强度，给我完整的 index.html。」
    </div>
  </li>
  <li>
    <span class="step-num">5</span>
    <div>
      <strong>加开场自动动画</strong><br>
      「页面打开后，自动喷出 6-8 朵彩色液体花，
      从屏幕各个位置随机爆发，持续约 3 秒，
      之后停止等用户自己操作。给我完整的 index.html。」
    </div>
  </li>
</ol>

<div class="s-tip">
  <span class="s-tip-icon">💡</span>
  每改一步，都重新打开 index.html 确认效果再继续。不要一次堆很多需求——AI 一次做好一件事比一次做五件事靠谱得多。
</div>
`
},

// ── Slide 5: 加自己的内容 ────────────────────────────
{
  id: 'step3',
  html: `
<div class="s-eyebrow">第 5 页 · Step 3</div>
<div class="s-title">流体是画布，<br>你的内容是前景</div>
<div class="s-sub">技术做背景，叙事做前景——这才是作品，不是 demo。</div>

<div class="s-card">
  <div class="s-card-title"><span style="color:var(--blue)">●</span> 叠加标题文字</div>
  <div class="s-card-body">
    「在流体上方叠加一层文字，居中显示『Evans』，
    字体很大（比如 120px），白色，字重细（font-weight: 300），
    不透明度 0.9。文字在液体上方，不影响液体交互。
    给我修改后的完整 index.html。」
  </div>
</div>

<div class="s-card">
  <div class="s-card-title"><span style="color:var(--green)">●</span> 加副标题和间距</div>
  <div class="s-card-body">
    「在名字下方加一行小字『共生 · Symbiosis』，
    字母间距 0.3em，颜色白色半透明（opacity 0.4），
    字号 14px，放在名字下方 24px 的位置。」
  </div>
</div>

<div class="s-card">
  <div class="s-card-title"><span style="color:var(--orange)">●</span> 改成「呼吸感」自动流动</div>
  <div class="s-card-body">
    「我想让页面有呼吸感——鼠标不操作时，
    液体自动缓慢在屏幕上流动，像有生命的东西，
    速度很慢，颜色很淡；鼠标移动时才激烈响应。
    帮我实现这个自动流动效果。」
  </div>
</div>

<div class="s-card">
  <div class="s-card-title"><span style="color:var(--purple)">●</span> 加点击互动彩蛋</div>
  <div class="s-card-body">
    「点击页面任意位置时，爆发一圈放射状的彩色液体，
    像扔了一颗颜料炸弹，向四周喷射。
    每次点击颜色随机，给我完整的 index.html。」
  </div>
</div>

<div class="s-tip">
  <span class="s-tip-icon">💡</span>
  每加一个功能，就问一次。不要把四个需求同时发给 AI——分开做，每步确认效果，出了问题也好定位。
</div>
`
},

// ── Slide 6: 发布上线 ────────────────────────────────
{
  id: 'publish',
  html: `
<div class="s-eyebrow">第 6 页 · 发布上线</div>
<div class="s-title">做好了，<br>怎么发出去让人看？</div>
<div class="s-sub">GitHub Pages 是最简单的免费方案——不用买服务器，不用配置域名，三步搞定。</div>

<ol class="s-steps">
  <li>
    <span class="step-num">1</span>
    <div>
      <strong>注册 GitHub，新建仓库</strong><br>
      去 <strong>github.com</strong> 用邮箱注册账号。
      登录后点右上角头像旁边的 <strong>+</strong>，选 <strong>New repository</strong>。
      仓库名随便取，比如 <strong>fluid-demo</strong>，
      选 <strong>Public（公开）</strong>，点 Create repository。
    </div>
  </li>
  <li>
    <span class="step-num">2</span>
    <div>
      <strong>上传你的 index.html</strong><br>
      进入仓库页面，点 <strong>Add file → Upload files</strong>，
      把 index.html 拖进去，
      下方 Commit changes 写个备注（随便写），点确认。
      文件就上传到 GitHub 了。
    </div>
  </li>
  <li>
    <span class="step-num">3</span>
    <div>
      <strong>开启 GitHub Pages</strong><br>
      点仓库页面的 <strong>Settings</strong>，左边菜单找 <strong>Pages</strong>，
      Source 那里选 <strong>Deploy from a branch</strong>，
      分支选 <strong>main</strong>，点 Save。
      等 1-2 分钟，页面顶部出现你的链接：<br>
      <strong>https://你的用户名.github.io/fluid-demo/</strong>
    </div>
  </li>
</ol>

<div class="s-card" style="margin-top:12px;">
  <div class="s-card-title"><span style="color:var(--green)">✓</span> 以后更新</div>
  <div class="s-card-body">
    每次 AI 改完代码，重新进仓库，点 index.html 文件，
    点右上角铅笔图标或 <strong>Upload files</strong> 替换文件。
    等 1 分钟，刷新链接就生效——这就是你的「发布流程」。
  </div>
</div>

<div class="s-tip">
  <span class="s-tip-icon">💡</span>
  搞不定任何 GitHub 操作？截图发给 AI：「我在做这一步，截图是这样，我下一步应该点哪里？」
</div>
`
},

// ── Slide 7: 遇到问题 ────────────────────────────────
{
  id: 'debug',
  html: `
<div class="s-eyebrow">第 7 页 · 遇到问题</div>
<div class="s-title">改坏了 /<br>没效果 / 看不懂</div>
<div class="s-sub">每一种卡住的情况，都有对应的处理方式。不需要自己排查，让 AI 来。</div>

<div class="s-card">
  <div class="s-card-title"><span style="color:var(--orange)">▲</span> 页面打开是空白</div>
  <div class="s-card-body">
    在浏览器按 <strong>F12</strong>（Mac 按 Command+Option+I）打开开发者工具，
    点顶部 <strong>Console（控制台）</strong>选项卡，
    看里面有没有红色文字——那就是报错信息。
    截图发给 AI：「出现了这个报错，帮我找原因修复，给我完整的 index.html。」
  </div>
</div>

<div class="s-card">
  <div class="s-card-title"><span style="color:var(--orange)">▲</span> 效果和我想要的不一样</div>
  <div class="s-card-body">
    不要说「不对」或「改一下」——AI 不知道哪里不对。<br>
    要说具体：「发光效果太强了，我想要更微弱、更克制的那种，
    现在看起来像曝光过度，我想要若隐若现的感觉，帮我调整。」<br>
    <strong>描述你看到的 + 描述你想要的</strong>，两个都说。
  </div>
</div>

<div class="s-card">
  <div class="s-card-title"><span style="color:var(--orange)">▲</span> AI 给的是代码片段，不知道放哪</div>
  <div class="s-card-body">
    直接说：「不要给片段，帮我给完整的 index.html，
    我复制粘贴整个文件替换就行，不要让我自己找位置插入。」<br>
    <strong>永远要求 AI 给完整文件</strong>，不要让它给你一段说「在第 XX 行加入这个」。
  </div>
</div>

<div class="s-card">
  <div class="s-card-title"><span style="color:var(--orange)">▲</span> 改了，GitHub 链接没变化</div>
  <div class="s-card-body">
    GitHub Pages 有缓存，文件上传后要等 <strong>1-3 分钟</strong>才生效。
    等等再看，或者按 <strong>Ctrl+Shift+R</strong>（Mac: Command+Shift+R）强制刷新，
    跳过浏览器缓存。
  </div>
</div>

<div class="s-card">
  <div class="s-card-title"><span style="color:var(--green)">✓</span> 万能修复模板</div>
  <div class="s-card-body">
    「我现在的 index.html 全部代码如下：（粘贴完整代码）。
    出现的问题是：（描述）。帮我找到问题，给我修复后的完整 index.html。」
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
<div class="s-sub">做完这件事，你学到的不是 WebGL，是一种新的创作方式。</div>

<div class="s-card">
  <div class="s-card-title"><span style="color:var(--blue)">●</span> 你是导演，AI 是编程团队</div>
  <div class="s-card-body">
    导演不需要会操作摄影机、剪辑软件、调色台。
    但导演知道自己想要什么画面，能用语言精确描述它。<br>
    你的工作是把脑子里的画面用语言说清楚，
    AI 负责把它变成代码。
    <strong>语言描述能力 = 你的编程能力。</strong>
  </div>
</div>

<div class="s-card">
  <div class="s-card-title"><span style="color:var(--green)">●</span> 描述越具体，结果越准</div>
  <div class="s-card-body">
    ❌ 「好看一点」→ AI 猜你的审美，大概率猜错<br>
    ❌ 「改一下颜色」→ 改成什么颜色？<br>
    ✓ 「颜色改成深紫色 #6B21A8，发光晕染半径小一点，整体更克制优雅，不要太艳」<br><br>
    参考系是：你自己能不能根据这句话在脑子里想象出一个具体的画面。能想象出来，AI 就大概率能做出来。
  </div>
</div>

<div class="s-card">
  <div class="s-card-title"><span style="color:var(--orange)">●</span> 迭代是工作流，不是失败</div>
  <div class="s-card-body">
    专业设计师改稿 10 轮是正常的。Vibe Coding 改 20 次也是正常的。
    每改一次你对效果的感觉会更精准，你的描述能力也在变强。
    第一版永远不是终点，第一版只是「起点」。
  </div>
</div>

<div class="s-divider"></div>

<div style="font-size:12px; color:var(--txt2); line-height:2.1;">
  <strong style="color:var(--txt)">你今天做了什么：</strong><br>
  用自然语言指挥 AI，从空白文件，做出了一个调用显卡、
  实时模拟流体物理、在浏览器里运行的互动网页。<br><br>
  你没有学 WebGL，没有学 GLSL，没有学 Navier-Stokes。<br>
  但你做出了一个需要这三项技术的作品。<br><br>
  <strong style="color:var(--txt)">技术是手段，你想表达什么才是核心。</strong>
</div>
`
},

];
