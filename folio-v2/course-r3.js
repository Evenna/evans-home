/* course-r3.js — prompts & gotchas renderers */

function makeCopyBtn(text) {
  const btn = document.createElement('button');
  btn.className = 'copy-btn';
  btn.textContent = '复制';
  btn.addEventListener('click', () => {
    navigator.clipboard.writeText(text).then(() => {
      btn.textContent = '已复制 ✓';
      btn.classList.add('copied');
      setTimeout(() => { btn.textContent = '复制'; btn.classList.remove('copied'); }, 2000);
    });
  });
  return btn;
}

function promptBlock(label, text) {
  const wrap = document.createElement('div');
  wrap.className = 'prompt-box';
  wrap.innerHTML = `
    <div class="prompt-label">${label}</div>
    <div class="prompt-text">${text}</div>`;
  wrap.appendChild(makeCopyBtn(text.replace(/<[^>]+>/g, '')));
  return wrap;
}

function renderPrompts(el) {
  el.innerHTML = `<div class="sec-head">每一步告诉 AI 什么</div>`;
  const prompts = [
    ['第1步 · 搭项目框架',
      '帮我用 Vite 新建一个 Vanilla JS 项目，然后安装 three、cannon-es、gsap、howler 这四个包，再安装 vite-plugin-glsl 并在 vite.config.js 里配置好，让我可以直接 import .glsl 文件。'],
    ['第2步 · 工具类',
      '帮我写三个工具类：\n1. EventEmitter：支持命名空间的自定义事件系统（on/off/trigger）\n2. Time：用 requestAnimationFrame 的游戏循环，每帧触发 tick 事件，提供 delta 和 elapsed\n3. Sizes：监听窗口 resize，触发 resize 事件，提供 width/height/pixelRatio'],
    ['第3步 · Matcap 着色器',
      '帮我写一个 Three.js 的自定义 ShaderMaterial，实现 Matcap 光照效果。要求：\n1. 顶点着色器传递 vViewPosition 和 vWorldPosition 到片元\n2. 片元着色器根据法线从 matcap 纹理球上采样颜色\n3. 加一个 uRevealProgress（0→1）uniform，当某个片元的 worldPosition.z 低于一个阈值时 discard，阈值由 uRevealProgress 控制，实现物体从地面升起的效果'],
    ['第4步 · 物理车辆',
      '帮我用 cannon-es 创建一个 RaycastVehicle 车辆，注意：这个项目用 Z 轴朝上（不是 Y 轴）。设置：重力 (0,0,-13)，车身质量 40，四个轮子，悬挂刚度 50，摩擦系数 10。每帧调用 world.step(1/60)，然后把 chassisBody.position 和 quaternion 同步到 Three.js 的 mesh 上。'],
    ['第5步 · 后处理',
      '帮我给 Three.js 场景添加后处理效果，用 EffectComposer：\n1. RenderPass 渲染3D场景\n2. 自定义横向高斯模糊 ShaderPass（用 blur9 算法），屏幕上下边缘模糊更强\n3. 自定义纵向模糊 ShaderPass\n4. 自定义光晕叠加 Pass：在画面上叠加一个圆形渐变，颜色 #ffcfe0，位置偏上方 (0, 0.25)，半径 0.7\n如果是触屏设备，跳过模糊 Pass。'],
    ['第6步 · 开场动画',
      '帮我用 GSAP 串联开场动画，用户点击进入后：\n1. 同时触发：matcap 材质的 uRevealProgress 从0到1，持续3秒\n2. 同时：所有假阴影的 alpha 从0到0.5，持续3秒，delay 0.5秒\n3. 同时：物理车辆的 Z 位置设为 12（高空），300ms 后调用 wakeUp() 让车子因重力下落\n4. 同时：音效引擎声音音量从0到0.7，持续3秒'],
  ];
  prompts.forEach(([label, text]) => {
    el.appendChild(promptBlock(label, text));
  });
  const note = document.createElement('div');
  note.className = 'info-card good';
  note.style.marginTop = '4px';
  note.innerHTML = `<h5>用哪个 AI 最好？</h5>
    <p>推荐 Claude Sonnet 4 或 GPT-4o。把提示词直接粘贴进去，如果代码有报错，再把报错信息一起粘贴回去说「修复这个错误」。</p>`;
  el.appendChild(note);
}

function renderGotchas(el) {
  el.innerHTML = `
<div class="sec-head">高频踩坑</div>
<div style="display:flex;flex-direction:column;gap:10px;margin-bottom:18px">
  ${[
    ['🧭 坐标系方向（大坑）','warn',
      'Z 轴是"上"，不是 Y 轴。每次让 AI 写物理代码都要加一句："注意这个项目用 Z 轴朝上"。否则车会飞到天上。'],
    ['📦 cannon 还是 cannon-es？','warn',
      '原版 <code>cannon</code> 已不更新，用 <code>cannon-es</code>。包名不同，安装命令是 <code>npm install cannon-es</code>，不是 <code>cannon</code>。'],
    ['📱 手机没有键盘','warn',
      '手机用户没有 WASD，需要做虚拟摇杆（nipple.js 或自己写）。复刻时别忘了这块，否则手机用户完全没法操作。'],
    ['🖥️ EffectComposer 需要跟着 resize','warn',
      '浏览器窗口改变大小时，EffectComposer 也要调用 <code>.setSize()</code>，不然画面糊掉或错位。记得在 resize 事件里加上这一行。'],
    ['✅ 不要开 Shadow Map','good',
      '整个项目故意不用 Shadow Map，全用假阴影（每个物体下放一个透明面）。别尝试开 shadow，会破坏性能和整体风格。'],
    ['✅ GLB 模型是异步加载的','good',
      '模型还没加载完就操作 mesh 会报错。要等 loader.on("ready") 事件触发后再执行场景初始化。如果场景空白，99% 是这个原因。'],
  ].map(([t,type,d])=>`
    <div class="info-card ${type}">
      <h5>${t}</h5>
      <p>${d}</p>
    </div>
  `).join('')}
</div>
<div class="sec-head">遇到报错怎么办</div>
<div class="prompt-box">
  <div class="prompt-label">报错处理万能提示词</div>
  <div class="prompt-text">我在做一个 Three.js + cannon-es 的3D驾驶项目（Z轴朝上），运行时报错如下：\n\n[把完整报错信息粘贴在这里]\n\n相关代码：\n[把出错的代码粘贴在这里]\n\n帮我分析原因并修复。</div>
</div>
<div class="info-card tip">
  <h5>彩蛋</h5>
  <p>在 URL 后面加 <code>#debug</code> 开启调试面板，可以实时调整所有参数。加 <code>#cybertruck</code> 小车变成赛博卡车 🚐</p>
</div>`;
}

Object.assign(window.RENDERERS, { prompts: renderPrompts, gotchas: renderGotchas });
