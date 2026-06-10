// ── slides part 2 (appended by slides2.js, merged at runtime) ──

const slides2 = [

// ── S07 展演全景 ─────────────────────────
`<div class="slide" style="background:var(--bg);">
  <div class="inner">
    <div class="eyebrow">05 &nbsp;<span>/ 展演场景</span></div>
    <div style="font-size:38px;font-weight:300;color:var(--txt);letter-spacing:-.03em;margin-bottom:10px;">
      15 个真实生活切片
    </div>
    <div style="font-size:13px;color:var(--txt3);margin-bottom:32px;">五幕叙事结构 · 覆盖成长、老年、青年、中年、哲学反思</div>
    <div style="display:grid;grid-template-columns:repeat(5,1fr);gap:10px;">
      ${[
        ['第一幕','Evans的成长',  ['S01 共生人格演化'],'blue'],
        ['第二幕','老年场景',    ['S02 老伴录音','S03 公园棋友','S04 客厅意外','S05 诈骗拦截'],''],
        ['第三幕','青年场景',    ['S06 会议风暴','S07 深夜加班','S08 信息过滤','S09 决策副驾','S10 任务交接','S11 纪念日'],'orange'],
        ['第四幕','中年关怀',    ['S12 代际翻译','S13 第三选项','S14 跨城关怀'],'green'],
        ['第五幕','哲学反思',    ['S15 该不该说话'],''],
      ].map(([act,name,scenes,cls])=>`
      <div style="background:rgba(255,255,255,0.02);border:1px solid var(--border);border-radius:10px;padding:16px 14px;">
        <div style="font-size:10px;font-family:var(--mono);color:var(--txt3);letter-spacing:.08em;margin-bottom:8px;">${act}</div>
        <div style="font-size:13px;font-weight:500;color:var(--txt);margin-bottom:12px;">${name}</div>
        ${scenes.map(s=>`<div style="font-size:11px;color:var(--txt3);padding:4px 0;border-bottom:1px solid rgba(255,255,255,0.04);">${s}</div>`).join('')}
      </div>`).join('')}
    </div>
    <div style="margin-top:24px;display:flex;gap:32px;align-items:center;">
      ${[
        ['15','展演场景'],
        ['6','认知能力模块'],
        ['100+','天长期记忆推演'],
        ['双屏','思维链 + 执行场景'],
      ].map(([n,l])=>`
      <div>
        <div style="font-size:28px;font-weight:300;color:var(--txt);letter-spacing:-.03em;">${n}</div>
        <div style="font-size:11px;color:var(--txt3);margin-top:4px;">${l}</div>
      </div>`).join('')}
    </div>
  </div>
</div>`,

// ── S08 场景深潜（产品图）───────────────
`<div class="slide" style="background:var(--bg);">
  <div class="inner" style="padding:0 56px;">
    <div class="eyebrow" style="padding-top:48px;">05 &nbsp;<span>/ 场景深潜</span></div>
    <div style="font-size:32px;font-weight:300;color:var(--txt);letter-spacing:-.03em;margin-bottom:28px;">
      典型场景 · 系统视觉语言
    </div>
    <div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:14px;flex:1;">
      ${[
        ['S05 诈骗电话拦截',   '声纹核验 + 例外介入',  0],
        ['S07 深夜加班中断',   '反直觉干预 + 历史数据', 1],
        ['S09 决策副驾',       '平行人生模拟器',        2],
        ['S12 代际翻译',       '跨端协同 + 隐私分层',   3],
        ['S14 跨城叙事关怀',   '信件体叙事 · 非数据看板',4],
        ['S15 该不该说话',     '沉默作为主动选择',       5],
      ].map(([title,sub,idx])=>`
      <div style="position:relative;border-radius:10px;overflow:hidden;border:1px solid var(--border);background:var(--card);">
        <img src="${IMGS[idx]}" alt="${title}" style="width:100%;height:140px;object-fit:cover;display:block;opacity:.85;">
        <div style="padding:12px 14px;">
          <div style="font-size:12px;font-weight:500;color:var(--txt);margin-bottom:3px;">${title}</div>
          <div style="font-size:11px;color:var(--txt3);">${sub}</div>
        </div>
      </div>`).join('')}
    </div>
    <div style="height:32px;"></div>
  </div>
</div>`,

// ── S09 设计贡献 ─────────────────────────
`<div class="slide" style="background:var(--bg);">
  <div class="inner">
    <div class="eyebrow">06 &nbsp;<span>/ 设计贡献</span></div>
    <div style="font-size:38px;font-weight:300;color:var(--txt);letter-spacing:-.03em;margin-bottom:44px;">
      学术 × 实践 双重贡献
    </div>
    <div class="cols-2" style="gap:48px;">
      <div>
        <div style="font-size:13px;font-family:var(--mono);color:var(--accent);letter-spacing:.08em;text-transform:uppercase;margin-bottom:20px;">学术贡献</div>
        <div style="display:flex;flex-direction:column;gap:14px;">
          ${[
            ['叙事认同重构模型','首次将 Ricoeur 叙事哲学引入AI人格设计领域，提出用户-AI相互叙事塑造的理论框架'],
            ['得体卸载理论化','将认知科学的"延展认知"理论推进，提出AI介入的分寸感判断模型'],
            ['共生人格量化框架','构建八维人格演化体系，提供可测量的AI个性化指标'],
          ].map(([t,d])=>`
          <div style="display:flex;gap:16px;align-items:start;">
            <div style="width:20px;height:20px;border-radius:50%;border:1px solid var(--accent);display:flex;align-items:center;justify-content:center;flex-shrink:0;margin-top:1px;">
              <div style="width:6px;height:6px;border-radius:50%;background:var(--accent);"></div>
            </div>
            <div>
              <div style="font-size:14px;font-weight:500;color:var(--txt);margin-bottom:5px;">${t}</div>
              <div style="font-size:12.5px;color:var(--txt3);line-height:1.7;">${d}</div>
            </div>
          </div>`).join('')}
        </div>
      </div>
      <div>
        <div style="font-size:13px;font-family:var(--mono);color:var(--orange);letter-spacing:.08em;text-transform:uppercase;margin-bottom:20px;">实践贡献</div>
        <div style="display:flex;flex-direction:column;gap:14px;">
          ${[
            ['双屏展演体系','思维链可视化（屏幕一）与执行场景动画（屏幕二）的毫秒级同步展示系统'],
            ['跨端隐私分层架构','设计用户-家属间的信息授权分级机制，区分"可分享"与"受保护"数据'],
            ['视觉语言规范','统一的蓝色调度动线 + 虚拟工具浮层 + 设备状态文字框的设计语言'],
          ].map(([t,d])=>`
          <div style="display:flex;gap:16px;align-items:start;">
            <div style="width:20px;height:20px;border-radius:50%;border:1px solid var(--orange);display:flex;align-items:center;justify-content:center;flex-shrink:0;margin-top:1px;">
              <div style="width:6px;height:6px;border-radius:50%;background:var(--orange);"></div>
            </div>
            <div>
              <div style="font-size:14px;font-weight:500;color:var(--txt);margin-bottom:5px;">${t}</div>
              <div style="font-size:12.5px;color:var(--txt3);line-height:1.7;">${d}</div>
            </div>
          </div>`).join('')}
        </div>
      </div>
    </div>
  </div>
</div>`,

// ── S10 边界与反思 ───────────────────────
`<div class="slide" style="background:var(--bg);">
  <div class="inner">
    <div class="eyebrow">07 &nbsp;<span>/ 边界与反思</span></div>
    <div style="font-size:38px;font-weight:300;color:var(--txt);letter-spacing:-.03em;margin-bottom:14px;">
      我们不应该做什么
    </div>
    <div style="font-size:14px;color:var(--txt3);margin-bottom:44px;">Evans 的设计边界与伦理框架</div>
    <div class="cols-3">
      ${[
        ['不替代决策','Evans 可以推演、对比、外化内心矛盾——但最终的选择必须由用户作出。S09决策副驾的结尾：「决定权100%在你」。',''],
        ['不取代情感','Evans 翻译亲情，但不取代亲情本身。S14叙事关怀的目的是促成真实的电话，而不是让AI成为中间商。',''],
        ['不全时监控','隐私分层授权确保每个用户有权决定哪些信息可以跨端共享，哪些受到严格保护。',''],
        ['不强制改变','即使历史数据显示凌晨工作效率极低，Evans 也只展示数据、提供台阶，不强制关机。','orange'],
        ['不代替宣泄','S15：当用户只是想发泄情绪时，Evans 选择沉默——被认同有时比被建议更危险。','orange'],
        ['不出现红色','全展演视觉语言中全程不出现红色——克制本身是 Evans 最重要的设计底色。',''],
      ].map(([t,d,cls])=>`
      <div class="card" style="padding:22px 20px;">
        <div style="width:24px;height:2px;background:${cls?'var(--orange)':'var(--border2)'};margin-bottom:14px;border-radius:1px;"></div>
        <h3 style="font-size:14px;margin-bottom:10px;">${t}</h3>
        <p style="font-size:12px;line-height:1.7;">${d}</p>
      </div>`).join('')}
    </div>
  </div>
</div>`,

// ── S11 结语 ─────────────────────────────
`<div class="slide" style="background:var(--bg);">
  <div class="inner" style="justify-content:center;text-align:center;">
    <div style="font-size:11px;font-family:var(--mono);color:var(--accent);letter-spacing:.14em;text-transform:uppercase;margin-bottom:48px;">
      结语 / Closing
    </div>
    <div style="font-size:48px;font-weight:300;color:var(--txt);letter-spacing:-.04em;line-height:1.15;margin-bottom:32px;">
      共生，<br>不是控制。
    </div>
    <div style="max-width:560px;margin:0 auto 48px;">
      <div style="font-size:16px;color:var(--txt2);line-height:1.8;font-weight:300;">
        每一个 Evans，都因为陪伴的人不同而不同。<br>
        真正成熟的代理AI，是知道什么时候应该不说话。
      </div>
    </div>
    <div style="display:flex;justify-content:center;gap:16px;flex-wrap:wrap;">
      <span class="tag blue">叙事认同重构</span>
      <span class="tag">得体卸载</span>
      <span class="tag orange">共生人格演化</span>
    </div>
    <div style="margin-top:56px;font-size:12px;color:var(--txt3);">
      感谢聆听 · 请批评指正
    </div>
  </div>
  <div style="position:absolute;bottom:0;left:0;right:0;height:1px;background:var(--border);"></div>
</div>`,

// ── S12 备用：研究方法 ───────────────────
`<div class="slide" style="background:var(--bg);">
  <div class="inner">
    <div class="eyebrow">附 &nbsp;<span>/ 研究方法</span></div>
    <div style="font-size:38px;font-weight:300;color:var(--txt);letter-spacing:-.03em;margin-bottom:40px;">
      方法论框架
    </div>
    <div class="cols-2" style="gap:48px;">
      <div style="display:flex;flex-direction:column;gap:18px;">
        ${[
          ['理论基础','Ricoeur 叙事认同（1988）/ Clark & Chalmers 延展认知（1998）/ Premack & Woodruff 心智推理（1978）'],
          ['设计方法','场景原型构建 + 双屏展演体系设计 + 分寸感引擎规则推导'],
          ['验证方式','15场景脚本推演 + 六层认知架构覆盖性验证 + 视觉语言一致性测试'],
        ].map(([t,d])=>`
        <div>
          <div style="font-size:13px;font-weight:600;color:var(--txt);margin-bottom:8px;">${t}</div>
          <div style="font-size:13px;color:var(--txt3);line-height:1.7;">${d}</div>
        </div>`).join('')}
      </div>
      <div>
        <div style="font-size:13px;font-weight:600;color:var(--txt);margin-bottom:18px;">研究路径</div>
        <div style="display:flex;flex-direction:column;gap:0;">
          ${[
            ['理论溯源','跨学科文献综述：叙事哲学 + 认知科学 + HCI'],
            ['概念建构','提出三大原创概念 + 操作性定义'],
            ['架构设计','六层认知架构 + 分寸感引擎工程化'],
            ['场景实证','15个展演场景全链路脚本设计'],
            ['视觉呈现','双屏协同展演体系 + 视觉语言规范'],
          ].map(([t,d],i)=>`
          <div style="display:flex;gap:16px;padding:14px 0;border-bottom:1px solid var(--border);">
            <div style="font-family:var(--mono);font-size:11px;color:var(--txt3);min-width:20px;padding-top:2px;">0${i+1}</div>
            <div>
              <div style="font-size:13px;font-weight:500;color:var(--txt);margin-bottom:3px;">${t}</div>
              <div style="font-size:12px;color:var(--txt3);">${d}</div>
            </div>
          </div>`).join('')}
        </div>
      </div>
    </div>
  </div>
</div>`,

];

// ── merge & mount ──────────────────────────────────────────
const allSlides = [...slides, ...slides2];
const deck = document.getElementById('deck');
allSlides.forEach(html => { deck.insertAdjacentHTML('beforeend', html); });

// ── nav dots ──────────────────────────────────────────────
const nav = document.getElementById('nav');
const counter = document.getElementById('counter');
const progress = document.getElementById('progress');
const total = allSlides.length;
allSlides.forEach((_,i)=>{
  const d = document.createElement('div');
  d.className = 'dot';
  d.title = `Slide ${i+1}`;
  d.addEventListener('click', ()=>{ deck.children[i].scrollIntoView({behavior:'smooth'}); });
  nav.appendChild(d);
});

// ── intersection observer ─────────────────────────────────
const observer = new IntersectionObserver(entries=>{
  entries.forEach(e=>{
    if(e.isIntersecting){
      const idx = Array.from(deck.children).indexOf(e.target);
      document.querySelectorAll('.dot').forEach((d,i)=>d.classList.toggle('active',i===idx));
      counter.textContent = String(idx+1).padStart(2,'0')+' / '+String(total).padStart(2,'0');
      progress.style.width = ((idx+1)/total*100)+'%';
    }
  });
},{threshold:0.5});
Array.from(deck.children).forEach(s=>observer.observe(s));

// ── keyboard ──────────────────────────────────────────────
document.addEventListener('keydown', e=>{
  const slides = Array.from(deck.children);
  const cur = slides.findIndex(s=>{
    const r = s.getBoundingClientRect();
    return r.top >= -10 && r.top < window.innerHeight/2;
  });
  if((e.key==='ArrowDown'||e.key==='PageDown'||e.key===' ')&&cur<slides.length-1){
    e.preventDefault();slides[cur+1].scrollIntoView({behavior:'smooth'});
  }
  if((e.key==='ArrowUp'||e.key==='PageUp')&&cur>0){
    e.preventDefault();slides[cur-1].scrollIntoView({behavior:'smooth'});
  }
});
