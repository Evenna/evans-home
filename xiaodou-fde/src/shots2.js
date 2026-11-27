/* 小豆 · 第二章后半 + 第三章 + 第四章（#13–#33） */
shot({ ch: "02 · 定义", mode: "FULL", dur: 6.0, vo: "每一轮动作的开关，都攥在你手里。",
  L: "实拍 B 俯拍（动画版用图标代替）：画面中心一个大开关，一只手指按下、松开 3 次。",
  K: ["0.0 开关图标居中 360px，墨黑底；上方照片框放实拍「手指点手机」素材", "0.8 / 1.9 / 3.0 开关下压一次（缩到 0.9，0.15s 回弹），每次一声咔哒", "3.6「开关在你手里」字卡从底部上浮", "节奏均匀，配合口播重音「每一轮」「攥」"],
  T: "「开关在你手里」88px，「你」珊瑚橙 coral，屏幕 y≈1650",
  snd: "开关咔哒 ×3（-18dB，三下音量一致）；BGM-2′ -26dB",
  tip: "实拍 B：俯拍，黑桌 + 金属拨动开关，手从画面下方伸进来按 3 下，节奏均匀（约 1.1s 一下）。拍 5 遍挑最稳的。", src: "实拍 B（俯拍桌面）；mixkit unlock 片段",
  build(c) {
    vidp(c, "unlock", 820, 460, { y: -470, rz: -2, ...UP(0, -470) });
    c.ill("toggle", 380, { y: 210, s: [[0, 1], [.8, 1], [.9, .9], [1.05, 1, "back"], [1.9, 1], [2.0, .9], [2.15, 1, "back"], [3.0, 1], [3.1, .9], [3.25, 1, "back"]] });
    [.8, 1.9, 3.0].forEach(a => c.sfx(a, "咔哒"));
    lab(c, "开关在<span class='co'>你</span>手里", 88, { y: 690, ...UP(3.6, 690) });
  } });

shot({ ch: "02 · 定义", mode: "FULL", dur: 6.0, vo: "小豆把这个开关交出去了。",
  L: "延续上一镜构图（同机位）。手按到「开」后撤走，开关自己保持；一只豆子手从右边接过去。",
  K: ["0.0 开关居中同位置", "0.6 开关翻到「开」（rz 0→180）", "1.0 手（handover 图标）从右下 0.5s 伸入，开关被交过去", "2.2 手向画外撤出 0.5s，开关不动，静 1s（关键：手离开后它还在工作）", "3.2「交出去了」110px 中偏下砸入，「交出去」黄色高亮底"],
  T: "「交出去了」110px 暖白，屏幕 y≈1480",
  snd: "BGM-2′ 抬到 -22dB；交接一声软 whoosh",
  tip: "同 #13 机位同道具。按到「开」后手 0.5s 撤出画面，开关保持不动停 1s。", src: "实拍 B",
  build(c) {
    c.ill("toggle", 380, { y: -150, rz: [[.6, 0], [1.0, 180, "qio"]] });
    c.ill("handover", 420, { x: [[1.0, 700], [1.5, 260, "out"], [2.2, 260], [2.7, 800, "in"]], y: 250 });
    c.ill("bean", 150, { x: -280, y: 250, bob: 6, ...POP(1.6) });
    lab(c, "<span class='hl'>交出去</span>了", 110, { y: 520, ...SLAM(3.2) }); c.shake(3.25, .25, 6);
  } });

shot({ ch: "02 · 定义", mode: "LOW", dur: 6.0, vo: "它主打三件事：记得你、主动找你、替你去别的 App 里干活。",
  L: "人物下半屏；上半屏三张小卡横排（大脑 / 铃铛 / 插头串三个 App），跟着口播依次点亮。",
  K: ["0.0–0.6 口播下沉到下半屏", "0.3 三张卡灰着出现（30% 透明）", "1.8 说「记得你」：第一张卡亮起 + 上浮 20px", "2.8 说「主动找你」：第二张卡亮起，铃铛摇两下", "4.0 说「替你去别的 App」：第三张亮起，三枚小图标被一根线串起", "每张卡亮起时下方编号 01/02/03 Bebas 出现"],
  T: "卡下标签 40px：「记得 / 主动 / 代办」；编号 Bebas 80px",
  snd: "BGM-2′；轻点 ×3（音高逐级升）",
  tip: "中景，说「三件事」时伸出三根手指，手在胸前，不要举过下巴。", src: "实拍 A",
  build(c) {
    c.talk(tw(RF, RB, 0, .6));
    [["brain", "记得", 1.8], ["bell", "主动", 2.8], ["plug", "代办", 4.0]].forEach(([il, s, a], i) => { const x = -310 + i * 310;
      c.add(`<div class="card" style="width:280px;height:380px"></div>`, { x, y: -480, o: [[.3, 0], [.5, .3], [a, .3], [a + .2, 1]], s: [[a, .95], [a + .3, 1.04, "back"]] });
      c.ill(il, 180, { x, y: -540, o: [[.3, 0], [.5, .3], [a, .3], [a + .2, 1]], rz: il === "bell" ? [[a, 0], [a + .1, 14], [a + .2, -12], [a + .3, 8], [a + .4, 0]] : 0 });
      lab(c, s, 44, { x, y: -380, o: [[.3, 0], [.5, .3], [a, .3], [a + .2, 1]] });
      lab(c, "0" + (i + 1), 80, { x: x - 90, y: -640, ...POP(a) }, "var(--tom)", "en");
      c.sfx(a, "轻点"); });
  } });

shot({ ch: "02 · 定义", mode: "DEPTH", dur: 7.0, vo: "第一件，记忆。换 AI 最劝退的，是重新交代一遍你是谁。",
  L: "口播全屏轻推近。人物身后飘一圈玻璃卡片（职业/偏好/习惯/作息/口味），说到「重新交代」时被一把收走。",
  K: ["0.0 慢推 1.0→1.08（7s 线性）", "0.3「01 记忆」Bebas+黑体左上弹入", "1.0–1.8 五张玻璃卡片在人身后依次贴上（各带 ±6° 随机角度）", "4.2 说到「重新交代」：五张玻璃卡片同时向画外右侧飞走（0.6s ease-in），留空", "4.9「重新自我介绍」灰色字在底部淡入"],
  T: "左上「01 记忆」：01 Bebas 140px 珊瑚橙 coral + 记忆 72px；底部「重新自我介绍」72px 灰",
  snd: "4.2s S12 数据面板哗啦；BGM-2′ 降到 -28dB",
  tip: "原定 12s，口播只要 5.5s，已压到 7s（留 1s 呼吸）。实拍：桌上一摞写着「职业/偏好/习惯」的玻璃卡片，说到「重新交代」时一把收走。", src: "实拍 A；玻璃卡片道具（手写标签）",
  build(c) {
    c.talk(tw(RF, RF, 0, 0, "lin", { z: [[0, 1], [7, 1.08, "lin"]], fy: 700 }));
    lab(c, "01", 140, { x: -330, y: -700, ...POP(.3) }, "var(--tom)", "en");
    lab(c, "记忆", 72, { x: -170, y: -690, ...POP(.45) });
    const N = [["职业", -330, -400, -6, "var(--but)"], ["偏好", 330, -480, 5, "var(--sky)"], ["习惯", -360, -150, 4, "var(--sage)"], ["作息", 360, -220, -5, "var(--but)"], ["口味", 300, 40, 6, "#F4B7A6"]];
    N.forEach(([s, x, y, r, bg], i) => c.add(`<div style="width:220px;height:200px;background:${bg};box-shadow:0 10px 20px rgba(0,0,0,.5);display:flex;align-items:center;justify-content:center;font:800 54px var(--cn);color:var(--ink)">${s}</div>`, { x: [[4.2, x], [4.8, x + 900, "in"]], y, rz: r, ...POP(1.0 + i * .16) }, c.B));
    lab(c, "重新自我介绍", 72, { y: 640, ...FI(4.9, .4) }, "rgba(242,237,228,.5)");
    c.sfx(4.2, "S12 数据面板");
  } });

shot({ ch: "03 · 三个场景", mode: "PIP", dur: 6.0, vo: "小豆能接过你在豆包里攒的偏好和工作背景。",
  L: "图解全屏 + 口播右上小窗。左豆包图标、右小豆图标，中间一条传送带，标签从左流到右。",
  K: ["0.0–0.6 口播缩进右上小窗", "0.4 两个图标在 y≈960 两侧弹出", "0.8 传送带虚线出现，开始滚动", "1.0–2.6 五个标签胶囊（偏好 / 工作背景 / 常去 / 口味 / 日程）从左向右流过，到右端被小豆吸进去（缩小+淡出）", "3.0 小豆图标轻弹一下，「一键继承」右上砸入"],
  T: "「一键继承」88px，屏幕右上（小窗下方 y≈700）",
  snd: "BGM-3 起 -24dB；每个标签被吸入一声「嗖」",
  tip: "无（纯界面动画）。", src: "",
  build(c) {
    c.talk(tw(RF, RP, 0, .6, "qio", { r: [[0, 0], [.6, 30]] }), { border: true });
    app(c, "豆包", "var(--sky)", "var(--ink)", { x: -330, y: 60, ...POP(.4) }, 200);
    c.add(`<div class="app" style="width:200px;height:200px;background:var(--tom)">${ICN("bean",170,true,"13,14,17")}</div>`, { x: 330, y: 60, ...POP(.5), s: [[0, .6], [.8, 1, "back"], [3.0, 1], [3.15, 1.12], [3.4, 1, "back"]] }); useIll(c, "bean");
    c.add(`<div class="dash" style="width:420px;border-top:6px dashed var(--navy)"></div>`, { y: 60, ...FI(.8) });
    ["偏好", "工作背景", "常去", "口味", "日程"].forEach((s, i) => { const a = 1.0 + i * .32;
      pill(c, s, ["y", "s", "g", "o", "t"][i], { x: [[a, -200], [a + .9, 250, "io"]], y: 60 + (i % 2 ? -70 : 70), s: [[a + .7, 1], [a + .9, .2, "in"]], o: [[a, 0], [a + .1, 1], [a + .75, 1], [a + .9, 0]] }); });
    lab(c, "一键继承", 88, { x: 0, y: -380, ...SLAM(3.0) });
  } });

shot({ ch: "03 · 三个场景", mode: "TALK", dur: 4.0, vo: "一上来就认识你。",
  L: "口播推近到特写（1.0→1.22）。头像右侧弹出一张「身份卡」图标，名字处已经填好。",
  K: ["0.0–0.5 推到特写", "0.6 右侧身份卡（idcard）弹出，旋转 −5°", "1.2 卡上一个珊瑚橙 coral小勾 0.2s 画出", "人物点头一次（实拍动作），动画不抢"],
  T: "无大字；身份卡上小胶囊「已认识」32px",
  snd: "BGM-3；勾一声 ding（-24dB）",
  tip: "85mm 特写，点头一次幅度很小，眼神看镜头。", src: "实拍 A（85mm）",
  build(c) {
    c.talk(tw(RF, RZ, 0, .5));
    c.ill("idcard", 300, { x: 330, y: -470, rz: -5, ...POP(.6) });
    c.ill("check", 110, { x: 400, y: -400, ...POP(1.2, .2) });
    pill(c, "已认识", "y", { x: 330, y: -300, ...FI(1.3) });
  } });

shot({ ch: "03 · 三个场景", mode: "FULL", dur: 7.0, vo: "第二件，它会在后台替你盯着。",
  L: "纯界面（人声）。手机框里是授权列表：8 行应用名 + 开关，逐个打开。应用只写名字，不画 logo。",
  K: ["0.0「02 主动」左上弹入", "0.3 手机框上浮入", "1.0–3.4 8 个开关依次从灰打开成珊瑚橙 coral（间隔 0.3s），每行左侧色块随之亮起", "3.8 手机整体轻缩 0.96，右侧眼睛图标（eye）弹出、轻浮——表示「后台盯着」", "底部小字列出 8 个应用名"],
  T: "左上「02 主动」；手机内每行 44px 应用名；底部小字 36px：抖音 · 飞书 · 高德 · 日历 · 健康 · 自如 · 百度网盘 · Wind",
  snd: "BGM-3；开关声 ×8（每次音高 +1 半音）",
  tip: "不用真实授权页截图，按此动画即可。", src: "",
  build(c) {
    lab(c, "02", 140, { x: -330, y: -700, ...POP(0) }, "var(--tom)", "en"); lab(c, "主动", 72, { x: -170, y: -690, ...POP(.15) });
    const ap = ["抖音", "飞书", "高德", "日历", "健康", "自如", "百度网盘", "Wind"], col = ["var(--navy)", "var(--sky)", "var(--sage)", "var(--tom)", "var(--but)", "var(--sage)", "var(--sky)", "var(--navy)"];
    phone(c, 640, 1080, { y: 30, ...UP(.3, 30, 80) }, `<div style="padding:120px 46px 0">${ap.map((s, i) => `<div class="row" style="display:flex;align-items:center;height:106px;border-bottom:2px solid rgba(242,237,228,.08)"><i style="width:56px;height:56px;border-radius:16px;background:${col[i]};opacity:.25" data-i="${i}"></i><span style="flex:1;margin-left:24px;font:700 40px var(--cn);color:var(--navy)">${s}</span><b class="sw" data-i="${i}" style="width:96px;height:56px;border-radius:28px;background:#cfcabd;position:relative;display:block"><i style="position:absolute;top:6px;left:6px;width:44px;height:44px;border-radius:50%;background:var(--paper)"></i></b></div>`).join("")}</div>`);
    const root = c.nodes[c.nodes.length - 1].el;
    c.on(t => { root.querySelectorAll(".sw").forEach((sw, i) => { const p = E.out(Math.max(0, Math.min(1, (t - 1.0 - i * .3) / .2))); sw.style.background = p > .5 ? "var(--tom)" : "#cfcabd"; sw.firstChild.style.left = 6 + 40 * p + "px"; root.querySelector(`i[data-i="${i}"]`).style.opacity = .25 + .75 * p; }); });
    for (let i = 0; i < 8; i++) c.sfx(1.0 + i * .3, "开关");
    c.ill("eye", 220, { x: 380, y: -560, bob: 8, ...POP(3.8) });
    lab(c, ap.join(" · "), 34, { y: 700, ...FI(3.4) }, "rgba(242,237,228,.6)", "cn", "font-weight:600");
  } });

shot({ ch: "03 · 三个场景", mode: "FULL", dur: 4.0, vo: "不是等你问。",
  L: "纯动画。左对话框图标被划掉，右铃铛亮起摇摆。左右各占半屏。",
  K: ["0.0 左对话气泡（灰）+ 右铃铛（暗）同时出现", "0.6 珊瑚橙 coral线 0.3s 斜划过对话框", "1.0 铃铛亮起（亮度 40%→100%）+ 摇 3 下", "1.1 铃铛周围三道声波弧向外扩散"],
  T: "无字卡（画面即表达）",
  snd: "BGM-3；1.0s 一声铃（-20dB）",
  tip: "无。", src: "",
  build(c) {
    c.add(`<div style="width:300px;height:220px;border-radius:44px;border:10px solid rgba(242,237,228,.45);border-bottom-left-radius:8px"></div>`, { x: -240, y: -40, ...FI(0) });
    lab(c, "?", 120, { x: -240, y: -40, ...FI(0) }, "rgba(242,237,228,.45)", "en");
    c.add(`<div style="width:420px;height:16px;border-radius:8px;background:var(--tom)"></div>`, { x: -240, y: -40, rz: -35, sx: [[.6, 0], [.9, 1, "out"]] });
    c.ill("bell", 300, { x: 240, y: -40, o: [[0, .4], [1.0, .4], [1.1, 1]], rz: [[1.0, 0], [1.1, 16], [1.25, -14], [1.4, 10], [1.55, -6], [1.7, 0]] });
    [0, 1, 2].forEach(i => c.add(`<div style="width:260px;height:260px;border-radius:50%;border:6px solid var(--tom)"></div>`, { x: 240, y: -40, s: [[1.1 + i * .2, .9], [1.9 + i * .2, 1.8, "out"]], o: [[1.1 + i * .2, 0], [1.2 + i * .2, .8], [1.9 + i * .2, 0]] }));
    c.sfx(1.0, "铃");
  } });

shot({ ch: "03 · 三个场景", mode: "LOW", dur: 7.4, vo: "团购券快到期，它弹你；关注的东西降价，它发你；日程撞车，它提前标出来。",
  L: "人物下半屏；上半屏三张通知卡从顶部依次下拉叠放（最新的在最上）。通知卡本身就是字卡。",
  K: ["0.0–0.6 口播下沉", "0.4 通知 1：券图标「团购券今晚 24:00 到期」", "2.6 通知 2：价签图标「你关注的耳机降了 ¥120」", "4.8 通知 3：日历图标「周四 15:00 两个会撞了」", "每张卡 0.35s 从顶部下拉（back 缓动），旧卡往下挤 170px 并变淡到 70%"],
  T: "通知卡：标题 46px + 副标 30px，宽 860",
  snd: "BGM-3；提示音 ×3（音高依次升高）",
  tip: "中景，说一句停半拍，方便剪辑对齐三个弹窗。", src: "实拍 A",
  build(c) {
    c.talk(tw(RF, RB, 0, .6));
    const N = [["coupon", "团购券快到期", "今晚 24:00 前可用 · 小豆提醒", .4], ["pricetag", "你关注的东西降价了", "耳机 −¥120 · 小豆提醒", 2.6], ["calendar", "日程撞车", "周四 15:00 两个会重叠 · 小豆提醒", 4.8]];
    N.forEach(([il, a1, a2, a], i) => { const y0 = -640, ys = [[a, y0 - 200], [a + .35, y0, "back"]];
      N.slice(i + 1).forEach(n => ys.push([n[3], ys[ys.length - 1][1]], [n[3] + .35, ys[ys.length - 1][1] + 175, "out"]));
      ntf(c, il, a1, a2, { y: ys, o: [[a, 0], [a + .15, 1], ...N.slice(i + 1).map((n, j) => [n[3] + .35, 1 - .15 * (j + 1)])] });
      c.sfx(a, "提示音"); });
  } });

shot({ ch: "03 · 三个场景", mode: "TALK", dur: 4.0, vo: "第三件，代打电话。",
  L: "口播全屏。左上大编号「03」，右侧电话图标随她举手机的动作一起晃。",
  K: ["0.0 硬切", "0.2「03」Bebas 200px 左上砸入", "0.5「代打电话」72px 编号下方上浮", "0.8 电话图标右侧弹出，轻摇", "3.7 全部淡出"],
  T: "「03」Bebas 200px 珊瑚橙 coral + 「代打电话」72px",
  snd: "BGM-4 起 -22dB；一声短促拨号音",
  tip: "中景，说这句时把手机举到耳边又放下（动作预演），手机不要挡脸。", src: "实拍 A",
  build(c) {
    c.talk(tw(RF, RF));
    lab(c, "03", 200, OFF({ x: -320, y: -690, ...SLAM(.2) }, 3.7), "var(--tom)", "en");
    lab(c, "代打电话", 72, OFF({ x: -280, y: -540, ...UP(.5, -540) }, 3.7));
    c.ill("telephone", 220, OFF({ x: 370, y: -600, rz: [[.8, 0], [1, 10], [1.2, -8], [1.4, 0]], ...POP(.8) }, 3.7));
  } });

shot({ ch: "03 · 三个场景", mode: "FULL", dur: 6.0, vo: "想订一家没开线上预约的餐厅，以前得自己翻号码。",
  L: "纯界面（人声）。上方实拍餐厅照片框；下方仿旧点评页：「在线预约」按钮是灰的，电话号码被红圈圈住。",
  K: ["0.0 餐厅实拍照片框从上滑入（resto 素材播放）", "0.5 下方页面卡上浮：店名 + 评分 + 灰掉的「在线预约 暂不支持」", "2.0 灰按钮上一道斜线", "2.8 电话号码行被珊瑚橙 coral手绘圈 0.4s 画出", "3.5「只能打电话」底部上浮"],
  T: "「只能打电话」88px，屏幕 y≈1680",
  snd: "BGM-4；画圈一声马克笔擦纸",
  tip: "无（可换真实点评页截图，店名电话打码）。", src: "mixkit resto（餐厅实拍）",
  build(c) {
    vidp(c, "resto", 880, 500, { y: -520, rz: 2, ...UP(0, -520, -80) });
    c.add(`<div class="card" style="width:880px;height:560px;padding:44px;text-align:left"><div style="font:800 56px var(--cn)">巷子里的小馆</div><div style="font:600 34px var(--cn);color:var(--tom);margin-top:10px">★★★★½ 4.6</div><div style="margin-top:40px;width:420px;height:90px;border-radius:45px;background:#ddd8cc;color:rgba(242,237,228,.45);font:700 38px/90px var(--cn);text-align:center">在线预约 暂不支持</div><div style="margin-top:44px;font:700 44px var(--mono)">☎ 021-6xxx-xx88</div></div>`, { y: 220, ...UP(.5, 220) }, null);
    c.add(`<div style="width:430px;height:10px;background:rgba(242,237,228,.45);border-radius:5px"></div>`, { x: -205, y: 210, rz: -10, sx: [[2.0, 0], [2.3, 1, "out"]] });
    const svg = c.add(`<svg width="560" height="150" viewBox="0 0 560 150"><ellipse cx="280" cy="75" rx="268" ry="62" fill="none" stroke="#E2553A" stroke-width="9" stroke-linecap="round" pathLength="1" stroke-dasharray="1" stroke-dashoffset="1" transform="rotate(-3 280 75)"/></svg>`, { x: -90, y: 400 });
    c.on(t => { svg.querySelector("ellipse").style.strokeDashoffset = 1 - E.out(Math.max(0, Math.min(1, (t - 2.8) / .4))); });
    lab(c, "只能打电话", 88, { y: 720, ...UP(3.5, 720) });
    c.sfx(2.8, "马克笔");
  } });

shot({ ch: "03 · 三个场景", mode: "PIP", dur: 8.0, vo: "现在你说一句，它自己找号码、打过去、问清楚、订好，再把结果汇报给你。",
  L: "图解全屏 + 口播右上小窗。顶部一条语音波形 → 中间竖排四步流程逐个点亮 → 底部结果卡「已预订 19:00」。",
  K: ["0.0–0.6 口播缩进小窗", "0.4 左上语音波形跳动 1s（代表「你说一句」）", "1.6 / 2.6 / 3.6 / 4.6 四步依次点亮：找号 → 拨号 → 确认 → 汇报，竖线连接，每步亮起时图标弹一下", "5.8 结果卡从底部弹出：「已预订 19:00 · 4 人 · 靠窗」", "6.2 结果卡左侧珊瑚橙 coral勾"],
  T: "四步每步 52px；结果卡「已预订 19:00」64px",
  snd: "BGM-4；2.6s 拨号音短促；5.8s 成功音",
  tip: "无。", src: "实拍 A（小窗）",
  build(c) {
    c.talk(tw(RF, RP, 0, .6, "qio", { r: [[0, 0], [.6, 30]] }), { border: true });
    for (let i = 0; i < 16; i++) c.add(`<div style="width:14px;height:90px;border-radius:7px;background:var(--navy)"></div>`, { x: -420 + i * 26, y: -560, sy: [[.4, .1], [.6, .3 + .7 * Math.abs(Math.sin(i * 1.7)), "out"], [1.2, .2 + .8 * Math.abs(Math.cos(i * 1.3))], [1.5, .1]], o: [[.3, 0], [.4, 1]] });
    line(c, -300, -330, 600, 1.6, 3.0, "var(--tom)", 8);
    [["signal", "找号码", 1.6], ["telephone", "打过去", 2.6], ["question", "问清楚", 3.6], ["check", "订好 · 汇报", 4.6]].forEach(([il, s, a], i) => { const y = -330 + i * 200;
      c.add(`<div class="dot" style="width:120px;height:120px;background:var(--cream);border:6px solid var(--navy)"></div>`, { x: -300, y, o: [[.5, .35], [a, .35], [a + .15, 1]], s: [[a, .8], [a + .3, 1, "back"]] });
      c.ill(il, 90, { x: -300, y, o: [[.5, .35], [a, .35], [a + .15, 1]] });
      lab(c, s, 52, { x: -60, y, o: [[.5, .3], [a, .3], [a + .2, 1]] }, "var(--navy)", "cn", "text-align:left;width:400px;margin-left:200px"); });
    c.sfx(2.6, "拨号音");
    c.add(`<div class="cardn" style="width:820px;height:200px;display:flex;align-items:center;padding-left:170px;font:800 64px var(--cn);color:var(--cream)">已预订 19:00<span style="font:600 32px var(--cn);opacity:.7;margin-left:24px">4 人 · 靠窗</span></div>`, { y: 650, ...POP(5.8) });
    c.ill("check", 100, { x: -320, y: 650, ...POP(6.2) }); c.sfx(5.8, "成功音");
  } });

shot({ ch: "03 · 三个场景", mode: "TALK", dur: 5.0, vo: "一个 AI 替你打电话，这件事比它听起来要重。",
  L: "口播特写，全片第一次「降温」：BGM 全停，画面无任何元素，只缓慢推近。",
  K: ["0.0 特写 1.22→1.3 慢推（5s 线性）", "0.0–5.0 无字卡、无图标", "3.8 说完停 1s，中间轻呼一口气（实拍）"],
  T: "无字卡",
  snd: "BGM 全停，只留口播和房间底噪",
  tip: "原定 9s，口播 4.8s，压到 5s（结尾 1s 静止呼吸保留）。85mm 特写，说完停 1 秒，轻轻呼一口气，别笑。", src: "实拍 A（85mm）",
  build(c) { c.talk(tw(RF, RF, 0, 0, "lin", { z: [[0, 1.22], [5, 1.3, "lin"]], fx: 505, fy: 620, px: 540, py: 700 })); } });

shot({ ch: "04 · 三条路线", mode: "FULL", dur: 4.8, vo: "因为现在国内外大厂，其实在赌三件不同的事。",
  L: "纯动画（人声）。背景一路分三岔图标（bg_routes），三枚骰子 / 筹码依次落在三条路口。",
  K: ["0.0 bg_routes 全屏铺底，镜头从 1.08 缓拉到 1.0", "0.3「三条路」左上 110px 落下", "1.2 / 1.6 / 2.0 三枚骰子从上方落到三条岔路尽头，各弹一下", "2.4 三个问号胶囊在骰子上方淡入（下一镜揭晓）"],
  T: "「三条路」110px 暖白，屏幕左上 y≈330",
  snd: "BGM-5 起 -26dB；骰子落桌 ×3",
  tip: "无。", src: "",
  build(c) {
    c.camera({ z: [[0, 90], [4.8, 0, "out"]] });
    c.ill("bg_routes", 1080, { y: 150 });
    lab(c, "三条路", 110, { x: -220, y: -640, ...UP(.3, -640, -40) });
    [[-300, -60], [0, -170], [300, -60]].forEach(([x, y], i) => { const a = 1.2 + i * .4;
      c.ill("dice", 130, { x, y: [[a, y - 500], [a + .35, y, "back"]], rz: [[a, 40], [a + .35, 0]], o: [[a, 0], [a + .05, 1]] });
      pill(c, "?", "o", { x, y: y - 120, ...FI(2.4 + i * .1) }); c.sfx(a + .35, "骰子"); });
  } });

shot({ ch: "04 · 三条路线", mode: "PIP", dur: 5.0, vo: "Meta 的 Muse 赌「云端一台电脑」。",
  L: "图解全屏 + 口播小窗。云端电脑图标浮在云海实拍素材上，旁边一只手撤走，屏幕里任务条继续跑。",
  K: ["0.0 口播缩进小窗；clouds 实拍素材做底（照片框 960×960）", "0.4 云端电脑图标弹出，轻浮", "1.0 手（handover）在电脑旁，2.0 撤出画外", "2.0 起屏幕里 3 条任务条继续自己增长（关键视觉：手走了它还在动）", "2.6 底部「Muse · 云端电脑」上浮"],
  T: "「Muse · 云端电脑」72px，Muse 用 Bebas",
  snd: "BGM-5",
  tip: "无。", src: "mixkit clouds（云海）",
  build(c) {
    c.talk(tw(RF, RP, 0, .6, "qio", { r: [[0, 0], [.6, 30]] }), { border: true });
    vidp(c, "clouds", 900, 900, { y: 40, ...FI(0) });
    c.ill("cloudpc", 560, { y: 0, bob: 8, ...POP(.4) });
    for (let i = 0; i < 3; i++) hbar(c, -150, -60 + i * 50, 300 - i * 60, .8 + i * .3, 4, "var(--tom)", 18);
    c.ill("handover", 300, { x: [[1.0, 360], [2.0, 360], [2.5, 900, "in"]], y: 260, ...FI(1.0) });
    lab(c, "<span class='en' style='font-size:96px'>Muse</span> · 云端电脑", 72, { y: 690, ...UP(2.6, 690) });
  } });

shot({ ch: "04 · 三条路线", mode: "FULL", dur: 7.5, vo: "给每个用户配一台云端虚拟电脑，跨周异步，你关掉 App 它还在里面干活。",
  L: "纯动画（人声）。三周甘特图：W1 / W2 / W3 三列，任务条横跨三周持续延伸；中段一个手机图标被「关掉」，任务条不停。",
  K: ["0.0 甘特网格淡入，三列表头 W1 W2 W3（Bebas）", "0.5 任务条 1 开始延伸，3.5s 穿过三周", "1.2 / 1.9 任务条 2、3 错开开始", "2.8 说「关掉 App」：左侧手机图标变暗 + 珊瑚橙 coral「OFF」", "3.0 起任务条照样继续长（重点）", "4.5「跨周异步」右上砸入"],
  T: "「跨周异步」88px 右上；表头 W1/W2/W3 Bebas 80px",
  snd: "BGM-5；任务条延伸配细微电流声",
  tip: "原定 5s，口播需 7.5s，已加长。", src: "",
  build(c) {
    ["W1", "W2", "W3"].forEach((s, i) => { lab(c, s, 80, { x: -250 + i * 290, y: -380, ...FI(0) }, "var(--navy)", "en"); if (i) c.add(`<div style="width:4px;height:760px;background:rgba(242,237,228,.15)"></div>`, { x: -395 + i * 290, y: 20, ...FI(0) }); });
    [["var(--tom)", .5, 3.5, -200], ["var(--sky)", 1.2, 3.2, -40], ["var(--sage)", 1.9, 3.0, 120]].forEach(([col, a, d, y], i) => { hbar(c, -400, y, 860 - i * 60, a, d, col, 64); });
    c.ill("phone", 200, { x: -330, y: 420, o: [[0, 0], [.3, 1], [2.8, 1], [3.1, .35]] });
    lab(c, "OFF", 72, { x: -330, y: 420, ...SLAM(2.8) }, "var(--tom)", "en");
    lab(c, "跨周异步", 88, { x: 220, y: -640, ...SLAM(4.5) }); c.shake(4.55, .25, 6);
  } });

shot({ ch: "04 · 三条路线", mode: "FULL", dur: 4.1, bgc: "#08090B", vo: "代价是安全边界，海外实测已经踩过雷。",
  L: "纯动画，墨黑底（降温）。云端电脑居中，外壳上一道珊瑚橙 coral裂缝 0.3s 裂开，带警示角标。",
  K: ["0.0 云端电脑居中，轻浮", "1.0 珊瑚橙 coral锯齿裂缝从左上到右下 0.3s 画出，画面轻震 6px", "1.2 右上「!」警示三角弹出", "1.6「安全边界」珊瑚橙 coral底部砸入"],
  T: "「安全边界」96px 珊瑚橙 coral，屏幕 y≈1650；红色只用于警示",
  snd: "1.0s S6 错误音（-20dB）",
  tip: "无。", src: "",
  build(c) {
    c.ill("cloudpc", 640, { y: -60, bob: 6, ...FI(0) });
    const s = c.add(`<svg width="420" height="300" viewBox="0 0 420 300"><polyline points="10,10 90,90 60,130 170,170 140,210 260,250 410,290" fill="none" stroke="#E2553A" stroke-width="14" stroke-linejoin="round" pathLength="1" stroke-dasharray="1" stroke-dashoffset="1"/></svg>`, { x: 0, y: -80 });
    c.on(t => { s.querySelector("polyline").style.strokeDashoffset = 1 - E.out(Math.max(0, Math.min(1, (t - 1) / .3))); });
    c.add(`<div class="en" style="width:140px;height:140px;border-radius:50%;background:var(--tom);color:var(--cream);font-size:110px;line-height:150px;text-align:center">!</div>`, { x: 300, y: -340, ...POP(1.2) });
    lab(c, "安全边界", 96, { y: 690, ...SLAM(1.6) }, "var(--tom)"); c.shake(1.05, .3, 6); c.sfx(1.0, "S6 错误音");
  } });

shot({ ch: "04 · 三条路线", mode: "LOW", dur: 5.0, vo: "阿里的千问 Go 赌「生态」。",
  L: "人物下半屏；上半屏一个主 App 图标居中，向外长出三条线连到购物袋 / 餐厅 / 飞机三个图标。",
  K: ["0.0–0.6 口播下沉", "0.4 主图标「千问 Go」弹出", "1.0 / 1.4 / 1.8 三条线依次从主图标画出，末端图标弹出（bag / restaurant / 飞机实拍小圆）", "2.4「千问 Go · 生态」上浮在三条线下方"],
  T: "「千问 Go · 生态」72px，「生态」珊瑚橙 coral",
  snd: "BGM-5；连线到位 tick ×3",
  tip: "中景。", src: "实拍 A；mixkit plane",
  build(c) {
    c.talk(tw(RF, RB, 0, .6));
    app(c, "千问", "var(--but)", "var(--ink)", { y: -480, ...POP(.4) }, 180);
    [[-330, -690, "bag"], [330, -690, "restaurant"], [0, -260, null]].forEach(([x, y, il], i) => { const a = 1.0 + i * .4, ang = Math.atan2(y + 480, x) * 180 / Math.PI, len = Math.hypot(x, y + 480) - 110;
      c.add(`<div style="height:8px;background:var(--navy);border-radius:4px;transform-origin:0 50%"></div>`, { x: 0, y: -480, rz: ang, sx: [[a, 0], [a + .4, 1, "out"]] }, null, { center: false }).firstChild.style.width = len + "px";
      if (il) c.ill(il, 160, { x, y, ...POP(a + .35) }); else vidp(c, "plane", 200, 200, { x, y, ...POP(a + .35) }, { style: "border-radius:50%" });
      c.sfx(a + .4, "tick"); });
    lab(c, "千问 Go · <span class='co'>生态</span>", 72, { y: -150, ...UP(2.4, -150) });
  } });

shot({ ch: "04 · 三条路线", mode: "FULL", dur: 5.0, vo: "专治购物保价、退换货、航班理赔这些消费痛点。",
  L: "纯动画（人声）。三张单据错落排列（价保 / 退货 / 理赔），依次被盖「已处理」印章。",
  K: ["0.0 三张单据从下方错落上浮（间隔 0.12s，各带 ±4° 角度）", "1.2 / 2.2 / 3.2 三枚珊瑚橙 coral印章 0.3s 从 1.6 倍砸下，每次轻震 4px", "背景右上放一小框 salepage 实拍素材"],
  T: "单据标题 56px；印章「已处理」44px",
  snd: "盖章声 ×3（-18dB）",
  tip: "无。", src: "mixkit salepage",
  build(c) {
    vidp(c, "salepage", 460, 300, { x: 240, y: -640, rz: 3, ...FI(0) });
    [["价格保护", "差价 ¥86", -6, -280], ["退换货", "上门取件", 4, 40], ["航班理赔", "延误 2h", -3, 360]].forEach(([s, b, r, y], i) => { const a = 1.2 + i * 1.0, x = i % 2 ? 120 : -120;
      c.add(`<div class="card" style="width:600px;height:260px;padding:40px 48px;text-align:left"><div style="font:800 56px var(--cn)">${s}</div><div style="font:600 36px var(--cn);opacity:.6;margin-top:14px">${b}</div></div>`, { x, y, rz: r, ...UP(i * .12, y, 120) });
      c.add(`<div class="stamp">已处理</div>`, { x: x + 170, y: y + 10, rz: -14, ...SLAM(a) }); c.shake(a + .05, .2, 4); c.sfx(a, "盖章"); });
  } });

shot({ ch: "04 · 三条路线", mode: "FULL", dur: 5.0, vo: "字节的小豆赌「独立产品」。",
  L: "纯动画（人声）。bg_field 空地全屏；一个印着小豆的独立盒子从天而降落在空地中央，远处是豆包大楼剪影（不在主 App 里）。",
  K: ["0.0 bg_field 全屏，镜头微微下摇", "0.6 盒子从画外上方 0.4s 落下，落地压扁回弹 + 一圈尘土", "1.0 轻震 6px", "1.6「小豆 · 独立」底部上浮"],
  T: "「小豆 · 独立」88px，「独立」珊瑚橙 coral",
  snd: "BGM-5；落地一声闷响",
  tip: "无。", src: "",
  build(c) {
    c.camera({ y: [[0, -40], [5, 0, "out"]] });
    c.ill("bg_field", 1080, { y: 150 });
    const box = c.add(`<div style="width:300px;height:300px;border-radius:40px;background:var(--tom);box-shadow:0 30px 60px rgba(229,103,63,.35);display:flex;align-items:center;justify-content:center">${ICN("bean",240,true,"13,14,17")}</div>`, { y: [[.6, -1300], [1.0, 60, "in"]], sy: [[1.0, .82], [1.25, 1, "back"]], sx: [[1.0, 1.12], [1.25, 1, "back"]] }); useIll(c, "bean");
    c.add(`<div style="width:520px;height:60px;border-radius:50%;background:rgba(241,234,219,.8)"></div>`, { y: 220, s: [[1.0, .4], [1.6, 1.3, "out"]], o: [[1.0, .9], [1.6, 0]] });
    c.shake(1.0, .3, 6); c.sfx(1.0, "落地");
    lab(c, "小豆 · <span class='co'>独立</span>", 88, { y: 690, ...UP(1.6, 690) });
  } });

shot({ ch: "04 · 三条路线", mode: "LOW", dur: 7.3, vo: "官方也说了，跑通了会融回豆包。所以它不是豆包的替代，是豆包的试验田。",
  L: "人物下半屏；上半屏左小豆盒子 → 弧形箭头 → 右豆包图标；最后「试验田」压在中间，下方一株幼苗长出。",
  K: ["0.0–0.6 口播下沉", "0.4 小豆盒子（左）+ 豆包图标（右）出现", "1.0 弧形箭头 0.6s 从左画到右，箭头上方胶囊「跑通后」", "3.0 说到「不是替代」：两图标间「≠ 替代」灰字淡入后被划掉", "4.6 说到「试验田」：中央幼苗图标从土里长出（sy 0→1），「试验田」120px 砸入"],
  T: "「跑通后」胶囊 32px；「试验田」120px 暖白 + 黄色高亮",
  snd: "BGM-5 降到 -30dB；4.6s 一声 ding",
  tip: "中景，说「试验田」时停一下再说。", src: "实拍 A；官方说法出处 M05（新闻截图，选用）",
  build(c) {
    c.talk(tw(RF, RB, 0, .6));
    c.add(`<div class="app" style="width:170px;height:170px;background:var(--tom)">${ICN("bean",140,true,"13,14,17")}</div>`, { x: -320, y: -560, ...POP(.4) }); useIll(c, "bean");
    app(c, "豆包", "var(--sky)", "var(--ink)", { x: 320, y: -560, ...POP(.5) }, 170);
    const s = c.add(`<svg width="460" height="160" viewBox="0 0 460 160"><path d="M10 150 Q230 -60 440 150" fill="none" stroke="#F2EDE4" stroke-width="9" stroke-linecap="round" pathLength="1" stroke-dasharray="1" stroke-dashoffset="1"/><path d="M415 120 L442 152 L404 156" fill="none" stroke="#F2EDE4" stroke-width="9" stroke-linecap="round" opacity="0"/></svg>`, { y: -690 });
    c.on(t => { const p = E.out(Math.max(0, Math.min(1, (t - 1) / .6))); s.querySelector("path").style.strokeDashoffset = 1 - p; s.querySelectorAll("path")[1].style.opacity = p > .95 ? 1 : 0; });
    pill(c, "跑通后", "y", { y: -800, ...FI(1.4) });
    lab(c, "≠ 替代", 56, { y: -540, ...FI(3.0) }, "rgba(242,237,228,.5)"); strike(c, 220, 0, -540, 3.5);
    c.ill("seedling", 160, { y: -230, sy: [[4.6, 0], [5.1, 1, "back"]] });
    lab(c, "<span class='hl'>试验田</span>", 120, { y: -380, ...SLAM(4.7) }); c.sfx(4.6, "ding");
  } });
