/* 小豆 Personal Agent · 竖版 1080×1920 ·  图标 + 口播合成
   版式：TALK 口播全屏 / LOW 人在下半屏·上半屏图解 / CARD 口播圆角卡·上方图解 / DEPTH 字在人身后 / PIP 图解全屏+口播小窗 / FULL 纯动画
   世界坐标原点 = 画面中心 (540,960)；安全区：x ±475，y −700…+760（顶部 196px 处有章节标签） */
const RF = { x: 0, y: 0, w: 1080, h: 1920, r: 0, z: 1, fx: 540, fy: 960, px: 540, py: 960 };
const RZ = { ...RF, z: 1.22, fx: 505, fy: 620, px: 540, py: 700 };              // 推近脸
const RB = { x: 0, y: 820, w: 1080, h: 1100, r: 0, z: 1, fx: 540, fy: 860, px: 540, py: 550 };   // 人在下半屏
const RC = { x: 90, y: 930, w: 900, h: 740, r: 40, z: 1.25, fx: 505, fy: 600, px: 450, py: 370 }; // 圆角卡
const RP = { x: 720, y: 250, w: 300, h: 380, r: 30, z: 1.6, fx: 505, fy: 640, px: 150, py: 190 }; // 右上小窗
function tw(A, B, t0 = 0, t1 = .6, e = "qio", ex = {}) { const k = {}; for (const p of Object.keys(RF)) k[p] = A === B ? A[p] : [[t0, A[p]], [t1, B[p], e]]; return Object.assign(k, ex); }
const FI = (a, d = .28) => ({ o: [[a, 0], [a + d, 1, "out"]] });
const UP = (a, y, d = 60) => ({ y: [[a, y + d], [a + .3, y, "out"]], o: [[a, 0], [a + .25, 1, "out"]] });
const POP = (a, s0 = .6) => ({ s: [[a, s0], [a + .32, 1, "back"]], o: [[a, 0], [a + .1, 1, "lin"]] });
const SLAM = a => ({ s: [[a, 1.5], [a + .28, 1, "snap"]], o: [[a, 0], [a + .05, 1, "lin"]] });
const OFF = (k, a, d = .2) => { k.o = [...(k.o || [[0, 1]]), [a, 1], [a + d, 0, "in"]]; return k; };
const DIM = (k, a, v = .25) => { k.o = [...(k.o || [[0, 1]]), [a, 1], [a + .3, v]]; return k; };
const pill = (c, s, cls, k) => c.add(`<span class="pill ${cls}">${s}</span>`, k);
const lab = (c, s, size, k, col = "var(--navy)", f = "cn", css = "") => c.add(`<div class="${f}" style="font-size:${size}px;color:${col};${css}">${s}</div>`, k);
const phone = (c, w, h, k, inner = "", bg = "#16181D") => c.add(`<div class="phn" style="width:${w}px;height:${h}px;background:${bg}"><div class="nt"></div>${inner}</div>`, k);
const app = (c, s, bg, col, k, sz = 200) => c.add(`<div class="app" style="width:${sz}px;height:${sz}px;background:${bg};color:${col};font-size:${sz * .36}px">${s}</div>`, k);
const useIll = (c, k) => { if (!c.used.ill.includes(k)) c.used.ill.push(k); };
const ntf = (c, ill, a, b, k, w = 860) => { useIll(c, ill); return c.add(`<div class="ntf" style="width:${w}px">${ICN(ill,96,true)}<div><div class="cn" style="font-size:46px">${a}</div><div style="font:500 30px var(--cn);opacity:.65;margin-top:8px;white-space:nowrap">${b}</div></div></div>`, k); };
const strike = (c, w, x, y, a, col = "var(--tom)", parent = null) => c.add(`<div style="width:${w}px;height:12px;border-radius:6px;background:${col}"></div>`, { x, y, rz: -3, sx: [[a, 0], [a + .3, 1, "out"]] }, parent);
const bubble = (c, s, me, k, w) => c.add(`<div style="max-width:${w || 560}px;padding:22px 30px;border-radius:30px;${me ? "background:var(--navy);color:var(--cream);border-bottom-right-radius:8px" : "background:var(--paper);color:var(--navy);border-bottom-left-radius:8px;box-shadow:0 8px 20px rgba(0,0,0,.5)"};font:600 36px/1.35 var(--cn);white-space:nowrap">${s}</div>`, k);
const line = (c, x, y, h, a, d = .4, col = "var(--navy)", w = 8) => { const g = c.add(`<div style="width:${w}px;background:${col};border-radius:4px;margin-left:${-w / 2}px"></div>`, { x, y }, null, { center: false }); c.on(t => { g.firstChild.style.height = h * E.out(Math.max(0, Math.min(1, (t - a) / d))) + "px"; }); return g; };
const hbar = (c, x, y, w, a, d = .5, col = "var(--navy)", h = 10) => { const g = c.add(`<div style="height:${h}px;background:${col};border-radius:${h / 2}px;margin-top:${-h / 2}px"></div>`, { x, y }, null, { center: false }); c.on(t => { g.firstChild.style.width = w * E.out(Math.max(0, Math.min(1, (t - a) / d))) + "px"; }); return g; };
const vidp = (c, key, w, h, k, opt = {}) => c.vid(key, w, h, k, opt);

/* ═════ 第一章 · 钩子（#01–05 冷开场无人声）═════ */
shot({ ch: "01 · 钩子", mode: "FULL", dur: 3.0, nosub: true, vo: "（无人声）",
  L: "纯动画。墨黑底，手机框 620×1060 居中（屏幕 y 470–1530），顶部与底部各留一条给字卡。",
  K: ["0.0 手机框从下方 80px 上浮入（0.3s ease-out），搜索框已在", "0.4 打出「小」；0.7 打出「豆」，光标闪两下", "1.2 结果区弹出纸折问号图标（0.32s 回弹）", "1.4 灰字「未找到相关结果」淡入", "1.9「搜不到」140px 珊瑚橙 coral从 1.5 倍砸到 1，画面轻震 6px", "2.6 停住，留 0.4s 给观众读"],
  T: "「搜不到」思源黑体 Heavy 140px，珊瑚橙 coral #E2553A，屏幕 y≈1680 居中",
  snd: "BGM-1 低频铺底 -30dB；打字 tick ×2（-22dB）；落字一声闷鼓（-20dB）",
  tip: "动画版可直接用。想更真实：录一段应用商店搜「小豆」的屏幕，打码商店标识与账号，替换手机框里的内容。", src: "M01 应用商店搜索录屏（待录，选用）",
  build(c) {
    phone(c, 620, 1060, { y: 40, ...UP(0, 40, 80) });
    c.add(`<div style="width:520px;height:84px;border-radius:42px;background:rgba(242,237,228,.08);display:flex;align-items:center;padding-left:34px;font:500 36px var(--cn);color:rgba(242,237,228,.45)">搜索</div>`, { y: -380, ...UP(.05, -380, 80) });
    lab(c, "小", 40, { x: -110, y: -380, o: [[.4, 0], [.42, 1, "lin"]] });
    lab(c, "豆", 40, { x: -68, y: -380, o: [[.7, 0], [.72, 1, "lin"]] });
    c.add(`<div style="width:3px;height:44px;background:var(--tom)"></div>`, { x: -40, y: -380, o: [[.75, 0], [.76, 1, "lin"], [.95, 1], [.96, 0, "lin"], [1.1, 0], [1.11, 1, "lin"], [1.3, 1], [1.31, 0, "lin"]] });
    c.ill("question", 230, { y: -40, ...POP(1.2) });
    lab(c, "未找到相关结果", 40, { y: 260, ...FI(1.4) }, "rgba(242,237,228,.5)", "cn", "font-weight:600");
    lab(c, "搜不到", 140, { y: 720, ...SLAM(1.9) }, "var(--tom)");
    c.shake(1.95, .3, 6); c.sfx(1.9, "闷鼓");
  } });

shot({ ch: "01 · 钩子", mode: "FULL", dur: 3.5, nosub: true, vo: "（无人声）", tin: "slide",
  L: "纯动画。手机框同位置，换成邀请页：珊瑚橙 coral顶条 + 钥匙图标 + 6 格空邀请码。",
  K: ["0.0 横向滑入（0.22s）", "0.2 钥匙图标弹出，之后上下轻浮（幅度 8px）", "0.6–1.1 6 个邀请码空格依次出现（间隔 0.08s）", "1.3「邀请制公测」黄色胶囊从下弹入", "1.6 右上「邀请制」110px 落下", "全程镜头缓推 1.04 倍"],
  T: "「邀请制」110px 暖白，屏幕右上 y≈330；手机内胶囊「邀请制公测」32px",
  snd: "BGM 在 0.0 全停，只剩房间底噪；胶囊弹入一声轻 pop（-24dB）",
  tip: "正式版可换官方邀请页截图（个人邀请码务必打码）。", src: "M02 官方邀请页截图（待截，选用）",
  build(c) {
    c.camera({ z: [[0, 0], [3.5, 70, "lin"]] });
    phone(c, 620, 1060, { y: 40 }, `<div style="height:230px;background:var(--tom)"></div>`);
    c.ill("key", 230, { y: -210, bob: 8, ...POP(.2) });
    for (let i = 0; i < 6; i++) c.add(`<div style="width:70px;height:92px;border-radius:14px;border:4px solid var(--navy);background:var(--paper)"></div>`, { x: -205 + i * 82, y: 150, ...POP(.6 + i * .08, .3) });
    pill(c, "邀请制公测", "y", { y: 300, ...UP(1.3, 300) });
    lab(c, "邀请制", 110, { x: 230, y: -630, ...UP(1.6, -630, -40) });
  } });

shot({ ch: "01 · 钩子", mode: "FULL", dur: 3.5, nosub: true, vo: "（无人声）", bgc: "#08090B",
  L: "纯动画，墨黑底。两枚 App 图标横排在画面正中（y 960）。",
  K: ["0.0 「豆包」图标（冷蓝 cool）居中，轻呼吸", "1.0 豆包图标向左让位到 x−220（0.5s）", "1.1 「小豆」图标（珊瑚橙 coral）从右侧画外滑入，1.5s 落定 x+220，带一次回弹", "1.7 两个名字胶囊在图标下方淡入"],
  T: "图标下名字胶囊 32px：「豆包」「小豆」",
  snd: "1.5s 落定时 S10 轻碰（玻璃杯轻敲，-20dB）",
  tip: "图标是示意，正式版换成两枚官方图标截图抠图。", src: "M03 豆包 / 小豆官方图标（待截）",
  build(c) {
    app(c, "豆包", "var(--sky)", "var(--ink)", { x: [[1.0, 0], [1.5, -220, "io"]], y: -40, s: [[0, .96], [1, 1, "io"]] });
    const b = c.add(`<div class="app" style="width:200px;height:200px;background:var(--tom)">${ICN("bean",170,true,"13,14,17")}</div>`, { x: [[1.1, 760], [1.5, 220, "back"]], y: -40, rz: [[1.1, 18], [1.5, 0, "back"]] }); useIll(c, "bean");
    pill(c, "豆包", "s", { x: -220, y: 140, ...FI(1.7) }); pill(c, "小豆", "t", { x: 220, y: 140, ...FI(1.8) });
    c.sfx(1.5, "S10 轻碰");
  } });

shot({ ch: "01 · 钩子", mode: "FULL", dur: 3.5, nosub: true, vo: "（无人声）", bgc: "#08090B",
  L: "纯动画，延续上一镜构图。两图标中间一道暖白竖线把屏幕劈成两半。",
  K: ["0.0 两图标保持 #03 的位置（无缝衔接）", "0.3 竖线从屏幕顶端向下 0.4s 劈到底，画面轻震 4px", "0.5 左半屏蒙一层淡冷蓝 cool、右半屏蒙一层淡珊瑚橙 coral（0.4s）", "1.0 底部「豆包 ‖ 小豆」淡入"],
  T: "「豆包 ‖ 小豆」64px 暖白，屏幕 y≈1660",
  snd: "0.3s S15 空气glitch（-18dB，尾巴 0.6s）",
  tip: "无。", src: "",
  build(c) {
    c.add(`<div style="width:540px;height:1920px;background:var(--sky)"></div>`, { x: -270, ...{ o: [[.5, 0], [.9, .18]] } });
    c.add(`<div style="width:540px;height:1920px;background:var(--tom)"></div>`, { x: 270, ...{ o: [[.5, 0], [.9, .18]] } });
    app(c, "豆包", "var(--sky)", "var(--ink)", { x: -220, y: -40 });
    const b = c.add(`<div class="app" style="width:200px;height:200px;background:var(--tom)">${ICN("bean",170,true,"13,14,17")}</div>`, { x: 220, y: -40 }); useIll(c, "bean");
    line(c, 0, -960, 1920, .3, .4, "var(--fg)", 8);
    lab(c, "豆包 ‖ 小豆", 64, { y: 700, ...FI(1.0) }, "var(--fg)");
    c.shake(.4, .3, 4); c.sfx(.3, "S15 glitch");
  } });

shot({ ch: "01 · 钩子", mode: "FULL", dur: 5.0, nosub: true, vo: "（无人声）", tin: "fade",
  L: "纯动画。上下两张卡：上卡=豆包（一问一答，答完就停）；下卡=小豆（后台任务条自己往前走）。",
  K: ["0.0 上卡淡入：用户气泡「附近有什么好吃的？」", "0.6 AI 气泡回答；1.2 卡片右下出现灰字「等你下一句…」，卡片整体变灰", "1.5 下卡从下方滑入：4 个节点「盯降价 → 发现 → 推送 → 完成」", "1.8–3.3 珊瑚橙 coral进度点自己沿线走完（无人操作），每过一个节点该节点变黄", "3.2 下卡左上角「无人操作」小标签闪一下", "3.6「它不等你问」110px 砸入底部"],
  T: "「它不等你问」110px 暖白，「不等」两字珊瑚橙 coral，屏幕 y≈1700",
  snd: "1.5s BGM-2 起（-26dB，轻快 pluck）；进度点每过一节点一声 tick",
  tip: "无。", src: "",
  build(c) {
    c.add(`<div class="card" style="width:900px;height:560px"></div>`, { y: -440, ...FI(0) }); pill(c, "豆包", "s", { x: -340, y: -660, ...FI(0) });
    bubble(c, "附近有什么好吃的？", true, { x: 150, y: -540, ...POP(.1) });
    bubble(c, "为你找到 3 家餐厅……", false, { x: -170, y: -420, ...POP(.6) });
    lab(c, "等你下一句…", 34, { x: 260, y: -250, ...FI(1.2) }, "rgba(242,237,228,.45)", "cn", "font-weight:600");
    c.add(`<div style="width:900px;height:560px;border-radius:28px;background:#9a9a9a;mix-blend-mode:saturation"></div>`, { y: -440, o: [[1.2, 0], [1.5, 1]] });
    c.add(`<div class="cardn" style="width:900px;height:520px"></div>`, { y: 220, ...UP(1.5, 220, 120) }); pill(c, "小豆", "t", { x: -340, y: 20, ...UP(1.5, 20, 120) });
    lab(c, "无人操作", 26, { x: 300, y: 20, o: [[3.2, 0], [3.25, 1, "lin"], [3.5, .5]] }, "var(--but)", "mono");
    hbar(c, -330, 240, 660, 1.6, .3, "rgba(241,234,219,.25)", 8);
    const nm = ["盯降价", "发现", "推送", "完成"];
    nm.forEach((s, i) => { const x = -330 + i * 220, a = 1.8 + i * .5;
      c.add(`<div class="dot" style="width:44px;height:44px;background:var(--fg)"></div>`, { x, y: 240, ...FI(1.6) });
      c.add(`<div class="dot" style="width:44px;height:44px;background:var(--but)"></div>`, { x, y: 240, ...POP(a, .3) });
      lab(c, s, 34, { x, y: 320, ...FI(1.6) }, "var(--fg)"); c.sfx(a, "tick"); });
    c.add(`<div class="dot" style="width:30px;height:30px"></div>`, { x: [[1.8, -330], [3.3, 330, "io"]], y: 240, ...FI(1.7, .1) });
    hbar(c, -330, 240, 660, 1.8, 1.5, "var(--tom)", 8);
    lab(c, "它<span class='co'>不等</span>你问", 110, { y: 690, ...SLAM(3.6) }); c.shake(3.65, .25, 6);
  } });

shot({ ch: "01 · 钩子", mode: "TALK", dur: 4.0, tin: "cut", vo: "11 月 24 号，字节放了个新 App。",
  L: "口播全屏（人物居中，头顶在屏幕 y≈340）。头顶右侧的空墙面放日期戳。",
  K: ["0.0 硬切进口播（冷开场结束，第一次见人）", "0.5 说到「11 月 24 号」：右上日期「11.24」Bebas 170px 盖章式弹入（0.3s 回弹，轻转 −4°）", "1.6 说到「字节」：日期下方小胶囊「字节 · 新 App」淡入", "3.6 两个元素 0.2s 淡出，给下一镜让位"],
  T: "「11.24」Bebas 170px 珊瑚橙 coral；胶囊「字节 · 新 App」32px 暖白",
  snd: "BGM-2 继续 -26dB；盖章「啪」一声 -22dB",
  tip: "近景 50mm，人在画面正中，头顶留 300px 空墙（给字卡）。手里拿手机，屏幕朝镜头但别露内容（可贴磨砂膜或调暗）。", src: "实拍 A（口播主机位）",
  build(c) {
    c.talk(tw(RF, RF));
    c.add(`<div class="en" style="font-size:170px;color:var(--tom)">11.24</div>`, OFF({ x: 290, y: -720, rz: -4, ...POP(.5, 1.5) }, 3.6));
    pill(c, "字节 · 新 App", "", OFF({ x: 300, y: -590, ...UP(1.6, -590) }, 3.6));
    c.sfx(.5, "盖章");
  } });

shot({ ch: "01 · 钩子", mode: "DEPTH", dur: 3.0, vo: "你没看错，它叫小豆。",
  L: "口播推近到脸（1.0→1.22），背景压暗；「小豆」巨字放在人物身后，被头顶挡住一点。",
  K: ["0.0–0.5 推近到脸（qio 缓动），背景压暗 + 轻虚化", "0.6 说到「小豆」：身后「小豆」300px 珊瑚橙 coral从 1.5 倍砸到 1，轻震 6px", "0.9 巨字右下方豆子小角色弹出（也在人身后）", "全程人物抠像在最前"],
  T: "「小豆」思源黑体 Heavy 300px 珊瑚橙 coral，在人物身后，屏幕 y≈300",
  snd: "BGM-2；砸字一声低频 boom（-20dB）",
  tip: "同机位，一次「把手机翻正给镜头看」的动作，屏幕上是小豆图标（后期可贴图替换）。这镜要抠像，头发边缘越干净越好（背景别太花）。", src: "实拍 A；小豆图标（贴屏用）",
  build(c) {
    c.talk(tw(RF, RZ, 0, .5, "qio", { dim: [[0, 0], [.45, .9]], co: [[0, 0], [.3, 1]] }));
    c.add(`<div class="cn" style="font-size:300px;color:var(--tom)">小豆</div>`, { y: -640, ...SLAM(.6) }, c.B);
    c.ill("bean", 170, { x: 390, y: -470, ...POP(.9) }, { parent: c.B });
    c.shake(.65, .3, 6);
  } });

shot({ ch: "01 · 钩子", mode: "LOW", dur: 6.4, vo: "豆包还在。豆包有用户、有模型、有生态。那为什么还要再造一个？",
  L: "口播从全屏下沉到下半屏（人物头顶在 y≈870），上半屏（y 250–800）放图解。",
  K: ["0.0–0.6 口播窗口下沉到下半屏（qio）", "0.5 豆包图标在上半屏中央弹出", "1.4 / 2.0 / 2.6 说到「用户/模型/生态」：三张胶囊依次从图标下方弹出，排成一行", "3.2 停半拍（口播呼吸，别剪）", "3.6 说到「为什么」：图标和胶囊整体变淡到 25%", "3.9 右侧巨大珊瑚橙 coral「？」260px 砸入，轻震 6px"],
  T: "胶囊「有用户 / 有模型 / 有生态」34px；「？」Bebas 260px 珊瑚橙 coral",
  snd: "3.2s BGM 全停 1s（留白），3.9s 问号落下 BGM 回来",
  tip: "中景。说完前一句停半秒再抛问句，这半秒剪辑不要剪掉。", src: "实拍 A",
  build(c) {
    c.talk(tw(RF, RB, 0, .6));
    app(c, "豆包", "var(--sky)", "var(--ink)", DIM({ y: -560, ...POP(.5) }, 3.6), 180);
    [["有用户", 1.4], ["有模型", 2.0], ["有生态", 2.6]].forEach(([s, a], i) => pill(c, s, "o", DIM({ x: -290 + i * 290, y: -340, ...POP(a) }, 3.6)));
    c.add(`<div class="en" style="font-size:320px;color:var(--tom)">?</div>`, { x: 330, y: -470, ...SLAM(3.9) }); c.shake(3.95, .3, 6);
  } });

shot({ ch: "01 · 钩子", mode: "FULL", dur: 3.2, bgc: "#08090B", vo: "因为它不是来陪你聊天的。",
  L: "纯字幕镜（人声继续）。墨黑底，句子拆两行出现，「陪你聊天」被珊瑚橙 coral线划掉。",
  K: ["0.0「它不是来」84px 逐字上浮（每字 0.04s）", "0.6「陪你聊天的」130px 逐字上浮", "1.6 珊瑚橙 coral粗线从左到右 0.3s 划掉「陪你聊天」", "1.9 被划掉的字变灰 40%"],
  T: "两行：「它不是来」84px 暖白 /「陪你聊天的」130px 暖白",
  snd: "1.6s S6 错误音极轻（-28dB）",
  tip: "无。", src: "",
  build(c) {
    c.chars("它不是来", 84, 0, -160, 0, { mode: "up", css: "color:var(--fg)" });
    const g = c.chars("陪你聊天的", 130, 0, 20, .6, { mode: "up", css: "color:var(--fg)" });
    c.add(`<div style="width:540px;height:16px;border-radius:8px;background:var(--tom)"></div>`, { x: -60, y: 30, rz: -2, sx: [[1.6, 0], [1.9, 1, "out"]] });
    c.on(t => { g.style.opacity = t > 1.9 ? 1 - .6 * Math.min(1, (t - 1.9) / .3) : 1; });
    c.sfx(1.6, "S6 错误音");
  } });

shot({ ch: "02 · 定义", mode: "TALK", dur: 3.2, vo: "先看它把什么反过来了。",
  L: "口播全屏。头部右侧空墙放一个开关图标，说「反过来」时翻转 180°。",
  K: ["0.0 硬切回口播", "0.3 右侧开关图标弹出（宽 150px）", "1.2 说到「反过来」：开关绕中心翻 180°（0.5s qio），同时「反过来」72px 在它下方弹出", "2.9 淡出"],
  T: "「反过来」72px 暖白 + 黄色高亮底",
  snd: "BGM-2′ 起 -24dB（换一个更亮的段落）；翻转一声 whoosh -24dB",
  tip: "中景，说「反过来」时手在胸前做一个翻掌手势（掌心向下→向上），手不要挡脸。", src: "实拍 A",
  build(c) {
    c.talk(tw(RF, RF));
    c.ill("toggle", 150, OFF({ x: 360, y: -560, rz: [[1.2, 0], [1.7, 180, "qio"]], ...POP(.3) }, 2.9));
    lab(c, "<span class='hl'>反过来</span>", 72, OFF({ x: 360, y: -360, ...POP(1.3) }, 2.9));
  } });

shot({ ch: "02 · 定义", mode: "PIP", dur: 4.6, vo: "你用过所有 AI 聊天软件，都是被动的。",
  L: "图解全屏 + 口播缩进右上小窗（300×380）。中间一张聊天卡循环三轮「问→答→关」。",
  K: ["0.0–0.6 口播从全屏缩进右上小窗", "0.4 / 1.7 / 3.0 每轮：用户气泡弹出 → 0.5s 后 AI 气泡弹出 → 0.9s 后两者淡出", "每一轮结束聊天卡暗一格（亮度 100%→80%→60%）", "1.0 左上「被动」110px 灰色淡入"],
  T: "「被动」110px 灰（rgba 暖白 45%），屏幕左上 y≈380",
  snd: "BGM-2′；每个气泡一声轻「啵」，音高逐轮降低",
  tip: "无。", src: "实拍 A（小窗）",
  build(c) {
    c.talk(tw(RF, RP, 0, .6, "qio", { r: [[0, 0], [.6, 30]] }), { border: true });
    lab(c, "被动", 110, { x: -260, y: -560, ...FI(1.0) }, "rgba(242,237,228,.45)");
    c.add(`<div class="card" style="width:860px;height:820px"></div>`, { y: 220, ...FI(0) });
    const dk = c.add(`<div style="width:860px;height:820px;border-radius:28px;background:#000"></div>`, { y: 220, o: [[1.5, 0], [1.7, .2], [2.8, .2], [3.0, .4]] });
    [["今天天气？", "晴，22°C"], ["帮我订餐厅", "我没法直接订"], ["提醒我开会", "请在日历里设置"]].forEach(([q, a], r) => { const t = .4 + r * 1.3;
      bubble(c, q, true, OFF({ x: 170, y: 60, ...POP(t) }, t + 1.0)); bubble(c, a, false, OFF({ x: -150, y: 200, ...POP(t + .5) }, t + 1.0)); });
  } });

shot({ ch: "02 · 定义", mode: "FULL", dur: 4.4, vo: "你问一句，它答一句。手机一锁，它就停工。",
  L: "纯动画（人声继续）。手机里是聊天界面；说到「一锁」时锁屏从上方盖下来。",
  K: ["0.0 手机框居中，里面一问一答两个气泡（0.2 / 0.8s 弹出）", "2.2 说到「一锁」：暖白锁屏从屏幕顶部 0.4s 落下盖住聊天，带锁+zzz 图标", "2.6 锁屏上时间「23:41」淡入", "2.9 底部「锁屏 = 停工」砸入"],
  T: "「锁屏 = 停工」88px，「停工」珊瑚橙 coral，屏幕 y≈1680",
  snd: "2.2s 锁屏咔哒声（-18dB）；之后 BGM 压低 4dB",
  tip: "无。", src: "",
  build(c) {
    phone(c, 620, 1060, { y: 40 });
    bubble(c, "这周末去哪玩？", true, { x: 90, y: -280, ...POP(.2) }, 420);
    bubble(c, "可以去看展……", false, { x: -110, y: -140, ...POP(.8) }, 420);
    const lk = c.add(`<div style="width:592px;height:1032px;border-radius:58px;background:#1B1D23;box-shadow:inset 0 0 0 2px rgba(242,237,228,.12);overflow:hidden"></div>`, { y: [[2.2, -1100], [2.6, 40, "out"]] });
    lab(c, "23:41", 120, { y: -300, ...FI(2.6) }, "var(--fg)", "en");
    c.ill("lockphone", 330, { y: 120, ...POP(2.5) });
    lab(c, "锁屏 = <span class='co'>停工</span>", 88, { y: 700, ...SLAM(2.9) });
    c.sfx(2.2, "锁屏咔哒");
  } });
