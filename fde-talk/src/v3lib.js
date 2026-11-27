window.LIB=[];const lib=o=>LIB.push(o);
/* FDE · 3D motion 版 · 稿件：three-scripts-v2「① FDE 课程」 */
const W = 1920, H = 1080;
// 通用：满屏背景视频（放在 z=-400，镜头怎么动都不露边）
function bg(c, key, o = {}) {
  return c.vid(key, 2750, 1550, { z: o.z ?? -400, x: o.x ?? 0, y: o.y ?? 0, s: o.s ?? 1, o: o.o ?? 1, rz: o.rz ?? 0 },
    { cls: "clean", filter: o.filter || "brightness(.5) contrast(1.1) saturate(.85)", off: o.off || 0, rate: o.rate ?? 1, still: o.still });
}
const lbl = (c, s, x, y, k = {}, size = 18) =>
  c.add(`<div class="mono" style="font-size:${size}px">${s}</div>`, Object.assign({ x, y }, k));
const IN = (a, d = .5) => ({ o: [[a, 0], [a + d * .5, 1, "out"]] });
function cube(c, S, k, faces, parent) {
  const g = c.add("", k, parent);
  const T = [`translateZ(${S / 2}px)`, `rotateY(180deg) translateZ(${S / 2}px)`, `rotateY(90deg) translateZ(${S / 2}px)`,
    `rotateY(-90deg) translateZ(${S / 2}px)`, `rotateX(90deg) translateZ(${S / 2}px)`, `rotateX(-90deg) translateZ(${S / 2}px)`];
  T.forEach((tr, i) => {
    const f = document.createElement("div");
    f.style.cssText = `position:absolute;left:${-S / 2}px;top:${-S / 2}px;width:${S}px;height:${S}px;transform:${tr};
      background:${faces[i] || "rgba(242,237,228,.06)"};border:2px solid rgba(242,237,228,.85);backface-visibility:visible;
      display:flex;align-items:center;justify-content:center`;
    if (i === 0 && faces.label) f.innerHTML = faces.label;
    g.appendChild(f);
  });
  return g;
}

/* ═════════ 00 · 冷开场（无口播）═════════ */
lib({ ch: "00 · COLD OPEN", dur: 3.2, tin: "cut", breathe: 0, vo: "（无口播）$100,000,000 砸进画面",
  build(c) {
    bg(c, "money", { z: -900, s: 1.3, filter: "brightness(.28) saturate(.6) blur(2px)" });
    c.camera({ z: [[0, -300], [2.6, 120, "io"], [3.2, 180]], ry: [[0, -14], [3.2, 6, "io"]] });
    c.chars("$100,000,000", 260, 0, 0, .15, { font: "en", mode: "z", stagger: .07, dur: .55 });
    lbl(c, "Anthropic · Partner Network · 2026", 0, 190, IN(1.2));
    c.shake(1.0, .4, 18); c.flash(1.0, .25, .18);
  } });

lib({ ch: "00 · COLD OPEN", dur: 3.4, dir: 1, vo: "（无口播）十一门课依次亮起",
  build(c) {
    c.camera({ x: [[0, -520], [3.4, 520, "io"]], ry: [[0, -18], [3.4, 18, "io"]], z: [[0, -120], [3.4, 60, "io"]] });
    const keys = ["laptop", "code2", "office", "present", "wb", "racks", "typing", "plan", "sign", "monitors", "fiber"];
    keys.forEach((k, i) => {
      const a = i - 5, ang = a * 9, r = 2400;
      const x = Math.sin(ang * Math.PI / 180) * r, z = (Math.cos(ang * Math.PI / 180) - 1) * r - 200;
      const t = .12 + i * .09;
      c.vid(k, 380, 520, { x, z, y: [[t, 260], [t + .6, (i % 2 ? -30 : 30)]], ry: -ang, o: [[t, 0], [t + .25, 1, "out"]] },
        { filter: "brightness(.75) saturate(.8)", off: i * .3 });
      
    });
    c.text("11", 420, { z: 200, x: [[0, -520], [3.4, 520, "io"]], y: -40, o: [[.9, 0], [1.2, 1, "out"]], s: [[.9, 1.5], [1.4, 1, "snap"]] }, { font: "en", extrude: 14 });
    c.text("门课", 96, { z: 260, x: [[0, -520], [3.4, 520, "io"]], y: 200, ...IN(1.2) });
  } });

lib({ ch: "00 · COLD OPEN", dur: 3.0, dir: -1, vo: "（无口播）九个半小时",
  build(c) {
    bg(c, "clock", { s: 1.05, filter: "brightness(.42) contrast(1.15)" });
    c.camera({ z: [[0, 0], [3, 160, "io"]], rx: [[0, 8], [3, -4, "io"]] });
    c.text("9.5", 360, { x: -180, y: -40, rx: 10, ry: 22, o: [[.1, 0], [.3, 1]], z: [[.1, 600], [.7, 0]] }, { font: "en", extrude: 16 });
    c.text("H", 360, { x: 330, y: -40, rx: 10, ry: 22, o: [[.35, 0], [.55, 1]], z: [[.35, 600], [.9, 0]] }, { font: "en", extrude: 16, color: "#E5673F" });
    c.add(`<div style="width:900px;height:6px;background:rgba(242,237,228,.18)"></div>`, { y: 220 });
    c.add(`<div style="width:900px;height:6px;background:var(--fg);transform-origin:0 50%"></div>`, { y: 220, sx: [[.6, 0], [2.2, 1, "io"]] });
    lbl(c, "Total runtime · 9 h 30 min", 0, 270, IN(1));
  } });

lib({ ch: "00 · COLD OPEN", dur: 3.2, tin: "push", vo: "（无口播）一万人",
  build(c) {
    bg(c, "crowd", { s: [[0, 1.25], [3.2, 1.05, "io"]], filter: "brightness(.5) saturate(.7)", rate: .7 });
    c.camera({ rz: [[0, -3], [3.2, 2, "io"]], z: [[0, -100], [3.2, 80, "io"]] });
    const num = c.text("0", 330, { y: -30, rx: [[0, 30], [1.6, 0, "io"]], o: [[0, 0], [.3, 1]] }, { font: "en", extrude: 12 });
    const faces = num.querySelectorAll(".en");
    c.on(t => { const v = Math.round(10000 * E.qio(Math.min(1, t / 1.6))); const s = v.toLocaleString("en-US"); faces.forEach(f => f.textContent = s); });
    c.text("人", 120, { x: 0, y: 190, ...IN(1.5) });
    lbl(c, "Target by end of 2027", 0, 290, IN(1.7));
    c.shake(1.6, .3, 10);
  } });

lib({ ch: "00 · COLD OPEN", dur: 3.6, dir: 1, vo: "（无口播）十一门里，零节讲训练",
  build(c) {
    c.camera({ rx: [[0, 38], [3.6, 18, "io"]], z: [[0, -250], [3.6, -20, "io"]], y: [[0, 80], [3.6, 0, "io"]] });
    for (let i = 0; i < 12; i++) {
      const col = i % 6, row = (i / 6) | 0, x = (col - 2.5) * 250, y = (row - .5) * 250, t = .1 + i * .07;
      if (i < 11) c.add(`<div style="width:220px;height:220px;background:rgba(242,237,228,.08);border:2px solid rgba(242,237,228,.6);
          display:flex;align-items:center;justify-content:center" class="mono">${["Prompt", "Agents", "Eval", "Code", "MCP", "Skills", "RAG", "Safety", "Deploy", "Ops", "Change"][i]}</div>`,
        { x, y, z: [[t, -500], [t + .5, 0]], rx: [[t, -90], [t + .5, 0]], o: [[t, 0], [t + .2, 1], [2.1, 1], [2.3, .18]] });
      else c.add(`<div style="width:220px;height:220px;border:4px dashed var(--coral);display:flex;align-items:center;justify-content:center;
          font:900 54px var(--cn);color:var(--coral)">训练</div>`, { x, y, s: [[1.3, 1.6], [1.6, 1, "snap"]], o: [[1.3, 0], [1.4, 1]] });
    }
    c.text("0", 560, { z: 380, y: -40, s: [[2.1, 3], [2.4, 1, "snap"]], o: [[2.1, 0], [2.15, 1, "lin"]] }, { font: "en", extrude: 16 });
    c.text("节讲训练", 90, { z: 400, y: 230, ...IN(2.4) });
    c.shake(2.15, .4, 22); c.flash(2.15, .35);
  } });

/* ═════════ 01 · 钩子 ═════════ */
lib({ ch: "01 · HOOK", dur: 3.8, tin: "push", vo: "Anthropic 花一亿美元，说要让一万个人学会用它的模型。",
  build(c) {
    c.camera({ ry: [[0, 10], [3.8, -8, "io"]], x: [[0, -60], [3.8, 60, "io"]] });
    c.vid("present", 900, 1000, { x: -440, z: -120, ry: [[0, 40], [1, 22, "expo"]], o: [[0, 0], [.3, 1]] }, { filter: "brightness(.85)" });
    c.chars("花一亿美元", 120, 420, -150, .25, { mode: "flip" });
    c.chars("让 *一万个人*", 120, 420, 0, .55, { mode: "flip" });
    c.chars("学会用它的模型", 70, 420, 130, .9, { mode: "up", css: "color:var(--dim);font-weight:500" });
  } });

lib({ ch: "01 · HOOK", dur: 2.8, tin: "cut", vo: "我第一反应是，这不就是卖课吗。",
  build(c) {
    bg(c, "sales", { filter: "brightness(.35) saturate(.4) contrast(1.2)" });
    c.camera({ z: [[0, 0], [2.8, 140, "io"]] });
    c.chars("这不就是", 110, 0, -300, .1, { mode: "up", stagger: .04 });
    c.text("卖课？", 400, { y: 70, rz: -4, s: [[.5, 2.4], [.8, 1, "snap"]], o: [[.5, 0], [.55, 1, "lin"]] }, { extrude: 10, color: "#E5673F" });
    c.shake(.55, .35, 20); c.flash(.55, .3);
  } });

lib({ ch: "01 · HOOK", dur: 3.8, dir: -1, vo: "一节教你怎么训练模型的都没有。全是教你怎么把已经训好的模型，塞进一家公司里。",
  build(c) {
    c.camera({ ry: [[0, -30], [3.8, 10, "io"]], rx: [[0, 10], [3.8, 4]], z: [[0, -200], [3.8, 0, "io"]] });
    c.vid("office", 1100, 700, { x: 300, z: -200, ry: -20, o: [[0, 0], [.3, 1]] }, { filter: "brightness(.8)" });
    lbl(c, "Client · 一家公司", 300, -400, { z: -200, ry: -20, ...IN(.3) });
    const cb = cube(c, 200, { x: [[0, -700], [1.6, -700], [2.6, 220, "io"]], y: [[0, -60], [2.6, 0, "io"]], z: [[0, 200], [2.6, -180, "io"]],
      rx: [[0, -20], [3.8, 25]], ry: [[0, 0], [3.8, 300, "lin"]], s: [[2.6, 1], [2.9, .5, "in"]], o: [[2.75, 1], [2.95, 0]] },
      Object.assign(["rgba(127,178,255,.25)", "rgba(127,178,255,.25)", "rgba(127,178,255,.15)", "rgba(127,178,255,.15)", "rgba(127,178,255,.3)", "rgba(127,178,255,.1)"],
        { label: `<span class="en" style="font-size:64px">LLM</span>` }));
    c.chars("已经训好的模型", 74, -560, 260, .3, { mode: "up" });
    c.chars("塞进一家公司", 120, 300, 300, 2.6, { mode: "slam", stagger: .05 });
    c.shake(2.9, .3, 12);
  } });

lib({ ch: "01 · HOOK", dur: 3.6, tin: "push", vo: "这个岗位有名字，叫 FDE，前线部署工程师。",
  build(c) {
    bg(c, "engineer", { z: -1200, s: 1.7, filter: "brightness(.3) blur(3px)" });
    c.camera({ ry: [[0, -38], [3.6, 30, "qio"]], z: [[0, -200], [3.6, 60, "io"]] });
    c.text("FDE", 420, { y: -60, s: [[0, .6], [.5, 1]], o: [[0, 0], [.2, 1]] }, { font: "en", extrude: 30, depth: 3 });
    c.chars("Forward · Deployed · Engineer", 40, 0, 230, .7, { font: "en", mode: "up", stagger: .02, css: "letter-spacing:.12em" });
    c.chars("前线部署工程师", 52, 0, 310, 1.2, { mode: "up", css: "font-weight:500;color:var(--dim)" });
  } });

lib({ ch: "01 · HOOK", dur: 3.2, dir: 1, vo: "一门「装模型」的课，凭什么值一亿美元？",
  build(c) {
    c.camera({ z: [[0, -120], [3.2, 40, "io"]] });
    c.text("?", 880, { x: 440, y: 20, z: -300, ry: [[0, -80], [3.2, 70, "io"]], o: [[0, 0], [.4, .9]] }, { font: "en", extrude: 30, depth: 4, color: "#E5673F" });
    c.chars("一门「装模型」的课", 92, -330, -90, .15, { mode: "flip" });
    c.chars("凭什么值一亿美元", 92, -330, 40, .55, { mode: "flip" });
  } });

/* ═════════ 02 · 为什么值钱 ═════════ */
lib({ ch: "02 · WHY", dur: 4.0, tin: "push", vo: "企业现在不缺模型。缺的是把它接进报销、客服工单、跑了二十年的老数据库的人。",
  build(c) {
    c.camera({ ry: [[0, 8], [4, -8, "io"]], z: [[0, -260], [4, -120, "io"]], rx: [[0, -6], [4, 4, "io"]] });
    const g = c.group({ z: -200 });
    [["papers", "报销"], ["monitors", "客服工单"], ["racks", "二十年的老数据库"]].forEach(([k, s], i) => {
      const t = .3 + i * .25, x = (i - 1) * 580;
      const p = c.group({ x, ry: [[t, -70], [t + .7, (1 - i) * 12]], z: [[t, -600], [t + .7, 0]], o: [[t, 0], [t + .3, 1]] }, g);
      c.vid(k, 520, 620, {}, { parent: p, filter: "brightness(.7)" });
      c.add(`<div class="cn" style="font-size:${i === 2 ? 44 : 54}px">${s}</div>`, { y: 380, z: 2 }, p);
    });
    c.chars("企业不缺模型", 96, 0, -380, .05, { mode: "flip", z: 0 });
  } });

lib({ ch: "02 · WHY", dur: 4.2, tin: "cut", breathe: .5, vo: "AI 的产出单位不是模型，是被改写的流程。",
  build(c) {
    c.camera({ z: [[0, -900], [1.4, -300, "io"], [4.2, 120, "io"]], ry: [[0, -20], [4.2, 8, "io"]] });
    lbl(c, "这句话你可以记一下", 0, -330, { z: -600, ...IN(.1) }, 22);
    c.text("AI 的产出单位", 110, { z: -600, y: -200, ...IN(.2) });
    const m = c.text("不是模型", 130, { z: -300, y: -30, ...IN(.6) });
    c.add(`<div style="width:600px;height:10px;background:var(--fg)"></div>`, { z: -295, y: -30, sx: [[1.2, 0], [1.5, 1, "expo"]], rz: -4 });
    c.text("是被改写的流程", 160, { z: 0, y: 170, o: [[1.8, 0], [1.9, 1]], s: [[1.8, 1.8], [2.1, 1, "snap"]] }, { extrude: 12, color: "#E5673F" });
    c.shake(1.9, .3, 12);
  } });

lib({ ch: "02 · WHY", dur: 3.4, dir: -1, vo: "研究员让模型变强，FDE 让公司变样。",
  build(c) {
    c.camera({ rx: [[0, 10], [3.4, 0, "io"]] });
    c.vid("server", 900, 1080, { x: -470, ry: [[0, 0], [.7, 14]], z: -100, o: [[0, 0], [.2, 1]] }, { filter: "brightness(.6) saturate(.6)" });
    c.vid("meeting", 900, 1080, { x: 470, ry: [[0, -90], [.9, -14]], z: -100 }, { filter: "brightness(.6)" });
    c.chars("研究员", 120, -470, -60, .2, { mode: "up", z: 120 });
    c.chars("让模型变强", 60, -470, 70, .45, { mode: "up", z: 120, css: "font-weight:500" });
    c.chars("FDE", 160, 470, -60, 1.0, { font: "en", mode: "slam", z: 120 });
    c.chars("让 _公司变样_", 60, 470, 80, 1.3, { mode: "up", z: 120 });
  } });

/* ═════════ 03 · 五步 ═════════ */
lib({ ch: "03 · FIVE STEPS", dur: 4.6, tin: "push", vo: "五个步骤。但先说清楚，五步不是并列的——第一步和第五步决定成败，中间三步是手艺。",
  build(c) {
    c.camera({ rx: [[0, 58], [4.6, 34, "io"]], ry: [[0, -40], [4.6, -20, "io"]], z: [[0, -500], [4.6, -200, "io"]], y: [[0, 140], [4.6, 40]] });
    const names = ["划边界", "选模型", "进代码库", "连数据", "交差"];
    names.forEach((s, i) => {
      const key = i === 0 || i === 4, t = .2 + i * .18, hh = 120 + i * 90, x = (i - 2) * 280;
      const top = key ? "rgba(233,180,76,.95)" : "rgba(242,237,228,.14)";
      const g = c.group({ x, y: 0, z: 0 });
      // 立柱 = 顶面 + 正面
      c.add(`<div style="width:240px;height:240px;background:${top};border:2px solid rgba(242,237,228,.8)"></div>`,
        { z: [[t, 0], [t + .6, hh, "back"]] }, g);
      c.add(`<div style="width:240px;height:${hh}px;background:rgba(242,237,228,${key ? .22 : .07});border:2px solid rgba(242,237,228,.6);transform-origin:50% 0"></div>`,
        { y: 120, rx: -90, sy: [[t, 0], [t + .6, 1, "back"]] }, g, {});
      c.add(`<div class="en" style="font-size:110px;color:${key ? "#0D0E11" : "#F2EDE4"}">0${i + 1}</div>`, { z: [[t, 0], [t + .6, hh + 2, "back"]], ...IN(t + .3) }, g);
      c.add(`<div class="cn" style="font-size:46px">${s}</div>`, { y: 190, z: [[t, 0], [t + .6, hh + 2, "back"]], ...IN(t + .4) }, g);
    });
    c.add(`<div class="mono" style="font-size:24px;color:var(--gold)">1 &amp; 5 决定成败 · 2–4 是手艺</div>`, { y: -260, z: 20, ...IN(2.2) });
  } });

lib({ ch: "03 · STEP 01", dur: 3.8, tin: "cut", vo: "第一步，划边界。哪些活全给 AI，哪些人机配合，哪些老老实实写死。",
  build(c) {
    bg(c, "plan", { filter: "brightness(.3) saturate(.5)" });
    c.camera({ ry: [[0, 16], [3.8, -10, "io"]], z: [[0, -80], [3.8, 40, "io"]] });
    c.text("01", 420, { x: -600, y: -120, z: -200, ry: 30, ...IN(.05), s: [[0, 1.6], [.4, 1, "snap"]] }, { font: "en", extrude: 18, color: "#E9B44C" });
    c.chars("划边界", 110, -600, 180, .3, { mode: "flip" });
    [["全给 AI", "Auto"], ["人机配合", "Copilot"], ["写死", "Rule"]].forEach(([a, b], i) => {
      const t = .9 + i * .3;
      c.add(`<div style="width:300px;height:420px;background:rgba(242,237,228,.92);color:#0D0E11;padding:34px;display:flex;flex-direction:column;justify-content:space-between">
        <div class="mono" style="color:rgba(13,14,17,.55)">${b}</div><div class="cn" style="font-size:58px">${a}</div></div>`,
        { x: 60 + i * 330, y: 0, z: [[t, -600], [t + .6, 0]], ry: [[t, -70], [t + .6, -8]], o: [[t, 0], [t + .2, 1]] });
    });
  } });

lib({ ch: "03 · STEP 01", dur: 3.0, dir: 1, vo: "最省事的那一步，通常也是出事的那一步。",
  build(c) {
    bg(c, "papers", { filter: "brightness(.42) saturate(.6)", rate: 1.6 });
    c.camera({ rz: [[0, 4], [3, -2, "io"]], z: [[0, -60], [3, 120, "io"]] });
    c.chars("最省事的那一步", 96, 0, -110, .1, { mode: "up" });
    c.chars("也是*出事*的那一步", 150, 0, 70, .8, { mode: "slam", stagger: .05 });
    c.shake(1.05, .3, 14);
  } });

lib({ ch: "03 · STEP 02", dur: 3.8, tin: "push", vo: "第二步，选模型。先把思考力度调高试一遍，跑通了，再换便宜的小模型。",
  build(c) {
    c.camera({ ry: [[0, -26], [3.8, 14, "io"]], rx: [[0, 18], [3.8, 8, "io"]], z: [[0, -160], [3.8, 0, "io"]] });
    c.text("02", 300, { x: -640, y: -270, z: -300, ...IN(.05) }, { font: "en", extrude: 14, color: "#E9B44C" });
    c.chars("选模型", 90, -640, -60, .2, { mode: "flip" });
    const bars = [["思考力度", [[.4, 40], [1.4, 420, "io"]], "rgba(242,237,228,.9)"], ["测试分数", [[.6, 40], [1.6, 380, "io"]], "#7FB2FF"],
      ["成本", [[.6, 40], [1.4, 420, "io"], [2.4, 420], [3.1, 110, "io"]], "rgba(242,237,228,.35)"]];
    bars.forEach(([s, tr, col], i) => {
      const x = -60 + i * 260;
      c.add(`<div style="width:170px;height:1px;background:${col}"></div>`, { x, y: 300, z: 0, sy: tr, rx: 0 }, null, { style: "transform-origin:50% 100%" });
      // 用高度动画：sy 作用在 1px 元素上
      c.add(`<div class="cn" style="font-size:40px;font-weight:700">${s}</div>`, { x, y: 350, ...IN(.4) });
    });
    c.chars("感觉行 → 测过行", 64, 200, -330, 2.4, { mode: "up" });
  } });

lib({ ch: "03 · STEP 03", dur: 4.0, tin: "cut", vo: "第三步，进代码库。读一遍、定方案、人点头、再动手、测试过才提交。",
  build(c) {
    c.camera({ ry: [[0, 22], [4, -6, "io"]], z: [[0, -120], [4, 30, "io"]] });
    c.vid("code2", 1300, 820, { x: 260, z: -300, ry: -24, rx: 4, o: [[0, 0], [.3, 1]] }, { filter: "brightness(.45) saturate(.6)" });
    c.text("03", 240, { x: 680, y: -330, z: -60, ...IN(.05) }, { font: "en", extrude: 14, color: "#E9B44C" });
    ["读一遍", "定方案", "人点头", "再动手", "测试过 → 提交"].forEach((s, i) => {
      const t = .4 + i * .42;
      c.add(`<div class="cn" style="font-size:62px;display:flex;align-items:center"><span class="chk">✓</span>${s}</div>`,
        { x: 0, y: -170 + i * 110, z: [[t, 300], [t + .45, 60]], o: [[t, 0], [t + .15, 1]], rx: [[t, -60], [t + .45, 0]] }, null, { center: false, style: "margin-left:-560px" });
    });
  } });

lib({ ch: "03 · STEP 03", dur: 2.4, tin: "cut", tout: "cut", breathe: 0, vo: "规矩死板得要命。但是代码库这种地方，死板就是安全。",
  build(c) {
    c.camera({ z: [[0, 0], [2.4, 80, "lin"]] });
    c.text("死板", 520, { s: [[0, 1.4], [.25, 1, "snap"]] }, { extrude: 14 });
    c.chars("就是 _安全_", 90, 0, 330, .6, { mode: "up" });
    c.shake(.05, .3, 16);
  } });

lib({ ch: "03 · STEP 04", dur: 4.2, tin: "push", vo: "第四步，连数据。MCP 当插座：能改的做成工具，只读的做成资源，常问的做成模板。",
  build(c) {
    bg(c, "fiber", { filter: "brightness(.35) saturate(.9) hue-rotate(-10deg)" });
    c.camera({ rx: [[0, 0], [4.2, 0]], ry: [[0, -30], [4.2, 22, "io"]], z: [[0, -200], [4.2, 0, "io"]] });
    c.text("04", 260, { x: -700, y: -330, z: -100, ...IN(.05) }, { font: "en", extrude: 12, color: "#E9B44C" });
    c.text("MCP", 220, { x: -250, y: -10, z: -60, ...IN(.2), ry: 20 }, { font: "en", extrude: 16 });
    c.add(`<div style="width:820px;height:480px;border:3px solid rgba(242,237,228,.85);background:rgba(13,14,17,.6)"></div>`, { x: 360, z: -60, ...IN(.3) });
    [["工具", "可写"], ["资源", "只读"], ["模板", "常问"]].forEach(([a, b], i) => {
      const x = 360 + (i - 1) * 260, t = 1.1 + i * .45;
      c.add(`<div style="width:120px;height:120px;border-radius:50%;border:3px solid rgba(242,237,228,.85);background:#0D0E11"></div>`, { x, y: -50, z: -58, ...IN(.4) });
      c.add(`<div style="width:46px;height:640px;background:linear-gradient(#7FB2FF,#7FB2FF 30%,rgba(127,178,255,.2));border-radius:8px"></div>`,
        { x, y: [[t, -600], [t + .4, -380, "snap"]], z: [[t, 400], [t + .4, -40, "snap"]], o: [[t, 0], [t + .1, 1]] });
      c.add(`<div class="cn" style="font-size:52px">${a}<span class="mono" style="font-size:18px;margin-left:12px">${b}</span></div>`, { x, y: 110, z: -40, ...IN(t + .3) });
    });
    c.shake(1.5, .15, 6); c.shake(1.95, .15, 6); c.shake(2.4, .15, 6);
  } });

lib({ ch: "03 · STEP 05", dur: 4.4, tin: "cut", vo: "第五步，交差。这一周最难。但是熬过头三十天，这个流程就真的换了主人。",
  build(c) {
    c.camera({ rx: [[0, 40], [4.4, 22, "io"]], ry: [[0, 12], [4.4, -12, "io"]], z: [[0, -260], [4.4, -60, "io"]] });
    c.vid("cal2", 1100, 700, { x: -440, z: -400, rx: -12, o: [[0, 0], [.3, 1]] }, { filter: "brightness(.55) saturate(.7)" });
    c.text("05", 260, { x: -500, y: -300, z: 80, rx: -30, ...IN(.05) }, { font: "en", extrude: 14, color: "#E9B44C" });
    for (let d = 0; d < 35; d++) {
      const col = d % 7, row = (d / 7) | 0, x = 140 + col * 112, y = -240 + row * 112, t = .3 + d * .025;
      const sweep = 1.4 + d * .055;
      const el = c.add(`<div style="width:100px;height:100px;border:2px solid rgba(242,237,228,.5);display:flex;align-items:flex-end;padding:8px" class="mono">${d + 1}</div>`,
        { x, y, z: [[t, -200], [t + .4, 0]], o: [[t, 0], [t + .2, d < 30 ? 1 : .35]], rx: [[sweep, 0], [sweep + .35, d < 30 ? 180 : 0, "io"]] });
      const bgc = el.firstChild;
      c.on(tt => { bgc.style.background = tt > sweep + .17 && d < 30 ? "rgba(127,178,255,.85)" : "rgba(242,237,228,.06)"; bgc.style.color = tt > sweep + .17 && d < 30 ? "#0D0E11" : ""; });
    }
    c.chars("头 30 天", 120, 470, 400, 3.2, { mode: "slam", z: 60, rx: -30 });
  } });

/* ═════════ 04 · 反方 ═════════ */
lib({ ch: "04 · COUNTER", dur: 4.0, tin: "push", vo: "可是九个小时看完，不等于你会做。课里每一步都写着「人确认」。",
  build(c) {
    c.camera({ z: [[0, -200], [4, 2600, "qio"]], x: [[0, 0], [4, 0]] });
    for (let i = 0; i < 5; i++) {
      const z = -i * 700;
      c.add(`<div style="width:760px;height:900px;border:4px solid rgba(242,237,228,.85);"></div>`, { z, o: [[0, 0], [.3, 1]] });
      c.add(`<div class="cn" style="font-size:90px">人确认</div>`, { z: z + 2, y: -520, ...IN(.2) });
      c.add(`<div class="mono" style="font-size:22px">Gate ${i + 1} / 5</div>`, { z: z + 2, y: 490, ...IN(.2) });
    }
    c.leak(.5, 3.8, "127,178,255");
  } });

lib({ ch: "04 · COUNTER", dur: 4.0, tin: "cut", vo: "方案要人点头，验收要人拍板，出了事是人背。",
  build(c) {
    bg(c, "sign", { filter: "brightness(.45) saturate(.6)" });
    c.camera({ rx: [[0, 30], [4, 18, "io"]], z: [[0, -100], [4, 40, "io"]] });
    [["点头", "方案"], ["拍板", "验收"], ["背", "出事"]].forEach(([a, b], i) => {
      const t = .4 + i * .9, x = (i - 1) * 540, red = i === 2;
      c.add(`<div style="width:400px;height:400px;border:10px solid ${red ? "#E5673F" : "#F2EDE4"};border-radius:50%;display:flex;flex-direction:column;align-items:center;justify-content:center;
          color:${red ? "#E5673F" : "#F2EDE4"}"><div class="mono" style="color:inherit;font-size:24px">${b}</div><div class="cn" style="font-size:150px">${a}</div></div>`,
        { x, rz: -8 + i * 6, z: [[t, 700], [t + .18, 0, "in"]], o: [[t, 0], [t + .05, 1, "lin"]], s: [[t + .18, 1.08], [t + .4, 1, "out"]] });
      c.shake(t + .18, .3, 18);
    });
  } });

lib({ ch: "04 · COUNTER", dur: 3.4, dir: 1, vo: "所以这门课真正筛的不是技术，是你敢不敢替客户做决定。",
  build(c) {
    bg(c, "chess" in SEQ ? "chess" : "safe", { filter: "brightness(.35) saturate(.5)" });
    c.camera({ ry: [[0, -12], [3.4, 12, "io"]] });
    c.chars("筛的不是技术", 80, 0, -140, .1, { mode: "up", css: "color:var(--dim)" });
    c.chars("是你*敢不敢*", 170, 0, 40, .8, { mode: "flip", stagger: .06 });
    c.chars("替客户做决定", 80, 0, 220, 1.4, { mode: "up" });
  } });

lib({ ch: "04 · COUNTER", dur: 4.4, tin: "push", vo: "谁的插座先被焊上，后来的模型就顺着谁的插座插。这更像一次标准之争。",
  build(c) {
    bg(c, "weld", { filter: "brightness(.7) contrast(1.2)", s: [[0, 1.2], [4.4, 1.0, "io"]] });
    c.camera({ z: [[0, -60], [4.4, 100, "io"]], rz: [[0, -2], [4.4, 1.5]] });
    c.leak(0, 4.4, "233,140,60");
    lbl(c, "我的判断 · 不是官方说法", 0, -320, IN(.1), 22);
    c.chars("谁的插座先被焊上", 100, 0, -160, .3, { mode: "flip" });
    c.chars("后来的模型就顺着它插", 70, 0, -20, 1.1, { mode: "up", css: "font-weight:500" });
    c.text("标准之争", 220, { y: 200, o: [[2.3, 0], [2.35, 1, "lin"]], s: [[2.3, 2], [2.6, 1, "snap"]] }, { extrude: 12 });
    c.shake(2.35, .35, 16); c.flash(2.35, .3);
  } });

/* ═════════ 05 · 收束 ═════════ */
lib({ ch: "05 · CLOSE", dur: 3.8, tin: "cut", vo: "十一门里，偏交付的三门只对合作伙伴开放。核心八门，公开免费。",
  build(c) {
    c.camera({ rx: [[0, 30], [3.8, 10, "io"]], ry: [[0, 20], [3.8, -10, "io"]], z: [[0, -260], [3.8, -80, "io"]] });
    for (let i = 0; i < 11; i++) {
      const lock = i >= 8, x = (i % 6 - 2.5) * 215 - 130, y = ((i / 6) | 0) * 250 - 60, t = .1 + i * .06;
      c.add(`<div style="width:200px;height:220px;border:2px solid rgba(242,237,228,${lock ? .25 : .9});background:${lock ? "rgba(242,237,228,.03)" : "rgba(242,237,228,.1)"};
          display:flex;flex-direction:column;justify-content:space-between;padding:16px" class="mono"><span>${String(i + 1).padStart(2, "0")}</span>
          <span style="color:${lock ? "rgba(242,237,228,.4)" : "#7FB2FF"}">${lock ? "Partner only" : "Free"}</span></div>`,
        { x, y, z: [[t, -400], [t + .5, 0]], o: [[t, 0], [t + .2, 1]], rx: [[1.6, 0], [2.1, lock ? 0 : -14, "io"]] });
    }
    c.text("8", 400, { x: 660, y: -60, z: 300, s: [[1.8, 2], [2.1, 1, "snap"]], o: [[1.8, 0], [1.85, 1, "lin"]] }, { font: "en", extrude: 18 });
    c.text("门免费", 80, { x: 660, y: 230, z: 300, ...IN(2.1) });
    c.shake(1.85, .3, 10);
  } });

lib({ ch: "05 · CLOSE", dur: 3.8, dir: -1, vo: "然后问第二句，这句更难：谁敢在那张验收单上签字。",
  build(c) {
    c.vid("pen", 1700, 960, { z: -200, ry: [[0, -16], [3.8, 6, "io"]], o: [[0, 0], [.2, 1]] }, { filter: "brightness(.55)", rate: .8, cls: "clean" });
    c.camera({ z: [[0, -100], [3.8, 120, "io"]] });
    c.chars("谁敢在那张验收单上", 80, 0, -200, .3, { mode: "up" });
    c.text("签字", 330, { y: 60, o: [[1.4, 0], [1.45, 1, "lin"]], s: [[1.4, 2.2], [1.7, 1, "snap"]] }, { extrude: 14 });
    const cur = c.add(`<div style="width:10px;height:260px;background:#E5673F"></div>`, { x: 360, y: 60 });
    c.on(t => { cur.style.opacity = t > 1.7 && Math.floor(t * 2.6) % 2 ? 1 : 0; });
    c.shake(1.45, .3, 14);
  } });

lib({ ch: "05 · CLOSE", dur: 4.6, tin: "push", vo: "模型不缺，缺焊它进流程的人。",
  build(c) {
    bg(c, "weld2", { z: -1400, s: 2, filter: "brightness(.4) blur(2px)" });
    c.camera({ z: [[0, 300], [4.6, -350, "qio"]], ry: [[0, 18], [4.6, -10, "io"]], rx: [[0, -6], [4.6, 4, "io"]] });
    c.chars("模型不缺，", 120, 0, -110, .2, { mode: "flip", stagger: .06 });
    c.chars("缺*焊它进流程*的人。", 150, 0, 70, .9, { mode: "flip", stagger: .06 });
    // 焊缝光带
    c.add(`<div style="width:1300px;height:6px;background:linear-gradient(90deg,rgba(233,180,76,0),#E9B44C 40%,#fff 50%,#E9B44C 60%,rgba(233,180,76,0));filter:blur(1px)"></div>`,
      { y: 190, sx: [[1.9, 0], [2.9, 1, "io"]], o: [[1.9, 0], [2.1, 1]] });
    c.leak(1.9, 4.6, "233,180,76");
  } });

lib({ ch: "05 · CLOSE", dur: 4.0, tin: "cut", tout: "cut", breathe: .4, vo: "那个人，现在是你吗？",
  build(c) {
    c.camera({ z: [[0, -80], [4, 60, "lin"]] });
    c.chars("那个人，", 110, 0, -90, .2, { mode: "up", stagger: .06 });
    c.chars("现在是你吗？", 150, 0, 70, .8, { mode: "up", stagger: .07 });
    lbl(c, "Anthropic Academy · 8 门免费 · 关键词 FDE", 0, 330, IN(2.2), 20);
    c.on(t => { document.querySelector(".persp").style.opacity = t > 3.3 ? Math.max(0, 1 - (t - 3.3) / .7) : 1; });
  } });
