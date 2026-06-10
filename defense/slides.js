// slides.js — 01–09
const slides = [];

// ── 01 COVER ──────────────────────────────────────────────────────────────────
slides.push(`<div class="slide" id="s01">
  <div class="glow" style="width:700px;height:700px;top:-200px;left:-100px;"></div>
  <div class="inner center" style="gap:0;">

    <div class="eyebrow" style="margin-bottom:32px;">毕业答辩 &nbsp;·&nbsp; 2026</div>

    <div class="h1" style="font-size:clamp(80px,9vw,130px);font-weight:800;letter-spacing:-0.05em;margin-bottom:28px;">
      EVANS
    </div>

    <div style="max-width:480px;font-size:15px;color:var(--t2);line-height:1.7;letter-spacing:-0.01em;margin-bottom:52px;">
      基于叙事认同重构与认知卸载的<br>多模态交互系统设计研究
    </div>

    <div style="display:flex;align-items:center;gap:24px;">
      <div style="width:32px;height:0.5px;background:var(--line);"></div>
      <div class="caption mono" style="letter-spacing:0.12em;">指导教师 XXX 教授 &nbsp;·&nbsp; XXX 学院</div>
      <div style="width:32px;height:0.5px;background:var(--line);"></div>
    </div>

  </div>
</div>`);

// ── 02 TOC ────────────────────────────────────────────────────────────────────
slides.push(`<div class="slide" id="s02">
  <div class="inner grid2" style="padding:72px 80px;">
    <div style="z-index:1;">
      <div class="eyebrow">Contents</div>
      <div class="h2" style="margin-bottom:8px;">答辩大纲</div>
      <div class="body" style="margin-bottom:40px;">10 分钟 · 五部分</div>

      <div style="display:flex;flex-direction:column;">
        ${[
          ['01','研究背景','AI 现状 · 三大缺陷 · 核心问题'],
          ['02','理论框架','叙事认同 · 认知卸载 · 得体卸载（原创）'],
          ['03','系统架构','六层架构 · 分寸感引擎 · 共生人格'],
          ['04','场景展演','15 场景 · 五幕叙事'],
          ['05','设计贡献','四项原创贡献 · 边界 · 未来方向'],
        ].map(([n,t,s])=>`
          <div class="row-item">
            <span class="row-num">${n}</span>
            <div>
              <div class="h3" style="font-size:15px;margin-bottom:4px;">${t}</div>
              <div class="caption">${s}</div>
            </div>
          </div>
        `).join('')}
      </div>
    </div>

    <div style="z-index:1;display:flex;flex-direction:column;gap:12px;">
      <div class="caption mono" style="margin-bottom:8px;letter-spacing:0.1em;">时间分配</div>
      ${[
        ['研究背景','1\'30"',20],
        ['理论框架','1\'30"',20],
        ['系统架构','2\'00"',27],
        ['场景展演','3\'00"',40],
        ['设计贡献','2\'00"',27],
      ].map(([l,t,p])=>`
        <div>
          <div style="display:flex;justify-content:space-between;margin-bottom:7px;">
            <span class="body" style="font-size:12px;">${l}</span>
            <span class="caption mono">${t}</span>
          </div>
          <div class="bar-track"><div class="bar-fill" style="width:${p}%;"></div></div>
        </div>
      `).join('')}
    </div>
  </div>
</div>`);

// ── 03 BACKGROUND ─────────────────────────────────────────────────────────────
slides.push(`<div class="slide" id="s03">
  <div class="inner" style="padding:64px 80px;">
    <div class="eyebrow">01 &nbsp;·&nbsp; Background</div>
    <div class="h2" style="margin-bottom:10px;">研究背景</div>
    <div class="body" style="margin-bottom:44px;">AI 普及时代，现有系统的本质缺陷</div>

    <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:16px;margin-bottom:24px;">
      ${[
        ['42亿+','全球 AI 助手月活用户','2025 年统计'],
        ['73%','用户认为 AI 不够懂自己','核心需求缺口'],
        ['89%','缺乏长期记忆与情感适配','技术根本断层'],
      ].map(([n,l,s])=>`
        <div class="glass" style="padding:28px 24px;">
          <div class="stat-n" style="margin-bottom:12px;">${n}</div>
          <div class="h3" style="font-size:14px;margin-bottom:5px;font-weight:500;">${l}</div>
          <div class="caption">${s}</div>
        </div>
      `).join('')}
    </div>

    <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:16px;">
      ${[
        ['工具式服务','每次对话从零开始，无法积累对用户的深度理解'],
        ['缺乏分寸感','不知何时介入、何时沉默，情绪感知能力弱'],
        ['人格固化','出厂预设不可演化，无法形成真正的共生关系'],
      ].map(([t,d])=>`
        <div style="padding:20px 0;">
          <div class="h3" style="font-size:14px;margin-bottom:8px;font-weight:500;">${t}</div>
          <div class="body" style="font-size:13px;">${d}</div>
        </div>
      `).join('')}
    </div>

    <div class="hr" style="margin:24px 0 20px;"></div>
    <div class="body" style="font-size:13px;font-style:italic;color:var(--t2);">
      核心问题：如何设计一个能与用户形成长期共生关系、具备分寸感判断能力的多模态 AI 系统？
    </div>
  </div>
</div>`);

// ── 04 THEORY ─────────────────────────────────────────────────────────────────
slides.push(`<div class="slide" id="s04">
  <div class="inner" style="padding:64px 80px;">
    <div class="eyebrow">02 &nbsp;·&nbsp; Theory</div>
    <div class="h2" style="margin-bottom:8px;">理论框架</div>
    <div class="body" style="margin-bottom:44px;">三个支柱 · 一项原创延伸</div>

    <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:0;">
      ${[
        {
          t:'叙事认同理论',
          a:'Ricoeur · McAdams',
          d:'人通过叙事构建和延续自我认同。个人神话与生命故事模型为 AI 长期记忆提供理论基础。',
          tag:'理论基础'
        },{
          t:'认知卸载理论',
          a:'Clark · Chalmers',
          d:'外部工具成为认知系统的延伸，降低工作记忆负荷。AI 是「外脑」延伸的哲学起点。',
          tag:'理论基础'
        },{
          t:'得体卸载',
          a:'★ 本研究原创概念',
          d:'AI 的「沉默」本身是成熟形态的认知支持。不说话是经过计算的主动选择，不是失败。',
          tag:'原创概念'
        },
      ].map(({t,a,d,tag},i)=>`
        <div style="padding:28px 32px 28px ${i===0?'0':'32px'};border-right:${i<2?'0.5px solid var(--line)':'none'};display:flex;flex-direction:column;gap:16px;">
          <div>
            <div class="h3" style="margin-bottom:6px;">${t}</div>
            <div class="caption mono">${a}</div>
          </div>
          <div class="body" style="font-size:13px;flex:1;">${d}</div>
          <div class="tag">${tag}</div>
        </div>
      `).join('')}
    </div>

    <div class="hr" style="margin:28px 0 20px;"></div>
    <div class="body" style="font-size:13px;font-style:italic;">
      AI 的成熟不在于做多少，而在于知道什么时候应该不做。
    </div>
  </div>
</div>`);

// ── 05 ARCHITECTURE ───────────────────────────────────────────────────────────
slides.push(`<div class="slide" id="s05">
  <div class="inner" style="padding:64px 80px;">
    <div class="eyebrow">03 &nbsp;·&nbsp; Architecture</div>
    <div class="h2" style="margin-bottom:8px;">六层认知架构</div>
    <div class="body" style="margin-bottom:40px;font-family:var(--mono);font-size:12px;letter-spacing:0.05em;">感知 → 记忆 → 认知 → 决策 → 调度 → 执行</div>

    <div class="glass" style="padding:0;overflow:hidden;">
      ${[
        ['01','感知层','多模态信号融合 · 音视频 · 生理 · 位置'],
        ['02','记忆层','三层记忆结构 · 情景 · 语义 · 人格'],
        ['03','认知层','意图分析 · 心智推理 · ToM'],
        ['04','决策层','分寸感引擎 · 三维评分 · 阈值判断'],
        ['05','调度层','多任务并行编排 · 跨设备协同'],
        ['06','执行层','设备控制 · API · 跨端通报'],
      ].map(([n,name,desc],i)=>`
        <div style="display:flex;align-items:center;gap:28px;padding:16px 28px;border-bottom:${i<5?'0.5px solid var(--line)':'none'};">
          <div class="caption mono" style="min-width:24px;color:var(--t3);">${n}</div>
          <div class="h3" style="min-width:72px;font-size:14px;">${name}</div>
          <div class="vr" style="height:16px;"></div>
          <div class="body" style="font-size:13px;">${desc}</div>
        </div>
      `).join('')}
    </div>

    <div style="margin-top:20px;display:flex;gap:32px;">
      ${['实时闭环反馈','毫秒级跨层调用','隐私分层保护','并行多任务编排'].map(s=>`
        <div style="display:flex;align-items:center;gap:8px;">
          <div class="ndot"></div>
          <span class="caption">${s}</span>
        </div>
      `).join('')}
    </div>
  </div>
</div>`);

// ── 06 PROPRIETY ENGINE ───────────────────────────────────────────────────────
slides.push(`<div class="slide" id="s06">
  <div class="inner grid2" style="padding:64px 80px;">
    <div style="z-index:1;">
      <div class="eyebrow">03 &nbsp;·&nbsp; Core Design</div>
      <div class="h2" style="margin-bottom:8px;">分寸感引擎</div>
      <div class="body" style="margin-bottom:36px;">Evans 最核心的原创设计</div>

      <div class="body" style="font-size:12px;letter-spacing:0.06em;text-transform:uppercase;color:var(--t3);margin-bottom:16px;font-family:var(--mono);">三维评分机制</div>
      ${[
        ['场景维度','私密 · 紧迫 · 社交环境',0.78],
        ['情绪维度','情绪强度 · 稳定性 · 危机等级',0.71],
        ['关系维度','亲密度 · 历史模式 · 用户意图',0.74],
      ].map(([n,s,v])=>`
        <div style="margin-bottom:18px;">
          <div style="display:flex;justify-content:space-between;margin-bottom:6px;">
            <span class="body" style="font-size:13px;">${n}</span>
            <span class="caption mono" style="color:var(--t1);">${v}</span>
          </div>
          <div class="caption" style="margin-bottom:8px;">${s}</div>
          <div class="bar-track"><div class="bar-fill" style="width:${v*100}%;"></div></div>
        </div>
      `).join('')}

      <div style="margin-top:24px;padding:16px 20px;" class="glass">
        <div class="caption mono" style="margin-bottom:10px;">阈值判断</div>
        <div style="display:flex;flex-direction:column;gap:8px;">
          <div style="display:flex;align-items:center;gap:10px;">
            <div class="ndot live"></div>
            <span class="body" style="font-size:13px;">评分 &gt; 0.50 → 介入</span>
          </div>
          <div style="display:flex;align-items:center;gap:10px;">
            <div class="ndot dim"></div>
            <span class="body" style="font-size:13px;">评分 ≤ 0.50 → 主动沉默</span>
          </div>
        </div>
      </div>
    </div>

    <div style="z-index:1;">
      <div class="caption mono" style="margin-bottom:16px;letter-spacing:0.1em;">场景对照</div>
      ${[
        ['S02','老伴录音','0.74','温和介入 · 询问授权'],
        ['S04','客厅跌倒','0.92','紧急 · 多设备协同'],
        ['S05','诈骗拦截','0.95','例外介入 · 三联核验'],
        ['S15','情绪宣泄','0.31','主动沉默 · 不回应'],
      ].map(([code,name,score,action])=>`
        <div class="row-item" style="padding:16px 0;">
          <div class="tag">${code}</div>
          <div style="flex:1;">
            <div class="h3" style="font-size:14px;margin-bottom:4px;">${name}</div>
            <div class="caption">${action}</div>
          </div>
          <div class="mono" style="font-size:20px;font-weight:700;color:var(--t1);letter-spacing:-0.02em;">${score}</div>
        </div>
      `).join('')}
    </div>
  </div>
</div>`);

// ── 07 PERSONA ────────────────────────────────────────────────────────────────
slides.push(`<div class="slide" id="s07">
  <div class="inner" style="padding:64px 80px;">
    <div class="eyebrow">03 &nbsp;·&nbsp; Persona Evolution</div>
    <div class="h2" style="margin-bottom:8px;">共生人格演化</div>
    <div class="body" style="margin-bottom:44px;">Evans 不是出厂即定的工具，而是被用户养成的存在</div>

    <!-- timeline -->
    <div style="display:grid;grid-template-columns:repeat(5,1fr);gap:0;margin-bottom:44px;position:relative;">
      <div style="position:absolute;top:8px;left:4%;right:4%;height:0.5px;background:var(--line);"></div>
      ${[['Day 1','0%'],['Day 7','24%'],['Day 30','51%'],['Day 60','67%'],['Day 100','78%']].map(([d,p])=>`
        <div style="display:flex;flex-direction:column;align-items:center;gap:12px;padding-top:0;">
          <div class="ndot live"></div>
          <div class="caption mono" style="color:var(--t3);">${d}</div>
          <div class="stat-n" style="font-size:28px;">${p}</div>
        </div>
      `).join('')}
    </div>

    <!-- traits -->
    <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:0;">
      ${[
        ['主动性',0.42,'-0.08'],
        ['节奏感',0.70,'+0.20'],
        ['正式度',0.20,'-0.30'],
        ['情感细腻度',0.83,'+0.33'],
        ['直接性',0.75,'+0.25'],
        ['谨慎度',0.55,'+0.05'],
      ].map(([n,v,d],i)=>`
        <div style="padding:20px ${i%3===0?'28px 20px 0':'28px'};border-right:${i%3<2?'0.5px solid var(--line)':'none'};border-bottom:${i<3?'0.5px solid var(--line)':'none'};">
          <div style="display:flex;justify-content:space-between;margin-bottom:8px;">
            <span class="body" style="font-size:13px;">${n}</span>
            <span class="caption mono" style="color:${parseFloat(d)>=0?'var(--t1)':'var(--t3)'};">${d}</span>
          </div>
          <div class="bar-track"><div class="bar-fill" style="width:${v*100}%;opacity:${0.3+v*0.6};"></div></div>
        </div>
      `).join('')}
    </div>

    <div class="hr" style="margin:28px 0 20px;"></div>
    <div class="body" style="font-style:italic;font-size:14px;">
      「每一个 Evans，都因为陪伴的人不同而不同。」
    </div>
  </div>
</div>`);

// ── 08 SYSTEM FORM ────────────────────────────────────────────────────────────
slides.push(`<div class="slide" id="s08">
  <div class="inner grid2" style="padding:64px 80px;">
    <div style="z-index:1;">
      <div class="eyebrow">03 &nbsp;·&nbsp; System Form</div>
      <div class="h2" style="margin-bottom:8px;">系统形态</div>
      <div class="body" style="margin-bottom:36px;">Evans 胸针 · 四层隐私授权</div>

      <!-- pin visual -->
      <div style="display:flex;align-items:center;gap:28px;margin-bottom:36px;">
        <div style="width:72px;height:72px;border-radius:50%;background:rgba(255,255,255,0.04);box-shadow:inset 0 1px 0 rgba(255,255,255,0.12),0 0 40px rgba(255,255,255,0.04);display:flex;align-items:center;justify-content:center;flex-shrink:0;">
          <span style="font-size:28px;font-weight:800;color:var(--t1);letter-spacing:-0.04em;">E</span>
        </div>
        <div>
          <div class="h3" style="font-size:14px;margin-bottom:8px;">Evans 胸针硬件</div>
          <div style="display:flex;flex-direction:column;gap:5px;">
            ${['摄像头 + 麦克风阵列','骨传导音频输出','PPG 生理信号采集','本地加密处理单元'].map(s=>`
              <div style="display:flex;align-items:center;gap:8px;">
                <div class="ndot" style="width:3px;height:3px;"></div>
                <span class="caption">${s}</span>
              </div>
            `).join('')}
          </div>
        </div>
      </div>
    </div>

    <div style="z-index:1;">
      <div class="caption mono" style="margin-bottom:16px;letter-spacing:0.1em;">隐私分层授权</div>
      ${[
        ['L1','基础生活节奏','可向家人共享生活规律'],
        ['L2','情绪倾向关心','翻译情感，屏蔽具体数值'],
        ['L3','健康整体状态','告警级别，不透露原始数据'],
        ['L4','核心隐私数据','不可共享，仅本人可见'],
      ].map(([l,n,e],i)=>`
        <div class="row-item" style="padding:16px 0;">
          <div class="caption mono" style="min-width:20px;color:var(--t3);">${l}</div>
          <div>
            <div class="h3" style="font-size:14px;margin-bottom:4px;">${n}</div>
            <div class="caption">${e}</div>
          </div>
          <div style="width:${(4-i)*22}px;height:1.5px;background:rgba(255,255,255,${0.12+i*0.06});border-radius:2px;align-self:center;"></div>
        </div>
      `).join('')}
    </div>
  </div>
</div>`);

// ── 09 ALL SCENARIOS ──────────────────────────────────────────────────────────
slides.push(`<div class="slide" id="s09">
  <div class="inner" style="padding:64px 80px;">
    <div class="eyebrow">04 &nbsp;·&nbsp; Scenarios</div>
    <div class="h2" style="margin-bottom:8px;">15 场景全景</div>
    <div class="body" style="margin-bottom:40px;">五幕叙事结构</div>

    <div style="display:grid;grid-template-columns:repeat(4,1fr);gap:0;flex:1;">
      ${[
        ['第一幕','Evans 的成长',['S01 从陌生到懂你']],
        ['第二幕','老年场景',['S02 老伴录音','S03 棋友','S04 客厅跌倒','S05 诈骗拦截']],
        ['第三幕','青年场景',['S06 会议救场','S07 深夜加班','S08 信息过滤','S09 决策副驾','S10 任务交接','S11 纪念日']],
        ['第四幕','中年关怀',['S12 代际翻译','S13 第三选项','S14 跨城关怀']],
      ].map(([act,title,scenes],i)=>`
        <div style="padding:0 ${i>0?'28px':'0'} 0 0;border-right:${i<3?'0.5px solid var(--line)':'none'};padding-left:${i>0?'28px':'0'};">
          <div class="caption mono" style="margin-bottom:10px;">${act}</div>
          <div class="h3" style="font-size:14px;margin-bottom:16px;">${title}</div>
          <div style="display:flex;flex-direction:column;gap:8px;">
            ${scenes.map(s=>`<div class="body" style="font-size:12px;">${s}</div>`).join('')}
          </div>
        </div>
      `).join('')}
    </div>

    <div class="hr" style="margin:28px 0 20px;"></div>

    <!-- S15 -->
    <div style="display:flex;align-items:center;justify-content:space-between;">
      <div>
        <div class="caption mono" style="margin-bottom:6px;">第五幕 · 哲学反思</div>
        <div class="h3" style="font-size:14px;">S15 &nbsp;·&nbsp; 该不该说话 · 得体卸载的终极示范</div>
      </div>
      <div class="body" style="font-size:13px;font-style:italic;color:var(--t3);max-width:320px;text-align:right;">
        「真正成熟的 AI，是知道什么时候应该不说话。」
      </div>
    </div>
  </div>
</div>`);
