// slides2.js — 10–17 + mount
const slides2 = [];

// ── 10 ELDERLY ────────────────────────────────────────────────────────────────
slides2.push(`<div class="slide" id="s10">
  <div class="inner" style="padding:64px 80px;">
    <div class="eyebrow">04 &nbsp;·&nbsp; Elderly Scenarios</div>
    <div class="h2" style="margin-bottom:8px;">老年场景</div>
    <div class="body" style="margin-bottom:40px;">三个核心场景 · 分寸感的边界探索</div>

    ${[
      {code:'S02',title:'老伴的录音',score:'0.74',action:'温和介入 · 询问授权 · 不擅自播放',quote:'Evans 不替你记住，它把记忆的开启权交给你。'},
      {code:'S04',title:'客厅意外',score:'0.92',action:'5 任务并行 · 机器人 + 家居 + 跨端通报',quote:'Evans 不是一个 AI，它是能调动整个家的大脑。'},
      {code:'S05',title:'诈骗电话拦截',score:'0.95',action:'声纹 + 号码 + 话术三联核验 · 不替用户挂断',quote:'分寸感不是不介入，是知道何时该介入。'},
    ].map(({code,title,score,action,quote})=>`
      <div class="row-item" style="padding:20px 0;align-items:flex-start;gap:28px;">
        <div class="tag" style="flex-shrink:0;margin-top:2px;">${code}</div>
        <div style="flex:1;">
          <div class="h3" style="font-size:15px;margin-bottom:6px;">${title}</div>
          <div class="body" style="font-size:13px;margin-bottom:8px;">${action}</div>
          <div class="body" style="font-size:13px;font-style:italic;color:var(--t3);">「${quote}」</div>
        </div>
        <div class="mono" style="font-size:32px;font-weight:700;color:var(--t1);letter-spacing:-0.04em;flex-shrink:0;">${score}</div>
      </div>
    `).join('')}
  </div>
</div>`);

// ── 11 YOUTH ──────────────────────────────────────────────────────────────────
slides2.push(`<div class="slide" id="s11">
  <div class="inner" style="padding:64px 80px;">
    <div class="eyebrow">04 &nbsp;·&nbsp; Youth Scenarios</div>
    <div class="h2" style="margin-bottom:8px;">青年场景</div>
    <div class="body" style="margin-bottom:40px;">高效协作 · 情绪支持 · 认知增强</div>

    <div style="display:grid;grid-template-columns:1fr 1fr;gap:0;">
      ${[
        {code:'S06',title:'会议救场',desc:'邮件+Slack+Notion+飞书 → 1页作战卡',quote:'Evans 是唯一能看到你完整工作流的存在。'},
        {code:'S07',title:'深夜加班中断',desc:'凌晨改稿大改率 84% · 闹钟+定时邮件+灯光切换',quote:'Evans 用你自己的数据，劝阻你伤害自己。'},
        {code:'S09',title:'决策副驾',desc:'213天数据 · 两条路径推演 · 决定权 100% 在你',quote:'Evans 用你过去 213 天，让你看清自己。'},
        {code:'S11',title:'纪念日提醒',desc:'深夜翻照片 23 张 · 情感锚点 · 4 选项行动卡',quote:'Evans 替你记住，那些不该忘记的人。'},
      ].map(({code,title,desc,quote},i)=>`
        <div style="padding:24px ${i%2===0?'32px 24px 0':'0 24px'};border-right:${i%2===0?'0.5px solid var(--line)':'none'};border-bottom:${i<2?'0.5px solid var(--line)':'none'};">
          <div style="display:flex;align-items:center;gap:10px;margin-bottom:10px;">
            <div class="tag">${code}</div>
            <div class="h3" style="font-size:14px;">${title}</div>
          </div>
          <div class="body" style="font-size:13px;margin-bottom:8px;">${desc}</div>
          <div class="body" style="font-size:12px;font-style:italic;color:var(--t3);">「${quote}」</div>
        </div>
      `).join('')}
    </div>
  </div>
</div>`);

// ── 12 MIDDLE + S15 ───────────────────────────────────────────────────────────
slides2.push(`<div class="slide" id="s12">
  <div class="inner" style="padding:64px 80px;">
    <div class="eyebrow">04 &nbsp;·&nbsp; Middle Age + Philosophy</div>
    <div class="h2" style="margin-bottom:8px;">中年关怀 · 哲学反思</div>
    <div class="body" style="margin-bottom:40px;"></div>

    <div style="display:grid;grid-template-columns:1fr 1fr;gap:0;margin-bottom:0;">
      <div style="padding:0 32px 0 0;border-right:0.5px solid var(--line);">
        <div class="tag" style="margin-bottom:14px;">S12 · 代际翻译</div>
        <div class="body" style="font-size:13px;margin-bottom:12px;">妈妈说的：「别老点外卖，血压会高！」</div>
        <div class="body" style="font-size:11px;color:var(--t3);margin-bottom:10px;">↓ Evans 翻译为</div>
        <div class="glass" style="padding:12px 16px;margin-bottom:12px;">
          <div class="body" style="font-size:13px;">妈妈这周自己不舒服，把焦虑投射到了你身上</div>
        </div>
        <div class="body" style="font-size:12px;font-style:italic;color:var(--t3);">「Evans 不替代亲情，它翻译亲情。」</div>
      </div>
      <div style="padding:0 0 0 32px;">
        <div class="tag" style="margin-bottom:14px;">S13 · 决策的第三选项</div>
        ${[
          ['A','全力去深圳','工作✓  家庭✗',false],
          ['B','留下陪孩子','工作⚠  家庭✓',false],
          ['C ★','家长会+晚班飞','工作✓  家庭✓',true],
        ].map(([l,opt,res,active])=>`
          <div style="display:flex;align-items:center;gap:16px;padding:10px 14px;border-radius:8px;margin-bottom:6px;background:${active?'rgba(255,255,255,0.06)':'transparent'};box-shadow:${active?'inset 0 1px 0 rgba(255,255,255,0.10)':'none'};">
            <span class="caption mono" style="min-width:20px;">${l}</span>
            <span class="body" style="font-size:13px;flex:1;">${opt}</span>
            <span class="caption" style="color:${active?'var(--t1)':'var(--t3)'};">${res}</span>
          </div>
        `).join('')}
        <div class="body" style="font-size:12px;font-style:italic;color:var(--t3);margin-top:10px;">「Evans 不告诉你怎么选，它告诉你还可以怎么选。」</div>
      </div>
    </div>

    <div class="hr" style="margin:28px 0 20px;"></div>

    <div style="display:flex;align-items:center;justify-content:space-between;">
      <div>
        <div class="tag" style="margin-bottom:10px;">S15 · 得体卸载 · 哲学终章</div>
        <div class="caption mono">评分 0.31 &nbsp;◀&nbsp; 阈值 0.50 &nbsp;→&nbsp; Evans 选择不说话</div>
        <div class="caption" style="margin-top:6px;">胸针不亮 · 无动线 · 完全的视觉留白 · 30 分钟后用户主动开口才亮起</div>
      </div>
      <div class="h2" style="font-size:28px;text-align:right;color:var(--t2);font-style:italic;letter-spacing:-0.02em;max-width:200px;line-height:1.3;">
        Evans<br>选择<br>不说话
      </div>
    </div>
  </div>
</div>`);

// ── 13 VISUAL LANGUAGE ────────────────────────────────────────────────────────
slides2.push(`<div class="slide" id="s13">
  <div class="inner grid2" style="padding:64px 80px;">
    <div style="z-index:1;">
      <div class="eyebrow">04 &nbsp;·&nbsp; Visual Language</div>
      <div class="h2" style="margin-bottom:8px;">视觉语言</div>
      <div class="body" style="margin-bottom:36px;">双屏协同 · 光效语义 · 克制用色</div>

      <div class="caption mono" style="margin-bottom:14px;letter-spacing:0.1em;">胸针光效语义</div>
      ${[
        ['暖白','常规在场 · 不介入'],
        ['暖白脉动','正在思考 · 主动回应'],
        ['橙色关切','风险 · 非紧急'],
        ['不亮（唯一）','得体卸载 · 主动沉默'],
      ].map(([label,desc],i)=>`
        <div class="row-item" style="padding:12px 0;">
          <div style="width:8px;height:8px;border-radius:50%;background:${i===3?'var(--bg2)':'rgba(255,255,255,'+(0.3+i*0.2)+')'};;box-shadow:${i<2?'0 0 10px rgba(255,255,255,0.3)':i===2?'0 0 8px rgba(255,159,10,0.5)':'none'};flex-shrink:0;"></div>
          <div>
            <div class="h3" style="font-size:13px;margin-bottom:3px;">${label}</div>
            <div class="caption">${desc}</div>
          </div>
        </div>
      `).join('')}

      <div class="hr" style="margin:16px 0;"></div>
      <div class="body" style="font-size:12px;color:var(--t3);">全程不出现红色 — 克制是 Evans 的视觉底色</div>
    </div>

    <div style="z-index:1;">
      <div class="caption mono" style="margin-bottom:16px;letter-spacing:0.1em;">调度动线规范</div>
      ${[
        ['实线','Evans 主动发起的指令'],
        ['浅线','设备间协作'],
        ['虚线','跨端通报'],
      ].map(([t,d])=>`
        <div style="display:flex;gap:16px;align-items:center;margin-bottom:20px;">
          <div style="width:44px;height:1.5px;background:rgba(255,255,255,0.55);flex-shrink:0;"></div>
          <div>
            <div class="body" style="font-size:13px;margin-bottom:3px;">${t}</div>
            <div class="caption">${d}</div>
          </div>
        </div>
      `).join('')}

      <div class="hr" style="margin:8px 0 20px;"></div>
      <div class="caption mono" style="margin-bottom:14px;letter-spacing:0.1em;">浮层规范</div>
      ${['始终叠加在原场景之上，不切换镜头','极简卡片 · 圆角 · 留白充足','跨端通报只展示源端发送过程'].map(s=>`
        <div style="display:flex;gap:10px;align-items:flex-start;margin-bottom:10px;">
          <div class="ndot" style="margin-top:5px;width:3px;height:3px;"></div>
          <span class="body" style="font-size:13px;">${s}</span>
        </div>
      `).join('')}
    </div>
  </div>
</div>`);

// ── 14 KNOWLEDGE GRAPH ────────────────────────────────────────────────────────
slides2.push(`<div class="slide" id="s14">
  <div class="inner" style="padding:56px 80px;">
    <div style="text-align:center;margin-bottom:28px;z-index:1;">
      <div class="eyebrow" style="margin-bottom:12px;">Knowledge Graph</div>
      <div class="h2">Evans 关系图谱</div>
      <div class="body" style="margin-top:8px;">以陈建国为核心节点 · 持续构建更新</div>
    </div>

    <div style="flex:1;display:flex;justify-content:center;align-items:center;z-index:1;">
      <svg viewBox="0 0 720 340" style="width:100%;max-height:280px;" xmlns="http://www.w3.org/2000/svg">
        <!-- edges -->
        <line x1="360" y1="170" x2="200" y2="80"  stroke="rgba(255,255,255,0.12)" stroke-width="1"/>
        <line x1="360" y1="170" x2="360" y2="50"  stroke="rgba(255,255,255,0.12)" stroke-width="1"/>
        <line x1="360" y1="170" x2="520" y2="80"  stroke="rgba(255,255,255,0.12)" stroke-width="1"/>
        <line x1="360" y1="170" x2="530" y2="260" stroke="rgba(255,255,255,0.10)" stroke-width="0.8"/>
        <line x1="360" y1="170" x2="360" y2="290" stroke="rgba(255,255,255,0.10)" stroke-width="0.8"/>
        <line x1="360" y1="170" x2="190" y2="260" stroke="rgba(255,255,255,0.10)" stroke-width="0.8"/>
        <line x1="360" y1="170" x2="80"  y2="130" stroke="rgba(255,255,255,0.05)" stroke-width="0.6" stroke-dasharray="4,4"/>
        <line x1="360" y1="170" x2="630" y2="90"  stroke="rgba(255,255,255,0.05)" stroke-width="0.6" stroke-dasharray="4,4"/>
        <line x1="360" y1="170" x2="640" y2="240" stroke="rgba(255,255,255,0.05)" stroke-width="0.6" stroke-dasharray="4,4"/>
        <line x1="360" y1="170" x2="70"  y2="250" stroke="rgba(255,255,255,0.05)" stroke-width="0.6" stroke-dasharray="4,4"/>

        <!-- core glow -->
        <circle cx="360" cy="170" r="28" fill="rgba(255,255,255,0.04)"/>
        <circle cx="360" cy="170" r="16" fill="rgba(255,255,255,0.07)"/>
        <circle cx="360" cy="170" r="10" fill="rgba(255,255,255,0.85)"/>
        <text x="360" y="169" text-anchor="middle" dominant-baseline="middle" fill="#07080a" font-size="9" font-family="Inter" font-weight="700">陈建国</text>

        <!-- inner nodes -->
        ${[
          [200,80,'陈兰','亡妻'],
          [360,50,'陈伟','儿子'],
          [520,80,'陈宝','孙子'],
          [530,260,'王大夫','社区医生'],
          [360,290,'老李','棋友'],
          [190,260,'老伴照片','记忆节点'],
        ].map(([x,y,name,role])=>`
          <circle cx="${x}" cy="${y}" r="14" fill="rgba(255,255,255,0.06)"/>
          <circle cx="${x}" cy="${y}" r="8" fill="rgba(255,255,255,0.55)"/>
          <text x="${x}" y="${y-1}" text-anchor="middle" dominant-baseline="middle" fill="rgba(255,255,255,0.9)" font-size="8" font-family="Inter" font-weight="600">${name}</text>
          <text x="${x}" y="${y+12}" text-anchor="middle" fill="rgba(255,255,255,0.28)" font-size="7" font-family="Inter">${role}</text>
        `).join('')}

        <!-- outer nodes -->
        ${[
          [80,130,'张大爷','候选'],
          [630,90,'反诈中心','系统'],
          [640,240,'家庭机器人','设备'],
          [70,250,'Evans 胸针','硬件'],
        ].map(([x,y,name,role])=>`
          <circle cx="${x}" cy="${y}" r="7" fill="transparent" stroke="rgba(255,255,255,0.15)" stroke-width="0.8"/>
          <text x="${x}" y="${y-1}" text-anchor="middle" dominant-baseline="middle" fill="rgba(255,255,255,0.3)" font-size="7.5" font-family="Inter">${name}</text>
          <text x="${x}" y="${y+11}" text-anchor="middle" fill="rgba(255,255,255,0.15)" font-size="6.5" font-family="Inter">${role}</text>
        `).join('')}
      </svg>
    </div>

    <div style="display:flex;justify-content:center;gap:24px;margin-top:8px;z-index:1;">
      ${[['实心白','核心用户'],['半透白','关系节点'],['虚框','系统/设备'],['虚线','候选节点']].map(([c,l])=>`
        <div style="display:flex;align-items:center;gap:6px;">
          <div style="width:6px;height:6px;border-radius:50%;background:rgba(255,255,255,0.5);"></div>
          <span class="caption">${l}</span>
        </div>
      `).join('')}
    </div>
  </div>
</div>`);

// ── 15 CONTRIBUTIONS ─────────────────────────────────────────────────────────
slides2.push(`<div class="slide" id="s15">
  <div class="inner" style="padding:64px 80px;">
    <div class="eyebrow">05 &nbsp;·&nbsp; Contributions</div>
    <div class="h2" style="margin-bottom:8px;">四项设计贡献</div>
    <div class="body" style="margin-bottom:40px;">理论 · 概念 · 系统 · 实践</div>

    ${[
      {n:'01',type:'理论贡献',title:'叙事认同在 HCI 领域的新应用',desc:'首次将叙事认同理论与生命故事模型引入 AI 交互设计，提出 AI 可作为用户叙事认同建构的外部支撑。'},
      {n:'02',type:'概念创新',title:'得体卸载（Proper Offloading）',desc:'在认知卸载理论基础上提出原创延伸：AI「沉默」本身是成熟形态的认知支持，不说话是经过计算的主动选择。'},
      {n:'03',type:'系统创新',title:'分寸感引擎与三维评分机制',desc:'提出三维（场景·情绪·关系）加权评分体系与阈值介入逻辑，实现 AI 精准判断介入级别。'},
      {n:'04',type:'实践贡献',title:'共生人格演化系统与隐私分层',desc:'8 维人格动态演化机制 + 四层隐私授权架构，支持跨端协同与长期共生关系建构。'},
    ].map(({n,type,title,desc},i)=>`
      <div class="row-item" style="padding:18px 0;align-items:flex-start;gap:24px;">
        <div style="display:flex;align-items:center;justify-content:center;width:28px;height:28px;border-radius:6px;border:0.5px solid var(--line);flex-shrink:0;margin-top:1px;">
          <span class="caption mono">${n}</span>
        </div>
        <div style="flex:1;">
          <div style="display:flex;align-items:center;gap:10px;margin-bottom:6px;">
            <div class="tag">${type}</div>
            <div class="h3" style="font-size:14px;">${title}</div>
          </div>
          <div class="body" style="font-size:13px;">${desc}</div>
        </div>
      </div>
    `).join('')}
  </div>
</div>`);

// ── 16 DISCUSSION ─────────────────────────────────────────────────────────────
slides2.push(`<div class="slide" id="s16">
  <div class="inner grid2" style="padding:64px 80px;">
    <div style="z-index:1;">
      <div class="eyebrow">05 &nbsp;·&nbsp; Discussion</div>
      <div class="h2" style="margin-bottom:8px;">边界讨论</div>
      <div class="body" style="margin-bottom:36px;">研究聚焦 · 刻意回避 · 未来方向</div>

      <div class="caption mono" style="margin-bottom:12px;letter-spacing:0.1em;">研究聚焦</div>
      ${['交互叙事与认知卸载框架','分寸感的判断机制设计','用户隐私分层授权','15 场景原型验证'].map(s=>`
        <div style="display:flex;align-items:center;gap:10px;margin-bottom:10px;">
          <div class="ndot live"></div>
          <span class="body" style="font-size:13px;">${s}</span>
        </div>
      `).join('')}

      <div class="hr" style="margin:20px 0;"></div>
      <div class="caption mono" style="margin-bottom:12px;letter-spacing:0.1em;color:var(--t3);">刻意回避</div>
      ${['取代人类关系的主张','AI 情感真实性的本体论','单纯技术实现路径'].map(s=>`
        <div style="display:flex;align-items:center;gap:10px;margin-bottom:10px;">
          <div class="ndot dim"></div>
          <span class="body" style="font-size:13px;color:var(--t3);">${s}</span>
        </div>
      `).join('')}
    </div>

    <div style="z-index:1;">
      <div class="caption mono" style="margin-bottom:16px;letter-spacing:0.1em;">未来研究方向</div>
      ${[
        ['用户研究验证','开展实际用户研究，对分寸感评分模型做效度检验'],
        ['多文化差异','探索不同文化背景下「分寸感」阈值的差异与可调节性'],
        ['伦理框架建构','联合伦理机构建立 AI 情感代理的设计准则'],
        ['技术实现路径','将分寸感引擎从概念原型推向可测试产品'],
      ].map(([t,d],i)=>`
        <div class="row-item" style="padding:14px 0;">
          <div style="width:2px;height:32px;background:rgba(255,255,255,${0.15+i*0.05});border-radius:2px;flex-shrink:0;align-self:flex-start;margin-top:2px;"></div>
          <div>
            <div class="h3" style="font-size:14px;margin-bottom:4px;">${t}</div>
            <div class="body" style="font-size:13px;">${d}</div>
          </div>
        </div>
      `).join('')}
    </div>
  </div>
</div>`);

// ── 17 CLOSING ────────────────────────────────────────────────────────────────
slides2.push(`<div class="slide" id="s17">
  <div class="glow" style="width:600px;height:600px;top:-100px;right:-100px;opacity:0.5;"></div>
  <div class="inner center" style="gap:0;">
    <div class="eyebrow" style="margin-bottom:36px;">Thank You</div>

    <div class="h1" style="font-size:clamp(80px,9vw,130px);font-weight:800;letter-spacing:-0.05em;margin-bottom:36px;">
      EVANS
    </div>

    <div style="display:flex;gap:52px;margin-bottom:52px;">
      ${[['共生','Symbiosis'],['分寸','Discretion'],['得体','Propriety']].map(([w,s])=>`
        <div style="display:flex;flex-direction:column;align-items:center;gap:8px;">
          <div class="h2" style="font-size:22px;font-weight:700;letter-spacing:-0.02em;">${w}</div>
          <div class="caption mono" style="letter-spacing:0.12em;">${s}</div>
        </div>
      `).join('')}
    </div>

    <div style="display:flex;align-items:center;gap:24px;margin-bottom:28px;">
      <div style="width:32px;height:0.5px;background:var(--line);"></div>
      <div class="caption mono" style="letter-spacing:0.1em;">感谢聆听，请多提宝贵意见</div>
      <div style="width:32px;height:0.5px;background:var(--line);"></div>
    </div>

    <div class="caption" style="color:var(--t4);">基于叙事认同重构与认知卸载的多模态交互系统设计研究 · 2026.06</div>
  </div>
</div>`);

// ══════════════════════════════════════════════
// MOUNT
// ══════════════════════════════════════════════
(function mount() {
  const all = [...slides, ...slides2];
  const deck = document.getElementById('deck');
  const navEl = document.getElementById('nav');
  const counter = document.getElementById('counter');

  all.forEach((html, i) => {
    const wrap = document.createElement('div');
    wrap.innerHTML = html.trim();
    deck.appendChild(wrap.firstElementChild);

    const dot = document.createElement('div');
    dot.className = 'dot' + (i === 0 ? ' active' : '');
    dot.addEventListener('click', () => deck.children[i].scrollIntoView({ behavior: 'smooth' }));
    navEl.appendChild(dot);
  });

  const observer = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (!e.isIntersecting) return;
      const idx = Array.from(deck.children).indexOf(e.target);
      if (idx < 0) return;
      Array.from(navEl.children).forEach((d, i) => d.classList.toggle('active', i === idx));
      counter.textContent = String(idx + 1).padStart(2, '0') + ' / ' + String(all.length).padStart(2, '0');
      localStorage.setItem('evans-deck-v2', idx);
    });
  }, { threshold: 0.5 });
  Array.from(deck.children).forEach(s => observer.observe(s));

  const saved = parseInt(localStorage.getItem('evans-deck-v2') || '0');
  if (saved > 0) setTimeout(() => deck.children[Math.min(saved, all.length - 1)].scrollIntoView({ behavior: 'auto' }), 50);

  document.addEventListener('keydown', e => {
    const slides = Array.from(deck.children);
    const cur = slides.findIndex(s => {
      const r = s.getBoundingClientRect();
      return r.top > -10 && r.top < 50;
    });
    if (['ArrowDown','PageDown',' '].includes(e.key)) { e.preventDefault(); slides[Math.min(cur+1,slides.length-1)].scrollIntoView({behavior:'smooth'}); }
    if (['ArrowUp','PageUp'].includes(e.key)) { e.preventDefault(); slides[Math.max(cur-1,0)].scrollIntoView({behavior:'smooth'}); }
  });
})();
