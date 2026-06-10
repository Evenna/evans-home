// ─────────────────────────────────────────
// Evans 答辩 · slides.js
// ─────────────────────────────────────────

const IMGS = [
  '../assets/img1.png',
  '../assets/img2.png',
  '../assets/img3.png',
  '../assets/img4.png',
  '../assets/img5.png',
  '../assets/img6.png',
];

const slides = [

// ── S01 封面 ────────────────────────────
`<div class="slide" style="background:#08090a;">
  <div class="inner" style="justify-content:center;gap:0;">
    <div style="margin-bottom:48px;">
      <div style="font-family:var(--mono);font-size:11px;color:var(--accent);letter-spacing:.14em;text-transform:uppercase;margin-bottom:36px;">
        毕业设计答辩 · 2025
      </div>
      <div style="font-size:72px;font-weight:300;color:var(--txt);letter-spacing:-.05em;line-height:1.05;margin-bottom:20px;">
        Evans
      </div>
      <div style="font-size:20px;font-weight:400;color:var(--txt2);letter-spacing:-.01em;margin-bottom:12px;">
        基于叙事认同重构与认知卸载的<br>多模态交互系统设计研究
      </div>
      <div style="font-size:13px;color:var(--txt3);margin-top:28px;line-height:2;">
        指导教师：—— &nbsp;&nbsp;|&nbsp;&nbsp; 专业：交互设计 &nbsp;&nbsp;|&nbsp;&nbsp; 学号：——
      </div>
    </div>
    <div style="display:flex;gap:12px;margin-top:4px;">
      <span class="tag blue">叙事认同重构</span>
      <span class="tag">得体卸载</span>
      <span class="tag">共生人格</span>
    </div>
  </div>
  <div style="position:absolute;bottom:0;left:0;right:0;height:1px;background:var(--border);"></div>
</div>`,

// ── S02 目录 ────────────────────────────
`<div class="slide" style="background:var(--bg);">
  <div class="inner">
    <div class="eyebrow">目录 <span>/ Contents</span></div>
    <div style="font-size:32px;font-weight:300;color:var(--txt);letter-spacing:-.03em;margin-bottom:40px;">全场结构</div>
    <div>
      ${[
        ['01','研究背景与问题',  '人与AI的共生困境'],
        ['02','核心概念框架',    '三大原创概念'],
        ['03','系统设计',        'Evans 的认知架构'],
        ['04','分寸感引擎',      '得体卸载的工程实现'],
        ['05','展演场景',        '15个真实生活切片'],
        ['06','设计贡献',        '学术 + 实践双重价值'],
        ['07','边界与反思',      '我们不应该做什么'],
        ['08','结语',            '共生，不是控制'],
      ].map(([n,t,s])=>`
      <div class="toc-row">
        <span class="toc-n">${n}</span>
        <span class="toc-title">${t}</span>
        <span style="font-size:12px;color:var(--txt3);flex:1;">${s}</span>
        <span class="toc-arrow">→</span>
      </div>`).join('')}
    </div>
  </div>
</div>`,

// ── S03 研究背景 ─────────────────────────
`<div class="slide" style="background:var(--bg);">
  <div class="inner">
    <div class="eyebrow">01 &nbsp;<span>/ 研究背景</span></div>
    <div style="font-size:38px;font-weight:300;color:var(--txt);letter-spacing:-.03em;line-height:1.2;margin-bottom:36px;">
      人与AI的共生困境
    </div>
    <div class="cols-2" style="gap:56px;align-items:start;">
      <div>
        <div style="font-size:14px;color:var(--txt2);line-height:1.8;margin-bottom:28px;">
          现有AI助手停留在<strong style="color:var(--txt)">工具层</strong>——响应指令、完成任务，但无法感知人的情感语境、无法判断何时该沉默、无法在长期陪伴中形成个性化人格。
        </div>
        <div style="font-size:14px;color:var(--txt2);line-height:1.8;">
          这不是技术能力的缺失，而是<strong style="color:var(--txt)">设计哲学的缺失</strong>——我们从未认真思考：一个真正陪伴人的AI，应该如何<em style="color:var(--accent);font-style:normal">成长、判断、克制</em>。
        </div>
      </div>
      <div style="display:flex;flex-direction:column;gap:16px;">
        ${[
          ['现有困境','助手型AI缺乏情感感知，无法区分"需要建议"与"需要倾听"'],
          ['研究空白','学术界缺乏将叙事理论引入AI人格构建的系统性框架'],
          ['设计机遇','多模态感知 + 长期记忆技术成熟，共生型AI成为可能'],
        ].map(([t,d])=>`
        <div class="card">
          <h3>${t}</h3>
          <p>${d}</p>
        </div>`).join('')}
      </div>
    </div>
  </div>
</div>`,

// ── S04 核心概念 ─────────────────────────
`<div class="slide" style="background:var(--bg);">
  <div class="inner">
    <div class="eyebrow">02 &nbsp;<span>/ 核心概念</span></div>
    <div style="font-size:38px;font-weight:300;color:var(--txt);letter-spacing:-.03em;margin-bottom:12px;">
      三大原创概念
    </div>
    <div style="font-size:13px;color:var(--txt3);margin-bottom:44px;">基于 Ricoeur 叙事认同理论 × 认知卸载理论 × 心智推理模型</div>
    <div class="cols-3">
      ${[
        ['叙事认同重构','Narrative Identity Reconstruction','用户的人生叙事不只被记录，更被Evans反向内化——用户塑造Evans，Evans也在重构用户的自我理解。','blue'],
        ['得体卸载','Propriety Offloading','Evans不是"能做就做"，而是知道何时该沉默、何时该介入——沉默本身是经过判断后的主动选择。',''],
        ['共生人格演化','Symbiotic Persona Evolution','Evans的八维人格随用户长期互动持续演化，出厂版本与100天后的版本相似度仅31%。','orange'],
      ].map(([t,e,d,cls])=>`
      <div class="card" style="padding:28px 24px;">
        <div style="font-size:10px;font-family:var(--mono);color:var(--txt3);letter-spacing:.08em;margin-bottom:12px;text-transform:uppercase;">${e}</div>
        <h3 style="font-size:17px;margin-bottom:14px;">${t}</h3>
        <p style="font-size:13px;">${d}</p>
        <div style="margin-top:18px;"><span class="tag ${cls}" style="font-size:10px;">原创概念</span></div>
      </div>`).join('')}
    </div>
  </div>
</div>`,

// ── S05 认知架构 ─────────────────────────
`<div class="slide" style="background:var(--bg);">
  <div class="inner">
    <div class="eyebrow">03 &nbsp;<span>/ 系统设计</span></div>
    <div style="font-size:38px;font-weight:300;color:var(--txt);letter-spacing:-.03em;margin-bottom:40px;">
      六层认知架构
    </div>
    <div style="background:rgba(255,255,255,0.02);border:1px solid var(--border);border-radius:14px;padding:36px 40px;">
      <div class="flow">
        ${[
          ['PERCEPT','感知层','多模态实时信号'],
          ['MEMORY','记忆层','三层记忆体系'],
          ['COGNIT','认知层','意图与推理'],
          ['DECIDE','决策层','分寸感引擎'],
          ['SCHED',  '调度层','任务编排'],
          ['EXEC',   '执行层','多设备协同'],
        ].map(([code,name,sub])=>`
        <div class="flow-step">
          <div class="flow-icon">${code}</div>
          <div class="flow-label">${name}</div>
          <div class="flow-sub">${sub}</div>
        </div>`).join('')}
      </div>
    </div>
    <div class="cols-3" style="margin-top:28px;gap:20px;">
      ${[
        ['三层记忆体系','情景记忆（滚动30天）<br>语义记忆（永久偏好）<br>人格记忆（人生关键事件）'],
        ['分寸感引擎','场景 × 情绪 × 关系 三维加权<br>介入分数 &lt; 0.5 → 主动沉默<br>例外触发机制独立判断'],
        ['心智推理 ToM','Belief / Desire / Intention 三元<br>理解用户说的与真正想要的差距<br>推演第三方（亲属）的隐性意图'],
      ].map(([t,d])=>`
      <div style="padding:18px 20px;border:1px solid var(--border);border-radius:10px;">
        <div style="font-size:13px;font-weight:600;color:var(--txt);margin-bottom:10px;">${t}</div>
        <div style="font-size:12px;color:var(--txt3);line-height:1.8;">${d}</div>
      </div>`).join('')}
    </div>
  </div>
</div>`,

// ── S06 分寸感引擎 ───────────────────────
`<div class="slide" style="background:var(--bg);">
  <div class="inner">
    <div class="eyebrow">04 &nbsp;<span>/ 分寸感引擎</span></div>
    <div style="font-size:38px;font-weight:300;color:var(--txt);letter-spacing:-.03em;margin-bottom:12px;">
      得体卸载的工程实现
    </div>
    <div style="font-size:13px;color:var(--txt3);margin-bottom:40px;">AI不只知道能做什么——更知道什么时候不该做</div>
    <div class="cols-2" style="gap:48px;">
      <div>
        <div style="font-size:13.5px;color:var(--txt2);line-height:1.8;margin-bottom:24px;">
          分寸感引擎通过三个维度加权计算<strong style="color:var(--txt)">介入分数</strong>，低于阈值时主动选择沉默：
        </div>
        <div style="display:flex;flex-direction:column;gap:12px;margin-bottom:28px;">
          ${[
            ['场景维度','私密程度 / 紧迫程度 / 用户是否主动求助'],
            ['情绪维度','情绪稳定性 / 危机等级 / 当前可承接程度'],
            ['关系维度','涉及关系节点的敏感性与影响权重'],
          ].map(([t,d])=>`
          <div style="display:flex;gap:14px;align-items:start;">
            <div style="width:3px;min-height:36px;background:var(--accent);border-radius:2px;margin-top:3px;"></div>
            <div>
              <div style="font-size:13px;font-weight:500;color:var(--txt);margin-bottom:4px;">${t}</div>
              <div style="font-size:12px;color:var(--txt3);">${d}</div>
            </div>
          </div>`).join('')}
        </div>
        <div class="quote" style="font-size:15px;">
          「分寸感不是"不介入"，<br>是"知道何时该介入"」
        </div>
      </div>
      <div style="display:flex;flex-direction:column;gap:14px;">
        <div style="font-size:11px;font-family:var(--mono);color:var(--txt3);letter-spacing:.08em;text-transform:uppercase;margin-bottom:4px;">典型判断案例</div>
        ${[
          ['S02 老伴录音',  '0.74','温和介入 + 询问授权'],
          ['S03 新棋友',    '0.65','轻度介入 + 候选节点'],
          ['S04 跌倒事件',  '紧急','跳过阈值 + 分级响应'],
          ['S05 诈骗电话',  '例外','私密通话 → 例外介入'],
          ['S07 深夜加班',  '0.69','温和介入 + 数据说话'],
          ['S15 情绪宣泄',  '0.31','低于阈值 → 主动沉默'],
        ].map(([scene,score,action])=>`
        <div style="display:flex;align-items:center;gap:14px;padding:12px 16px;background:rgba(255,255,255,0.02);border:1px solid var(--border);border-radius:8px;">
          <span style="font-size:12px;color:var(--txt2);flex:1;">${scene}</span>
          <span style="font-family:var(--mono);font-size:11px;color:${score==='紧急'||score==='例外'?'var(--orange)':'var(--accent)'};">${score}</span>
          <span style="font-size:11px;color:var(--txt3);">${action}</span>
        </div>`).join('')}
      </div>
    </div>
  </div>
</div>`,

];  // end slides part 1 — continued in part 2
