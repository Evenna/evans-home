const S = [];
function slide(id, fn) { S.push({ id, fn }); }
window.SLIDES = S;

// ─────────────────────────────────────────
// 00 · COVER
// ─────────────────────────────────────────
slide('cover', function(el) {
  el.className += ' cover';
  el.innerHTML = `
    <div class="cover-grid"></div>
    <div class="glow" style="width:560px;height:400px;background:rgba(10,132,255,.08);top:5%;left:15%"></div>
    <div class="glow" style="width:380px;height:300px;background:rgba(191,90,242,.07);bottom:10%;right:12%"></div>
    <div class="cover-content">
      <div class="cover-kicker">Creative Coding × AI · 2024—2026</div>
      <h1 class="cover-h1">Vibe<br><em>Coding</em></h1>
      <p class="cover-sub">用自然语言描述想法，AI 写代码——<br>这些是已经上线的艺术级成品网站</p>
      <div class="cover-meta">8 个案例 · Awwwards · WebGL · 互动装置</div>
    </div>
    <div class="arrow-hint">
      <span>SCROLL</span>
      <div class="arrow-hint-line"></div>
    </div>
  `;
});

// ─────────────────────────────────────────
// 01 · Bruno Simon — 驾车导航作品集
// ─────────────────────────────────────────
slide('bruno', function(el) {
  el.innerHTML = `
    <div class="split">
      <div class="info">
        <div class="eyebrow" style="color:var(--blue)">01 · WebGL 作品集</div>
        <div class="award">🏆 Awwwards SOTD · 10M+ 浏览</div>
        <h2 class="title">驾车导航<br>个人作品集</h2>
        <div class="author">Bruno Simon · bruno-simon.com · 法国</div>
        <p class="desc">
          打开即进入一个<strong>完整的 3D 迷你世界</strong>——驾驶玩具车穿越赛道、撞倒障碍物，每个停靠点是一个项目展示。<br><br>
          Three.js + Cannon.js 物理引擎，含成就系统、多人看见彼此的光标。彻底重新定义了"作品集网站"的形式。
        </p>
        <div class="tags">
          <span class="tag">Three.js</span>
          <span class="tag">物理引擎</span>
          <span class="tag">多人互动</span>
          <span class="tag">Blender</span>
        </div>
        <a class="link" href="https://bruno-simon.com" target="_blank">bruno-simon.com ↗</a>
      </div>
      <div class="demo">
        <iframe src="https://bruno-simon.com" loading="lazy" allow="autoplay; fullscreen"></iframe>
        <span class="demo-tag">🚗 方向键驾车导航</span>
        <span class="demo-src">bruno-simon.com</span>
      </div>
    </div>
  `;
});

// ─────────────────────────────────────────
// 02 · Project Aperture — 摄影 WebGL 叙事
// ─────────────────────────────────────────
slide('aperture', function(el) {
  el.innerHTML = `
    <div class="split">
      <div class="info">
        <div class="eyebrow" style="color:var(--teal)">02 · 摄影叙事网站</div>
        <div class="award">🏆 Awwwards Nominee · 9.9/10</div>
        <h2 class="title">Project<br>Aperture</h2>
        <div class="author">Isaak De Coninck · 比利时 · 2026</div>
        <p class="desc">
          欧洲旅行摄影集，以<strong>电影级 WebGL 体验</strong>呈现——散落的照片网格随光标漂移，目的地以动态模糊揭幕，取景框跟随鼠标移动。<br><br>
          Three.js + GSAP + Nuxt.js，画廊装置感，不像网站更像艺术展览。
        </p>
        <div class="tags">
          <span class="tag">Three.js</span>
          <span class="tag">GSAP</span>
          <span class="tag">Motion Blur</span>
          <span class="tag">Nuxt.js</span>
        </div>
        <a class="link" href="https://www.project-aperture.com" target="_blank">project-aperture.com ↗</a>
      </div>
      <div class="demo">
        <iframe src="https://www.project-aperture.com" loading="lazy"></iframe>
        <span class="demo-tag">📸 移动鼠标体验视差</span>
        <span class="demo-src">project-aperture.com</span>
      </div>
    </div>
  `;
});

// ─────────────────────────────────────────
// 03 · Nithin Warrier — Claude Code 构建的作品集
// ─────────────────────────────────────────
slide('nithin', function(el) {
  el.innerHTML = `
    <div class="split">
      <div class="info">
        <div class="eyebrow" style="color:var(--purple)">03 · AI 构建的作品集</div>
        <div class="award">🏆 Awwwards Nominee · Claude Code 构建</div>
        <h2 class="title">Nithin Warrier<br>Visual Designer</h2>
        <div class="author">Nithin M Warrier · 设计师 · 2026</div>
        <p class="desc">
          主页上赫然写着：<strong>「brought to life with Claude Code」</strong><br><br>
          Three.js Canvas Hero、打字动效逐字拼出「WARRIER」、设计服务旋转标签、项目卡片悬停效果——
          全部通过与 Claude 对话生成，是首批登上 Awwwards 的 AI 编写网站之一。
        </p>
        <div class="tags">
          <span class="tag">Claude Code</span>
          <span class="tag">Three.js</span>
          <span class="tag">Typography</span>
          <span class="tag">Vibe Coded</span>
        </div>
        <a class="link" href="https://www.nithinmwarrier.com" target="_blank">nithinmwarrier.com ↗</a>
      </div>
      <div class="demo">
        <iframe src="https://www.nithinmwarrier.com" loading="lazy"></iframe>
        <span class="demo-tag">✦ Claude Code 全程构建</span>
        <span class="demo-src">nithinmwarrier.com</span>
      </div>
    </div>
  `;
});

// ─────────────────────────────────────────
// 04 · IZANAMI — 日式和风 WebGL
// ─────────────────────────────────────────
slide('izanami', function(el) {
  el.innerHTML = `
    <div class="split">
      <div class="info">
        <div class="eyebrow" style="color:var(--orange)">04 · 品牌叙事网站</div>
        <div class="award">🏆 Awwwards Nominee · 2026</div>
        <h2 class="title">IZANAMI<br>和の精神</h2>
        <div class="author">baqemono.inc. + Tomoyuki Nakata · 日本</div>
        <p class="desc">
          日本健康品牌网站，以<strong>「和」（Wa · 和谐）</strong>为灵魂设计——丝绸般流动的 WebGL 模拟，深景差滚动，导航动画如仪式般庄重。<br><br>
          WebGL + GSAP + Figma，像一场数字茶道，每一帧都是精心构思的视觉诗。
        </p>
        <div class="tags">
          <span class="tag">WebGL</span>
          <span class="tag">GSAP</span>
          <span class="tag">Fluid Sim</span>
          <span class="tag">日本设计</span>
        </div>
        <a class="link" href="https://izanami-official.com" target="_blank">izanami-official.com ↗</a>
      </div>
      <div class="demo">
        <iframe src="https://izanami-official.com" loading="lazy"></iframe>
        <span class="demo-tag">🌿 滚动体验流动动效</span>
        <span class="demo-src">izanami-official.com</span>
      </div>
    </div>
  `;
});
