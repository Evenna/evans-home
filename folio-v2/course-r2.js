/* course-r2.js  — physics, scene, steps renderers */

function renderPhysics(el) {
  el.innerHTML = `
<div class="sec-head">物理引擎的工作原理</div>
<div class="timeline">
  ${[
    ['物理世界（看不见）','Cannon.js 在后台建立一个虚拟空间，有重力、碰撞体积、车轮弹簧'],
    ['Three.js 世界（看得见）','渲染用的 3D 模型，本身不参与物理计算，只负责显示'],
    ['每帧同步位置','物理算完位置后，把坐标复制给 Three.js 的模型——每秒60次'],
  ].map(([t,d],i)=>`
    <div class="tl-item">
      <div class="tl-left">
        <div class="tl-num">${i+1}</div>
        <div class="tl-line"></div>
      </div>
      <div class="tl-body"><h4>${t}</h4><p>${d}</p></div>
    </div>
  `).join('')}
</div>
<div class="sec-head">最大的坑：Z 轴方向</div>
<div class="info-card warn">
  <h5>⚠️ 这个项目的坐标系和普通 Three.js 不一样！</h5>
  <p>通常 3D 世界 <code>Y轴</code> 是「上」，但这个项目用 <code>Z轴</code> 是「上」。所以重力要这样设：<code>gravity.set(0, 0, -13)</code>，而不是 <code>(0, -9.8, 0)</code>。每次让 AI 写物理代码，都要提醒它「Z轴朝上」。</p>
</div>
<div class="sec-head">车辆关键参数</div>
<div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;margin-bottom:14px">
  ${[
    ['车身质量','40','越重越难加速','调大→更稳，调小→更灵活'],
    ['悬挂刚度','50','弹簧硬度','调大→不晃，调小→很弹'],
    ['摩擦系数','10','轮胎抓地力','调大→不打滑，调小→漂移'],
    ['阻尼系数','1.8','悬挂回弹速度','调大→回弹慢，调小→一直弹'],
  ].map(([lbl,val,desc,tip])=>`
    <div style="padding:11px 13px;background:var(--card);border:1px solid var(--border);border-radius:8px">
      <div style="font-size:11px;color:var(--txt3);margin-bottom:4px">${lbl}</div>
      <div style="font-size:20px;font-weight:600;font-family:var(--mono);color:var(--orange);margin-bottom:4px">${val}</div>
      <div style="font-size:11.5px;color:var(--txt2)">${desc}</div>
      <div style="font-size:10.5px;color:var(--txt3);margin-top:3px">${tip}</div>
    </div>
  `).join('')}
</div>
<div class="code-block"><span class="c">// 每帧同步物理位置到 Three.js（最核心的一行代码）</span>
world.<span class="n">step</span>(<span class="o">1</span>/<span class="o">60</span>);
carMesh.position.<span class="n">copy</span>(chassisBody.position);
carMesh.quaternion.<span class="n">copy</span>(chassisBody.quaternion);</div>`;
}

function renderScene(el) {
  el.innerHTML = `
<div class="sec-head">五大区域地图</div>
<canvas id="map-diagram" width="372" height="200" style="display:block;border-radius:10px;border:1px solid var(--border);margin-bottom:14px"></canvas>
<div class="sec-head">等距相机是什么</div>
<div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;margin-bottom:14px">
  <div style="padding:12px;background:var(--card);border:1px solid rgba(255,100,100,.15);border-radius:9px">
    <div style="font-size:11px;color:#ff6b6b;font-family:var(--mono);margin-bottom:6px">透视相机（普通）</div>
    <div style="font-size:12px;color:var(--txt2)">近大远小，像人眼看到的样子</div>
  </div>
  <div style="padding:12px;background:var(--card);border:1px solid rgba(79,143,255,.2);border-radius:9px">
    <div style="font-size:11px;color:var(--accent);font-family:var(--mono);margin-bottom:6px">等距相机（这个项目）</div>
    <div style="font-size:12px;color:var(--txt2)">平行投影，像城建游戏，没有近大远小</div>
  </div>
</div>
<div class="info-card tip">
  <h5>相机「懒」跟随</h5>
  <p>相机不是直接跟着车，而是每帧「向车的方向靠近一点点」（系数 0.15）。所以相机有轻微的延迟感，视觉上更流畅、更像游戏。</p>
</div>
<div class="sec-head">区域触发逻辑</div>
<div class="timeline" style="margin-bottom:0">
  ${[
    ['每帧检测','用 Raycaster 检测车子是否进入热区'],
    ['进度环','进入热区后，地板边框出现「装载进度」圆环动画（GLSL实现）'],
    ['弹出交互','停留足够久，弹出项目详情或跳转链接'],
  ].map(([t,d],i)=>`
    <div class="tl-item">
      <div class="tl-left"><div class="tl-num">${i+1}</div><div class="tl-line"></div></div>
      <div class="tl-body"><h4>${t}</h4><p>${d}</p></div>
    </div>
  `).join('')}
</div>`;
  requestAnimationFrame(() => {
    const cv = document.getElementById('map-diagram');
    if (!cv) return;
    const ctx = cv.getContext('2d');
    const W = cv.width, H = cv.height;
    ctx.clearRect(0, 0, W, H);
    ctx.fillStyle = '#0d1118';
    ctx.fillRect(0, 0, W, H);
    // draw road grid
    ctx.strokeStyle = 'rgba(255,255,255,0.06)';
    ctx.lineWidth = 1;
    for (let x = 0; x < W; x += 30) { ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, H); ctx.stroke(); }
    for (let y = 0; y < H; y += 30) { ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(W, y); ctx.stroke(); }
    const zones = [
      { x: 186, y: 50,  w: 80, h: 40, col: '#1a3a6a', label: 'Intro', sub: '起点' },
      { x: 186, y: 105, w: 80, h: 36, col: '#1a2a1a', label: 'Crossroads', sub: '十字路口' },
      { x: 290, y: 90,  w: 70, h: 40, col: '#2a1a40', label: 'Projects', sub: '项目展示' },
      { x: 186, y: 152, w: 70, h: 36, col: '#1a2a2a', label: 'Information', sub: '个人信息' },
      { x:  80, y: 105, w: 70, h: 40, col: '#3a2a10', label: 'Playground', sub: '游乐场' },
    ];
    zones.forEach(z => {
      const rx = z.x - z.w/2, ry = z.y - z.h/2;
      ctx.fillStyle = z.col;
      ctx.beginPath();
      ctx.roundRect(rx, ry, z.w, z.h, 6);
      ctx.fill();
      ctx.strokeStyle = 'rgba(255,255,255,0.15)';
      ctx.lineWidth = 1;
      ctx.stroke();
      ctx.fillStyle = 'rgba(255,255,255,0.8)';
      ctx.font = 'bold 10px "Space Grotesk", sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText(z.label, z.x, z.y + 2);
      ctx.fillStyle = 'rgba(255,255,255,0.35)';
      ctx.font = '9px "Space Grotesk", sans-serif';
      ctx.fillText(z.sub, z.x, z.y + 13);
    });
    // roads
    ctx.strokeStyle = 'rgba(255,255,255,0.12)';
    ctx.lineWidth = 6;
    ctx.setLineDash([8, 6]);
    ctx.beginPath(); ctx.moveTo(186, 70); ctx.lineTo(186, 105); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(186, 141); ctx.lineTo(186, 152); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(226, 105); ctx.lineTo(255, 95); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(146, 105); ctx.lineTo(115, 110); ctx.stroke();
    ctx.setLineDash([]);
  });
}

function renderSteps(el) {
  el.innerHTML = `
<div class="sec-head">七步复刻路线图</div>
<div class="timeline">
  ${[
    ['搭框架','npm create vite + 装三个包','Three.js + Cannon-ES + GSAP','accent'],
    ['工具三件套','EventEmitter / Time / Sizes','这三个类支撑整个项目的底层','txt2'],
    ['Application 根类','按顺序初始化所有系统','Scene → Renderer → Camera → Composer → World','txt2'],
    ['Matcap 材质','写顶点+片元着色器','先用球体测试，颜色对了再接GLB','purple'],
    ['物理 + 小车','Cannon 世界 + RaycastVehicle','先让车能动，再调参数手感','orange'],
    ['后处理管线','横纵 Blur + Glows Pass','触屏设备记得关 Blur（省性能）','pink'],
    ['场景内容','每个区域一个 Section 类','先做 Intro，做完一个再做下一个','green'],
  ].map(([t,sub,tip,col],i)=>`
    <div class="tl-item">
      <div class="tl-left">
        <div class="tl-num done" style="background:rgba(79,143,255,.1);border-color:rgba(79,143,255,.25);color:var(--accent)">${String(i+1).padStart(2,'0')}</div>
        <div class="tl-line"></div>
      </div>
      <div class="tl-body">
        <h4>${t} <span style="font-family:var(--mono);font-size:10px;color:var(--txt3);font-weight:400">— ${sub}</span></h4>
        <p style="font-size:11.5px;background:rgba(255,255,255,.03);border-radius:5px;padding:6px 9px;margin-top:5px;border:1px solid var(--border)">${tip}</p>
      </div>
    </div>
  `).join('')}
</div>`;
}

Object.assign(window.RENDERERS, { physics: renderPhysics, scene: renderScene, steps: renderSteps });
