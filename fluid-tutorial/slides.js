// ══════════════════════════════════════════
// slides.js — 面向零基础小白，AI vibe coding 操作手册
// ══════════════════════════════════════════

window.SLIDES = [

// ── Slide 0: Cover ──────────────────────────────────
{
  id: 'cover',
  html: `
<div class="cover-slide">
  <div class="cover-kicker">零基础 · AI 辅助 · 可复刻</div>
  <div class="cover-h1">不会写代码，<br>也能做出<br><em>这个效果</em></div>
  <div class="cover-lead">
    你现在看到的流动液体，是用 AI 对话一步步「说」出来的。<br><br>
    这个课件告诉你：<strong style="color:var(--txt)">怎么说、说什么、按什么顺序说。</strong>
  </div>
  <div class="cover-lead" style="margin-bottom:10px; font-size:12px;">
    👈 左边就是最终效果，边看边学
  </div>
  <div class="s-tags">
    <span class="s-tag blue">不用写代码</span>
    <span class="s-tag green">只需要 AI 对话</span>
    <span class="s-tag orange">约 30 分钟完成</span>
  </div>
  <div class="cover-meta">共 8 页 · 点击右下角 → 开始</div>
</div>
`
},

// ── Slide 1: 先看懂你在做什么 ────────────────────────
{
  id: 'what',
  html: `
<div class="s-eyebrow">第 1 页 · 先搞清楚</div>
<div class="s-title">这个效果<br>到底是什么？</div>
<div class="s-sub">在动手之前，先用大白话理解它。</div>

<div class="s-card">
  <div class="s-card-title"><span style="color:var(--blue)">●</span> 它是一个网页</div>
  <div class="s-card-body">
    打开浏览器就能看，不需要安装任何软件。你可以把链接发给任何人，他们也能体验。
  </div>
</div>

<div class="s-card">
  <div class="s-card-title"><span style="color:var(--green)">●</span> 液体是「算」出来的，不是视频</div>
  <div class="s-card-body">
    每当你拖动鼠标，屏幕就重新计算一次液体怎么流动。<br>
    所以它会对你的操作实时响应——这叫<strong>实时模拟</strong>。
  </div>
</div>

<div class="s-card">
  <div class="s-card-title"><span style="color:var(--orange)">●</span> 它用了显卡的算力</div>
  <div class="s-card-body">
    普通网页用 CPU（电脑的大脑）计算。<br>
    这个效果用的是 <strong>GPU（显卡）</strong>，显卡专门做图形计算，
    速度快得多，才能让液体实时流动不卡顿。<br><br>
    这个技术叫 <strong>WebGL</strong>，是浏览器调用显卡的接口。
  </div>
</div>

<div class="s-tip">
  <span class="s-tip-icon">💡</span>
  记住这三个词：<strong>网页 / 实时模拟 / WebGL（显卡）</strong>。后面跟 AI 说话时用得到。
</div>
`
},

// ── Slide 2: 幕后原理（极简版）────────────────────────
{
  id: 'how',
  html: `
<div class="s-eyebrow">第 2 页 · 幕后原理（30秒版）</div>
<div class="s-title">液体为什么<br>看起来那么真？</div>
<div class="s-sub">不用记住细节，只需要有个感觉。</div>

<div class="s-card">
  <div class="s-card-title"><span style="color:var(--blue)">●</span> 网格 + 速度</div>
  <div class="s-card-body">
    屏幕被切成很多很多小格子。每个格子记住两件事：<br>
    现在是什么颜色？流动方向和速度是多少？<br><br>
    每一帧（1/60 秒），所有格子同时更新一次——这就是液体「动」的原因。
  </div>
</div>

<div class="s-card">
  <div class="s-card-title"><span style="color:var(--green)">●</span> 鼠标 = 扔进去一滴颜料</div>
  <div class="s-card-body">
    你拖动鼠标，程序在那个位置「扔」一滴彩色颜料，同时给周围的格子施加一个速度。
    颜料顺着速度扩散——就是你看到的效果。
  </div>
</div>

<div class="s-card">
  <div class="s-card-title"><span style="color:var(--purple)">●</span> 发光效果是后期加的</div>
  <div class="s-card-body">
    液体渲染好之后，再叠一层「Bloom 发光」滤镜，
    让亮色往外晕染——这就是为什么看起来像霓虹灯。
  </div>
</div>

<div class="s-tip">
  <span class="s-tip-icon">💡</span>
  去左边试试：<strong>快速划动</strong>颜色更浓；<strong>慢慢画圆</strong>会出现漩涡。
</div>
`
},

// ── Slide 3: 准备工作 ────────────────────────────────
{
  id: 'prep',
  html: `
<div class="s-eyebrow">第 3 页 · 准备工作</div>
<div class="s-title">开始之前<br>需要准备什么？</div>
<div class="s-sub">全部免费，15 分钟搞定。</div>

<ol class="s-steps">
  <li>
    <span class="step-num">1</span>
    <div>
      <strong>注册 GitHub 账号</strong><br>
      去 github.com 注册，用邮箱就行。GitHub 是存放代码的地方，也是免费发布网页的平台。
    </div>
  </li>
  <li>
    <span class="step-num">2</span>
    <div>
      <strong>打开 Claude 或 ChatGPT</strong><br>
      claude.ai 或 chatgpt.com，注册免费账号。这是你的 AI 助手，全程帮你写代码。
    </div>
  </li>
  <li>
    <span class="step-num">3</span>
    <div>
      <strong>找到原始源代码</strong><br>
      在 GitHub 搜索 <strong>「paveldogreat WebGL-Fluid-Simulation」</strong>，找到这个项目。
      这是原版开源代码，免费可以用。
    </div>
  </li>
  <li>
    <span class="step-num">4</span>
    <div>
      <strong>Fork（复制）到自己名下</strong><br>
      进入项目页，点右上角 <strong>Fork</strong> 按钮，选择「复制到我的账号」。
      现在你有了一份一模一样的代码，归你所有。
    </div>
  </li>
</ol>

<div class="s-tip">
  <span class="s-tip-icon">💡</span>
  Fork 就像「复印」——原作者的不变，你拿着副本随意改。
</div>
`
},

// ── Slide 4: 发布网页 ────────────────────────────────
{
  id: 'deploy',
  html: `
<div class="s-eyebrow">第 4 页 · 发布网页</div>
<div class="s-title">三步让它<br>变成公开链接</div>
<div class="s-sub">GitHub Pages = 免费网站托管，零成本。</div>

<ol class="s-steps">
  <li>
    <span class="step-num">1</span>
    <div>
      <strong>进入你 Fork 的仓库</strong><br>
      地址是 github.com/你的用户名/WebGL-Fluid-Simulation
    </div>
  </li>
  <li>
    <span class="step-num">2</span>
    <div>
      <strong>点 Settings → Pages</strong><br>
      在页面左侧找到 Settings（设置），进去后找 Pages 选项。
    </div>
  </li>
  <li>
    <span class="step-num">3</span>
    <div>
      <strong>Source 选 main 分支，点 Save</strong><br>
      等 1-2 分钟，GitHub 给你生成一个链接：<br>
      <strong>https://你的用户名.github.io/WebGL-Fluid-Simulation/</strong><br>
      打开它——效果就在线了！
    </div>
  </li>
</ol>

<div class="s-card" style="margin-top:14px;">
  <div class="s-card-title"><span style="color:var(--green)">✓</span> 现在你已经有了一个和左边一样的网页</div>
  <div class="s-card-body">
    链接可以直接分享给任何人，手机电脑都能打开，完全免费。
  </div>
</div>

<div class="s-tip">
  <span class="s-tip-icon">💡</span>
  卡住了？直接截图发给 Claude：「我想开启 GitHub Pages，截图在这里，下一步怎么做？」
</div>
`
},

// ── Slide 5: 用 AI 改效果 ───────────────────────────
{
  id: 'ai-modify',
  html: `
<div class="s-eyebrow">第 5 页 · 用 AI 改效果</div>
<div class="s-title">怎么跟 AI 说话<br>才能改出你想要的？</div>
<div class="s-sub">说清楚「你看到什么 / 你想要什么」就够了。</div>

<div class="s-card">
  <div class="s-card-title">❌ 说这种话没用</div>
  <div class="s-card-body">
    「帮我改一下代码」「让它好看一点」<br>
    → AI 不知道你想要什么
  </div>
</div>

<div class="s-card">
  <div class="s-card-title"><span style="color:var(--green)">✓</span> 这样说 AI 能精准执行</div>
  <div class="s-card-body" style="line-height:2;">
    「我有一个 WebGL 流体模拟网页，文件叫 script.js。
    我想让它打开时<strong>自动喷出彩色液体</strong>，不用等我拖鼠标。
    帮我改 script.js，给我完整代码。」<br><br>
    「我想把背景颜色改成深蓝色，不是黑色。在哪里改？」<br><br>
    「我想让液体消散得更慢，流动更久，调哪个参数？」
  </div>
</div>

<div class="s-card">
  <div class="s-card-title"><span style="color:var(--blue)">●</span> 万能句式模板</div>
  <div class="s-card-body">
    <strong>「我有一个 ___，我想实现 ___，文件是 ___，帮我给出完整修改后的代码。」</strong>
  </div>
</div>

<div class="s-tip">
  <span class="s-tip-icon">💡</span>
  把 script.js 的内容直接粘给 AI，让它看着代码改，比描述更精准。
</div>
`
},

// ── Slide 6: 分步提示词示例 ─────────────────────────
{
  id: 'prompts',
  html: `
<div class="s-eyebrow">第 6 页 · 完整操作流程</div>
<div class="s-title">从零到成品<br>的完整对话路径</div>
<div class="s-sub">按顺序发给 AI，每步拿到代码就替换文件。</div>

<ol class="s-steps">
  <li>
    <span class="step-num">1</span>
    <div>
      <strong>让 AI 解释代码</strong><br>
      「把这段 script.js 用最简单的中文解释给我，我没有编程基础，
      告诉我每个参数是什么意思。」<br>
      → 先搞懂，再改。
    </div>
  </li>
  <li>
    <span class="step-num">2</span>
    <div>
      <strong>改开场效果</strong><br>
      「帮我让页面打开后 3 秒内自动喷出 5 朵彩色液体花，
      之后停止，等用户自己操作。给我完整的 script.js。」
    </div>
  </li>
  <li>
    <span class="step-num">3</span>
    <div>
      <strong>改视觉风格</strong><br>
      「我想要更少的颜色种类，只用紫色和青色，其他颜色去掉。
      在哪里改，给我代码。」
    </div>
  </li>
  <li>
    <span class="step-num">4</span>
    <div>
      <strong>加自己的文字</strong><br>
      「在流体上层叠加一行居中的白色文字『Evans』，
      字体大而透明，不影响液体交互。给我 index.html 和 CSS。」
    </div>
  </li>
  <li>
    <span class="step-num">5</span>
    <div>
      <strong>保存上传</strong><br>
      把 AI 给的代码替换掉 GitHub 里的文件，
      等 1 分钟，刷新你的网页链接——改动就生效了。
    </div>
  </li>
</ol>
`
},

// ── Slide 7: 遇到问题怎么办 ──────────────────────────
{
  id: 'debug',
  html: `
<div class="s-eyebrow">第 7 页 · 遇到问题</div>
<div class="s-title">改坏了 / 没效果<br>怎么办？</div>
<div class="s-sub">不用慌，AI 也能帮你修。</div>

<div class="s-card">
  <div class="s-card-title"><span style="color:var(--orange)">●</span> 改完页面变空白</div>
  <div class="s-card-body">
    在浏览器按 <strong>F12</strong> 打开开发者工具，看「Console」（控制台）里红色的报错文字，
    截图发给 AI：「出现了这个报错，帮我修复。」
  </div>
</div>

<div class="s-card">
  <div class="s-card-title"><span style="color:var(--orange)">●</span> 改了没变化</div>
  <div class="s-card-body">
    GitHub Pages 有缓存，改完可能要等 <strong>1-3 分钟</strong>。
    等等再刷新，或者按 <strong>Ctrl+Shift+R</strong> 强制刷新。
  </div>
</div>

<div class="s-card">
  <div class="s-card-title"><span style="color:var(--orange)">●</span> AI 给的代码不知道放哪</div>
  <div class="s-card-body">
    直接问 AI：「你给的这段代码，我应该放在 script.js 的什么位置？
    帮我给出替换后的完整文件。」
    → 让 AI 给你完整文件，不要只给片段。
  </div>
</div>

<div class="s-card">
  <div class="s-card-title"><span style="color:var(--green)">✓</span> 万能修复咒语</div>
  <div class="s-card-body">
    「我按照你说的改了，但出现了问题：___（描述现象）。
    这是目前的完整代码：（粘贴代码）。帮我找到问题并修复，给我正确的完整代码。」
  </div>
</div>
`
},

// ── Slide 8: 下一步 ──────────────────────────────────
{
  id: 'next',
  html: `
<div class="s-eyebrow">第 8 页 · 下一步</div>
<div class="s-title">做出来之后<br>还能怎么玩？</div>
<div class="s-sub">这只是起点，下面是更多方向。</div>

<div class="s-card">
  <div class="s-card-title"><span style="color:var(--blue)">●</span> 嵌入你自己的作品集网页</div>
  <div class="s-card-body">
    用 <strong>&lt;iframe&gt;</strong> 标签把流体页面嵌进你的个人主页，
    一行代码就能让你的网站多一个活的背景。<br>
    让 AI 帮你写嵌入代码。
  </div>
</div>

<div class="s-card">
  <div class="s-card-title"><span style="color:var(--green)">●</span> 加摄像头 / 手势控制</div>
  <div class="s-card-body">
    跟 AI 说：「帮我加一个功能，用摄像头捕捉手势，
    挥手就能控制液体流动，不用鼠标。」
    AI 会引入 <strong>MediaPipe</strong> 手势识别库来实现这个。
    （这就是 Evans 版本做的事）
  </div>
</div>

<div class="s-card">
  <div class="s-card-title"><span style="color:var(--purple)">●</span> 加文字 / 品牌 / 叙事层</div>
  <div class="s-card-body">
    在流体上叠加你的名字、一句话、或者整个展览说明，
    技术做背景，你的内容做前景——这就是 Vibe Coding 的本质。
  </div>
</div>

<div class="s-divider"></div>

<div style="font-size:12px; color:var(--txt2); line-height:1.9;">
  <strong style="color:var(--txt)">核心思路：</strong><br>
  找到开源效果 → Fork 到自己名下 → 跟 AI 对话改造 → 加上自己的叙事<br><br>
  你不需要懂技术细节，你需要懂<strong style="color:var(--txt)">「我想表达什么」</strong>。
</div>
`
},

];
