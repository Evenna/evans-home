// demos.js — Left stage live demos using real Anime.js
// Each demo is keyed by chapter index 0-8

window.DEMOS = {};

// Utility: clear demo area and return it
function clearStage() {
  const area = document.getElementById('demo-area');
  area.innerHTML = '';
  // Kill any old anime timelines
  if (window._demoAnime) {
    try { window._demoAnime.pause(); } catch(e){}
    window._demoAnime = null;
  }
  if (window._demoRaf) { cancelAnimationFrame(window._demoRaf); window._demoRaf = null; }
  return area;
}

function setDemoLabel(txt) {
  const el = document.getElementById('demo-label');
  if (el) el.textContent = txt;
}

function setChOverlay(txt) {
  const el = document.getElementById('ch-overlay');
  if (el) el.textContent = txt;
}

// ── CH1: Floating orbs — taste of anime.js ──
window.DEMOS[0] = function() {
  const area = clearStage();
  setDemoLabel('Anime.js — 你正在看到的就是它做的');
  setChOverlay('Ch.01 · 体验');

  const colors = ['#4f8fff','#30d158','#bf5af2','#ff9f0a','#ff6b6b'];
  const orbs = [];

  for (let i = 0; i < 7; i++) {
    const el = document.createElement('div');
    const size = 40 + Math.random() * 60;
    el.style.cssText = `
      position:absolute;
      width:${size}px;height:${size}px;
      border-radius:50%;
      background:${colors[i % colors.length]};
      opacity:0;
      top:${20 + Math.random() * 60}%;
      left:${10 + Math.random() * 80}%;
      filter:blur(1px);
      box-shadow:0 0 ${size}px ${colors[i%colors.length]}44;
    `;
    area.appendChild(el);
    orbs.push(el);
  }

  // entrance
  const a = anime({
    targets: orbs,
    opacity: [0, 0.7],
    scale: [0, 1],
    delay: anime.stagger(120),
    duration: 800,
    easing: 'easeOutElastic(1,.5)',
    complete: () => floatLoop()
  });
  window._demoAnime = a;

  function floatLoop() {
    orbs.forEach((el, i) => {
      const loop = anime({
        targets: el,
        translateY: [0, -20 + Math.random() * 40],
        translateX: [0, -15 + Math.random() * 30],
        scale: [1, 0.85 + Math.random() * 0.3],
        opacity: [0.5, 0.8],
        duration: 2000 + Math.random() * 2000,
        direction: 'alternate',
        loop: true,
        easing: 'easeInOutSine',
        delay: i * 200
      });
    });
  }
};

// ── CH2: Tech stack reveal ──
window.DEMOS[1] = function() {
  const area = clearStage();
  setDemoLabel('HTML + CSS + Anime.js = 完整网页动画');
  setChOverlay('Ch.02 · 大局观');

  area.style.flexDirection = 'column';
  area.style.gap = '0';

  const layers = [
    { label: 'HTML', sub: '结构', color: '#30d158', desc: '有什么东西' },
    { label: 'CSS', sub: '样式', color: '#ff9f0a', desc: '长什么样' },
    { label: 'Anime.js', sub: '动画', color: '#4f8fff', desc: '怎么动' },
  ];

  const wrapper = document.createElement('div');
  wrapper.style.cssText = 'display:flex;flex-direction:column;gap:12px;width:320px;';
  area.appendChild(wrapper);

  const els = layers.map((l, i) => {
    const row = document.createElement('div');
    row.style.cssText = `
      display:flex;align-items:center;gap:16px;
      padding:16px 24px;
      border-radius:12px;
      background:${l.color}18;
      border:0.5px solid ${l.color}44;
      opacity:0;transform:translateX(-40px);
    `;
    row.innerHTML = `
      <div style="font-family:'JetBrains Mono',monospace;font-size:20px;font-weight:700;color:${l.color};width:80px">${l.label}</div>
      <div>
        <div style="font-size:13px;color:rgba(255,255,255,0.8);font-weight:500">${l.sub}</div>
        <div style="font-size:11px;color:rgba(255,255,255,0.35);font-family:'JetBrains Mono',monospace;margin-top:2px">${l.desc}</div>
      </div>
    `;
    wrapper.appendChild(row);
    return row;
  });

  // arrow
  const arrow = document.createElement('div');
  arrow.style.cssText = `
    margin-top:20px;
    font-family:'JetBrains Mono',monospace;font-size:11px;
    color:rgba(255,255,255,0.25);text-align:center;
    opacity:0;
  `;
  arrow.textContent = '↓ 三层叠在一起 = 你看到的网页';
  area.appendChild(arrow);

  const a = anime.timeline({ easing: 'easeOutQuad' })
    .add({ targets: els, opacity: [0,1], translateX: [-40,0], delay: anime.stagger(180), duration: 600 })
    .add({ targets: arrow, opacity: [0,1], duration: 400 }, '-=100');

  // loop: pulse highlight each layer
  setTimeout(() => {
    let idx = 0;
    setInterval(() => {
      anime({ targets: els[idx], scale: [1, 1.03, 1], duration: 600, easing: 'easeInOutSine' });
      idx = (idx + 1) % els.length;
    }, 1200);
  }, 1200);

  window._demoAnime = a;
};

// ── CH3: Module cards fan in ──
window.DEMOS[2] = function() {
  const area = clearStage();
  setDemoLabel('6 大模块 — 点击任意卡片');
  setChOverlay('Ch.03 · 工具箱');

  const modules = [
    { name: 'Animation', color: '#4f8fff', icon: '▶' },
    { name: 'Timeline', color: '#30d158', icon: '♩' },
    { name: 'Stagger', color: '#ff9f0a', icon: '≋' },
    { name: 'Scroll', color: '#bf5af2', icon: '☲' },
    { name: 'Draggable', color: '#c8a96e', icon: '✥' },
    { name: 'SVG', color: '#ff6b6b', icon: '✏' },
  ];

  const grid = document.createElement('div');
  grid.style.cssText = 'display:grid;grid-template-columns:repeat(3,1fr);gap:12px;width:340px;';
  area.appendChild(grid);

  const cards = modules.map(m => {
    const card = document.createElement('div');
    card.style.cssText = `
      padding:20px 12px;text-align:center;
      border-radius:14px;
      background:${m.color}14;
      border:0.5px solid ${m.color}33;
      cursor:pointer;opacity:0;transform:scale(.7);
      transition:border-color .2s;
    `;
    card.innerHTML = `
      <div style="font-size:22px;color:${m.color};margin-bottom:6px">${m.icon}</div>
      <div style="font-family:'JetBrains Mono',monospace;font-size:10px;color:rgba(255,255,255,0.55)">${m.name}</div>
    `;
    card.addEventListener('click', () => {
      anime({ targets: card, scale: [1, 1.15, 1], duration: 500, easing: 'easeOutElastic(1,.5)' });
    });
    grid.appendChild(card);
    return card;
  });

  const a = anime({
    targets: cards,
    opacity: [0, 1],
    scale: [0.7, 1],
    delay: anime.stagger(80),
    duration: 600,
    easing: 'easeOutBack'
  });
  window._demoAnime = a;
};

// ── CH4: Easing playground — real anime.js balls ──
window.DEMOS[3] = function() {
  const area = clearStage();
  setDemoLabel('点击「Play」感受缓动区别');
  setChOverlay('Ch.04 · 缓动曲线');
  area.style.flexDirection = 'column';
  area.style.gap = '24px';

  const easings = [
    { name: 'linear', easing: 'linear', color: '#8a8f98' },
    { name: 'easeOutQuad', easing: 'easeOutQuad', color: '#4f8fff' },
    { name: 'easeOutElastic', easing: 'easeOutElastic(1,.5)', color: '#bf5af2' },
    { name: 'easeInOutSine', easing: 'easeInOutSine', color: '#30d158' },
  ];

  const TRACK = 280;
  const rows = [];

  easings.forEach(e => {
    const row = document.createElement('div');
    row.style.cssText = 'display:flex;align-items:center;gap:12px;opacity:0';
    row.innerHTML = `
      <div style="width:110px;text-align:right;font-family:'JetBrains Mono',monospace;font-size:10px;color:${e.color}">${e.name}</div>
      <div style="position:relative;width:${TRACK}px;height:20px;">
        <div style="position:absolute;top:50%;left:0;right:0;height:1px;background:rgba(255,255,255,0.06);transform:translateY(-50%)"></div>
        <div class="ball" style="position:absolute;top:50%;left:0;width:16px;height:16px;border-radius:50%;background:${e.color};box-shadow:0 0 12px ${e.color}88;transform:translateY(-50%) translateX(0);"></div>
      </div>
    `;
    area.appendChild(row);
    rows.push({ row, ball: row.querySelector('.ball'), easing: e.easing });
  });

  // Play button
  const btn = document.createElement('button');
  btn.textContent = '▶  Play';
  btn.style.cssText = `
    padding:10px 28px;border-radius:100px;
    border:0.5px solid rgba(255,255,255,0.15);
    background:rgba(79,143,255,0.12);
    color:#4f8fff;font-family:'JetBrains Mono',monospace;font-size:12px;
    cursor:pointer;transition:all .2s;
  `;
  btn.onmouseenter = () => btn.style.background = 'rgba(79,143,255,0.22)';
  btn.onmouseleave = () => btn.style.background = 'rgba(79,143,255,0.12)';
  area.appendChild(btn);

  // entrance
  anime({ targets: rows.map(r => r.row), opacity: [0,1], translateX: [-20,0], delay: anime.stagger(80), duration: 500, easing: 'easeOutQuad' });

  function play() {
    rows.forEach(r => {
      anime({
        targets: r.ball,
        translateX: [0, TRACK - 16],
        duration: 1400,
        easing: r.easing,
        direction: 'alternate',
      });
    });
  }
  btn.addEventListener('click', play);
  // auto play once
  setTimeout(play, 600);
};

// ── CH5: Stagger wave — real anime.js ──
window.DEMOS[4] = function() {
  const area = clearStage();
  setDemoLabel('Stagger — 骨牌效应 Live');
  setChOverlay('Ch.05 · Stagger');
  area.style.flexDirection = 'column';
  area.style.gap = '32px';

  // Row of boxes
  const row = document.createElement('div');
  row.style.cssText = 'display:flex;gap:8px;align-items:flex-end;';
  const N = 10;
  const colors = ['#4f8fff','#30d158','#ff9f0a','#bf5af2','#ff6b6b','#4f8fff','#30d158','#ff9f0a','#bf5af2','#c8a96e'];
  const boxes = [];
  for (let i = 0; i < N; i++) {
    const b = document.createElement('div');
    b.style.cssText = `
      width:28px;height:28px;border-radius:6px;
      background:${colors[i]};
      opacity:0;transform:translateY(-40px);
      box-shadow:0 4px 16px ${colors[i]}55;
    `;
    row.appendChild(b);
    boxes.push(b);
  }
  area.appendChild(row);

  // Wave label
  const lbl = document.createElement('div');
  lbl.style.cssText = 'font-family:"JetBrains Mono",monospace;font-size:10px;color:rgba(255,255,255,0.2);text-align:center';
  lbl.textContent = 'stagger(80ms) → 依次出现';
  area.appendChild(lbl);

  function playStagger() {
    anime({
      targets: boxes,
      translateY: [-40, 0],
      opacity: [0, 1],
      scale: [0.8, 1],
      delay: anime.stagger(80),
      duration: 600,
      easing: 'easeOutElastic(1,.6)',
      complete: () => {
        setTimeout(() => {
          anime({
            targets: boxes,
            translateY: [0, -40],
            opacity: [1, 0],
            delay: anime.stagger(60, { from: 'last' }),
            duration: 400,
            easing: 'easeInQuad',
            complete: () => setTimeout(playStagger, 400)
          });
        }, 1000);
      }
    });
  }
  playStagger();

  // also show a grid stagger
  const grid = document.createElement('div');
  grid.style.cssText = 'display:grid;grid-template-columns:repeat(6,1fr);gap:6px;';
  const dots = [];
  for (let i = 0; i < 24; i++) {
    const d = document.createElement('div');
    d.style.cssText = `
      width:20px;height:20px;border-radius:4px;
      background:rgba(79,143,255,0.4);opacity:0;
    `;
    grid.appendChild(d);
    dots.push(d);
  }
  area.appendChild(grid);

  setTimeout(() => {
    function gridLoop() {
      anime({
        targets: dots,
        opacity: [0, 0.8],
        scale: [0.5, 1],
        delay: anime.stagger(40, { grid: [6, 4], from: 'center' }),
        duration: 500,
        easing: 'easeOutQuad',
        complete: () => setTimeout(() => {
          anime({ targets: dots, opacity: [0.8, 0], scale: [1, 0.5], delay: anime.stagger(30, { grid:[6,4], from:'center' }), duration:400, easing:'easeInQuad', complete: () => setTimeout(gridLoop, 300) });
        }, 800)
      });
    }
    gridLoop();
  }, 500);
};

// ── CH6: Scroll sync demo (fake scroll with anime) ──
window.DEMOS[5] = function() {
  const area = clearStage();
  setDemoLabel('Scroll Observer — 滚动触发动画');
  setChOverlay('Ch.06 · Scroll');
  area.style.flexDirection = 'column';
  area.style.gap = '0';
  area.style.justifyContent = 'flex-start';
  area.style.paddingTop = '40px';
  area.style.overflow = 'hidden';

  // Mini scroll page simulation
  const page = document.createElement('div');
  page.style.cssText = `
    width:300px;height:420px;
    background:#0d1015;border-radius:16px;
    border:0.5px solid rgba(255,255,255,0.08);
    overflow:hidden;position:relative;
    box-shadow:0 24px 60px rgba(0,0,0,0.5);
  `;

  // fake sections
  const sections = [
    { label: '第一屏', color: '#4f8fff', sub: '直接显示，无需滚动' },
    { label: '第二屏', color: '#30d158', sub: '滚动进入时淡入' },
    { label: '第三屏', color: '#bf5af2', sub: '继续滚动触发' },
  ];

  const inner = document.createElement('div');
  inner.style.cssText = 'padding:24px;display:flex;flex-direction:column;gap:24px;';
  page.appendChild(inner);

  const sectionEls = sections.map(s => {
    const el = document.createElement('div');
    el.style.cssText = `
      padding:20px;border-radius:10px;
      background:${s.color}14;border:0.5px solid ${s.color}30;
      opacity:0;transform:translateY(20px);
    `;
    el.innerHTML = `<div style="font-weight:600;color:${s.color};font-size:14px;margin-bottom:4px">${s.label}</div>
      <div style="font-size:11px;color:rgba(255,255,255,0.3);font-family:'JetBrains Mono',monospace">${s.sub}</div>`;
    inner.appendChild(el);
    return el;
  });
  area.appendChild(page);

  // scroll indicator
  const scrollHint = document.createElement('div');
  scrollHint.style.cssText = 'margin-top:16px;font-family:"JetBrains Mono",monospace;font-size:10px;color:rgba(255,255,255,0.2);text-align:center;';
  scrollHint.textContent = '↓ 模拟滚动触发效果';
  area.appendChild(scrollHint);

  function triggerSequence() {
    anime.timeline({ easing: 'easeOutQuad' })
      .add({ targets: sectionEls[0], opacity:[0,1], translateY:[20,0], duration:500 })
      .add({ targets: sectionEls[1], opacity:[0,1], translateY:[20,0], duration:500 }, '+=400')
      .add({ targets: sectionEls[2], opacity:[0,1], translateY:[20,0], duration:500 }, '+=400')
      .add({ targets: sectionEls, opacity:[1,0], translateY:[0,20], delay: anime.stagger(80), duration:400, easing:'easeInQuad' }, '+=1000')
      .add({ complete: () => setTimeout(triggerSequence, 300) });
  }
  triggerSequence();
};

// ── CH7: Milestone roadmap animated ──
window.DEMOS[6] = function() {
  const area = clearStage();
  setDemoLabel('7 个里程碑 — 每一步都能跑起来');
  setChOverlay('Ch.07 · 路线图');

  const steps = [
    { n: '1', label: '引入\nCDN', color: '#4f8fff' },
    { n: '2', label: '第一个\n动画', color: '#30d158' },
    { n: '3', label: '加缓动\n曲线', color: '#ff9f0a' },
    { n: '4', label: 'Stagger\n多元素', color: '#bf5af2' },
    { n: '5', label: 'Timeline\n编排', color: '#4f8fff' },
    { n: '6', label: 'Scroll\nObserver', color: '#30d158' },
    { n: '7', label: '完整\n页面', color: '#ff9f0a' },
  ];

  // build vertical list for cleaner layout
  const list = document.createElement('div');
  list.style.cssText = 'display:flex;flex-direction:column;gap:10px;width:280px;';
  area.appendChild(list);

  const stepEls = steps.map((s, i) => {
    const el = document.createElement('div');
    el.style.cssText = `
      display:flex;align-items:center;gap:14px;
      padding:12px 16px;border-radius:10px;
      background:${s.color}10;
      border:0.5px solid ${s.color}30;
      opacity:0;transform:translateX(-24px);
    `;
    el.innerHTML = `
      <div style="width:28px;height:28px;border-radius:50%;background:${s.color}22;border:0.5px solid ${s.color}55;display:flex;align-items:center;justify-content:center;flex-shrink:0;font-family:'JetBrains Mono',monospace;font-size:12px;font-weight:700;color:${s.color}">${s.n}</div>
      <div style="font-size:12px;color:rgba(255,255,255,0.65)">${s.label.replace('\n', ' ')}</div>
    `;
    list.appendChild(el);
    return el;
  });

  // animate in with stagger, then pulse active step
  anime({
    targets: stepEls,
    opacity: [0, 1],
    translateX: [-24, 0],
    delay: anime.stagger(80),
    duration: 500,
    easing: 'easeOutQuad',
    complete: () => {
      let active = 0;
      setInterval(() => {
        anime({ targets: stepEls[active], background: [`${steps[active].color}10`], duration: 300 });
        active = (active + 1) % stepEls.length;
        anime({ targets: stepEls[active], scale: [1, 1.04, 1], duration: 400, easing: 'easeOutSine' });
      }, 700);
    }
  });
};

// ── CH8: Prompt cards ──
window.DEMOS[7] = function() {
  const area = clearStage();
  setDemoLabel('把提示词复制给 AI，直接开始做');
  setChOverlay('Ch.08 · AI提示词');
  area.style.flexDirection = 'column';
  area.style.gap = '16px';

  const preview = document.createElement('div');
  preview.style.cssText = 'width:360px;text-align:left;';
  preview.innerHTML = `
    <div style="font-family:'JetBrains Mono',monospace;font-size:10px;color:rgba(48,209,88,0.7);margin-bottom:10px;letter-spacing:.08em">PROMPT TEMPLATE</div>
    <div style="background:#13161c;border-radius:12px;border:0.5px solid rgba(255,255,255,0.07);padding:18px;opacity:0;" id="prompt-preview">
      <div style="font-family:'JetBrains Mono',monospace;font-size:11px;line-height:1.8;color:rgba(255,255,255,0.5)">
        帮我在现有的 <span style="color:#4f8fff">index.html</span> 基础上<br>
        引入 <span style="color:#30d158">anime.js</span>。<br><br>
        我只需要复制粘贴一个<br>
        完整的 <span style="color:#ff9f0a">index.html</span> 文件。<br><br>
        <span style="color:rgba(255,255,255,0.2)">// 不需要任何其他文件</span><br>
        <span style="color:rgba(255,255,255,0.2)">// 不需要构建工具</span>
      </div>
    </div>
  `;
  area.appendChild(preview);

  const tip = document.createElement('div');
  tip.style.cssText = 'width:360px;opacity:0;';
  tip.innerHTML = `
    <div style="display:flex;gap:10px;padding:14px 16px;background:rgba(79,143,255,0.06);border-radius:10px;border:0.5px solid rgba(79,143,255,0.15);">
      <div style="font-size:18px">💡</div>
      <div style="font-size:12px;color:rgba(255,255,255,0.45);line-height:1.6">
        每次改完都把完整代码贴给 AI，<br>不要只贴一部分
      </div>
    </div>
  `;
  area.appendChild(tip);

  anime.timeline({ easing: 'easeOutQuad' })
    .add({ targets: '#prompt-preview', opacity: [0,1], translateY: [16,0], duration: 600 })
    .add({ targets: tip, opacity: [0,1], translateY: [10,0], duration: 400 }, '-=100');

  // typewriter cursor blink
  const cursor = document.createElement('span');
  cursor.style.cssText = 'display:inline-block;width:2px;height:14px;background:#4f8fff;margin-left:2px;vertical-align:middle;';
  document.querySelector('#prompt-preview div')?.appendChild(cursor);
  anime({ targets: cursor, opacity: [1,0], duration: 600, loop: true, easing: 'steps(1)' });
};

// ── CH9: Trap cards ──
window.DEMOS[8] = function() {
  const area = clearStage();
  setDemoLabel('5 个必踩坑 — 提前知道省一半时间');
  setChOverlay('Ch.09 · 踩坑');
  area.style.flexDirection = 'column';
  area.style.gap = '10px';

  const traps = [
    { n: '坑1', label: 'CDN 未加载', color: '#ff6b6b' },
    { n: '坑2', label: '动画消失不见', color: '#ff9f0a' },
    { n: '坑3', label: 'Stagger 失效', color: '#bf5af2' },
    { n: '坑4', label: '手机不触发', color: '#30d158' },
    { n: '坑5', label: 'AI 越改越乱', color: '#4f8fff' },
  ];

  const cards = traps.map(t => {
    const el = document.createElement('div');
    el.style.cssText = `
      display:flex;align-items:center;gap:12px;
      padding:12px 18px;width:280px;
      border-radius:10px;
      background:${t.color}10;
      border-left:2px solid ${t.color};
      opacity:0;transform:translateX(20px);
    `;
    el.innerHTML = `
      <div style="font-family:'JetBrains Mono',monospace;font-size:10px;color:${t.color};width:32px;flex-shrink:0">${t.n}</div>
      <div style="font-size:13px;color:rgba(255,255,255,0.6)">${t.label}</div>
      <div style="margin-left:auto;font-size:10px;color:rgba(255,255,255,0.2);font-family:'JetBrains Mono',monospace">→ 有修复</div>
    `;
    area.appendChild(el);
    return el;
  });

  anime({
    targets: cards,
    opacity: [0, 1],
    translateX: [20, 0],
    delay: anime.stagger(100),
    duration: 500,
    easing: 'easeOutQuad'
  });
};
