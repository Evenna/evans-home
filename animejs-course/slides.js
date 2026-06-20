const SLIDES = [];
function s(title, renderFn) { SLIDES.push({ title, render: renderFn }); }

// ─── SLIDE 1: HERO ───────────────────────────────────────────────────────────
s('封面', el => {
  el.innerHTML = `
  <div style="position:absolute;inset:0;overflow:hidden;pointer-events:none;">
    <div class="hero-glow" style="width:500px;height:500px;top:-100px;left:-100px;background:rgba(99,102,241,0.18);"></div>
    <div class="hero-glow" style="width:400px;height:400px;bottom:-50px;right:-50px;background:rgba(34,211,238,0.12);"></div>
    <canvas id="hero-canvas" style="position:absolute;inset:0;width:100%;height:100%;opacity:0.15;"></canvas>
  </div>
  <div class="inner" style="display:flex;flex-direction:column;align-items:center;text-align:center;gap:24px;position:relative;z-index:1;">
    <div class="slide-tag">Vibe Coding 小白课 · 第一课</div>
    <h1 class="hero-title" style="max-width:700px;">
      用 <span style="color:var(--accent2);">Anime.js</span> 做出<br>会动的网页
    </h1>
    <p class="lead" style="text-align:center;">
      你不需要先学完 JavaScript。<br>
      只需要能<strong style="color:var(--txt);">和 AI 说清楚你想要什么</strong>，就能做出专业级网页动画。
    </p>
    <div style="display:flex;gap:12px;flex-wrap:wrap;justify-content:center;margin-top:8px;">
      <span class="pill pill-green">零基础友好</span>
      <span class="pill pill-purple">Vibe Coding 视角</span>
      <span class="pill pill-cyan">含真实演示</span>
      <span class="pill pill-orange">手把手 Prompt</span>
    </div>
    <div class="anim-demo-box" style="width:100%;max-width:400px;margin-top:16px;">
      <div class="anim-ball"></div>
    </div>
    <p style="font-size:12px;color:var(--txt3);font-family:var(--mono);">↑ 这个动画只需要 3 行代码</p>
  </div>
  <div class="scroll-hint">
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M12 5v14m-5-5 5 5 5-5"/></svg>
    向下滚动开始
  </div>`;

  // floating particles on canvas
  const canvas = el.querySelector('#hero-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  const resize = () => { canvas.width = el.offsetWidth; canvas.height = el.offsetHeight; };
  resize();
  const pts = Array.from({length:60}, () => ({
    x: Math.random()*canvas.width, y: Math.random()*canvas.height,
    vx: (Math.random()-0.5)*0.4, vy: (Math.random()-0.5)*0.4,
    r: Math.random()*2+0.5, o: Math.random()*0.5+0.2
  }));
  let raf;
  const draw = () => {
    ctx.clearRect(0,0,canvas.width,canvas.height);
    pts.forEach(p => {
      p.x += p.vx; p.y += p.vy;
      if(p.x<0||p.x>canvas.width) p.vx*=-1;
      if(p.y<0||p.y>canvas.height) p.vy*=-1;
      ctx.beginPath();
      ctx.arc(p.x,p.y,p.r,0,Math.PI*2);
      ctx.fillStyle = `rgba(129,140,248,${p.o})`;
      ctx.fill();
    });
    raf = requestAnimationFrame(draw);
  };
  draw();
});

// ─── SLIDE 2: 什么是 Anime.js ─────────────────────────────────────────────────
s('认识 Anime.js', el => {
  el.innerHTML = `
  <div class="inner" style="padding-top:48px;padding-bottom:48px;">
    <div class="chapter-head">
      <span class="chapter-num">Chapter 01</span>
      <div style="flex:1;height:1px;background:var(--border);"></div>
    </div>
    <div class="cols2" style="gap:56px;">
      <div>
        <div class="slide-tag">这东西是什么</div>
        <h2 class="section-title" style="margin-bottom:20px;">Anime.js<br>是网页的<span style="color:var(--accent2);">动画引擎</span></h2>
        <p class="lead" style="margin-bottom:24px;">
          想象一下：你想让一个方块从左边滑进来，然后变大，再变色——<br>
          用原生 JS 要写几十行。用 Anime.js，<strong style="color:var(--txt);">3 行</strong>。
        </p>
        <div class="blockquote">
          它不是框架，不需要安装 Node、不需要打包工具——<br>
          一个 &lt;script&gt; 标签，直接用。
        </div>
        <div style="display:flex;gap:12px;margin-top:24px;flex-wrap:wrap;">
          <div style="text-align:center;">
            <div class="big-num">4KB</div>
            <div style="font-size:12px;color:var(--txt3);">压缩后大小</div>
          </div>
          <div style="width:1px;background:var(--border);"></div>
          <div style="text-align:center;">
            <div class="big-num">50K+</div>
            <div style="font-size:12px;color:var(--txt3);">GitHub Stars</div>
          </div>
          <div style="width:1px;background:var(--border);"></div>
          <div style="text-align:center;">
            <div class="big-num">v4</div>
            <div style="font-size:12px;color:var(--txt3);">当前版本</div>
          </div>
        </div>
      </div>
      <div style="display:flex;flex-direction:column;gap:16px;">
        <div class="card">
          <div style="font-size:13px;color:var(--txt3);font-family:var(--mono);margin-bottom:10px;">普通 JS（原始方式）</div>
          <pre class="code-block" style="font-size:12px;padding:14px 18px;">
<span class="cmt">// 让方块移动 200px，需要手写这些：</span>
<span class="kw">let</span> start = <span class="kw">null</span>;
<span class="kw">function</span> <span class="fn">step</span>(ts) {
  <span class="kw">if</span> (!start) start = ts;
  <span class="kw">const</span> progress = (ts - start) / <span class="num">1000</span>;
  el.style.transform =
    <span class="str">`translateX(${progress * 200}px)`</span>;
  <span class="kw">if</span> (progress &lt; <span class="num">1</span>)
    requestAnimationFrame(step);
}
requestAnimationFrame(step);</pre>
        </div>
        <div class="card" style="border-color:rgba(99,102,241,0.3);background:rgba(99,102,241,0.06);">
          <div style="font-size:13px;color:var(--accent2);font-family:var(--mono);margin-bottom:10px;">✨ 用 Anime.js（现代方式）</div>
          <pre class="code-block" style="font-size:12px;padding:14px 18px;">
<span class="cmt">// 同样的效果，3 行搞定：</span>
<span class="fn">anime</span>({
  targets: <span class="str">'#el'</span>,
  translateX: <span class="num">200</span>,
  duration: <span class="num">1000</span>
});</pre>
        </div>
      </div>
    </div>
  </div>`;
});

// ─── SLIDE 3: 你要准备什么 ───────────────────────────────────────────────────
s('开始前准备', el => {
  el.innerHTML = `
  <div class="inner" style="padding-top:48px;padding-bottom:48px;">
    <div class="chapter-head">
      <span class="chapter-num">Chapter 02</span>
      <div style="flex:1;height:1px;background:var(--border);"></div>
    </div>
    <div class="slide-tag">人工需要准备的东西</div>
    <h2 class="section-title" style="margin-bottom:8px;">做这个项目<br>你只需要<span style="color:var(--green);"> 3 样东西</span></h2>
    <p style="color:var(--txt2);font-size:14px;margin-bottom:36px;">不需要装 Node.js，不需要懂后端，不需要买服务器</p>

    <div class="cols3" style="margin-bottom:36px;">
      <div class="card" style="border-color:rgba(52,211,153,0.3);">
        <div style="font-size:32px;margin-bottom:14px;">🌐</div>
        <h3 style="font-size:17px;margin-bottom:8px;color:var(--txt);">浏览器</h3>
        <p style="font-size:13px;color:var(--txt2);line-height:1.6;">Chrome 或 Firefox。你的电脑上肯定有。这就是你的「运行环境」。</p>
        <div style="margin-top:14px;"><span class="pill pill-green">必须有</span></div>
      </div>
      <div class="card" style="border-color:rgba(99,102,241,0.3);">
        <div style="font-size:32px;margin-bottom:14px;">📝</div>
        <h3 style="font-size:17px;margin-bottom:8px;color:var(--txt);">代码编辑器</h3>
        <p style="font-size:13px;color:var(--txt2);line-height:1.6;">推荐 VS Code，免费下载。就是个「高级记事本」，你写的代码存在这里。</p>
        <div style="margin-top:14px;"><span class="pill pill-purple">推荐安装</span></div>
      </div>
      <div class="card" style="border-color:rgba(251,146,60,0.3);">
        <div style="font-size:32px;margin-bottom:14px;">🤖</div>
        <h3 style="font-size:17px;margin-bottom:8px;color:var(--txt);">AI 助手</h3>
        <p style="font-size:13px;color:var(--txt2);line-height:1.6;">Claude、ChatGPT、Cursor 都行。你说需求，它写代码，你复制过来运行。</p>
        <div style="margin-top:14px;"><span class="pill pill-orange">这门课的主角</span></div>
      </div>
    </div>

    <div class="card" style="background:rgba(99,102,241,0.05);border-color:rgba(99,102,241,0.2);">
      <div style="display:flex;gap:16px;align-items:flex-start;">
        <span style="font-size:24px;">💡</span>
        <div>
          <h4 style="margin-bottom:6px;color:var(--txt);">Vibe Coding 是什么工作流？</h4>
          <p style="font-size:13px;color:var(--txt2);line-height:1.7;">
            你负责<strong style="color:var(--txt);">想法和审美判断</strong>，AI 负责<strong style="color:var(--txt);">把想法变成代码</strong>。<br>
            你就像导演，AI 是摄影师——你说「这里需要一个缓慢淡入的效果」，AI 写出 anime() 代码，你粘贴进去，刷新浏览器，看效果。<br>
            不满意？继续告诉 AI 改。
          </p>
        </div>
      </div>
    </div>

    <div style="margin-top:28px;">
      <div style="font-size:13px;color:var(--txt3);font-family:var(--mono);margin-bottom:12px;">你需要会的技能（清单）</div>
      <ul class="checklist" style="display:grid;grid-template-columns:1fr 1fr;gap:10px;">
        <li>能新建一个 .html 文件</li>
        <li>能用浏览器打开本地 HTML 文件</li>
        <li>能把 AI 给的代码复制粘贴进去</li>
        <li>能保存文件（Ctrl+S / Cmd+S）</li>
        <li>会描述你想要的动画效果</li>
        <li>能看懂数字（200、1000 这种）</li>
      </ul>
    </div>
  </div>`;
});

// ─── SLIDE 4: 第一个文件结构 ──────────────────────────────────────────────────
s('文件结构', el => {
  el.innerHTML = `
  <div class="inner" style="padding-top:48px;padding-bottom:48px;">
    <div class="chapter-head">
      <span class="chapter-num">Chapter 03</span>
      <div style="flex:1;height:1px;background:var(--border);"></div>
    </div>
    <div class="cols2" style="gap:48px;align-items:start;">
      <div>
        <div class="slide-tag">你的第一个文件长这样</div>
        <h2 class="section-title" style="margin-bottom:16px;">一个 HTML 文件<br>就是<span style="color:var(--cyan);">全部</span></h2>
        <p class="lead" style="margin-bottom:24px;">不需要建文件夹，不需要 package.json，不需要 npm install。<br>新建 <code style="font-family:var(--mono);color:var(--cyan);background:rgba(34,211,238,0.1);padding:2px 8px;border-radius:6px;">index.html</code>，直接开始。</p>

        <div style="display:flex;flex-direction:column;gap:12px;">
          <div class="step-item">
            <div class="step-badge">1</div>
            <div class="step-content">
              <h4>新建文件</h4>
              <p>桌面右键 → 新建文本文档 → 改名为 <code style="font-family:var(--mono);color:var(--cyan);">index.html</code>（注意改扩展名）</p>
            </div>
          </div>
          <div class="step-item">
            <div class="step-badge">2</div>
            <div class="step-content">
              <h4>用 VS Code 打开</h4>
              <p>右键 → 用 VS Code 打开，或者拖拽进去</p>
            </div>
          </div>
          <div class="step-item">
            <div class="step-badge">3</div>
            <div class="step-content">
              <h4>贴入基础模板</h4>
              <p>把右边的代码复制进去，这就是所有网页的「骨架」</p>
            </div>
          </div>
          <div class="step-item">
            <div class="step-badge">4</div>
            <div class="step-content">
              <h4>双击用浏览器打开</h4>
              <p>找到 index.html 文件，双击，在浏览器里就能看到效果</p>
            </div>
          </div>
        </div>
      </div>
      <div>
        <div style="font-size:13px;color:var(--txt3);font-family:var(--mono);margin-bottom:10px;">📄 index.html · 基础模板</div>
        <pre class="code-block" style="font-size:12.5px;">
<span class="cmt">&lt;!-- 告诉浏览器：我是网页 --&gt;</span>
<span class="kw">&lt;!DOCTYPE html&gt;</span>
<span class="kw">&lt;html&gt;</span>
<span class="kw">&lt;head&gt;</span>
  <span class="cmt">&lt;!-- 网页标题（标签页名字）--&gt;</span>
  <span class="prop">&lt;title&gt;</span>我的动画<span class="prop">&lt;/title&gt;</span>

  <span class="cmt">&lt;!-- 引入 Anime.js（从网上加载）--&span&gt;</span>
  <span class="prop">&lt;script</span> <span class="fn">src</span>=<span class="str">"https://cdn.jsdelivr.net/npm/animejs@4/dist/anime.iife.min.js"</span><span class="prop">&gt;&lt;/script&gt;</span>
<span class="kw">&lt;/head&gt;</span>
<span class="kw">&lt;body&gt;</span>

  <span class="cmt">&lt;!-- 这是你想要动的东西 --&gt;</span>
  <span class="prop">&lt;div</span> <span class="fn">id</span>=<span class="str">"box"</span> <span class="fn">style</span>=<span class="str">"width:80px;height:80px;background:purple;"</span><span class="prop">&gt;&lt;/div&gt;</span>

  <span class="cmt">&lt;!-- 这里写动画逻辑 --&gt;</span>
  <span class="kw">&lt;script&gt;</span>
    <span class="fn">anime</span>({
      targets: <span class="str">'#box'</span>,
      <span class="prop">translateX</span>: <span class="num">300</span>,
      <span class="prop">duration</span>: <span class="num">1000</span>,
      <span class="prop">easing</span>: <span class="str">'easeOutElastic'</span>
    });
  <span class="kw">&lt;/script&gt;</span>

<span class="kw">&lt;/body&gt;</span>
<span class="kw">&lt;/html&gt;</span></pre>

        <div class="card" style="margin-top:16px;background:rgba(52,211,153,0.05);border-color:rgba(52,211,153,0.2);">
          <div style="display:flex;gap:10px;align-items:center;">
            <span style="font-size:20px;">⚡</span>
            <p style="font-size:13px;color:var(--txt2);">复制这段代码，存文件，双击打开浏览器——你的紫色方块就会弹出来了。就这么简单。</p>
          </div>
        </div>
      </div>
    </div>
  </div>`;
});
