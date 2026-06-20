// ══════════════════════════════════════════════════════
// CATEGORY 03 · 作品集
// ══════════════════════════════════════════════════════
s('cat-portfolio', function(el) {
  el.className += ' cat-slide';
  el.innerHTML = `
    <div class="glow" style="width:400px;height:300px;background:rgba(191,90,242,.09);bottom:20%;right:15%;filter:blur(80px);"></div>
    <div class="cat-slide-num">03</div>
    <div class="cat-slide-label" style="color:#bf5af2;">CATEGORY 03</div>
    <div class="cat-slide-title">个人作品集</div>
    <p class="cat-slide-desc">用 AI 做出原本要花数周的 3D / 动效个人主页，两天上线。</p>
    <div class="cat-slide-count">1 个案例 · 可访问真实网站</div>
  `;
});

// CASE · Charlie Gerard Portfolio
s('case-portfolio', function(el) {
  el.innerHTML = `
    <div class="split">
      <div class="split-info">
        <span class="cat-tag" style="color:#bf5af2;border-color:rgba(191,90,242,.3);background:rgba(191,90,242,.07)">作品集</span>
        <div class="info-title">创意编码作品集</div>
        <div class="info-author">Charlie Gerard · charliegerard.dev</div>
        <p class="info-desc">
          将手势控制、机器学习、神经网络交互等实验都集成在作品集里——每个项目本身就是一个可交互的 demo。<br><br>
          代表了 <strong style="color:var(--txt)">Vibe Coding 作品集</strong> 的正确打开方式：用代码做出来的东西，作品集也应该是可以跑的。
        </p>
        <div class="info-tags">
          <span class="tag">MediaPipe</span>
          <span class="tag">TensorFlow.js</span>
          <span class="tag">Interactive</span>
          <span class="tag">Portfolio</span>
        </div>
        <a class="info-link" href="https://charliegerard.dev" target="_blank">
          charliegerard.dev <span class="info-link-arrow">↗</span>
        </a>
      </div>
      <div class="split-demo">
        <iframe src="https://charliegerard.dev" loading="lazy"></iframe>
        <span class="demo-label">LIVE · charliegerard.dev</span>
        <span class="demo-badge">🖐️ 手势 × 代码</span>
      </div>
    </div>
  `;
});

// ══════════════════════════════════════════════════════
// CATEGORY 04 · 摄像头交互
// ══════════════════════════════════════════════════════
s('cat-camera', function(el) {
  el.className += ' cat-slide';
  el.innerHTML = `
    <div class="glow" style="width:380px;height:280px;background:rgba(64,200,224,.09);top:10%;left:5%;filter:blur(80px);"></div>
    <div class="cat-slide-num">04</div>
    <div class="cat-slide-label" style="color:#40c8e0;">CATEGORY 04</div>
    <div class="cat-slide-title">摄像头捕捉交互</div>
    <p class="cat-slide-desc">MediaPipe + TensorFlow.js，用手势、姿态、表情控制浏览器体验。</p>
    <div class="cat-slide-count">2 个案例</div>
  `;
});

// CASE · Handsfree.js
s('case-handsfree', function(el) {
  el.innerHTML = `
    <div class="split">
      <div class="split-info">
        <span class="cat-tag" style="color:#40c8e0;border-color:rgba(64,200,224,.3);background:rgba(64,200,224,.07)">摄像头交互</span>
        <div class="info-title">Handsfree.js</div>
        <div class="info-author">Oz Ramos · 开源项目</div>
        <p class="info-desc">
          一个开源库，让任何网页都能用<strong style="color:var(--txt)">手、脸、身体姿态</strong>做手势控制。<br><br>
          结合 Vibe Coding，用几行 prompt 即可把摄像头手势控制集成进你的任何创意项目里——操控粒子、玩游戏、控制音乐。
        </p>
        <div class="info-tags">
          <span class="tag">MediaPipe</span>
          <span class="tag">JavaScript</span>
          <span class="tag">Open Source</span>
          <span class="tag">No-Code Friendly</span>
        </div>
        <a class="info-link" href="https://handsfreejs.netlify.app" target="_blank">
          handsfreejs.netlify.app <span class="info-link-arrow">↗</span>
        </a>
      </div>
      <div class="split-demo">
        <iframe src="https://handsfreejs.netlify.app" loading="lazy"></iframe>
        <span class="demo-label">LIVE · handsfreejs.netlify.app</span>
        <span class="demo-badge">🤸 手势控制演示</span>
      </div>
    </div>
  `;
});

// CASE · Camera Fluid Sim (canvas demo using mouse to simulate)
s('case-fluid', function(el) {
  const cid = 'c_fluid_' + Date.now();
  el.innerHTML = `
    <div class="split">
      <div class="split-info">
        <span class="cat-tag" style="color:#40c8e0;border-color:rgba(64,200,224,.3);background:rgba(64,200,224,.07)">摄像头交互</span>
        <div class="info-title">流体波纹交互</div>
        <div class="info-author">Vibe Coded with Claude · 摄像头版示例</div>
        <p class="info-desc">
          典型 prompt：「用 canvas 做一个触控/摄像头驱动的流体模拟，手势划过产生涟漪和色彩流动」——AI 生成完整流体动力学代码。<br><br>
          右侧为<strong style="color:var(--txt)">鼠标模拟版本</strong>（拖动鼠标产生流体），实际项目可接入摄像头姿态坐标。
        </p>
        <div class="info-tags">
          <span class="tag">Canvas 2D</span>
          <span class="tag">Fluid Dynamics</span>
          <span class="tag">Claude</span>
          <span class="tag">WebCam-Ready</span>
        </div>
      </div>
      <div class="split-demo">
        <canvas id="${cid}" style="cursor:crosshair;"></canvas>
        <span class="demo-label">LIVE DEMO · 拖拽鼠标画流体</span>
        <span class="demo-badge">💧 流体模拟</span>
      </div>
    </div>
  `;
  requestAnimationFrame(function(){ initFluid(cid); });
});

function initFluid(cid) {
  const canvas = document.getElementById(cid);
  if (!canvas) return;
  const par = canvas.parentElement;
  const W = par.clientWidth, H = par.clientHeight;
  canvas.width = W; canvas.height = H;
  const ctx = canvas.getContext('2d');
  const COLS = ['rgba(64,200,224,0.6)','rgba(79,143,255,0.55)','rgba(191,90,242,0.5)','rgba(48,209,88,0.5)'];
  let trails = [];
  let mx=0,my=0,pmx=0,pmy=0,down=false;
  canvas.addEventListener('mousedown', function(e){down=true; const r=canvas.getBoundingClientRect(); pmx=mx=e.clientX-r.left; pmy=my=e.clientY-r.top;});
  canvas.addEventListener('mousemove', function(e){
    const r=canvas.getBoundingClientRect();
    pmx=mx; pmy=my; mx=e.clientX-r.left; my=e.clientY-r.top;
    if(!down)return;
    const dx=mx-pmx,dy=my-pmy;
    const col=COLS[Math.floor(trails.length/8)%COLS.length];
    for(let i=0;i<3;i++){
      trails.push({x:mx+dx*(i/3),y:my+dy*(i/3),vx:dx*0.3+(Math.random()-.5)*2,vy:dy*0.3+(Math.random()-.5)*2,life:1,r:6+Math.random()*10,col});
    }
  });
  canvas.addEventListener('mouseup',function(){down=false;});

  ctx.fillStyle='#0a0b0d'; ctx.fillRect(0,0,W,H);
  function frame(){
    ctx.fillStyle='rgba(10,11,13,0.1)'; ctx.fillRect(0,0,W,H);
    for(let i=trails.length-1;i>=0;i--){
      const t=trails[i];
      ctx.beginPath(); ctx.arc(t.x,t.y,t.r*t.life,0,Math.PI*2);
      ctx.fillStyle=t.col;
      ctx.globalAlpha=t.life;
      ctx.fill(); ctx.globalAlpha=1;
      t.x+=t.vx; t.y+=t.vy; t.vx*=0.92; t.vy*=0.92;
      t.r*=1.04; t.life-=0.022;
      if(t.life<=0) trails.splice(i,1);
    }
    requestAnimationFrame(frame);
  }
  frame();
}

// ══════════════════════════════════════════════════════
// CATEGORY 05 · 游戏
// ══════════════════════════════════════════════════════
s('cat-game', function(el) {
  el.className += ' cat-slide';
  el.innerHTML = `
    <div class="glow" style="width:380px;height:280px;background:rgba(255,159,10,.09);top:20%;right:5%;filter:blur(80px);"></div>
    <div class="cat-slide-num">05</div>
    <div class="cat-slide-label" style="color:#ff9f0a;">CATEGORY 05</div>
    <div class="cat-slide-title">游戏</div>
    <p class="cat-slide-desc">从经典街机到多人竞速——Vibe Coding 传播最广的品类，AI 处理完整游戏逻辑。</p>
    <div class="cat-slide-count">2 个案例 · 右侧可直接玩</div>
  `;
});

// CASE · Tetris (inline canvas)
s('case-tetris', function(el) {
  const cid = 'c_tet_' + Date.now();
  el.innerHTML = `
    <div class="split">
      <div class="split-info">
        <span class="cat-tag" style="color:#ff9f0a;border-color:rgba(255,159,10,.3);background:rgba(255,159,10,.07)">游戏</span>
        <div class="info-title">Tetris 克隆</div>
        <div class="info-author">Alex Albert · Anthropic · 2025</div>
        <p class="info-desc">
          Anthropic 开发者布道师对 Claude 说「做一个俄罗斯方块」——AI 生成完整可玩游戏，含碰撞、消行、计分，无一行手写代码。<br><br>
          右侧为复现版本，<strong style="color:var(--txt)">← → 移动 · ↑ 旋转 · ↓ 加速 · Space 直落</strong>
        </p>
        <div class="info-tags">
          <span class="tag">Canvas 2D</span>
          <span class="tag">Claude Artifacts</span>
          <span class="tag">Game Logic</span>
          <span class="tag">Zero Hand-coding</span>
        </div>
      </div>
      <div class="split-demo" style="display:flex;align-items:center;justify-content:center;background:#0a0b0d;">
        <canvas id="${cid}" width="240" height="480" style="border:1px solid rgba(255,159,10,.25);border-radius:4px;display:block;"></canvas>
        <span class="demo-label">← → ↑ ↓ Space</span>
        <span class="demo-badge">🧱 可直接玩</span>
      </div>
    </div>
  `;
  requestAnimationFrame(function(){ initTetris(cid); });
});

function initTetris(cid) {
  const canvas = document.getElementById(cid);
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  const W=10, H=20, SZ=24;
  const PIECES=[
    [[1,1,1,1]],
    [[1,1],[1,1]],
    [[0,1,0],[1,1,1]],
    [[1,0,0],[1,1,1]],
    [[0,0,1],[1,1,1]],
    [[0,1,1],[1,1,0]],
    [[1,1,0],[0,1,1]]
  ];
  const COLORS=['#4f8fff','#ff9f0a','#bf5af2','#ff375f','#30d158','#40c8e0','#f5c518'];
  let board=Array.from({length:H},function(){return new Array(W).fill(0);});
  let score=0, cur, curX, curY, curC, gameOver=false;

  function newPiece(){
    const i=Math.floor(Math.random()*PIECES.length);
    cur=PIECES[i]; curC=COLORS[i]; curX=Math.floor((W-cur[0].length)/2); curY=0;
    if(!valid(cur,curX,curY)) { gameOver=true; }
  }
  function valid(p,x,y){
    for(let r=0;r<p.length;r++) for(let c=0;c<p[r].length;c++) {
      if(!p[r][c]) continue;
      const nx=x+c,ny=y+r;
      if(nx<0||nx>=W||ny>=H) return false;
      if(ny>=0&&board[ny][nx]) return false;
    }
    return true;
  }
  function merge(){
    for(let r=0;r<cur.length;r++) for(let c=0;c<cur[r].length;c++) {
      if(cur[r][c]) board[curY+r][curX+c]=curC;
    }
    let lines=0;
    for(let r=H-1;r>=0;r--) if(board[r].every(function(c){return c;})){board.splice(r,1);board.unshift(new Array(W).fill(0));lines++;r++;}
    score+=lines*100;
    newPiece();
  }
  function rotate(p){
    const R=p[0].length, C=p.length;
    return Array.from({length:R},function(_,r){return Array.from({length:C},function(_,c){return p[C-1-c][r];});});
  }
  newPiece();
  let drop=0;
  function draw(){
    ctx.fillStyle='#0a0b0d'; ctx.fillRect(0,0,W*SZ,H*SZ);
    for(let r=0;r<H;r++) for(let c=0;c<W;c++) {
      if(board[r][c]){ctx.fillStyle=board[r][c];ctx.fillRect(c*SZ+1,r*SZ+1,SZ-2,SZ-2);}
      ctx.strokeStyle='rgba(255,255,255,.04)'; ctx.strokeRect(c*SZ,r*SZ,SZ,SZ);
    }
    if(cur&&!gameOver){
      for(let r=0;r<cur.length;r++) for(let c=0;c<cur[r].length;c++) {
        if(cur[r][c]){ctx.fillStyle=curC;ctx.fillRect((curX+c)*SZ+1,(curY+r)*SZ+1,SZ-2,SZ-2);}
      }
    }
    ctx.fillStyle='rgba(255,159,10,.9)'; ctx.font='bold 13px Inter,sans-serif'; ctx.fillText('SCORE: '+score,8,16);
    if(gameOver){
      ctx.fillStyle='rgba(0,0,0,.7)'; ctx.fillRect(0,H*SZ/2-30,W*SZ,60);
      ctx.fillStyle='#ff375f'; ctx.font='bold 18px Inter,sans-serif'; ctx.textAlign='center';
      ctx.fillText('GAME OVER',W*SZ/2,H*SZ/2+6); ctx.textAlign='left';
    }
    drop++;
    if(drop>20&&!gameOver){
      drop=0;
      if(valid(cur,curX,curY+1)) curY++;
      else merge();
    }
    requestAnimationFrame(draw);
  }
  document.addEventListener('keydown', function(e){
    if(gameOver){if(e.key===' '){board=Array.from({length:H},function(){return new Array(W).fill(0);});score=0;gameOver=false;newPiece();}return;}
    if(e.key==='ArrowLeft'&&valid(cur,curX-1,curY))curX--;
    if(e.key==='ArrowRight'&&valid(cur,curX+1,curY))curX++;
    if(e.key==='ArrowUp'){const r=rotate(cur);if(valid(r,curX,curY))cur=r;}
    if(e.key==='ArrowDown'&&valid(cur,curX,curY+1))curY++;
    if(e.key===' '){while(valid(cur,curX,curY+1))curY++;merge();}
  });
  draw();
}

// CASE · AI Grand Prix (iframe)
s('case-racing', function(el) {
  el.innerHTML = `
    <div class="split">
      <div class="split-info">
        <span class="cat-tag" style="color:#ff9f0a;border-color:rgba(255,159,10,.3);background:rgba(255,159,10,.07)">游戏</span>
        <div class="info-title">AI Grand Prix</div>
        <div class="info-author">Pieter Levels · @levelsio · 2025</div>
        <p class="info-desc">
          继飞行模拟器之后，Pieter Levels 继续 Vibe Coding 做出的浏览器赛车游戏——AI 车手对战、多人竞速，跑在 Cloudflare Workers 上，成本极低。<br><br>
          整个赛车游戏的碰撞、AI 驾驶逻辑，都由 <strong style="color:var(--txt)">Claude + Cursor</strong> 生成。
        </p>
        <div class="info-tags">
          <span class="tag">Cursor</span>
          <span class="tag">Claude</span>
          <span class="tag">Cloudflare Workers</span>
          <span class="tag">Multiplayer</span>
        </div>
        <a class="info-link" href="https://ai.grand.prix" target="_blank">
          ai.grand.prix <span class="info-link-arrow">↗</span>
        </a>
      </div>
      <div class="split-demo" style="display:flex;align-items:center;justify-content:center;background:#0e0f11;flex-direction:column;gap:20px;">
        <div style="text-align:center;padding:0 40px;">
          <div style="font-size:48px;margin-bottom:16px;">🏎️</div>
          <div style="font-size:18px;font-weight:600;color:rgba(255,255,255,.9);margin-bottom:10px;">ai.grand.prix</div>
          <div style="font-size:13px;color:rgba(255,255,255,.4);line-height:1.6;margin-bottom:24px;">该网站屏蔽了 iframe 嵌入，<br>请点击下方按钮在新标签页体验</div>
          <a href="https://ai.grand.prix" target="_blank" style="display:inline-block;padding:12px 28px;background:rgba(255,159,10,.15);border:1px solid rgba(255,159,10,.4);border-radius:8px;color:#ff9f0a;text-decoration:none;font-size:13px;font-weight:500;letter-spacing:.04em;">打开 ai.grand.prix ↗</a>
        </div>
        <span class="demo-badge">🏁 Vibe Coded Racing</span>
      </div>
    </div>
  `;
});

// ══════════════════════════════════════════════════════
// CATEGORY 06 · 效率工具
// ══════════════════════════════════════════════════════
s('cat-tool', function(el) {
  el.className += ' cat-slide';
  el.innerHTML = `
    <div class="glow" style="width:380px;height:280px;background:rgba(48,209,88,.09);bottom:15%;left:10%;filter:blur(80px);"></div>
    <div class="cat-slide-num">06</div>
    <div class="cat-slide-label" style="color:#30d158;">CATEGORY 06</div>
    <div class="cat-slide-title">效率工具 &amp; App</div>
    <p class="cat-slide-desc">从浏览器扩展到企业内部系统，Vibe Coding 已进入真实生产环境。</p>
    <div class="cat-slide-count">3 个真实落地案例</div>
  `;
});

s('case-tools', function(el) {
  el.className += ' cat-slide';
  el.style.cssText += 'padding:0 80px;';
  el.innerHTML = `
    <div class="glow" style="width:300px;height:240px;background:rgba(48,209,88,.06);top:10%;right:5%;filter:blur(80px);"></div>
    <div style="position:relative;z-index:2;width:100%;max-width:1000px;display:grid;grid-template-columns:repeat(3,1fr);gap:20px;">
      <div style="background:rgba(255,255,255,.04);border:1px solid rgba(255,255,255,.08);border-radius:18px;padding:32px 28px;">
        <div style="font-size:36px;margin-bottom:16px;">💬</div>
        <div style="font-size:16px;font-weight:600;color:rgba(255,255,255,.9);margin-bottom:8px;">周末 Slack App</div>
        <div style="font-family:'JetBrains Mono',monospace;font-size:11px;color:rgba(255,255,255,.3);margin-bottom:12px;">Omar Shiekh · 2025</div>
        <p style="font-size:13px;color:rgba(255,255,255,.55);line-height:1.7;">用 Claude + Cursor 一个周末做出完整功能的 Slack 工作流 App——如果手写代码需要至少一周。</p>
        <div style="margin-top:16px;display:flex;gap:8px;flex-wrap:wrap;">
          <span style="padding:3px 10px;border-radius:6px;font-size:11px;background:rgba(48,209,88,.1);color:#30d158;border:1px solid rgba(48,209,88,.2);">Claude</span>
          <span style="padding:3px 10px;border-radius:6px;font-size:11px;background:rgba(48,209,88,.1);color:#30d158;border:1px solid rgba(48,209,88,.2);">Cursor</span>
        </div>
      </div>
      <div style="background:rgba(255,255,255,.04);border:1px solid rgba(255,255,255,.08);border-radius:18px;padding:32px 28px;">
        <div style="font-size:36px;margin-bottom:16px;">🗣️</div>
        <div style="font-size:16px;font-weight:600;color:rgba(255,255,255,.9);margin-bottom:8px;">SpeakPath 语言学习</div>
        <div style="font-family:'JetBrains Mono',monospace;font-size:11px;color:rgba(255,255,255,.3);margin-bottom:12px;">非工程师创作者 · 2025</div>
        <p style="font-size:13px;color:rgba(255,255,255,.55);line-height:1.7;">Chrome 扩展，用 Gemini 自动生成个性化语言学习路径——Vibe Coding 让非工程师也能做出真实的 AI 产品。</p>
        <div style="margin-top:16px;display:flex;gap:8px;flex-wrap:wrap;">
          <span style="padding:3px 10px;border-radius:6px;font-size:11px;background:rgba(48,209,88,.1);color:#30d158;border:1px solid rgba(48,209,88,.2);">Gemini</span>
          <span style="padding:3px 10px;border-radius:6px;font-size:11px;background:rgba(48,209,88,.1);color:#30d158;border:1px solid rgba(48,209,88,.2);">Chrome Ext</span>
        </div>
      </div>
      <div style="background:rgba(255,255,255,.04);border:1px solid rgba(255,255,255,.08);border-radius:18px;padding:32px 28px;">
        <div style="font-size:36px;margin-bottom:16px;">🏦</div>
        <div style="font-size:16px;font-weight:600;color:rgba(255,255,255,.9);margin-bottom:8px;">摩根士丹利 AI 助手</div>
        <div style="font-family:'JetBrains Mono',monospace;font-size:11px;color:rgba(255,255,255,.3);margin-bottom:12px;">Morgan Stanley · Enterprise</div>
        <p style="font-size:13px;color:rgba(255,255,255,.55);line-height:1.7;">内部理财师工具，GPT-4 辅助构建，数千名顾问日常使用——最早的企业级 Vibe Coding 落地案例之一。</p>
        <div style="margin-top:16px;display:flex;gap:8px;flex-wrap:wrap;">
          <span style="padding:3px 10px;border-radius:6px;font-size:11px;background:rgba(48,209,88,.1);color:#30d158;border:1px solid rgba(48,209,88,.2);">GPT-4</span>
          <span style="padding:3px 10px;border-radius:6px;font-size:11px;background:rgba(48,209,88,.1);color:#30d158;border:1px solid rgba(48,209,88,.2);">Enterprise</span>
        </div>
      </div>
    </div>
  `;
});

// ══════════════════════════════════════════════════════
// OUTRO
// ══════════════════════════════════════════════════════
s('outro', function(el) {
  el.className += ' outro-slide';
  el.innerHTML = `
    <div class="cover-grid"></div>
    <div class="cover-glow" style="width:500px;height:380px;background:rgba(79,143,255,.08);top:10%;left:20%;filter:blur(100px);"></div>
    <div style="position:relative;z-index:2;text-align:center;">
      <div style="font-family:'JetBrains Mono',monospace;font-size:10px;color:rgba(255,255,255,.2);letter-spacing:.22em;margin-bottom:28px;">THE TAKEAWAY</div>
      <p class="outro-quote">
        工具已经准备好了。<br>
        <strong>现在的门槛，只剩下一个好想法。</strong>
      </p>
      <div style="margin-top:36px;font-size:14px;color:rgba(255,255,255,.3);line-height:1.8;">
        Claude · Cursor · Bolt.new · v0 · Lovable · Replit<br>
        <span style="font-family:'JetBrains Mono',monospace;font-size:11px;color:rgba(255,255,255,.15);">— 描述你的想法，让 AI 写代码 —</span>
      </div>
    </div>
  `;
});
