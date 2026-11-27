/* 小豆 · 第五章 三道槛 + 第六章 收束（#34–#49） */
shot({ ch: "05 · 三道槛", mode: "TALK", dur: 4.0, vo: "夸完了，说三道槛。",
  L: "口播全屏。她手掌往下压时，画面上方三道横杠依次落下，像三道栏杆。",
  K: ["0.0 硬切，BGM 换", "0.4「三道槛」左上 110px 落下", "1.2 / 1.5 / 1.8 三道暖白横杠在头顶空墙依次从上方落下（back 缓动），间距 70px", "3.7 淡出"],
  T: "「三道槛」110px 暖白，屏幕左上",
  snd: "BGM-6 起 -26dB（更沉的段落）；横杠落下 ×3 木头敲击",
  tip: "中景，说「三道槛」时手掌往下压一次。", src: "实拍 A",
  build(c) {
    c.talk(tw(RF, RF));
    lab(c, "三道槛", 110, OFF({ x: -230, y: -700, ...UP(.4, -700, -40) }, 3.7));
    [0, 1, 2].forEach(i => { const a = 1.2 + i * .3; c.add(`<div style="width:760px;height:26px;border-radius:13px;background:var(--navy)"></div>`, OFF({ y: [[a, -1100], [a + .35, -540 + i * 70, "back"]] }, 3.7)); c.sfx(a + .35, "木头"); });
  } });

shot({ ch: "05 · 三道槛", mode: "PIP", dur: 6.2, vo: "第一道，拿不到。今天开的是邀请制，要邀请码，靠拉好友换额度。",
  L: "图解全屏 + 口播小窗。手机里是邀请页，下方一条额度进度条随「拉好友」上涨。",
  K: ["0.0「① 拿不到」左上弹入；口播缩进小窗", "0.5 手机框上浮，钥匙图标 + 6 格邀请码（回扣 #02）", "2.4 提示条「邀请 3 位好友 +500 额度」弹出", "2.8–3.4 三个好友头像圆点依次飞入", "3.4 额度条 0.6s 从 0 涨到 500", "4.2「邀请制」右上砸入"],
  T: "「① 拿不到」88px；「邀请制」88px 珊瑚橙 coral右上；提示条 34px",
  snd: "BGM-6；额度上涨一串 tick",
  tip: "正式版可用 M02 官方邀请页截图（个人信息打码）。", src: "M02 邀请页截图（选用）",
  build(c) {
    c.talk(tw(RF, RP, 0, .6, "qio", { r: [[0, 0], [.6, 30]] }), { border: true });
    lab(c, "① 拿不到", 88, { x: -200, y: -700, ...POP(0) });
    phone(c, 560, 900, { y: 0, ...UP(.5, 0, 80) }, `<div style="height:180px;background:var(--tom)"></div>`);
    c.ill("key", 180, { y: -240, ...POP(.7) });
    for (let i = 0; i < 6; i++) c.add(`<div style="width:62px;height:82px;border-radius:12px;border:4px solid var(--navy);background:var(--paper)"></div>`, { x: -180 + i * 72, y: -40, ...POP(.9 + i * .06, .3) });
    pill(c, "邀请 3 位好友 +500 额度", "y", { y: 110, ...POP(2.4) });
    [0, 1, 2].forEach(i => c.add(`<div class="dot" style="width:70px;height:70px;background:${["var(--sky)", "var(--sage)", "var(--but)"][i]};border:4px solid var(--navy)"></div>`, { x: [[2.8 + i * .2, 500], [3.1 + i * .2, -90 + i * 90, "out"]], y: 220, o: [[2.8 + i * .2, 0], [2.9 + i * .2, 1]] }));
    c.add(`<div style="width:420px;height:30px;border-radius:15px;background:rgba(242,237,228,.12)"></div>`, { y: 330, ...FI(2.6) });
    hbar(c, -210, 330, 420, 3.4, .6, "var(--tom)", 30);
    lab(c, "500", 48, { x: 0, y: 390, ...FI(3.9) }, "var(--tom)", "en");
    lab(c, "邀请制", 88, { x: 250, y: 620, ...SLAM(4.2) }, "var(--tom)"); c.sfx(3.4, "tick 串");
  } });

shot({ ch: "05 · 三道槛", mode: "FULL", dur: 10.0, vo: "为什么不敢全量放开？后台二十四小时盯任务、不停调工具跑推理，那个算力成本，比聊天高一个数量级。",
  L: "纯动画（人声）。上半屏数据中心夜景实拍框（dcnight）；下半屏两根柱子对比：聊天（短）vs 后台任务（长，标 24h），末尾标「×10」。",
  K: ["0.0 dcnight 实拍照片框从上滑入", "0.6「为什么不敢全量放开？」88px 打在照片框下", "2.6 左柱「聊天」0.5s 长到 120px", "3.6 右柱「后台任务」1s 长到 600px（缓慢、有压迫感），柱旁时钟角标「24h」", "4.8 柱顶「×10」Bebas 200px 珊瑚橙 coral砸下，闷响 + 轻震", "6.5「成本高一个数量级」底部上浮"],
  T: "问句 64px；柱名 44px；「×10」Bebas 200px；底部「成本高一个数量级」72px",
  snd: "BGM-6；4.8s 一记闷响（-18dB）",
  tip: "原定 7s，口播需 10s，已加长。×10 是「一个数量级」的示意，不是精确数据。", src: "mixkit dcnight / racks（机房夜景）",
  build(c) {
    vidp(c, "dcnight", 900, 500, { y: -560, rz: -1.5, ...UP(0, -560, -80) });
    lab(c, "为什么不敢全量放开？", 64, { y: -230, ...UP(.6, -230) });
    c.add(`<div style="width:820px;height:6px;background:var(--navy)"></div>`, { y: 560, ...FI(2.4) });
    const bar = (x, h, a, d, col) => { const b = c.add(`<div style="width:200px;background:${col};border-radius:16px 16px 0 0;position:absolute;bottom:0;left:-100px"></div>`, { x, y: 557 }, null, { center: false }); c.on(t => { b.firstChild.style.height = h * E.out(Math.max(0, Math.min(1, (t - a) / d))) + "px"; }); };
    bar(-200, 120, 2.6, .5, "var(--sky)"); bar(200, 600, 3.6, 1.0, "var(--tom)");
    lab(c, "聊天", 44, { x: -200, y: 620, ...FI(2.4) }); lab(c, "后台任务", 44, { x: 200, y: 620, ...FI(2.4) });
    c.ill("hourglass", 120, { x: 390, y: 160, ...POP(4.2) }); pill(c, "24h", "o", { x: 390, y: 260, ...POP(4.3) });
    lab(c, "×10", 200, { x: 200, y: -120, ...SLAM(4.8) }, "var(--tom)", "en"); c.shake(4.85, .3, 7); c.sfx(4.8, "闷响");
    lab(c, "成本高<span class='hl'>一个数量级</span>", 72, { y: 740, ...UP(6.5, 740) });
  } });

shot({ ch: "05 · 三道槛", mode: "LOW", dur: 6.0, vo: "第二道，做不全。代打电话现在只限境内生活服务。",
  L: "人物下半屏；上半屏一张抽象地图块（不用真实国界）：中间一块亮起（境内），四周灰；右侧「个人电话」图标被禁止符号盖住。",
  K: ["0.0–0.6 口播下沉", "0.3「② 做不全」左上弹入", "0.8 3×3 圆角地块网格灰色淡入", "2.2 中央一块 0.6s 展开成珊瑚橙 coral亮块，上标「境内生活服务」", "3.4 右侧电话图标 + 禁止圈 0.3s 盖上", "4.0「仅境内生活服务」字卡"],
  T: "「② 做不全」88px；「仅境内生活服务」64px 在地图下方",
  snd: "BGM-6；禁止圈一声短促 buzz",
  tip: "中景。地图用抽象色块，不要出现任何真实国界或地图轮廓。", src: "实拍 A",
  build(c) {
    c.talk(tw(RF, RB, 0, .6));
    lab(c, "② 做不全", 88, { x: -220, y: -720, ...POP(.3) });
    for (let i = 0; i < 9; i++) { const x = -300 + (i % 3) * 150, y = -560 + Math.floor(i / 3) * 150, mid = i === 4;
      c.add(`<div style="width:136px;height:136px;border-radius:26px;background:${mid ? "var(--tom)" : "rgba(242,237,228,.15)"}"></div>`, mid ? { x, y, s: [[2.2, 0], [2.8, 1, "back"]] } : { x, y, ...FI(.8 + i * .03) }); }
    c.add(`<div style="width:136px;height:136px;border-radius:26px;background:rgba(242,237,228,.15)"></div>`, { x: -150, y: -410, o: [[.8, 0], [1, 1], [2.2, 1], [2.4, 0]] });
    lab(c, "境内", 40, { x: -150, y: -410, ...FI(2.7) }, "var(--fg)");
    c.ill("telephone", 180, { x: 300, y: -440, ...POP(1.2) });
    c.add(`<div style="width:220px;height:220px;border-radius:50%;border:16px solid var(--tom)"></div>`, { x: 300, y: -440, ...SLAM(3.4) });
    c.add(`<div style="width:220px;height:16px;background:var(--tom)"></div>`, { x: 300, y: -440, rz: -45, ...SLAM(3.4) });
    lab(c, "个人电话", 36, { x: 300, y: -290, ...FI(3.5) }, "var(--tom)");
    lab(c, "仅境内生活服务", 64, { y: -170, ...UP(4.0, -170) }); c.sfx(3.4, "buzz");
  } });

shot({ ch: "05 · 三道槛", mode: "PIP", dur: 6.4, vo: "商家口音、临时改价、要报验证码，这些突发情况，演示里看不出来。",
  L: "图解全屏 + 口播小窗。横向通话波形持续滚动，中途插入三个突变标记（杂音 / 改价 / 验证码），每次波形抖动。",
  K: ["0.0 口播缩进小窗；callwoman 实拍框左上（打电话的人）", "0.4 中央 30 根波形柱开始平稳起伏", "1.2 / 2.4 / 3.6 三个标记依次插入：珊瑚橙 coral竖线 + 胶囊「杂音」「改价」「验证码」，插入瞬间波形剧烈抖动 0.4s", "4.6「突发情况」右上砸入"],
  T: "标记胶囊 34px；「突发情况」88px",
  snd: "BGM-6；每次抖动配一段电话杂音（-24dB）",
  tip: "无。", src: "mixkit callwoman",
  build(c) {
    c.talk(tw(RF, RP, 0, .6, "qio", { r: [[0, 0], [.6, 30]] }), { border: true });
    vidp(c, "callwoman", 560, 360, { x: -180, y: -560, rz: -2, ...UP(0, -560, -80) });
    const marks = [1.2, 2.4, 3.6];
    const bars = []; for (let i = 0; i < 30; i++) bars.push(c.add(`<div style="width:18px;height:200px;border-radius:9px;background:var(--navy)"></div>`, { x: -435 + i * 30, y: 80, ...FI(.4) }));
    c.on(t => bars.forEach((b, i) => { let a = .25 + .35 * Math.abs(Math.sin(t * 5 + i * .6)); for (const m of marks) if (t > m && t < m + .4) a += .9 * (1 - (t - m) / .4) * Math.abs(noise(t * 30 + i, i)); b.firstChild.style.transform = `scaleY(${Math.min(1.6, a)})`; }));
    [["杂音", -260], ["改价", 0], ["验证码", 260]].forEach(([s, x], i) => { const a = marks[i];
      c.add(`<div style="width:8px;height:440px;background:var(--tom)"></div>`, { x, y: 80, sy: [[a, 0], [a + .2, 1, "out"]] });
      pill(c, s, "t", { x, y: -180, ...POP(a) }); c.sfx(a, "杂音"); });
    lab(c, "突发情况", 88, { y: 600, ...SLAM(4.6) }); c.shake(4.65, .25, 6);
  } });

shot({ ch: "05 · 三道槛", mode: "FULL", dur: 6.0, bgc: "#08090B", vo: "第三道，最该警惕的：你交出去的，收不回来。",
  L: "实拍 B 俯拍（动画版：暖白桌面）。一串钥匙被手推远，手离开画面，钥匙停在远处。",
  K: ["0.0 BGM 全停；「③」左上淡入", "0.4 钥匙图标在画面下方，手（handover）在其后", "1.2 手推钥匙 0.6s 推向画面上方远处（钥匙缩小到 0.6 模拟远离）", "2.0 手撤出画外，静 1s", "3.4「收不回来」珊瑚橙 coral 110px 中偏下砸入"],
  T: "「③」Bebas 120px；「收不回来」110px 珊瑚橙 coral，屏幕 y≈1450",
  snd: "BGM 全停；钥匙在桌面滑动的金属声",
  tip: "实拍 B：俯拍黑桌，一只手把一串钥匙放下、推远，然后手离开画面，停 1s。", src: "实拍 B（俯拍桌面 + 钥匙串）",
  build(c) {
    lab(c, "③", 120, { x: -360, y: -700, ...FI(0) }, "var(--fg)", "en");
    c.ill("key", 260, { y: [[1.2, 260], [1.8, -260, "out"]], s: [[1.2, 1], [1.8, .6, "out"]], rz: [[1.2, 0], [1.8, 30, "out"]], ...FI(.4) });
    c.ill("handover", 380, { x: 80, y: [[.4, 600], [1.2, 480], [1.8, 40, "out"], [2.0, 40], [2.5, 1200, "in"]], ...FI(.4) });
    lab(c, "收不回来", 110, { y: 520, ...SLAM(3.4) }, "var(--tom)"); c.shake(3.45, .25, 6); c.sfx(1.2, "钥匙滑动");
  } });

shot({ ch: "05 · 三道槛", mode: "LOW", dur: 6.0, vo: "想让它好用，你得给飞书文档、抖音订单、日历、下单权限。",
  L: "人物下半屏；上半屏一个透明盒子（虚线框），四张权限卡依次掉进去，盒子越来越满。",
  K: ["0.0–0.6 口播下沉", "0.4 透明盒子出现（暖白描边虚线 + 淡色玻璃）", "1.4 / 2.2 / 3.0 / 3.8 四张卡（飞书文档 / 抖音订单 / 日历 / 下单）依次从上方落进盒子，层层叠起", "4.4「权限 ×4」右侧弹出"],
  T: "卡片 40px；「权限 ×4」72px，×4 Bebas 珊瑚橙 coral",
  snd: "BGM-6 -30dB；卡入声 ×4",
  tip: "中景。", src: "实拍 A",
  build(c) {
    c.talk(tw(RF, RB, 0, .6));
    c.add(`<div style="width:560px;height:460px;border:6px dashed var(--navy);border-top:none;border-radius:0 0 40px 40px;background:rgba(156,195,230,.18)"></div>`, { x: -100, y: -440, ...FI(.4) });
    [["飞书文档", "var(--sky)"], ["抖音订单", "var(--tom)"], ["日历", "var(--sage)"], ["下单权限", "var(--but)"]].forEach(([s, bg], i) => { const a = 1.4 + i * .8, y = -270 - i * 100;
      c.add(`<div style="width:460px;height:90px;border-radius:20px;background:${bg};color:var(--ink);font:800 42px/90px var(--cn);text-align:center;box-shadow:0 8px 16px rgba(0,0,0,.5)">${s}</div>`, { x: -100, y: [[a, -1100], [a + .4, y, "back"]], rz: [[a, i % 2 ? 6 : -6], [a + .4, i % 2 ? 2 : -2]] }); c.sfx(a + .4, "卡入"); });
    lab(c, "权限 <span class='en co' style='font-size:110px'>×4</span>", 72, { x: 330, y: -460, ...POP(4.4) });
  } });

shot({ ch: "05 · 三道槛", mode: "FULL", dur: 6.6, bgc: "#08090B", vo: "给得越多，它越懂你。可一旦理解错了、电话里说错了话，买单的是你。",
  L: "纯动画（人声），墨黑底。延续 #40 的盒子：盖子合上，盒壁变成单向玻璃——里面一只眼睛能看你，你看不进去。",
  K: ["0.0 满盒子居中（四张卡在里面）", "1.0 说「越懂你」：盒子里眼睛图标亮起", "2.6 盒盖从上方 0.4s 合上，一声闷扣", "3.0 盒壁 0.6s 变暗成单向玻璃（深色 80%），只剩眼睛在里面透出光", "4.6「买单的是你」珊瑚橙 coral砸入底部"],
  T: "「买单的是<span>你</span>」96px，「你」珊瑚橙 coral；BGM 全停",
  snd: "2.6s 盒盖闷扣；3.0s 起 BGM 全停",
  tip: "原定 6s，口播需 6.6s，已加长。", src: "",
  build(c) {
    c.add(`<div style="width:600px;height:520px;border:6px solid var(--fg);border-top:none;border-radius:0 0 40px 40px;background:rgba(156,195,230,.18)"></div>`, { y: 40 });
    [["飞书文档", "var(--sky)"], ["抖音订单", "var(--tom)"], ["日历", "var(--sage)"], ["下单权限", "var(--but)"]].forEach(([s, bg], i) => c.add(`<div style="width:480px;height:90px;border-radius:20px;background:${bg};color:var(--ink);font:800 42px/90px var(--cn);text-align:center">${s}</div>`, { y: 230 - i * 100, rz: i % 2 ? 2 : -2 }));
    c.add(`<div style="width:600px;height:520px;border-radius:0 0 40px 40px;background:#050608"></div>`, { y: 40, o: [[3.0, 0], [3.6, .85]] });
    c.ill("eye", 220, { y: 20, o: [[1.0, 0], [1.3, 1]], s: [[1.0, .6], [1.3, 1, "back"]] });
    c.add(`<div style="width:660px;height:40px;border-radius:14px;background:var(--fg)"></div>`, { y: [[2.6, -700], [3.0, -240, "in"]] }); c.shake(3.0, .2, 6); c.sfx(2.6, "闷扣");
    lab(c, "买单的是<span class='co'>你</span>", 96, { y: 640, ...SLAM(4.6) }, "var(--fg)");
  } });

shot({ ch: "05 · 三道槛", mode: "PIP", dur: 7.5, vo: "而且当你的长期记忆全存在一家大厂里，以后想换别家，迁移成本高得吓人。",
  L: "图解全屏 + 口播小窗。一条由玻璃卡片/标签串成的「记忆长链」从左延伸到右，末端被一把锁扣住；链条旁边是别家 App 的空位（虚线）。",
  K: ["0.0 口播缩进小窗", "0.4 链条从左往右 1.5s 延伸（12 节，交替颜色，每节带一个小标签：偏好/住址/口味…）", "2.4 锁（vault 图标）在链条末端 0.3s 扣上，轻震 6px", "3.6 说「换别家」：右下虚线 App 空位出现，一个箭头试图过去被挡住（珊瑚橙 coral×）", "5.0「迁移成本」右上砸入"],
  T: "「迁移成本」88px 暖白，「成本」珊瑚橙 coral",
  snd: "BGM-6；2.4s 锁扣声（-18dB）",
  tip: "原定 6s，口播需 7.5s，已加长。", src: "",
  build(c) {
    c.talk(tw(RF, RP, 0, .6, "qio", { r: [[0, 0], [.6, 30]] }), { border: true });
    const tags = ["偏好", "住址", "口味", "日程", "同事", "订单", "作息", "习惯", "工作", "家人", "账号", "密码"];
    tags.forEach((s, i) => { const a = .4 + i * .12, x = -440 + (i % 6) * 150, y = -260 + Math.floor(i / 6) * 220 + (i % 2 ? 20 : -20);
      c.add(`<div style="width:130px;height:74px;border-radius:37px;border:12px solid ${i % 2 ? "var(--navy)" : "var(--tom)"}"></div>`, { x, y, ...POP(a, .3) });
      lab(c, s, 28, { x, y: y + 70, ...FI(a + .1) }, "rgba(242,237,228,.7)"); });
    c.ill("vault", 260, { x: 330, y: 260, ...SLAM(2.4) }); c.shake(2.45, .3, 6); c.sfx(2.4, "锁扣");
    c.add(`<div style="width:220px;height:220px;border-radius:44px;border:6px dashed rgba(242,237,228,.4)"></div>`, { x: -250, y: 520, ...FI(3.6) });
    lab(c, "别家", 44, { x: -250, y: 520, ...FI(3.6) }, "rgba(242,237,228,.4)");
    lab(c, "×", 160, { x: 40, y: 520, ...SLAM(4.1) }, "var(--tom)", "en");
    hbar(c, 140, 520, 120, 3.7, .3, "var(--navy)", 10);
    lab(c, "迁移<span class='co'>成本</span>", 88, { x: 0, y: -620, ...SLAM(5.0) });
  } });

shot({ ch: "06 · 收束", mode: "FULL", dur: 5.0, bgc: "#08090B", vo: "记忆越长，你越走不掉。",
  L: "金句独占一屏，墨黑底。字底是一条越来越长的链条剪影（与 #42 同素材回环）。",
  K: ["0.0 BGM 全停", "0.2「记忆越长，」逐字 0.5s 上浮", "1.3「你越走不掉。」逐字上浮，「走不掉」珊瑚橙 coral", "0.0–5.0 字下方链条剪影从左向右缓慢延伸（5s 线性），始终没到头"],
  T: "「记忆越长，你越走不掉。」两行 110px 暖白，屏幕居中",
  snd: "BGM 全停，只留口播；可加极轻环境底噪",
  tip: "无。", src: "",
  build(c) {
    c.chars("记忆越长，", 110, 0, -100, .2, { mode: "up", css: "color:var(--fg)", stagger: .08 });
    c.chars("你越*走不掉*。", 110, 0, 60, 1.3, { mode: "up", css: "color:var(--fg)", stagger: .08 });
    for (let i = 0; i < 9; i++) c.add(`<div style="width:120px;height:66px;border-radius:33px;border:10px solid rgba(241,234,219,.25)"></div>`, { x: -480 + i * 110, y: 300 + (i % 2 ? 12 : -12), o: [[i * .5, 0], [i * .5 + .3, 1]] });
  } });

shot({ ch: "06 · 收束", mode: "TALK", dur: 5.0, vo: "所以拿到邀请码，先别放权。",
  L: "口播全屏。她把手机屏幕朝下扣在桌上；右上「先别放权」字卡 + 一个拨回「关」的开关。",
  K: ["0.0 硬切，BGM-7 进（回暖）", "1.0 右上开关图标从「开」拨回「关」（rz 180→0，0.4s）", "2.0 说「先别放权」：字卡砸入，开关下方", "实拍：2.0s 左右手机扣桌"],
  T: "「先别放权」96px，「别」珊瑚橙 coral，右上",
  snd: "BGM-7 起 -24dB；手机扣桌一声（实拍同期）",
  tip: "中景，说「先别放权」时把手机屏幕朝下扣在桌上，动作干脆 0.3s。", src: "实拍 A",
  build(c) {
    c.talk(tw(RF, RF));
    c.ill("toggle", 160, { x: 330, y: -680, rz: [[1.0, 180], [1.4, 0, "qio"]], ...POP(.3) });
    lab(c, "先<span class='co'>别</span>放权", 96, { x: 220, y: -520, ...SLAM(2.0) }); c.shake(2.05, .2, 5);
  } });

shot({ ch: "06 · 收束", mode: "LOW", dur: 6.0, vo: "先拿三件小事试：查降价、整理飞书资料、问餐厅有没有空位。",
  L: "人物下半屏；上半屏一张待办清单卡，三条依次打勾，每条左侧绿色「低风险」标签。",
  K: ["0.0–0.6 口播下沉", "0.4 清单卡上浮", "1.6 / 2.8 / 4.0 三条依次：珊瑚橙 coral勾 0.2s 画上 + 文字变成暖白 100%", "每条左侧 sage 色「低风险」胶囊常驻"],
  T: "清单 52px：查降价 / 整理飞书资料 / 问餐厅有没有空位",
  snd: "BGM-7；轻点 ×3",
  tip: "中景，可配合手指点三下。", src: "实拍 A",
  build(c) {
    c.talk(tw(RF, RB, 0, .6));
    c.add(`<div class="card" style="width:900px;height:560px"></div>`, { y: -480, ...UP(.4, -480) });
    [["查降价", 1.6], ["整理飞书资料", 2.8], ["问餐厅有没有空位", 4.0]].forEach(([s, a], i) => { const y = -640 + i * 160;
      pill(c, "低风险", "g", { x: -320, y, ...FI(.6) });
      lab(c, s, 52, { x: 60, y, o: [[.6, 0], [.8, .55], [a, .55], [a + .2, 1]] }, "var(--navy)", "cn", "width:520px;text-align:left");
      c.ill("check", 80, { x: 390, y, ...POP(a, .3) }); c.sfx(a, "轻点"); });
  } });

shot({ ch: "06 · 收束", mode: "FULL", dur: 8.0, vo: "每次盯一件事——涉及花钱和对外打电话的时候，它有没有把最后那道确认留给你。",
  L: "纯界面（人声）。两部手机并排：左下单页、右拨号页；整体压暗，只有两个「确认」按钮亮起。",
  K: ["0.0 两部手机从两侧滑入", "1.4 左手机：订单 ¥268 + 支付按钮；右手机：拨号「巷子里的小馆」", "3.2 整个画面压暗到 35%", "3.6 两个「确认」按钮 0.4s 亮起（白底，只有它们亮），外圈珊瑚橙 coral呼吸光", "5.4「最后一道确认」底部上浮"],
  T: "按钮「需要你确认」40px；底部「最后一道确认」88px",
  snd: "BGM-7；按钮亮起一声柔和 ding",
  tip: "原定 6s，口播需 8s，已加长。", src: "",
  build(c) {
    phone(c, 440, 820, { x: [[0, -800], [.5, -250, "out"]], y: -80 }, `<div style="padding:110px 36px;text-align:left"><div style="font:800 44px var(--cn)">确认订单</div><div style="font:600 32px var(--cn);opacity:.6;margin-top:24px">晚餐套餐 ×2</div><div style="font:900 80px var(--en);margin-top:40px;color:var(--tom)">¥268</div></div>`);
    phone(c, 440, 820, { x: [[0, 800], [.5, 250, "out"]], y: -80 }, `<div style="padding:110px 36px;text-align:center"><div style="font:800 44px var(--cn)">正在拨打</div><div style="font:600 34px var(--cn);opacity:.6;margin-top:24px">巷子里的小馆</div><div style="font:700 40px var(--mono);margin-top:40px">021-6xxx-xx88</div></div>`);
    c.add(`<div style="width:1080px;height:1920px;background:#000"></div>`, { o: [[3.2, 0], [3.6, .65]] });
    [-250, 250].forEach(x => { c.add(`<div style="width:340px;height:110px;border-radius:55px;background:var(--paper);color:var(--navy);font:800 40px/110px var(--cn);text-align:center;box-shadow:0 0 0 10px rgba(226,85,58,.6)">需要你确认</div>`, { x, y: 180, ...POP(3.6) }); });
    lab(c, "最后一道确认", 88, { y: 700, ...UP(5.4, 700) }, "var(--fg)"); c.sfx(3.6, "ding");
  } });

shot({ ch: "06 · 收束", mode: "TALK", dur: 5.3, vo: "尺子就一句：它替你做决定之前，还会不会问你一句。",
  L: "口播推近到特写；头顶右侧一把尺子图标，说「问你一句」时尺子旁出现一个问号。",
  K: ["0.0–0.5 推近到特写", "0.6 尺子图标右上弹入（−8°）", "3.4 说「问你一句」：问号图标弹出", "最后 1s 她抬眼看镜头，画面不加任何元素"],
  T: "无大字卡（这一句让人脸说话）",
  snd: "BGM-7 降 4dB",
  tip: "原定 3s，口播需 5.3s，已加长。85mm 特写，最后抬眼看镜头。", src: "实拍 A（85mm）",
  build(c) {
    c.talk(tw(RF, RZ, 0, .5));
    c.ill("ruler", 300, { x: 330, y: -620, rz: -8, ...POP(.6) });
    c.ill("question", 130, { x: 380, y: -460, ...POP(3.4) });
  } });

shot({ ch: "06 · 收束", mode: "FULL", dur: 3.0, bgc: "#08090B", vo: "记忆越长，你越走不掉。",
  L: "金句二次出现（同 #43 版式），字更小、位置偏上；链条剪影已经很长。",
  K: ["0.0 链条剪影直接全长出现", "0.1 金句逐字上浮 0.4s，88px，位于 y≈-300"],
  T: "「记忆越长，你越走不掉。」88px 暖白，偏上",
  snd: "BGM-7 -20dB",
  tip: "无。", src: "",
  build(c) {
    c.chars("记忆越长，你越*走不掉*。", 88, 0, -300, .1, { mode: "up", css: "color:var(--fg)", stagger: .04 });
    for (let i = 0; i < 9; i++) c.add(`<div style="width:120px;height:66px;border-radius:33px;border:10px solid rgba(241,234,219,.25)"></div>`, { x: -480 + i * 110, y: -120 + (i % 2 ? 12 : -12) });
  } });

shot({ ch: "06 · 收束", mode: "TALK", dur: 3.6, tout: "fade", vo: "你愿意让它记住你多少？",
  L: "口播特写；问句说完后 1s 压黑。片尾小字「关注曼塔」。",
  K: ["0.0 特写", "2.4 问句说完，画面 1s 压黑（dim 0→1）", "3.0「关注曼塔」32px 在黑场中淡入"],
  T: "片尾小字「关注曼塔」32px 暖白",
  snd: "BGM-7 淡出 2s",
  tip: "原定 2s，口播需 2.8s + 压黑，已加长到 3.6s。85mm 特写，同 #47 机位，问完看镜头不动。", src: "实拍 A（85mm）",
  build(c) {
    c.talk(tw(RF, RF, 0, 0, "lin", { z: 1.22, fx: 505, fy: 620, px: 540, py: 700, dim: [[2.4, 0], [3.4, 1]], o: [[2.4, 1], [3.4, .05]] }));
    lab(c, "关注曼塔", 32, { y: 400, ...FI(3.0) }, "var(--fg)");
  } });
