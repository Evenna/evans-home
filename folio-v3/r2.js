/* r2.js — chapters: looks, car, map */

function renderLooks(el){
  el.innerHTML=`
<div class="sec">Matcap 是什么？</div>
<div class="analogy">
  <div class="analogy-icon">🥚</div>
  <p style="font-size:13.5px;color:var(--txt2);line-height:1.75">想象你有一个蛋——你想让它看起来是金属的。<br>
  正常做法：摆一盏灯在旁边，让灯光照到蛋上产生高光和阴影。<br><br>
  <strong style="color:var(--txt)">Matcap 的做法</strong>：直接把「一张已经有光影效果的金属球照片」贴到蛋的表面——根本不需要灯。<br><br>
  结果？看起来一模一样，但<em style="color:var(--gold)">速度快十倍、代码简单一百倍。</em></p>
</div>
<div class="sec">视觉上怎么实现的</div>
<canvas id="matcap-cv" width="386" height="160"></canvas>
<div style="font-family:var(--mono);font-size:10px;color:var(--txt3);padding:7px 12px;border:1px solid var(--border);border-top:none;border-radius:0 0 10px 10px;margin-bottom:14px">↑ 左：Matcap 贴图（一张球形光照图）→ 右：贴到3D物体表面，立刻有光感</div>
<div class="box blue">
  <h5>为什么这个项目用 Matcap 而不是真实灯光？</h5>
  <p>真实的灯光计算需要大量运算，场景里有几十个物体的话会很卡。<em>Matcap 只是查图</em>——速度极快，而且效果统一好看。这是这个项目能在手机上流畅运行的核心原因之一。</p>
</div>
<div class="hgrid">
  <div class="hcard">
    <div class="icon">🔦</div>
    <h4>传统灯光</h4>
    <p>需要计算每个物体和每盏灯的位置关系<br>物体多了会很卡</p>
  </div>
  <div class="hcard">
    <div class="icon">📸</div>
    <h4>Matcap 贴图</h4>
    <p>把光照效果预先「烘焙」进一张图<br>随时查图，速度极快</p>
  </div>
</div>`;
  requestAnimationFrame(()=>{
    const cv=document.getElementById('matcap-cv');if(!cv)return;
    cv.style.cssText='border-radius:10px 10px 0 0;border:1px solid var(--border);border-bottom:none;display:block';
    const ctx=cv.getContext('2d'),W=cv.width,H=cv.height;
    ctx.fillStyle='#0d1015';ctx.fillRect(0,0,W,H);
    // matcap sphere left
    const cx1=85,cy=80,r=55;
    const g1=ctx.createRadialGradient(cx1-18,cy-18,4,cx1,cy,r);
    g1.addColorStop(0,'#ffffff');g1.addColorStop(0.25,'#a8c4e8');g1.addColorStop(0.6,'#3a6a9a');g1.addColorStop(1,'#0a1a2e');
    ctx.beginPath();ctx.arc(cx1,cy,r,0,Math.PI*2);ctx.fillStyle=g1;ctx.fill();
    // label
    ctx.fillStyle='rgba(255,255,255,0.4)';ctx.font='11px "JetBrains Mono",monospace';ctx.textAlign='center';
    ctx.fillText('Matcap 贴图',cx1,H-10);
    // arrow
    ctx.strokeStyle='rgba(255,255,255,0.15)';ctx.lineWidth=1.5;ctx.setLineDash([4,4]);
    ctx.beginPath();ctx.moveTo(cx1+r+10,cy);ctx.lineTo(cx1+r+50,cy);ctx.stroke();ctx.setLineDash([]);
    ctx.fillStyle='rgba(255,255,255,0.2)';ctx.beginPath();ctx.moveTo(cx1+r+50,cy);ctx.lineTo(cx1+r+43,cy-4);ctx.lineTo(cx1+r+43,cy+4);ctx.fill();
    ctx.fillStyle='rgba(255,255,255,0.25)';ctx.font='10px "JetBrains Mono",monospace';ctx.textAlign='center';ctx.fillText('贴到表面',cx1+r+30,cy-8);
    // result object right — a torus-like outline
    const cx2=300;
    // cube-like shape with matcap
    const g2=ctx.createRadialGradient(cx2-20,cy-20,5,cx2,cy,60);
    g2.addColorStop(0,'#e8f0f8');g2.addColorStop(0.3,'#6090c0');g2.addColorStop(0.7,'#2a4a70');g2.addColorStop(1,'#0a1828');
    ctx.beginPath();
    ctx.moveTo(cx2-35,cy-50);ctx.lineTo(cx2+35,cy-50);ctx.lineTo(cx2+55,cy-20);
    ctx.lineTo(cx2+55,cy+30);ctx.lineTo(cx2+35,cy+50);ctx.lineTo(cx2-35,cy+50);
    ctx.lineTo(cx2-55,cy+20);ctx.lineTo(cx2-55,cy-30);ctx.closePath();
    ctx.fillStyle=g2;ctx.fill();
    ctx.fillStyle='rgba(255,255,255,0.4)';ctx.font='11px "JetBrains Mono",monospace';ctx.textAlign='center';
    ctx.fillText('3D 物体有光感了',cx2,H-10);
  });
}

function renderCar(el){
  el.innerHTML=`
<div class="sec">平行世界的概念</div>
<div class="analogy">
  <div class="analogy-icon">👻</div>
  <p style="font-size:13.5px;color:var(--txt2);line-height:1.75">这个项目里其实有<strong style="color:var(--txt)">两个世界</strong>同时在运行：<br><br>
  <strong style="color:var(--orange)">物理世界</strong>（你看不见）：Cannon.js 在这里计算重力、碰撞、速度……<br>
  <strong style="color:var(--accent)">视觉世界</strong>（你看得见）：Three.js 把物理世界的坐标画出来给你看。<br><br>
  每秒60次，物理世界把「现在车在 x=3.2, y=0, z=1.4」告诉视觉世界，然后视觉世界把车画在那里。<em style="color:var(--gold)">这就是「物理」看起来真实的原因。</em></p>
</div>
<canvas id="physics-cv" width="386" height="150" style="border-radius:10px;border:1px solid var(--border);display:block;margin-bottom:4px"></canvas>
<div style="font-family:var(--mono);font-size:10px;color:var(--txt3);padding:7px 12px;margin-bottom:14px">↑ 动画：物理世界（橙）与视觉世界（蓝）每帧同步位置</div>
<div class="sec">车的控制逻辑</div>
<div class="steps">
  ${[
    ['你按下 W 键','键盘事件触发','浏览器检测到「W键被按下」，把这个信息存起来'],
    ['代码检查按键状态','每帧询问「W是否在按？」','如果是，就给物理引擎里的车施加一个「向前的力」'],
    ['物理引擎算轨迹','算好新位置','Cannon.js 考虑地面摩擦、车重、当前速度，算出下一帧车在哪'],
    ['Three.js 画出来','视觉更新','把算好的位置直接显示出来，你看到车往前开了'],
  ].map(([t,st,d],i)=>`
    <div class="step">
      <div class="step-l">
        <div class="step-n" style="background:rgba(255,159,10,.1);border:1px solid rgba(255,159,10,.3);color:var(--orange)">${i+1}</div>
        <div class="step-line"></div>
      </div>
      <div class="step-body"><h4>${t} <span style="color:var(--txt3);font-weight:400;font-size:12px">→ ${st}</span></h4><p>${d}</p></div>
    </div>`).join('')}
</div>`;
  requestAnimationFrame(()=>{
    const cv=document.getElementById('physics-cv');if(!cv)return;
    const ctx=cv.getContext('2d'),W=cv.width,H=cv.height;
    ctx.fillStyle='#0d1015';ctx.fillRect(0,0,W,H);
    let t=0;
    function frame(){
      ctx.fillStyle='#0d1015';ctx.fillRect(0,0,W,H);
      t+=0.02;
      // ground
      ctx.strokeStyle='rgba(255,255,255,0.06)';ctx.lineWidth=1;ctx.setLineDash([6,8]);
      ctx.beginPath();ctx.moveTo(20,H/2+30);ctx.lineTo(W-20,H/2+30);ctx.stroke();ctx.setLineDash([]);
      ctx.fillStyle='rgba(255,255,255,0.12)';ctx.font='9px "JetBrains Mono",monospace';
      ctx.fillText('地面（碰撞体）',22,H/2+45);
      // physics car (orange)
      const px=60+Math.abs(Math.sin(t))*260;
      const py=H/2+30-18-Math.abs(Math.sin(t*2.3))*22;
      ctx.fillStyle='rgba(255,159,10,0.15)';ctx.strokeStyle='rgba(255,159,10,0.5)';ctx.lineWidth=1.5;
      ctx.beginPath();ctx.roundRect(px-22,py-10,44,20,4);ctx.fill();ctx.stroke();
      ctx.fillStyle='#ff9f0a';ctx.font='9px "JetBrains Mono",monospace';ctx.textAlign='center';
      ctx.fillText('物理车',px,py+26);
      // visual car (blue) — slightly lagging
      const vx=60+Math.abs(Math.sin(t-0.03))*260;
      const vy=H/2+30-18-Math.abs(Math.sin((t-0.03)*2.3))*22;
      ctx.fillStyle='rgba(79,143,255,0.15)';ctx.strokeStyle='rgba(79,143,255,0.55)';ctx.lineWidth=1.5;
      ctx.beginPath();ctx.roundRect(vx-22,vy-10,44,20,4);ctx.fill();ctx.stroke();
      ctx.fillStyle='#4f8fff';ctx.font='9px "JetBrains Mono",monospace';ctx.textAlign='center';
      ctx.fillText('视觉车',vx,vy-16);
      // sync arrow
      if(Math.abs(px-vx)>2){
        ctx.strokeStyle='rgba(255,255,255,0.15)';ctx.lineWidth=1;ctx.setLineDash([3,3]);
        ctx.beginPath();ctx.moveTo(px,py);ctx.lineTo(vx,vy);ctx.stroke();ctx.setLineDash([]);
      }
      requestAnimationFrame(frame);
    }
    frame();
  });
}

function renderMap(el){
  el.innerHTML=`
<div class="sec">简历变成地图</div>
<div class="box gold">
  <h5>为什么要这么做？</h5>
  <p>传统简历：别人要花5分钟<em>读完</em>你的经历。<br>
  这个网站：别人花5分钟<em>开车逛你的世界</em>——就算没有认真看内容，也会记住这个人。<em>体验本身就是作品。</em></p>
</div>
<div class="sec">五个区域，分别放什么</div>
<canvas id="map-cv" width="386" height="280" style="border-radius:10px;border:1px solid var(--border);display:block;margin-bottom:14px"></canvas>
<div class="steps">
  ${[
    ['🏠','起点区','车刚出现的地方，有个大标题「Bruno Simon」和一句自我介绍'],
    ['💼','作品区','停在这里，会弹出项目卡片，可以点开查看作品详情'],
    ['🛠️','技能区','停在不同的模型旁边，显示「Blender, Three.js, Unity…」'],
    ['📬','联系区','有个地址牌，停过去显示邮箱和社交媒体链接'],
    ['🎪','彩蛋区','Bruno 藏了一些好玩的机关，需要自己去探索'],
  ].map(([ic,t,d])=>`
    <div class="step">
      <div class="step-l">
        <div class="step-n" style="background:rgba(255,255,255,.04);border:1px solid var(--border);color:var(--txt3);font-size:14px">${ic}</div>
        <div class="step-line"></div>
      </div>
      <div class="step-body"><h4>${t}</h4><p>${d}</p></div>
    </div>`).join('')}
</div>
<div class="box blue">
  <h5>你复刻时，这五个区放你自己的内容</h5>
  <p>告诉 AI：「帮我在地图里放五个区域，分别是：欢迎区（放我的名字）、项目区（放我的三个项目）、关于我（放一段自我介绍）、联系方式、一个彩蛋区」</p>
</div>`;
  requestAnimationFrame(()=>{
    const cv=document.getElementById('map-cv');if(!cv)return;
    const ctx=cv.getContext('2d'),W=cv.width,H=cv.height;
    ctx.fillStyle='#0d1015';ctx.fillRect(0,0,W,H);
    // isometric grid
    ctx.strokeStyle='rgba(255,255,255,0.04)';ctx.lineWidth=1;
    const s=28;
    for(let i=-2;i<20;i++){
      ctx.beginPath();ctx.moveTo(i*s,0);ctx.lineTo(i*s+H,H);ctx.stroke();
      ctx.beginPath();ctx.moveTo(W+i*s,0);ctx.lineTo(W+i*s-H,H);ctx.stroke();
    }
    // zones
    const zones=[
      {x:193,y:50,w:100,h:50,col:'#c8a96e',label:'起点区',sub:'Hi, 我是……'},
      {x:90,y:130,w:100,h:60,col:'#4f8fff',label:'作品区',sub:'→ 3个项目'},
      {x:296,y:130,w:80,h:60,col:'#30d158',label:'技能区',sub:'Three.js…'},
      {x:120,y:220,w:80,h:44,col:'#bf5af2',label:'联系区',sub:'✉ 邮箱'},
      {x:270,y:220,w:80,h:44,col:'#ff6b9d',label:'彩蛋区',sub:'🎪 ???'},
    ];
    // roads
    ctx.strokeStyle='rgba(255,255,255,0.08)';ctx.lineWidth=8;ctx.lineCap='round';
    [[193,75,193,110],[193,110,90,130],[193,110,296,130],[90,160,120,220],[296,190,270,220]].forEach(([x1,y1,x2,y2])=>{
      ctx.beginPath();ctx.moveTo(x1,y1);ctx.lineTo(x2,y2);ctx.stroke();
    });
    ctx.strokeStyle='rgba(255,255,255,0.03)';ctx.lineWidth=1;ctx.setLineDash([4,6]);
    [[193,75,193,110],[193,110,90,130],[193,110,296,130],[90,160,120,220],[296,190,270,220]].forEach(([x1,y1,x2,y2])=>{
      ctx.beginPath();ctx.moveTo(x1,y1);ctx.lineTo(x2,y2);ctx.stroke();
    });
    ctx.setLineDash([]);
    // zone boxes
    zones.forEach(z=>{
      ctx.fillStyle=z.col+'18';ctx.strokeStyle=z.col+'55';ctx.lineWidth=1.5;
      ctx.beginPath();ctx.roundRect(z.x-z.w/2,z.y-z.h/2,z.w,z.h,8);ctx.fill();ctx.stroke();
      ctx.fillStyle=z.col;ctx.font='bold 12px "Space Grotesk",sans-serif';ctx.textAlign='center';
      ctx.fillText(z.label,z.x,z.y-4);
      ctx.fillStyle='rgba(255,255,255,0.35)';ctx.font='10px "JetBrains Mono",monospace';
      ctx.fillText(z.sub,z.x,z.y+12);
    });
    // car
    ctx.fillStyle='rgba(255,255,255,0.9)';
    ctx.beginPath();ctx.arc(193,70,5,0,Math.PI*2);ctx.fill();
    ctx.fillStyle='rgba(255,255,255,0.4)';ctx.font='9px "JetBrains Mono",monospace';ctx.textAlign='center';
    ctx.fillText('🚗 你在这里',193,60);
  });
}

Object.assign(window.R,{looks:renderLooks,car:renderCar,map:renderMap});
