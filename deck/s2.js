// s2.js — slides 07–12
SLIDES.push(

// ── 07 展演全景 ────────────────────────────────────────────────
`<div class="slide" style="background:var(--bg);">
  <div class="inner">
    <div class="eye">05 · Exhibition Scenes</div>
    <div class="g2" style="gap:72px;align-items:center;">
      <div>
        <div class="h-section" style="margin-bottom:8px;"><em>15个</em>真实生活切片</div>
        <div class="hr" style="margin-bottom:20px;"></div>
        <div class="sub" style="margin-bottom:32px;">五幕叙事结构，覆盖老年陪伴、青年效率、中年关怀、哲学反思——Evans 在每一种生活里，都是不同的样子。</div>
        <div style="display:flex;gap:36px;">
          ${[['15','展演场景'],['6','认知能力'],['5','幕叙事'],['双屏','协同展演']].map(([n,l])=>`
          <div>
            <div class="stat-n" style="font-size:40px;">${n}</div>
            <div class="stat-l" style="margin-top:6px;">${l}</div>
          </div>`).join('')}
        </div>
      </div>
      <div style="display:flex;flex-direction:column;gap:8px;">
        ${[
          ['第一幕','Evans 的成长','S01 共生人格演化','g'],
          ['第二幕','老年场景','S02 老伴录音 · S03 棋友 · S04 意外 · S05 诈骗',''],
          ['第三幕','青年场景','S06–S11 效率 · 加班 · 过滤 · 决策 · 协作 · 纪念',''],
          ['第四幕','中年关怀','S12 代际翻译 · S13 第三选项 · S14 跨城关怀',''],
          ['第五幕','哲学反思','S15 该不该说话','g'],
        ].map(([act,name,scenes,cls])=>`
        <div style="display:flex;gap:16px;align-items:start;padding:14px 18px;border:1px solid var(--border);border-radius:3px;background:rgba(255,255,255,0.015);">
          <span style="font-family:var(--ff-mon);font-size:10px;color:var(--txt3);min-width:38px;padding-top:2px;">${act}</span>
          <div style="flex:1;">
            <div style="font-family:var(--ff-ser);font-size:16px;color:var(--white);margin-bottom:3px;">${name}</div>
            <div style="font-size:11px;color:var(--txt3);">${scenes}</div>
          </div>
          ${cls?`<span class="tag g" style="font-size:9px;align-self:center;">核心</span>`:''}
        </div>`).join('')}
      </div>
    </div>
  </div>
</div>`,

// ── 08 场景深潜（产品图）──────────────────────────────────────
`<div class="slide" style="background:var(--bg);">
  <div class="inner" style="padding-top:56px;padding-bottom:48px;justify-content:flex-start;">
    <div class="eye" style="margin-bottom:12px;">05 · Scene Deep Dive</div>
    <div class="h-section" style="margin-bottom:28px;font-size:36px;">典型场景 · 视觉语言</div>
    <div class="g3" style="gap:16px;flex:1;">
      ${[
        ['S05 诈骗电话拦截',   '声纹核验 + 例外介入判断',  0],
        ['S07 深夜加班中断',   '反直觉干预 + 历史数据镜像',1],
        ['S09 决策副驾',       '平行人生模拟器 · 213天档案',2],
        ['S12 代际翻译',       '跨端协同 + 严格隐私分层',  3],
        ['S14 跨城叙事关怀',   '信件体叙事 · 非数据看板',  4],
        ['S15 该不该说话',     '沉默作为主动选择 · 介入分0.31',5],
      ].map(([t,s,i])=>`
      <div class="img-card">
        <img src="${IMGS[i]}" alt="${t}">
        <div class="img-card-body">
          <div class="img-card-title">${t}</div>
          <div class="img-card-sub">${s}</div>
        </div>
      </div>`).join('')}
    </div>
  </div>
</div>`,

// ── 09 设计贡献 ────────────────────────────────────────────────
`<div class="slide" style="background:var(--bg);">
  <div class="blob" style="width:500px;height:500px;background:rgba(30,60,32,0.4);top:-120px;left:-120px;"></div>
  <div class="inner">
    <div class="eye">06 · Design Contribution</div>
    <div class="h-section" style="margin-bottom:36px;">学术 × 实践<br><em>双重贡献</em></div>
    <div class="g2" style="gap:1px;border:1px solid var(--border);border-radius:4px;overflow:hidden;">
      <div style="padding:36px 32px;border-right:1px solid var(--border);background:rgba(255,255,255,0.015);">
        <div style="font-family:var(--ff-mon);font-size:10px;color:var(--gold);letter-spacing:.12em;text-transform:uppercase;margin-bottom:24px;opacity:.8;">学术贡献</div>
        <div style="display:flex;flex-direction:column;gap:20px;">
          ${[
            ['叙事认同重构模型','首次将 Ricoeur 叙事哲学引入AI人格设计，构建用户-AI双向叙事塑造的理论框架'],
            ['得体卸载理论化','将延展认知理论推进至AI介入判断领域，建立可量化的分寸感评估模型'],
            ['共生人格量化体系','八维人格演化指标，提供AI个性化发展的可测量理论框架'],
          ].map(([t,d])=>`
          <div style="display:flex;gap:16px;align-items:start;">
            <div style="width:4px;height:4px;border-radius:50%;background:var(--gold);margin-top:6px;flex-shrink:0;"></div>
            <div>
              <div style="font-family:var(--ff-ser);font-size:17px;color:var(--white);margin-bottom:6px;">${t}</div>
              <div style="font-size:12.5px;color:var(--txt3);line-height:1.75;">${d}</div>
            </div>
          </div>`).join('')}
        </div>
      </div>
      <div style="padding:36px 32px;background:rgba(255,255,255,0.01);">
        <div style="font-family:var(--ff-mon);font-size:10px;color:var(--txt3);letter-spacing:.12em;text-transform:uppercase;margin-bottom:24px;opacity:.8;">实践贡献</div>
        <div style="display:flex;flex-direction:column;gap:20px;">
          ${[
            ['双屏展演体系','思维链可视化（屏幕一）与执行场景动画（屏幕二）的毫秒级同步展示系统，15场景全链路脚本'],
            ['跨端隐私分层架构','用户-家属间信息授权分级机制，严格区分"可分享数据"与"受保护隐私"'],
            ['统一视觉语言规范','蓝色调度动线 + 虚拟工具浮层 + 设备状态文字框的完整设计语言体系'],
          ].map(([t,d])=>`
          <div style="display:flex;gap:16px;align-items:start;">
            <div style="width:4px;height:4px;border-radius:50%;background:var(--txt3);margin-top:6px;flex-shrink:0;"></div>
            <div>
              <div style="font-family:var(--ff-ser);font-size:17px;color:var(--white);margin-bottom:6px;">${t}</div>
              <div style="font-size:12.5px;color:var(--txt3);line-height:1.75;">${d}</div>
            </div>
          </div>`).join('')}
        </div>
      </div>
    </div>
  </div>
</div>`,

// ── 10 边界与反思 ─────────────────────────────────────────────
`<div class="slide" style="background:var(--bg);">
  <div class="inner">
    <div class="eye">07 · Boundaries &amp; Reflection</div>
    <div class="h-section" style="margin-bottom:8px;">我们<em>不应该</em>做什么</div>
    <div class="hr" style="margin-bottom:32px;"></div>
    <div class="g3" style="gap:16px;">
      ${[
        ['不替代决策','Evans 可以推演、对比、外化内心矛盾——但最终的选择必须由用户作出。<br><br><em style="font-family:var(--ff-ser);font-style:italic;color:var(--txt3);font-size:12px;">「决定权100%在你」</em>'],
        ['不取代情感','Evans 翻译亲情，但不取代亲情本身。S14叙事关怀的目的是促成真实的电话，而不是让AI成为永久中间商。',''],
        ['不全时监控','隐私分层授权确保每个用户有权决定哪些信息可以跨端共享，哪些受到严格保护。'],
        ['不强制改变','即使历史数据显示凌晨工作效率极低，Evans 也只展示数据、提供台阶，从不强制关机。'],
        ['不代替宣泄','S15：当用户只是想发泄情绪时，Evans 选择沉默。被认同有时比被建议更危险。'],
        ['不出现红色','全展演视觉语言中全程不出现红色——克制本身是 Evans 最重要的设计底色。'],
      ].map(([t,d])=>`
      <div style="padding:24px 22px;border:1px solid var(--border);border-radius:3px;background:rgba(255,255,255,0.015);">
        <div style="width:20px;height:1px;background:var(--gold);opacity:.4;margin-bottom:16px;"></div>
        <div style="font-family:var(--ff-ser);font-size:18px;color:var(--white);margin-bottom:10px;">${t}</div>
        <div style="font-size:12px;color:var(--txt3);line-height:1.8;">${d}</div>
      </div>`).join('')}
    </div>
  </div>
</div>`,

// ── 11 结语 ───────────────────────────────────────────────────
`<div class="slide" style="background:var(--bg);">
  <div class="blob" style="width:700px;height:700px;background:rgba(30,60,32,0.45);top:50%;left:50%;transform:translate(-50%,-50%);"></div>
  <div class="inner" style="justify-content:center;text-align:center;align-items:center;">
    <div style="font-family:var(--ff-mon);font-size:10px;color:var(--gold);letter-spacing:.18em;text-transform:uppercase;margin-bottom:56px;opacity:.7;">Closing</div>
    <div style="font-family:var(--ff-ser);font-size:72px;font-weight:300;color:var(--white);letter-spacing:-.02em;line-height:1.1;margin-bottom:36px;">
      共生，<br><em style="color:var(--gold2);">不是控制。</em>
    </div>
    <div class="hr" style="margin:0 auto 32px;"></div>
    <div style="max-width:520px;font-family:var(--ff-ser);font-size:18px;font-weight:300;color:var(--txt2);line-height:1.8;font-style:italic;margin-bottom:52px;">
      每一个 Evans，都因为陪伴的人不同而不同。<br>
      真正成熟的代理AI，是知道什么时候应该不说话。
    </div>
    <div style="display:flex;justify-content:center;gap:14px;">
      <span class="tag g">叙事认同重构</span>
      <span class="tag">得体卸载</span>
      <span class="tag">共生人格演化</span>
    </div>
    <div style="margin-top:64px;font-family:var(--ff-mon);font-size:10px;color:var(--txt3);letter-spacing:.1em;">感谢聆听 · 请批评指正</div>
  </div>
  <div class="hr-full"></div>
</div>`,

// ── 12 备用：研究方法 ─────────────────────────────────────────
`<div class="slide" style="background:var(--bg);">
  <div class="inner">
    <div class="eye">Appendix · Research Methodology</div>
    <div class="h-section" style="margin-bottom:36px;"><em>方法论</em>框架</div>
    <div class="g2" style="gap:56px;">
      <div>
        <div style="display:flex;flex-direction:column;gap:20px;">
          ${[
            ['理论基础','Ricoeur 叙事认同（1988）<br>Clark &amp; Chalmers 延展认知（1998）<br>Premack &amp; Woodruff 心智推理（1978）'],
            ['设计方法','场景原型构建 · 双屏展演体系设计<br>分寸感引擎规则推导与验证'],
            ['创新性','跨越哲学、认知科学、HCI三个学科<br>提出3个可操作化原创设计概念'],
          ].map(([t,d])=>`
          <div>
            <div style="font-family:var(--ff-ser);font-size:17px;color:var(--white);margin-bottom:8px;">${t}</div>
            <div style="font-size:13px;color:var(--txt3);line-height:1.75;">${d}</div>
            <div class="hr" style="width:24px;margin-top:16px;margin-bottom:0;"></div>
          </div>`).join('')}
        </div>
      </div>
      <div>
        <div style="font-family:var(--ff-mon);font-size:10px;color:var(--txt3);letter-spacing:.1em;text-transform:uppercase;margin-bottom:20px;">研究路径</div>
        ${[
          ['01','理论溯源','跨学科文献综述：叙事哲学 + 认知科学 + HCI'],
          ['02','概念建构','提出三大原创概念及可操作性定义'],
          ['03','架构设计','六层认知架构 + 分寸感引擎工程化'],
          ['04','场景实证','15个展演场景全链路脚本设计'],
          ['05','视觉呈现','双屏协同展演体系 + 视觉语言规范'],
        ].map(([n,t,d])=>`
        <div class="vlist-row">
          <span class="vlist-n">${n}</span>
          <div>
            <div class="vlist-title">${t}</div>
            <div class="vlist-sub">${d}</div>
          </div>
        </div>`).join('')}
      </div>
    </div>
  </div>
</div>`

); // end s2.js
