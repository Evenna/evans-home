/* ─── slides.js  (slides 0–5) ─── */
const SLIDES = [];
function h(tag, cls, html) {
  const el = document.createElement(tag);
  if (cls) el.className = cls;
  if (html) el.innerHTML = html;
  return el;
}
function s(id, renderFn) { SLIDES.push({ id, render: renderFn }); }

/* ══════════════════════════════════════════
   0 · 封面
══════════════════════════════════════════ */
s('cover', el => {
  el.id = 'slide-0';
  el.innerHTML = `
  <div class="inner">
    <div class="tag accent anim">🎮 Vibe Coding 课件 · Bruno Simon folio-2019 深度解析</div>
    <h1 class="hero anim">
      你有一个<em>想法</em>——<br>
      开一辆小车<br>逛自己的作品集
    </h1>
    <p class="sub anim">零基础小白也能看懂的 3D 网站复刻指南。从一个炫酷念头出发，一步一步拆解这个网站到底是怎么做出来的。</p>
    <div class="grid grid-3 anim" style="max-width:520px">
      <div class="card" style="padding:14px 16px">
        <div style="font-size:22px;margin-bottom:6px">🚗</div>
        <div style="font-size:13px;font-weight:600">3D 驾驶</div>
        <div style="font-size:12px;color:var(--txt3)">真实物理引擎</div>
      </div>
      <div class="card" style="padding:14px 16px">
        <div style="font-size:22px;margin-bottom:6px">✨</div>
        <div style="font-size:13px;font-weight:600">Matcap 美学</div>
        <div style="font-size:12px;color:var(--txt3)">零光源方案</div>
      </div>
      <div class="card" style="padding:14px 16px">
        <div style="font-size:22px;margin-bottom:6px">🗺️</div>
        <div style="font-size:13px;font-weight:600">五大区域</div>
        <div style="font-size:12px;color:var(--txt3)">街区式导航</div>
      </div>
    </div>
  </div>
  <div class="scroll-hint anim">
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <path d="M8 3v10M4 9l4 4 4-4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>
    按 ↓ 继续
  </div>`;
});

/* ══════════════════════════════════════════
   1 · 这是什么？为什么这么酷？
══════════════════════════════════════════ */
s('what', el => {
  el.innerHTML = `
  <div class="inner wide">
    <div class="tag accent anim">第一章 · 这是什么</div>
    <h2 class="section-title anim">一个<em>可以开车逛</em>的个人网站</h2>
    <div class="two-col anim" style="gap:32px">
      <div>
        <p class="sub" style="margin-bottom:20px">Bruno Simon 是一位法国创意前端开发者。他把自己的项目、经历、联系方式，全部做成了 3D 世界里的「街区建筑」。访客通过键盘 WASD 操控一辆小车，开着车去各个区域探索。</p>
        <div class="callout" style="margin-bottom:14px">
          <strong style="color:var(--txt)">为什么它这么出名？</strong><br>
          2019 年发布时，这是互联网上第一个「真正可以开车的个人主页」，直接让 Bruno 收到了 Apple、Oculus、Ubisoft 等公司的 offer，还引发了全球前端开发者的模仿热潮。
        </div>
        <div class="callout orange">
          <strong style="color:var(--txt)">技术上有多难？</strong><br>
          听起来很魔法，但拆开来看，每一块都有成熟的工具可以用。难的不是某一个技术，而是把它们「拼在一起」的经验。
        </div>
      </div>
      <div>
        <div style="background:var(--card);border:1px solid var(--border);border-radius:var(--r);padding:24px;height:100%">
          <div style="font-family:var(--mono);font-size:11px;color:var(--txt3);margin-bottom:16px;text-transform:uppercase;letter-spacing:.08em">这个网站能做什么</div>
          <div class="steps" style="gap:8px">
            ${[
              ['🚗','开车游览','用键盘 WASD 控制小车，在3D世界里驾驶'],
              ['💥','真实物理','车子会漂移、弹跳，碰墙有声音，悬挂会晃'],
              ['🗺️','五大街区','项目展示区、个人简介区、游乐场……像街道一样'],
              ['📦','点击交互','开车靠近项目牌子，会弹出项目详情'],
              ['🎵','空间音效','引擎声、碰撞声跟物理同步'],
              ['✨','暖色光晕','全屏的后处理效果，整体氛围非常温柔']
            ].map(([icon, title, desc]) => `
              <div style="display:flex;gap:12px;align-items:flex-start">
                <span style="font-size:18px;flex-shrink:0">${icon}</span>
                <div>
                  <div style="font-size:13px;font-weight:600;margin-bottom:2px">${title}</div>
                  <div style="font-size:12px;color:var(--txt2)">${desc}</div>
                </div>
              </div>
            `).join('')}
          </div>
        </div>
      </div>
    </div>
  </div>`;
});

/* ══════════════════════════════════════════
   2 · 技术栈总览
══════════════════════════════════════════ */
s('stack', el => {
  el.innerHTML = `
  <div class="inner wide">
    <div class="tag green anim">第二章 · 技术栈</div>
    <h2 class="section-title anim">七个工具，<em>各司其职</em></h2>
    <p class="sub anim" style="margin-bottom:24px">每个工具解决一个具体问题，不用全部精通，先知道「它是做什么的」就够了。</p>
    <div class="grid grid-3 anim" style="gap:12px">
      ${[
        ['Three.js','3D 渲染引擎','就像 Photoshop 的画布，但画的是3D世界。它帮你在浏览器里渲染几何体、灯光、材质。','accent','🎨'],
        ['Cannon.js','物理引擎','模拟真实世界的重力、碰撞、摩擦。没有它，车子不会弹跳，只会穿墙而过。','orange','⚙️'],
        ['GSAP','动画库','控制开场动画：物体从地面升起、相机缓缓移动……用时间轴精确控制每个动作。','green','🎬'],
        ['Howler.js','空间音效','发动机声音随车速变化，碰撞声在撞击瞬间触发。','purple','🔊'],
        ['Vite','开发工具','打包工具，让你写的代码能在浏览器里跑起来，支持热更新。','accent','⚡'],
        ['vite-plugin-glsl','着色器工具','让你可以把 GLSL 着色器写在单独的 .glsl 文件里，像写 CSS 一样管理。','pink','✏️'],
      ].map(([name, role, desc, color, icon]) => `
        <div class="card">
          <div style="font-size:24px;margin-bottom:10px">${icon}</div>
          <div class="tag ${color}" style="margin-bottom:8px;font-size:10px">${name}</div>
          <h3 style="font-size:14px;margin-bottom:6px">${role}</h3>
          <p style="font-size:12px">${desc}</p>
        </div>
      `).join('')}
    </div>
    <div class="callout green anim" style="margin-top:16px">
      <strong style="color:var(--txt)">Vibe Coding 视角：</strong>
      你不需要记住 API。你需要的是：告诉 AI「我想做什么」，让 AI 帮你写代码，你来判断「对不对、好不好看」。理解工具的用途，是和 AI 对话的前提。
    </div>
  </div>`;
});

/* ══════════════════════════════════════════
   3 · Matcap — 整个视觉的灵魂
══════════════════════════════════════════ */
s('matcap', el => {
  el.innerHTML = `
  <div class="inner wide">
    <div class="tag purple anim">第三章 · 核心视觉</div>
    <h2 class="section-title anim"><em>Matcap</em> 是什么——<br>为什么整个网站没有一盏灯</h2>
    <div class="two-col wide-left anim">
      <div>
        <p class="sub" style="margin-bottom:20px">传统3D场景需要设置灯光：太阳光、环境光、点光源……很麻烦，而且性能差。Bruno Simon 用了一种叫 <strong style="color:var(--txt)">Matcap</strong>（Material Capture）的技术，用一张「球形纹理图」直接烘焙好了光照信息。</p>
        <div class="callout" style="margin-bottom:14px">
          <strong style="color:var(--txt)">大白话解释 Matcap：</strong><br>
          想象你拍了一张高质量的「金属球」照片。之后所有物体的光照，都直接「偷」这张球的颜色——根据表面朝向，从球上取色，贴到物体上。没有真实光源，但看起来有光。
        </div>
        <div style="background:var(--card);border:1px solid var(--border);border-radius:var(--r);padding:20px;margin-bottom:14px">
          <div style="font-size:12px;color:var(--txt3);font-family:var(--mono);margin-bottom:10px;text-transform:uppercase;letter-spacing:.06em">GLSL 核心代码（着色器）</div>
          <div class="code" style="font-size:12px;line-height:1.9"><span class="c">// 根据视角方向，从 matcap 纹理球上取颜色</span>
<span class="k">vec3</span> viewDir = <span class="n">normalize</span>(vViewPosition);
<span class="k">vec3</span> x = <span class="n">normalize</span>(<span class="k">vec3</span>(viewDir.z, <span class="o">0.0</span>, -viewDir.x));
<span class="k">vec3</span> y = <span class="n">cross</span>(viewDir, x);
<span class="c">// 映射成2D纹理坐标</span>
<span class="k">vec2</span> uv = <span class="k">vec2</span>(<span class="n">dot</span>(x, normal), <span class="n">dot</span>(y, normal)) * <span class="o">0.495</span> + <span class="o">0.5</span>;</div>
        </div>
        <div class="callout orange">
          <strong style="color:var(--txt)">开场 Reveal 效果：</strong>
          <code class="pill">uRevealProgress</code> 是一个0→1的数字，GSAP 在3秒内把它从0变到1，着色器里低于0的片元直接丢弃——物体就像从地下升上来一样。
        </div>
      </div>
      <div>
        <div style="background:var(--card);border:1px solid var(--border);border-radius:var(--r);padding:22px">
          <div style="font-size:12px;color:var(--txt3);font-family:var(--mono);text-transform:uppercase;letter-spacing:.06em;margin-bottom:16px">Matcap vs 传统灯光</div>
          <div style="display:flex;flex-direction:column;gap:10px">
            ${[
              ['传统灯光', '需要设太阳、环境光、阴影……N个参数', 'var(--orange)', '❌ 复杂'],
              ['Shadow Map', '实时渲染阴影，GPU消耗大', 'var(--orange)', '❌ 慢'],
              ['Matcap 着色', '一张纹理解决所有光照，极快', 'var(--green)', '✅ 简单快'],
              ['假阴影平面', '每个物体下放一个透明面模拟影子', 'var(--green)', '✅ 零成本'],
            ].map(([name, desc, color, status]) => `
              <div style="display:flex;gap:10px;align-items:flex-start;padding:12px;background:rgba(255,255,255,.03);border-radius:8px">
                <div style="font-size:14px;flex-shrink:0">${status.replace('✅','✅').replace('❌','❌')}</div>
                <div>
                  <div style="font-size:13px;font-weight:600;margin-bottom:3px;color:${color}">${name}</div>
                  <div style="font-size:12px;color:var(--txt2)">${desc}</div>
                </div>
              </div>
            `).join('')}
          </div>
          <div style="margin-top:18px;padding-top:16px;border-top:1px solid var(--border)">
            <div style="font-size:12px;color:var(--txt3);margin-bottom:8px">颜色系统</div>
            <div style="display:flex;gap:8px;flex-wrap:wrap">
              ${[['白色','#e0d8cc'],['橙色','#d04500'],['暖光晕','#ffcfe0'],['阴影','#8b4500']].map(([n,c])=>`
                <div style="display:flex;align-items:center;gap:6px;font-size:12px">
                  <span style="width:14px;height:14px;border-radius:4px;background:${c};display:inline-block;border:1px solid rgba(255,255,255,.1)"></span>
                  <span style="color:var(--txt2)">${n}</span>
                </div>
              `).join('')}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>`;
});

/* ══════════════════════════════════════════
   4 · 物理引擎
══════════════════════════════════════════ */
s('physics', el => {
  el.innerHTML = `
  <div class="inner wide">
    <div class="tag orange anim">第四章 · 物理引擎</div>
    <h2 class="section-title anim">让小车真的会<em>弹跳漂移</em>——<br>Cannon.js 怎么工作的</h2>
    <div class="two-col anim" style="gap:32px">
      <div>
        <p class="sub" style="margin-bottom:20px">物理引擎的核心是：有一个「看不见的物理世界」在后台运行，每帧计算好位置，再「同步」给 Three.js 的 3D 模型。</p>
        <div style="display:flex;flex-direction:column;gap:10px;margin-bottom:20px">
          ${[
            ['1', '物理世界', 'Cannon.js 建立一个不可见的模拟空间，里面有重力、碰撞体积'],
            ['2', 'Three.js 世界', '用来显示的 3D 模型，本身不参与物理计算'],
            ['3', '每帧同步', '物理算好位置后，把坐标复制给 Three.js 网格'],
          ].map(([num, title, desc]) => `
            <div style="display:flex;gap:12px;align-items:flex-start;padding:14px 16px;background:var(--card);border:1px solid var(--border);border-radius:var(--r2)">
              <span style="background:rgba(255,159,10,.15);color:var(--orange);font-family:var(--mono);font-size:12px;font-weight:600;padding:3px 9px;border-radius:4px;flex-shrink:0">${num}</span>
              <div>
                <div style="font-size:13px;font-weight:600;margin-bottom:3px">${title}</div>
                <div style="font-size:12px;color:var(--txt2)">${desc}</div>
              </div>
            </div>
          `).join('')}
        </div>
        <div class="callout orange" style="margin-bottom:14px">
          <strong style="color:var(--txt)">坐标系坑！</strong><br>
          这个项目用的是 <strong>Z 轴朝上</strong>（而不是通常的 Y 轴）。所以重力是 <code class="pill">gravity.set(0, 0, -13)</code>，不是 y 方向。AI 帮你写代码时，要特别提示它。
        </div>
      </div>
      <div>
        <div class="code anim" style="margin-bottom:14px"><span class="c">// 建立物理世界</span>
<span class="k">const</span> world = <span class="k">new</span> <span class="n">CANNON.World</span>();
world.gravity.<span class="n">set</span>(<span class="o">0</span>, <span class="o">0</span>, <span class="o">-13</span>); <span class="c">// Z轴向下</span>

<span class="c">// RaycastVehicle = 射线车辆模型</span>
<span class="c">// 四个轮子各发出一条射线检测地面</span>
<span class="k">const</span> vehicle = <span class="k">new</span> <span class="n">CANNON.RaycastVehicle</span>({
  chassisBody,       <span class="c">// 车身刚体</span>
  indexForwardAxis: <span class="o">1</span>,
  indexUpAxis: <span class="o">2</span>,    <span class="c">// 还是Z轴朝上</span>
});

<span class="c">// 每帧：物理算好→同步给Three.js</span>
world.<span class="n">step</span>(<span class="o">1</span>/<span class="o">60</span>);
carMesh.position.<span class="n">copy</span>(chassisBody.position);
carMesh.quaternion.<span class="n">copy</span>(chassisBody.quaternion);</div>
        <div style="background:var(--card);border:1px solid var(--border);border-radius:var(--r);padding:18px">
          <div style="font-size:12px;color:var(--txt3);font-family:var(--mono);text-transform:uppercase;letter-spacing:.06em;margin-bottom:12px">车辆关键参数</div>
          ${[
            ['车身质量', '40', '越重越难加速，越容易翻'],
            ['悬挂刚度', '50', '越硬越少晃，越软越弹跳'],
            ['摩擦系数', '10', '越大越不容易打滑'],
            ['阻尼系数', '1.8', '悬挂回弹速度'],
          ].map(([label, val, desc]) => `
            <div style="display:flex;justify-content:space-between;align-items:center;padding:8px 0;border-bottom:1px solid var(--border)">
              <span style="font-size:12px;color:var(--txt2)">${label}</span>
              <div style="text-align:right">
                <span style="font-family:var(--mono);font-size:14px;font-weight:600;color:var(--orange)">${val}</span>
                <div style="font-size:11px;color:var(--txt3)">${desc}</div>
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    </div>
  </div>`;
});

/* ══════════════════════════════════════════
   5 · 后处理管线
══════════════════════════════════════════ */
s('postprocess', el => {
  el.innerHTML = `
  <div class="inner">
    <div class="tag pink anim">第五章 · 后处理</div>
    <h2 class="section-title anim">像 Instagram 滤镜一样的<em>后处理效果</em></h2>
    <p class="sub anim">渲染完3D场景后，Three.js 会再对整张画面做处理，就像拍完照片再加滤镜一样。</p>
    <div class="anim" style="margin-bottom:20px">
      <div style="display:flex;align-items:center;gap:0;overflow-x:auto;padding:4px 0">
        ${[
          ['RenderPass','渲染3D场景','var(--txt3)','#16181c'],
          ['→','','var(--txt3)','transparent'],
          ['横向 Blur','水平方向模糊','var(--accent)','rgba(79,143,255,.08)'],
          ['→','','var(--txt3)','transparent'],
          ['纵向 Blur','垂直方向模糊','var(--accent)','rgba(79,143,255,.08)'],
          ['→','','var(--txt3)','transparent'],
          ['Glows Pass','暖色光晕叠加','var(--pink)','rgba(255,107,157,.08)'],
        ].map(([name, sub, color, bg]) => name === '→' ? `
          <div style="color:var(--txt3);font-size:18px;padding:0 8px;flex-shrink:0">→</div>
        ` : `
          <div style="flex-shrink:0;background:${bg};border:1px solid rgba(255,255,255,.08);border-radius:8px;padding:10px 14px;text-align:center;min-width:100px">
            <div style="font-size:13px;font-weight:600;color:${color};margin-bottom:3px">${name}</div>
            <div style="font-size:11px;color:var(--txt3)">${sub}</div>
          </div>
        `).join('')}
      </div>
    </div>
    <div class="grid grid-2 anim" style="gap:14px">
      <div style="background:var(--card);border:1px solid var(--border);border-radius:var(--r);padding:20px">
        <div class="tag accent" style="margin-bottom:12px">模糊 Pass</div>
        <p style="font-size:13px;color:var(--txt2);line-height:1.7;margin-bottom:12px">用高斯模糊（9-tap 卷积核）实现。特别的地方：屏幕上下边缘模糊强，中间弱，像老式电影的景深感。</p>
        <div class="code" style="font-size:12px"><span class="c">// 边缘模糊更强</span>
<span class="k">float</span> blur = <span class="o">1.0</span> - <span class="n">sin</span>(vUv.y * PI);
<span class="c">// 触屏设备关闭（省性能）</span>
<span class="k">if</span> (isTouchScreen) skip;</div>
      </div>
      <div style="background:var(--card);border:1px solid var(--border);border-radius:var(--r);padding:20px">
        <div class="tag pink" style="margin-bottom:12px">光晕 Pass</div>
        <p style="font-size:13px;color:var(--txt2);line-height:1.7;margin-bottom:12px">在最终画面叠加一个圆形粉橙色渐变，让整体画面有温柔的光晕感，就像站在暖色灯下。</p>
        <div class="code" style="font-size:12px"><span class="c">// 距中心越近越亮</span>
<span class="k">float</span> d = <span class="n">distance</span>(vUv, uPosition);
<span class="k">float</span> glow = (<span class="o">1.0</span> - d/uRadius) * uAlpha;
<span class="c">// 颜色：#ffcfe0 粉橙色</span>
<span class="c">// 位置：偏上方 (0, 0.25)</span></div>
      </div>
    </div>
    <div class="callout anim" style="margin-top:16px">
      <strong style="color:var(--txt)">Vibe Coding 提示词模板：</strong>
      「用 Three.js EffectComposer，依次叠加：RenderPass → 分离式高斯模糊（横向+纵向）→ 自定义光晕叠加，光晕颜色 #ffcfe0，偏上方，半径0.7」
    </div>
  </div>`;
});
