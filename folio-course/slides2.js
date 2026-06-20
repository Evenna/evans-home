/* ─── slides2.js  (slides 6–11) ─── */

/* ══════════════════════════════════════════
   6 · 区域设计 + 等距相机
══════════════════════════════════════════ */
s('areas', el => {
  el.innerHTML = `
  <div class="inner wide">
    <div class="tag green anim">第六章 · 场景设计</div>
    <h2 class="section-title anim">把「作品集」做成<em>一张地图</em></h2>
    <div class="two-col anim" style="gap:32px">
      <div>
        <p class="sub" style="margin-bottom:20px">整个世界分成五个区域，像城市街区一样排布。相机用<strong style="color:var(--txt)">等距视角</strong>（不是透视），从斜上方45°俯视，像经典城市建设游戏一样。</p>
        <div style="background:var(--card);border:1px solid var(--border);border-radius:var(--r);padding:20px;margin-bottom:16px;font-family:var(--mono);font-size:13px;line-height:2">
          <div style="color:var(--txt3);margin-bottom:8px;font-size:11px;text-transform:uppercase;letter-spacing:.06em">世界地图（坐标概念图）</div>
          <div style="display:grid;grid-template-columns:1fr 1fr;gap:2px">
            ${[
              ['Intro 区', '(0, 0)', 'accent', '起点，落地动画在这里'],
              ['Crossroads 十字口', '(0, −30)', 'txt2', '通往各区的交叉点'],
              ['Projects 项目展示', '(30, −30)', 'green', '所有作品陈列在这里'],
              ['Information 个人信息', '(1, −55)', 'purple', '简历、联系方式'],
              ['Playground 游乐场', '(−38, −34)', 'orange', '纯玩的互动区域'],
            ].map(([name, coord, color, desc]) => `
              <div style="padding:8px 10px;background:rgba(255,255,255,.03);border-radius:6px;border:1px solid var(--border)">
                <div style="font-size:12px;font-weight:600;color:var(--${color});margin-bottom:2px">${name}</div>
                <div style="font-size:10px;color:var(--txt3)">${coord} · ${desc}</div>
              </div>
            `).join('')}
          </div>
        </div>
        <div class="callout" style="margin-bottom:12px">
          <strong style="color:var(--txt)">等距相机是什么？</strong><br>
          正常3D是透视相机（近大远小），等距相机（OrthographicCamera）是平行投影，没有近大远小，看起来像 Q 版游戏。跟随小车时，用缓动追踪而不是直接跟上，所以相机有点「懒」的感觉。
        </div>
      </div>
      <div>
        <div class="code anim" style="margin-bottom:14px"><span class="c">// 等距相机缓动跟随</span>
<span class="c">// 不是直接 camera.position = car.position</span>
<span class="c">// 而是每帧缓慢逼近（0.15 = 缓动系数）</span>
targetEased.x += (target.x - targetEased.x) * <span class="o">0.15</span>;
targetEased.y += (target.y - targetEased.y) * <span class="o">0.15</span>;

<span class="c">// 进入不同区域，视角角度切换</span>
camera.angle.<span class="n">set</span>(<span class="o">1.135</span>, -<span class="o">1.45</span>, <span class="o">1.15</span>); <span class="c">// 默认</span>
camera.angle.<span class="n">set</span>(<span class="o">0.38</span>, -<span class="o">1.4</span>, <span class="o">1.63</span>);  <span class="c">// 项目区</span></div>
        <div style="background:var(--card);border:1px solid var(--border);border-radius:var(--r);padding:20px">
          <div style="font-size:12px;color:var(--txt3);font-family:var(--mono);text-transform:uppercase;letter-spacing:.06em;margin-bottom:14px">区域触发逻辑</div>
          <div class="steps" style="gap:8px">
            ${[
              ['检测', '每帧用 Raycaster 检测鼠标/区域是否相交'],
              ['进入', '车子进入热区，触发 onEnter 事件'],
              ['进度环', '热区地板边框显示「加载进度」动画（GLSL实现）'],
              ['触发', '停留足够久，弹出项目卡片或跳转链接'],
            ].map(([step, desc]) => `
              <div style="display:flex;gap:10px;align-items:flex-start">
                <span style="background:rgba(79,143,255,.12);color:var(--accent);font-size:11px;font-family:var(--mono);padding:2px 7px;border-radius:4px;flex-shrink:0">${step}</span>
                <span style="font-size:12px;color:var(--txt2);line-height:1.6">${desc}</span>
              </div>
            `).join('')}
          </div>
        </div>
      </div>
    </div>
  </div>`;
});

/* ══════════════════════════════════════════
   7 · 命名系统——最聪明的设计
══════════════════════════════════════════ */
s('naming', el => {
  el.innerHTML = `
  <div class="inner">
    <div class="tag purple anim">第七章 · 命名魔法</div>
    <h2 class="section-title anim">3D 模型里的<em>命名规则</em>——<br>名字决定材质</h2>
    <p class="sub anim">这是整个项目最聪明的设计之一：在 Blender 里给模型命名时，按照约定的命名规则，代码会自动解析名字，分配对应的材质。不需要手动一个个设置。</p>
    <div class="grid grid-2 anim" style="gap:12px;margin-bottom:20px">
      ${[
        ['shadeWhite_001','→ 白色 Matcap 材质','accent','Blender 里的 Mesh 名字', '最常用，物体的基础颜色'],
        ['shadeBlue_002','→ 蓝色 Matcap 材质','accent','颜色写在 shade 后面', '支持所有 CSS 颜色名'],
        ['pureRed_001','→ 纯红色（无光照）','pink','pure 前缀 = 无光照', '鲜艳的装饰元素用这个'],
        ['floor_001','→ 自动创建地面阴影','green','floor 前缀', '会在下方生成阴影平面'],
      ].map(([name, result, color, tip, note]) => `
        <div style="background:var(--card);border:1px solid var(--border);border-radius:var(--r);padding:18px 20px">
          <div style="font-family:var(--mono);font-size:14px;color:var(--${color});margin-bottom:6px">${name}</div>
          <div style="font-size:13px;font-weight:600;margin-bottom:4px">${result}</div>
          <div style="font-size:12px;color:var(--txt2);margin-bottom:4px">${note}</div>
          <div style="font-size:11px;color:var(--txt3);font-family:var(--mono)">${tip}</div>
        </div>
      `).join('')}
    </div>
    <div class="two-col anim" style="gap:14px">
      <div class="callout">
        <strong style="color:var(--txt)">代码怎么解析名字？</strong><br>
        用正则表达式匹配：<code class="pill">/^shade([a-z]+)_?[0-9]*/i</code>，括号里的颜色名作为参数传给材质系统。所以 <code class="pill">shadeOrange</code> 就会给你橙色的 Matcap。
      </div>
      <div class="callout green">
        <strong style="color:var(--txt)">Vibe Coding 提示词：</strong><br>
        「用 Three.js，遍历 GLB 模型里所有 mesh，如果名字以 shade 开头，提取颜色名，用对应的 matcap 纹理创建 ShaderMaterial 并替换默认材质」
      </div>
    </div>
  </div>`;
});

/* ══════════════════════════════════════════
   8 · Vibe Coding 七步走
══════════════════════════════════════════ */
s('vibecoding', el => {
  el.innerHTML = `
  <div class="inner">
    <div class="tag green anim">第八章 · 复刻路线图</div>
    <h2 class="section-title anim">从零开始，<em>七步复刻</em>这个项目</h2>
    <p class="sub anim">每一步都是一个可以独立测试的里程碑。不要跳步，每步做完跑一下看效果。</p>
    <div class="steps anim">
      ${[
        ['01', '搭项目框架', 'npm create vite + 安装 three/cannon/gsap/howler，确认 vite-plugin-glsl 能导入 .glsl 文件',
         '提示词：「帮我用 Vite 创建一个 Three.js 项目，并安装 cannon-es、gsap、howler，配置 vite-plugin-glsl」', 'accent'],
        ['02', '工具类三件套', 'EventEmitter（自定义事件）→ Time（RAF循环，每帧触发 tick）→ Sizes（监听窗口大小变化）',
         '这三个类是整个项目的底层基础，后面所有系统都依赖它们。', 'accent'],
        ['03', 'Application 根类', '按顺序初始化：Scene → WebGLRenderer → Camera(正交) → EffectComposer → World',
         '顺序错了会报错。Camera 要先加入 Scene，才能 Composer 里 RenderPass。', 'orange'],
        ['04', 'Matcap 着色器', '写 vertex.glsl + fragment.glsl，实现 Matcap 采样 + uRevealProgress discard',
         '先用一个简单的球体测试，颜色对了再接入 GLB 模型的命名系统。', 'purple'],
        ['05', '物理 + 小车', '建 Cannon 世界(Z朝上) → RaycastVehicle → 四轮子参数 → 每帧同步到 Three.js mesh',
         '先让车能动起来，再调参数让手感好。悬挂刚度 50、摩擦 10 是好的起点。', 'orange'],
        ['06', '后处理管线', 'EffectComposer → 横纵 Blur Pass → Glows Pass，用 ShaderMaterial 写 GLSL',
         '触屏设备记得用 isTouchDevice 判断，关掉 Blur（性能）。', 'pink'],
        ['07', '场景内容', '按区域拆分 Section 类，每个 Section 加载对应 GLB，接入命名系统 + 区域交互',
         '先做 IntroSection，做完一个区域再做下一个。别一口气全做。', 'green'],
      ].map(([num, title, desc, tip, color]) => `
        <div class="step" style="border-left:2px solid rgba(${color==='accent'?'79,143,255':color==='orange'?'255,159,10':color==='purple'?'191,90,242':color==='pink'?'255,107,157':'48,209,88'},.3)">
          <span class="step-num" style="background:rgba(${color==='accent'?'79,143,255':color==='orange'?'255,159,10':color==='purple'?'191,90,242':color==='pink'?'255,107,157':'48,209,88'},.1);color:var(--${color})">${num}</span>
          <div class="step-body">
            <h3>${title}</h3>
            <p style="margin-bottom:6px">${desc}</p>
            <div style="font-size:12px;color:var(--txt3);font-family:var(--mono);background:rgba(255,255,255,.03);border-radius:6px;padding:8px 10px;border:1px solid var(--border)">💡 ${tip}</div>
          </div>
        </div>
      `).join('')}
    </div>
  </div>`;
});

/* ══════════════════════════════════════════
   9 · 踩坑地图
══════════════════════════════════════════ */
s('pitfalls', el => {
  el.innerHTML = `
  <div class="inner wide">
    <div class="tag orange anim">第九章 · 踩坑地图</div>
    <h2 class="section-title anim">这些坑<em>99% 的人都会踩</em>——提前知道</h2>
    <div class="grid grid-2 anim" style="gap:12px">
      ${[
        ['坐标系方向', '⚠️ 大坑', 'Z 轴朝上不是 Y 轴！Cannon.js 的重力要设 gravity.set(0,0,-13)，不是 (0,-9.8,0)。AI 默认会写错，记得提示它「这个项目用 Z 轴朝上」', 'orange'],
        ['Three.js 版本差异', '⚠️ 常见坑', 'Three.js v0.16x 的 ShaderMaterial 有些 API 不一样，AI 可能会用旧版写法。遇到报错，把版本号告诉 AI。', 'orange'],
        ['Cannon.js vs cannon-es', '⚠️ 大坑', '原版 Cannon.js 已不维护，建议用 cannon-es（ES Module 版本）。包名不一样，API 有细微差别。', 'orange'],
        ['GLB 模型加载顺序', '⚠️ 异步', '模型是异步加载的，加载完才能执行 Objects.add()。如果场景空白，99% 是没等模型加载好就尝试访问 mesh。', 'accent'],
        ['触屏不能键盘', '⚠️ 适配', '手机没有 WASD，需要做虚拟摇杆（joystick）。原项目已实现，复刻时别忘了这块。', 'pink'],
        ['EffectComposer 尺寸', '⚠️ 视口变化', '窗口 resize 时，EffectComposer 也要调用 .setSize()，不然画面会糊掉或者错位。', 'purple'],
        ['Shadow Map 关掉', '✅ 刻意设计', '整个项目没有 Shadow Map，全用假阴影。不要尝试开 Shadow Map，会破坏性能和风格。', 'green'],
        ['matcap 纹理数量', '✅ 设计选择', 'matcap 纹理要做成「整套」，白/橙/蓝/绿/红……所有颜色来自同一批 matcap 球，这样光照风格才统一。', 'green'],
      ].map(([title, level, desc, color]) => `
        <div style="background:var(--card);border:1px solid ${color==='orange'?'rgba(255,159,10,.2)':color==='pink'?'rgba(255,107,157,.2)':color==='purple'?'rgba(191,90,242,.2)':color==='green'?'rgba(48,209,88,.15)':'rgba(79,143,255,.2)'};border-radius:var(--r);padding:18px 20px">
          <div style="display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:8px">
            <div style="font-size:14px;font-weight:600">${title}</div>
            <span style="font-family:var(--mono);font-size:10px;padding:2px 7px;border-radius:4px;flex-shrink:0;margin-left:8px;background:rgba(${color==='orange'?'255,159,10':color==='pink'?'255,107,157':color==='purple'?'191,90,242':color==='green'?'48,209,88':'79,143,255'},.1);color:var(--${color})">${level}</span>
          </div>
          <p style="font-size:13px;color:var(--txt2);line-height:1.6">${desc}</p>
        </div>
      `).join('')}
    </div>
    <div class="callout orange anim" style="margin-top:16px">
      <strong style="color:var(--txt)">遇到报错怎么办？</strong>
      把完整报错信息 + 相关代码段复制给 AI，说「我用的是 Three.js r164 和 cannon-es，这段代码报错：[报错]，帮我修复」。不要只说「报错了」——AI 需要上下文。
    </div>
  </div>`;
});

/* ══════════════════════════════════════════
   10 · 开场动画：GSAP 串联
══════════════════════════════════════════ */
s('reveal', el => {
  el.innerHTML = `
  <div class="inner">
    <div class="tag accent anim">第十章 · 开场动画</div>
    <h2 class="section-title anim">三秒开场——<em>GSAP 怎么串联</em>所有动画</h2>
    <p class="sub anim">点击页面后，所有动画同时开始但有先后。GSAP 的 delay 参数控制每个动画的启动时机，像音乐的节拍。</p>
    <div class="two-col anim" style="gap:24px">
      <div class="code" style="font-size:12.5px;line-height:2">
<span class="c">// 用户点击「Enter」按钮后：</span>

<span class="c">// 1. Matcap 材质 Reveal（物体从地下升起）</span>
gsap.<span class="n">fromTo</span>(reveal, {
  matcapsProgress: <span class="o">0</span>
}, {
  matcapsProgress: <span class="o">1</span>,
  duration: <span class="o">3</span>      <span class="c">// 3秒</span>
});

<span class="c">// 2. 阴影淡入（稍晚 0.5s 开始）</span>
gsap.<span class="n">fromTo</span>(shadows, {
  alpha: <span class="o">0</span>
}, {
  alpha: <span class="o">0.5</span>,
  duration: <span class="o">3</span>,
  delay: <span class="o">0.5</span>    <span class="c">// 延迟0.5秒</span>
});

<span class="c">// 3. 小车从高处掉落（物理接管）</span>
car.chassis.body.position.z = <span class="o">12</span>; <span class="c">// 高空</span>
setTimeout(() => {
  car.chassis.body.<span class="n">wakeUp</span>();     <span class="c">// 激活物理</span>
}, <span class="o">300</span>);

<span class="c">// 4. 引擎声渐入</span>
gsap.<span class="n">to</span>(sounds.engine, {
  volume: <span class="o">0.7</span>,
  duration: <span class="o">3</span>
});</div>
      <div>
        <div style="background:var(--card);border:1px solid var(--border);border-radius:var(--r);padding:22px;margin-bottom:14px">
          <div style="font-size:12px;color:var(--txt3);font-family:var(--mono);text-transform:uppercase;letter-spacing:.06em;margin-bottom:16px">开场时间轴</div>
          ${[
            ['0.0s', '点击进入', 'accent', '全部动画同时触发'],
            ['0.0s', 'Matcap Reveal', 'accent', '物体从地面升起，持续3s'],
            ['0.0s', '车子高空', 'orange', 'position.z = 12，在空中'],
            ['0.3s', '物理激活', 'orange', '车子开始受重力下落'],
            ['0.5s', '阴影淡入', 'txt2', '地面阴影慢慢出现'],
            ['3.0s', '动画完成', 'green', '场景完全就绪，可以开车'],
          ].map(([time, name, color, note]) => `
            <div style="display:flex;align-items:center;gap:12px;padding:8px 0;border-bottom:1px solid var(--border)">
              <span style="font-family:var(--mono);font-size:11px;color:var(--${color});min-width:36px">${time}</span>
              <span style="font-size:13px;font-weight:500;flex:1">${name}</span>
              <span style="font-size:11px;color:var(--txt3)">${note}</span>
            </div>
          `).join('')}
        </div>
        <div class="callout green">
          <strong style="color:var(--txt)">关键理解：</strong><br>
          着色器的 <code class="pill">uRevealProgress</code> 是 GSAP 驱动的 uniform 变量。GSAP 不认识 GLSL，但它可以修改 JS 对象的属性——在 onUpdate 回调里把值同步给 shader.uniforms。
        </div>
      </div>
    </div>
  </div>`;
});

/* ══════════════════════════════════════════
   11 · 总结 + 彩蛋
══════════════════════════════════════════ */
s('summary', el => {
  el.innerHTML = `
  <div class="inner">
    <div class="tag green anim">总结</div>
    <h2 class="section-title anim">你现在已经懂了<em>所有核心概念</em></h2>
    <div class="grid grid-2 anim" style="gap:12px;margin-bottom:24px">
      ${[
        ['Three.js', '3D 渲染画布', '✅'],
        ['Cannon.js', '物理世界模拟', '✅'],
        ['Matcap 着色', '零灯光的光照方案', '✅'],
        ['假阴影', '性能友好的影子', '✅'],
        ['EffectComposer', '画面后处理滤镜', '✅'],
        ['命名系统', '模型名字→自动分材质', '✅'],
        ['GSAP 串联', '开场动画时间轴', '✅'],
        ['等距相机', '缓动跟随小车', '✅'],
      ].map(([name, desc, status]) => `
        <div style="display:flex;align-items:center;gap:12px;padding:12px 16px;background:var(--card);border:1px solid rgba(48,209,88,.15);border-radius:var(--r2)">
          <span style="color:var(--green);font-size:16px">${status}</span>
          <div>
            <div style="font-size:13px;font-weight:600">${name}</div>
            <div style="font-size:12px;color:var(--txt2)">${desc}</div>
          </div>
        </div>
      `).join('')}
    </div>
    <div class="callout green anim" style="margin-bottom:20px">
      <strong style="color:var(--txt)">下一步怎么开始？</strong><br>
      找 Bruno Simon 的 Three.js Journey 课程（threejs-journey.com），他亲自讲如何复刻这个项目。或者直接把这份解析发给 Claude/GPT-4，说「帮我从第一步开始实现」，边做边问。
    </div>
    <div style="background:var(--card);border:1px solid var(--border);border-radius:var(--r);padding:22px" class="anim">
      <div style="display:flex;align-items:center;gap:10px;margin-bottom:12px">
        <span style="font-size:20px">🥚</span>
        <div style="font-family:var(--mono);font-size:12px;color:var(--txt3);text-transform:uppercase;letter-spacing:.06em">彩蛋</div>
      </div>
      <p style="font-size:14px;color:var(--txt2);line-height:1.7;margin-bottom:12px">在浏览器地址栏 URL 后面加上 <code class="pill">#debug</code> 会开启 dat.GUI 调试面板，可以实时调整所有参数。</p>
      <p style="font-size:14px;color:var(--txt2);line-height:1.7">加上 <code class="pill">#cybertruck</code>……小车会变成赛博卡车 🚐</p>
    </div>
  </div>`;
});
