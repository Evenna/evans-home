// slides.js — 01~10
const SLIDES = [];

/* ─── UTILS ─── */
function h(tag, attrs, ...kids) {
  const el = document.createElement(tag);
  if (attrs) Object.entries(attrs).forEach(([k, v]) => {
    if (k === 'cls') el.className = v;
    else if (k === 'html') el.innerHTML = v;
    else if (k === 'style') el.style.cssText = v;
    else el.setAttribute(k, v);
  });
  kids.flat().forEach(c => typeof c === 'string' ? el.appendChild(document.createTextNode(c)) : c && el.appendChild(c));
  return el;
}
function s(title, renderFn) { SLIDES.push({ title, render: renderFn }); }
function glow(top, left, size, op) {
  return h('div', { cls: 'glow', style: `top:${top};left:${left};width:${size};height:${size};opacity:${op||1};` });
}
function imgSlot(src, label, cls) {
  const d = h('div', { cls: `img-slot ${cls||''}` });
  d.appendChild(h('img', { src, alt: label }));
  if (label) d.appendChild(h('div', { cls: 'img-label' }, label));
  return d;
}
function spec(k, v) {
  return h('div', { cls: 'spec' },
    h('span', { cls: 'spec-k' }, k),
    h('span', { cls: 'spec-v' }, v)
  );
}

/* ─── S01: COVER ─── */
s('封面', (el) => {
  el.appendChild(glow('30%', '55%', '600px', 0.4));
  const inn = h('div', { cls: 'inner center', style: 'gap:0' });
  inn.appendChild(h('div', { cls: 'eye', style: 'margin-bottom:32px' }, '毕业设计答辩  ·  2026'));
  inn.appendChild(h('div', { cls: 'h1', style: 'font-size:clamp(64px,7vw,96px);letter-spacing:-0.045em;margin-bottom:28px' }, 'Evans'));
  inn.appendChild(h('div', { cls: 'h3', style: 'color:var(--t2);font-weight:380;letter-spacing:-0.01em;max-width:580px;line-height:1.5;margin-bottom:52px' },
    '基于叙事认同重构与认知卸载的多模态交互系统设计研究'));
  const tags = h('div', { style: 'display:flex;gap:10px;justify-content:center;flex-wrap:wrap' });
  ['叙事认同重构', '认知卸载', '共生人格', '分寸感引擎'].forEach(t => tags.appendChild(h('span', { cls: 'tag' }, t)));
  inn.appendChild(tags);
  inn.appendChild(h('div', { cls: 'hr', style: 'max-width:80px;margin:48px auto 28px' }));
  inn.appendChild(h('div', { cls: 'sm mono', style: 'color:var(--t3)' }, 'Evans Design Studio · Evenna'));
  el.appendChild(inn);
});

/* ─── S02: OVERVIEW ─── */
s('答辩提纲', (el) => {
  el.appendChild(glow('10%', '70%', '400px', 0.25));
  const inn = h('div', { cls: 'inner', style: 'max-width:960px;margin:0 auto;justify-content:center;padding:56px 80px' });
  inn.appendChild(h('div', { cls: 'eye' }, '提纲'));
  inn.appendChild(h('div', { cls: 'h2', style: 'margin-bottom:44px' }, '研究全貌'));
  const items = [
    ['01', '研究背景', '人机共生困境与现有方案的结构性缺陷'],
    ['02', '研究问题', '三个核心问题与学术定位'],
    ['03', '理论框架', '叙事认同重构 · 得体卸载 · 共生人格'],
    ['04', '系统架构', 'Evans六层认知架构与分寸感引擎'],
    ['05', '展演场景', '五幕十五场景完整展演'],
    ['06', '视觉语言', 'UI浮层规范与硬件设计'],
    ['07', '研究贡献', '四项原创贡献与学术定位'],
    ['08', '边界讨论', '设计边界与伦理反思'],
  ];
  items.forEach(([n, title, sub]) => {
    const row = h('div', { cls: 'row', style: 'align-items:center' });
    row.appendChild(h('span', { cls: 'row-n mono', style: 'font-size:9px;color:var(--t4)' }, n));
    const txt = h('div', { style: 'flex:1' });
    txt.appendChild(h('div', { cls: 'h4' }, title));
    txt.appendChild(h('div', { cls: 'sm', style: 'margin-top:3px' }, sub));
    row.appendChild(txt);
    inn.appendChild(row);
  });
  el.appendChild(inn);
});

/* ─── S03: BACKGROUND ─── */
s('研究背景', (el) => {
  el.appendChild(glow('-10%', '65%', '500px', 0.3));
  const inn = h('div', { cls: 'inner grid2' });

  // LEFT
  const L = h('div');
  L.appendChild(h('div', { cls: 'eye' }, '研究背景'));
  L.appendChild(h('div', { cls: 'h2', style: 'margin-bottom:24px' }, '共生困境'));
  L.appendChild(h('div', { cls: 'body', style: 'margin-bottom:32px' },
    '当 AI 助手越来越强大，一个新问题浮现：我们拥有了更高效的工具，却失去了更完整的自己。过度外包导致认知依赖，边界模糊导致隐私焦虑，标准化服务无法适配个体叙事——这三重困境构成本研究的核心问题域。'));

  const stats = h('div', { style: 'display:grid;grid-template-columns:1fr 1fr 1fr;gap:20px;margin-top:8px' });
  [['73%', '用户对AI助手\n存在过度依赖倾向'], ['61%', '担忧AI侵犯\n私人边界'], ['89%', '希望AI更\n"懂自己"']]
    .forEach(([n, l]) => {
      const s_ = h('div', { style: 'padding:16px;background:var(--glass);border-radius:8px;box-shadow:var(--g-top)' });
      s_.appendChild(h('div', { cls: 'stat-n', style: 'font-size:32px;margin-bottom:6px' }, n));
      s_.appendChild(h('div', { cls: 'sm', style: 'white-space:pre-line' }, l));
      stats.appendChild(s_);
    });
  L.appendChild(stats);
  inn.appendChild(L);

  // RIGHT img
  const R = h('div', { style: 'height:100%;display:flex;align-items:center' });
  R.appendChild(imgSlot('assets/p1.png', 'Evans · System Overview', 'img-tall'));
  inn.appendChild(R);
  el.appendChild(inn);
});

/* ─── S04: RESEARCH QUESTIONS ─── */
s('研究问题', (el) => {
  el.appendChild(glow('50%', '-10%', '400px', 0.25));
  const inn = h('div', { cls: 'inner', style: 'justify-content:center;max-width:960px;margin:0 auto;padding:56px 80px' });
  inn.appendChild(h('div', { cls: 'eye' }, '研究问题'));
  inn.appendChild(h('div', { cls: 'h2', style: 'margin-bottom:44px' }, '三个核心问题'));

  const qs = [
    ['RQ1', '如何在代理AI系统中实现"得体卸载"——在有效辅助与边界克制之间取得平衡？',
     '借鉴 Ricoeur 叙事认同理论，提出分寸感引擎作为认知卸载的主动调节机制'],
    ['RQ2', '如何通过长期共生关系构建动态演化的个人叙事档案？',
     '通过三层记忆架构（情景/语义/人格）实现用户画像的持续深化与叙事连贯性重构'],
    ['RQ3', '多模态交互系统如何在实体硬件与数字浮层之间建立一致的视觉语言？',
     '提出"执行场景动画"视觉语言规范，统一蓝色动线、设备状态卡、虚拟工具浮层三套语汇'],
  ];
  qs.forEach(([id, q, a]) => {
    const card = h('div', { style: 'display:grid;grid-template-columns:80px 1fr;gap:0;margin-bottom:16px;background:var(--glass);border-radius:10px;box-shadow:var(--g-top);overflow:hidden' });
    const idCol = h('div', { style: 'background:rgba(255,255,255,0.03);display:flex;align-items:center;justify-content:center;padding:24px 12px;border-right:0.5px solid var(--line)' });
    idCol.appendChild(h('span', { cls: 'mono', style: 'font-size:11px;color:var(--t3);letter-spacing:0.08em;writing-mode:vertical-lr;transform:rotate(180deg)' }, id));
    const body = h('div', { style: 'padding:20px 24px' });
    body.appendChild(h('div', { cls: 'h4', style: 'margin-bottom:10px;line-height:1.5' }, q));
    body.appendChild(h('div', { cls: 'sm', style: 'line-height:1.65;color:var(--t3)' }, a));
    card.appendChild(idCol);
    card.appendChild(body);
    inn.appendChild(card);
  });
  el.appendChild(inn);
});

/* ─── S05: THEORY FRAMEWORK ─── */
s('理论框架', (el) => {
  el.appendChild(glow('0%', '40%', '500px', 0.2));
  const inn = h('div', { cls: 'inner grid2' });

  const L = h('div');
  L.appendChild(h('div', { cls: 'eye' }, '理论框架'));
  L.appendChild(h('div', { cls: 'h2', style: 'margin-bottom:28px' }, '三大原创概念'));
  [
    ['叙事认同重构', 'Narrative Identity Reconstruction', 'Ricoeur叙事认同 + McAdams生命故事理论。Evans通过持续记录与整合用户的生命事件，帮助用户构建连贯、有意义的自我叙事，实现认同的动态重建。'],
    ['得体卸载', 'Appropriate Offloading', '认知卸载理论的原创扩展。不是将所有任务外包给AI，而是找到"恰当的边界"——让AI承担可卸载的认知负担，同时保留人对重要决策和情感体验的主体性。'],
    ['共生人格', 'Symbiotic Personality', '超越"工具论"的全新框架。Evans不是预设的工具，而是通过长期共生关系演化出"专属于这个用户"的个性特征——每个Evans都因陪伴的人不同而不同。'],
  ].forEach(([zh, en, desc]) => {
    const card = h('div', { style: 'margin-bottom:16px;padding:20px 22px;background:var(--glass);border-radius:10px;box-shadow:var(--g-top)' });
    card.appendChild(h('div', { cls: 'h4', style: 'margin-bottom:4px' }, zh));
    card.appendChild(h('div', { cls: 'sm mono', style: 'margin-bottom:10px;color:var(--t4)' }, en));
    card.appendChild(h('div', { cls: 'body', style: 'font-size:12.5px;line-height:1.65' }, desc));
    L.appendChild(card);
  });
  inn.appendChild(L);

  const R = h('div', { style: 'display:flex;flex-direction:column;gap:16px' });
  R.appendChild(imgSlot('assets/p2.png', 'Evans · Personality Evolution', 'img-med'));

  const pq = h('div', { style: 'padding:22px 24px;background:var(--glass);border-radius:10px;box-shadow:var(--g-top);border-left:1.5px solid rgba(255,255,255,0.25)' });
  pq.appendChild(h('div', { cls: 'body italic', style: 'font-size:14px;color:var(--t1);line-height:1.65' },
    '「每一个 Evans，都因为陪伴的人不同而不同。」'));
  R.appendChild(pq);
  inn.appendChild(R);
  el.appendChild(inn);
});

/* ─── S06: SIX LAYER ARCH ─── */
s('六层认知架构', (el) => {
  el.appendChild(glow('20%', '50%', '600px', 0.2));
  const inn = h('div', { cls: 'inner', style: 'justify-content:center;max-width:1020px;margin:0 auto;padding:56px 80px' });
  inn.appendChild(h('div', { cls: 'eye' }, '系统架构'));
  inn.appendChild(h('div', { cls: 'h2', style: 'margin-bottom:36px' }, 'Evans 六层认知架构'));

  const layers = [
    ['01  感知层', 'Perception', '多模态传感器融合：音频、IMU、生理体征、视觉、环境、位置', '7 类传感器  ·  <12ms 延迟'],
    ['02  记忆层', 'Memory',    '三层记忆：情景记忆（滚动30天）/ 语义记忆（永久偏好）/ 人格记忆（生命关键事件）', '最长记忆跨度 10+ 年'],
    ['03  认知层', 'Cognition', '心智推理（ToM）· 意图识别 · 情绪基线建模 · 用户画像深化', '247 维度用户画像'],
    ['04  决策层', 'Decision',  '分寸感引擎：三维评分（场景/情绪/关系）→ 加权介入分数 → 介入/不介入/克制', '阈值 0.50，动态调整'],
    ['05  调度层', 'Scheduling','多设备协同任务编排 · 跨工具并行调用 · 隐私分层权限管理', '支持 50+ 设备类型'],
    ['06  执行层', 'Execution', '实体设备控制 · 虚拟工具调用 · 叙事化通报生成 · 跨端同步', '端云协同，36h 续航'],
  ];
  const grid = h('div', { style: 'display:grid;grid-template-columns:1fr 1fr;gap:10px' });
  layers.forEach(([title, en, desc, meta]) => {
    const card = h('div', { style: 'padding:16px 18px;background:var(--glass);border-radius:8px;box-shadow:var(--g-top);display:flex;gap:14px;align-items:flex-start' });
    const nd = h('div', { style: 'margin-top:4px;flex-shrink:0' });
    nd.appendChild(h('div', { cls: 'nd live', style: 'width:6px;height:6px' }));
    card.appendChild(nd);
    const body = h('div');
    body.appendChild(h('div', { style: 'display:flex;align-items:baseline;gap:10px;margin-bottom:4px' },
      h('span', { cls: 'h4', style: 'font-size:12px' }, title),
      h('span', { cls: 'sm mono', style: 'color:var(--t4);font-size:9px' }, en)));
    body.appendChild(h('div', { cls: 'body', style: 'font-size:12px;line-height:1.55;margin-bottom:6px' }, desc));
    body.appendChild(h('div', { cls: 'sm mono', style: 'font-size:9.5px;color:var(--t3)' }, meta));
    card.appendChild(body);
    grid.appendChild(card);
  });
  inn.appendChild(grid);
  el.appendChild(inn);
});

/* ─── S07: DISCRETION ENGINE ─── */
s('分寸感引擎', (el) => {
  el.appendChild(glow('40%', '0%', '400px', 0.25));
  const inn = h('div', { cls: 'inner grid2r' });

  const L = h('div');
  L.appendChild(h('div', { cls: 'eye' }, '核心原创'));
  L.appendChild(h('div', { cls: 'h2', style: 'margin-bottom:20px' }, '分寸感引擎'));
  L.appendChild(h('div', { cls: 'body', style: 'margin-bottom:28px' },
    '分寸感引擎是 Evans 最核心的原创贡献。它不是规则引擎，也不是简单的情绪检测——它是一套对"该不该介入"进行多维度实时评估的决策系统，让 Evans 知道什么时候帮，更知道什么时候不帮。'));

  const dims = [
    ['场景维度', '私密度·严肃性·时间压力', 0.78],
    ['情绪维度', '情绪强度·稳定性·可承接性', 0.71],
    ['关系维度', '亲密度·授权程度·历史模式', 0.82],
  ];
  const barsBox = h('div', { style: 'margin-bottom:24px' });
  dims.forEach(([name, sub, val]) => {
    const row = h('div', { style: 'margin-bottom:14px' });
    const top = h('div', { style: 'display:flex;justify-content:space-between;align-items:baseline;margin-bottom:6px' });
    top.appendChild(h('div', { style: 'display:flex;flex-direction:column;gap:2px' },
      h('span', { cls: 'h4', style: 'font-size:12px' }, name),
      h('span', { cls: 'sm', style: 'font-size:10px' }, sub)));
    top.appendChild(h('span', { cls: 'mono', style: 'font-size:11px;color:var(--t2)' }, val.toFixed(2)));
    row.appendChild(top);
    const track = h('div', { cls: 'bar-track' });
    track.appendChild(h('div', { cls: 'bar-fill', style: `width:${val*100}%` }));
    row.appendChild(track);
    barsBox.appendChild(row);
  });
  L.appendChild(barsBox);

  const result = h('div', { style: 'padding:16px 20px;background:var(--glass);border-radius:8px;box-shadow:var(--g-top);display:flex;justify-content:space-between;align-items:center' });
  result.appendChild(h('div', { cls: 'sm' }, '加权介入分数'));
  result.appendChild(h('div', { cls: 'h2', style: 'font-size:28px' }, '0.74'));
  result.appendChild(h('div', { cls: 'sm', style: 'color:var(--t3)' }, '阈值 0.50 → 介入'));
  L.appendChild(result);
  L.appendChild(h('div', { cls: 'body', style: 'margin-top:16px;font-size:12px;color:var(--t3)' },
    '特殊情况：紧急事件跳过常规阈值 / 低于阈值时主动克制（如 S15 沉默场景得分 0.31）'));
  inn.appendChild(L);

  const R = h('div', { style: 'display:flex;flex-direction:column;gap:14px' });
  R.appendChild(imgSlot('assets/p3.png', 'Evans · Decision Engine', 'img-med'));
  const pq = h('div', { style: 'padding:18px 22px;background:var(--glass);border-radius:10px;box-shadow:var(--g-top);border-left:1.5px solid rgba(255,255,255,0.2)' });
  pq.appendChild(h('div', { cls: 'body italic', style: 'font-size:13px;color:var(--t1);line-height:1.7' },
    '「分寸感不是"不介入"，是"知道何时该介入"。」'));
  R.appendChild(pq);
  inn.appendChild(R);
  el.appendChild(inn);
});

/* ─── S08: MEMORY SYSTEM ─── */
s('记忆系统', (el) => {
  el.appendChild(glow('60%', '60%', '400px', 0.2));
  const inn = h('div', { cls: 'inner', style: 'justify-content:center;max-width:960px;margin:0 auto;padding:56px 80px' });
  inn.appendChild(h('div', { cls: 'eye' }, '三层记忆架构'));
  inn.appendChild(h('div', { cls: 'h2', style: 'margin-bottom:36px' }, '长期陪伴的技术基础'));

  const grid = h('div', { style: 'display:grid;grid-template-columns:1fr 1fr 1fr;gap:20px;margin-bottom:32px' });
  [
    ['情景记忆', 'Episodic Memory', '记录每一次对话事件，滚动保留最近30天的完整上下文。', ['滚动30天', '14,827条事件/用户', '实时写入 <5ms']],
    ['语义记忆', 'Semantic Memory', '提炼长期稳定的用户偏好，永久保存，构成用户"心理特征图谱"。', ['247维度偏好', '永久存储', '跨设备同步']],
    ['人格记忆', 'Personality Memory', '存储人生关键事件、核心关系网络、价值观倾向，支撑叙事认同重构。', ['关系图谱 47节点', '生命事件标注', '情感浓度分级']],
  ].forEach(([zh, en, desc, metas]) => {
    const card = h('div', { style: 'padding:20px;background:var(--glass);border-radius:10px;box-shadow:var(--g-top)' });
    card.appendChild(h('div', { cls: 'h4', style: 'margin-bottom:3px' }, zh));
    card.appendChild(h('div', { cls: 'sm mono', style: 'font-size:9px;color:var(--t4);margin-bottom:12px' }, en));
    card.appendChild(h('div', { cls: 'body', style: 'font-size:12px;margin-bottom:14px;line-height:1.6' }, desc));
    card.appendChild(h('div', { cls: 'hr' }));
    const list = h('div', { style: 'margin-top:12px;display:flex;flex-direction:column;gap:6px' });
    metas.forEach(m => {
      const row = h('div', { style: 'display:flex;align-items:center;gap:8px' });
      row.appendChild(h('div', { cls: 'nd', style: 'flex-shrink:0' }));
      row.appendChild(h('span', { cls: 'sm', style: 'font-size:11px' }, m));
      list.appendChild(row);
    });
    card.appendChild(list);
    grid.appendChild(card);
  });
  inn.appendChild(grid);

  const bottom = h('div', { style: 'padding:18px 24px;background:var(--glass);border-radius:10px;box-shadow:var(--g-top);display:flex;align-items:center;gap:32px' });
  [['213天', '最长单用户陪伴记录'], ['78%', '100天后的用户画像覆盖率'], ['31%', 'Evans人格与出厂版本的相似度']].forEach(([n, l]) => {
    const s_ = h('div', { style: 'text-align:center;flex:1' });
    s_.appendChild(h('div', { cls: 'stat-n', style: 'font-size:36px;margin-bottom:4px' }, n));
    s_.appendChild(h('div', { cls: 'sm' }, l));
    bottom.appendChild(s_);
  });
  inn.appendChild(bottom);
  el.appendChild(inn);
});

/* ─── S09: HARDWARE ─── */
s('硬件设计', (el) => {
  el.appendChild(glow('20%', '70%', '400px', 0.25));
  const inn = h('div', { cls: 'inner grid2' });

  const L = h('div');
  L.appendChild(h('div', { cls: 'eye' }, '硬件设计'));
  L.appendChild(h('div', { cls: 'h2', style: 'margin-bottom:20px' }, 'Evans 实体终端'));
  L.appendChild(h('div', { cls: 'body', style: 'margin-bottom:28px' },
    'Evans 的硬件形态是胸针与项链的双重可能。「佩戴在心脏位置」不是设计噱头，而是关于距离与亲密性的哲学选择——它离你足够近，才能真正感知你。'));

  const specCard = h('div', { style: 'padding:16px 20px;background:var(--glass);border-radius:10px;box-shadow:var(--g-top)' });
  [
    ['重量', '23g（胸针）/ 18g（项链）'],
    ['传感器', '6轴IMU · 4麦克风阵列 · 心率血氧 · 皮电'],
    ['摄像头', '鱼眼广角 · 170° FOV · 隐藏式'],
    ['计算', '端侧低功耗 NPU，敏感数据不出设备'],
    ['续航', '36小时连续使用 · 磁吸无线充电'],
    ['互联', '蓝牙 5.3 + Wi-Fi 6 · 50+ 设备类型'],
  ].forEach(([k, v]) => specCard.appendChild(spec(k, v)));
  L.appendChild(specCard);
  inn.appendChild(L);

  const R = h('div', { style: 'display:flex;flex-direction:column;gap:16px;height:100%;justify-content:center' });
  R.appendChild(imgSlot('assets/p4.png', 'Evans · Hardware', 'img-tall'));
  inn.appendChild(R);
  el.appendChild(inn);
});

/* ─── S10: VISUAL LANGUAGE ─── */
s('视觉语言', (el) => {
  el.appendChild(glow('50%', '30%', '500px', 0.2));
  const inn = h('div', { cls: 'inner', style: 'justify-content:center;max-width:960px;margin:0 auto;padding:56px 80px' });
  inn.appendChild(h('div', { cls: 'eye' }, '视觉语言规范'));
  inn.appendChild(h('div', { cls: 'h2', style: 'margin-bottom:10px' }, '执行场景动画 · 统一语汇'));
  inn.appendChild(h('div', { cls: 'body', style: 'margin-bottom:32px;max-width:600px' },
    '15个展演场景共享一套完整的视觉语言规范，确保从感知到执行的每个步骤都有清晰可读的视觉对应。'));

  const grid = h('div', { style: 'display:grid;grid-template-columns:1fr 1fr;gap:20px;margin-bottom:24px' });
  [
    ['蓝色动线三级制', '主蓝（Evans主动指令）/ 浅蓝（设备协作）/ 深蓝（跨端通报）。调用对象≤3时全用主蓝，4-6时主蓝+浅蓝，≥7时启用深蓝。'],
    ['虚拟工具浮层', '始终叠加在原场景之上，不切换镜头。Notion极简卡片风格，圆角、留白、无花哨配色。动画完成后缩小定格一角。'],
    ['设备状态文字框', '浮于被调用设备旁，随动画推进逐步更新。无调用时通过"没有状态文字"强化视觉留白。'],
    ['胸针光效语义', '暖白=在场 / 脉动=思考 / 黄=风险 / 橙=紧急 / 不亮=主动沉默（S15唯一）。全程无红色。'],
  ].forEach(([title, desc]) => {
    const card = h('div', { style: 'padding:18px 20px;background:var(--glass);border-radius:8px;box-shadow:var(--g-top)' });
    card.appendChild(h('div', { cls: 'h4', style: 'margin-bottom:8px' }, title));
    card.appendChild(h('div', { cls: 'body', style: 'font-size:12px;line-height:1.6' }, desc));
    grid.appendChild(card);
  });
  inn.appendChild(grid);
  inn.appendChild(imgSlot('assets/p5.png', 'Evans · UI Layer System', 'img-sm'));
  el.appendChild(inn);
});
