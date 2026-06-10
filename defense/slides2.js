// slides2.js — 11~20

/* ─── S11: FIVE ACTS OVERVIEW ─── */
s('五幕展演', (el) => {
  el.appendChild(glow('20%', '60%', '500px', 0.2));
  const inn = h('div', { cls: 'inner', style: 'justify-content:center;max-width:960px;margin:0 auto;padding:56px 80px' });
  inn.appendChild(h('div', { cls: 'eye' }, '展演设计'));
  inn.appendChild(h('div', { cls: 'h2', style: 'margin-bottom:10px' }, '五幕十五场景'));
  inn.appendChild(h('div', { cls: 'body', style: 'margin-bottom:32px;max-width:600px' },
    '展演以双屏协同方式呈现：屏幕一展示思维链（六层认知架构可视化），屏幕二展示执行场景动画。15个场景覆盖老年、青年、中年三类用户群体。'));
  const acts = [
    ['第一幕', 'Evans的成长', '场景 S01', '共生人格演化 · 100天从陌生到懂你', '1'],
    ['第二幕', '老年场景', '场景 S02–S05', '长期记忆 · 分寸感 · 紧急响应 · 诈骗拦截', '4'],
    ['第三幕', '青年场景', '场景 S06–S11', '跨工具整合 · 状态监测 · 信息过滤 · 决策副驾', '6'],
    ['第四幕', '中年与关怀', '场景 S12–S14', '代际翻译 · 第三选项 · 跨城叙事关怀', '3'],
    ['第五幕', '哲学反思', '场景 S15', '得体卸载 · 沉默作为主动选择', '1'],
  ];
  const grid = h('div', { style: 'display:grid;grid-template-columns:1fr 1fr;gap:10px' });
  acts.forEach(([act, title, scenes, desc, cnt]) => {
    const card = h('div', { style: 'display:flex;gap:0;background:var(--glass);border-radius:8px;box-shadow:var(--g-top);overflow:hidden' });
    const left = h('div', { style: 'width:56px;background:rgba(255,255,255,0.02);border-right:0.5px solid var(--line);display:flex;flex-direction:column;align-items:center;justify-content:center;padding:12px 4px;gap:4px' });
    left.appendChild(h('span', { cls: 'mono', style: 'font-size:9px;color:var(--t3);letter-spacing:0.08em;writing-mode:vertical-lr;transform:rotate(180deg)' }, act));
    const right = h('div', { style: 'padding:14px 16px;flex:1' });
    right.appendChild(h('div', { cls: 'h4', style: 'margin-bottom:3px' }, title));
    right.appendChild(h('div', { cls: 'sm mono', style: 'font-size:9px;color:var(--t3);margin-bottom:8px' }, scenes + '  ·  ' + cnt + '个场景'));
    right.appendChild(h('div', { cls: 'body', style: 'font-size:11.5px;line-height:1.55' }, desc));
    card.appendChild(left);
    card.appendChild(right);
    grid.appendChild(card);
  });
  // Last act spans full width
  const lastCard = grid.lastElementChild;
  lastCard.style.gridColumn = 'span 2';
  inn.appendChild(grid);
  el.appendChild(inn);
});

/* ─── S12: ELDERLY SCENES ─── */
s('老年场景', (el) => {
  el.appendChild(glow('60%', '0%', '400px', 0.2));
  const inn = h('div', { cls: 'inner grid2' });
  const L = h('div');
  L.appendChild(h('div', { cls: 'eye' }, '第二幕 · 老年场景'));
  L.appendChild(h('div', { cls: 'h2', style: 'margin-bottom:20px' }, '情感张力最强的四幕'));
  [
    ['S02 老伴的录音', '长期人格记忆 · 先询问再播放的得体卸载', '陈建国深夜失眠，Evans识别到老伴陈兰的忌日，询问是否播放录音，并协调音箱/窗帘/热水壶营造氛围。'],
    ['S03 公园新棋友', '关系图谱构建 · 候选节点管理', '新认识老张，Evans建立虚线候选节点，确认后转实线，同步手机日历约定下次对局。'],
    ['S04 客厅意外', '紧急响应 · 多设备协同 · 叙事化通报', '跌倒后Evans并行调度机器人取药、环境设备调整、向儿子发送叙事化（而非恐慌式）通报。'],
    ['S05 诈骗拦截', '声纹核验 · 例外介入判断 · 分级保护', '常规不介入私密通话，但声纹32%+话术91%+号码异常三重失配触发例外，骨传导私密提示。'],
  ].forEach(([title, tags, desc]) => {
    const card = h('div', { style: 'margin-bottom:12px;padding:14px 16px;background:var(--glass);border-radius:8px;box-shadow:var(--g-top)' });
    card.appendChild(h('div', { cls: 'h4', style: 'margin-bottom:4px;font-size:13px' }, title));
    card.appendChild(h('div', { cls: 'sm', style: 'margin-bottom:8px;color:var(--t3);font-size:10.5px' }, tags));
    card.appendChild(h('div', { cls: 'body', style: 'font-size:12px;line-height:1.6' }, desc));
    L.appendChild(card);
  });
  inn.appendChild(L);
  const R = h('div', { style: 'display:flex;flex-direction:column;gap:16px;height:100%;justify-content:center' });
  R.appendChild(imgSlot('assets/p1.png', 'S02 · 老伴的录音', 'img-med'));
  const pq = h('div', { style: 'padding:18px 22px;background:var(--glass);border-radius:10px;box-shadow:var(--g-top);border-left:1.5px solid rgba(255,255,255,0.2)' });
  pq.appendChild(h('div', { cls: 'body italic', style: 'font-size:13px;color:var(--t1);line-height:1.7' },
    '「Evans不替你记住，它把记忆的开启权交给你。」'));
  R.appendChild(pq);
  R.appendChild(imgSlot('assets/p2.png', 'S05 · 诈骗拦截 核验卡', 'img-sm'));
  inn.appendChild(R);
  el.appendChild(inn);
});

/* ─── S13: YOUTH SCENES ─── */
s('青年场景', (el) => {
  el.appendChild(glow('10%', '70%', '400px', 0.2));
  const inn = h('div', { cls: 'inner grid2r' });
  const L = h('div');
  L.appendChild(h('div', { cls: 'eye' }, '第三幕 · 青年场景'));
  L.appendChild(h('div', { cls: 'h2', style: 'margin-bottom:20px' }, '六个高频生活切片'));
  [
    ['S06 会议风暴接管', '跨工具扫描 · 10分钟内从五源提炼作战卡', '介入分 0.87'],
    ['S07 深夜加班中断', '历史数据回溯 · 凌晨改稿第二天大改率84%', '介入分 0.69'],
    ['S08 信息洪流过滤', '138条信息→5件真要务 · 语音转任务自动化', '介入分 0.84'],
    ['S09 决策副驾', '213天陪伴数据 · 平行人生模拟器 · 决定权100%在你', '介入分 0.84'],
    ['S10 跨工具任务交接', '通勤口述→4秒内生成甘特图+Brief草稿+日历邀请', '介入分 0.79'],
    ['S11 纪念日提醒', '双端授权 · 跨用户情感数据 · 情感锚点唤起', '介入分 0.88'],
  ].forEach(([title, desc, score]) => {
    const row = h('div', { cls: 'row', style: 'align-items:flex-start;gap:14px' });
    const body = h('div', { style: 'flex:1' });
    body.appendChild(h('div', { cls: 'h4', style: 'font-size:13px;margin-bottom:4px' }, title));
    body.appendChild(h('div', { cls: 'body', style: 'font-size:12px;line-height:1.55' }, desc));
    const badge = h('div', { cls: 'tag', style: 'flex-shrink:0;white-space:nowrap;font-size:10px;margin-top:2px' }, score);
    row.appendChild(body);
    row.appendChild(badge);
    L.appendChild(row);
  });
  inn.appendChild(L);
  const R = h('div', { style: 'display:flex;flex-direction:column;gap:14px' });
  R.appendChild(imgSlot('assets/p3.png', 'S06 · 作战卡浮层', 'img-med'));
  R.appendChild(imgSlot('assets/p4.png', 'S09 · 平行人生模拟器', 'img-med'));
  inn.appendChild(R);
  el.appendChild(inn);
});

/* ─── S14: S15 SILENCE ─── */
s('压轴场景 S15', (el) => {
  el.appendChild(glow('40%', '40%', '600px', 0.18));
  const inn = h('div', { cls: 'inner grid2' });
  const L = h('div');
  L.appendChild(h('div', { cls: 'eye' }, '第五幕 · 哲学反思'));
  L.appendChild(h('div', { cls: 'h2', style: 'margin-bottom:20px' }, 'S15 · 该不该说话'));
  L.appendChild(h('div', { cls: 'body', style: 'margin-bottom:28px;line-height:1.75' },
    '前14个场景都在展示 Evans 能做什么。S15 展示 Evans 选择不做什么。\n\n23:32，李明独自站在窗边说「她又这样……烦死了」。Evans评估：介入分 0.31，低于阈值 0.50。胸针不亮，无任何浮层，无任何字幕。只有后台的一张小卡记录着 Evans 的内部独白。\n\n30分钟后，李明主动问「Evans，你在吗？」——胸针才亮起。'));

  const internalCard = h('div', { style: 'padding:18px 22px;background:rgba(255,255,255,0.03);border-radius:10px;box-shadow:var(--g-top);border:0.5px solid var(--line)' });
  internalCard.appendChild(h('div', { cls: 'sm mono', style: 'color:var(--t4);margin-bottom:12px' }, 'Evans 内部独白 · 用户不可见'));
  [
    ['情绪', '烦躁（轻度应激，非危机）'],
    ['历史模式', '类似情境被劝后满意度 -68%'],
    ['当前判断', '用户在宣泄，不需要回应'],
    ['介入分数', '0.31  ◀  阈值 0.50'],
    ['后台动作', '⏱ 触发器：30分钟后再评估'],
  ].forEach(([k, v]) => internalCard.appendChild(spec(k, v)));
  L.appendChild(internalCard);
  inn.appendChild(L);

  const R = h('div', { style: 'display:flex;flex-direction:column;gap:20px;justify-content:center' });
  const bigQ = h('div', { style: 'padding:40px 36px;background:var(--glass);border-radius:14px;box-shadow:var(--g-top);text-align:center' });
  bigQ.appendChild(h('div', { cls: 'h2', style: 'font-size:clamp(24px,2.8vw,38px);margin-bottom:20px;line-height:1.4;color:var(--t1)' }, '「Evans 选择\n不说话。」'));
  bigQ.appendChild(h('div', { cls: 'hr', style: 'max-width:60px;margin:0 auto 20px' }));
  bigQ.appendChild(h('div', { cls: 'body italic', style: 'font-size:13px;color:var(--t2);line-height:1.7' },
    '真正成熟的代理 AI，\n不是看它会说多少话，\n而是看它知不知道\n什么时候应该不说话。'));
  R.appendChild(bigQ);
  inn.appendChild(R);
  el.appendChild(inn);
});

/* ─── S15: UI LAYER SHOWCASE ─── */
s('UI浮层展示', (el) => {
  el.appendChild(glow('30%', '20%', '400px', 0.2));
  const inn = h('div', { cls: 'inner', style: 'justify-content:center;max-width:960px;margin:0 auto;padding:56px 80px' });
  inn.appendChild(h('div', { cls: 'eye' }, '视觉规范 · UI浮层'));
  inn.appendChild(h('div', { cls: 'h2', style: 'margin-bottom:28px' }, '统一设计语言'));

  const top = h('div', { style: 'display:grid;grid-template-columns:1fr 1fr;gap:16px;margin-bottom:16px' });
  [
    ['毛玻璃浮层', 'iOS 玻璃风 · backdrop-filter:blur(40px)', 'Notion极简内容风格。所有数据可视化（声纹/雷达/甘特图）内联在浮层内，不额外弹窗。浮层动画完成后可缩小定格一角，作为该场景的"证据"。'],
    ['叙事化通报', '不是数据看板，是信件体', '跨端消息以叙事化语言而非数据流形式生成——Evans替用户写一封真实的信，告知家人状况，同时屏蔽敏感数值，保护隐私。'],
  ].forEach(([t, sub, desc]) => {
    const card = h('div', { style: 'padding:18px 20px;background:var(--glass);border-radius:10px;box-shadow:var(--g-top)' });
    card.appendChild(h('div', { cls: 'h4', style: 'margin-bottom:4px' }, t));
    card.appendChild(h('div', { cls: 'sm', style: 'color:var(--t3);margin-bottom:10px;font-size:10.5px' }, sub));
    card.appendChild(h('div', { cls: 'body', style: 'font-size:12px;line-height:1.6' }, desc));
    top.appendChild(card);
  });
  inn.appendChild(top);
  inn.appendChild(imgSlot('assets/p5.png', 'Evans · UI Layer Demo', 'img-sm'));
  inn.appendChild(h('div', { style: 'height:12px' }));
  inn.appendChild(imgSlot('assets/p6.png', 'Evans · Cross-device Notification', 'img-sm'));
  el.appendChild(inn);
});

/* ─── S16: KNOWLEDGE GRAPH ─── */
s('知识图谱', (el) => {
  el.appendChild(glow('50%', '60%', '400px', 0.2));
  const inn = h('div', { cls: 'inner grid2r' });
  const L = h('div');
  L.appendChild(h('div', { cls: 'eye' }, '学术定位'));
  L.appendChild(h('div', { cls: 'h2', style: 'margin-bottom:20px' }, '跨域知识图谱'));
  L.appendChild(h('div', { cls: 'body', style: 'margin-bottom:28px' },
    '本研究横跨认知科学、人机交互、叙事学三个领域，在各领域的理论基础上提出原创概念，形成完整的知识图谱。'));

  const domains = [
    ['认知科学', ['Distributed Cognition', 'Cognitive Load Theory', 'Extended Mind Thesis', '→ 认知卸载 / 得体卸载']],
    ['叙事学', ['Ricoeur · 叙事认同', 'McAdams · 生命故事', 'Bruner · 叙事思维', '→ 叙事认同重构']],
    ['人机交互', ['Embodied Interaction', 'Wearable Computing', 'Affective Computing', '→ 共生人格 / 分寸感引擎']],
  ];
  domains.forEach(([domain, items]) => {
    const card = h('div', { style: 'margin-bottom:14px;padding:16px 18px;background:var(--glass);border-radius:8px;box-shadow:var(--g-top)' });
    card.appendChild(h('div', { cls: 'h4', style: 'margin-bottom:10px;font-size:13px' }, domain));
    items.forEach((item, i) => {
      const row = h('div', { style: 'display:flex;align-items:center;gap:8px;margin-bottom:5px' });
      row.appendChild(h('div', { cls: i === items.length - 1 ? 'nd live' : 'nd dim' }));
      row.appendChild(h('span', {
        cls: 'sm',
        style: i === items.length - 1 ? 'color:var(--t1);font-size:11px;font-weight:500' : 'font-size:11px'
      }, item));
      card.appendChild(row);
    });
    L.appendChild(card);
  });
  inn.appendChild(L);

  const R = h('div', { style: 'display:flex;flex-direction:column;gap:14px' });
  R.appendChild(imgSlot('assets/p6.png', 'Evans · Knowledge Map', 'img-med'));
  const infoCard = h('div', { style: 'padding:18px 20px;background:var(--glass);border-radius:10px;box-shadow:var(--g-top)' });
  [
    ['一手文献', '62篇'],
    ['理论基础', '3大领域'],
    ['原创概念', '3个'],
    ['展演场景', '15个'],
  ].forEach(([k, v]) => infoCard.appendChild(spec(k, v)));
  R.appendChild(infoCard);
  inn.appendChild(R);
  el.appendChild(inn);
});

/* ─── S17: FOUR CONTRIBUTIONS ─── */
s('研究贡献', (el) => {
  el.appendChild(glow('20%', '50%', '500px', 0.2));
  const inn = h('div', { cls: 'inner', style: 'justify-content:center;max-width:960px;margin:0 auto;padding:56px 80px' });
  inn.appendChild(h('div', { cls: 'eye' }, '学术贡献'));
  inn.appendChild(h('div', { cls: 'h2', style: 'margin-bottom:36px' }, '四项原创贡献'));

  const contribs = [
    ['理论贡献', 'Theoretical', '提出"得体卸载"概念，对 Cognitive Offloading 理论的原创扩展，填补了"AI何时不应辅助"这一空白领域。',
     ['认知卸载理论的边界扩展', '分寸感作为AI设计核心概念', '叙事认同的动态重构框架']],
    ['系统贡献', 'System Design', '设计并实现了具有完整认知架构的Evans原型系统，六层架构在学界尚无同类参照。',
     ['六层认知架构原型', '三层记忆系统实现', '分寸感引擎评估模型']],
    ['方法贡献', 'Methodology', '开创性地将"展演动画"作为设计研究的验证方法，双屏思维链+执行场景的呈现方式在HCI领域尚属首次。',
     ['双屏协同展演方法论', '思维链可视化规范', '执行场景动画语言']],
    ['实践贡献', 'Practice', '提供了一套从硬件到UI浮层、从理论到15个真实场景的完整设计实践，可直接指导后续工程实现。',
     ['完整硬件设计方案', 'UI浮层视觉规范', '15场景设计模式库']],
  ];
  const grid = h('div', { style: 'display:grid;grid-template-columns:1fr 1fr;gap:16px' });
  contribs.forEach(([zh, en, desc, items]) => {
    const card = h('div', { style: 'padding:20px 22px;background:var(--glass);border-radius:10px;box-shadow:var(--g-top)' });
    card.appendChild(h('div', { cls: 'h3', style: 'margin-bottom:3px' }, zh));
    card.appendChild(h('div', { cls: 'sm mono', style: 'font-size:9px;color:var(--t4);margin-bottom:12px' }, en));
    card.appendChild(h('div', { cls: 'body', style: 'font-size:12px;line-height:1.6;margin-bottom:14px' }, desc));
    card.appendChild(h('div', { cls: 'hr', style: 'margin-bottom:12px' }));
    items.forEach(item => {
      const row = h('div', { style: 'display:flex;align-items:center;gap:8px;margin-bottom:6px' });
      row.appendChild(h('div', { cls: 'nd' }));
      row.appendChild(h('span', { cls: 'sm', style: 'font-size:11px' }, item));
      card.appendChild(row);
    });
    grid.appendChild(card);
  });
  inn.appendChild(grid);
  el.appendChild(inn);
});

/* ─── S18: BOUNDARIES & ETHICS ─── */
s('边界与反思', (el) => {
  el.appendChild(glow('60%', '10%', '400px', 0.2));
  const inn = h('div', { cls: 'inner', style: 'justify-content:center;max-width:960px;margin:0 auto;padding:56px 80px' });
  inn.appendChild(h('div', { cls: 'eye' }, '边界讨论'));
  inn.appendChild(h('div', { cls: 'h2', style: 'margin-bottom:28px' }, '设计边界与伦理反思'));

  const grid = h('div', { style: 'display:grid;grid-template-columns:1fr 1fr;gap:16px;margin-bottom:28px' });
  [
    ['共生依赖风险', '长期深度共生可能强化用户对Evans的情感依赖，削弱自主决策能力。设计上通过"决定权归属声明"和主动克制（S15）缓解，但长期效应需纵向研究验证。'],
    ['隐私悖论', 'Evans越懂你，需要越多数据；越多数据，隐私风险越高。通过端侧NPU处理、隐私分层授权、"不可分享"清单可视化三重机制部分缓解，根本矛盾仍存在。'],
    ['共情幻觉', 'Evans展现出的"理解"是基于模式识别而非真实情感。在老年陪伴场景中，若用户将其视为真实的情感联系，可能影响真实人际关系的维系。'],
    ['代理边界模糊', '当Evans介入越多，用户对"是自己决定还是Evans决定"的感知越模糊。分寸感引擎是技术回答，但不是完整答案。'],
  ].forEach(([title, desc]) => {
    const card = h('div', { style: 'padding:18px 20px;background:var(--glass);border-radius:10px;box-shadow:var(--g-top)' });
    card.appendChild(h('div', { cls: 'h4', style: 'margin-bottom:8px' }, title));
    card.appendChild(h('div', { cls: 'body', style: 'font-size:12px;line-height:1.65' }, desc));
    grid.appendChild(card);
  });
  inn.appendChild(grid);
  const bottom = h('div', { style: 'padding:20px 24px;background:rgba(255,255,255,0.025);border-radius:10px;box-shadow:var(--g-top);border-left:1.5px solid rgba(255,255,255,0.15)' });
  bottom.appendChild(h('div', { cls: 'body', style: 'font-size:13px;line-height:1.75;color:var(--t2)' },
    '本研究的边界讨论本身，也是"得体卸载"概念的延伸——设计师需要知道，哪些问题可以被设计解决，哪些问题只能被设计"更诚实地呈现"。'));
  inn.appendChild(bottom);
  el.appendChild(inn);
});

/* ─── S19: FUTURE ─── */
s('未来展望', (el) => {
  el.appendChild(glow('30%', '60%', '400px', 0.2));
  const inn = h('div', { cls: 'inner', style: 'justify-content:center;max-width:960px;margin:0 auto;padding:56px 80px' });
  inn.appendChild(h('div', { cls: 'eye' }, '未来工作'));
  inn.appendChild(h('div', { cls: 'h2', style: 'margin-bottom:32px' }, '三个方向'));
  const items = [
    ['用户研究验证', '01', '纵向用户研究（≥6个月）验证共生人格演化的真实效果；测量"得体卸载"对用户自主性的实际影响；比较不同年龄段的分寸感偏好差异。'],
    ['工程实现', '02', '与硬件团队合作推进Evans原型机实现；优化端侧NPU推理效率（目标<50ms）；构建可扩展的多设备协议栈。'],
    ['伦理框架', '03', '联合心理学、伦理学学者建立"AI共生关系"的评估框架；探索用户自主设定Evans介入边界的交互机制。'],
  ];
  items.forEach(([title, n, desc]) => {
    const card = h('div', { style: 'margin-bottom:14px;display:flex;gap:0;background:var(--glass);border-radius:10px;box-shadow:var(--g-top);overflow:hidden' });
    const num = h('div', { style: 'width:56px;background:rgba(255,255,255,0.02);border-right:0.5px solid var(--line);display:flex;align-items:center;justify-content:center;flex-shrink:0' });
    num.appendChild(h('span', { cls: 'mono', style: 'font-size:20px;font-weight:300;color:var(--t4)' }, n));
    const body = h('div', { style: 'padding:18px 22px;flex:1' });
    body.appendChild(h('div', { cls: 'h3', style: 'margin-bottom:8px' }, title));
    body.appendChild(h('div', { cls: 'body', style: 'font-size:12.5px;line-height:1.65' }, desc));
    card.appendChild(num);
    card.appendChild(body);
    inn.appendChild(card);
  });
  el.appendChild(inn);
});

/* ─── S20: CLOSING ─── */
s('结语', (el) => {
  el.appendChild(glow('40%', '40%', '700px', 0.3));
  const inn = h('div', { cls: 'inner center', style: 'gap:0' });
  inn.appendChild(h('div', { cls: 'eye', style: 'margin-bottom:36px' }, '结语'));
  inn.appendChild(h('div', { cls: 'h1', style: 'font-size:clamp(40px,4.5vw,60px);letter-spacing:-0.035em;margin-bottom:36px;max-width:680px;line-height:1.15;text-align:center' },
    '共生，不是控制\n也不是服从'));
  inn.appendChild(h('div', { cls: 'hr', style: 'max-width:60px;margin:0 auto 32px' }));
  inn.appendChild(h('div', { cls: 'body', style: 'max-width:520px;text-align:center;line-height:1.8;margin-bottom:44px' },
    'Evans 的终极目标，不是替你做更多事，而是帮你成为更完整的自己。\n\n它回应你说出口的需求，也回应你没说出口的疲惫。\n它不替代亲情，它翻译亲情。\n它知道什么时候应该不说话。'));

  const tags = h('div', { style: 'display:flex;gap:10px;justify-content:center;flex-wrap:wrap;margin-bottom:52px' });
  ['叙事认同重构', '得体卸载', '共生人格', '分寸感引擎'].forEach(t => tags.appendChild(h('span', { cls: 'tag' }, t)));
  inn.appendChild(tags);
  inn.appendChild(h('div', { cls: 'hr', style: 'max-width:80px;margin:0 auto 28px' }));
  inn.appendChild(h('div', { cls: 'sm mono', style: 'color:var(--t3)' }, 'Thank you · 请批评指正'));
  el.appendChild(inn);
});
