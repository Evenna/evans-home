// slides2.js — Slides 10–17 + mount logic
const slides2 = [];

// ── 10 ELDERLY SCENES ─────────────────────────────────────────────────────────
slides2.push(`
<div class="slide" id="s10">
  <div class="glow-tl"></div>
  <div class="slide-inner" style="position:relative;z-index:1;">
    <div class="chapter-tag">04 · Elderly Scenarios</div>
    <div class="slide-title">老年场景聚焦</div>

    <div style="display:flex;flex-direction:column;gap:16px;flex:1;">
      ${[
        {code:'S02',title:'老伴的录音',core:'长期人格记忆 · 分寸感判断',score:'0.74',action:'温和介入 + 询问授权 + 不擅自播放',quote:'Evans 不替你记住，它把记忆的开启权交给你。',color:'cyan'},
        {code:'S04',title:'客厅意外',core:'紧急响应 · 多设备协同 · 叙事化通报',score:'0.92',action:'跳过阈值 · 5 任务并行 · 机器人+家居+跨端通报',quote:'Evans 不是一个 AI，它是能调动整个家的大脑。',color:'orange'},
        {code:'S05',title:'诈骗电话拦截',core:'声纹核验 · 例外介入判断',score:'0.95',action:'分级介入 · 声纹+号码+话术三联核验 · 不替用户挂断',quote:'分寸感不是「不介入」，是「知道何时该介入」。',color:'blue'},
      ].map(({code,title,core,score,action,quote,color})=>`
        <div class="card" style="border-left:1.5px solid var(--${color});display:grid;grid-template-columns:1fr auto;gap:24px;align-items:center;">
          <div>
            <div style="display:flex;align-items:center;gap:12px;margin-bottom:8px;">
              <div class="badge badge-${color}">${code}</div>
              <span style="font-size:15px;font-weight:700;color:var(--txt);">${title}</span>
              <span style="font-size:11px;color:var(--txt3);">${core}</span>
            </div>
            <div style="font-size:12px;color:var(--txt2);margin-bottom:6px;">${action}</div>
            <div style="font-size:12px;color:var(--${color});font-style:italic;">「${quote}」</div>
          </div>
          <div style="text-align:right;">
            <div class="mono ${color}" style="font-size:28px;font-weight:800;letter-spacing:-0.03em;">${score}</div>
            <div class="mono" style="font-size:9px;color:var(--txt3);letter-spacing:0.1em;">SCORE</div>
          </div>
        </div>
      `).join('')}
    </div>
  </div>
</div>
`);

// ── 11 YOUTH SCENES ───────────────────────────────────────────────────────────
slides2.push(`
<div class="slide" id="s11">
  <div class="glow-tl"></div>
  <div class="slide-inner" style="position:relative;z-index:1;">
    <div class="chapter-tag">04 · Youth Scenarios</div>
    <div class="slide-title">青年场景聚焦</div>

    <div style="display:grid;grid-template-columns:1fr 1fr;gap:16px;flex:1;">
      ${[
        {code:'S06',title:'会议救场',desc:'邮件+Slack+Notion+飞书+日历 → 1页作战卡',quote:'Evans 是唯一能跨越所有工具看到你完整工作流的存在。',color:'blue'},
        {code:'S07',title:'深夜加班中断',desc:'凌晨改稿大改率 84% · 闹钟+定时邮件+灯光切换',quote:'Evans 用你自己的数据，劝阻你伤害你自己。',color:'orange'},
        {code:'S09',title:'决策副驾',desc:'213天数据 · 两条路径推演 · 决定权 100% 在你',quote:'Evans 用你过去 213 天的数据，让你看清自己。',color:'green'},
        {code:'S11',title:'纪念日提醒',desc:'小雨凌晨翻照片 23 张 · 情感锚点 · 4 选项行动卡',quote:'Evans 替你记住，那些你不该忘记的人。',color:'purple'},
      ].map(({code,title,desc,quote,color})=>`
        <div class="card" style="border-top:1.5px solid var(--${color});display:flex;flex-direction:column;gap:10px;">
          <div style="display:flex;align-items:center;gap:10px;">
            <div class="badge badge-${color}">${code}</div>
            <span style="font-size:14px;font-weight:700;color:var(--txt);">${title}</span>
          </div>
          <div style="font-size:12px;color:var(--txt2);flex:1;line-height:1.6;">${desc}</div>
          <div style="height:0.5px;background:var(--border);"></div>
          <div style="font-size:11px;color:var(--${color});font-style:italic;line-height:1.5;">「${quote}」</div>
        </div>
      `).join('')}
    </div>
  </div>
</div>
`);

// ── 12 MIDDLE + PHILOSOPHY ────────────────────────────────────────────────────
slides2.push(`
<div class="slide" id="s12">
  <div class="glow-tl"></div>
  <div class="slide-inner" style="position:relative;z-index:1;">
    <div class="chapter-tag">04 · Middle Age + Philosophy</div>
    <div class="slide-title">中年关怀 · 哲学反思</div>

    <div style="display:grid;grid-template-columns:1fr 1fr;gap:20px;margin-bottom:20px;">
      <!-- S12 -->
      <div class="card" style="border-top:1.5px solid var(--cyan);">
        <div style="display:flex;align-items:center;gap:10px;margin-bottom:14px;">
          <div class="badge badge-cyan">S12</div>
          <span style="font-size:14px;font-weight:700;color:var(--txt);">代际翻译</span>
        </div>
        <div style="font-size:11px;color:var(--txt3);margin-bottom:8px;">妈妈说的：「别老点外卖，血压会高！」</div>
        <div style="font-size:11px;color:var(--txt3);margin-bottom:4px;">↓ Evans 翻译</div>
        <div style="font-size:13px;color:var(--txt);padding:10px;background:rgba(0,199,255,0.04);border-radius:6px;border:0.5px solid rgba(0,199,255,0.12);margin-bottom:10px;">「妈妈这周自己不舒服，把焦虑投射到了你身上」</div>
        <div style="font-size:11px;color:var(--cyan);font-style:italic;">「Evans 不替代亲情，它翻译亲情。」</div>
      </div>

      <!-- S13 -->
      <div class="card" style="border-top:1.5px solid var(--orange);">
        <div style="display:flex;align-items:center;gap:10px;margin-bottom:14px;">
          <div class="badge badge-orange">S13</div>
          <span style="font-size:14px;font-weight:700;color:var(--txt);">决策的第三选项</span>
        </div>
        ${[
          ['A','全力去深圳','工作✓  家庭✗','txt3'],
          ['B','留下陪孩子','工作⚠  家庭✓','txt3'],
          ['C ★','家长会+晚班飞','工作✓  家庭✓','orange'],
        ].map(([l,opt,check,c])=>`
          <div style="display:flex;align-items:center;gap:12px;padding:8px 10px;border-radius:6px;margin-bottom:6px;background:rgba(255,255,255,0.02);border:0.5px solid var(--${c==='txt3'?'border':'orange'});${c==='orange'?'background:rgba(255,159,10,0.04);':''}">
            <span class="mono ${c}" style="font-size:11px;font-weight:600;min-width:18px;">${l}</span>
            <span style="font-size:12px;color:var(--txt);flex:1;">${opt}</span>
            <span style="font-size:11px;color:var(--${c});">${check}</span>
          </div>
        `).join('')}
        <div style="font-size:11px;color:var(--orange);font-style:italic;margin-top:8px;">「Evans 不告诉你怎么选，它告诉你你还可以怎么选。」</div>
      </div>
    </div>

    <!-- S15 -->
    <div style="padding:20px 24px;background:rgba(191,90,242,0.04);border:0.5px solid rgba(191,90,242,0.15);border-radius:10px;display:grid;grid-template-columns:1fr auto;gap:24px;align-items:center;">
      <div>
        <div style="display:flex;align-items:center;gap:12px;margin-bottom:10px;">
          <div class="badge badge-purple">S15</div>
          <span style="font-size:14px;font-weight:700;color:var(--txt);">得体卸载 · 哲学终章</span>
        </div>
        <div class="mono" style="font-size:11px;color:var(--txt3);margin-bottom:6px;">评分 0.31 &nbsp;◀&nbsp; 阈值 0.50 &nbsp;→&nbsp; Evans 选择不说话</div>
        <div style="font-size:11px;color:var(--txt3);">胸针不亮 · 无动线 · 完全的视觉留白 · 30 分钟后用户主动开口才亮起</div>
      </div>
      <div style="font-size:22px;font-weight:800;color:var(--purple);letter-spacing:-0.02em;text-align:right;line-height:1.2;">Evans<br>选择<br>不说话</div>
    </div>
  </div>
</div>
`);

// ── 13 VISUAL LANGUAGE ────────────────────────────────────────────────────────
slides2.push(`
<div class="slide" id="s13">
  <div class="glow-tl"></div>
  <div class="slide-inner" style="position:relative;z-index:1;display:grid;grid-template-columns:1fr 1fr;gap:48px;align-items:start;">
    <div>
      <div class="chapter-tag">04 · Visual Language</div>
      <div class="slide-title">双屏协同<br>视觉设计语言</div>
      <div style="margin-top:32px;">
        <div class="mono dim" style="font-size:10px;letter-spacing:0.1em;margin-bottom:14px;">胸针光效语义系统</div>
        <div style="display:flex;flex-direction:column;gap:12px;">
          ${[
            ['#f2f2f7','暖白光','常规在场·不介入'],
            ['#f2f2f7','暖白脉动','正在思考·主动回应'],
            ['#ff9f0a','橙色关切','风险·非紧急'],
            ['#ff9f0a','黄色警示','例外介入·诈骗拦截'],
            ['#3a3e47','不亮（唯一例外）','得体卸载·主动沉默'],
          ].map(([color,label,desc])=>`
            <div style="display:flex;align-items:center;gap:12px;">
              <div style="width:10px;height:10px;border-radius:50%;background:${color};box-shadow:${color!=='#3a3e47'?'0 0 8px '+color:'none'};flex-shrink:0;"></div>
              <span style="font-size:12px;color:var(--txt);min-width:100px;">${label}</span>
              <span style="font-size:11px;color:var(--txt3);">${desc}</span>
            </div>
          `).join('')}
        </div>
        <div style="margin-top:16px;font-size:11px;color:var(--orange);font-style:italic;">⚠ 全程不出现红色 — 克制是 Evans 的视觉底色</div>
      </div>
    </div>

    <div style="padding-top:72px;">
      <div class="mono dim" style="font-size:10px;letter-spacing:0.1em;margin-bottom:14px;">调度动线蓝色梯度规范</div>
      <div style="display:flex;flex-direction:column;gap:16px;">
        ${[
          ['主蓝（饱和）','Evans 主动发起的指令','0a84ff'],
          ['浅蓝','设备-设备之间的协作','00c7ff'],
          ['深蓝','跨设备/跨端通报','4a90d9'],
        ].map(([type,rule,hex])=>`
          <div style="display:flex;gap:16px;align-items:center;">
            <div style="width:40px;height:2px;background:#${hex};border-radius:2px;box-shadow:0 0 8px #${hex};flex-shrink:0;"></div>
            <div>
              <div style="font-size:12px;font-weight:600;color:#${hex};margin-bottom:3px;">${type}</div>
              <div style="font-size:11px;color:var(--txt3);">${rule}</div>
            </div>
          </div>
        `).join('')}
      </div>

      <div style="margin-top:28px;">
        <div class="mono dim" style="font-size:10px;letter-spacing:0.1em;margin-bottom:12px;">虚拟工具浮层规范</div>
        ${['始终叠加在原场景之上，不切换镜头','Notion 极简卡片 · 圆角 · 留白充足','跨端通报只展示源端发送过程'].map(r=>`
          <div style="display:flex;gap:10px;align-items:flex-start;margin-bottom:8px;">
            <div class="node" style="background:var(--blue);margin-top:4px;width:4px;height:4px;"></div>
            <span style="font-size:12px;color:var(--txt2);">${r}</span>
          </div>
        `).join('')}
      </div>
    </div>
  </div>
</div>
`);

// ── 14 KNOWLEDGE GRAPH ────────────────────────────────────────────────────────
slides2.push(`
<div class="slide" id="s14">
  <canvas class="star-canvas" id="stars14"></canvas>
  <div class="glow-center"></div>
  <div class="slide-inner" style="position:relative;z-index:1;padding:40px 60px;">
    <div style="text-align:center;margin-bottom:24px;">
      <div class="chapter-tag" style="justify-content:center;">Knowledge Graph</div>
      <div class="slide-title" style="text-align:center;">Evans 关系图谱</div>
      <div class="slide-sub" style="text-align:center;">以陈建国为核心节点，Evans 持续构建、更新关系拓扑</div>
    </div>

    <!-- SVG graph -->
    <div style="flex:1;display:flex;justify-content:center;align-items:center;position:relative;">
      <svg id="kgraph" viewBox="0 0 700 360" style="width:100%;max-height:300px;" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <filter id="glow-blue">
            <feGaussianBlur stdDeviation="3" result="blur"/>
            <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
          </filter>
          <filter id="glow-cyan">
            <feGaussianBlur stdDeviation="2" result="blur"/>
            <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
          </filter>
        </defs>

        <!-- Edges -->
        <line x1="350" y1="180" x2="190" y2="90" stroke="#0a84ff" stroke-width="0.8" opacity="0.35"/>
        <line x1="350" y1="180" x2="350" y2="60" stroke="#30d158" stroke-width="0.8" opacity="0.35"/>
        <line x1="350" y1="180" x2="510" y2="90" stroke="#30d158" stroke-width="0.8" opacity="0.35"/>
        <line x1="350" y1="180" x2="520" y2="270" stroke="#00c7ff" stroke-width="0.8" opacity="0.35"/>
        <line x1="350" y1="180" x2="350" y2="300" stroke="#00c7ff" stroke-width="0.8" opacity="0.35"/>
        <line x1="350" y1="180" x2="180" y2="270" stroke="#bf5af2" stroke-width="0.8" opacity="0.35"/>
        <!-- outer -->
        <line x1="350" y1="180" x2="80" y2="130" stroke="#6b7280" stroke-width="0.5" opacity="0.25" stroke-dasharray="4,4"/>
        <line x1="350" y1="180" x2="620" y2="80" stroke="#ff9f0a" stroke-width="0.5" opacity="0.25"/>
        <line x1="350" y1="180" x2="640" y2="240" stroke="#0a84ff" stroke-width="0.5" opacity="0.2"/>
        <line x1="350" y1="180" x2="70" y2="260" stroke="#00c7ff" stroke-width="0.5" opacity="0.2"/>

        <!-- Core node glow -->
        <circle cx="350" cy="180" r="32" fill="#0a84ff" opacity="0.08"/>
        <circle cx="350" cy="180" r="20" fill="#0a84ff" opacity="0.15"/>
        <circle cx="350" cy="180" r="13" fill="#0a84ff" filter="url(#glow-blue)"/>
        <text x="350" y="184" text-anchor="middle" dominant-baseline="middle" fill="#f0f1f3" font-size="10" font-family="Inter" font-weight="700">陈建国</text>

        <!-- Inner nodes -->
        ${[
          [190,90,'陈兰','亡妻','bf5af2'],
          [350,60,'陈伟','儿子','30d158'],
          [510,90,'陈宝','孙子','30d158'],
          [520,270,'王大夫','社区医生','00c7ff'],
          [350,300,'老李','邻居棋友','00c7ff'],
          [180,270,'老伴照片','记忆节点','bf5af2'],
        ].map(([x,y,name,role,c])=>`
          <circle cx="${x}" cy="${y}" r="16" fill="#${c}" opacity="0.12"/>
          <circle cx="${x}" cy="${y}" r="10" fill="#${c}" filter="url(#glow-cyan)"/>
          <text x="${x}" y="${y-1}" text-anchor="middle" dominant-baseline="middle" fill="#eeeef0" font-size="8.5" font-family="Inter" font-weight="600">${name}</text>
          <text x="${x}" y="${y+10}" text-anchor="middle" fill="#6b7280" font-size="7" font-family="Inter">${role}</text>
        `).join('')}

        <!-- Outer nodes -->
        ${[
          [80,130,'张大爷','候选节点','6b7280',true],
          [620,80,'反诈中心','系统节点','ff9f0a',false],
          [640,240,'家庭机器人','设备节点','0a84ff',false],
          [70,260,'Evans 胸针','核心硬件','00c7ff',false],
        ].map(([x,y,name,role,c,dash])=>`
          <circle cx="${x}" cy="${y}" r="8" fill="transparent" stroke="#${c}" stroke-width="${dash?'0.8':1}" stroke-dasharray="${dash?'3,3':'none'}" opacity="0.6"/>
          <text x="${x}" y="${y-1}" text-anchor="middle" dominant-baseline="middle" fill="#6b7280" font-size="8" font-family="Inter">${name}</text>
          <text x="${x}" y="${y+10}" text-anchor="middle" fill="#3a3e47" font-size="6.5" font-family="Inter">${role}</text>
        `).join('')}
      </svg>
    </div>

    <!-- Legend -->
    <div style="display:flex;justify-content:center;gap:24px;margin-top:8px;">
      ${[
        ['var(--blue)','核心用户'],
        ['var(--green)','家庭成员'],
        ['var(--purple)','记忆节点'],
        ['var(--cyan)','社交节点'],
        ['var(--orange)','系统节点'],
        ['var(--txt3)','候选节点'],
      ].map(([c,l])=>`
        <div style="display:flex;align-items:center;gap:6px;">
          <div style="width:6px;height:6px;border-radius:50%;background:${c};"></div>
          <span style="font-size:10px;color:var(--txt3);">${l}</span>
        </div>
      `).join('')}
    </div>
  </div>
</div>
`);

// ── 15 CONTRIBUTIONS ─────────────────────────────────────────────────────────
slides2.push(`
<div class="slide" id="s15">
  <div class="glow-tl"></div>
  <div class="slide-inner" style="position:relative;z-index:1;">
    <div class="chapter-tag">05 · Contributions</div>
    <div class="slide-title">四项设计贡献</div>
    <div class="slide-sub">理论 · 概念 · 系统 · 实践</div>

    <div style="display:grid;grid-template-columns:1fr 1fr;gap:16px;flex:1;">
      ${[
        {n:'01',type:'理论贡献',title:'叙事认同在 HCI 领域的新应用',desc:'首次将叙事认同理论与生命故事模型引入 AI 交互系统设计，提出 AI 系统可作为用户叙事认同建构的外部支撑。',color:'blue'},
        {n:'02',type:'概念创新',title:'得体卸载（Proper Offloading）',desc:'在认知卸载理论基础上提出原创延伸概念：AI「沉默」本身是成熟形态的认知支持，不说话是经过计算的主动选择。',color:'cyan'},
        {n:'03',type:'系统创新',title:'分寸感引擎与三维评分机制',desc:'提出三维（场景·情绪·关系）加权评分体系与阈值介入逻辑，实现 AI 在不同场景下的精准介入级别判断。',color:'green'},
        {n:'04',type:'实践贡献',title:'共生人格演化系统与隐私分层',desc:'基于用户长期行为反馈的 8 维人格动态演化机制，以及支持跨端协同的四层隐私授权架构。',color:'orange'},
      ].map(({n,type,title,desc,color})=>`
        <div class="card" style="border-top:1.5px solid var(--${color});display:flex;flex-direction:column;gap:12px;">
          <div style="display:flex;align-items:center;gap:12px;">
            <div style="width:28px;height:28px;border-radius:6px;border:1px solid var(--${color});display:flex;align-items:center;justify-content:center;flex-shrink:0;">
              <span class="mono ${color}" style="font-size:12px;font-weight:700;">${n}</span>
            </div>
            <div>
              <div class="mono" style="font-size:9px;color:var(--txt3);letter-spacing:0.1em;margin-bottom:3px;">${type}</div>
              <div style="font-size:13px;font-weight:700;color:var(--txt);">${title}</div>
            </div>
          </div>
          <div style="font-size:12px;color:var(--txt2);line-height:1.7;">${desc}</div>
        </div>
      `).join('')}
    </div>
  </div>
</div>
`);

// ── 16 DISCUSSION ─────────────────────────────────────────────────────────────
slides2.push(`
<div class="slide" id="s16">
  <div class="glow-tl"></div>
  <div class="slide-inner" style="position:relative;z-index:1;display:grid;grid-template-columns:1fr 1fr;gap:48px;align-items:start;">
    <div>
      <div class="chapter-tag">05 · Discussion</div>
      <div class="slide-title">边界讨论与<br>未来方向</div>

      <div style="margin-top:32px;display:flex;flex-direction:column;gap:16px;">
        <div>
          <div class="mono" style="font-size:10px;color:var(--green);letter-spacing:0.1em;margin-bottom:10px;">研究聚焦</div>
          ${['交互叙事与认知卸载框架','分寸感的判断机制设计','用户隐私分层授权','15 场景原型验证'].map(s=>`
            <div style="display:flex;align-items:center;gap:10px;margin-bottom:8px;">
              <div class="node" style="background:var(--green);width:4px;height:4px;"></div>
              <span style="font-size:12px;color:var(--txt2);">${s}</span>
            </div>
          `).join('')}
        </div>
        <div class="hr"></div>
        <div>
          <div class="mono" style="font-size:10px;color:var(--txt3);letter-spacing:0.1em;margin-bottom:10px;">刻意回避</div>
          ${['取代人类关系的主张','AI 情感真实性的本体论','单纯技术实现路径'].map(s=>`
            <div style="display:flex;align-items:center;gap:10px;margin-bottom:8px;">
              <div class="node" style="background:var(--txt3);width:4px;height:4px;"></div>
              <span style="font-size:12px;color:var(--txt3);">${s}</span>
            </div>
          `).join('')}
        </div>
      </div>
    </div>

    <div style="padding-top:72px;">
      <div class="mono dim" style="font-size:10px;letter-spacing:0.1em;margin-bottom:16px;">未来研究方向</div>
      <div style="display:flex;flex-direction:column;gap:14px;">
        ${[
          ['用户研究验证','开展实际用户参与的设计研究，对分寸感评分模型做效度检验','blue'],
          ['多文化差异','探索不同文化背景下「分寸感」阈值的差异性与可调节性','cyan'],
          ['伦理框架建构','联合伦理审查机构建立 AI 情感代理的设计准则','green'],
          ['技术实现路径','与工程团队协作将分寸感引擎从概念原型推向可测试产品','orange'],
        ].map(([t,d,c])=>`
          <div style="display:flex;gap:14px;align-items:flex-start;">
            <div style="width:2px;height:36px;background:var(--${c});flex-shrink:0;margin-top:2px;"></div>
            <div>
              <div style="font-size:12px;font-weight:600;color:var(--${c});margin-bottom:4px;">${t}</div>
              <div style="font-size:11px;color:var(--txt3);line-height:1.5;">${d}</div>
            </div>
          </div>
        `).join('')}
      </div>
    </div>
  </div>
</div>
`);

// ── 17 CLOSING ────────────────────────────────────────────────────────────────
slides2.push(`
<div class="slide" id="s17">
  <canvas class="star-canvas" id="stars17"></canvas>
  <div class="glow-center"></div>
  <div style="display:flex;flex-direction:column;align-items:center;justify-content:center;height:100%;gap:0;text-align:center;position:relative;z-index:1;">
    <div class="mono dim" style="font-size:10px;letter-spacing:0.2em;margin-bottom:40px;">THANK YOU</div>

    <div style="font-size:clamp(64px,7vw,100px);font-weight:800;letter-spacing:-0.04em;line-height:0.92;color:var(--txt);position:relative;">
      EVANS
      <div style="position:absolute;inset:0;background:radial-gradient(ellipse at 50% 60%, rgba(10,132,255,0.2) 0%, transparent 65%);pointer-events:none;filter:blur(16px);"></div>
    </div>

    <div style="display:flex;gap:48px;margin-top:48px;">
      ${[
        ['共生','Symbiosis','blue'],
        ['分寸','Discretion','cyan'],
        ['得体','Propriety','green'],
      ].map(([w,s,c])=>`
        <div style="display:flex;flex-direction:column;align-items:center;gap:8px;">
          <div style="font-size:24px;font-weight:800;letter-spacing:-0.02em;color:var(--${c});text-shadow:0 0 20px var(--${c});">${w}</div>
          <div class="mono" style="font-size:9px;letter-spacing:0.15em;color:var(--txt3);">${s}</div>
        </div>
      `).join('')}
    </div>

    <div style="margin-top:56px;width:40px;height:0.5px;background:var(--border2);"></div>

    <div style="margin-top:24px;font-size:14px;color:var(--txt2);">感谢各位老师的聆听与指导，请多提宝贵意见</div>

    <div class="mono" style="margin-top:12px;font-size:10px;color:var(--txt3);letter-spacing:0.08em;">
      基于叙事认同重构与认知卸载的多模态交互系统设计研究 · 2026.06
    </div>
  </div>
</div>
`);

// ════════════════════════════════════════════════════
// MOUNT + STARS + KEYBOARD
// ════════════════════════════════════════════════════
(function mount() {
  const all = [...slides, ...slides2];
  const deck = document.getElementById('deck');
  const navEl = document.getElementById('nav');
  const counter = document.getElementById('counter');
  const total = all.length;

  // Insert slides
  all.forEach((html, i) => {
    const wrapper = document.createElement('div');
    wrapper.innerHTML = html.trim();
    const slide = wrapper.firstElementChild;
    deck.appendChild(slide);

    // Nav dot
    const dot = document.createElement('div');
    dot.className = 'dot' + (i === 0 ? ' active' : '');
    dot.title = `Slide ${i + 1}`;
    dot.addEventListener('click', () => {
      deck.children[i].scrollIntoView({ behavior: 'smooth' });
    });
    navEl.appendChild(dot);
  });

  // Stars canvas
  function drawStars(canvasId) {
    const c = document.getElementById(canvasId);
    if (!c) return;
    c.width = c.parentElement.offsetWidth;
    c.height = c.parentElement.offsetHeight;
    const ctx = c.getContext('2d');
    for (let i = 0; i < 60; i++) {
      const x = Math.random() * c.width;
      const y = Math.random() * c.height;
      const r = Math.random() > 0.85 ? 1.2 : 0.5;
      const a = Math.random() * 0.5 + 0.1;
      ctx.beginPath();
      ctx.arc(x, y, r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${Math.random() > 0.5 ? '0,199,255' : '10,132,255'},${a})`;
      ctx.fill();
    }
  }
  setTimeout(() => {
    drawStars('stars01');
    drawStars('stars14');
    drawStars('stars17');
  }, 100);

  // IntersectionObserver
  const observer = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        const idx = Array.from(deck.children).indexOf(e.target);
        if (idx < 0) return;
        // Dots
        Array.from(navEl.children).forEach((d, i) => {
          d.classList.toggle('active', i === idx);
        });
        // Counter
        counter.textContent = String(idx + 1).padStart(2, '0') + ' / ' + String(total).padStart(2, '0');
        // localStorage
        localStorage.setItem('evans-deck-slide', idx);
      }
    });
  }, { threshold: 0.5 });

  Array.from(deck.children).forEach(s => observer.observe(s));

  // Restore position
  const saved = parseInt(localStorage.getItem('evans-deck-slide') || '0');
  if (saved > 0 && saved < total) {
    setTimeout(() => {
      deck.children[saved].scrollIntoView({ behavior: 'auto' });
    }, 50);
  }

  // Keyboard
  document.addEventListener('keydown', e => {
    const slides = Array.from(deck.children);
    const current = slides.findIndex(s => {
      const rect = s.getBoundingClientRect();
      return rect.top >= -10 && rect.top <= 10;
    });
    if (e.key === 'ArrowDown' || e.key === 'PageDown' || e.key === ' ') {
      e.preventDefault();
      const next = Math.min(current + 1, slides.length - 1);
      slides[next].scrollIntoView({ behavior: 'smooth' });
    }
    if (e.key === 'ArrowUp' || e.key === 'PageUp') {
      e.preventDefault();
      const prev = Math.max(current - 1, 0);
      slides[prev].scrollIntoView({ behavior: 'smooth' });
    }
  });
})();
