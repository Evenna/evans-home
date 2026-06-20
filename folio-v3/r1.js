/* r1.js — chapters: play, what, tools */

function renderPlay(el){
  el.innerHTML=`
<div class="sec">先感受一下</div>
<div class="hgrid">
  ${[['🚗','W A S D 开车','左边网站里，按键盘的 W A S D 键，或者方向键，就能开车。试试漂移！'],
     ['💥','撞墙','开车撞上路边的东西——听听声音，看看车怎么弹起来'],
     ['🗺️','逛五个区域','往各个方向开，会发现不同的街区，每个区域内容不一样'],
     ['📦','靠近牌子','开车靠近有文字的牌子，会有东西弹出来']
  ].map(([i,t,d])=>`<div class="hcard"><div class="icon">${i}</div><h4>${t}</h4><p>${d}</p></div>`).join('')}
</div>
<div class="sec">玩完之后想一想</div>
<div class="box gold">
  <h5>这整个网站，其实就是一份简历</h5>
  <p>它包含的内容和普通简历一模一样：<em>项目作品、个人介绍、联系方式</em>。只是把这些内容放进了一个可以开车游览的3D世界里。<br><br>这就是 Vibe Coding 的精髓——<em>同样的内容，换一种别人想不到的呈现方式。</em></p>
</div>
<div class="box blue">
  <h5>这门课要教你什么</h5>
  <p>不是教你写代码。是教你<em>怎么跟 AI 对话</em>，让 AI 帮你把这个网站从零做出来。你需要理解「它是怎么运作的」，才能准确地告诉 AI 你想要什么。</p>
</div>`;
}

function renderWhat(el){
  el.innerHTML=`
<div class="sec">拆开来看，就三件事</div>
<div class="steps">
  ${[
    ['var(--accent)','一个3D画布','就像 Photoshop 的画布，只不过是立体的。所有你看到的东西——小车、建筑、地面——都画在这个画布上。','工具叫 Three.js，专门在浏览器里画3D'],
    ['var(--orange)','一套物理引擎','有一个「看不见的平行世界」在后台偷偷运算重力和碰撞。算完了，把结果告诉3D画布——车应该在哪里。','工具叫 Cannon.js，负责模拟物理'],
    ['var(--green)','一堆动画控制','开场时物体从地下升起来、相机慢慢跟随车子移动——这些都是动画代码在控制。','工具叫 GSAP，像视频剪辑软件的时间轴'],
  ].map(([col,t,d,note],i)=>`
    <div class="step">
      <div class="step-l">
        <div class="step-n" style="background:rgba(255,255,255,.05);border:1px solid var(--border2);color:${col}">${i+1}</div>
        <div class="step-line"></div>
      </div>
      <div class="step-body"><h4>${t}</h4><p>${d}</p><div class="note">${note}</div></div>
    </div>`).join('')}
</div>
<div class="sec">它们怎么配合</div>
<div class="analogy">
  <div class="analogy-icon">🎬</div>
  <p style="font-size:13.5px;color:var(--txt2);line-height:1.7">想象一部电影的拍摄现场：<br>
  <strong style="color:var(--txt)">Three.js</strong> 是摄影师，负责把场景拍下来显示在屏幕上。<br>
  <strong style="color:var(--txt)">Cannon.js</strong> 是物理顾问，告诉演员怎么真实地跌倒、弹跳。<br>
  <strong style="color:var(--txt)">GSAP</strong> 是导演，控制每个镜头什么时候出现、持续多久。</p>
</div>
<canvas id="flow-cv" width="386" height="110" style="border-radius:10px;border:1px solid var(--border);display:block;margin-bottom:4px"></canvas>
<div style="font-size:10px;color:var(--txt3);font-family:var(--mono);margin-bottom:14px;padding:6px 12px">↑ 三个系统每秒交互60次，你看到的流畅画面就是这样来的</div>`;
  requestAnimationFrame(()=>{
    const cv=document.getElementById('flow-cv');if(!cv)return;
    const ctx=cv.getContext('2d'),W=cv.width,H=cv.height;
    ctx.fillStyle='#0d1015';ctx.fillRect(0,0,W,H);
    const nodes=[
      {x:60,y:55,label:'Cannon.js',sub:'计算物理',col:'#ff9f0a'},
      {x:193,y:55,label:'Three.js',sub:'渲染画面',col:'#4f8fff'},
      {x:326,y:55,label:'浏览器屏幕',sub:'你看到的',col:'#30d158'},
    ];
    // arrows
    [[0,1],[1,2]].forEach(([a,b])=>{
      const A=nodes[a],B=nodes[b];
      ctx.strokeStyle='rgba(255,255,255,0.12)';ctx.lineWidth=1.5;
      ctx.setLineDash([5,4]);
      ctx.beginPath();ctx.moveTo(A.x+46,A.y);ctx.lineTo(B.x-46,B.y);ctx.stroke();
      ctx.setLineDash([]);
      // arrowhead
      ctx.fillStyle='rgba(255,255,255,0.2)';
      ctx.beginPath();ctx.moveTo(B.x-46,B.y);ctx.lineTo(B.x-53,B.y-4);ctx.lineTo(B.x-53,B.y+4);ctx.fill();
    });
    nodes.forEach(n=>{
      ctx.fillStyle=n.col+'22';
      ctx.strokeStyle=n.col+'66';ctx.lineWidth=1;
      ctx.beginPath();ctx.roundRect(n.x-46,n.y-26,92,52,8);ctx.fill();ctx.stroke();
      ctx.fillStyle=n.col;ctx.font='bold 12px "Space Grotesk",sans-serif';ctx.textAlign='center';
      ctx.fillText(n.label,n.x,n.y-4);
      ctx.fillStyle='rgba(255,255,255,0.4)';ctx.font='10px "Space Grotesk",sans-serif';
      ctx.fillText(n.sub,n.x,n.y+12);
    });
    // label on arrow
    ctx.fillStyle='rgba(255,255,255,0.25)';ctx.font='10px "JetBrains Mono",monospace';
    ctx.textAlign='center';
    ctx.fillText('每帧同步位置',127,42);
    ctx.fillText('每帧绘制',260,42);
  });
}

function renderTools(el){
  el.innerHTML=`
<div class="sec">把工具想成厨具</div>
<div class="box gold">
  <h5>你不需要知道锅是怎么造的</h5>
  <p>只需要知道：这口锅炒什么菜。代码工具也一样——你只需要知道「它负责什么」，然后告诉 AI「帮我用它做这件事」。</p>
</div>
<div class="steps">
  ${[
    ['#4f8fff','Three.js','→ 3D 画布',
     '就像 Photoshop 的画布，但是立体的。在浏览器里画出所有3D物体——小车、地面、建筑。',
     '类比：舞台布景师，负责把所有东西摆出来让你看见'],
    ['#ff9f0a','Cannon.js','→ 物理模拟器',
     '模拟真实世界的重力、弹力、碰撞。不用自己算数学——它替你算好，告诉Three.js车在哪里。',
     '类比：物理老师，算好车在哪，告诉布景师把车摆在哪'],
    ['#30d158','GSAP','→ 动画导演',
     '控制「什么时候」发生什么。开场3秒物体升起、相机缓缓移动——都是它指挥的。',
     '类比：导演，喊「第3秒，灯光升起来」'],
    ['#bf5af2','Howler.js','→ 音效师',
     '让引擎声随车速变化，撞墙那一刻发出碰撞声。',
     '类比：音效师，实时调整每个声音的音量和时机'],
    ['#ff6b9d','Vite','→ 开发服务器',
     '你写完代码，它帮你变成浏览器能跑的东西。你改一行代码，它自动刷新浏览器。',
     '类比：舞台监督，你改了剧本，立刻通知所有人更新'],
    ['#c8a96e','GLSL','→ 着色器语言',
     '直接运行在显卡上的小程序，控制每个像素的颜色。Matcap 效果和光晕都靠它。',
     '类比：灯光师，控制每个灯的颜色和亮度'],
  ].map(([col,name,role,desc,ana],i)=>`
    <div class="step">
      <div class="step-l">
        <div class="step-n" style="background:${col}18;border:1px solid ${col}44;color:${col};font-size:9px">${String(i+1).padStart(2,'0')}</div>
        <div class="step-line"></div>
      </div>
      <div class="step-body">
        <h4>${name} <span style="font-family:var(--mono);font-size:10px;color:var(--txt3);font-weight:400">${role}</span></h4>
        <p>${desc}</p>
        <div class="note">💡 ${ana}</div>
      </div>
    </div>`).join('')}
</div>`;
}

Object.assign(window.R,{play:renderPlay,what:renderWhat,tools:renderTools});
