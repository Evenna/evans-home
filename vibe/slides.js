const SLIDES = [];
function s(id, renderFn) { SLIDES.push({ id, render: renderFn }); }

// ─── SLIDE 0: COVER ──────────────────────────────────────────
s('cover', function(el) {
  el.style.cssText = 'background:#08090a;';
  el.innerHTML = `
    <div class="cover-bg"></div>
    <div class="cover-grid"></div>
    <div class="cover-content">
      <div class="cover-eyebrow">2025 · AI × Creative Coding</div>
      <h1 class="cover-title">Vibe<br><span>Coding</span></h1>
      <p class="cover-sub">用自然语言描述想法，让 AI 生成代码——<br>不会写代码，也能做出令人惊艳的东西</p>
      <div class="cover-chips">
        <span class="chip" style="color:#4f8fff;border-color:rgba(79,143,255,.3);background:rgba(79,143,255,.08)">3D 场景</span>
        <span class="chip" style="color:#30d158;border-color:rgba(48,209,88,.3);background:rgba(48,209,88,.08)">粒子系统</span>
        <span class="chip" style="color:#bf5af2;border-color:rgba(191,90,242,.3);background:rgba(191,90,242,.08)">作品集</span>
        <span class="chip" style="color:#40c8e0;border-color:rgba(64,200,224,.3);background:rgba(64,200,224,.08)">摄像头交互</span>
        <span class="chip" style="color:#ff9f0a;border-color:rgba(255,159,10,.3);background:rgba(255,159,10,.08)">游戏</span>
        <span class="chip" style="color:#30d158;border-color:rgba(48,209,88,.3);background:rgba(48,209,88,.08)">效率工具</span>
        <span class="chip" style="color:#4f8fff;border-color:rgba(79,143,255,.3);background:rgba(79,143,255,.08)">App</span>
        <span class="chip" style="color:#ff375f;border-color:rgba(255,55,95,.3);background:rgba(255,55,95,.08)">生成艺术</span>
      </div>
    </div>
    <div class="scroll-hint">
      <div class="scroll-hint-text">SCROLL</div>
      <div class="scroll-hint-line"></div>
    </div>
  `;
});

// ─── SLIDE 1: WHAT IS VIBE CODING ────────────────────────────
s('what', function(el) {
  el.style.cssText = 'background:#08090a;';
  el.innerHTML = `
    <div class="glow glow-blue" style="top:10%;left:5%;"></div>
    <div class="glow glow-purple" style="bottom:15%;right:8%;"></div>
    <div style="position:relative;z-index:2;max-width:900px;padding:0 48px;width:100%;">
      <div class="sec-category" style="color:#4f8fff;">CONCEPT</div>
      <h2 class="sec-title" style="font-size:clamp(32px,4.5vw,56px);">什么是 Vibe Coding？</h2>
      <p style="margin-top:16px;font-size:17px;color:var(--txt2);line-height:1.7;max-width:640px;">
        2025年2月，Andrej Karpathy 提出「Vibe Coding」——<br>
        <strong style="color:var(--txt)">用自然语言描述想法，AI 生成并迭代代码，人几乎不看代码本身。</strong>
      </p>
      <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:16px;margin-top:40px;">
        <div class="card" style="text-align:center;">
          <div style="font-size:32px;margin-bottom:12px;">💬</div>
          <div style="font-size:14px;font-weight:600;color:var(--txt);margin-bottom:8px;">描述意图</div>
          <div style="font-size:13px;color:var(--txt2);line-height:1.6">「帮我做一个粒子跟随鼠标移动的网页」</div>
        </div>
        <div class="card" style="text-align:center;">
          <div style="font-size:32px;margin-bottom:12px;">⚡</div>
          <div style="font-size:14px;font-weight:600;color:var(--txt);margin-bottom:8px;">AI 生成代码</div>
          <div style="font-size:13px;color:var(--txt2);line-height:1.6">Claude / ChatGPT / Cursor 立即输出可运行代码</div>
        </div>
        <div class="card" style="text-align:center;">
          <div style="font-size:32px;margin-bottom:12px;">🚀</div>
          <div style="font-size:14px;font-weight:600;color:var(--txt);margin-bottom:8px;">迭代上线</div>
          <div style="font-size:13px;color:var(--txt2);line-height:1.6">不懂语法也能持续调整、部署、分享</div>
        </div>
      </div>
      <div style="margin-top:28px;padding:20px 24px;background:rgba(79,143,255,.07);border:1px solid rgba(79,143,255,.2);border-radius:12px;">
        <span style="font-family:'JetBrains Mono',monospace;font-size:12px;color:#4f8fff;letter-spacing:.08em;">KARPATHY  ·  2025.02</span>
        <p style="margin-top:8px;font-size:14px;color:var(--txt2);line-height:1.65;font-style:italic;">
          "You fully give in to the vibes, embrace exponentials, and forget that the code even exists."
        </p>
      </div>
    </div>
  `;
});

// ─── SLIDE 2: TOOLS ──────────────────────────────────────────
s('tools', function(el) {
  el.style.cssText = 'background:#08090a;flex-direction:column;gap:32px;';
  el.innerHTML = `
    <div class="glow glow-green" style="top:20%;right:10%;"></div>
    <div style="position:relative;z-index:2;text-align:center;">
      <div class="sec-category" style="color:#30d158;">TOOLBOX</div>
      <h2 class="sec-title">主流工具全景</h2>
    </div>
    <div class="tools-grid">
      <div class="tool-card">
        <div class="tool-icon">✳️</div>
        <div class="tool-name">Claude</div>
        <div class="tool-role">Anthropic · 最强创意代码生成<br>Artifacts 即写即跑</div>
      </div>
      <div class="tool-card">
        <div class="tool-icon">🖱️</div>
        <div class="tool-name">Cursor</div>
        <div class="tool-role">AI 代码编辑器<br>Tab 预测 + Agent 模式</div>
      </div>
      <div class="tool-card">
        <div class="tool-icon">⚡</div>
        <div class="tool-name">Bolt.new</div>
        <div class="tool-role">浏览器全栈应用构建<br>无需安装任何软件</div>
      </div>
      <div class="tool-card">
        <div class="tool-icon">🌿</div>
        <div class="tool-name">v0 by Vercel</div>
        <div class="tool-role">UI 组件 AI 生成<br>React + shadcn/ui</div>
      </div>
      <div class="tool-card">
        <div class="tool-icon">💙</div>
        <div class="tool-name">Lovable</div>
        <div class="tool-role">全栈 App 构建器<br>一句话生成 SaaS</div>
      </div>
      <div class="tool-card">
        <div class="tool-icon">🔁</div>
        <div class="tool-name">Replit Agent</div>
        <div class="tool-role">在线全栈自动构建<br>即刻部署运行</div>
      </div>
      <div class="tool-card">
        <div class="tool-icon">💬</div>
        <div class="tool-name">ChatGPT</div>
        <div class="tool-role">OpenAI · 广泛基础<br>Canvas 实时代码</div>
      </div>
      <div class="tool-card">
        <div class="tool-icon">🏄</div>
        <div class="tool-name">Windsurf</div>
        <div class="tool-role">Codeium 出品<br>Cascade 联网 Agent</div>
      </div>
    </div>
  `;
});

// ─── SLIDE 3: 3D SCENES ──────────────────────────────────────
s('3d', function(el) {
  el.style.cssText = 'background:#08090a;flex-direction:column;gap:36px;';
  el.innerHTML = `
    <div class="glow glow-blue" style="top:5%;left:15%;"></div>
    <div style="position:relative;z-index:2;text-align:center;">
      <div class="sec-category" style="color:#4f8fff;">CATEGORY 01</div>
      <h2 class="sec-title">3D 场景</h2>
      <p class="sec-desc">Three.js / WebGL + AI 驱动，浏览器里的沉浸式3D体验</p>
    </div>
    <div class="cards-layout grid-3">
      <div class="card">
        <div class="card-accent-line" style="background:#4f8fff;"></div>
        <div class="card-emoji">✈️</div>
        <div class="card-name">飞行模拟器</div>
        <div class="card-author">Pieter Levels · @levelsio</div>
        <div class="card-desc">浏览器内60fps飞行模拟，含多人联机、ATC通话、天气系统——用 Cursor + Claude 几小时内做完，病毒式传播。</div>
        <span class="card-tag" style="color:#4f8fff;">Three.js · Cursor · Claude</span>
        <a class="card-url" href="https://fly.pieter.com" target="_blank">fly.pieter.com</a>
      </div>
      <div class="card">
        <div class="card-accent-line" style="background:#4f8fff;"></div>
        <div class="card-emoji">📀</div>
        <div class="card-name">3D 弹跳 DVD 徽标</div>
        <div class="card-author">Yohannes Tesfaye</div>
        <div class="card-desc">把网络经典梗「DVD弹跳」变成3D渲染版本，含真实物理、光照和动画——AI 辅助完成所有复杂的三维数学。</div>
        <span class="card-tag" style="color:#4f8fff;">WebGL · ChatGPT</span>
        <a class="card-url" href="https://apidog.com/blog/vibe-coding-examples/" target="_blank">案例来源</a>
      </div>
      <div class="card">
        <div class="card-accent-line" style="background:#4f8fff;"></div>
        <div class="card-emoji">🚀</div>
        <div class="card-name">3D 科幻舱体作品集</div>
        <div class="card-author">Chibuike Eke</div>
        <div class="card-desc">把整个个人作品集做成「太空舱驾驶舱」风格的3D沉浸式网页，用 Claude Sonnet + Cursor 2天完成。</div>
        <span class="card-tag" style="color:#4f8fff;">React + Three.js · Claude</span>
        <a class="card-url" href="https://medium.com/@chukwubuike.eke/how-i-used-ai-to-build-an-interactive-3d-portfolio-2ef5d77fca22" target="_blank">阅读案例</a>
      </div>
    </div>
  `;
});

// ─── SLIDE 4: PARTICLES ──────────────────────────────────────
s('particle', function(el) {
  el.style.cssText = 'background:#08090a;flex-direction:column;gap:36px;';
  el.innerHTML = `
    <div class="glow glow-green" style="top:10%;right:20%;"></div>
    <div class="glow glow-teal" style="bottom:20%;left:10%;"></div>
    <div style="position:relative;z-index:2;text-align:center;">
      <div class="sec-category" style="color:#30d158;">CATEGORY 02</div>
      <h2 class="sec-title">粒子系统</h2>
      <p class="sec-desc">模拟自然行为的粒子与群体智能，Canvas 2D / WebGL 实时演算</p>
    </div>
    <div class="cards-layout grid-3">
      <div class="card">
        <div class="card-accent-line" style="background:#30d158;"></div>
        <div class="card-emoji">🐦</div>
        <div class="card-name">群集涌现模拟</div>
        <div class="card-author">Kyle Corbitt · OpenAI</div>
        <div class="card-desc">每个粒子只遵循简单的「靠近+对齐+分离」规则，却自发涌现出鸟群飞翔的有机行为——Vibe Coding 最被传播的粒子作品。</div>
        <span class="card-tag" style="color:#30d158;">Canvas 2D · Claude</span>
        <a class="card-url" href="https://www.producthunt.com/stories/best-of-vibe-coding" target="_blank">案例来源</a>
      </div>
      <div class="card">
        <div class="card-accent-line" style="background:#30d158;"></div>
        <div class="card-emoji">🌌</div>
        <div class="card-name">粒子交互实验室</div>
        <div class="card-author">AmaralSecurity / Claude Lab</div>
        <div class="card-desc">包含40+个独立粒子实验：3D星系、流体、海洋波浪、DNA双螺旋、Mandelbrot缩放……全部由 Claude Sonnet 生成。</div>
        <span class="card-tag" style="color:#30d158;">WebGL · Claude Sonnet</span>
        <a class="card-url" href="https://github.com/AmaralSecurity/vibe-coding-lab" target="_blank">GitHub 仓库</a>
      </div>
      <div class="card">
        <div class="card-accent-line" style="background:#30d158;"></div>
        <div class="card-emoji">🫧</div>
        <div class="card-name">互动泡泡纸</div>
        <div class="card-author">Anonymous Creator</div>
        <div class="card-desc">每个气泡点击后「啵」的一声破裂——极简交互，却让人停不下来。证明 Vibe Coding 不必复杂，体验才是核心。</div>
        <span class="card-tag" style="color:#30d158;">HTML Canvas · ChatGPT</span>
        <a class="card-url" href="https://apidog.com/blog/vibe-coding-examples/" target="_blank">案例来源</a>
      </div>
    </div>
  `;
});

// ─── SLIDE 5: PORTFOLIO ──────────────────────────────────────
s('portfolio', function(el) {
  el.style.cssText = 'background:#08090a;flex-direction:column;gap:36px;';
  el.innerHTML = `
    <div class="glow glow-purple" style="top:15%;left:5%;"></div>
    <div class="glow glow-pink" style="bottom:10%;right:15%;"></div>
    <div style="position:relative;z-index:2;text-align:center;">
      <div class="sec-category" style="color:#bf5af2;">CATEGORY 03</div>
      <h2 class="sec-title">个人作品集</h2>
      <p class="sec-desc">用 AI 做出原本要花数周的 3D / 动效个人主页，两天上线</p>
    </div>
    <div class="cards-layout grid-2">
      <div class="card">
        <div class="card-accent-line" style="background:#bf5af2;"></div>
        <div class="card-emoji">🛸</div>
        <div class="card-name">3D 作品集（2天版）</div>
        <div class="card-author">Abhishek Prajapati</div>
        <div class="card-desc">完全使用 AI 辅助，48小时内做出一个含3D粒子系统、交互效果的个人作品集网站，并发布在线分享。全程不手写复杂代码。</div>
        <span class="card-tag" style="color:#bf5af2;">React Three Fiber · Claude</span>
        <a class="card-url" href="https://medium.com/@abhishek-prajapati/how-i-vibe-coded-my-3d-portfolio-website-in-2-days-with-ai-help-1e5eff0c4ef6" target="_blank">阅读案例</a>
      </div>
      <div class="card">
        <div class="card-accent-line" style="background:#bf5af2;"></div>
        <div class="card-emoji">🎛️</div>
        <div class="card-name">3D 科幻舱体界面</div>
        <div class="card-author">Chibuike Eke</div>
        <div class="card-desc">作品集 = 飞船驾驶舱。访客「驾驶」穿越太空，每个星球是一个项目。React + Three.js，Claude Sonnet 全程协作。</div>
        <span class="card-tag" style="color:#bf5af2;">Three.js · React · Cursor</span>
        <a class="card-url" href="https://medium.com/@chukwubuike.eke/how-i-used-ai-to-build-an-interactive-3d-portfolio-2ef5d77fca22" target="_blank">阅读案例</a>
      </div>
    </div>
    <div style="position:relative;z-index:2;max-width:900px;padding:0 48px;width:100%;">
      <div style="background:rgba(191,90,242,.07);border:1px solid rgba(191,90,242,.2);border-radius:12px;padding:20px 24px;text-align:center;">
        <p style="font-size:14px;color:var(--txt2);line-height:1.6;">
          💡 用 <strong style="color:var(--txt)">Bolt.new</strong> 或 <strong style="color:var(--txt)">v0.dev</strong> 描述你的个人作品集风格，AI 生成初版代码——<br>
          再用 <strong style="color:var(--txt)">Cursor</strong> 迭代细节，部署到 GitHub Pages，全程可以不会写代码。
        </p>
      </div>
    </div>
  `;
});
