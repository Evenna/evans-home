// slides.js — Slides 01–09
const slides = [];

// ── 01 COVER ──────────────────────────────────────────────────────────────────
slides.push(`
<div class="slide" id="s01">
  <canvas class="star-canvas" id="stars01"></canvas>
  <div class="glow-center"></div>
  <div style="display:flex;flex-direction:column;align-items:center;justify-content:center;height:100%;gap:0;text-align:center;position:relative;z-index:1;">
    <div class="mono dim" style="font-size:10px;letter-spacing:0.2em;margin-bottom:48px;">GRADUATION DEFENSE · 2026</div>

    <div style="font-size:clamp(72px,8vw,120px);font-weight:800;letter-spacing:-0.04em;line-height:0.92;color:var(--txt);position:relative;">
      EVANS
      <div style="position:absolute;inset:0;background:radial-gradient(ellipse at 50% 60%, rgba(10,132,255,0.25) 0%, transparent 70%);pointer-events:none;filter:blur(20px);"></div>
    </div>

    <div style="margin-top:36px;font-size:14px;color:var(--txt2);letter-spacing:0.05em;line-height:2;">
      基于叙事认同重构与认知卸载的<br>多模态交互系统设计研究
    </div>

    <div style="margin-top:48px;width:40px;height:0.5px;background:var(--border2);"></div>

    <div class="mono" style="margin-top:24px;font-size:10px;color:var(--txt3);letter-spacing:0.12em;">
      指导教师：XXX 教授 &nbsp;·&nbsp; XXX 学院 &nbsp;·&nbsp; 2026.06
    </div>

    <div style="margin-top:60px;display:flex;gap:36px;align-items:center;">
      <div style="display:flex;flex-direction:column;align-items:center;gap:8px;">
        <div class="node" style="background:var(--blue);box-shadow:0 0 10px var(--blue);"></div>
        <div class="mono dim" style="font-size:9px;letter-spacing:0.1em;">感知·记忆</div>
      </div>
      <div style="display:flex;flex-direction:column;align-items:center;gap:8px;">
        <div class="node" style="background:var(--cyan);box-shadow:0 0 10px var(--cyan);"></div>
        <div class="mono dim" style="font-size:9px;letter-spacing:0.1em;">分寸感引擎</div>
      </div>
      <div style="display:flex;flex-direction:column;align-items:center;gap:8px;">
        <div class="node" style="background:var(--green);box-shadow:0 0 10px var(--green);"></div>
        <div class="mono dim" style="font-size:9px;letter-spacing:0.1em;">共生人格</div>
      </div>
    </div>
  </div>
</div>
`);

// ── 02 TOC ────────────────────────────────────────────────────────────────────
slides.push(`
<div class="slide" id="s02">
  <div class="glow-tl"></div>
  <div class="slide-inner" style="padding:64px 80px;display:grid;grid-template-columns:1fr 1fr;gap:80px;align-items:center;">
    <div style="position:relative;z-index:1;">
      <div class="chapter-tag">Overview</div>
      <div class="slide-title">答辩结构</div>
      <div class="slide-sub">10 min defense</div>

      <div style="display:flex;flex-direction:column;gap:20px;">
        ${[
          ['01','研究背景与问题','AI 现状 · 三大缺陷 · 研究问题','blue'],
          ['02','理论框架与概念创新','叙事认同 · 认知卸载 · 得体卸载','cyan'],
          ['03','系统架构设计','六层认知架构 · 分寸感引擎 · 共生人格','green'],
          ['04','15 场景全景展演','老年 · 青年 · 中年 · 哲学反思','orange'],
          ['05','设计贡献与边界讨论','四项原创贡献 · 局限 · 未来方向','purple'],
        ].map(([n,t,s,c])=>`
          <div style="display:flex;gap:20px;align-items:flex-start;">
            <div class="mono ${c}" style="font-size:11px;font-weight:600;padding-top:2px;min-width:24px;">${n}</div>
            <div>
              <div style="font-size:14px;font-weight:600;color:var(--txt);margin-bottom:3px;">${t}</div>
              <div style="font-size:11px;color:var(--txt3);">${s}</div>
            </div>
          </div>
        `).join('')}
      </div>
    </div>

    <div style="position:relative;z-index:1;display:flex;flex-direction:column;gap:12px;">
      <div class="mono dim" style="font-size:10px;letter-spacing:0.1em;margin-bottom:8px;">时间分配</div>
      ${[
        ['研究背景','1\'30"',20,'blue'],
        ['理论框架','1\'30"',20,'cyan'],
        ['系统架构','2\'00"',27,'green'],
        ['场景展演','3\'00"',40,'orange'],
        ['设计贡献','2\'00"',27,'purple'],
      ].map(([l,t,pct,c])=>`
        <div>
          <div style="display:flex;justify-content:space-between;margin-bottom:6px;">
            <span style="font-size:12px;color:var(--txt2);">${l}</span>
            <span class="mono ${c}" style="font-size:11px;">${t}</span>
          </div>
          <div style="height:2px;background:var(--surface);border-radius:2px;overflow:hidden;">
            <div style="height:100%;width:${pct}%;background:var(--${c});border-radius:2px;box-shadow:0 0 6px var(--${c});"></div>
          </div>
        </div>
      `).join('')}
    </div>
  </div>
</div>
`);

// ── 03 BACKGROUND ─────────────────────────────────────────────────────────────
slides.push(`
<div class="slide" id="s03">
  <div class="glow-tl"></div>
  <div class="slide-inner" style="position:relative;z-index:1;">
    <div class="chapter-tag">01 · Background</div>
    <div class="slide-title">研究背景</div>
    <div class="slide-sub">AI 的普及与现有系统的本质缺陷</div>

    <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:16px;margin-bottom:32px;">
      ${[
        ['42亿+','全球 AI 助手月活用户','2025 年数据','blue'],
        ['73%','用户认为 AI 不够懂自己','需求未被满足','cyan'],
        ['89%','缺乏长期记忆与情感适配','核心技术断层','orange'],
      ].map(([n,l,s,c])=>`
        <div class="card" style="border-top:1.5px solid var(--${c});">
          <div class="stat-num ${c}">${n}</div>
          <div style="font-size:13px;color:var(--txt);margin-top:10px;font-weight:500;">${l}</div>
          <div style="font-size:11px;color:var(--txt3);margin-top:4px;">${s}</div>
        </div>
      `).join('')}
    </div>

    <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:16px;">
      ${[
        ['工具式服务','每次对话从零开始，无法积累对用户的深度理解'],
        ['缺乏分寸感','不知何时介入、何时沉默，情绪感知能力弱'],
        ['人格固化','出厂预设不可演化，无法因人而异形成共生关系'],
      ].map(([t,d])=>`
        <div class="card" style="border-left:1.5px solid var(--orange);">
          <div style="font-size:13px;font-weight:600;color:var(--txt);margin-bottom:8px;">${t}</div>
          <div style="font-size:12px;color:var(--txt2);line-height:1.6;">${d}</div>
        </div>
      `).join('')}
    </div>

    <div style="margin-top:28px;padding:16px 20px;border:0.5px solid var(--border2);border-radius:8px;font-size:12.5px;color:var(--txt2);font-style:italic;line-height:1.7;">
      核心问题：如何设计一个能与用户形成长期共生关系、具备分寸感判断能力的多模态 AI 系统？
    </div>
  </div>
</div>
`);

// ── 04 THEORY ─────────────────────────────────────────────────────────────────
slides.push(`
<div class="slide" id="s04">
  <div class="glow-tl"></div>
  <div class="glow-br"></div>
  <div class="slide-inner" style="position:relative;z-index:1;">
    <div class="chapter-tag">02 · Theory</div>
    <div class="slide-title">理论框架与概念创新</div>
    <div class="slide-sub">三个理论支柱 + 一项原创延伸</div>

    <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:20px;flex:1;">
      ${[
        ['叙事认同理论','Ricoeur · McAdams','人通过叙事构建和延续自我认同。个人神话与生命故事模型构成 AI 长期记忆的理论基础。','blue','★ 理论基础'],
        ['认知卸载理论','Clark · Chalmers','外部工具成为认知系统的延伸，降低工作记忆负荷，释放注意资源。AI 是「外脑」的哲学起点。','cyan','★ 理论基础'],
        ['得体卸载','★ 本研究原创概念','AI 系统「沉默」本身可以是成熟形态的认知支持。不说话是经过计算的主动选择，不是被动失败。','orange','★ 原创概念'],
      ].map(([t,a,d,c,tag])=>`
        <div class="card" style="border-top:1.5px solid var(--${c});display:flex;flex-direction:column;gap:14px;height:100%;">
          <div>
            <div style="font-size:15px;font-weight:700;color:var(--txt);margin-bottom:6px;">${t}</div>
            <div class="mono" style="font-size:10px;color:var(--txt3);">${a}</div>
          </div>
          <div style="font-size:12px;color:var(--txt2);line-height:1.7;flex:1;">${d}</div>
          <div class="badge badge-${c}" style="align-self:flex-start;">${tag}</div>
        </div>
      `).join('')}
    </div>

    <div style="margin-top:24px;padding:14px 20px;background:rgba(255,159,10,0.04);border:0.5px solid rgba(255,159,10,0.2);border-radius:8px;">
      <span style="font-size:11px;color:var(--orange);font-weight:600;letter-spacing:0.05em;">INSIGHT &nbsp;·&nbsp; </span>
      <span style="font-size:12px;color:var(--txt2);">AI 的成熟不在于做多少，而在于知道什么时候应该不做。</span>
    </div>
  </div>
</div>
`);

// ── 05 ARCHITECTURE ───────────────────────────────────────────────────────────
slides.push(`
<div class="slide" id="s05">
  <div class="glow-tl"></div>
  <div class="slide-inner" style="position:relative;z-index:1;">
    <div class="chapter-tag">03 · Architecture</div>
    <div class="slide-title">Evans 六层认知架构</div>
    <div class="slide-sub mono" style="font-size:11px;letter-spacing:0.1em;color:var(--txt3);">感知 → 记忆 → 认知 → 决策 → 调度 → 执行</div>

    <div style="display:grid;grid-template-columns:repeat(6,1fr);gap:12px;margin-top:32px;flex:1;">
      ${[
        ['01','感知层','PERCEPTION','多模态信号融合\n音视频·生理·位置','blue'],
        ['02','记忆层','MEMORY','三层记忆结构\n情景·语义·人格','cyan'],
        ['03','认知层','COGNITION','意图分析\n心智推理 ToM','green'],
        ['04','决策层','DECISION','分寸感引擎\n三维评分+阈值','orange'],
        ['05','调度层','SCHEDULING','多任务并行编排\n跨设备协同','purple'],
        ['06','执行层','EXECUTION','设备控制·API\n跨端通报·工具','blue'],
      ].map(([n,name,en,desc,c])=>`
        <div class="card" style="border-top:1.5px solid var(--${c});display:flex;flex-direction:column;align-items:center;text-align:center;gap:12px;padding:20px 14px;">
          <div style="width:36px;height:36px;border-radius:50%;border:1px solid var(--${c});display:flex;align-items:center;justify-content:center;">
            <span class="${c}" style="font-size:16px;font-weight:800;">${n}</span>
          </div>
          <div>
            <div style="font-size:14px;font-weight:700;color:var(--txt);">${name}</div>
            <div class="mono" style="font-size:9px;color:var(--txt3);letter-spacing:0.1em;margin-top:3px;">${en}</div>
          </div>
          <div style="font-size:11px;color:var(--txt2);line-height:1.6;white-space:pre-line;">${desc}</div>
        </div>
      `).join('')}
    </div>

    <div style="margin-top:20px;text-align:center;">
      <span class="mono dim" style="font-size:10px;letter-spacing:0.08em;">实时闭环反馈 · 毫秒级跨层调用 · 并行多任务编排 · 隐私分层保护</span>
    </div>
  </div>
</div>
`);

// ── 06 PROPRIETY ENGINE ───────────────────────────────────────────────────────
slides.push(`
<div class="slide" id="s06">
  <div class="glow-tl"></div>
  <div class="glow-br"></div>
  <div class="slide-inner" style="position:relative;z-index:1;display:grid;grid-template-columns:1fr 1fr;gap:48px;align-items:start;">
    <div>
      <div class="chapter-tag">03 · System Core</div>
      <div class="slide-title">分寸感引擎</div>
      <div class="slide-sub">Evans 最核心的原创设计</div>

      <div class="card" style="margin-bottom:16px;">
        <div style="font-size:12px;font-weight:600;color:var(--txt2);letter-spacing:0.08em;margin-bottom:16px;">三维评分机制</div>
        ${[
          ['场景维度','私密程度 · 紧迫程度 · 社交环境',0.78,'blue'],
          ['情绪维度','情绪强度 · 稳定程度 · 危机等级',0.71,'cyan'],
          ['关系维度','关系亲密度 · 历史模式 · 用户意图',0.74,'green'],
        ].map(([n,s,v,c])=>`
          <div style="margin-bottom:14px;">
            <div style="display:flex;justify-content:space-between;margin-bottom:6px;">
              <span style="font-size:12px;color:var(--txt);">${n}</span>
              <span class="mono ${c}" style="font-size:11px;font-weight:600;">${v}</span>
            </div>
            <div style="font-size:10px;color:var(--txt3);margin-bottom:6px;">${s}</div>
            <div style="height:2px;background:var(--surface);border-radius:2px;overflow:hidden;">
              <div style="height:100%;width:${v*100}%;background:var(--${c});border-radius:2px;transition:width 0.8s ease;"></div>
            </div>
          </div>
        `).join('')}
      </div>
    </div>

    <div style="display:flex;flex-direction:column;gap:16px;padding-top:72px;">
      <div class="card" style="border-top:1.5px solid var(--blue);">
        <div style="font-size:12px;font-weight:600;color:var(--txt2);letter-spacing:0.08em;margin-bottom:14px;">阈值判断逻辑</div>
        <div style="display:flex;flex-direction:column;gap:8px;">
          <div style="display:flex;align-items:center;gap:12px;">
            <div class="node" style="background:var(--green);box-shadow:0 0 6px var(--green);"></div>
            <span class="mono" style="font-size:11px;color:var(--green);">评分 &gt; 0.50 → 介入</span>
          </div>
          <div style="display:flex;align-items:center;gap:12px;">
            <div class="node" style="background:var(--txt3);"></div>
            <span class="mono" style="font-size:11px;color:var(--txt2);">评分 ≤ 0.50 → 主动沉默</span>
          </div>
        </div>
      </div>

      <div style="display:flex;flex-direction:column;gap:10px;">
        <div class="mono dim" style="font-size:10px;letter-spacing:0.1em;margin-bottom:4px;">场景对照</div>
        ${[
          ['S02 老伴录音','0.74','温和介入·询问授权','green'],
          ['S04 客厅跌倒','0.92','紧急介入·多设备协同','orange'],
          ['S15 情绪宣泄','0.31','主动沉默·不回应','txt3'],
        ].map(([s,score,a,c])=>`
          <div style="display:flex;align-items:center;gap:16px;padding:10px 16px;background:rgba(255,255,255,0.02);border-radius:8px;border:0.5px solid var(--border);">
            <div class="node" style="background:var(--${c});${c!=='txt3'?'box-shadow:0 0 6px var(--'+c+');':''}"></div>
            <span style="font-size:12px;color:var(--txt);flex:1;">${s}</span>
            <span class="mono" style="font-size:11px;color:var(--${c});">${score}</span>
            <span style="font-size:11px;color:var(--txt3);">${a}</span>
          </div>
        `).join('')}
      </div>
    </div>
  </div>
</div>
`);

// ── 07 PERSONA EVOLUTION ──────────────────────────────────────────────────────
slides.push(`
<div class="slide" id="s07">
  <div class="glow-tl"></div>
  <div class="slide-inner" style="position:relative;z-index:1;">
    <div class="chapter-tag">03 · Persona Evolution</div>
    <div class="slide-title">共生人格演化</div>
    <div class="slide-sub">Evans 不是出厂即定的工具，而是被用户养成的存在</div>

    <!-- Timeline -->
    <div style="position:relative;margin-bottom:36px;">
      <div style="position:absolute;left:0;right:0;top:50%;height:0.5px;background:var(--border2);transform:translateY(-50%);"></div>
      <div style="display:grid;grid-template-columns:repeat(5,1fr);gap:0;position:relative;z-index:1;">
        ${[
          ['Day 1','0%'],
          ['Day 7','24%'],
          ['Day 30','51%'],
          ['Day 60','67%'],
          ['Day 100','78%'],
        ].map(([d,p],i)=>`
          <div style="display:flex;flex-direction:column;align-items:center;gap:10px;">
            <div class="mono" style="font-size:10px;color:var(--txt3);">${d}</div>
            <div style="width:8px;height:8px;border-radius:50%;background:var(--blue);border:1px solid rgba(10,132,255,0.4);box-shadow:0 0 10px rgba(10,132,255,0.5);"></div>
            <div style="font-size:18px;font-weight:800;color:var(--blue);letter-spacing:-0.02em;">${p}</div>
          </div>
        `).join('')}
      </div>
    </div>

    <!-- 8D traits grid -->
    <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:14px;">
      ${[
        ['主动性',0.42,'blue','-0.08'],
        ['节奏感',0.70,'green','+0.20'],
        ['正式度',0.20,'orange','-0.30'],
        ['情感细腻度',0.83,'purple','+0.33'],
        ['直接性',0.75,'cyan','+0.25'],
        ['谨慎度',0.55,'blue','+0.05'],
      ].map(([n,v,c,d])=>`
        <div style="display:flex;flex-direction:column;gap:6px;">
          <div style="display:flex;justify-content:space-between;">
            <span style="font-size:12px;color:var(--txt);">${n}</span>
            <span class="mono ${c}" style="font-size:11px;font-weight:600;">${d}</span>
          </div>
          <div style="height:2px;background:var(--surface);border-radius:2px;overflow:hidden;">
            <div style="height:100%;width:${v*100}%;background:var(--${c});border-radius:2px;box-shadow:0 0 6px var(--${c});"></div>
          </div>
        </div>
      `).join('')}
    </div>

    <div style="margin-top:28px;text-align:center;font-size:13px;color:var(--txt2);font-style:italic;">
      「每一个 Evans，都因为陪伴的人不同而不同。」
    </div>
  </div>
</div>
`);

// ── 08 SYSTEM FORM ────────────────────────────────────────────────────────────
slides.push(`
<div class="slide" id="s08">
  <div class="glow-tl"></div>
  <div class="slide-inner" style="position:relative;z-index:1;display:grid;grid-template-columns:1fr 1fr;gap:48px;align-items:start;">
    <div>
      <div class="chapter-tag">03 · System Form</div>
      <div class="slide-title">系统形态与<br>隐私架构</div>

      <div style="margin-top:32px;">
        <div class="mono dim" style="font-size:10px;letter-spacing:0.1em;margin-bottom:16px;">Evans 胸针硬件</div>

        <!-- Pin visual -->
        <div style="width:100px;height:100px;border-radius:50%;border:1px solid var(--border2);background:radial-gradient(circle at 40% 40%, rgba(10,132,255,0.2), rgba(10,132,255,0.04));display:flex;align-items:center;justify-content:center;margin-bottom:20px;box-shadow:0 0 30px rgba(10,132,255,0.1);">
          <span style="font-size:32px;font-weight:800;color:var(--blue);letter-spacing:-0.04em;">E</span>
        </div>

        <div style="display:flex;flex-direction:column;gap:8px;">
          ${['摄像头 + 麦克风阵列','骨传导音频输出','PPG 生理信号采集','本地加密处理单元','蓝牙 / WiFi 协议栈'].map(s=>`
            <div style="display:flex;align-items:center;gap:10px;">
              <div class="node" style="background:var(--blue);opacity:0.6;width:4px;height:4px;"></div>
              <span style="font-size:12px;color:var(--txt2);">${s}</span>
            </div>
          `).join('')}
        </div>
      </div>
    </div>

    <div style="padding-top:72px;">
      <div class="mono dim" style="font-size:10px;letter-spacing:0.1em;margin-bottom:16px;">四层隐私授权架构</div>
      <div style="display:flex;flex-direction:column;gap:10px;">
        ${[
          ['L1','基础生活节奏','可向子女共享生活规律','green'],
          ['L2','情绪倾向与关心','翻译情感，屏蔽具体数值','blue'],
          ['L3','健康整体状态','告警级别，不透露原始数据','orange'],
          ['L4','核心隐私数据','不可分享，仅本人 Evans 可见','txt3'],
        ].map(([l,n,e,c])=>`
          <div style="display:flex;gap:14px;align-items:center;padding:12px 16px;background:rgba(255,255,255,0.02);border-radius:8px;border:0.5px solid var(--border);">
            <div class="mono ${c}" style="font-size:13px;font-weight:700;min-width:24px;">${l}</div>
            <div style="flex:1;">
              <div style="font-size:12px;font-weight:600;color:var(--txt);">${n}</div>
              <div style="font-size:11px;color:var(--txt3);margin-top:2px;">${e}</div>
            </div>
          </div>
        `).join('')}
      </div>
    </div>
  </div>
</div>
`);

// ── 09 ALL SCENARIOS ──────────────────────────────────────────────────────────
slides.push(`
<div class="slide" id="s09">
  <div class="glow-tl"></div>
  <div class="slide-inner" style="position:relative;z-index:1;">
    <div class="chapter-tag">04 · Scenarios</div>
    <div class="slide-title">15 场景全景图</div>
    <div class="slide-sub">五幕叙事结构</div>

    <div style="display:grid;grid-template-columns:1fr 2fr 2fr 1.4fr;gap:16px;flex:1;">
      ${[
        ['第一幕','Evans 的成长',['S01 从陌生到懂你'],'blue'],
        ['第二幕','老年场景',['S02 老伴录音','S03 棋友','S04 客厅跌倒','S05 诈骗拦截'],'cyan'],
        ['第三幕','青年场景',['S06 会议救场','S07 深夜加班','S08 信息过滤','S09 决策副驾','S10 任务交接','S11 纪念日'],'green'],
        ['第四幕','中年关怀',['S12 代际翻译','S13 第三选项','S14 跨城关怀'],'orange'],
      ].map(([act,title,scenes,c])=>`
        <div class="card" style="border-top:1.5px solid var(--${c});display:flex;flex-direction:column;gap:12px;">
          <div>
            <div class="mono ${c}" style="font-size:10px;letter-spacing:0.1em;margin-bottom:6px;">${act}</div>
            <div style="font-size:14px;font-weight:700;color:var(--txt);">${title}</div>
          </div>
          <div style="display:flex;flex-direction:column;gap:8px;flex:1;">
            ${scenes.map(s=>`
              <div style="font-size:11px;color:var(--txt2);padding-left:10px;border-left:1.5px solid rgba(255,255,255,0.08);">${s}</div>
            `).join('')}
          </div>
        </div>
      `).join('')}
    </div>

    <!-- S15 special -->
    <div style="margin-top:16px;padding:14px 20px;background:rgba(191,90,242,0.04);border:0.5px solid rgba(191,90,242,0.15);border-radius:8px;display:flex;align-items:center;justify-content:space-between;">
      <div>
        <span class="mono purple" style="font-size:10px;letter-spacing:0.1em;">第五幕 · 哲学反思 &nbsp;&nbsp;</span>
        <span style="font-size:13px;color:var(--txt);">S15 该不该说话 · 得体卸载的终极示范</span>
      </div>
      <div style="font-size:12px;color:var(--txt3);font-style:italic;">「真正成熟的 AI，是知道什么时候应该不说话。」</div>
    </div>
  </div>
</div>
`);
