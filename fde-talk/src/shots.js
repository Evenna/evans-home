/* FDE · v4 · 口播 + 动画 合成版
   五种版式：TALK 全屏口播+侧边信息 / DEPTH 人物前景·字在人后 / SPLIT 分屏 / PIP 动画全屏+口播小窗 / FULL 纯动画
   3D：相机旋转统一阻尼到 25%（engine k3），只保留轻微纵深 */
const IN2 = (a, d = .45) => ({ o: [[a, 0], [a + d * .5, 1, "out"]] });
// —— 口播窗口预设（屏幕坐标）——
const R0 = { x: 0, y: 0, w: 1920, h: 1080, r: 0, z: 1, fx: 960, fy: 540, px: 960, py: 540 };
const RF = { ...R0, z: 1.12, fx: 808, fy: 400, px: 808, py: 400 };          // 推近脸
const RL = { ...R0, z: 1.25, fx: 808, fy: 540, px: 520, py: 540 };          // 人物移到左三分
const RS = { x: 1100, y: 110, w: 720, h: 820, r: 22, z: 1, fx: 790, fy: 560, px: 360, py: 410 };  // 分屏·右窗
const RP = { x: 1500, y: 96, w: 340, h: 400, r: 18, z: 1, fx: 800, fy: 500, px: 170, py: 200 };   // 画中画
function tw(A, B, t0 = 0, t1 = .6, e = "qio", extra = {}) {
  const k = {};
  for (const p of Object.keys(R0)) k[p] = A === B ? A[p] : [[t0, A[p]], [t1, B[p], e]];
  return Object.assign(k, extra);
}
const card = (c, html, k, w, h, cls = "glass", parent = null) =>
  c.add(`<div class="${cls}" style="width:${w}px;height:${h}px;padding:34px 38px;display:flex;flex-direction:column;justify-content:center;gap:10px">${html}</div>`, k, parent);
const M = (s, col = "var(--dim)", size = 18) => `<div class="mono" style="font-size:${size}px;color:${col}">${s}</div>`;
const slideIn = (t, x, from = 160) => ({ x: [[t, x + from], [t + .55, x]], o: [[t, 0], [t + .25, 1, "out"]] });
// 复用 v3 动画镜（相机旋转已被引擎阻尼）
function reuse(i, o = {}) {
  const b = LIB[i];
  shot(Object.assign({}, b, o, { build(c) { b.build(c); if (o.talkK) c.talk(o.talkK, { img: o.img ?? 0, border: true }); if (o.more) o.more(c); } }));
}

/* ═════ 00 冷开场 · FULL（无口播，纯动画 16s）═════ */
[0, 1, 2, 3, 4].forEach(i => reuse(i, { mode: "FULL", nosub: true, D: ["纯动画，不露人。相机 3D 旋转阻尼到原来的 25%，只留轻微纵深。"] }));

/* ═════ 01 钩子 ═════ */
shot({ ch: "01 · HOOK", mode: "TALK", dur: 6.6, tin: "fade", vo: "Anthropic 花一亿美元，说要让一万个人学会用它的模型。",
  D: ["口播全屏，人物不动。右侧书架区（x 1300–1860）是信息带：两张深色玻璃卡从右滑入。", "卡1 在说到「一亿美元」时进（1.2s）：$100M；卡2 在「一万个人」时进（2.6s），数字 0→10,000 滚动。", "卡片只做 −10° 轻侧转，不转镜头。"],
  build(c) {
    c.talk(tw(R0, R0));
    card(c, M("Anthropic · Partner Network") + `<div class="en" style="font-size:150px">$100M</div>`, { y: -190, ry: -10, ...slideIn(1.2, 600) }, 520, 270);
    const k2 = card(c, M("目标 · 2027 年底") + `<div class="en num" style="font-size:130px">0</div><div class="cn" style="font-size:40px;font-weight:700">人 · 学会用它的模型</div>`, { y: 130, ry: -10, ...slideIn(2.6, 600) }, 520, 320);
    const n = k2.querySelector(".num");
    c.on(t => { n.textContent = Math.round(10000 * E.qio(Math.max(0, Math.min(1, (t - 2.7) / 1.3)))).toLocaleString("en-US"); });
  } });

shot({ ch: "01 · HOOK", mode: "DEPTH", dur: 3.4, tin: "cut", vo: "我第一反应是，这不就是卖课吗。",
  D: ["推近到脸（1.0→1.12，0.5s 内完成后缓慢继续）。背景压暗 + 轻虚化。", "抠像人物在最前，「卖课？」珊瑚色大字放在人物 *身后*，被头部挡住一角 —— 杂志封面感。", "大字 0.5s 从 1.6 倍砸到 1 倍，轻震 8px。"],
  build(c) {
    c.talk(Object.assign(tw(R0, RF, 0, .5, "expo"), { dim: [[0, 0], [.45, 1]], co: [[0, 0], [.3, 1]] }));
    c.text("卖课？", 280, { x: 395, y: -200, o: [[.5, 0], [.56, 1, "lin"]], s: [[.5, 1.6], [.8, 1, "snap"]] }, { color: "#E5673F", parent: c.B });
    c.chars("这不就是", 64, 560, 130, .1, { mode: "up", stagger: .05 });
    c.shake(.56, .3, 8);
  } });

shot({ ch: "01 · HOOK", mode: "SPLIT", dur: 8.0, tin: "cut", vo: "一节教你怎么训练模型的都没有。全是教你怎么把已经训好的模型，塞进一家公司里。",
  D: ["口播从全屏收成右侧竖窗（0.6s，qio 缓动），人一直在说话不被遮。", "左半屏 A 段（0–3.6s）：11 门课小方块逐个翻入，第 12 格「训练」虚线框，然后大字 0 砸下。", "B 段（3.6s 起）：方块退场，办公室视频卡进入，LLM 小立方体慢转飞进卡片；「塞进一家公司」逐字落下。"],
  build(c) {
    c.talk(tw(RF, RS, 0, .6));
    const names = ["Prompt", "Agents", "Eval", "Code", "MCP", "Skills", "RAG", "Safety", "Deploy", "Ops", "Change"];
    for (let i = 0; i < 12; i++) {
      const x = -770 + (i % 4) * 190, y = -260 + ((i / 4) | 0) * 190, t = .5 + i * .06;
      const html = i < 11 ? `<div class="mono" style="width:170px;height:170px;border:2px solid rgba(242,237,228,.6);background:rgba(242,237,228,.06);display:flex;align-items:center;justify-content:center;font-size:16px">${names[i]}</div>`
        : `<div style="width:170px;height:170px;border:4px dashed var(--coral);display:flex;align-items:center;justify-content:center;font:900 44px var(--cn);color:var(--coral)">训练</div>`;
      c.add(html, { x, y, rx: [[t, -70], [t + .5, 0]], o: [[t, 0], [t + .2, 1], [1.9, 1], [2.1, i < 11 ? .2 : 1], [3.4, i < 11 ? .2 : 1], [3.7, 0]] });
    }
    c.text("0", 420, { x: -480, y: -60, o: [[1.9, 0], [1.95, 1, "lin"], [3.4, 1], [3.7, 0]], s: [[1.9, 2.2], [2.2, 1, "snap"]] }, { font: "en" });
    c.chars("节讲训练", 64, -480, 230, 2.2, { mode: "up", out: 3.4 });
    c.shake(1.95, .3, 8);
    c.vid("office", 860, 520, { x: -470, y: -40, ry: 6, o: [[3.6, 0], [3.9, 1]], s: [[3.6, .94], [4.2, 1]] }, { filter: "brightness(.78)" });
    c.add(M("Client · 一家公司", "var(--fg)"), { x: -720, y: -330, ...IN2(3.8) });
    const cb = c.add(`<div class="en" style="width:150px;height:150px;border:2px solid #F2EDE4;background:rgba(127,178,255,.35);display:flex;align-items:center;justify-content:center;font-size:52px">LLM</div>`,
      { x: [[3.8, -900], [5.4, -470, "io"]], y: [[3.8, -380], [5.4, -40, "io"]], rz: [[3.8, -20], [5.4, 0, "io"]], s: [[5.4, 1], [5.8, .4, "in"]], o: [[3.8, 0], [4, 1], [5.6, 1], [5.85, 0]] });
    c.chars("塞进一家公司", 92, -470, 330, 5.6, { mode: "slam", stagger: .05 });
    c.shake(5.85, .25, 6);
  } });

shot({ ch: "01 · HOOK", mode: "DEPTH", dur: 4.4, tin: "cut", vo: "这个岗位有名字，叫 FDE，前线部署工程师。",
  D: ["窗口放回全屏。背景压暗，FDE 巨型字（Anton 560px，轻挤出）放在人物身后。", "右下名牌条（lower-third）从右滑入：英文全称 + 中文名，当作「岗位名片」。"],
  build(c) {
    c.talk(Object.assign(tw(RS, R0, 0, .55), { dim: [[.3, 0], [.8, 1]], co: [[0, 0], [.5, 1]] }));
    c.text("FDE", 460, { x: 420, y: -210, o: [[.6, 0], [.9, 1]], s: [[.6, 1.15], [1.2, 1]] }, { font: "en", extrude: 10, parent: c.B });
    card(c, M("Forward Deployed Engineer", "var(--cool)") + `<div class="cn" style="font-size:64px">前线部署工程师</div>`, { y: 190, ...slideIn(1.4, 560) }, 600, 200);
  } });

shot({ ch: "01 · HOOK", mode: "TALK", dur: 3.8, tin: "cut", vo: "一门「装模型」的课，凭什么值一亿美元？",
  D: ["人物平移到左三分之一（放大 1.25 后左移），右侧空出一整块信息区。", "右侧玻璃面板：珊瑚色大问号 + 两行问题。问号做 ±12° 轻摆，不翻转。"],
  build(c) {
    c.talk(tw(R0, RL, 0, .55));
    card(c, `<div class="en" style="font-size:220px;color:var(--coral);line-height:.8">?</div><div class="cn" style="font-size:60px">一门「装模型」的课</div><div class="cn" style="font-size:60px">凭什么值 <span class="en" style="font-size:72px">$100M</span></div>`,
      { y: -40, ry: [[.5, -12], [3.8, -4, "io"]], ...slideIn(.5, 470) }, 720, 560);
  } });

/* ═════ 02 为什么值钱 ═════ */
reuse(10, { mode: "PIP", dur: 7.6, tin: "push", ws: { s: .8, x: -170 }, talkK: tw(RL, RP, 0, .6),
  D: ["动画铺满，口播缩进右上角画中画（0.6s 飞入）。三张流程卡：报销 / 客服工单 / 老数据库。", "画面整体缩到 80% 并左移，给小窗让位，不互相压。"] });

shot({ ch: "02 · WHY", mode: "DEPTH", dur: 4.8, tin: "cut", vo: "AI 的产出单位不是模型，是被改写的流程。",
  D: ["金句镜：画中画放大回左三分构图，背景压暗。", "右侧三行递进：小字 → 「不是模型」划掉 → 「是被改写的流程」珊瑚大字砸入。全片最重的一次重音。"],
  build(c) {
    c.talk(Object.assign(tw(RP, RL, 0, .6), { dim: [[.4, 0], [.9, .9]], co: [[0, 0], [.5, 1]] }));
    c.chars("AI 的产出单位", 60, 420, -280, .5, { mode: "up", css: "color:var(--dim);font-weight:500" });
    c.text("不是模型", 110, { x: 420, y: -130, ...IN2(.9) });
    c.add(`<div style="width:470px;height:9px;background:var(--fg)"></div>`, { x: 420, y: -125, sx: [[1.5, 0], [1.75, 1]], rz: -3 });
    c.text("是被改写的流程", 118, { x: 420, y: 60, o: [[2.1, 0], [2.15, 1, "lin"]], s: [[2.1, 1.5], [2.4, 1, "snap"]] }, { color: "#E5673F" });
    c.shake(2.15, .3, 8);
  } });

reuse(12, { mode: "FULL", dur: 4.2, tin: "slide", D: ["纯动画（人声继续）：研究员 vs FDE 左右对开。口播画面这时完全让位，给一次视觉换气。"] });

/* ═════ 03 五步 ═════ */
reuse(13, { mode: "PIP", dur: 7.8, tin: "push", ws: { s: .82, x: -150 }, talkK: tw(RP, RP), k3: .35,
  D: ["五根立柱升起（第 1、5 根金色）。口播画中画常驻右上。", "这里保留一点俯视角（3D 35%），因为柱子的高低差本身就是信息。"] });

shot({ ch: "03 · STEP 01", mode: "SPLIT", dur: 6.4, tin: "cut", vo: "第一步，划边界。哪些活全给 AI，哪些人机配合，哪些老老实实写死。",
  D: ["从画中画展开成右侧竖窗（0.6s）。左半屏：金色 01 + 「划边界」。", "三张米白卡片按口播节奏依次翻入（2.0 / 3.2 / 4.6s），每张卡对应一个词。"],
  build(c) {
    c.talk(tw(RP, RS, 0, .6));
    c.text("01", 220, { x: -760, y: -310, ...IN2(.3) }, { font: "en", color: "#E9B44C" });
    c.chars("划边界", 96, -440, -300, .5, { mode: "up" });
    [["全给 AI", "Auto", 2.0], ["人机配合", "Copilot", 3.2], ["写死", "Rule", 4.6]].forEach(([a, b, t], i) => {
      c.add(`<div class="paper" style="width:240px;height:330px;padding:26px;display:flex;flex-direction:column;justify-content:space-between">${M(b, "rgba(20,16,12,.5)")}<div class="cn ink" style="font-size:${a.length > 3 ? 48 : 58}px">${a}</div></div>`,
        { x: -730 + i * 265, y: 60, ry: [[t, -60], [t + .55, 0]], o: [[t, 0], [t + .2, 1]] });
    });
  } });

shot({ ch: "03 · STEP 01", mode: "TALK", dur: 4.0, tin: "cut", vo: "最省事的那一步，通常也是出事的那一步。",
  D: ["窗口放回全屏并推近到脸。", "说到「出事」时，头部右侧弹出珊瑚色贴纸（2D 旋转 −6°，0.3s 弹入），像手写批注。"],
  build(c) {
    c.talk(tw(RS, RF, 0, .55));
    c.add(M("最省事的那一步 =", "var(--fg)", 22), { x: 320, y: -360, ...IN2(.6) });
    c.add(`<div class="cn sticker" style="font-size:120px">出事</div>`, { x: 330, y: -230, rz: -6, s: [[1.9, 1.5], [2.2, 1, "snap"]], o: [[1.9, 0], [1.95, 1, "lin"]] });
  } });

shot({ ch: "03 · STEP 02", mode: "SPLIT", dur: 6.6, tin: "cut", vo: "第二步，选模型。先把思考力度调高试一遍，跑通了，再换便宜的小模型。",
  D: ["再次收成右侧竖窗。左半屏：02 + 三根柱：思考力度↑、测试分数↑，最后成本柱从高处落下（3.8–4.6s）。", "收尾一行小标「感觉行 → 测过行」。"],
  build(c) {
    c.talk(tw(RF, RS, 0, .6));
    c.text("02", 220, { x: -760, y: -310, ...IN2(.3) }, { font: "en", color: "#E9B44C" });
    c.chars("选模型", 96, -440, -300, .5, { mode: "up" });
    [["思考力度", [[1.2, 10], [2.2, 380, "io"]], "rgba(242,237,228,.9)"], ["测试分数", [[1.6, 10], [2.6, 340, "io"]], "#7FB2FF"],
     ["成本", [[1.6, 10], [2.4, 380, "io"], [3.8, 380], [4.6, 90, "io"]], "rgba(242,237,228,.35)"]].forEach(([s, tr, col], i) => {
      const x = -720 + i * 250, el = c.add(`<div style="width:150px;background:${col}"></div>`, { x, y: 260 }, null, { center: false, style: "margin-left:-75px" });
      c.on(t => { const h = ev(tr, t); el.firstChild.style.height = h + "px"; el.firstChild.style.marginTop = -h + "px"; });
      c.add(`<div class="cn" style="font-size:36px;font-weight:700">${s}</div>`, { x, y: 300, ...IN2(1) });
    });
    c.chars("感觉行 → 测过行", 52, -470, -160, 4.8, { mode: "up" });
  } });

reuse(17, { mode: "PIP", dur: 6.0, tin: "push", ws: { s: .82, x: -150 }, talkK: tw(RS, RP, 0, .6),
  D: ["代码屏背景 + 五个勾逐条打上。口播缩回画中画。"] });

shot({ ch: "03 · STEP 03", mode: "DEPTH", dur: 5.0, tin: "cut", vo: "规矩死板得要命。但是代码库这种地方，死板就是安全。",
  D: ["画中画放大回全屏，背景压暗。「死板」520px 放人物身后（0.2s 砸入）。", "右侧「就是 安全」在第二句出现（2.8s），「安全」做珊瑚色高亮块。"],
  build(c) {
    c.talk(Object.assign(tw(RP, RF, 0, .55), { dim: [[.3, 0], [.7, 1]], co: [[0, 0], [.4, 1]] }));
    c.text("死板", 400, { x: 400, y: -200, o: [[.5, 0], [.55, 1, "lin"]], s: [[.5, 1.4], [.8, 1, "snap"]] }, { parent: c.B });
    c.chars("就是 _安全_", 96, 560, 140, 2.8, { mode: "up" });
    c.shake(.55, .25, 6);
  } });

reuse(19, { mode: "PIP", dur: 7.6, tin: "push", ws: { s: .82, x: -150 }, talkK: tw(RF, RP, 0, .6),
  D: ["MCP 插座：三根插头按「工具 / 资源 / 模板」依次插入。口播画中画。"] });

shot({ ch: "03 · STEP 05", mode: "SPLIT", dur: 6.8, tin: "cut", vo: "第五步，交差。这一周最难。但是熬过头三十天，这个流程就真的换了主人。",
  D: ["右侧竖窗。左半屏：05 + 「交差」，下方 35 格日历。", "说到「熬过头三十天」（3.0s 起），前 30 格依次翻成冰蓝；最后「头 30 天」砸入。"],
  build(c) {
    c.talk(tw(RP, RS, 0, .6));
    c.text("05", 220, { x: -760, y: -310, ...IN2(.3) }, { font: "en", color: "#E9B44C" });
    c.chars("交差", 96, -470, -300, .5, { mode: "up" });
    for (let d = 0; d < 35; d++) {
      const x = -780 + (d % 7) * 96, y = -180 + ((d / 7) | 0) * 96, t = .6 + d * .02, sw = 3.0 + d * .05;
      const el = c.add(`<div class="mono" style="width:86px;height:86px;border:2px solid rgba(242,237,228,.45);display:flex;align-items:flex-end;padding:6px;font-size:14px">${d + 1}</div>`,
        { x, y, o: [[t, 0], [t + .2, d < 30 ? 1 : .35]], rx: [[sw, 0], [sw + .3, d < 30 ? 180 : 0, "io"]] });
      const b = el.firstChild;
      c.on(tt => { const on = tt > sw + .15 && d < 30; b.style.background = on ? "rgba(127,178,255,.85)" : "transparent"; b.style.color = on ? "#0D0E11" : ""; });
    }
    c.chars("头 30 天", 72, -480, 320, 4.8, { mode: "slam" });
  } });

/* ═════ 04 反方 ═════ */
reuse(21, { mode: "FULL", dur: 5.8, tin: "fade", kz: 1, D: ["转折镜，纯动画：穿过五道「人确认」门。这里保留纵深推进（z 轴满额），但不旋转。人声继续。"] });

shot({ ch: "04 · COUNTER", mode: "TALK", dur: 4.6, tin: "cut", vo: "方案要人点头，验收要人拍板，出了事是人背。",
  D: ["人物左三分。右侧三枚印章按口播节拍从上方盖下（0.4 / 1.6 / 2.9s），每次轻震 6px。", "第三枚「背」用珊瑚色，前两枚米白。"],
  build(c) {
    c.talk(tw(R0, RL, 0, .5));
    [["点头", "方案", .4], ["拍板", "验收", 1.6], ["背", "出事", 2.9]].forEach(([a, b, t], i) => {
      const red = i === 2, col = red ? "#E5673F" : "#F2EDE4";
      c.add(`<div style="width:250px;height:250px;border:7px solid ${col};border-radius:50%;display:flex;flex-direction:column;align-items:center;justify-content:center;color:${col};background:rgba(13,14,17,.55)">${M(b, col, 18)}<div class="cn" style="font-size:90px">${a}</div></div>`,
        { x: 200 + i * 280, y: -40 + (i % 2) * 60, rz: -8 + i * 6, s: [[t, 1.8], [t + .18, 1, "in"], [t + .4, 1]], o: [[t, 0], [t + .05, 1, "lin"]] });
      c.shake(t + .18, .25, 6);
    });
  } });

shot({ ch: "04 · COUNTER", mode: "DEPTH", dur: 5.6, tin: "cut", vo: "所以这门课真正筛的不是技术，是你敢不敢替客户做决定。",
  D: ["回全屏推近，背景压暗。「敢不敢」珊瑚色大字放人物身后。", "右侧上：灰色小字「筛的不是技术」；右侧下：「替客户做决定」在句尾出现。"],
  build(c) {
    c.talk(Object.assign(tw(RL, RF, 0, .55), { dim: [[.3, 0], [.8, 1]], co: [[0, 0], [.4, 1]] }));
    c.chars("筛的不是技术", 52, 560, -385, .6, { mode: "up", css: "color:var(--dim);font-weight:500" });
    c.text("敢不敢", 260, { x: 410, y: -200, o: [[2.2, 0], [2.25, 1, "lin"]], s: [[2.2, 1.5], [2.5, 1, "snap"]] }, { color: "#E5673F", parent: c.B });
    c.chars("替客户做决定", 76, 560, 150, 3.4, { mode: "up" });
  } });

reuse(24, { mode: "PIP", dur: 7.0, tin: "push", ws: { s: .85, x: -120 }, talkK: tw(RF, RP, 0, .6), D: ["焊花背景 +「标准之争」。口播画中画。标注「我的判断 · 不是官方说法」。"] });

/* ═════ 05 收束 ═════ */
shot({ ch: "05 · CLOSE", mode: "SPLIT", dur: 6.0, tin: "cut", vo: "十一门里，偏交付的三门只对合作伙伴开放。核心八门，公开免费。",
  D: ["右侧竖窗。左半屏 11 格：后 3 格变暗加「Partner only」，前 8 格亮起「Free」。", "说到「八门」时（3.6s）大字 8 砸入。"],
  build(c) {
    c.talk(tw(RP, RS, 0, .6));
    for (let i = 0; i < 11; i++) {
      const lock = i >= 8, x = -780 + (i % 4) * 175, y = -240 + ((i / 4) | 0) * 200, t = .4 + i * .05;
      const el = c.add(`<div class="mono" style="width:160px;height:180px;border:2px solid rgba(242,237,228,.85);padding:12px;display:flex;flex-direction:column;justify-content:space-between;font-size:14px"><span>${String(i + 1).padStart(2, "0")}</span><span class="st">·</span></div>`,
        { x, y, o: [[t, 0], [t + .2, 1]], s: [[t, .9], [t + .4, 1]] });
      const b = el.firstChild, st = b.querySelector(".st");
      c.on(tt => {
        const a = tt > (lock ? 1.6 : 3.6);
        b.style.opacity = lock && a ? .3 : 1; st.textContent = a ? (lock ? "Partner only" : "Free") : "·";
        st.style.color = a && !lock ? "#7FB2FF" : ""; b.style.background = a && !lock ? "rgba(127,178,255,.12)" : "";
      });
    }
    c.text("8", 300, { x: -180, y: 200, o: [[3.6, 0], [3.65, 1, "lin"]], s: [[3.6, 1.8], [3.9, 1, "snap"]] }, { font: "en" });
    c.text("门免费", 64, { x: 10, y: 250, ...IN2(3.9) });
  } });

reuse(26, { mode: "PIP", dur: 5.0, tin: "push", ws: { s: .85, x: -120 }, talkK: tw(RS, RP, 0, .6), D: ["签字笔特写 +「签字」砸入。口播画中画。"] });

shot({ ch: "05 · CLOSE", mode: "DEPTH", dur: 3.8, tin: "cut", vo: "模型不缺，缺焊它进流程的人。",
  D: ["全屏，背景压暗。一个巨大的金色「焊」字放在人物身后。", "右侧两行：「模型不缺，」+「缺焊它进流程的人」，金色光带从左到右扫过。"],
  build(c) {
    c.talk(Object.assign(tw(RP, R0, 0, .55), { dim: [[.3, 0], [.8, 1]], co: [[0, 0], [.4, 1]] }));
    c.text("焊", 500, { x: -580, y: -60, o: [[.6, 0], [1.1, .9]], s: [[.6, 1.2], [1.4, 1]] }, { color: "#E9B44C", parent: c.B });
    c.chars("模型不缺，", 72, 560, -90, .4, { mode: "up" });
    c.chars("缺焊它进流程的人", 72, 560, 20, 1.2, { mode: "up" });
    c.add(`<div style="width:620px;height:5px;background:linear-gradient(90deg,rgba(233,180,76,0),#E9B44C 40%,#fff 50%,#E9B44C 60%,rgba(233,180,76,0))"></div>`, { x: 560, y: 90, sx: [[2.0, 0], [2.8, 1, "io"]] });
  } });

shot({ ch: "05 · CLOSE", mode: "TALK", dur: 4.2, tin: "cut", end: .8, vo: "那个人，现在是你吗？",
  D: ["纯口播，不加任何图形，只慢推 1.0→1.06。最后 2 秒右侧淡入落版卡（课程入口）。结尾 0.8s 淡出。"],
  build(c) {
    c.talk({ ...R0, z: [[0, 1], [4.2, 1.06, "lin"]], fx: 808, fy: 420, px: 808, py: 420 });
    card(c, M("Anthropic Academy") + `<div class="cn" style="font-size:52px">8 门免费</div>` + M("搜索关键词 · FDE", "var(--cool)"), { y: -120, ...slideIn(2.0, 600, 100) }, 440, 230);
  } });
