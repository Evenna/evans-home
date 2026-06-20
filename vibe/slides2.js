// ─── SLIDE 6: CAMERA / GESTURE ───────────────────────────────
s('camera', function(el) {
  el.style.cssText = 'background:#08090a;flex-direction:column;gap:36px;';
  el.innerHTML = `
    <div class="glow glow-teal" style="top:5%;right:10%;"></div>
    <div style="position:relative;z-index:2;text-align:center;">
      <div class="sec-category" style="color:#40c8e0;">CATEGORY 04</div>
      <h2 class="sec-title">摄像头捕捉交互</h2>
      <p class="sec-desc">MediaPipe + TensorFlow.js，用手势、姿态、表情控制浏览器体验</p>
    </div>
    <div class="cards-layout grid-3">
      <div class="card">
        <div class="card-accent-line" style="background:#40c8e0;"></div>
        <div class="card-emoji">🖐️</div>
        <div class="card-name">手势创意编码项目集</div>
        <div class="card-author">Charlie Gerard · charliegerard.dev</div>
        <div class="card-desc">用手势控制3D角色、剪刀石头布游戏、神经网络音乐控制器——TensorFlow.js + MediaPipe，AI 辅助快速原型。</div>
        <span class="card-tag" style="color:#40c8e0;">TensorFlow.js · MediaPipe</span>
        <a class="card-url" href="https://charliegerard.dev" target="_blank">charliegerard.dev</a>
      </div>
      <div class="card">
        <div class="card-accent-line" style="background:#40c8e0;"></div>
        <div class="card-emoji">🤸</div>
        <div class="card-name">Handsfree.js</div>
        <div class="card-author">Oz Ramos</div>
        <div class="card-desc">一个开源库，让任何网页都能用手、脸、身体姿态做手势控制。Vibe Coding 可以用几行 prompt 快速集成进去。</div>
        <span class="card-tag" style="color:#40c8e0;">MediaPipe · JavaScript</span>
        <a class="card-url" href="https://handsfreejs.netlify.app" target="_blank">handsfreejs.netlify.app</a>
      </div>
      <div class="card">
        <div class="card-accent-line" style="background:#40c8e0;"></div>
        <div class="card-emoji">🎓</div>
        <div class="card-name">Teachable Machine</div>
        <div class="card-author">Google Creative Lab</div>
        <div class="card-desc">Google 出品——在浏览器里训练你的摄像头姿态识别模型，无需代码，结合 Vibe Coding 可做出各种手势交互装置。</div>
        <span class="card-tag" style="color:#40c8e0;">No-Code · TensorFlow.js</span>
        <a class="card-url" href="https://teachablemachine.withgoogle.com" target="_blank">teachablemachine.withgoogle.com</a>
      </div>
    </div>
  `;
});

// ─── SLIDE 7: GAMES ──────────────────────────────────────────
s('games', function(el) {
  el.style.cssText = 'background:#08090a;flex-direction:column;gap:36px;';
  el.innerHTML = `
    <div class="glow glow-orange" style="top:10%;left:10%;"></div>
    <div class="glow glow-pink" style="bottom:15%;right:5%;"></div>
    <div style="position:relative;z-index:2;text-align:center;">
      <div class="sec-category" style="color:#ff9f0a;">CATEGORY 05</div>
      <h2 class="sec-title">游戏</h2>
      <p class="sec-desc">从经典街机到多人竞速——Vibe Coding 最被传播的品类</p>
    </div>
    <div class="cards-layout grid-4" style="max-width:1100px;">
      <div class="card">
        <div class="card-accent-line" style="background:#ff9f0a;"></div>
        <div class="card-emoji">🧱</div>
        <div class="card-name">Tetris 克隆</div>
        <div class="card-author">Alex Albert · Anthropic</div>
        <div class="card-desc">Anthropic 开发者布道师用 Claude 直接生成完整俄罗斯方块，证明 AI 能处理完整游戏逻辑。</div>
        <span class="card-tag" style="color:#ff9f0a;">Claude Artifacts</span>
      </div>
      <div class="card">
        <div class="card-accent-line" style="background:#ff9f0a;"></div>
        <div class="card-emoji">🏎️</div>
        <div class="card-name">AI Grand Prix</div>
        <div class="card-author">Pieter Levels · @levelsio</div>
        <div class="card-desc">浏览器赛车游戏，AI车手驾驶，多人竞速，完全 Vibe Coded，跑在 Cloudflare Workers 上。</div>
        <span class="card-tag" style="color:#ff9f0a;">Cursor · Claude</span>
        <a class="card-url" href="https://ai.grand.prix" target="_blank">ai.grand.prix</a>
      </div>
      <div class="card">
        <div class="card-accent-line" style="background:#ff9f0a;"></div>
        <div class="card-emoji">🏰</div>
        <div class="card-name">3D 地下城爬行</div>
        <div class="card-author">AWS Builder Community</div>
        <div class="card-desc">Three.js 3D地牢爬行游戏，Amazon Q Developer 辅助生成，含敌人AI和战斗系统。</div>
        <span class="card-tag" style="color:#ff9f0a;">Three.js · Amazon Q</span>
      </div>
      <div class="card">
        <div class="card-accent-line" style="background:#ff9f0a;"></div>
        <div class="card-emoji">🧙</div>
        <div class="card-name">魔法学校模拟器</div>
        <div class="card-author">Jack Soslow</div>
        <div class="card-desc">RPG风格的互动教育游戏，探索魔法学校、完成任务、学习知识——AI 一次生成整体框架。</div>
        <span class="card-tag" style="color:#ff9f0a;">ChatGPT · JavaScript</span>
      </div>
    </div>
  `;
});

// ─── SLIDE 8: TOOLS ──────────────────────────────────────────
s('tools2', function(el) {
  el.style.cssText = 'background:#08090a;flex-direction:column;gap:36px;';
  el.innerHTML = `
    <div class="glow glow-green" style="top:10%;right:15%;"></div>
    <div style="position:relative;z-index:2;text-align:center;">
      <div class="sec-category" style="color:#30d158;">CATEGORY 06</div>
      <h2 class="sec-title">效率工具 &amp; App</h2>
      <p class="sec-desc">从浏览器扩展到企业级内部工具，Vibe Coding 已进入真实生产</p>
    </div>
    <div class="cards-layout grid-3">
      <div class="card">
        <div class="card-accent-line" style="background:#30d158;"></div>
        <div class="card-emoji">💬</div>
        <div class="card-name">周末 Slack App</div>
        <div class="card-author">Omar Shiekh</div>
        <div class="card-desc">用 Claude + Cursor，一个周末做出完整功能的 Slack 工作流应用——如果手写代码，至少需要一周。</div>
        <span class="card-tag" style="color:#30d158;">Claude · Cursor</span>
      </div>
      <div class="card">
        <div class="card-accent-line" style="background:#30d158;"></div>
        <div class="card-emoji">🗣️</div>
        <div class="card-name">SpeakPath 语言学习</div>
        <div class="card-author">Community Builder</div>
        <div class="card-desc">Chrome 扩展，用 Gemini 自动生成个性化语言学习路径。Vibe Coding 让非工程师也能做出 AI 产品。</div>
        <span class="card-tag" style="color:#30d158;">Gemini · Chrome Extension</span>
      </div>
      <div class="card">
        <div class="card-accent-line" style="background:#30d158;"></div>
        <div class="card-emoji">🏦</div>
        <div class="card-name">摩根士丹利 AI 助手</div>
        <div class="card-author">Morgan Stanley</div>
        <div class="card-desc">金融顾问内部工具，用 GPT-4 辅助构建，让数千名理财师随时查询产品信息——企业级 Vibe Coding 落地案例。</div>
        <span class="card-tag" style="color:#30d158;">GPT-4 · Enterprise</span>
      </div>
    </div>
    <div style="position:relative;z-index:2;max-width:900px;padding:0 48px;width:100%;">
      <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:12px;">
        <div style="background:var(--card2);border:1px solid var(--border);border-radius:12px;padding:16px 20px;text-align:center;">
          <div style="font-size:22px;font-weight:700;color:#30d158;">700+</div>
          <div style="font-size:12px;color:var(--txt2);margin-top:4px;">Andy Allen 用 Vibe Coding<br>做的App真实用户</div>
        </div>
        <div style="background:var(--card2);border:1px solid var(--border);border-radius:12px;padding:16px 20px;text-align:center;">
          <div style="font-size:22px;font-weight:700;color:#4f8fff;">25%</div>
          <div style="font-size:12px;color:var(--txt2);margin-top:4px;">2025年 GitHub 新仓库<br>代码由 AI 生成（GitHub报告）</div>
        </div>
        <div style="background:var(--card2);border:1px solid var(--border);border-radius:12px;padding:16px 20px;text-align:center;">
          <div style="font-size:22px;font-weight:700;color:#ff9f0a;">1人团队</div>
          <div style="font-size:12px;color:var(--txt2);margin-top:4px;">用 AI 完成原本需要<br>10人团队的完整项目</div>
        </div>
      </div>
    </div>
  `;
});

// ─── SLIDE 9: GENERATIVE ART ────────────────────────────────
s('art', function(el) {
  el.style.cssText = 'background:#08090a;flex-direction:column;gap:36px;';
  el.innerHTML = `
    <div class="glow glow-pink" style="top:10%;left:10%;"></div>
    <div class="glow glow-purple" style="bottom:15%;right:10%;"></div>
    <div style="position:relative;z-index:2;text-align:center;">
      <div class="sec-category" style="color:#ff375f;">CATEGORY 07</div>
      <h2 class="sec-title">生成艺术</h2>
      <p class="sec-desc">AI 生成代码 × 算法美学，让艺术家和设计师重新获得技术工具</p>
    </div>
    <div class="cards-layout grid-3">
      <div class="card">
        <div class="card-accent-line" style="background:#ff375f;"></div>
        <div class="card-emoji">🏛️</div>
        <div class="card-name">Unsupervised · MoMA</div>
        <div class="card-author">Refik Anadol Studio</div>
        <div class="card-desc">在纽约现代艺术博物馆展出的巨幅AI数据雕塑，用机器学习训练 MoMA 全部馆藏，实时生成流动的抽象影像。</div>
        <span class="card-tag" style="color:#ff375f;">ML · Data Sculpture</span>
        <a class="card-url" href="https://refikanadol.com/works/unsupervised/" target="_blank">refikanadol.com</a>
      </div>
      <div class="card">
        <div class="card-accent-line" style="background:#ff375f;"></div>
        <div class="card-emoji">🧬</div>
        <div class="card-name">Conway's Game of Life</div>
        <div class="card-author">Sam Whitmore</div>
        <div class="card-desc">用自然语言提示 AI 实现康威细胞自动机，可视化「生命游戏」演化规律，交互控制初始状态。</div>
        <span class="card-tag" style="color:#ff375f;">Canvas 2D · Claude</span>
      </div>
      <div class="card">
        <div class="card-accent-line" style="background:#ff375f;"></div>
        <div class="card-emoji">🎨</div>
        <div class="card-name">Claude Artifacts 画廊</div>
        <div class="card-author">社区共创 · claudeartifacts.com</div>
        <div class="card-desc">社区收集的 Claude Artifacts 创意作品库：粒子模拟、小游戏、数据可视化、生成艺术——都是对话里即时生成的。</div>
        <span class="card-tag" style="color:#ff375f;">Claude Artifacts · Community</span>
        <a class="card-url" href="https://claudeartifacts.com" target="_blank">claudeartifacts.com</a>
      </div>
    </div>
  `;
});

// ─── SLIDE 10: OUTRO ─────────────────────────────────────────
s('outro', function(el) {
  el.style.cssText = 'background:#08090a;';
  el.innerHTML = `
    <div class="cover-bg"></div>
    <div class="glow glow-blue" style="top:20%;left:30%;width:600px;height:400px;opacity:.6;"></div>
    <div class="outro-content">
      <div style="font-family:'JetBrains Mono',monospace;font-size:11px;color:var(--txt3);letter-spacing:.2em;margin-bottom:28px;">THE TAKEAWAY</div>
      <p class="outro-quote">
        工具已经准备好了。<br>
        <strong>现在的门槛，只剩下一个好想法。</strong>
      </p>
      <div style="margin-top:40px;display:flex;flex-wrap:wrap;gap:12px;justify-content:center;">
        <span class="chip" style="color:#4f8fff;border-color:rgba(79,143,255,.3);background:rgba(79,143,255,.08);font-size:13px;padding:8px 20px;">Claude / ChatGPT</span>
        <span class="chip" style="color:#30d158;border-color:rgba(48,209,88,.3);background:rgba(48,209,88,.08);font-size:13px;padding:8px 20px;">Cursor / Windsurf</span>
        <span class="chip" style="color:#ff9f0a;border-color:rgba(255,159,10,.3);background:rgba(255,159,10,.08);font-size:13px;padding:8px 20px;">Bolt.new / v0</span>
        <span class="chip" style="color:#bf5af2;border-color:rgba(191,90,242,.3);background:rgba(191,90,242,.08);font-size:13px;padding:8px 20px;">Lovable / Replit</span>
      </div>
      <div style="margin-top:48px;padding:20px 32px;background:rgba(255,255,255,.04);border:1px solid rgba(255,255,255,.08);border-radius:16px;display:inline-block;">
        <div style="font-size:13px;color:var(--txt2);">本课件由 Hermes Agent 搜索整理 · 2025</div>
        <div style="margin-top:6px;font-family:'JetBrains Mono',monospace;font-size:11px;color:var(--txt3);">evenna.github.io/evans-home/vibe/</div>
      </div>
    </div>
  `;
});
