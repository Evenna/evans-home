// s1.js — slides 01–06
SLIDES.push(

// ── 01 封面 ─────────────────────────────────────────────────
`<div class="slide" style="background:var(--bg);">
  <div class="blob" style="width:600px;height:600px;background:rgba(30,60,32,0.5);top:-100px;right:-100px;"></div>
  <div class="blob" style="width:400px;height:400px;background:rgba(200,164,94,0.06);bottom:-80px;left:80px;"></div>
  <div class="inner" style="justify-content:space-between;padding-top:72px;padding-bottom:64px;">
    <div style="display:flex;justify-content:space-between;align-items:flex-start;">
      <div style="font-family:var(--ff-mon);font-size:10px;color:var(--txt3);letter-spacing:.14em;">GRADUATION DEFENCE · 2025</div>
      <div style="font-family:var(--ff-mon);font-size:10px;color:var(--txt3);letter-spacing:.1em;">交互设计</div>
    </div>
    <div>
      <div style="font-family:var(--ff-mon);font-size:10px;color:var(--gold);letter-spacing:.18em;text-transform:uppercase;margin-bottom:32px;opacity:.7;">Multi-modal Interaction System Design</div>
      <div class="h-xl" style="margin-bottom:20px;">Evans</div>
      <div style="font-family:var(--ff-ser);font-size:22px;font-weight:300;color:var(--txt2);line-height:1.5;max-width:680px;letter-spacing:.01em;">
        基于叙事认同重构与认知卸载的<br>多模态交互系统设计研究
      </div>
      <div class="hr" style="margin-top:36px;margin-bottom:32px;"></div>
      <div style="display:flex;gap:12px;flex-wrap:wrap;">
        <span class="tag g">叙事认同重构</span>
        <span class="tag">得体卸载</span>
        <span class="tag">共生人格演化</span>
      </div>
    </div>
    <div style="display:flex;justify-content:space-between;align-items:flex-end;">
      <div style="font-size:12px;color:var(--txt3);line-height:2;font-family:var(--ff-mon);font-size:10px;letter-spacing:.05em;">
        指导教师 ——&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;学院 ——
      </div>
      <div style="font-family:var(--ff-ser);font-size:13px;font-style:italic;color:var(--txt3);">共生，不是控制。</div>
    </div>
  </div>
  <div class="hr-full"></div>
</div>`,

// ── 02 目录 ─────────────────────────────────────────────────
`<div class="slide" style="background:var(--bg);">
  <div class="inner">
    <div class="g2" style="gap:80px;align-items:center;">
      <div>
        <div class="eye">Contents</div>
        <div class="h-section" style="margin-bottom:16px;">全场<br><em>结构</em></div>
        <div class="hr"></div>
        <div class="sub" style="max-width:360px;">
          从哲学溯源到工程实现，从老年陪伴到哲学反思——十分钟，一个关于人与AI如何共生的完整叙事。
        </div>
      </div>
      <div>
        ${[
          ['01','研究背景','人与AI的共生困境'],
          ['02','核心概念','叙事认同 · 得体卸载 · 共生人格'],
          ['03','系统架构','六层认知 + 三层记忆'],
          ['04','分寸感引擎','何时介入，何时沉默'],
          ['05','展演场景','15个真实生活切片'],
          ['06','设计贡献','学术 + 实践双重价值'],
          ['07','边界反思','不应该做什么'],
          ['08','结语','共生，不是控制'],
        ].map(([n,t,s])=>`
        <div class="vlist-row">
          <span class="vlist-n">${n}</span>
          <div style="flex:1;">
            <div class="vlist-title">${t}</div>
            <div class="vlist-sub">${s}</div>
          </div>
          <span style="color:var(--txt3);font-size:11px;">→</span>
        </div>`).join('')}
      </div>
    </div>
  </div>
</div>`,

// ── 03 研究背景 ───────────────────────────────────────────────
`<div class="slide" style="background:var(--bg);">
  <div class="blob" style="width:500px;height:500px;background:rgba(200,164,94,0.04);top:50%;right:-150px;transform:translateY(-50%);"></div>
  <div class="inner">
    <div class="eye">01 · Research Background</div>
    <div class="h-section" style="margin-bottom:8px;">人与AI的<em>共生困境</em></div>
    <div class="hr" style="margin-bottom:32px;"></div>
    <div class="g2" style="gap:64px;">
      <div>
        <div class="sub" style="margin-bottom:24px;">
          现有AI助手停留在<strong style="color:var(--white);font-weight:400">工具层</strong>——响应指令、完成任务，却无法感知人的情感语境，无法判断何时该沉默，无法在长期陪伴中形成个性化人格。
        </div>
        <div class="sub" style="margin-bottom:32px;">
          这不是技术能力的缺失，而是<strong style="color:var(--white);font-weight:400">设计哲学的缺失</strong>——我们从未认真思考：一个真正陪伴人的AI，应该如何成长、判断、克制。
        </div>
        <div class="pq">
          「工具被使用，伴侣被养成。<br>Evans 想做的，是后者。」
        </div>
      </div>
      <div style="display:flex;flex-direction:column;gap:16px;">
        ${[
          ['现有困境','助手型AI缺乏情感感知，无法区分"需要建议"与"需要倾听"，一律给出答案'],
          ['研究空白','学术界缺乏将叙事哲学引入AI人格构建的系统性设计框架'],
          ['设计机遇','多模态感知与长期记忆技术已趋成熟，共生型AI成为可设计对象'],
        ].map(([t,d])=>`
        <div class="card">
          <div style="display:flex;align-items:center;gap:12px;margin-bottom:12px;">
            <div style="width:24px;height:1px;background:var(--gold);opacity:.5;"></div>
            <div class="card-title" style="font-size:16px;margin:0;">${t}</div>
          </div>
          <p>${d}</p>
        </div>`).join('')}
      </div>
    </div>
  </div>
</div>`,

// ── 04 核心概念 ───────────────────────────────────────────────
`<div class="slide" style="background:var(--bg);">
  <div class="inner">
    <div class="eye">02 · Core Concepts</div>
    <div class="h-section" style="margin-bottom:6px;">三大<em>原创概念</em></div>
    <div style="font-family:var(--ff-mon);font-size:10px;color:var(--txt3);letter-spacing:.08em;margin-bottom:40px;">
      Ricoeur 叙事认同 × Clark &amp; Chalmers 延展认知 × Premack 心智推理
    </div>
    <div class="g3" style="gap:1px;border:1px solid var(--border);border-radius:4px;overflow:hidden;">
      ${[
        ['叙事认同重构','Narrative Identity Reconstruction','首次将 Ricoeur 叙事哲学引入AI人格设计——用户的人生叙事不只被记录，更被Evans反向内化。用户塑造Evans，Evans也在重构用户的自我理解。'],
        ['得体卸载','Propriety Offloading','Evans不是"能做就做"，而是知道何时该沉默、何时该介入。沉默本身是经过分寸感判断后的主动选择，而非被动失败。'],
        ['共生人格演化','Symbiotic Persona Evolution','Evans的八维人格随用户长期互动持续演化。出厂版本与100天后的版本人格相似度仅31%——每一个Evans，都因为陪伴的人不同而不同。'],
      ].map(([t,e,d],i)=>`
      <div style="background:rgba(255,255,255,${i===1?'0.025':'0.015'});padding:36px 30px;border-right:1px solid var(--border);">
        <div class="card-en">${e}</div>
        <div class="card-title" style="font-size:22px;margin-bottom:16px;">${t}</div>
        <p style="font-size:13px;color:var(--txt2);line-height:1.8;">${d}</p>
        <div style="margin-top:24px;"><span class="tag g" style="font-size:9px;">原创概念</span></div>
      </div>`).join('')}
    </div>
  </div>
</div>`,

// ── 05 六层认知架构 ────────────────────────────────────────────
`<div class="slide" style="background:var(--bg);">
  <div class="inner">
    <div class="eye">03 · System Architecture</div>
    <div class="h-section" style="margin-bottom:36px;">六层<em>认知架构</em></div>
    <div style="border:1px solid var(--border);border-radius:4px;overflow:hidden;margin-bottom:28px;">
      <div class="flow">
        ${[
          ['PERCEPT','感知层','多模态实时信号流'],
          ['MEMORY','记忆层','三层记忆体系'],
          ['COGNIT','认知层','意图识别与推理'],
          ['DECIDE','决策层','分寸感引擎'],
          ['SCHED', '调度层','任务编排'],
          ['EXEC',  '执行层','多设备协同'],
        ].map(([c,n,d])=>`
        <div class="flow-s">
          <div class="flow-code">${c}</div>
          <div class="flow-name">${n}</div>
          <div class="flow-desc">${d}</div>
        </div>`).join('')}
      </div>
    </div>
    <div class="g3" style="gap:16px;">
      ${[
        ['三层记忆体系','情景记忆（滚动30天）<br>语义记忆（永久偏好，247维）<br>人格记忆（人生关键事件，终身）'],
        ['心智推理 ToM','Belief · Desire · Intention 三元建模<br>理解用户"说的"与"真正想要的"之差<br>推演第三方亲属的隐性意图'],
        ['共生人格快照','主动性 · 节奏 · 正式度 · 情感细腻度<br>直接性 · 谨慎度 · 幽默感 · 生成性<br>100天后与出厂相似度仅 31%'],
      ].map(([t,d])=>`
      <div style="padding:20px 22px;border:1px solid var(--border);border-radius:3px;">
        <div style="font-family:var(--ff-ser);font-size:16px;color:var(--white);margin-bottom:10px;">${t}</div>
        <div style="font-size:12px;color:var(--txt3);line-height:1.9;">${d}</div>
      </div>`).join('')}
    </div>
  </div>
</div>`,

// ── 06 分寸感引擎 ──────────────────────────────────────────────
`<div class="slide" style="background:var(--bg);">
  <div class="blob" style="width:400px;height:400px;background:rgba(200,164,94,0.05);bottom:-100px;right:-80px;"></div>
  <div class="inner">
    <div class="eye">04 · Propriety Engine</div>
    <div class="h-section" style="margin-bottom:8px;"><em>得体卸载</em>的工程实现</div>
    <div class="hr" style="margin-bottom:32px;"></div>
    <div class="g2" style="gap:56px;">
      <div>
        <div class="sub" style="margin-bottom:24px;">分寸感引擎通过三维加权计算<strong style="color:var(--white);font-weight:400">介入分数</strong>，低于阈值 0.50 时，Evans 主动选择沉默——这种沉默不是失败，是判断。</div>
        <div style="display:flex;flex-direction:column;gap:14px;margin-bottom:28px;">
          ${[
            ['场景维度','私密程度 / 紧迫程度 / 用户是否主动求助'],
            ['情绪维度','稳定性 / 危机等级 / 当前可承接复杂度'],
            ['关系维度','涉及关系节点的敏感性与影响权重'],
          ].map(([t,d])=>`
          <div style="display:flex;gap:16px;align-items:start;">
            <div style="width:1px;min-height:40px;background:linear-gradient(180deg,var(--gold),transparent);border-radius:1px;flex-shrink:0;margin-top:2px;"></div>
            <div>
              <div style="font-size:13px;font-weight:500;color:var(--white);margin-bottom:4px;">${t}</div>
              <div style="font-size:12px;color:var(--txt3);">${d}</div>
            </div>
          </div>`).join('')}
        </div>
        <div class="pq">「分寸感不是"不介入"，<br>是"知道何时该介入"」</div>
      </div>
      <div>
        <div style="font-family:var(--ff-mon);font-size:10px;color:var(--txt3);letter-spacing:.1em;text-transform:uppercase;margin-bottom:16px;">典型判断案例</div>
        <div style="display:flex;flex-direction:column;gap:0;border:1px solid var(--border);border-radius:3px;overflow:hidden;">
          ${[
            ['S02 老伴录音',   '0.74','温和介入 + 询问授权'],
            ['S03 公园棋友',   '0.65','轻度介入 + 候选节点'],
            ['S04 跌倒事件',   '紧急','跳过阈值 + 分级响应'],
            ['S05 诈骗电话',   '例外','私密通话例外介入'],
            ['S07 深夜加班',   '0.69','温和介入 + 数据说话'],
            ['S15 情绪宣泄',   '0.31','低于阈值 → 主动沉默'],
          ].map(([s,v,a],i)=>`
          <div style="display:flex;align-items:center;gap:14px;padding:13px 18px;background:rgba(255,255,255,${i%2?'0.015':'0'});border-bottom:1px solid var(--border);">
            <span style="font-size:12px;color:var(--txt2);flex:1;">${s}</span>
            <span style="font-family:var(--ff-mon);font-size:11px;color:${v==='紧急'||v==='例外'?'var(--gold)':'rgba(200,164,94,0.6)'};">${v}</span>
            <span style="font-size:11px;color:var(--txt3);min-width:120px;text-align:right;">${a}</span>
          </div>`).join('')}
        </div>
      </div>
    </div>
  </div>
</div>`

); // end s1.js
