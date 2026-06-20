const SLIDES = [];
function s(id, renderFn) { SLIDES.push({ id, render: renderFn }); }

// ══════════════════════════════════════════════════════
// SLIDE 0 · COVER
// ══════════════════════════════════════════════════════
s('cover', function(el) {
  el.className += ' cover-slide';
  el.innerHTML = `
    <div class="cover-grid"></div>
    <div class="cover-glow" style="width:500px;height:380px;background:rgba(79,143,255,.09);top:5%;left:20%;"></div>
    <div class="cover-glow" style="width:350px;height:280px;background:rgba(191,90,242,.07);bottom:10%;right:15%;"></div>
    <div class="cover-content">
      <div class="cover-eyebrow">2025 · AI × Creative Coding</div>
      <h1 class="cover-title">Vibe<br><em>Coding</em></h1>
      <p class="cover-sub">用自然语言描述想法，让 AI 写代码——<br>不懂代码，也能做出令人惊叹的交互作品</p>
      <div class="cover-chips">
        <span class="chip" style="color:#4f8fff;border-color:rgba(79,143,255,.35);background:rgba(79,143,255,.08)">3D 场景</span>
        <span class="chip" style="color:#30d158;border-color:rgba(48,209,88,.35);background:rgba(48,209,88,.08)">粒子系统</span>
        <span class="chip" style="color:#bf5af2;border-color:rgba(191,90,242,.35);background:rgba(191,90,242,.08)">作品集</span>
        <span class="chip" style="color:#40c8e0;border-color:rgba(64,200,224,.35);background:rgba(64,200,224,.08)">摄像头交互</span>
        <span class="chip" style="color:#ff9f0a;border-color:rgba(255,159,10,.35);background:rgba(255,159,10,.08)">游戏</span>
        <span class="chip" style="color:#30d158;border-color:rgba(48,209,88,.35);background:rgba(48,209,88,.08)">效率工具</span>
        <span class="chip" style="color:#ff375f;border-color:rgba(255,55,95,.35);background:rgba(255,55,95,.08)">生成艺术</span>
      </div>
    </div>
    <div class="scroll-hint">
      <div class="scroll-hint-text">SCROLL</div>
      <div class="scroll-hint-line"></div>
    </div>
  `;
});

// ══════════════════════════════════════════════════════
// CATEGORY 01 · 3D 场景
// ══════════════════════════════════════════════════════
s('cat-3d', function(el) {
  el.className += ' cat-slide';
  el.innerHTML = `
    <div class="glow" style="width:400px;height:300px;background:rgba(79,143,255,.1);top:20%;left:10%;filter:blur(80px);"></div>
    <div class="cat-slide-num">01</div>
    <div class="cat-slide-label" style="color:#4f8fff;">CATEGORY 01</div>
    <div class="cat-slide-title">3D 场景</div>
    <p class="cat-slide-desc">Three.js / WebGL + AI 驱动，浏览器里的沉浸式 3D 体验，几行 prompt 完成原本需要几周的工作。</p>
    <div class="cat-slide-count">3 个案例 · 可实时交互</div>
  `;
});

// CASE 1 · fly.pieter.com (iframe 直接嵌)
s('case-fly', function(el) {
  el.innerHTML = `
    <div class="split">
      <div class="split-info">
        <span class="cat-tag" style="color:#4f8fff;border-color:rgba(79,143,255,.3);background:rgba(79,143,255,.07)">3D 场景</span>
        <div class="info-title">浏览器飞行模拟器</div>
        <div class="info-author">Pieter Levels · @levelsio · 2025</div>
        <p class="info-desc">
          浏览器内 60fps 飞行，含多人联机、ATC 通话、天气系统、云层、地形——全部用 <strong style="color:var(--txt)">Cursor + Claude</strong> vibe coding 几小时做完。<br><br>
          代码量数千行，作者自己也没完整看过一遍，病毒式传播超百万次曝光。
        </p>
        <div class="info-tags">
          <span class="tag">Three.js</span>
          <span class="tag">Cursor</span>
          <span class="tag">Claude</span>
          <span class="tag">Multiplayer</span>
        </div>
        <a class="info-link" href="https://fly.pieter.com" target="_blank">
          fly.pieter.com <span class="info-link-arrow">↗</span>
        </a>
      </div>
      <div class="split-demo">
        <iframe src="https://fly.pieter.com" sandbox="allow-scripts allow-same-origin allow-forms" loading="lazy"></iframe>
        <span class="demo-label">LIVE DEMO · fly.pieter.com</span>
        <span class="demo-badge">✈️ 可直接操控</span>
      </div>
    </div>
  `;
});

// CASE 2 · 3D Particle Sphere (内嵌 Canvas demo)
s('case-3d-sphere', function(el) {
  const cid = 'c_sphere_' + Date.now();
  el.innerHTML = `
    <div class="split">
      <div class="split-info">
        <span class="cat-tag" style="color:#4f8fff;border-color:rgba(79,143,255,.3);background:rgba(79,143,255,.07)">3D 场景</span>
        <div class="info-title">3D 粒子球 · 实时交互</div>
        <div class="info-author">Vibe Coded with Claude · WebGL</div>
        <p class="info-desc">
          用 Claude 描述「做一个三维粒子球，鼠标拖拽可以旋转，粒子随机分布在球面上」——AI 生成完整 WebGL 代码，一次跑通。<br><br>
          右侧是实时运行的版本，<strong style="color:var(--txt)">拖拽鼠标</strong>可旋转，滚轮缩放。
        </p>
        <div class="info-tags">
          <span class="tag">WebGL</span>
          <span class="tag">Claude Artifacts</span>
          <span class="tag">Vibe Coded</span>
        </div>
      </div>
      <div class="split-demo" id="demo_sphere_${cid}">
        <canvas id="${cid}"></canvas>
        <span class="demo-label">LIVE DEMO · 拖拽旋转 · 滚轮缩放</span>
        <span class="demo-badge">🌐 Claude 生成</span>
      </div>
    </div>
  `;
  // Run after DOM is attached
  requestAnimationFrame(function() { initSphere(cid); });
});

function initSphere(cid) {
  const canvas = document.getElementById(cid);
  if (!canvas) return;
  const parent = canvas.parentElement;
  canvas.width = parent.clientWidth;
  canvas.height = parent.clientHeight;
  const gl = canvas.getContext('webgl');
  if (!gl) return;

  const N = 2400;
  const pts = [];
  for (let i = 0; i < N; i++) {
    const theta = Math.acos(1 - 2 * (i + 0.5) / N);
    const phi = Math.PI * (1 + Math.sqrt(5)) * i;
    pts.push(Math.sin(theta)*Math.cos(phi), Math.cos(theta), Math.sin(theta)*Math.sin(phi));
  }

  const vsBuf = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, vsBuf);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(pts), gl.STATIC_DRAW);

  const vert = `attribute vec3 a; uniform mat4 u; uniform float s;
    void main(){ gl_Position=u*vec4(a*s,1.); gl_PointSize=1.8; }`;
  const frag = `precision mediump float;
    void main(){ float d=length(gl_PointCoord-.5)*2.; if(d>1.)discard;
      gl_FragColor=vec4(0.31,0.55,1.,0.7*(1.-d)); }`;

  function mkShader(type, src) {
    const sh = gl.createShader(type);
    gl.shaderSource(sh, src); gl.compileShader(sh); return sh;
  }
  const prog = gl.createProgram();
  gl.attachShader(prog, mkShader(gl.VERTEX_SHADER, vert));
  gl.attachShader(prog, mkShader(gl.FRAGMENT_SHADER, frag));
  gl.linkProgram(prog); gl.useProgram(prog);

  const aLoc = gl.getAttribLocation(prog, 'a');
  const uLoc = gl.getUniformLocation(prog, 'u');
  const sLoc = gl.getUniformLocation(prog, 's');
  gl.enableVertexAttribArray(aLoc);
  gl.bindBuffer(gl.ARRAY_BUFFER, vsBuf);
  gl.vertexAttribPointer(aLoc, 3, gl.FLOAT, false, 0, 0);
  gl.enable(gl.BLEND);
  gl.blendFunc(gl.SRC_ALPHA, gl.ONE);

  let rotX = 0.3, rotY = 0, scale = 0.72;
  let drag = false, lx = 0, ly = 0;
  canvas.addEventListener('mousedown', function(e){ drag=true; lx=e.clientX; ly=e.clientY; });
  canvas.addEventListener('mousemove', function(e){
    if (!drag) return;
    rotY += (e.clientX-lx)*0.008; rotX += (e.clientY-ly)*0.008;
    lx=e.clientX; ly=e.clientY;
  });
  canvas.addEventListener('mouseup', function(){ drag=false; });
  canvas.addEventListener('mouseleave', function(){ drag=false; });
  canvas.addEventListener('wheel', function(e){ scale=Math.max(0.3,Math.min(1.4,scale-e.deltaY*0.001)); e.preventDefault(); },{passive:false});

  function mat4RotXY(rx,ry) {
    const cx=Math.cos(rx),sx=Math.sin(rx),cy=Math.cos(ry),sy=Math.sin(ry);
    return [cy,0,sy,0, sx*sy,cx,-sx*cy,0, -cx*sy,sx,cx*cy,0, 0,0,0,1];
  }
  function perspective(fov,aspect,near,far) {
    const f=1/Math.tan(fov/2),nf=1/(near-far);
    return [f/aspect,0,0,0, 0,f,0,0, 0,0,(far+near)*nf,-1, 0,0,2*far*near*nf,0];
  }
  function mul4(a,b) {
    const r=new Array(16);
    for(let i=0;i<4;i++) for(let j=0;j<4;j++) {
      r[i*4+j]=0; for(let k=0;k<4;k++) r[i*4+j]+=a[i*4+k]*b[k*4+j];
    }
    return r;
  }
  function translate(m,x,y,z){
    const t=[1,0,0,0,0,1,0,0,0,0,1,0,x,y,z,1]; return mul4(t,m);
  }

  let t=0;
  function frame() {
    if(!drag) rotY += 0.004;
    t++;
    canvas.width=parent.clientWidth; canvas.height=parent.clientHeight;
    gl.viewport(0,0,canvas.width,canvas.height);
    gl.clearColor(0.039,0.043,0.047,1); gl.clear(gl.COLOR_BUFFER_BIT);
    const proj=perspective(0.9,canvas.width/canvas.height,0.1,100);
    const rot=mat4RotXY(rotX,rotY);
    const view=translate(rot,0,0,-2.5);
    const mvp=mul4(proj,view);
    gl.uniformMatrix4fv(uLoc,false,new Float32Array(mvp));
    gl.uniform1f(sLoc,scale);
    gl.drawArrays(gl.POINTS,0,N);
    requestAnimationFrame(frame);
  }
  frame();
}

// CASE 3 · Refik Anadol Unsupervised (iframe)
s('case-refik', function(el) {
  el.innerHTML = `
    <div class="split">
      <div class="split-info">
        <span class="cat-tag" style="color:#4f8fff;border-color:rgba(79,143,255,.3);background:rgba(79,143,255,.07)">3D · 生成艺术</span>
        <div class="info-title">Unsupervised · MoMA</div>
        <div class="info-author">Refik Anadol Studio · 纽约现代艺术博物馆</div>
        <p class="info-desc">
          用机器学习训练 MoMA 全部馆藏，实时生成巨幅流动抽象影像，在美术馆大厅展出。<br><br>
          证明 AI + 代码可以直接成为<strong style="color:var(--txt)">当代艺术作品</strong>，而不仅仅是工具。
        </p>
        <div class="info-tags">
          <span class="tag">Machine Learning</span>
          <span class="tag">Data Sculpture</span>
          <span class="tag">MoMA</span>
          <span class="tag">Real-time</span>
        </div>
        <a class="info-link" href="https://refikanadol.com/works/unsupervised/" target="_blank">
          refikanadol.com <span class="info-link-arrow">↗</span>
        </a>
      </div>
      <div class="split-demo">
        <iframe src="https://refikanadol.com/works/unsupervised/" loading="lazy"></iframe>
        <span class="demo-label">LIVE · refikanadol.com</span>
        <span class="demo-badge">🎨 AI Art · MoMA</span>
      </div>
    </div>
  `;
});

// ══════════════════════════════════════════════════════
// CATEGORY 02 · 粒子系统
// ══════════════════════════════════════════════════════
s('cat-particle', function(el) {
  el.className += ' cat-slide';
  el.innerHTML = `
    <div class="glow" style="width:420px;height:320px;background:rgba(48,209,88,.09);top:15%;right:10%;filter:blur(80px);"></div>
    <div class="cat-slide-num">02</div>
    <div class="cat-slide-label" style="color:#30d158;">CATEGORY 02</div>
    <div class="cat-slide-title">粒子系统</div>
    <p class="cat-slide-desc">模拟自然行为的粒子与群体智能，Canvas 2D / WebGL 实时演算，鼠标交互。</p>
    <div class="cat-slide-count">2 个案例 · 右侧即时运行</div>
  `;
});

// CASE · Flocking Simulation
s('case-flock', function(el) {
  const cid = 'c_flock_' + Date.now();
  el.innerHTML = `
    <div class="split">
      <div class="split-info">
        <span class="cat-tag" style="color:#30d158;border-color:rgba(48,209,88,.3);background:rgba(48,209,88,.07)">粒子系统</span>
        <div class="info-title">群集涌现模拟</div>
        <div class="info-author">Kyle Corbitt · OpenAI · 2025</div>
        <p class="info-desc">
          每个粒子只遵循三条简单规则：<strong style="color:var(--txt)">靠近 · 对齐 · 分离</strong>——却自发涌现出鸟群飞翔的有机行为。<br><br>
          Kyle Corbitt（OpenAI）用 Vibe Coding 生成，成为传播最广的粒子案例之一。<br>右侧为复现版本，<strong style="color:var(--txt)">移动鼠标</strong>可驱散鸟群。
        </p>
        <div class="info-tags">
          <span class="tag">Boids Algorithm</span>
          <span class="tag">Canvas 2D</span>
          <span class="tag">Claude</span>
          <span class="tag">Emergent Behavior</span>
        </div>
      </div>
      <div class="split-demo">
        <canvas id="${cid}"></canvas>
        <span class="demo-label">LIVE DEMO · 移动鼠标驱散</span>
        <span class="demo-badge">🐦 群集涌现</span>
      </div>
    </div>
  `;
  requestAnimationFrame(function(){ initFlock(cid); });
});

function initFlock(cid) {
  const canvas = document.getElementById(cid);
  if (!canvas) return;
  const p = canvas.parentElement;
  canvas.width = p.clientWidth; canvas.height = p.clientHeight;
  const ctx = canvas.getContext('2d');
  const W = canvas.width, H = canvas.height;
  let mx = W/2, my = H/2;
  canvas.addEventListener('mousemove', function(e){ const r=canvas.getBoundingClientRect(); mx=e.clientX-r.left; my=e.clientY-r.top; });

  const N = 180;
  const boids = Array.from({length:N}, function(){
    const angle = Math.random()*Math.PI*2;
    return { x:Math.random()*W, y:Math.random()*H, vx:Math.cos(angle)*2, vy:Math.sin(angle)*2 };
  });

  function frame() {
    ctx.fillStyle = 'rgba(10,11,13,0.22)';
    ctx.fillRect(0,0,W,H);
    for (let i=0;i<N;i++) {
      const b=boids[i];
      let ax=0,ay=0,sx=0,sy=0,cx=0,cy=0,cn=0;
      for(let j=0;j<N;j++) {
        if(i===j) continue;
        const dx=boids[j].x-b.x, dy=boids[j].y-b.y;
        const d2=dx*dx+dy*dy;
        if(d2<2500){
          const d=Math.sqrt(d2);
          ax+=boids[j].vx; ay+=boids[j].vy;
          if(d<50){ sx-=dx/d; sy-=dy/d; }
          cx+=boids[j].x; cy+=boids[j].y; cn++;
        }
      }
      if(cn){cx/=cn;cy/=cn;b.vx+=(cx-b.x)*0.0008+(ax/cn-b.vx)*0.05+sx*0.06;b.vy+=(cy-b.y)*0.0008+(ay/cn-b.vy)*0.05+sy*0.06;}
      // mouse repulsion
      const mdx=b.x-mx,mdy=b.y-my,md2=mdx*mdx+mdy*mdy;
      if(md2<14400){const md=Math.sqrt(md2);b.vx+=mdx/md*0.8;b.vy+=mdy/md*0.8;}
      const spd=Math.sqrt(b.vx*b.vx+b.vy*b.vy);
      if(spd>3.2){b.vx=b.vx/spd*3.2;b.vy=b.vy/spd*3.2;}
      if(spd<1.2){b.vx=b.vx/spd*1.2;b.vy=b.vy/spd*1.2;}
      b.x=(b.x+b.vx+W)%W; b.y=(b.y+b.vy+H)%H;
      const angle=Math.atan2(b.vy,b.vx);
      ctx.save();
      ctx.translate(b.x,b.y); ctx.rotate(angle);
      ctx.beginPath(); ctx.moveTo(5,0); ctx.lineTo(-3,2.5); ctx.lineTo(-3,-2.5); ctx.closePath();
      ctx.fillStyle='rgba(48,209,88,0.82)'; ctx.fill();
      ctx.restore();
    }
    requestAnimationFrame(frame);
  }
  ctx.fillStyle='#0a0b0d'; ctx.fillRect(0,0,W,H);
  frame();
}

// CASE · Particle Interaction
s('case-particles', function(el) {
  const cid = 'c_pts_' + Date.now();
  el.innerHTML = `
    <div class="split">
      <div class="split-info">
        <span class="cat-tag" style="color:#30d158;border-color:rgba(48,209,88,.3);background:rgba(48,209,88,.07)">粒子系统</span>
        <div class="info-title">鼠标引力粒子场</div>
        <div class="info-author">Claude Artifacts · 社区复现</div>
        <p class="info-desc">
          典型 Vibe Coding 粒子作品：描述「做一个粒子被鼠标吸引、松开后弹回原位的效果」——Claude 一次生成。<br><br>
          右侧实时运行，<strong style="color:var(--txt)">移动鼠标</strong>吸引粒子，<strong style="color:var(--txt)">点击</strong>触发爆散。
        </p>
        <div class="info-tags">
          <span class="tag">Canvas 2D</span>
          <span class="tag">Physics</span>
          <span class="tag">Claude Artifacts</span>
          <span class="tag">Interactive</span>
        </div>
      </div>
      <div class="split-demo">
        <canvas id="${cid}"></canvas>
        <span class="demo-label">LIVE DEMO · 移动鼠标 · 点击爆散</span>
        <span class="demo-badge">✨ 引力粒子场</span>
      </div>
    </div>
  `;
  requestAnimationFrame(function(){ initParticles(cid); });
});

function initParticles(cid) {
  const canvas = document.getElementById(cid);
  if (!canvas) return;
  const p = canvas.parentElement;
  canvas.width = p.clientWidth; canvas.height = p.clientHeight;
  const ctx = canvas.getContext('2d');
  const W = canvas.width, H = canvas.height;
  let mx = -999, my = -999, explode = false;

  canvas.addEventListener('mousemove', function(e){ const r=canvas.getBoundingClientRect(); mx=e.clientX-r.left; my=e.clientY-r.top; });
  canvas.addEventListener('click', function(e){ const r=canvas.getBoundingClientRect(); mx=e.clientX-r.left; my=e.clientY-r.top; explode=true; setTimeout(function(){explode=false;},120); });

  const COLS = ['#4f8fff','#30d158','#bf5af2','#ff375f','#ff9f0a','#40c8e0'];
  const N = 220;
  const pts = Array.from({length:N}, function(_, i){
    const ox=80+Math.random()*(W-160), oy=80+Math.random()*(H-160);
    return { ox, oy, x:ox, y:oy, vx:0, vy:0, col:COLS[i%COLS.length] };
  });

  function frame() {
    ctx.fillStyle='rgba(10,11,13,0.18)'; ctx.fillRect(0,0,W,H);
    for (const b of pts) {
      const dx=mx-b.x, dy=my-b.y, d=Math.sqrt(dx*dx+dy*dy)||1;
      const force = explode ? -8 : (d<160 ? 0.18*(1-d/160) : 0);
      b.vx += dx/d*force + (b.ox-b.x)*0.04;
      b.vy += dy/d*force + (b.oy-b.y)*0.04;
      b.vx *= 0.84; b.vy *= 0.84;
      b.x+=b.vx; b.y+=b.vy;
      ctx.beginPath();
      ctx.arc(b.x,b.y,2.2,0,Math.PI*2);
      ctx.fillStyle=b.col; ctx.fill();
    }
    requestAnimationFrame(frame);
  }
  ctx.fillStyle='#0a0b0d'; ctx.fillRect(0,0,W,H);
  frame();
}
