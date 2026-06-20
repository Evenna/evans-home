/* r3.js — chapters: start, ai, traps */

function cpBtn(id,txt){
  return `<button class="copy-btn" onclick="(function(btn){
    navigator.clipboard.writeText(document.getElementById('${id}').innerText).then(()=>{
      btn.textContent='已复制 ✓';btn.classList.add('ok');
      setTimeout(()=>{btn.textContent='复制';btn.classList.remove('ok')},2000);
    });
  })(this)">复制</button>
  <pre class="prompt-body" id="${id}">${txt}</pre>`;
}

function renderStart(el){
  el.innerHTML=`
<div class="box gold"><h5>重要：不要一口气做整个项目</h5>
<p>把它拆成7个里程碑，每做完一步，在浏览器里看效果——有成就感了，再继续。每一步都是独立可运行的。</p></div>
<div class="sec">七个里程碑</div>
<div class="steps">
  ${[
    ['#30d158','环境搭好，Hello World',
     '能在浏览器看到一个白色的方块在旋转。听起来没什么，但这意味着你的整个开发环境通了。',
     '预计时间：30分钟（全靠AI，不用自己敲代码）'],
    ['#4f8fff','一个地面 + 一辆方块车',
     '加一个平面当地面，加一个简单的长方体当车。能用键盘W键让它往前走。',
     '这一步验证：键盘控制 + 基本3D场景'],
    ['#ff9f0a','物理引擎接进来',
     '让车有重量、会弹跳，地面会阻止车穿过去。对着墙撞一下，车应该弹回来。',
     '这一步验证：物理世界和视觉世界正确同步'],
    ['#bf5af2','换成真实模型',
     '把方块车换成真正的3D模型。加上 Matcap 材质，立刻好看很多。',
     '需要一个 .glb 格式的3D文件，可以从 Sketchfab 下免费的'],
    ['#c8a96e','做场景地图',
     '在地图上摆放五个区域，加上道路。每个区域放一些文字说明。',
     '这一步花时间最多，但全是「摆东西」，不需要复杂代码'],
    ['#ff6b9d','加互动效果',
     '车靠近某个区域时，弹出信息卡片。靠近后自动触发，离开后自动消失。',
     '用「距离检测」实现：每帧算车和每个区域的距离，近了就显示'],
    ['#4f8fff','加音效和开场动画',
     '引擎声随速度变化、撞墙有碰撞声、开场时物体从地下升起来。',
     '最后做这步，因为要调整的东西很多，先把主体做完再润色'],
  ].map(([col,t,d,note],i)=>`
    <div class="step">
      <div class="step-l">
        <div class="step-n" style="background:${col}15;border:1px solid ${col}40;color:${col};font-weight:700">${i+1}</div>
        <div class="step-line"></div>
      </div>
      <div class="step-body"><h4>${t}</h4><p>${d}</p><div class="note">${note}</div></div>
    </div>`).join('')}
</div>
<div class="checklist">
  <div class="ci">
    <div class="ci-icon">💻</div>
    <div><h4>需要提前准备：一台能联网的电脑</h4>
    <p>Windows / Mac 都行。需要提前安装 <a href="https://nodejs.org" target="_blank">Node.js</a>（去官网下载安装，傻瓜式安装，下一步下一步就行）</p></div>
  </div>
  <div class="ci">
    <div class="ci-icon">🤖</div>
    <div><h4>需要提前准备：一个 AI 对话工具</h4>
    <p>Claude（claude.ai）或 ChatGPT（chatgpt.com）都行。建议用 Claude，写前端代码更准。</p></div>
  </div>
  <div class="ci">
    <div class="ci-icon">📁</div>
    <div><h4>需要提前准备：VSCode 编辑器</h4>
    <p><a href="https://code.visualstudio.com" target="_blank">code.visualstudio.com</a> 下载安装。AI 把代码给你之后，你用它来粘贴代码、创建文件。</p></div>
  </div>
</div>`;
}

function renderAI(el){
  el.innerHTML=`
<div class="box blue"><h5>Vibe Coding 的正确姿势</h5>
<p>不要让 AI「帮我做整个项目」。要<em>一步一步地说</em>——做完一步，看效果，有问题告诉 AI 哪里不对，再做下一步。下面每个提示词，直接复制粘贴给 AI 就能用。</p></div>
<div class="sec">第 1 步：搭环境</div>
<div class="prompt"><div class="prompt-lbl">直接复制给 AI</div>${cpBtn('p1',`帮我用 Vite 搭一个 Three.js 项目。
要求：
- 在命令行创建项目文件夹，用 Vite 初始化
- 安装 three 这个包
- 在 main.js 里创建一个场景：黑色背景，一个白色立方体在中间缓慢旋转
- 摄像机放在斜上方，能看到整个立方体
帮我把完整的命令和代码都写出来，我只需要复制粘贴执行。`)}</div>
<div class="sec">第 2 步：加一辆会开的车</div>
<div class="prompt"><div class="prompt-lbl">直接复制给 AI</div>${cpBtn('p2',`在上面的 Three.js 项目基础上，加一辆可以用键盘控制的车。
要求：
- 车用一个扁平的长方体表示，4个轮子用4个小圆柱
- 按 W/S 前后移动，按 A/D 左右转向
- 加一个灰色的地面平面
- 相机跟随车移动，始终在车的斜后上方
我现在的 main.js 代码是：[把你当前的代码粘贴在这里]`)}</div>
<div class="sec">第 3 步：加物理引擎</div>
<div class="prompt"><div class="prompt-lbl">直接复制给 AI</div>${cpBtn('p3',`帮我给这个 Three.js 项目加上 Cannon.js 物理引擎。
要求：
- 安装 cannon-es 包
- 给车加上质量和物理刚体，让它受重力影响
- 地面也要有对应的物理碰撞体
- 每帧要把物理位置同步给 Three.js 的3D模型
- 在墙边加几个小方块，让车可以撞飞它们
我现在的代码是：[粘贴你的代码]`)}</div>
<div class="sec">第 4 步：换成好看的 Matcap 材质</div>
<div class="prompt"><div class="prompt-lbl">直接复制给 AI</div>${cpBtn('p4',`帮我把项目里所有模型的材质换成 MeshMatcapMaterial（Matcap材质）。
要求：
- 从 Three.js 内置的 matcap 贴图里选一个金属感强的
- 或者帮我写代码，用 TextureLoader 加载一张我自己提供的 matcap 图片
- 不需要在场景里添加任何灯光
- 整体颜色风格参考：米色/暖白色为主
我现在的代码是：[粘贴你的代码]`)}</div>
<div class="sec">第 5 步：加「靠近触发弹窗」交互</div>
<div class="prompt"><div class="prompt-lbl">直接复制给 AI</div>${cpBtn('p5',`帮我实现：车开到某个指定位置附近时，自动显示一个信息卡片，离开后消失。
要求：
- 在场景里定义3个「触发区」，每个有一个中心坐标和触发半径
- 每帧检测车的位置到每个触发区中心的距离
- 距离 < 触发半径时，在屏幕右下角显示一个半透明的浮层卡片
- 卡片内容包括：标题、一段文字描述、一个链接
- 进入和离开时有渐变动画（opacity过渡）
我现在的代码是：[粘贴你的代码]`)}</div>
<div class="sec">第 6 步：加引擎音效</div>
<div class="prompt"><div class="prompt-lbl">直接复制给 AI</div>${cpBtn('p6',`帮我用 Howler.js 给车加上音效。
要求：
- 安装 howler 包
- 引擎声：循环播放，音量和播放速度根据车的当前速度实时调整（速度越快声音越响越急）
- 撞击声：车撞到物体时（速度突然大幅降低时）触发一次，不循环
- 不需要真实音效文件——帮我用 Web Audio API 动态生成这两种声音
我现在的代码是：[粘贴你的代码]`)}</div>`;
}

function renderTraps(el){
  el.innerHTML=`
<div class="box orange"><h5>卡住了，不是你的错</h5>
<p>下面这些问题，<em>每个做这个项目的人都会遇到</em>。提前知道怎么处理，能省掉好几小时。</p></div>
<div class="sec">最常见的5个卡点</div>
<div class="steps">
  ${[
    ['var(--orange)','白屏，什么都看不到',
     '99%的情况是：摄像机没对准物体，或者物体太小（默认scale很小）。',
     `告诉 AI："我的场景出现了白屏，什么都看不到。帮我检查：摄像机位置是否合理（设成 position.set(5,5,5) lookAt(0,0,0)），物体是否在原点（position是不是默认值），场景里有没有ambient light（加一个 AmbientLight(0xffffff,1)试试）。"`],
    ['var(--accent)','物理和视觉不同步，车「分裂」了',
     '物理刚体和Three.js模型的初始位置、旋转轴不一样导致的。',
     `告诉 AI："Three.js 的模型和 Cannon.js 的刚体出现了位移偏差，模型和物理体没有同步。帮我检查同步代码，确认每帧都用 mesh.position.copy(body.position) 和 mesh.quaternion.copy(body.quaternion) 来同步。"`],
    ['var(--green)','加载3D模型一直转圈，加载不出来',
     '浏览器安全限制：本地开发时不能直接读取本地文件，要通过开发服务器。',
     `告诉 AI："我用 GLTFLoader 加载本地的 .glb 文件，控制台报错 CORS 或者一直不触发 onLoad 回调。我现在是直接双击打开 HTML 文件，帮我说明怎么用 Vite 的开发服务器来解决这个问题。"`],
    ['var(--purple)','帧率很低、很卡',
     '场景里物体太多，或者没开 shadow map 优化，或者每帧重新创建了 geometry。',
     `告诉 AI："我的 Three.js 场景帧率只有20-30fps，很卡。帮我检查：1. 是否有 geometry 或 material 在 animate 循环里被重复创建 2. renderer.shadowMap 是否用了 PCFSoftShadowMap（改成 BasicShadowMap 更快） 3. 场景里总面数是多少，是否需要降低模型精度。"`],
    ['var(--gold)','AI 每次给的代码都和上次不一样，越改越乱',
     '没有把完整的当前代码给 AI，它在凭空猜你的代码结构。',
     `每次问 AI 之前，必须把你「现在完整的代码」粘贴进去，然后说「在这个基础上，帮我添加/修改……」。不要只描述想要什么，要给 AI 看你现在有什么。`],
  ].map(([col,t,d,fix],i)=>`
    <div class="step">
      <div class="step-l">
        <div class="step-n" style="background:${col.replace('var(--','').replace(')','')=='orange'?'rgba(255,159,10,.1)':col.replace('var(--','').replace(')','')=='accent'?'rgba(79,143,255,.1)':col.replace('var(--','').replace(')','')=='green'?'rgba(48,209,88,.1)':col.replace('var(--','').replace(')','')=='purple'?'rgba(191,90,242,.1)':'rgba(200,169,110,.1)'};border:1px solid ${col}44;color:${col}">${i+1}</div>
        <div class="step-line"></div>
      </div>
      <div class="step-body">
        <h4>${t}</h4><p>${d}</p>
        <div class="prompt" style="margin-top:8px">
          <div class="prompt-lbl">遇到这个问题，这样告诉 AI</div>
          <div class="prompt-body" style="font-size:12px;color:var(--txt2)">${fix}</div>
        </div>
      </div>
    </div>`).join('')}
</div>
<div class="vs">
  <div class="vs-col bad">
    <div class="vs-lbl">❌ 不要这样问 AI</div>
    ${['「帮我做一个3D赛车网站」',
       '「代码报错了怎么办」',
       '「为什么不好看，帮我改好看一点」',
       '「做完整个项目」'].map(s=>`<div class="vs-item"><span style="color:#ff7b7b;font-size:11px">✕</span>${s}</div>`).join('')}
  </div>
  <div class="vs-col good">
    <div class="vs-lbl">✓ 要这样问 AI</div>
    ${['「在现有代码基础上，加一个地面」',
       '「控制台报错是：XXX，现有代码是：[代码]，怎么修？」',
       '「帮我把这两个颜色改成暖白色调」',
       '「先帮我做第一步：XXX」'].map(s=>`<div class="vs-item"><span style="color:var(--green);font-size:11px">✓</span>${s}</div>`).join('')}
  </div>
</div>`;
}

Object.assign(window.R,{start:renderStart,ai:renderAI,traps:renderTraps});
