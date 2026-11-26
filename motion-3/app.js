/* ================= 引擎 ================= */
const FOOT = {
  code:      {slug:"close-up-view-of-a-screen-with-programming-codes", id:41649, use:"代码滚屏 · 讲「进代码库 / 架构实现」时的底"},
  server:    {slug:"bluish-data-center-hallway", id:23282, use:"机房冷光 · 讲参数、显存、算力成本"},
  library:   {slug:"bookcase-of-a-library-seen-in-detail", id:21586, use:"书架 · 记忆 / 知识库 / 行为历史"},
  citynight: {slug:"aerial-shot-of-a-city-at-night", id:42342, use:"城市夜景航拍 · 大厂 / 生态 / 收束"},
  phone:     {slug:"hands-of-a-young-woman-typing-on-her-smartphone", id:39774, use:"手与手机 · 主动式 App / 权限"},
  keyboard:  {slug:"fingers-typing-extreme-close-up", id:41268, use:"敲键盘特写 · 流程 / 交付"},
  chess:     {slug:"chess", id:49731, use:"棋局 · 策略、取舍、路线选择"},
  hourglass: {slug:"hourglass", id:28894, use:"沙漏 · 时间代价 / 慢"},
  blackboard:{slug:"blackboard", id:4619, use:"黑板 · 课程 / 教学 / 学到了什么"},
  meeting:   {slug:"presentation-during-a-work-team-meeting", id:42666, use:"会议投影 · 企业部署 / 流程改造"},
  skyscraper:{slug:"night-panorama-of-the-skyscrapers-of-a-big-city", id:40654, use:"高楼夜景 · 往高里盖 / 堆参数"},
  handshake: {slug:"close-up-handshake-between-formal-dressed-men", id:30013, use:"握手特写 · 验收 / 责任 / 签字"},
  notebook:  {slug:"a-woman-writing-in-her-spiral-notebook", id:42655, use:"手写笔记 · 定义、结论、尺子"},
  welding:   {slug:"closeup-of-welding", id:21483, use:"焊花特写 · 「把插座焊进流程」这个比喻"}
};

const KINDNAME = {chapter:"章节卡",figs:"数字",vs:"对撞",steps:"清单",loop:"架构图",bars:"条形",annot:"实拍标注",quote:"金句",end:"收束卡"};

const stage = document.getElementById("stage");
const stripEl = document.getElementById("strip");
const pbarEl = document.getElementById("pbar");
const tcEl = document.getElementById("tc");
const tabsEl = document.getElementById("tabs");

let ri = 0, si = 0, playing = false, elapsed = 0, last = 0, raf = null;

const pad2 = n => String(n).padStart(2,"0");
const fmt = s => `${Math.floor(s/60)}:${pad2(Math.floor(s%60))}`;

function starts(reel){
  let acc = 0; return reel.scenes.map(s => { const st = acc; acc += s.dur; return st; });
}

/* ---------- 各类型渲染 ---------- */
function chrome(sc, i, reel, tStart){
  return `<div class="meta"><div class="l"><span class="num">${pad2(i+1)}</span>
    <span>${KINDNAME[sc.kind]} · ${reel.id.toUpperCase()}</span></div>
    <div class="tc2">TC ${fmt(tStart)} · ${sc.dur.toFixed(1)}s</div></div><div class="hair"></div>`;
}

function lines(arr, base=.16, step=.085, tag="h2", cls="big"){
  return `<${tag} class="${cls}">` + arr.map((l,i)=>
    `<span class="mask"><span style="animation-delay:${(base+i*step).toFixed(2)}s">${l}</span></span>`).join("") + `</${tag}>`;
}

function renderScene(sc, i, reel, tStart){
  const k = sc.kind;
  let body = "", cls = "";
  if (k === "chapter"){
    cls = "chapter";
    body = `<div class="rule"></div>
      <div class="kicker fade" style="animation-delay:.05s">${sc.kicker||""}</div>
      ${lines(sc.lines)}
      <div class="n">${sc.num}</div>`;
  }
  if (k === "figs"){
    body = `<div class="kicker fade" style="animation-delay:.05s">${sc.kicker||""}</div>
      <div class="figs">` + sc.items.map((f,j)=>`
        <div class="fig fade" style="animation-delay:${(.14+j*.07).toFixed(2)}s">
          <div class="v" ${f.red?'style="color:var(--red)"':''}><span class="cnt" data-v="${f.v}" data-dec="${String(f.v).includes('.')?1:0}">0</span><small>${f.unit||""}</small></div>
          <div class="k">${f.k}</div>
        </div>`).join("") + `</div>
      <div class="note fade" style="animation-delay:.62s">${sc.note||""}</div>`;
  }
  if (k === "vs"){
    body = `<div class="kicker fade" style="animation-delay:.05s">${sc.kicker||""}</div>
      <div class="vs">
        <div class="side a">
          <div class="tag fade" style="animation-delay:.12s">${sc.a.tag||""}</div>
          <div class="mask"><span style="animation-delay:.16s"><h3>${sc.a.h}</h3></span></div>
          <ul>` + sc.a.li.map((l,j)=>`<li class="fade" style="animation-delay:${(.3+j*.08).toFixed(2)}s">${l}</li>`).join("") + `</ul>
        </div>
        <div class="div"></div>
        <div class="side b">
          <div class="tag fade" style="animation-delay:.22s">${sc.b.tag||""}</div>
          <div class="mask"><span style="animation-delay:.26s"><h3>${sc.b.h}</h3></span></div>
          <ul>` + sc.b.li.map((l,j)=>`<li class="fade" style="animation-delay:${(.4+j*.08).toFixed(2)}s">${l}</li>`).join("") + `</ul>
        </div>
      </div>
      ${sc.foot?`<div class="note fade" style="animation-delay:1.0s">${sc.foot}</div>`:""}`;
  }
  if (k === "steps"){
    body = `<div class="kicker fade" style="animation-delay:.05s">${sc.kicker||""}</div>
      <h2 class="sm" style="margin-bottom:calc(30px * var(--s,1))"><span class="mask"><span style="animation-delay:.12s">${sc.title}</span></span></h2>
      <div class="steps">` + sc.items.map((s,j)=>`
        <div class="step ${s.hi?'hi':''}" style="opacity:0;transform:translateX(calc(-18px * var(--s,1)));
             animation:fi .6s cubic-bezier(.16,1,.3,1) ${(.24+j*.1).toFixed(2)}s forwards">
          <div class="i">${pad2(j+1)}</div><div class="h">${s.h}</div><div class="d">${s.d}</div>
        </div>`).join("") + `</div>`;
  }
  if (k === "loop"){
    const n = sc.layers, [c0,c1] = sc.core;
    let layers = "";
    for (let j=0;j<n;j++){
      const core = j>=c0 && j<c1;
      layers += `<div class="layer ${core?'core':''}" style="top:${(j/n*100).toFixed(3)}%;
        animation-delay:${(0.08+Math.abs(j-(c0+c1)/2)/n*0.5).toFixed(2)}s"></div>`;
    }
    const y0 = c0/n*100, y1 = c1/n*100;
    const svg = `<svg viewBox="0 0 100 100" preserveAspectRatio="none" style="position:absolute;inset:0;overflow:visible">
      <defs><marker id="ar" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
        <path d="M0,0 L6,3 L0,6 z" fill="#D2402B"/></marker></defs>
      ${[0,1,2].map(j=>`<path class="looppath" d="M 39 ${(y1-1).toFixed(1)} L ${61+j*7} ${(y1-1).toFixed(1)}
        L ${61+j*7} ${(y0+1).toFixed(1)} L 41 ${(y0+1).toFixed(1)}"
        fill="none" stroke="#D2402B" stroke-width="1.6" vector-effect="non-scaling-stroke"
        marker-end="url(#ar)" pathLength="100" stroke-dasharray="100" stroke-dashoffset="100"
        style="animation:dash .7s cubic-bezier(.65,0,.35,1) ${(0.75+j*0.28).toFixed(2)}s forwards"/>`).join("")}
      <text x="${64.5}" y="${(y0+y1)/2}" font-size="3" fill="#8A857C" font-family="monospace"
        style="opacity:0;animation:fi .5s 1.7s forwards">× ${sc.rep}</text>
    </svg>`;
    body = `<div class="kicker fade" style="animation-delay:.05s">${sc.kicker||""}</div>
      <div class="loopgrid"><div class="layers">${layers}${svg}</div>
      <div class="loopnav">
        <div class="big2 fade" style="animation-delay:.9s">${sc.big}</div>
        <div class="ln2 fade" style="animation-delay:1.15s">${sc.ln}</div>
        <div><span class="badge fade" style="animation-delay:1.45s">${sc.badge}</span></div>
      </div></div>`;
  }
  if (k === "bars"){
    body = `<div class="kicker fade" style="animation-delay:.05s">${sc.kicker||""}</div>
      <h2 class="sm" style="margin-bottom:calc(10px * var(--s,1))"><span class="mask"><span style="animation-delay:.12s">${sc.title}</span></span></h2>
      <div class="bars">` + sc.rows.map((r,j)=>`
        <div class="brow ${r.c==='r'?'red':''} fade" style="animation-delay:${(.24+j*.1).toFixed(2)}s">
          <div class="bl">${r.l}</div>
          <div class="track"><div class="fill" style="--w:${r.w};animation-delay:${(.4+j*.12).toFixed(2)}s"></div>
          <div class="val">${r.v}</div></div>
        </div>`).join("") + `</div>
      <div class="note fade" style="animation-delay:.9s">${sc.note||""}</div>`;
  }
  if (k === "annot"){
    body = `<div class="annot" style="position:absolute;inset:0">` + sc.pins.map((p,j)=>`
      <div class="pin" style="left:${p.x}%;top:${p.y}%">
        <div class="dot" style="opacity:0;animation:fi .4s ${(.5+j*.35).toFixed(2)}s forwards"></div>
        <div class="ln3" style="animation-delay:${(.62+j*.35).toFixed(2)}s"></div>
        <div class="lb" style="left:calc(96px * var(--s,1));top:calc(-14px * var(--s,1));animation-delay:${(.8+j*.35).toFixed(2)}s">${p.t}</div>
      </div>`).join("") + `
      <div class="cap fade" style="animation-delay:.2s">${sc.cap||""}</div>
      <div class="kicker fade" style="position:absolute;left:calc(96px * var(--s,1));top:calc(128px * var(--s,1));animation-delay:.05s">${sc.kicker||""}</div>
    </div>`;
  }
  if (k === "quote"){
    body = `<div class="kicker fade" style="animation-delay:.05s">${sc.kicker||""}</div>
      ${lines(sc.lines, .14, .09, "h2", "big")}
      <div class="note fade" style="animation-delay:.7s">${sc.note||""}</div>`;
    cls = "quote";
  }
  if (k === "end"){
    body = `<div class="end">
      <div class="q">` + sc.lines.map((l,i)=>
        `<span class="mask"><span style="animation-delay:${(.1+i*.12).toFixed(2)}s">${l}</span></span>`).join("") + `</div>
      <div class="sig fade" style="animation-delay:.75s"><i></i>${sc.sig}</div></div>`;
  }

  const vid = sc.bg
    ? `<video class="vid" src="clips/${sc.bg}.mp4" muted playsinline loop preload="auto" style="--dur:${sc.dur}s"></video>`
    : "";
  const veil = sc.veil && sc.veil !== "none" ? `<div class="veil ${sc.veil}"></div>` : "";

  return `${vid}${veil}<div class="grain"></div>${chrome(sc,i,reel,tStart)}
    <div class="scene ${cls}">${body}</div>
    <div class="guide"><i class="h"></i><i class="h2"></i><i class="v"></i><i class="v2"></i><i class="ctr"></i></div>`;
}

/* ---------- 播放 ---------- */
function reel(){ return REELS[ri]; }

function mount(i){
  const R = reel(), sc = R.scenes[i], tStart = starts(R)[i];
  si = i;
  stage.innerHTML = renderScene(sc, i, R, tStart);
  stage.classList.remove("go");
  const v = stage.querySelector("video.vid");
  if (v){ v.currentTime = 0; v.play().catch(()=>{}); }
  void stage.offsetWidth;
  requestAnimationFrame(()=>{ stage.classList.add("go"); countUp(); });
  [...stripEl.children].forEach((c,j)=>c.classList.toggle("on", j===i));
  elapsed = 0; last = performance.now();
  paint();
}

function countUp(){
  stage.querySelectorAll(".cnt").forEach(el=>{
    const target = parseFloat(el.dataset.v), dec = +el.dataset.dec;
    const t0 = performance.now();
    const step = now => {
      const p = Math.min(1, (now - t0) / 900);
      const e = 1 - Math.pow(1 - p, 3);
      el.textContent = (target * e).toFixed(dec);
      if (p < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  });
}

function paint(){
  const sc = reel().scenes[si];
  pbarEl.style.width = Math.min(100, elapsed / (sc.dur*1000) * 100) + "%";
  const R = reel(), t = starts(R)[si] + elapsed/1000;
  tcEl.textContent = `${fmt(t)} / ${fmt(starts(R)[R.scenes.length-1] + R.scenes[R.scenes.length-1].dur)}`;
}

function tick(now){
  if (playing){
    elapsed += now - last; last = now;
    const sc = reel().scenes[si];
    if (elapsed >= sc.dur*1000){
      if (si < reel().scenes.length - 1) mount(si+1);
      else { playing = false; elapsed = sc.dur*1000; document.getElementById("play").textContent = "▶ 重播"; }
    }
    paint();
  }
  raf = requestAnimationFrame(tick);
}

/* ---------- UI ---------- */
function buildTabs(){
  tabsEl.innerHTML = REELS.map((r,i)=>`<button class="tab ${i===ri?'on':''}" data-i="${i}">${r.title}</button>`).join("");
  tabsEl.querySelectorAll(".tab").forEach(b=>b.onclick=()=>{
    ri = +b.dataset.i; buildTabs(); buildStrip(); play(false); mount(0);
  });
}

function buildStrip(){
  const R = reel();
  stripEl.innerHTML = R.scenes.map((s,i)=>
    `<button class="chip" data-i="${i}"><em>${pad2(i+1)}</em>${KINDNAME[s.kind]}${s.bg?' · '+s.bg:''}</button>`).join("");
  stripEl.querySelectorAll(".chip").forEach(b=>b.onclick=()=>{ mount(+b.dataset.i); });
}

function play(on){
  playing = on === undefined ? !playing : on;
  last = performance.now();
  document.getElementById("play").textContent = playing ? "❚❚ 暂停" : "▶ 播放";
  if (playing && elapsed >= reel().scenes[si].dur*1000 - 30) mount(0);
}

document.getElementById("play").onclick = ()=>play();
document.getElementById("prev").onclick = ()=>mount(Math.max(0, si-1));
document.getElementById("next").onclick = ()=>mount(Math.min(reel().scenes.length-1, si+1));
document.getElementById("grid").onclick = e =>{
  stage.classList.toggle("showguide"); e.target.classList.toggle("on");
};

/* 素材表 */
function buildTables(){
  const host = document.getElementById("tables");
  host.innerHTML = REELS.map((R,idx)=>{
    const st = starts(R);
    const rows = R.scenes.map((s,i)=>{
      const f = s.bg ? FOOT[s.bg] : null;
      return `<tr>
        <td class="mono">${pad2(i+1)}</td>
        <td class="mono">${fmt(st[i])} – ${fmt(st[i]+s.dur)}</td>
        <td>${KINDNAME[s.kind]}</td>
        <td>${f?`<b>${s.bg}.mp4</b><br><span style="color:rgba(255,255,255,.45)">Mixkit #${f.id} · 720p · 已切 7s / 25fps</span>`
              :`<span style="color:rgba(255,255,255,.55)">无实拍 · 纯色板 + 自制矢量动效</span>`}</td>
        <td>${f?`<a href="https://mixkit.co/free-stock-video/${f.slug}/" target="_blank" rel="noopener">${f.slug}</a>
              <br><a href="https://assets.mixkit.co/videos/${f.id}/${f.id}-720.mp4" target="_blank" rel="noopener">直链 mp4</a>`
              :"—"}</td>
        <td>${f?"Mixkit Free License<br>可商用 · 无需署名":"自制"}</td>
        <td>${f?f.use:"章节卡 / 图表层，本身就是设计的一部分"}</td>
      </tr>`;
    }).join("");
    return `<h2 class="h" style="margin-top:${idx?'52px':'8px'}">${R.title}</h2>
      <p class="sub">${R.meta}　·　样片时长 ${fmt(R.scenes.reduce((a,s)=>a+s.dur,0))}　·　实拍 ${R.scenes.filter(s=>s.bg).length} 段 / 图形 ${R.scenes.filter(s=>!s.bg).length} 镜</p>
      <table><thead><tr><th class="mono">镜</th><th class="mono">时间码</th><th>类型</th><th>素材</th><th>来源</th><th>许可</th><th>本镜用法</th></tr></thead>
      <tbody>${rows}</tbody></table>`;
  }).join("");
}

/* 关键帧补充 */
const extra = document.createElement("style");
extra.textContent = `
@keyframes dash{to{stroke-dashoffset:0}}
.pin .ln3{width:calc(78px * var(--s,1));transform:scaleX(0);transform-origin:left}
.go .pin .ln3{animation:hy2 .45s cubic-bezier(.65,0,.35,1) forwards}
@keyframes hy2{to{transform:scaleX(1)}}
`;
document.head.appendChild(extra);

buildTabs(); buildStrip(); buildTables(); mount(0);
raf = requestAnimationFrame(tick);
setTimeout(()=>play(true), 400);

window.addEventListener("keydown", e=>{
  if (e.code === "Space"){ e.preventDefault(); play(); }
  if (e.code === "ArrowRight") mount(Math.min(reel().scenes.length-1, si+1));
  if (e.code === "ArrowLeft") mount(Math.max(0, si-1));
});
