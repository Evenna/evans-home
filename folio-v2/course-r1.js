/* course-renderers.js  (part 1 of 2) — intro, prepare, stack, matcap */

function renderIntro(el) {
  el.innerHTML = `
<div class="sec-head">这个项目是什么</div>
<div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;margin-bottom:16px">
  ${[
    ['🚗','真实物理','车子会漂移、弹跳，碰墙有声音'],
    ['✨','Matcap美学','整个场景不用一盏灯'],
    ['🗺️','五大街区','项目/简历/游乐场像城市一样分布'],
    ['🎵','空间音效','引擎声随车速变，碰撞瞬间有响声'],
  ].map(([ic,t,d])=>`
    <div style="padding:12px;background:var(--card);border:1px solid var(--border);border-radius:9px">
      <div style="font-size:20px;margin-bottom:6px">${ic}</div>
      <div style="font-size:12px;font-weight:600;margin-bottom:3px">${t}</div>
      <div style="font-size:11.5px;color:var(--txt2)">${d}</div>
    </div>
  `).join('')}
</div>
<div class="sec-head">为什么这个项目值得复刻</div>
<div class="info-card tip">
  <h5>Bruno Simon 用这个网站改变了职业生涯</h5>
  <p>2019年发布后直接收到 Apple、Oculus、Ubisoft 的邀请。不是因为技术有多复杂——而是因为他把「个人作品集」这件普通的事，做成了一个让人忍不住玩的体验。</p>
</div>
<div class="info-card good">
  <h5>Vibe Coding 视角</h5>
  <p>你不需要精通每一行代码。你需要的是：理解「这个东西大概怎么运作」，然后准确地告诉 AI 你想要什么。AI 帮你写代码，你来判断效果好不好。</p>
</div>`;
}

function renderPrepare(el) {
  el.innerHTML = `
<div class="sec-head">需要安装的软件（全免费）</div>
<div class="checklist">
  ${[
    ['⬡','Node.js 20+','JavaScript 运行环境，一切的基础','<a href="https://nodejs.org" target="_blank">nodejs.org</a> → 下载 LTS 版本，一路 Next 安装'],
    ['📦','VS Code','写代码用的编辑器','<a href="https://code.visualstudio.com" target="_blank">code.visualstudio.com</a> → 免费，用来写和看代码'],
    ['🎨','Blender（可选）','制作3D模型','<a href="https://blender.org" target="_blank">blender.org</a> → 如果你想自己建3D场景才需要，初期可以先用 Bruno 的模型'],
  ].map(([ic,t,sub,link])=>`
    <div class="check-item">
      <div class="check-icon">${ic}</div>
      <div class="check-body">
        <h4>${t}</h4>
        <p>${sub}<br><small>${link}</small></p>
      </div>
    </div>
  `).join('')}
</div>
<div class="sec-head">需要准备的账号</div>
<div class="checklist">
  ${[
    ['🐙','GitHub 账号','免费托管代码+网页','注册后创建一个新仓库，开启 GitHub Pages'],
    ['🤖','Claude 或 ChatGPT','你的 AI 编程助手','推荐用 Claude Sonnet，代码质量更好'],
  ].map(([ic,t,sub,note])=>`
    <div class="check-item">
      <div class="check-icon">${ic}</div>
      <div class="check-body"><h4>${t}</h4><p>${sub}<br><small style="color:var(--txt3)">${note}</small></p></div>
    </div>
  `).join('')}
</div>
<div class="sec-head">克隆原项目代码</div>
<div class="code-block"><span class="c"># 在终端（Terminal）里运行这几行</span>
git clone https://github.com/brunosimon/folio-2019.git
cd folio-2019
npm install       <span class="c"># 安装所有依赖，等1-2分钟</span>
npm run dev       <span class="c"># 启动开发服务器</span>
<span class="c"># 打开浏览器访问 http://localhost:5173</span></div>
<div class="info-card tip">
  <h5>如果报错了</h5>
  <p>把报错信息完整复制，发给 AI 说「我在运行 folio-2019 项目，报错如下，帮我解决」。90% 的安装报错 AI 都能直接修复。</p>
</div>`;
}

function renderStack(el) {
  el.innerHTML = `
<div class="sec-head">七个工具的分工</div>
<canvas id="stack-diagram" width="372" height="180" style="display:block;border-radius:10px;border:1px solid var(--border);margin-bottom:16px"></canvas>
<div class="checklist" style="gap:7px">
  ${[
    ['#4f8fff','Three.js','3D 渲染引擎','就像 Photoshop 的画布，但画的是 3D 世界。在浏览器里显示几何体、材质、相机。'],
    ['#ff9f0a','Cannon.js','物理引擎','模拟重力、碰撞、摩擦。没有它，车会穿墙而过，不会弹跳。'],
    ['#30d158','GSAP','动画库','控制开场动画——物体从地面升起、相机缓移。用时间轴精确编排每个动作。'],
    ['#bf5af2','Howler.js','空间音效','引擎声随车速变化，碰撞声在撞击瞬间触发。'],
    ['#ff6b9d','Vite','开发工具','打包工具。让你写的代码能在浏览器里跑，支持热更新（保存即刷新）。'],
    ['#c8a96e','GLSL','着色器语言','直接运行在显卡上的代码。Matcap 材质、光晕效果都用它写。'],
  ].map(([col,name,role,desc])=>`
    <div style="display:flex;gap:10px;align-items:flex-start;padding:10px 13px;background:var(--card);border:1px solid var(--border);border-radius:8px">
      <span style="width:8px;height:8px;border-radius:50%;background:${col};flex-shrink:0;margin-top:4px"></span>
      <div>
        <div style="display:flex;align-items:baseline;gap:8px;margin-bottom:3px">
          <span style="font-size:13px;font-weight:600;color:${col}">${name}</span>
          <span style="font-size:11px;color:var(--txt3);font-family:var(--mono)">${role}</span>
        </div>
        <p style="font-size:12px;color:var(--txt2);line-height:1.5">${desc}</p>
      </div>
    </div>
  `).join('')}
</div>`;
  // draw stack diagram
  requestAnimationFrame(() => {
    const cv = document.getElementById('stack-diagram');
    if (!cv) return;
    const ctx = cv.getContext('2d');
    const W = cv.width, H = cv.height;
    ctx.clearRect(0, 0, W, H);
    const layers = [
      { label: 'Browser (Chrome/Safari)', col: '#1a1d24' },
      { label: 'Three.js  —  3D场景渲染', col: '#0d2040' },
      { label: 'Cannon.js  —  物理模拟', col: '#1a2a10' },
      { label: 'GSAP  —  动画控制', col: '#1c1510' },
      { label: 'GLSL Shaders  —  材质', col: '#1a1030' },
    ];
    const lh = H / layers.length;
    layers.forEach((l, i) => {
      ctx.fillStyle = l.col;
      ctx.fillRect(0, i * lh, W, lh - 1);
      ctx.fillStyle = 'rgba(255,255,255,0.5)';
      ctx.font = '11px "JetBrains Mono", monospace';
      ctx.fillText(l.label, 14, i * lh + lh / 2 + 4);
    });
  });
}

function renderMatcap(el) {
  el.innerHTML = `
<div class="sec-head">大白话解释 Matcap</div>
<div style="display:flex;gap:12px;margin-bottom:16px;align-items:flex-start">
  <canvas id="matcap-diagram" width="120" height="120" style="flex-shrink:0;border-radius:9px;border:1px solid var(--border)"></canvas>
  <div>
    <p style="font-size:13px;line-height:1.75;color:var(--txt2);margin-bottom:10px">想象你拍了一张「金属球」的照片，记录了各个方向的光照颜色。之后所有物体的光照，都直接「偷」这张球的颜色——根据表面朝向，从球上取色贴到物体上。</p>
    <div style="padding:10px 13px;background:var(--card);border-radius:8px;border:1px solid var(--border)">
      <div style="font-size:11px;color:var(--txt3);font-family:var(--mono);margin-bottom:6px">结果 →</div>
      <div style="font-size:12.5px;color:var(--green)">零灯光 · 零阴影计算 · 极快</div>
    </div>
  </div>
</div>
<div class="sec-head">传统方式 vs Matcap</div>
<div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;margin-bottom:16px">
  <div style="padding:12px;background:rgba(255,100,100,.05);border:1px solid rgba(255,100,100,.15);border-radius:9px">
    <div style="font-size:11px;color:#ff6b6b;font-family:var(--mono);margin-bottom:8px">传统 PBR 灯光</div>
    ${['需要设置太阳光、环境光','需要开 Shadow Map 渲染阴影','每帧重新计算，GPU 压力大','参数调起来很复杂'].map(t=>`<div style="font-size:12px;color:var(--txt2);padding:3px 0;display:flex;gap:6px"><span style="color:#ff6b6b">✕</span>${t}</div>`).join('')}
  </div>
  <div style="padding:12px;background:rgba(48,209,88,.05);border:1px solid rgba(48,209,88,.15);border-radius:9px">
    <div style="font-size:11px;color:var(--green);font-family:var(--mono);margin-bottom:8px">Matcap 方案</div>
    ${['一张纹理解决所有光照','假阴影平面，零GPU成本','每帧只采样纹理，极快','换一张图就换整个风格'].map(t=>`<div style="font-size:12px;color:var(--txt2);padding:3px 0;display:flex;gap:6px"><span style="color:var(--green)">✓</span>${t}</div>`).join('')}
  </div>
</div>
<div class="sec-head">开场 Reveal 动画原理</div>
<div class="info-card tip">
  <h5>物体从地下升起——怎么做到的？</h5>
  <p>着色器里有一个 <code>uRevealProgress</code> 变量（0→1）。GSAP 用3秒把它从0变成1。当值是0时，z坐标低于0的像素全部丢弃（看不见）。随着值增大，越来越多的像素显现——视觉上就像从地面升起来。</p>
</div>`;
  // draw matcap sphere preview
  requestAnimationFrame(() => {
    const cv = document.getElementById('matcap-diagram');
    if (!cv) return;
    const ctx = cv.getContext('2d');
    const cx = 60, cy = 60, r = 48;
    // sphere gradient simulating matcap
    const g = ctx.createRadialGradient(42, 38, 4, cx, cy, r);
    g.addColorStop(0,   '#f0e8d8');
    g.addColorStop(0.3, '#c8a06e');
    g.addColorStop(0.7, '#603820');
    g.addColorStop(1,   '#1a0e08');
    ctx.beginPath();
    ctx.arc(cx, cy, r, 0, Math.PI*2);
    ctx.fillStyle = g;
    ctx.fill();
    // highlight
    const h2 = ctx.createRadialGradient(45, 35, 2, 45, 35, 20);
    h2.addColorStop(0, 'rgba(255,255,255,0.55)');
    h2.addColorStop(1, 'rgba(255,255,255,0)');
    ctx.beginPath();
    ctx.arc(cx, cy, r, 0, Math.PI*2);
    ctx.fillStyle = h2;
    ctx.fill();
    ctx.font = '10px monospace';
    ctx.fillStyle = 'rgba(255,255,255,0.4)';
    ctx.textAlign = 'center';
    ctx.fillText('matcap 纹理球', cx, cy + r + 14);
  });
}

window.RENDERERS = { intro: renderIntro, prepare: renderPrepare, stack: renderStack, matcap: renderMatcap };
