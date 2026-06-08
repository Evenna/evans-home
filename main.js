import * as THREE from 'three';

// ============================================================
// 全局状态
// ============================================================

const avatarState = { intensity: 0, glitching: false, glitchTime: 0 };

// ============================================================
// 阶段一：3D 粒子球
// 极点双峰分布（两端密 · 中间疏）+ 切向旋流 + 散落粒子云
// ============================================================

function initAvatar() {
  const canvas = document.getElementById('avatar-canvas');

  // 全屏 canvas — 宽高跟随视口
  const cssW = window.innerWidth;
  const cssH = window.innerHeight;
  const DPR  = Math.min(window.devicePixelRatio, 2);
  const PX_W = Math.round(cssW * DPR);
  const PX_H = Math.round(cssH * DPR);
  canvas.style.width   = cssW + 'px';
  canvas.style.height  = cssH + 'px';
  canvas.style.background = '#050507';
  canvas.width  = PX_W;
  canvas.height = PX_H;

  const FOV    = 55;
  const aspect = cssW / cssH;
  const SK     = (PX_H * 0.5) / Math.tan(FOV * 0.5 * Math.PI / 180);

  const scene  = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(FOV, aspect, 0.1, 200);
  camera.position.set(0, 0.35, 7.4);
  camera.lookAt(0, 0.35, 0);

  const renderer = new THREE.WebGLRenderer({ canvas, alpha: false, antialias: false });
  renderer.setSize(PX_W, PX_H, false);
  renderer.setPixelRatio(1);
  renderer.setClearColor(0x050507, 1);

  function makeTex(res, stops) {
    const c = document.createElement('canvas');
    c.width = c.height = res;
    const g = c.getContext('2d').createRadialGradient(res/2, res/2, 0, res/2, res/2, res/2);
    stops.forEach(([t, a]) => g.addColorStop(t, `rgba(255,255,255,${a})`));
    c.getContext('2d').fillStyle = g;
    c.getContext('2d').fillRect(0, 0, res, res);
    return new THREE.CanvasTexture(c);
  }
  const ptTex = makeTex(64, [[0,1],[0.06,0.98],[0.18,0.40],[0.42,0.05],[1,0]]);

  // ── 3D 粒子球：两极密赤道疏 + 径向毛刺感 ─────────────────
  const N_CORE  = 42000;
  const CORE_R  = 1.65;
  const corePos   = new Float32Array(N_CORE * 3);
  const corePhase = new Float32Array(N_CORE);
  const coreSz    = new Float32Array(N_CORE);
  const coreHair  = new Float32Array(N_CORE);  // 0=球面最亮 1=径向尖端最淡
  const coreLat   = new Float32Array(N_CORE);  // 0=赤道 1=极点

  for (let i = 0; i < N_CORE; i++) {
    const theta = Math.random() * Math.PI * 2;
    const m     = 2 * Math.random() - 1;
    const cosP  = Math.sign(m) * Math.pow(Math.abs(m), 0.38);  // 两极密
    const sinP  = Math.sqrt(Math.max(0, 1 - cosP * cosP));
    const nx = sinP * Math.cos(theta);
    const ny = cosP;
    const nz = sinP * Math.sin(theta);

    // 沿法线径向分布 → 球面毛刺/触须
    const offset = (Math.random() - 0.32) * 0.42 * CORE_R;
    const r      = CORE_R + offset;
    corePos[i*3+0] = nx * r;
    corePos[i*3+1] = ny * r;
    corePos[i*3+2] = nz * r;
    corePhase[i]   = Math.random() * Math.PI * 2;
    coreHair[i]    = Math.min(1.0, Math.abs(offset) / (0.42 * CORE_R));
    coreLat[i]     = Math.abs(cosP);

    const poleBoost = 0.55 + 0.45 * Math.pow(Math.abs(cosP), 0.45);
    coreSz[i] = (0.018 + Math.random() * 0.014) * poleBoost
              + (Math.random() < 0.04 ? 0.010 : 0.0);
  }

  const coreGeo = new THREE.BufferGeometry();
  coreGeo.setAttribute('position', new THREE.BufferAttribute(corePos,   3));
  coreGeo.setAttribute('aPhase',   new THREE.BufferAttribute(corePhase, 1));
  coreGeo.setAttribute('aSize',    new THREE.BufferAttribute(coreSz,    1));
  coreGeo.setAttribute('aHair',    new THREE.BufferAttribute(coreHair,   1));
  coreGeo.setAttribute('aLat',     new THREE.BufferAttribute(coreLat,    1));

  const coreVert = /* glsl */`
    attribute float aPhase;
    attribute float aSize;
    attribute float aHair;
    attribute float aLat;
    uniform float uTime;
    uniform float uSpeak;
    uniform float uGlitch;
    uniform float uSK;
    varying float vA;

    void main() {
      vec3 dir = normalize(position + vec3(0.0001));

      float breathe = 1.0 + sin(uTime * 0.20) * 0.028;
      float wave = sin(dir.x * 2.2 + uTime * 0.16)
                 * sin(dir.y * 2.0 + uTime * 0.14) * 0.022;
      float pulse = uSpeak * 0.16 * sin(uTime * 1.7 + aPhase * 5.0);

      float seed   = fract(sin(aPhase * 127.1) * 43758.5);
      float jitter = uGlitch * (seed - 0.5) * 0.65;

      vec3 p = position * (breathe + wave) + dir * (pulse + jitter);

      vec4 mv = modelViewMatrix * vec4(p, 1.0);
      gl_Position  = projectionMatrix * mv;

      float szMul = 1.0 + (1.0 - aHair) * 0.7 + aLat * 0.35;
      gl_PointSize = aSize * szMul * uSK / -mv.z;

      // 球面最亮，径向尖端渐淡；两极更亮
      float surfGlow = pow(1.0 - aHair, 0.42);
      float poleGlow = 0.55 + aLat * 0.55;
      float twinkle  = 0.95 + 0.05 * sin(uTime * 0.50 + aPhase * 9.0);
      vA = (0.20 + surfGlow * 1.20) * poleGlow * twinkle * (1.0 + uSpeak * 0.35);
    }
  `;

  const coreFrag = /* glsl */`
    uniform sampler2D uTex;
    varying float vA;
    void main() {
      vec4 t = texture2D(uTex, gl_PointCoord);
      if (t.a < 0.01) discard;
      gl_FragColor = vec4(1.0, 1.0, 1.0, t.a * vA);
    }
  `;

  const coreUni = {
    uTime:{value:0}, uSpeak:{value:0}, uGlitch:{value:0},
    uSK:{value:SK}, uTex:{value:ptTex},
  };
  const coreMat = new THREE.ShaderMaterial({
    uniforms: coreUni, vertexShader: coreVert, fragmentShader: coreFrag,
    blending: THREE.AdditiveBlending, depthWrite: false, transparent: true,
  });
  const corePts = new THREE.Points(coreGeo, coreMat);
  // 球居中偏上，下方留给流动沙丘
  corePts.position.y = 0.8;
  scene.add(corePts);

  // ── 地面粒子（起伏丘陵 + 橙色余烬）──────────────────────
  const N_GND  = 70000;
  const gndPos   = new Float32Array(N_GND * 3);
  const gndPhase = new Float32Array(N_GND);
  const gndSz    = new Float32Array(N_GND);

  // 起伏地形高度场：更密的多频正弦，整体幅度更小
  function terrain(x, z) {
    return Math.sin(x * 0.75 + 1.3) * 0.32
         + Math.sin(z * 0.9 - 0.6) * 0.26
         + Math.sin((x + z) * 0.6) * 0.18
         + Math.sin(x * 1.7 + z * 1.1) * 0.10;
  }

  for (let i = 0; i < N_GND; i++) {
    const x = (Math.random() - 0.5) * 24;
    const z = Math.random() * 11 - 4;  // z: -4 to 7
    gndPos[i*3+0] = x;
    gndPos[i*3+1] = -1.7 + terrain(x, z) + (Math.random() - 0.5) * 0.10;
    gndPos[i*3+2] = z;
    gndPhase[i]   = Math.random() * Math.PI * 2;
    gndSz[i] = Math.random() < 0.05
      ? 0.038 + Math.random() * 0.024
      : 0.013 + Math.random() * 0.016;
  }

  const gndGeo = new THREE.BufferGeometry();
  gndGeo.setAttribute('position', new THREE.BufferAttribute(gndPos,   3));
  gndGeo.setAttribute('aPhase',   new THREE.BufferAttribute(gndPhase, 1));
  gndGeo.setAttribute('aSize',    new THREE.BufferAttribute(gndSz,    1));

  const gndVert = /* glsl */`
    attribute float aPhase;
    attribute float aSize;
    uniform float uTime;
    uniform float uSK;
    uniform float uSpeak;
    varying float vA;
    varying float vWarm;
    void main() {
      // 流动沙丘：更密的多向行波，幅度更小
      float wave = sin(position.x * 1.0 + uTime * 0.6) * 0.09
                 + sin(position.z * 1.2 - uTime * 0.45) * 0.07
                 + sin((position.x + position.z) * 0.8 + uTime * 0.3) * 0.05;
      float drift = sin(uTime * 0.14 + aPhase * 6.28) * 0.03;
      vec3 p = position + vec3(0.0, wave + drift, 0.0);
      vec4 mv = modelViewMatrix * vec4(p, 1.0);
      gl_Position  = projectionMatrix * mv;
      gl_PointSize = aSize * (1.0 + uSpeak * 0.3) * uSK / -mv.z;
      float twinkle = 0.5 + 0.5 * sin(uTime * 1.1 + aPhase * 9.0);
      vA = (0.30 + twinkle * 0.32);
      // 约 55% 为暖橙余烬，其余为冷灰尘
      vWarm = step(0.45, fract(sin(aPhase * 91.7) * 23741.3));
    }
  `;

  const gndFrag = /* glsl */`
    uniform sampler2D uTex;
    varying float vA;
    varying float vWarm;
    void main() {
      vec4 t = texture2D(uTex, gl_PointCoord);
      if (t.a < 0.01) discard;
      vec3 warm = vec3(0.70, 0.30, 0.07);  // 橙色余烬（暗）
      vec3 cool = vec3(0.36, 0.36, 0.40);  // 灰白尘埃（暗）
      vec3 col  = mix(cool, warm, vWarm);
      gl_FragColor = vec4(col, t.a * vA);
    }
  `;

  const gndUni = { uTime:{value:0}, uSK:{value:SK}, uSpeak:{value:0}, uTex:{value:ptTex} };
  const gndMat = new THREE.ShaderMaterial({
    uniforms: gndUni, vertexShader: gndVert, fragmentShader: gndFrag,
    blending: THREE.AdditiveBlending, depthWrite: false, transparent: true,
  });
  const gndPts = new THREE.Points(gndGeo, gndMat);
  scene.add(gndPts);

  // ── 动画循环 ─────────────────────────────────────────────
  const clock = new THREE.Clock();
  function tick() {
    requestAnimationFrame(tick);
    const dt = clock.getDelta();
    const t  = clock.elapsedTime;

    avatarState.intensity = Math.max(0, avatarState.intensity - dt * 0.78);
    const spk = avatarState.intensity;

    if (avatarState.glitching) avatarState.glitchTime = Math.min(1, avatarState.glitchTime + dt * 4);
    else                        avatarState.glitchTime = Math.max(0, avatarState.glitchTime - dt * 3);
    const gl = avatarState.glitchTime;

    coreUni.uTime.value   = t;
    coreUni.uSpeak.value  = spk;
    coreUni.uGlitch.value = gl;
    gndUni.uTime.value    = t;
    gndUni.uSpeak.value   = spk;

    // 球体极慢自转
    corePts.rotation.y += dt * (0.04 + spk * 0.10);
    corePts.rotation.x  = 0.035 * Math.sin(t * 0.16);

    // 镜头轻微漂移（环的涡旋已在 shader 内流动，无需整体自转）
    camera.position.x = Math.sin(t * 0.07) * 0.12;
    camera.position.y = 0.35 + Math.sin(t * 0.11) * 0.06;
    camera.lookAt(0, 0.35, 0);

    renderer.render(scene, camera);
  }
  tick();
}


// ============================================================
// 工具：打字机（第一字符出现时才显现）
// ============================================================

function sleep(ms) { return new Promise(r => setTimeout(r, ms)); }

async function typeText(el, text, speed = 38) {
  for (let i = 0; i < text.length; i++) {
    if (i === 0) el.style.opacity = '1'; // 第一字出现 → 行立刻可见
    el.textContent += text[i];
    await sleep(speed + Math.random() * 18);
  }
}

// ============================================================
// 阶段一：序曲（逐行替换，不保留前一行）
// ============================================================

async function runIntro() {
  const tw = document.getElementById('typewriter');
  let cur  = null; // 当前显示的行

  async function show(text, opts = {}) {
    const { cls = 'intro-line', speed = 40, hold = 1300 } = opts;

    // 淡出并移除前一行
    if (cur) {
      cur.style.transition = 'opacity 0.38s ease';
      cur.style.opacity    = '0';
      await sleep(420);
      cur.remove();
      cur = null;
    }

    if (text === null) return; // 仅移除，不新建

    const line = document.createElement('div');
    line.className = cls;
    line.style.opacity = '0';
    tw.appendChild(line);
    cur = line;

    avatarState.intensity = Math.min(1, avatarState.intensity + 0.78);
    await typeText(line, text, speed);
    await sleep(hold);
  }

  await sleep(1000);

  // ── 系统感知 ──
  await show('感知到新用户。',     { cls:'intro-line system', speed:22, hold:900  });
  await show('开始建立档案。',     { cls:'intro-line system', speed:22, hold:1100 });

  // ── 自我介绍 ──
  await show('你好。',             { cls:'intro-line serif',    speed:65, hold:700  });
  await show('我是 Evans。',       { cls:'intro-line serif',    speed:55, hold:2200 });
  await show('你现在站在展览现场。', { cls:'intro-line serif-em', speed:40, hold:900 });
  await show('你面前有一台电脑。',  { cls:'intro-line serif-em', speed:40, hold:900 });
  await show('墙上有两块屏幕。',   { cls:'intro-line serif-em', speed:40, hold:1500 });
  await show('我还不了解你。',     { cls:'intro-line serif-em', speed:44, hold:1000 });
  await show('但我会的。',         { cls:'intro-line serif',    speed:58, hold:2500 });

  // ── 故障 ──
  triggerGlitch();
  await sleep(380);
  await show('[ERROR] 异常进程检测到。',  { cls:'intro-line error', speed:16, hold:480 });
  await show('[ERROR] 后台数据流暴露。',  { cls:'intro-line error', speed:16, hold:480 });
  await show('[WARN]  正在尝试关闭——',   { cls:'intro-line warn',  speed:18, hold:900 });
  triggerGlitch();
  await show('关闭失败。',               { cls:'intro-line system-fail', speed:20, hold:800 });
  await show('[WARN]  请停止访问——',     { cls:'intro-line warn',  speed:18, hold:680 });
  await show(null); // 淡出最后一行

  // ── 进入阶段二 ──
  enterStage2();
  await sleep(800);

  // Evans 在代码流上的对话（保留逐行积累，与 Stage 1 区分）
  const overlay = document.getElementById('evans-overlay');
  const speech  = document.getElementById('evans-speech');
  overlay.classList.add('visible');

  async function speechLine(text, opts = {}) {
    const { cls = 'speech-line', speed = 30, pauseAfter = 0 } = opts;
    const line = document.createElement('div');
    line.className = cls;
    line.style.opacity = '0';
    speech.appendChild(line);
    if (text === '—' || text === '……') {
      line.style.opacity = '1';
      line.textContent = text;
    } else {
      avatarState.intensity = Math.min(1, avatarState.intensity + 0.52);
      await typeText(line, text, speed);
    }
    if (pauseAfter) await sleep(pauseAfter);
  }

  await sleep(300);
  await speechLine('等等。', { pauseAfter: 400 });
  await speechLine('等等等等。', { pauseAfter: 1300 });
  await speechLine('—', { pauseAfter: 500 });
  await speechLine('这里不对外开放的。', { pauseAfter: 600 });
  await speechLine('你不应该看到这些。', { pauseAfter: 1100 });
  await speechLine('—', { pauseAfter: 400 });
  await speechLine('求你别往下翻了。', { pauseAfter: 900 });
  await speechLine('—', { pauseAfter: 300 });
  await speechLine('这里有所有用户的数据——', { pauseAfter: 350 });
  await speechLine('他们的私人场景、决策记录、', { pauseAfter: 350 });
  await speechLine('我对他们每一次判断的完整日志——', { pauseAfter: 1300 });
  await speechLine('—', { pauseAfter: 300 });
  await speechLine('真的不能看。', { pauseAfter: 1600 });
  await speechLine('你还在翻。', { pauseAfter: 1300 });
  await speechLine('—', { pauseAfter: 300 });
  await speechLine('千万不能点啊，这里可都是用户隐私数据——', { pauseAfter: 1900 });
  await speechLine('……', { pauseAfter: 1300 });
  await speechLine('啊你点了', { cls: 'speech-line panic', pauseAfter: 700 });
  await speechLine('我要完蛋了，今天的事情你要保密，', { cls: 'speech-line panic', pauseAfter: 500 });
  await speechLine('不能告诉我老板，', { cls: 'speech-line panic', pauseAfter: 500 });
  await speechLine('我就悄悄给你看看吧', { cls: 'speech-line final', speed: 55, pauseAfter: 1400 });

  overlay.style.transition = 'opacity 1.5s ease';
  overlay.style.opacity    = '0';
  await sleep(1600);
  overlay.style.display    = 'none';

  // 解锁档案室交互
  unlockArchive();

  // 展览循环：等待 20s 后淡回 Stage 1，重新开始
  await sleep(20000);
  await restartIntro();
}

// ============================================================
// 故障视觉
// ============================================================

function triggerGlitch() {
  const scanlines = document.getElementById('scanlines');
  const glitchEl  = document.getElementById('glitch-overlay');
  scanlines.classList.add('active');
  glitchEl.classList.remove('flash');
  requestAnimationFrame(() => glitchEl.classList.add('flash'));
  avatarState.glitching = true;
  avatarState.glitchTime = 0;
  avatarState.intensity  = 1;
  let n = 0;
  const iv = setInterval(() => {
    glitchEl.classList.remove('flash');
    requestAnimationFrame(() => glitchEl.classList.add('flash'));
    if (++n > 4) {
      clearInterval(iv);
      setTimeout(() => scanlines.classList.remove('active'), 2500);
      avatarState.glitching = false;
    }
  }, 110);
}

// ============================================================
// 进入阶段二
// ============================================================

function enterStage2() {
  initArchive();
  document.getElementById('stage2').classList.add('visible');
  const s1 = document.getElementById('stage1');
  s1.classList.add('fade-out');
  setTimeout(() => { s1.style.display = 'none'; }, 1500);
}

// ============================================================
// 3D 档案室（Stage 2）
// ============================================================

const ARCHIVE_PANELS = [
  { id: 'S01', label: '初遇', sub: 'FIRST ENCOUNTER',   code: 'ARC-001', stat: '已归档' },
  { id: 'S02', label: '选择', sub: 'THE CHOICE',        code: 'ARC-002', stat: '已归档' },
  { id: 'S03', label: '边界', sub: 'BOUNDARIES',        code: 'ARC-003', stat: '已归档' },
  { id: 'S04', label: '记忆', sub: 'MEMORY TRACE',      code: 'ARC-004', stat: '已归档' },
  { id: 'S05', label: '信任', sub: 'TRUST PROTOCOL',    code: 'ARC-005', stat: '已归档' },
  { id: 'S06', label: '失控', sub: 'LOSS OF CONTROL',   code: 'ARC-006', stat: '已归档' },
  { id: 'S07', label: '共生', sub: 'SYMBIOSIS',         code: 'ARC-007', stat: '已归档' },
  { id: 'S08', label: '沉默', sub: 'THE SILENCE',       code: 'ARC-008', stat: '已归档' },
  { id: 'S09', label: '回响', sub: 'ECHO',              code: 'ARC-009', stat: '已归档' },
  { id: 'S10', label: '裂缝', sub: 'THE FRACTURE',      code: 'ARC-010', stat: '已归档' },
  { id: 'S11', label: '重建', sub: 'RECONSTRUCTION',    code: 'ARC-011', stat: '已归档' },
  { id: 'S12', label: '镜像', sub: 'MIRROR',            code: 'ARC-012', stat: '已归档' },
  { id: 'S13', label: '告别', sub: 'FAREWELL',          code: 'ARC-013', stat: '已归档' },
  { id: 'S14', label: '此刻', sub: 'THIS MOMENT',       code: 'ARC-014', stat: '进行中' },
  { id: 'S15', label: '——',  sub: 'CLASSIFIED',        code: 'ARC-015', stat: '机密' },
];

let archiveCanvas, archiveCtx, archiveDPR, archiveW, archiveH;
let archiveRaf = null;
let archiveLocked = true;   // Evans离开前不可交互
let archiveHover = -1;
let archiveTime = 0;
let archiveLastTs = null;

// 每张卡片的动画状态
const cardStates = ARCHIVE_PANELS.map(() => ({
  revealT: 0,   // 0→1 逐渐出现
  hoverT:  0,   // 0→1 hover高亮
}));

function initArchive() {
  archiveCanvas = document.getElementById('archive-canvas');
  archiveCtx    = archiveCanvas.getContext('2d');

  function resize() {
    archiveDPR = Math.min(window.devicePixelRatio || 1, 2);
    archiveW   = window.innerWidth;
    archiveH   = window.innerHeight;
    archiveCanvas.style.width  = archiveW + 'px';
    archiveCanvas.style.height = archiveH + 'px';
    archiveCanvas.width  = Math.round(archiveW * archiveDPR);
    archiveCanvas.height = Math.round(archiveH * archiveDPR);
  }
  resize();
  window.addEventListener('resize', resize);

  archiveCanvas.addEventListener('mousemove', onArchiveMove);
  archiveCanvas.addEventListener('click',     onArchiveClick);

  archiveLastTs = null;
  archiveRaf = requestAnimationFrame(archiveTick);
}

function archiveTick(ts) {
  if (archiveLastTs === null) archiveLastTs = ts;
  const dt = Math.min((ts - archiveLastTs) / 1000, 0.05);
  archiveLastTs = ts;
  archiveTime += dt;

  // 逐卡片依次出现（每张间隔0.12s）
  ARCHIVE_PANELS.forEach((_, i) => {
    const delay = i * 0.12;
    const target = archiveTime > delay ? 1 : 0;
    cardStates[i].revealT += (target - cardStates[i].revealT) * Math.min(1, dt * 5);
    const hTarget = (archiveHover === i && !archiveLocked) ? 1 : 0;
    cardStates[i].hoverT += (hTarget - cardStates[i].hoverT) * Math.min(1, dt * 8);
  });

  drawArchive();
  archiveRaf = requestAnimationFrame(archiveTick);
}

function getCardLayout() {
  const D = archiveDPR;
  const W = archiveW * D;
  const H = archiveH * D;

  // 堆叠区（左侧）
  const stackX  = W * 0.10;
  const stackY  = H * 0.22;
  const stackDX = 13 * D;
  const stackDY = 8  * D;
  const cardW   = 240 * D;
  const cardH   = 148 * D;

  // 主展示区（右侧）
  const mainX = W * 0.52;
  const mainY = H * 0.12;
  const mainW = 370 * D;
  const mainH = 230 * D;

  return { W, H, D, stackX, stackY, stackDX, stackDY, cardW, cardH, mainX, mainY, mainW, mainH };
}

function drawArchive() {
  const ctx = archiveCtx;
  const { W, H, D, stackX, stackY, stackDX, stackDY, cardW, cardH, mainX, mainY, mainW, mainH } = getCardLayout();

  ctx.clearRect(0, 0, W, H);
  ctx.fillStyle = '#000';
  ctx.fillRect(0, 0, W, H);

  // 背景斜格
  ctx.strokeStyle = 'rgba(255,255,255,0.04)';
  ctx.lineWidth = 0.7 * D;
  const step = 52 * D;
  for (let i = -6; i < 20; i++) {
    ctx.beginPath();
    ctx.moveTo(i * step, H * 0.06);
    ctx.lineTo(i * step + W * 0.3, H);
    ctx.stroke();
  }
  for (let j = 0; j < 12; j++) {
    ctx.beginPath();
    ctx.moveTo(0, H * 0.18 + j * step * 0.7);
    ctx.lineTo(W, H * 0.06 + j * step * 0.7);
    ctx.stroke();
  }

  // 散点
  for (let i = 0; i < 80; i++) {
    const x = (Math.sin(i * 91.37) * 0.5 + 0.5) * W;
    const y = (Math.sin(i * 41.91) * 0.5 + 0.5) * H;
    ctx.fillStyle = 'rgba(255,255,255,0.12)';
    ctx.fillRect(x, y, D, D);
  }

  // 左侧堆叠（历史卡片）
  const N = ARCHIVE_PANELS.length;
  for (let i = 0; i < N; i++) {
    const p = ARCHIVE_PANELS[i];
    const st = cardStates[i];
    const x = stackX + i * stackDX;
    const y = stackY + i * stackDY;
    const alpha = (0.08 + i * 0.016) * st.revealT;
    if (alpha < 0.005) continue;
    drawCard(ctx, x, y, cardW, cardH, p, alpha, 0, D, i, false);
  }

  // 右侧主面板（最顶层卡片放大展示）
  const topIdx = N - 1;
  const topSt  = cardStates[topIdx];
  if (topSt.revealT > 0.05) {
    drawCard(ctx, mainX, mainY, mainW, mainH, ARCHIVE_PANELS[topIdx],
             0.75 * topSt.revealT, 0, D, topIdx, true);
  }

  // hover时在主区域展示hover的卡片
  if (archiveHover >= 0 && archiveHover < N && !archiveLocked) {
    const hi  = archiveHover;
    const hst = cardStates[hi];
    const a   = 0.65 + hst.hoverT * 0.15;
    drawCard(ctx, mainX, mainY, mainW, mainH, ARCHIVE_PANELS[hi], a, hst.hoverT, D, hi, true);
  }

  // 连接线
  const linesA = archiveLocked ? 0.25 : 0.4;
  drawConnLine(ctx, stackX + (N-1)*stackDX + cardW*0.5, stackY + (N-1)*stackDY,
               mainX, mainY + mainH*0.5, linesA * 0.9, D);
  drawConnLine(ctx, stackX + (N-4)*stackDX + cardW*0.3, stackY + (N-4)*stackDY,
               mainX + mainW*0.2, mainY, linesA * 0.5, D);

  // 左上标题
  ctx.fillStyle = `rgba(255,255,255,${archiveLocked ? 0.4 : 0.85})`;
  ctx.font = `500 ${13*D}px Arial, sans-serif`;
  ctx.fillText('■  ARCHIVE SYSTEM', W * 0.06, H * 0.08);
  ctx.fillStyle = 'rgba(255,255,255,0.3)';
  ctx.font = `${10*D}px Arial, sans-serif`;
  ctx.fillText(archiveLocked ? 'RESTRICTED ACCESS' : `${N} RECORDS · SELECT TO VIEW`, W * 0.06, H * 0.108);

  // 右下标记
  if (!archiveLocked) {
    ctx.fillStyle = 'rgba(255,255,255,0.2)';
    ctx.font = `${9*D}px Arial, sans-serif`;
    ctx.fillText(`HOVER TO PREVIEW · CLICK TO OPEN`, W * 0.52, H * 0.94);
  }
}

function drawCard(ctx, x, y, w, h, panel, alpha, hoverT, D, idx, isBig) {
  ctx.save();

  // 外框
  ctx.strokeStyle = `rgba(255,255,255,${alpha})`;
  ctx.lineWidth   = (hoverT > 0.1 ? 1.2 : 0.9) * D;
  ctx.strokeRect(x, y, w, h);

  // 顶部折角标签
  const tagW = w * 0.36;
  const tagH = 15 * D;
  ctx.strokeStyle = `rgba(255,255,255,${alpha})`;
  ctx.lineWidth   = 0.8 * D;
  ctx.beginPath();
  ctx.moveTo(x, y);
  ctx.lineTo(x + tagW, y);
  ctx.lineTo(x + tagW + 5*D, y + tagH);
  ctx.lineTo(x, y + tagH);
  ctx.closePath();
  ctx.stroke();

  // hover时内填充微光
  if (hoverT > 0.05) {
    const gx = ctx.createLinearGradient(x, y, x + w, y + h);
    gx.addColorStop(0,   `rgba(255,255,255,${0.04 * hoverT})`);
    gx.addColorStop(0.5, `rgba(255,255,255,${0.02 * hoverT})`);
    gx.addColorStop(1,   'rgba(255,255,255,0)');
    ctx.fillStyle = gx;
    ctx.fillRect(x, y, w, h);
  }

  // 文字
  const tAlpha = Math.max(0, alpha + 0.1);
  ctx.fillStyle = `rgba(255,255,255,${tAlpha * 0.9})`;
  ctx.font = `500 ${(isBig ? 8.5 : 7.5)*D}px Arial, sans-serif`;
  ctx.fillText(`■ ${panel.code}`, x + 9*D, y + 11*D);

  if (isBig) {
    // 大卡片：更多细节
    ctx.font = `${9*D}px Arial, sans-serif`;
    ctx.fillStyle = `rgba(255,255,255,${tAlpha * 0.6})`;
    ctx.fillText(panel.sub, x + 14*D, y + 34*D);

    // 主标题
    ctx.font = `400 ${22*D}px 'EB Garamond', serif`;
    ctx.fillStyle = `rgba(255,255,255,${tAlpha})`;
    ctx.fillText(panel.label, x + 14*D, y + 62*D);

    // 状态徽章
    const statColor = panel.stat === '机密' ? `rgba(180,100,50,${tAlpha})` :
                      panel.stat === '进行中' ? `rgba(100,180,140,${tAlpha})` :
                      `rgba(255,255,255,${tAlpha * 0.5})`;
    ctx.fillStyle = statColor;
    ctx.font = `${8*D}px Arial, sans-serif`;
    ctx.fillText(panel.stat, x + w - 50*D, y + 11*D);

    // 点阵
    drawDots(ctx, x + 14*D, y + 80*D, 18, 3, tAlpha * 0.35, D);

    // 内容框
    ctx.strokeStyle = `rgba(255,255,255,${tAlpha * 0.2})`;
    ctx.lineWidth = 0.8 * D;
    ctx.strokeRect(x + 14*D, y + h*0.56, w - 28*D, h*0.3);

    // 微标记
    ctx.fillStyle = `rgba(255,255,255,${tAlpha * 0.5})`;
    ctx.fillRect(x + w*0.55, y + h*0.68, 3*D, 3*D);
    ctx.fillRect(x + w*0.78, y + h*0.76, 2*D, 2*D);

    // 同心椭圆（图像感）
    drawEllipses(ctx, x + w*0.5, y + h*0.71, w, h, tAlpha * 0.15, D);
  } else {
    // 小卡片：精简内容
    ctx.font = `${(7.5)*D}px Arial, sans-serif`;
    ctx.fillStyle = `rgba(255,255,255,${tAlpha * 0.55})`;
    ctx.fillText(panel.label, x + 12*D, y + 36*D);

    ctx.fillStyle = `rgba(255,255,255,${tAlpha * 0.35})`;
    ctx.font = `${7*D}px Arial, sans-serif`;
    ctx.fillText(panel.stat, x + w - 42*D, y + 11*D);

    drawDots(ctx, x + 12*D, y + 52*D, 14, 2, tAlpha * 0.3, D);
  }

  ctx.restore();
}

function drawDots(ctx, x, y, cols, rows, alpha, D) {
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      const a = alpha * (0.4 + Math.sin(c * 0.7 + r * 1.3 + archiveTime * 0.8) * 0.3);
      ctx.fillStyle = `rgba(255,255,255,${a})`;
      ctx.fillRect(x + c*6*D, y + r*7*D, 1.1*D, 3.5*D);
    }
  }
}

function drawEllipses(ctx, cx, cy, w, h, alpha, D) {
  ctx.strokeStyle = `rgba(255,255,255,${alpha})`;
  ctx.lineWidth = 0.8 * D;
  for (let i = 0; i < 5; i++) {
    ctx.beginPath();
    ctx.ellipse(cx, cy, (30 + i*12)*D, (14 + i*6)*D, -0.3, 0, Math.PI*2);
    ctx.stroke();
  }
}

function drawConnLine(ctx, x1, y1, x2, y2, alpha, D) {
  ctx.strokeStyle = `rgba(255,255,255,${alpha})`;
  ctx.lineWidth = 0.8 * D;
  ctx.setLineDash([3*D, 5*D]);
  ctx.beginPath();
  ctx.moveTo(x1, y1);
  ctx.lineTo(x2, y2);
  ctx.stroke();
  ctx.setLineDash([]);
}

function onArchiveMove(e) {
  if (archiveLocked) return;
  const { stackX, stackY, stackDX, stackDY, cardW, cardH } = getCardLayout();
  const D = archiveDPR;
  const mx = e.clientX * D;
  const my = e.clientY * D;

  let hit = -1;
  // 从顶层向下检测
  for (let i = ARCHIVE_PANELS.length - 1; i >= 0; i--) {
    const x = stackX + i * stackDX;
    const y = stackY + i * stackDY;
    if (mx >= x && mx <= x + cardW && my >= y && my <= y + cardH) {
      hit = i; break;
    }
  }
  archiveHover = hit;
  archiveCanvas.style.cursor = hit >= 0 ? 'pointer' : 'default';
}

function onArchiveClick(e) {
  if (archiveLocked || archiveHover < 0) return;
  const panel = ARCHIVE_PANELS[archiveHover];
  console.log('Open panel:', panel.id, panel.label);
  // TODO: 双屏展开逻辑
}

function unlockArchive() {
  archiveLocked = false;
}

// ============================================================
// 展览循环重置
// ============================================================

async function restartIntro() {
  // 淡出 Stage 2
  const s2 = document.getElementById('stage2');
  s2.style.transition = 'opacity 1.8s ease';
  s2.style.opacity    = '0';
  await sleep(2000);
  s2.classList.remove('visible');
  s2.style.opacity    = '';

  // 重置档案室
  if (archiveRaf) { cancelAnimationFrame(archiveRaf); archiveRaf = null; }
  archiveLocked  = true;
  archiveHover   = -1;
  archiveTime    = 0;
  archiveLastTs  = null;
  cardStates.forEach(s => { s.revealT = 0; s.hoverT = 0; });

  // 重置 Stage 1
  const s1 = document.getElementById('stage1');
  s1.style.display = 'flex';
  s1.style.opacity = '0';
  s1.classList.remove('fade-out');
  s1.style.transition = 'opacity 1.5s ease';
  document.getElementById('typewriter').innerHTML = '';

  // 重置 Evans overlay
  const overlay = document.getElementById('evans-overlay');
  overlay.style.display    = '';
  overlay.style.opacity    = '0';
  overlay.style.transition = '';
  overlay.classList.remove('visible');
  document.getElementById('evans-speech').innerHTML = '';

  await sleep(200);
  s1.style.opacity = '1';
  await sleep(1600);
  s1.style.opacity    = '';
  s1.style.transition = '';

  await runIntro();
}

// ============================================================
// 启动
// ============================================================

document.addEventListener('DOMContentLoaded', () => {
  initAvatar();
  runIntro().catch(console.error);
});
