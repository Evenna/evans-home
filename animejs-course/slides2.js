// slides2.js — continues SLIDES[]  (chapters 5–8)

// ─── SLIDE 5: 核心参数大白话 ──────────────────────────────────────────────────
s('参数大白话', el => {
  el.innerHTML = `
  <div class="inner" style="padding-top:48px;padding-bottom:48px;">
    <div class="chapter-head">
      <span class="chapter-num">Chapter 04</span>
      <div style="flex:1;height:1px;background:var(--border);"></div>
    </div>
    <div class="slide-tag">代码里每一行是什么意思</div>
    <h2 class="section-title" style="margin-bottom:28px;">参数大白话<br><span style="color:var(--yellow);">逐行读懂</span>代码</h2>

    <div style="display:grid;grid-template-columns:1fr 1.2fr;gap:40px;align-items:start;">
      <div style="display:flex;flex-direction:column;gap:14px;">

        <div class="card" style="border-left:3px solid var(--accent2);">
          <div style="font-family:var(--mono);color:var(--accent2);font-size:13px;margin-bottom:6px;">targets</div>
          <p style="font-size:13px;color:var(--txt2);line-height:1.6;">
            <strong style="color:var(--txt);">「谁要动？」</strong><br>
            用 CSS 选择器指定元素。<code style="color:var(--cyan);background:rgba(34,211,238,0.08);padding:1px 6px;border-radius:4px;font-family:var(--mono);">'#box'</code> 就是 id="box" 的那个标签。
          </p>
        </div>

        <div class="card" style="border-left:3px solid var(--green);">
          <div style="font-family:var(--mono);color:var(--green);font-size:13px;margin-bottom:6px;">translateX / translateY</div>
          <p style="font-size:13px;color:var(--txt2);line-height:1.6;">
            <strong style="color:var(--txt);">「往哪个方向移动多少？」</strong><br>
            translateX: 300 = 向右移动 300 像素。负数就是向左。Y 是上下。
          </p>
        </div>

        <div class="card" style="border-left:3px solid var(--orange);">
          <div style="font-family:var(--mono);color:var(--orange);font-size:13px;margin-bottom:6px;">duration</div>
          <p style="font-size:13px;color:var(--txt2);line-height:1.6;">
            <strong style="color:var(--txt);">「动多久？」</strong><br>
            单位是毫秒。1000ms = 1秒。300ms 是很快，3000ms 感觉悠长。
          </p>
        </div>

        <div class="card" style="border-left:3px solid var(--pink);">
          <div style="font-family:var(--mono);color:var(--pink);font-size:13px;margin-bottom:6px;">easing</div>
          <p style="font-size:13px;color:var(--txt2);line-height:1.6;">
            <strong style="color:var(--txt);">「怎么动？快还是慢？有没有弹性？」</strong><br>
            linear = 匀速；easeOut = 先快后慢；easeOutElastic = 弹一下；spring = 弹簧感。
          </p>
        </div>

        <div class="card" style="border-left:3px solid var(--cyan);">
          <div style="font-family:var(--mono);color:var(--cyan);font-size:13px;margin-bottom:6px;">loop / delay / opacity / scale</div>
          <p style="font-size:13px;color:var(--txt2);line-height:1.6;">
            <strong style="color:var(--txt);">更多常用属性：</strong>
            loop:true = 循环播放；delay:500 = 等半秒再开始；opacity = 透明度(0~1)；scale = 缩放大小。
          </p>
        </div>
      </div>

      <div>
        <div style="font-size:13px;color:var(--txt3);font-family:var(--mono);margin-bottom:10px;">完整示例 · 同时控制多个属性</div>
        <pre class="code-block" style="font-size:12.5px;line-height:1.8;">
<span class="fn">anime</span>({
  <span class="cmt">// 谁要动</span>
  <span class="prop">targets</span>: <span class="str">'#box'</span>,

  <span class="cmt">// 往右移 200 像素</span>
  <span class="prop">translateX</span>: <span class="num">200</span>,

  <span class="cmt">// 同时放大到 1.5 倍</span>
  <span class="prop">scale</span>: <span class="num">1.5</span>,

  <span class="cmt">// 同时变颜色</span>
  <span class="prop">backgroundColor</span>: <span class="str">'#ff6b6b'</span>,

  <span class="cmt">// 1.2 秒完成</span>
  <span class="prop">duration</span>: <span class="num">1200</span>,

  <span class="cmt">// 先快后慢，有点弹</span>
  <span class="prop">easing</span>: <span class="str">'easeOutElastic(1, .6)'</span>,

  <span class="cmt">// 无限循环，且来回播放</span>
  <span class="prop">loop</span>: <span class="kw">true</span>,
  <span class="prop">direction</span>: <span class="str">'alternate'</span>,
});</pre>

        <div style="margin-top:16px;display:grid;grid-template-columns:1fr 1fr;gap:10px;">
          <div class="card" style="background:rgba(251,191,36,0.05);border-color:rgba(251,191,36,0.2);padding:14px;">
            <div style="font-size:11px;color:var(--yellow);font-family:var(--mono);margin-bottom:6px;">EASING 速查</div>
            <div style="font-size:12px;color:var(--txt2);line-height:1.8;font-family:var(--mono);">
              linear<br>easeIn / easeOut<br>easeInOut<br>easeOutElastic<br>easeOutBounce<br>spring(mass, stiffness)
            </div>
          </div>
          <div class="card" style="background:rgba(34,211,238,0.05);border-color:rgba(34,211,238,0.2);padding:14px;">
            <div style="font-size:11px;color:var(--cyan);font-family:var(--mono);margin-bottom:6px;">常用属性速查</div>
            <div style="font-size:12px;color:var(--txt2);line-height:1.8;font-family:var(--mono);">
              translateX/Y<br>scale / rotate<br>opacity<br>width / height<br>backgroundColor<br>borderRadius
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>`;
});

// ─── SLIDE 6: 真实演示 + Prompt ───────────────────────────────────────────────
s('演示 + Prompt 模板', el => {
  el.innerHTML = `
  <div class="inner" style="padding-top:48px;padding-bottom:48px;">
    <div class="chapter-head">
      <span class="chapter-num">Chapter 05</span>
      <div style="flex:1;height:1px;background:var(--border);"></div>
    </div>
    <div class="slide-tag">现在你来给 AI 说需求</div>
    <h2 class="section-title" style="margin-bottom:8px;">怎么和 AI <span style="color:var(--green);">说对话</span></h2>
    <p style="color:var(--txt2);font-size:14px;margin-bottom:32px;">越具体越好。说出：谁、动什么、怎么动、什么感觉</p>

    <div style="display:grid;grid-template-columns:1fr 1fr;gap:28px;">
      <div style="display:flex;flex-direction:column;gap:16px;">

        <div style="font-size:13px;color:var(--txt3);font-family:var(--mono);margin-bottom:-6px;">❌ 说太模糊（AI 不知道你要什么）</div>
        <div style="background:rgba(255,59,48,0.06);border:1px solid rgba(255,59,48,0.2);border-radius:12px;padding:16px 18px;">
          <p style="font-size:14px;color:var(--txt2);line-height:1.6;">"帮我做个动画，好看一点"</p>
        </div>

        <div style="font-size:13px;color:var(--txt3);font-family:var(--mono);margin-bottom:-6px;">✅ 说具体（AI 能精准输出）</div>
        <div class="prompt-bubble">
          用 Anime.js 给 id 为 "hero-title" 的 h1 标题做一个入场动画：
          页面加载时，文字从下方 40px 处向上移动到原位置，同时透明度从 0 变成 1，
          动画时长 800ms，使用 easeOutQuad 缓动，不循环。
        </div>

        <div class="ai-bubble">
          anime({<br>
          &nbsp;&nbsp;targets: '#hero-title',<br>
          &nbsp;&nbsp;translateY: [40, 0],<br>
          &nbsp;&nbsp;opacity: [0, 1],<br>
          &nbsp;&nbsp;duration: 800,<br>
          &nbsp;&nbsp;easing: 'easeOutQuad'<br>
          });
        </div>
      </div>

      <div style="display:flex;flex-direction:column;gap:14px;">
        <div style="font-size:13px;color:var(--txt3);font-family:var(--mono);margin-bottom:-2px;">📋 万能 Prompt 模板（直接抄）</div>

        <div class="card" style="background:rgba(99,102,241,0.06);border-color:rgba(99,102,241,0.25);">
          <div style="font-size:12px;color:var(--accent2);font-family:var(--mono);margin-bottom:8px;">入场动画 PROMPT</div>
          <p style="font-size:13px;color:var(--txt2);line-height:1.7;">
            用 Anime.js 给 <code style="color:var(--cyan);font-family:var(--mono);">[选择器]</code> 做入场动画。
            从 <code style="color:var(--cyan);font-family:var(--mono);">[起始状态]</code> 变化到 <code style="color:var(--cyan);font-family:var(--mono);">[结束状态]</code>，
            时长 <code style="color:var(--cyan);font-family:var(--mono);">[毫秒]</code>ms，缓动用 <code style="color:var(--cyan);font-family:var(--mono);">[easing名]</code>。
          </p>
        </div>

        <div class="card" style="background:rgba(52,211,153,0.06);border-color:rgba(52,211,153,0.25);">
          <div style="font-size:12px;color:var(--green);font-family:var(--mono);margin-bottom:8px;">循环动画 PROMPT</div>
          <p style="font-size:13px;color:var(--txt2);line-height:1.7;">
            用 Anime.js 让 <code style="color:var(--cyan);font-family:var(--mono);">[选择器]</code> 持续 <code style="color:var(--cyan);font-family:var(--mono);">[描述动作]</code>，
            循环播放，来回交替，时长 <code style="color:var(--cyan);font-family:var(--mono);">[毫秒]</code>ms，有点弹性感。
          </p>
        </div>

        <div class="card" style="background:rgba(251,146,60,0.06);border-color:rgba(251,146,60,0.25);">
          <div style="font-size:12px;color:var(--orange);font-family:var(--mono);margin-bottom:8px;">点击触发 PROMPT</div>
          <p style="font-size:13px;color:var(--txt2);line-height:1.7;">
            点击 <code style="color:var(--cyan);font-family:var(--mono);">[按钮选择器]</code> 时，用 Anime.js 让 <code style="color:var(--cyan);font-family:var(--mono);">[目标选择器]</code>
            做 <code style="color:var(--cyan);font-family:var(--mono);">[动画描述]</code>。只触发一次，不循环。
          </p>
        </div>

        <div class="card" style="padding:14px 18px;">
          <div style="font-size:11px;color:var(--txt3);font-family:var(--mono);margin-bottom:8px;">小技巧：描述感觉词汇</div>
          <div style="display:flex;flex-wrap:wrap;gap:8px;">
            <span class="pill pill-purple">弹进来</span>
            <span class="pill pill-green">丝滑滑入</span>
            <span class="pill pill-orange">快速闪烁</span>
            <span class="pill pill-cyan">像果冻一样</span>
            <span class="pill pill-purple">慢慢淡出</span>
            <span class="pill pill-green">从中心爆开</span>
          </div>
          <p style="font-size:12px;color:var(--txt3);margin-top:10px;line-height:1.6;">把这些词加在 Prompt 里，AI 会自动选合适的 easing</p>
        </div>
      </div>
    </div>
  </div>`;
});

// ─── SLIDE 7: 真实项目演示 ─────────────────────────────────────────────────
s('看真实项目', el => {
  el.innerHTML = `
  <div class="inner" style="padding-top:48px;padding-bottom:48px;">
    <div class="chapter-head">
      <span class="chapter-num">Chapter 06</span>
      <div style="flex:1;height:1px;background:var(--border);"></div>
    </div>
    <div class="slide-tag">真实项目 · 就是你现在看的这个库</div>
    <h2 class="section-title" style="margin-bottom:8px;">animejs.com 是<br><span style="color:var(--cyan);">怎么做出来的</span></h2>
    <p style="color:var(--txt2);font-size:14px;margin-bottom:28px;">我们把这个网站爬下来放到 GitHub 了——现在来拆解它</p>

    <div style="display:grid;grid-template-columns:1.1fr 1fr;gap:32px;align-items:start;">
      <div>
        <div class="demo-frame-wrap">
          <div class="demo-bar">
            <div class="demo-dot r"></div><div class="demo-dot y"></div><div class="demo-dot g"></div>
            <span style="font-family:var(--mono);font-size:11px;color:var(--txt3);margin-left:8px;">evenna.github.io/animejs-mirror/</span>
          </div>
          <iframe src="https://evenna.github.io/animejs-mirror/" loading="lazy"
            style="height:380px;"
            sandbox="allow-scripts allow-same-origin allow-forms"></iframe>
        </div>
        <p style="font-size:12px;color:var(--txt3);text-align:center;margin-top:10px;font-family:var(--mono);">↑ 真实运行的 animejs.com 镜像</p>
      </div>

      <div style="display:flex;flex-direction:column;gap:14px;">
        <div class="card">
          <div style="font-size:12px;color:var(--txt3);font-family:var(--mono);margin-bottom:10px;">📁 项目文件结构</div>
          <div style="font-family:var(--mono);font-size:12.5px;line-height:2;color:var(--txt2);">
            <span style="color:var(--cyan);">index.html</span> &nbsp;← 主页面<br>
            <span style="color:var(--txt3);">assets/</span><br>
            &nbsp;&nbsp;<span style="color:var(--green);">css/styles.css</span> &nbsp;← 所有样式<br>
            &nbsp;&nbsp;<span style="color:var(--orange);">js/scripts.js</span> &nbsp;← 所有动画<br>
            &nbsp;&nbsp;<span style="color:var(--txt3);">fonts/</span> &nbsp;← 字体文件<br>
            &nbsp;&nbsp;<span style="color:var(--txt3);">images/</span> &nbsp;← 图片资源<br>
            <span style="color:var(--txt3);">documentation/</span> &nbsp;← 文档页面
          </div>
        </div>

        <div class="card" style="background:rgba(99,102,241,0.05);border-color:rgba(99,102,241,0.2);">
          <div style="font-size:12px;color:var(--accent2);font-family:var(--mono);margin-bottom:8px;">关键技术拆解</div>
          <div style="display:flex;flex-direction:column;gap:8px;">
            <div style="display:flex;gap:10px;align-items:flex-start;">
              <span style="color:var(--green);font-size:12px;font-family:var(--mono);flex-shrink:0;">首页动画</span>
              <p style="font-size:12px;color:var(--txt2);">logo 出现用淡入+上移；代码演示区域用 anime() 驱动实时动画</p>
            </div>
            <div class="hdiv" style="margin:4px 0;"></div>
            <div style="display:flex;gap:10px;align-items:flex-start;">
              <span style="color:var(--orange);font-size:12px;font-family:var(--mono);flex-shrink:0;">文档交互</span>
              <p style="font-size:12px;color:var(--txt2);">每个文档示例都是独立 anime() 调用，点击按钮触发 play()</p>
            </div>
            <div class="hdiv" style="margin:4px 0;"></div>
            <div style="display:flex;gap:10px;align-items:flex-start;">
              <span style="color:var(--cyan);font-size:12px;font-family:var(--mono);flex-shrink:0;">Easing 编辑器</span>
              <p style="font-size:12px;color:var(--txt2);">实时预览 easing 曲线，是用 Canvas + anime() 一起画的</p>
            </div>
          </div>
        </div>

        <div class="card">
          <div style="font-size:12px;color:var(--txt3);font-family:var(--mono);margin-bottom:8px;">如果你要仿一个这样的项目，问 AI：</div>
          <div class="prompt-bubble" style="font-size:12.5px;">
            我想做一个类似 animejs.com 首页风格的页面，深色背景，左侧是代码，右侧是实时动画演示，用 Anime.js 控制右侧动画，请给我完整 HTML 代码。
          </div>
        </div>
      </div>
    </div>
  </div>`;
});

// ─── SLIDE 8: 分步走 / 总结 ────────────────────────────────────────────────────
s('一步一步做出来', el => {
  el.innerHTML = `
  <div class="inner" style="padding-top:48px;padding-bottom:48px;">
    <div class="chapter-head">
      <span class="chapter-num">Chapter 07 · 总结</span>
      <div style="flex:1;height:1px;background:var(--border);"></div>
    </div>
    <div class="slide-tag">完整路线图</div>
    <h2 class="section-title" style="margin-bottom:32px;">从零到做出一个<br><span style="color:var(--accent2);">带动画的个人网页</span></h2>

    <div style="display:grid;grid-template-columns:1fr 1fr;gap:36px;">
      <div>
        <div style="font-size:13px;color:var(--txt3);font-family:var(--mono);margin-bottom:16px;">🗺 完整步骤（每步对 AI 说什么）</div>
        <div style="display:flex;flex-direction:column;gap:0;">
          ${[
            ['打基础', '新建 index.html，告诉 AI：「帮我创建一个基础 HTML 模板，引入 Anime.js 4.x CDN，有一个标题和一个方块」'],
            ['第一个动画', '告诉 AI：「让这个方块在页面加载时从左边滑入，有弹性感，时长 1 秒」'],
            ['加更多元素', '告诉 AI：「加一段文字，文字在方块动画完成后 300ms 再淡入出现」'],
            ['做成页面', '告诉 AI：「帮我把这个改成一个个人介绍页，有头像占位符、名字标题、简介文字，都有入场动画」'],
            ['点击交互', '告诉 AI：「加一个按钮，点击后所有元素重新播放一次入场动画」'],
            ['部署上线', '告诉 AI：「这个 HTML 文件怎么部署到 GitHub Pages，给我详细步骤」'],
          ].map(([title, prompt], i) => `
            <div style="display:flex;gap:0;position:relative;">
              <div style="display:flex;flex-direction:column;align-items:center;margin-right:16px;">
                <div class="step-badge" style="font-size:12px;flex-shrink:0;">${i+1}</div>
                ${i < 5 ? '<div style="width:2px;flex:1;background:var(--border);margin:4px 0;min-height:20px;"></div>' : ''}
              </div>
              <div style="padding-bottom:20px;flex:1;">
                <div style="font-size:14px;font-weight:500;color:var(--txt);margin-bottom:4px;">${title}</div>
                <div style="font-size:12px;color:var(--txt2);line-height:1.6;">${prompt}</div>
              </div>
            </div>`).join('')}
        </div>
      </div>

      <div style="display:flex;flex-direction:column;gap:16px;">
        <div class="card" style="background:linear-gradient(135deg,rgba(99,102,241,0.12),rgba(99,102,241,0.03));border-color:rgba(99,102,241,0.25);">
          <div style="font-size:14px;font-weight:600;color:var(--txt);margin-bottom:12px;">💡 小白最常犯的错</div>
          <div style="display:flex;flex-direction:column;gap:10px;">
            ${[
              ['问太广', '「帮我做个酷炫网站」→ AI 不知道从哪开始，改成：「帮我做一个xxx，包含xxx」'],
              ['忘记保存', '改完代码按 Ctrl+S，然后浏览器 F5 刷新，不然看不到变化'],
              ['CDN 没加载', '要联网才能用 cdn.jsdelivr.net，没网就本地下载 anime.min.js'],
              ['选择器写错', '确认 HTML 里 id="box" 和 JS 里 targets:"#box" 完全匹配'],
            ].map(([title, tip]) => `
              <div style="display:flex;gap:10px;align-items:flex-start;">
                <span style="color:var(--orange);font-size:14px;flex-shrink:0;">⚠</span>
                <div>
                  <div style="font-size:13px;color:var(--txt);margin-bottom:2px;">${title}</div>
                  <div style="font-size:12px;color:var(--txt2);line-height:1.5;">${tip}</div>
                </div>
              </div>`).join('')}
          </div>
        </div>

        <div class="card" style="background:rgba(52,211,153,0.05);border-color:rgba(52,211,153,0.2);">
          <div style="font-size:14px;font-weight:600;color:var(--txt);margin-bottom:12px;">🔗 继续学习的地方</div>
          <ul class="checklist">
            <li>animejs.com/documentation — 官方文档，每个参数都有演示</li>
            <li>animejs.com/easing-editor — 实时看 easing 效果</li>
            <li>codepen.io → 搜 anime.js — 看别人做的例子，点 Fork 改</li>
            <li>evenna.github.io/animejs-mirror — 你刚才爬下来的这个库</li>
          </ul>
        </div>

        <div class="card" style="text-align:center;padding:24px;background:rgba(99,102,241,0.08);border-color:rgba(99,102,241,0.3);">
          <div style="font-size:28px;margin-bottom:8px;">🎉</div>
          <p style="font-size:15px;color:var(--txt);font-weight:500;margin-bottom:6px;">你已经知道全部了</p>
          <p style="font-size:13px;color:var(--txt2);line-height:1.6;">打开编辑器，新建 index.html，<br>把第一个模板贴进去，开始改。</p>
          <div style="margin-top:14px;font-family:var(--mono);font-size:12px;color:var(--accent2);">evenna.github.io/animejs-mirror</div>
        </div>
      </div>
    </div>
  </div>`;
});
