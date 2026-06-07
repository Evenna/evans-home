# Evans 宣传片全流程制作方案

> 基于分镜 v1.0 / 脚本 v5 / 全片 26 主镜头 55 分镜单元  
> 总时长：约 4 分 40 秒

---

# Evans 宣传片 · AI 全流程制作方案

> **项目**：Evans · 陪你一生的 AI 共生体  
> **宣传片时长**：约 4 分 43 秒  
> **版本**：v1.0  
> **制作工具链**：Midjourney / Flux（生图）→ Kling / Runway / Sora（视频）→ After Effects（动效）→ ChatCut AI（剪辑）

---

## 文档目录

| 章节 | 内容 | 位置 |
|------|------|------|
| **Part 1** | 生图清单（IMG-01 至 IMG-40+） | 第 1 章 |
| **Part 2** | 视频生成 Prompt（镜头 01–26） | 第 2 章 |
| **Part 3.1** | 全片时间线总览 | 第 3 章 |
| **Part 3.2** | 字幕完整清单（24 段） | 第 3 章 |
| **Part 3.3** | UI 浮层代码（UI-01 至 UI-09） | 第 3 章 |
| **Part 3.4** | 转场特效规格 | 第 3 章 |
| **Part 3.5** | 音频方案 | 第 3 章 |
| **Part 3.6** | ChatCut AI 剪辑指令 | 第 3 章 |

---

# Part 1 · 生图清单（核对用）

> **说明**：此清单列出全片所有需要 AI 生成的参考图/关键帧。  
> 每个镜头生成 **1 张主图** 作为关键帧参考，视频生成时以此为风格基准。  
> 图像类型：**A** = 写实人物/场景  **B** = 产品建模渲染  **C** = 机器人 CG  **D** = 纯后期动效（不需要 AI 生图）

| 编号 | 镜头 | 张数 | 画面描述 | 类型 | 重要注意事项 |
|------|------|------|----------|------|------------|
| IMG-01 | 01-A | 1 | 晨光木桌上瓷茶杯，老年女性皱纹手从右侧伸入握杯，戴旧戒指 | A | 只见手背，**无脸**；屏幕纯空白 |
| IMG-02 | 02-A | 1 | 婴儿小手被成年女性温柔握住，俯拍，奶油色床单背景虚化 | A | **无脸**，只见手 |
| IMG-03 | 02-B | 1 | 年轻男性手在 MacBook 键盘快速敲击，手腕复古手表，咖啡馆侧光虚化背景 | A | **无脸**，指尖轻微动态模糊 |
| IMG-04 | 02-C | 1 | 老年男性颤抖的手翻开旧相册，黄页黑白照片，落日暖光 | A | **无脸**，整体氛围温暖忧郁 |
| IMG-05 | 03-A | 1 | Evans 胸针悬浮纯黑空间，顶部柔暖光，内圈呼吸暖光 | B | 建模渲染；不露 logo |
| IMG-06 | 04-A | 1 | Evans 胸针纯白无缝背景，360° 产品 hero shot，刷铝面 | B | 建模渲染；展示曲面边缘抛光、背面触点、传感器开口 |
| IMG-07 | 05-A | 1 | 四颗麦克风开口等距排列，极近特写，纯黑背景，铝面细节 | B | 建模渲染；极近宏观 macro |
| IMG-08 | 05-B | 1 | 心率传感器极近特写，极弱绿光闪烁，纯黑背景 | B | 建模渲染；一次极轻 LED 脉冲 |
| IMG-09 | 05-C | 1 | NPU 区域侧面精密工艺线条与刻字，铝面质感，纯黑背景 | B | 建模渲染；暖色轮廓光 |
| IMG-10 | 06-A | 1 | 丝质项链从画面上方自然垂落，与悬浮胸针结合为吊坠形态，纯白背景 | B | 建模渲染；慢动作物理效果 |
| IMG-11 | 07-A | 1 | 30 岁女性锁骨处正在别上 Evans，只见锁骨到下颌轮廓，嘴角微笑，浅色衬衫 | A | **不露脸**，只到下颌；佩戴后胸针需柔光亮起（后期叠加） |
| IMG-12 | 08-A | 1 | 28 岁男性清晨地铁侧面，持手机望窗外，无线耳机，浅蓝衬衫，背景乘客虚化 | A | 亚洲面孔；使用 Kling/Flux |
| IMG-13 | 08-B | 1 | 手持手机极近特写，**屏幕纯空白**，地铁背景虚化，晨光 | A | **屏幕必须空白**，所有 UI 后期合成 |
| IMG-14 | 08-C | 1 | 同一男性自然抬头望向车窗外，表情平静淡然 | A | 表情克制，非夸张 |
| IMG-15 | 09-A | 1 | 25 岁女研究生宿舍书桌，戴眼镜扎马尾，睡衣外针织衫，困惑疲惫看电脑 | A | 亚洲面孔；桌面杂乱（咖啡杯/笔记/论文） |
| IMG-16 | 09-B | 1 | 电脑屏幕全屏特写，**纯空白屏** | A | **屏幕必须空白** |
| IMG-17 | 09-C | 1 | 同一女性端茶杯深呼吸，表情放松舒缓 | A | 亚洲面孔 |
| IMG-18 | 10-A | 1 | 30 岁职业女性落地窗前背侧，刚挂电话，皱眉，黄昏逆光轮廓光 | A | 背/侧面为主，面部不强调 |
| IMG-19 | 10-B | 1 | 办公室玻璃桌面虚化，笔记本+咖啡杯，女性虚化背景在窗前，**桌面无卡片** | A | **桌面纯净**，UI 全部后期合成 |
| IMG-20 | 10-C | 1 | 同一女性轻笑，转向窗外，黄昏侧光 | A | 表情克制，非夸张 |
| IMG-21 | 11-A | 1 | 28 岁男性晚归，放背包松领带走向沙发，北欧日式客厅中景，落地窗暖光 | A | 场景需干净，**无机器人**（后期合成） |
| IMG-22 | 11-B | 1 | 客厅+厨房整体俯瞰，男性坐在沙发上，**空场景无机器人** | A | 留足合成空间；厨房岛台清晰可见 |
| IMG-23 | 11-C | 1 | 厨房岛台桌面级双臂机械臂，左臂取杯右臂操作水龙头，白色哑光陶瓷外壳 | C | CG 渲染；Apple 工业设计语言；**非工业机器人** |
| IMG-24 | 11-D | 1 | 客厅角落圆润白色移动机器人从待机位启动，顶部托盘缓慢抬升 | C | CG 渲染；像 EVE 遇上 Apple 美学 |
| IMG-25 | 11-E | 1 | 移动机器人滑行中，低角度追踪视角，沿地面路径向厨房移动 | C | CG 渲染 |
| IMG-26 | 11-F | 1 | 机械臂将水杯精准放到移动机器人托盘，两机器人协同的关键瞬间 | C | CG 渲染；厨房岛台背景 |
| IMG-27 | 11-G-1 | 1 | 客厅墙面智能屏幕从黑屏点亮，**屏幕纯空白**，暖光客厅 | A | **屏幕空白**，新闻 UI 后期合成 |
| IMG-28 | 11-G-2 | 1 | 吸顶灯极近特写，色温由冷白渐变暖橙，深夜客厅背景虚化 | A | 实景灯光实拍变化 |
| IMG-29 | 11-I | 1 | 男性坐沙发自然伸手接水杯，**表情完全平静**，温暖傍晚光 | A | **无科幻感**；机器人后期合成至沙发旁 |
| IMG-30 | 12-A | 1 | 68 岁银发清瘦男性，坐客厅沙发接电话，困惑紧张，传统中式客厅暖灯 | A | 亚洲老年面孔；皮肤纹理自然 |
| IMG-31 | 12-B | 1 | 老年男性手持手机极近特写，**屏幕纯空白**，下午暖光 | A | **屏幕空白** |
| IMG-32 | 12-C | 1 | 同一老年男性表情从困惑转坚定，对话筒说话，暖光 | A | 表情自然克制，非戏剧化 |
| IMG-33 | 13-A | 1 | 28 岁男性深夜书房侧脸，左手撑头，右手停键盘，疲惫，冷白台灯，城市夜景背景 | A | 冷蓝灰色调；**Evans 不亮** |
| IMG-34 | 13-B | 1 | 极简台灯极近特写，灯光色温从冷白渐变暖橙，深夜书房背景虚化 | A | 灯光变化是关键视觉 |
| IMG-35 | 13-C | 1 | 桌角极简智能音箱，柔光 LED 亮起，深夜书房背景虚化 | A | 极简设计感 |
| IMG-36 | 13-D | 1 | 小型桌面陪伴机器人靠近桌沿，托盘上一杯热茶升腾热气，深夜书房 | C | CG 渲染；Studio Ghibli 温暖感 |
| IMG-37 | 13-E | 1 | 书房门口走廊视角，浴室门口智能小屏柔光亮起，**屏幕空白** | A | **屏幕空白** |
| IMG-38 | 13-F | 1 | 桌面手机俯拍极近特写，**屏幕纯空白**，台灯暖色倒影 | A | **屏幕空白** |
| IMG-39 | 13-G | 1 | 同一男性缓缓抬头环顾书房，眼神从疲惫转松弛，现在是暖光 | A | 光已转暖（与 13-A 形成对比） |
| IMG-40 | 14-A | 1 | 68 岁男性深夜昏暗客厅，单盏台灯，捧 iPad 双手，半侧脸，温柔神情 | A | 深阴影；亚洲老年面孔 |
| IMG-41 | 14-B | 1 | iPad 极近特写，**屏幕纯空白**，老年人手可见于画面边缘，台灯暖光倒影 | A | **屏幕空白**，关系图谱后期合成 |
| IMG-42 | 14-C-1 | 1 | 同一老年男性眼角泪光，嘴角带笑，手指轻触 iPad 屏幕，情绪克制真实 | A | 情绪真实非戏剧化 |
| IMG-43 | 14-C-2 | 1 | 书架上极简智能音箱柔光亮起，深夜昏暗客厅背景 | A | 与 IMG-35 同款设备 |
| IMG-44 | 15-A | 1 | 68 岁男性夜晚坐窗边侧影，望向窗外，桌上 iPad 前景虚化 | A | 侧影剪影；深夜诗意氛围 |
| IMG-45 | 15-B | 1 | 越肩俯拍桌上 iPad，**屏幕纯空白**，老人侧影背景虚化，台灯暖光 | A | **屏幕空白**，书籍 UI 后期合成 |
| IMG-46 | 15-C | 1 | 同一老年男性侧脸继续讲述，眼睛微闭沉浸回忆 | A | 表情沉静，非表演性 |
| IMG-47 | 16-A | 1 | 45 岁职业女性白色办公室，刚挂电话，皱眉看手机，桌上外卖盒 | A | 职场疲态；无妆感 |
| IMG-48 | 16-B | 1 | 女性手持手机极近特写，**屏幕纯空白**，办公室光反射 | A | **屏幕空白** |
| IMG-49 | 16-C-1 | 1 | 同一女性眼眶湿润，举起手机准备重新拨号，情绪克制 | A | 细腻情绪 |
| IMG-50 | 16-C-2 | 1 | 72 岁老母亲传统厨房，接起电话瞬间眼睛亮起，午后暖光 | A | 亚洲老年女性；真实家居氛围 |
| IMG-51 | 17（参考） | 1 | 8 维雷达图从规整八边形变形为有机形态，纯黑背景，暖金/奶油色 | D | **仅作 AE 制作参考**；实际由动效设计师制作 |
| IMG-52 | 18-A | 1 | 老人夜晚书房**背影/剪影**对窗，不见脸，身份模糊，昏暗单灯 | A | **脸部必须模糊或遮挡** |
| IMG-53 | 18-B | 1 | 桌上 iPad 特写，**屏幕纯空白**，昏暗书房，老年人手边缘可见 | A | **屏幕空白**，时间胶囊 UI 后期合成 |
| IMG-54 | 19-A | 1 | 28 岁男性深夜公寓窗边，持水杯望霓虹，**Evans 完全不亮**，冷蓝灰色调 | A | **关键：胸针不发光**；冷色调与后面形成对比 |
| IMG-55 | 21-A | 1 | 同一男性，神情平静，低头看胸前 Evans，胸针开始柔光亮起 | A | 亮起时机：说完"Evans?"后约 1 秒才亮 |
| IMG-56 | 22-A | 1 | 约 4 岁孩子小手按在父亲胸前 Evans，父亲脸虚化背景，温暖午后 | A | 无清晰人脸；亲子温暖氛围 |
| IMG-57 | 22-B | 1 | 16 岁男生学生制服坐窗边，胸前 Evans 微光，对窗微笑 | A | 亚洲少年；克制的快乐 |
| IMG-58 | 22-C | 1 | 25 岁情侣咖啡馆相对而坐，两人胸前各一枚 Evans，轻声笑 | A | 两枚 Evans 都可见；温馨不做作 |
| IMG-59 | 23-A | 1 | 30 岁产妇抱新生儿，Evans 在胸前，婴儿小脸与 Evans 近在咫尺，分娩室柔光 | A | 最柔和温暖的镜头之一 |
| IMG-60 | 23-B | 1 | 45 岁母亲厨房做饭，戴围裙，胸前 Evans 暖光，傍晚厨房暖光 | A | 日常家庭氛围 |
| IMG-61 | 23-C | 1 | 60 岁男性花园修剪盆栽，胸前 Evans 暖光，午后花园软光 | A | 退休惬意氛围 |
| IMG-62 | 24-A | 1 | 75 岁老人树荫小径**散步背影**，黄金时光，秋叶光斑 | A | **背影**；黄金时光暖调 |
| IMG-63 | 24-B | 1 | 75 岁老年女性阳台半侧脸，握瓷茶杯，望远，午后暖光 | A | 宁静老年意境 |
| IMG-64 | 24-C | 1 | 80 岁老人**闭眼**，安详微笑，胸前 Evans 稳定暖光，窗光午后 | A | 最安详的一帧；Lifelong 意象 |
| IMG-65 | 25-A | 1 | 20 岁年轻女性卧室，戴耳机，眼含泪嘴角笑，胸前 Evans，旁边 iPad **屏幕空白** | A | iPad 屏后期合成书籍封面 |
| IMG-66 | 26-A | 1 | Evans 胸针纯黑背景正中，暖金呼吸光，极简剪影 hero shot | B | 建模渲染；落版用 |

**合计：66 张**（含 1 张纯参考图 IMG-51）  
**实际需要 AI 生成：65 张**  
**不需要 AI 生图：镜头 11-H（复用 11-B）、镜头 20（纯后期字幕）**

---

## 生图工具建议

| 场景类型 | 推荐工具 | 理由 |
|---------|---------|------|
| 亚洲面孔写实人物（第三、四、五幕） | **Kling / Hailuo** | 亚洲面孔准确度最高 |
| 极致皮肤质感特写 | **Flux Pro 1.1** | 皮肤纹理、手部细节 |
| 风格统一参考帧 | **Midjourney v6/v7** | 风格一致性最强 |
| 产品建模（镜头03-06, 26） | **Blender + KeyShot / Cinema4D** | 非 AI，专业 3D 渲染 |
| 机器人 CG（镜头11C/D/E/F, 13D） | **Blender + AI 辅助** | 需要精准建模合成 |
| 简单道具/空间参考 | **DALL·E 3** | 快速构图验证 |

---
# Part 2 · 视频生成清单（镜头 01–13）

> **通用否定词**（所有 prompt 末尾添加）：  
> `--no neon, cyberpunk, futuristic UI, holographic, sci-fi blue glow, glowing wireframes, hologram, cartoon, anime, illustration, sketch, 3D animation style, dramatic expression, surprised face, theatrical, posed, fashion magazine pose, model-like, ai-generated face`

---

## 第一幕 · 提问 [00:00 – 00:25]

---

### 镜头 01 · 茶杯握起
- **推荐工具**：Kling 1.5+
- **时长**：5 秒
- **视频 Prompt**：
```
Static shot for 2 seconds on a ceramic teacup on wooden table in soft morning window light. Then camera slowly tilts up and dollies in over 3 seconds. An elderly woman's wrinkled hand with a wedding ring enters from right and gently grasps the cup. Subject motion: slow and deliberate hand movement. Camera motion: slow tilt up combined with gentle push in. Lighting: warm amber window light, soft and diffused. Style: 35mm film, Kodak Portra 400, cinematic, photorealistic, Apple aesthetic.
```
- **注意**：手部特写，无脸；温暖晨光，胶片感；前 2 秒完全静止

---

### 镜头 02-A · 婴儿之手
- **推荐工具**：Runway Gen-3
- **时长**：2.5 秒
- **视频 Prompt**：
```
Static overhead close-up of a baby's tiny hand being held by an adult woman's hand. No camera movement. Very subtle finger motion only. Soft blurred nursery background with cream-colored blanket. Warm diffused lighting. 35mm film, photorealistic, intimate stillness. Duration 2.5 seconds.
```
- **注意**：完全静止镜头；无脸；极简动作

---

### 镜头 02-B · 青年之手
- **推荐工具**：Runway Gen-3
- **时长**：2.5 秒
- **视频 Prompt**：
```
Static overhead close-up of a young man's hand typing fast on MacBook keys. Vintage watch visible on wrist. Subject motion: rapid finger typing with natural motion blur. No camera movement. Side window light, warm afternoon tones. Blurred cafe ambience in background. 35mm film. Duration 2.5 seconds.
```
- **注意**：指尖动态模糊是关键；无脸

---

### 镜头 02-C · 老年之手
- **推荐工具**：Kling 1.5+
- **时长**：2.5 秒
- **视频 Prompt**：
```
Static overhead close-up of an elderly man's slightly trembling hand turning the page of an old photo album with yellowed pages and B&W photographs. Slow gentle page turning motion. Golden hour sunset light. Warm amber tones. 35mm film, photorealistic, melancholic stillness. Duration 2.5 seconds.
```
- **注意**：手部轻微颤抖是细节；无脸；落日暖光

---

### 镜头 03-A · Evans 首次亮相（产品入场）
- **推荐工具**：Cinema4D / Blender（专业 3D 渲染，非 AI 视频）
- **时长**：12 秒
- **视频 Prompt**：
```
Pure black void background. Small elegant metal brooch floating at the center of frame. Camera slowly dollies in from medium distance to extreme close-up over 10 seconds. The brooch has a subtle warm amber glow ring inside that breathes — brightens for 2 seconds, dims for 1 second, brightens again (repeat twice during shot). Soft warm key light from above. Octane render, photorealistic CGI product visualization, Apple hero shot aesthetic. Final frame is extreme close-up with glow filling screen.
```
- **注意**：建议使用专业 3D 工具；呼吸光效节奏需精准（亮2s→暗1s→亮）

---

## 第二幕 · 硬件诗篇 [00:25 – 00:55]

---

### 镜头 04-A · 360° 环绕
- **推荐工具**：Cinema4D / Blender（专业 3D 渲染）
- **时长**：7 秒
- **视频 Prompt**：
```
Studio product shot on seamless white background. Small elegant metal brooch in center of frame. Camera performs smooth 360 degree orbit around the product over 7 seconds at constant speed. Product remains static in space. Soft warm studio lighting from above-left with fill from below-right. At each side of rotation, different surface details are revealed: brushed aluminum side, magnetic contact points on back, sensor openings on edge. Octane render, photorealistic CGI, Apple product video aesthetic.
```

---

### 镜头 05-A · 麦克风阵列特写
- **推荐工具**：Cinema4D / Blender
- **时长**：2 秒
- **视频 Prompt**：
```
Extreme macro shot on pitch black background. Camera slowly tracks right along the curved edge of a metal wearable device, revealing four equidistant precision microphone openings in sequence. Brushed aluminum surface. Subtle specular highlights move as camera moves. Octane render, photorealistic CGI macro. Duration 2 seconds.
```

---

### 镜头 05-B · 心率传感器
- **推荐工具**：Cinema4D / Blender
- **时长**：2 秒
- **视频 Prompt**：
```
Extreme macro static shot on black background. Heart rate sensor lens visible on metal surface. A single soft green LED pulse fades in and out once during the shot. No camera movement. Octane render, photorealistic CGI. Duration 2 seconds.
```

---

### 镜头 05-C · NPU 工艺线条
- **推荐工具**：Cinema4D / Blender
- **时长**：2 秒
- **视频 Prompt**：
```
Extreme macro shot on black background. Side surface of metal wearable device with precision-etched technical lines visible. Camera slowly drifts right revealing surface details. Subtle warm rim light. Octane render, photorealistic. Duration 2 seconds.
```

---

### 镜头 06-A · 形态变换
- **推荐工具**：Cinema4D / Blender（慢动作物理模拟）
- **时长**：7 秒
- **视频 Prompt**：
```
Clean white seamless background. A small elegant metal brooch floats statically in center of frame. A delicate silk chain necklace gracefully descends from above the frame in slow motion, gently connects with the brooch, and the combined necklace settles into a slight pendulum motion. Soft studio lighting. Slow motion physics throughout. Octane render, photorealistic CGI. Duration 7 seconds.
```

---

### 镜头 07-A · 佩戴瞬间
- **推荐工具**：Kling 1.5+
- **时长**：10 秒
- **视频 Prompt**：
```
Static medium close-up framing collarbone and lower jaw of a 30-year-old Chinese woman in a light cream cotton shirt. She finishes buttoning the top button, then carefully pins a small elegant metal brooch just below her collarbone. The brooch emits a brief soft warm glow that fades. The corner of her mouth shows a subtle smile. Face is mostly above the frame edge. No camera movement. Natural window light from left. 35mm film, photorealistic, Apple aesthetic. Duration 10 seconds.
```
- **注意**：胸针发光效果若 AI 生成不够准确，后期叠加柔光层

---

## 第三幕 · 它如何提效 [00:55 – 02:05]

---

### 镜头 08-A · 李明地铁晨间
- **推荐工具**：Kling 1.5+（亚洲面孔优先）
- **时长**：5 秒
- **视频 Prompt**：
```
Medium profile shot of a 28-year-old Chinese man standing in a morning subway car. Wearing wireless earphones and light blue shirt, holding smartphone. Camera slight handheld for natural feel. Morning city light flickers across his face as the subway moves. Blurred commuters in background. He gazes thoughtfully out the window. Subject motion: minimal, very slight breathing and natural sway. Subway gently shaking. 35mm film, photorealistic, Apple aesthetic. Duration 5 seconds.
```
- **后期添加**：画外旁白「Evans，昨晚老王在微信发的那个 banner 改版需求，帮我看看怎么排。」

---

### 镜头 08-B · 手机屏幕（空白）
- **推荐工具**：Kling 1.5+
- **时长**：14 秒
- **视频 Prompt**：
```
Extreme close-up of smartphone in a man's hand, screen completely empty and dark, fingers grip device naturally. Subject motion: hand stays very steady. Slight thumb movement at the end (last 1 second) to tap confirm gesture. Blurred subway background. Morning light reflections on screen glass. 35mm film, photorealistic. IMPORTANT: screen must remain blank throughout, no UI, no text, no graphics on the phone screen. Duration 14 seconds.
```
- **⚠️ 关键**：屏幕全程空白；所有 UI（甘特图、工具图标、✓卡片）全部后期合成

---

### 镜头 08-C · 李明抬头平静
- **推荐工具**：Kling 1.5+
- **时长**：6 秒
- **视频 Prompt**：
```
Medium shot of the same 28-year-old Chinese man on the subway. He has just finished a small smartphone interaction. Subject motion: he naturally raises his head, looks out the window, with a faint subtle smile that is almost imperceptible. No exaggerated expression. Camera static. Morning light. 35mm film, photorealistic. Duration 6 seconds.
```

---

### 镜头 09-A · 林涵宿舍开机
- **推荐工具**：Kling 1.5+ / Hailuo
- **时长**：4 秒
- **视频 Prompt**：
```
Over-the-shoulder medium close-up of a tired 25-year-old Chinese female graduate student at her desk in morning light. She wears glasses, chunky cardigan over pajamas, messy ponytail. She is looking at her laptop screen with a confused, overwhelmed expression. Subject motion: minimal, slight sigh, hand rubs eye briefly. Static camera. Soft morning window light. Cluttered desk with notes, coffee, papers. Laptop screen is blank (UI to be added post). 35mm film, photorealistic. Duration 4 seconds.
```
- **后期添加**：笔记本屏幕上叠加红点通知：邮件89 / 微信34 / 钉钉12 / 导师语音3

---

### 镜头 09-B · 电脑屏幕（空白）
- **推荐工具**：Runway Gen-3
- **时长**：13 秒
- **视频 Prompt**：
```
Full screen shot of a blank laptop monitor. Camera completely static. Screen remains empty and dim throughout. Subtle morning room reflections on glass surface. IMPORTANT: NO UI, NO TEXT, NO GRAPHICS on screen at any point. Just empty screen. 35mm film, photorealistic. Duration 13 seconds.
```
- **⚠️ 关键**：屏幕全程空白；「138→5」信息塌缩动画、真要务清单全部后期合成

---

### 镜头 09-C · 林涵端茶舒缓
- **推荐工具**：Kling 1.5+
- **时长**：6 秒
- **视频 Prompt**：
```
Medium close-up of the same female Chinese graduate student. Subject motion: she slowly lifts a tea mug with both hands, takes a deep breath, lowers shoulders, looks at her laptop with subtle relief. No exaggerated expression. Camera static. Morning light unchanged. 35mm film, photorealistic. Duration 6 seconds.
```

---

### 镜头 10-A · 苏婷窗前挂电话
- **推荐工具**：Kling 1.5+
- **时长**：5 秒
- **视频 Prompt**：
```
Medium shot from behind-side of a 30-year-old Chinese female executive at a floor-to-ceiling window in modern office at golden hour. She holds smartphone, has just hung up. Subject motion: she slowly lowers the phone, slight frown, gazes out at city skyline. Camera performs very slow gentle dolly in. Soft sunset backlight creating gentle rim light on her. Warm office interior. 35mm film, photorealistic. Duration 5 seconds.
```
- **后期添加**：画外旁白「老板让我后天飞深圳……可女儿后天有家长会……」

---

### 镜头 10-B · 办公桌面（空桌）
- **推荐工具**：Runway Gen-3
- **时长**：12 秒
- **视频 Prompt**：
```
Close-up of a clean glass office desk with a closed laptop and coffee mug, blurred woman figure in background at window during golden hour. Subject motion: very subtle, woman shifts weight slightly. Camera static. Soft warm light. 35mm film, photorealistic. Duration 12 seconds.
```
- **⚠️ 关键**：桌面无任何卡片；「你可能不需要二选一」卡片和时刻表全部后期合成

---

### 镜头 10-C · 苏婷轻笑转身
- **推荐工具**：Kling 1.5+
- **时长**：5 秒
- **视频 Prompt**：
```
Medium shot of the same Chinese female executive. Subject motion: she gently turns from desk to window, soft smile forms on her lips, she looks out peacefully. No exaggerated emotion. Camera static. Golden hour rim light. 35mm film, photorealistic. Duration 5 seconds.
```

---

## 第四幕 · 它如何在你左右 [02:05 – 03:10]

---

### 镜头 11-A · 李明下班回家
- **推荐工具**：Kling 1.5+
- **时长**：4 秒
- **视频 Prompt**：
```
Medium wide static shot of a modern open-plan living room at evening golden hour. A 28-year-old Chinese man enters frame, drops backpack near door, loosens tie, walks to sofa and sits down, takes a deep breath. Subject motion: natural arrival movements. Camera static. Warm evening light through large windows. Clean Scandinavian-Japanese interior aesthetic. NO robots or machinery visible. 35mm film, photorealistic. Duration 4 seconds.
```
- **后期添加**：画外旁白「Evans，我有点累。倒杯水，顺便讲下今天的新闻。」；胸前Evans暖光脉动

---

### 镜头 11-B · 指挥家俯瞰（空场景）
- **推荐工具**：Sora（复杂运镜）
- **时长**：2 秒
- **视频 Prompt**：
```
Wide overhead crane shot of an open-plan living room and kitchen. Camera cranes up from behind a beige sofa where a man is seated, then dollies out slightly to reveal the full space. The kitchen island is visible in the background. Evening golden light. Modern minimal Scandinavian-Japanese interior. IMPORTANT: scene must be empty of any robots or machinery — those will be composited in post. Subject motion: man is mostly still on the sofa. 35mm film, photorealistic. Duration 2 seconds.
```
- **后期添加**：蓝色调度光线从Evans胸针扇形展开至四个设备位置

---

### 镜头 11-C · 厨房双臂机械臂（纯CG）
- **推荐工具**：Blender + 物理模拟（非AI视频）
- **时长**：4 秒
- **视频 Prompt**（用于AI辅助参考）：
```
Photorealistic CGI of an elegant table-mounted dual-arm consumer home robot on a kitchen island. White matte ceramic body with soft warm accent lights at joints. Apple industrial design language. Subject motion: graceful slow-motion sequence — left arm picks up a glass cup, right arm opens water faucet, left arm places cup under water stream, water fills, right arm closes faucet, left arm places filled cup on island edge. Movements are smooth, slow, elegant, NOT industrial-fast. Camera slowly dollies in. Warm kitchen evening light. Composited into live action kitchen plate. Duration 4 seconds.
```

---

### 镜头 11-D · 移动机器人启动（纯CG）
- **推荐工具**：Blender
- **时长**：1.5 秒
- **视频 Prompt**：
```
Photorealistic CGI of an elegant home companion robot in the corner of a modern living room. Rounded organic white silhouette with a soft warm light ring atop the dome head. Apple-designed home robot aesthetic. Subject motion: robot silently activates — light ring brightens slightly, top tray begins to rise smoothly. Camera very slow dolly in. Warm evening interior light. Composited into live action plate. Duration 1.5 seconds.
```
- **后期添加**：地面蓝色虚线路径轨迹

---

### 镜头 11-E · 机器人滑行（纯CG）
- **推荐工具**：Blender
- **时长**：2 秒
- **视频 Prompt**：
```
Photorealistic CGI tracking shot of an elegant home companion robot smoothly gliding from living room corner to kitchen island over 2 seconds. Robot moves silently across wooden floor. Top tray rises smoothly to match island counter height as robot approaches. Camera tracks alongside at low angle. Warm evening lighting. Composited into live action plate. Apple aesthetic. Duration 2 seconds.
```

---

### 镜头 11-F · 机械臂将杯放到机器人托盘（纯CG）
- **推荐工具**：Blender
- **时长**：1.5 秒
- **视频 Prompt**：
```
Medium close-up CGI of the dual-arm robot's arm gently and precisely placing a filled glass cup onto the elevated tray of the home companion robot beside the kitchen island. Two different robots collaborate seamlessly. Subject motion: slow careful placement, the moment of handover. Camera static. Warm kitchen light. Photorealistic CGI integrated with live action. Duration 1.5 seconds.
```

---

### 镜头 11-G · 智能屏幕点亮 + 灯光变化
- **推荐工具**：Runway Gen-3（两个各1.5秒短镜）
- **时长**：3 秒（1.5s + 1.5s）

**G-1 屏幕点亮**：
```
Static shot of smart TV display on wall in modern living room. Subject motion: display screen subtly transitions from dark standby to gentle warm glow. Screen content remains blank for post-production overlay. Warm evening light. 35mm film, photorealistic. Duration 1.5 seconds.
```

**G-2 灯光变化**：
```
Macro shot of ceiling pendant light bulb gently shifting from cool to warm tones. Warm evening atmosphere. 35mm film, photorealistic. Duration 1.5 seconds.
```

---

### 镜头 11-H · 调度收束（复用 11-B 素材）
- **说明**：此镜复用镜头 11-B 的俯瞰素材，后期叠加蓝色光线收束动画，**不需要单独生成视频**

---

### 镜头 11-I · 李明接水（真人+CG合成）
- **推荐工具**：Kling 1.5+（真人部分）
- **时长**：5 秒
- **视频 Prompt**：
```
Medium close-up static shot of a 28-year-old Chinese man on a beige sofa. Subject motion: he naturally reaches out and takes a glass of water from a tray positioned at sofa-arm level (robot tray to be composited in post). He sips slightly, gives the faintest natural smile. The action must look completely natural, like receiving from a family member, NO sci-fi reaction. Static camera. Warm evening light. 35mm film, photorealistic. Duration 5 seconds.
```
- **后期合成**：机器人停在沙发旁的CG合成；字幕「它，是你的大脑。机器，是它的手。」

---

### 镜头 12-A · 陈建国接诈骗电话
- **推荐工具**：Kling 1.5+ / Hailuo（老年亚洲面孔）
- **时长**：4 秒
- **视频 Prompt**：
```
Medium close-up of a 68-year-old Chinese man, silver hair, beige knit sweater, seated on a couch in traditional Chinese living room. Holds smartphone to ear, listening intently with growing anxiety. Subject motion: subtle worry on his face, lips part to speak. Camera very slow dolly in. Soft afternoon window light. Traditional home interior. 35mm film, photorealistic. Duration 4 seconds.
```
- **后期添加**：画外旁白（诈骗电话声音）；Evans由暖白转黄色警示光

---

### 镜头 12-B · 手机屏幕三联核验（空白屏）
- **推荐工具**：Runway Gen-3
- **时长**：11 秒
- **视频 Prompt**：
```
Extreme close-up of smartphone in elderly Chinese man's hand. Screen completely blank and dim throughout. Hand stays very still. Subject motion: minimal hand tremor natural for elderly. Camera static. Warm traditional interior light. 35mm film, photorealistic. NO UI on screen. Duration 11 seconds.
```
- **⚠️ 关键**：三联核验屏（声纹比对/话术匹配/视频通话）全部后期合成；骨传导气泡后期叠加

---

### 镜头 12-C · 陈建国挂断电话
- **推荐工具**：Kling 1.5+
- **时长**：5 秒
- **视频 Prompt**：
```
Medium close-up of the same 68-year-old Chinese man. Subject motion: his expression shifts from confusion to alertness to firmness over 3 seconds. He speaks firmly into phone, then hangs up, takes a long breath, leans back slightly. Camera static. Warm interior light. 35mm film, photorealistic. Duration 5 seconds.
```
- **后期添加**：Evans由黄色转回暖白光

---

### 镜头 13-A · 李明深夜书房疲惫
- **推荐工具**：Kling 1.5+
- **时长**：4 秒
- **视频 Prompt**：
```
Medium close-up profile of a 28-year-old Chinese man at home study late at night. Left hand props his head, right hand still on keyboard, facing laptop. Subject motion: very minimal, slight tired blink, slow breath. NO speech. He is just exhausted. Camera very slow dolly in. Cool white desk lamp light, cold blue-gray atmosphere. Window with city night beyond. 35mm film, photorealistic. Duration 4 seconds.
```
- **后期添加**：Evans轻轻脉动

---

### 镜头 13-B · 台灯色温转变
- **推荐工具**：Runway Gen-3
- **时长**：2 秒
- **视频 Prompt**：
```
Macro shot of an elegant desk lamp head. Subject motion: the light color gradually shifts from cool 5500K white to warm 2700K amber. Brightness also slowly reduces from 80% to 35%. Smooth gentle transition. Camera static. Blurred study background. 35mm film, photorealistic. Duration 2 seconds.
```

---

### 镜头 13-C · 智能音箱亮起
- **推荐工具**：Runway Gen-3
- **时长**：1 秒
- **视频 Prompt**：
```
Macro static shot of an elegant smart speaker on desk corner. Subject motion: soft warm indicator LED gently glows on. Blurred study background. 35mm film, photorealistic. Duration 1 second.
```

---

### 镜头 13-D · 桌面机器人送茶（CG）
- **推荐工具**：Blender
- **时长**：3 秒
- **视频 Prompt**：
```
Photorealistic CGI of an elegant small desktop companion robot. Rounded organic white body with warm light ring. Subject motion: robot silently slides along desktop, top tray gently rises bearing a ceramic teacup of steaming tea. Robot stops at man's reach. Movement is silent, slow, never intrusive. Camera very slow dolly in. Warm desk lamp light. Composited into live action study. 35mm film aesthetic, photorealistic. Duration 3 seconds.
```

---

### 镜头 13-E · 浴室门口小屏
- **推荐工具**：Runway Gen-3
- **时长**：1.5 秒
- **视频 Prompt**：
```
Static shot through study doorway into dim hallway. Bathroom door visible with small wall-mounted display. Subject motion: display gently illuminates with soft glow. Screen content stays blank for post-overlay. Dim warm hallway lighting. 35mm film, photorealistic. Duration 1.5 seconds.
```
- **后期添加**：小屏文字「热水已为你备好」

---

### 镜头 13-F · 手机屏幕弹卡片
- **推荐工具**：Runway Gen-3
- **时长**：2 秒
- **视频 Prompt**：
```
Macro static shot of smartphone face up on wooden desk. Subject motion: screen subtly illuminates from dark with very gentle pulse. Screen content remains blank for post-overlay. Warm desk lamp reflections on glass. 35mm film, photorealistic. Duration 2 seconds.
```
- **后期添加**：深夜会议协调卡片（「明早09:00的会议 → 已调整到11:00，你可以睡到8:30」）

---

### 镜头 13-G · 李明察觉变化合上电脑
- **推荐工具**：Kling 1.5+
- **时长**：6 秒
- **视频 Prompt**：
```
Medium close-up of the same Chinese man in study. Subject motion: he slowly raises his head, eyes look left then right, scanning the room as he notices it has warmed. Eyes settle, shoulders drop with relief. He releases a long breath. Both hands move to close the laptop gently. Camera static. Lighting is now warm and dim (after the lamp transition). 35mm film, photorealistic. Duration 6 seconds.
```
- **后期添加**：画外音「今晚你不用扛。」；字幕「它回应你说出口的需求，也回应你没说出口的疲惫。」

---
# Part 2 · 视频生成清单（镜头 14–26）

> **通用否定词**（所有 prompt 末尾添加）：  
> `--no neon, cyberpunk, futuristic UI, holographic, sci-fi blue glow, cartoon, anime, dramatic expression, theatrical, posed, model-like, ai-generated face`

---

## 第五幕 · 它如何陪你 [03:10 – 03:58]

---

### 镜头 14-A · 陈建国捧 iPad
- **推荐工具**：Kling 1.5+ / Hailuo
- **时长**：3 秒
- **视频 Prompt**：
```
Medium half-profile of a 68-year-old Chinese man with silver hair in dim living room at night. Holds iPad with both hands. Single warm table lamp lights the scene. Subject motion: he gently exhales, lips part to speak quietly. Camera very slow dolly in. 35mm film, photorealistic. Duration 3 seconds.
```
- **后期添加**：旁白（陈建国）「Evans，给我看看……我这一辈子，认识过多少人。」

---

### 镜头 14-B · iPad 关系图谱（空白屏）
- **推荐工具**：Runway Gen-3
- **时长**：6 秒
- **视频 Prompt**：
```
Extreme close-up of iPad screen in elderly Chinese man's hands. Screen remains completely blank and dim throughout. Subject motion: hands very steady. Slight warm lamp reflection on glass. Camera very slow dolly in over 6 seconds. 35mm film, photorealistic. NO UI on screen. Duration 6 seconds.
```
- **⚠️ 关键**：关系图谱星座（所有节点/连线/陈兰特殊节点）全部后期合成

---

### 镜头 14-C · 陈建国触碰屏幕 + 音箱响起
- **推荐工具**：Kling 1.5+（人物）/ Runway Gen-3（音箱）
- **时长**：3 秒（2s人物 + 1s音箱）

**14-C-1 人物**：
```
Medium half-profile close-up of a 68-year-old Chinese man. Subject motion: eyes glisten with tears, faint smile forms, he gently raises finger to touch iPad screen. Camera static. Dim warm lamp light. Deep emotional moment, restrained not theatrical. 35mm film, photorealistic. Duration 2 seconds.
```

**14-C-2 音箱**：
```
Macro shot of a minimalist smart speaker on bookshelf. Subject motion: warm indicator LED gently illuminates. Dim warm background. 35mm film, photorealistic. Duration 1 second.
```
- **后期添加**：音箱播放录音「建国，你又熬夜批作业了。早点睡。」（陈兰录音）

---

### 镜头 15-A · 陈建国对窗讲述
- **推荐工具**：Kling 1.5+
- **时长**：3 秒
- **视频 Prompt**：
```
Medium side profile static shot of a 68-year-old Chinese man at window late at night. Gazes peacefully out into dark city. iPad softly blurred in foreground on desk. Subject motion: lips slowly part, he begins to speak quietly, almost to himself, with natural hesitation and pauses. Warm lamp light. 35mm film, photorealistic. Duration 3 seconds.
```
- **后期添加**：旁白（陈建国，真实退休老师录音）「1985年的冬天，北京的雪很大。我第一次见到她……」

---

### 镜头 15-B · iPad 书籍排版（空白屏）
- **推荐工具**：Runway Gen-3
- **时长**：6 秒
- **视频 Prompt**：
```
Close-up over-the-shoulder of iPad on wooden desk. Screen completely blank. Elderly Chinese man's profile softly blurred in background. Subject motion: minimal ambient. Camera very slow dolly in over 6 seconds. Warm lamp light. 35mm film, photorealistic. NO UI on screen. Duration 6 seconds.
```
- **⚠️ 关键**：《我这一生》书籍排版 UI（书名/目录/正文）全部后期合成；**正文渐显，非打字机效果**

---

### 镜头 15-C · 老人继续讲述
- **推荐工具**：Kling 1.5+
- **时长**：3 秒
- **视频 Prompt**：
```
Medium side profile of the elderly Chinese man at window. Subject motion: he continues to speak slowly, eyes occasionally close briefly as he recalls. Natural hesitations and pauses. Camera static. Warm lamp light. 35mm film, photorealistic. Duration 3 seconds.
```

---

### 镜头 16-A · 周慧芳办公室挂电话
- **推荐工具**：Kling 1.5+ / Hailuo
- **时长**：3 秒
- **视频 Prompt**：
```
Medium close-up of a tired 45-year-old Chinese woman in a clean white modern office. Subject motion: she has just lowered her phone from her ear, sighs slightly, looks at phone screen with mild frown. Hand briefly rubs forehead. Open takeout lunch on desk. Blurred office background. Static camera. Natural office lighting. 35mm film, photorealistic. Duration 3 seconds.
```

---

### 镜头 16-B · 手机屏幕代际翻译（空白屏）
- **推荐工具**：Runway Gen-3
- **时长**：4 秒
- **视频 Prompt**：
```
Macro close-up static shot of smartphone in Chinese woman's hand at office desk. Screen completely blank throughout. Subject motion: hand stays steady, very subtle thumb shift. 35mm film, photorealistic. Duration 4 seconds.
```
- **⚠️ 关键**：代际翻译卡片（「表面言语→真实含义」）全部后期合成

---

### 镜头 16-C · 慧芳拨号 + 老母亲接电话
- **推荐工具**：Kling 1.5+（两段分别生成，后期叠加）
- **时长**：3 秒

**16-C-1 慧芳**：
```
Medium close-up of the same 45-year-old Chinese woman. Subject motion: eyes moisten, she gently raises smartphone to dial. Soft emotional realization. Camera static. 35mm film, photorealistic. Duration 3 seconds.
```

**16-C-2 老母亲**：
```
Medium close-up of a 72-year-old Chinese woman in traditional home kitchen. Subject motion: she picks up landline phone, face immediately lights up with joy at recognizing caller. Warm afternoon home light. Traditional Chinese domestic interior. 35mm film, photorealistic. Duration 2 seconds.
```
- **后期合成**：两画面柔光叠加（分屏或重叠虚化过渡）

---

### 镜头 17 · 共生人格雷达图
- **推荐工具**：**After Effects / 动效设计师制作**（不使用 AI 视频）
- **时长**：8 秒
- **说明**：纯后期动效，不需要 AI 视频生成。参考 IMG-51 概念图。
- **动效规格**：
  - 纯黑背景，8 轴雷达图
  - 从正八边形（出厂状态）缓慢呼吸式变形为有机不规则形态（1247天后）
  - 颜色：暖金 #c8a96e + 奶油 #e8e6e0，无霓虹
  - 旁边数值滚动：主动性 0.50→0.42 / 节奏 0.50→0.70 / 情感细腻度 0.50→0.83 等
  - 下方：「对你的了解：0%→78%」「陪伴天数：1→1,247」
  - 最后画面一分为二：左出厂/右专属

---

### 镜头 18-A · 老人背影对窗讲述
- **推荐工具**：Kling 1.5+
- **时长**：3 秒
- **视频 Prompt**：
```
Medium back-shot of an elderly figure at window at night. Face obscured or seen only as soft silhouette — identity must be ambiguous. Subject motion: lips move quietly, slow gentle speech, very still otherwise. Warm dim desk lamp light. Camera very slow dolly in. 35mm film, photorealistic. Duration 3 seconds.
```
- **后期添加**：旁白「宝啊，等你18岁的时候，爷爷想跟你说一件事……」

---

### 镜头 18-B · iPad 时间胶囊（空白屏）
- **推荐工具**：Runway Gen-3
- **时长**：3 秒
- **视频 Prompt**：
```
Close-up static shot of iPad on wooden desk in dim study. Screen completely blank. Elderly hands visible at frame edge. Dim warm light. 35mm film, photorealistic. NO UI on screen. Duration 3 seconds.
```
- **⚠️ 关键**：时间胶囊卡片 UI 全部后期合成

---

## 第六幕 · 该不该说话 [03:58 – 04:23]

---

### 镜头 19-A · 李明窗前（Evans 不亮）
- **推荐工具**：Kling 1.5+
- **时长**：10 秒
- **视频 Prompt**：
```
Medium shot of a 28-year-old Chinese man standing alone at apartment window at night, holding glass of water. Subject motion: he stares out at city neon, lips mouth something quietly to himself, he takes a small sip. Camera very slowly dollies in to close-up of his chest area. CRITICAL: the brooch on his chest must NOT emit any glow throughout the entire shot. It remains completely dark and dormant. Cold blue-gray atmosphere with distant warm city neon. 35mm film, photorealistic. Duration 10 seconds.
```
- **⚠️ 关键**：Evans胸针全程不亮——这是全片最重要的克制时刻

---

### 镜头 20 · 全屏静默字幕
- **推荐工具**：**After Effects / 后期制作**（不使用 AI 视频）
- **时长**：7 秒
- **说明**：纯黑背景 + 字幕，完全静默，无任何音效。
- **规格**：
  - 背景：纯黑 #000000
  - 字幕居中，白色渐显并保持：「在这个时刻，沉默是它经过判断后的主动选择。」
  - 渐显1.5s → 停留4s → 渐隐1.5s
  - 音频：完全静音（0dB）

---

### 镜头 21-A · 李明主动开口（Evans 才亮）
- **推荐工具**：Kling 1.5+
- **时长**：8 秒
- **视频 Prompt**：
```
Medium close-up of the same 28-year-old Chinese man by apartment window at night. He is now calmer. Subject motion: he glances down at his chest, gently asks "Evans?" After a brief pause of about 1 second, the brooch on his chest gently illuminates with warm soft glow. Camera static. Dim city neon background is now quieter. 35mm film, photorealistic. Duration 8 seconds.
```
- **⚠️ 关键**：Evans发光时机——必须在说完「Evans?」后约1秒才亮，不能同步亮起

---

## 第七幕 · 一生 [04:23 – 04:40]

---

### 镜头 22 · 童年组蒙太奇（3个镜头各1秒）

**22-A 孩子按住Evans**：
- **推荐工具**：Runway Gen-3
```
Close-up static shot of a young child's small hand on father's chest brooch. Subject motion: tiny fingers gently explore the brooch surface. Father's blurred face in background. Warm intimate afternoon light. 35mm film, photorealistic. Duration 1 second.
```

**22-B 高中生窗边微笑**：
- **推荐工具**：Kling 1.5+
```
Medium close-up of a 16-year-old Chinese boy in school uniform at window. Subject motion: he gazes out window, a quiet smile gradually forms. Brooch on chest has very faint warm glow. Late afternoon light. 35mm film, photorealistic. Duration 1 second.
```

**22-C 情侣咖啡馆**：
- **推荐工具**：Kling 1.5+
```
Medium shot of a young Chinese couple at cafe table. Subject motion: they share a soft laugh, lean slightly toward each other. Both wear small brooches on their chests. Warm cafe lighting, blurred cafe background. 35mm film, photorealistic. Duration 1 second.
```

---

### 镜头 23 · 中年组蒙太奇（3个镜头各1秒）

**23-A 产妇抱新生儿**：
- **推荐工具**：Kling 1.5+
```
Medium close-up of a 30-year-old Chinese new mother cradling a newborn baby against her chest. She gazes down at baby with quiet joy, gently sways. Brooch visible near baby's face. Soft natural delivery room light. 35mm film, photorealistic. Duration 1 second.
```

**23-B 母亲厨房做饭**：
- **推荐工具**：Kling 1.5+
```
Medium shot of a 45-year-old Chinese mother cooking in home kitchen. Subject motion: she stirs a pot, glances down at it. Apron, brooch visible with warm glow. Warm evening kitchen light. 35mm film, photorealistic. Duration 1 second.
```

**23-C 老人花园修剪**：
- **推荐工具**：Kling 1.5+
```
Medium shot of a 60-year-old Chinese man pruning a bonsai in a small home garden. Subject motion: gentle careful pruning hand motion. Soft afternoon light. Brooch visible with warm glow. 35mm film, photorealistic. Duration 1 second.
```

---

### 镜头 24 · 老年组蒙太奇（3个镜头，最后1个2秒）

**24-A 老人散步背影（1秒）**：
- **推荐工具**：Runway Gen-3
```
Wide back shot of a 75-year-old Chinese person walking slowly down a tree-lined path in late afternoon. Subject motion: peaceful slow walking pace away from camera. Golden hour light filtering through autumn leaves. 35mm film, photorealistic. Duration 1 second.
```

**24-B 老人阳台喝茶（1秒）**：
- **推荐工具**：Kling 1.5+
```
Medium half-profile of a 75-year-old Chinese woman on a small home balcony with porcelain tea cup. Subject motion: slow gentle sip of tea, peaceful gaze into distance. Soft afternoon light. 35mm film, photorealistic. Duration 1 second.
```

**24-C 老人闭眼（2秒，延长）**：
- **推荐工具**：Kling 1.5+
```
Medium close-up of an 80-year-old Chinese person sitting peacefully with eyes gently closed. Subject motion: very still, gentle breathing only, faint serene smile. Brooch on chest emits steady warm glow. Soft afternoon window light. 35mm film, photorealistic. Duration 2 seconds.
```
- **后期添加**：字幕（贯穿22-24）「从你戴上它的第一天，到你不再需要它的那一天。」；主题曲完整再次响起+女声哼唱

---

### 镜头 25-A · 灵魂传承彩蛋
- **推荐工具**：Kling 1.5+
- **时长**：5 秒
- **视频 Prompt**：
```
Medium close-up of a 20-year-old young Chinese woman in her bedroom. She has earbuds in, holds smartphone. Subject motion: tears well up in her eyes, a tender smile forms, she gently closes her eyes briefly. Brooch on sweater chest. iPad on desk beside her with blank screen for post composite. Warm bedroom afternoon light. Camera static. 35mm film, photorealistic. Deep emotional moment, restrained. Duration 5 seconds.
```
- **后期合成**：iPad 屏幕叠加《我这一生·陈建国》书籍封面

---

### 镜头 26-A · 落版
- **推荐工具**：Cinema4D / Blender（专业 3D 渲染）
- **时长**：3 秒
- **视频 Prompt**：
```
Centered static shot on pure black background. Small brooch silhouette in center of frame. Inside the silhouette, a warm amber glow ring slowly breathes — brightens, dims, brightens. Octane render, photorealistic CGI product aesthetic. Duration 3 seconds.
```
- **后期添加**：字幕依次浮现：**Evans** → *Lifelong.* → *陪你一生的 AI 共生体。*；钢琴最后一个单音与开场呼应

---

## 视频生成汇总表

| 镜头 | 工具 | 时长 | 是否需要空白屏 | 是否CG合成 |
|------|------|------|--------------|-----------|
| 01 | Kling | 5s | 否 | 否 |
| 02-A/B/C | Runway | 2.5s×3 | 否 | 否 |
| 03-A | Blender/C4D | 12s | 否 | 是（产品） |
| 04-A | Blender/C4D | 7s | 否 | 是（产品） |
| 05-A/B/C | Blender/C4D | 2s×3 | 否 | 是（产品） |
| 06-A | Blender/C4D | 7s | 否 | 是（产品） |
| 07-A | Kling | 10s | 否 | 否 |
| 08-A | Kling | 5s | 否 | 否 |
| 08-B | Kling | 14s | **是** | 否 |
| 08-C | Kling | 6s | 否 | 否 |
| 09-A | Kling/Hailuo | 4s | 是（笔电屏） | 否 |
| 09-B | Runway | 13s | **是** | 否 |
| 09-C | Kling | 6s | 否 | 否 |
| 10-A | Kling | 5s | 否 | 否 |
| 10-B | Runway | 12s | 否（空桌） | 否 |
| 10-C | Kling | 5s | 否 | 否 |
| 11-A | Kling | 4s | 否 | 否 |
| 11-B | Sora | 2s | 否 | 否（空场景） |
| 11-C/D/E/F | Blender | 4/1.5/2/1.5s | 否 | **是（机器人）** |
| 11-G | Runway | 1.5s×2 | 是（屏） | 否 |
| 11-H | 复用11-B | — | — | — |
| 11-I | Kling | 5s | 否 | 是（机器人合成） |
| 12-A | Kling/Hailuo | 4s | 否 | 否 |
| 12-B | Runway | 11s | **是** | 否 |
| 12-C | Kling | 5s | 否 | 否 |
| 13-A | Kling | 4s | 否 | 否 |
| 13-B/C | Runway | 2/1s | 否 | 否 |
| 13-D | Blender | 3s | 否 | **是（机器人）** |
| 13-E/F | Runway | 1.5/2s | 是 | 否 |
| 13-G | Kling | 6s | 否 | 否 |
| 14-A | Kling/Hailuo | 3s | 否 | 否 |
| 14-B | Runway | 6s | **是** | 否 |
| 14-C | Kling/Runway | 2+1s | 否 | 否 |
| 15-A/B/C | Kling/Runway | 3/6/3s | 是（15-B） | 否 |
| 16-A/B | Kling/Runway | 3/4s | 是（16-B） | 否 |
| 16-C | Kling | 3+2s | 否 | 否（叠加） |
| 17 | **AE动效** | 8s | — | — |
| 18-A/B | Kling/Runway | 3/3s | 是（18-B） | 否 |
| 19-A | Kling | 10s | 否 | 否 |
| 20 | **AE后期** | 7s | — | — |
| 21-A | Kling | 8s | 否 | 否 |
| 22-A/B/C | Runway/Kling | 1s×3 | 否 | 否 |
| 23-A/B/C | Kling | 1s×3 | 否 | 否 |
| 24-A/B/C | Runway/Kling | 1/1/2s | 否 | 否 |
| 25-A | Kling | 5s | 是（iPad） | 否 |
| 26-A | Blender/C4D | 3s | 否 | 是（产品） |

---
# Part 3 · 剪辑与后期制作方案

---

## 3.1 全片时间线总览

| 时间码入 | 时间码出 | 镜头 | 内容摘要 | 时长 | 转场（入） |
|---------|---------|------|---------|------|----------|
| 00:00 | 00:05 | 01-A | 茶杯握起 | 5s | 渐显(fade in 1s) |
| 00:05 | 00:07.5 | 02-A | 婴儿之手 | 2.5s | dissolve 0.5s |
| 00:07.5 | 00:10 | 02-B | 青年之手 | 2.5s | dissolve 0.5s |
| 00:10 | 00:12.5 | 02-C | 老年之手 | 2.5s | dissolve 0.5s |
| 00:12.5 | 00:25 | 03-A | Evans 首次亮相（产品） | 12.5s | dissolve 0.5s |
| **00:25** | — | — | **第一幕→第二幕** | — | **白闪切 white flash 0.3s** |
| 00:25 | 00:32 | 04-A | 360° 环绕 | 7s | white flash 接硬切 |
| 00:32 | 00:34 | 05-A | 麦克风阵列 | 2s | hard cut |
| 00:34 | 00:36 | 05-B | 心率传感器 | 2s | hard cut |
| 00:36 | 00:38 | 05-C | NPU 工艺线条 | 2s | hard cut |
| 00:38 | 00:45 | 06-A | 形态变换（项链） | 7s | dissolve 0.5s |
| 00:45 | 00:55 | 07-A | 佩戴瞬间 | 10s | dissolve 0.5s |
| **00:55** | — | — | **第二幕→第三幕** | — | **hard cut 硬切** |
| 00:55 | 01:00 | 08-A | 李明地铁晨间 | 5s | hard cut |
| 01:00 | 01:14 | 08-B | 手机屏幕（空白+UI合成） | 14s | dissolve 0.3s |
| 01:14 | 01:20 | 08-C | 李明抬头平静 | 6s | hard cut |
| 01:20 | 01:24 | 09-A | 林涵宿舍开机 | 4s | dissolve 0.5s |
| 01:24 | 01:37 | 09-B | 电脑屏幕（空白+UI合成） | 13s | dissolve 0.3s |
| 01:37 | 01:43 | 09-C | 林涵端茶舒缓 | 6s | hard cut |
| 01:43 | 01:48 | 10-A | 苏婷窗前挂电话 | 5s | dissolve 0.5s |
| 01:48 | 02:00 | 10-B | 办公桌面（空桌+UI合成） | 12s | dissolve 0.3s |
| 02:00 | 02:05 | 10-C | 苏婷轻笑转身 | 5s | hard cut |
| **02:05** | — | — | **第三幕→第四幕** | — | **dissolve 1s** |
| 02:05 | 02:09 | 11-A | 李明下班回家 | 4s | dissolve 1s |
| 02:09 | 02:11 | 11-B | 俯瞰调度（空场景） | 2s | dissolve 0.5s |
| 02:11 | 02:15 | 11-C | 机械臂取水（CG） | 4s | dissolve 0.5s |
| 02:15 | 02:16.5 | 11-D | 机器人启动（CG） | 1.5s | hard cut |
| 02:16.5 | 02:18.5 | 11-E | 机器人滑行（CG） | 2s | hard cut |
| 02:18.5 | 02:20 | 11-F | 机械臂→托盘（CG） | 1.5s | hard cut |
| 02:20 | 02:21.5 | 11-G-1 | 智能屏幕点亮 | 1.5s | hard cut |
| 02:21.5 | 02:23 | 11-G-2 | 灯光色温变化 | 1.5s | hard cut |
| 02:23 | 02:24 | 11-H | 调度收束（复用11-B） | 1s | dissolve 0.3s |
| 02:24 | 02:29 | 11-I | 李明接水（真人+CG） | 5s | dissolve 0.5s |
| 02:29 | 02:33 | 12-A | 陈建国接诈骗电话 | 4s | dissolve 1s |
| 02:33 | 02:44 | 12-B | 手机三联核验（空白+UI） | 11s | dissolve 0.3s |
| 02:44 | 02:49 | 12-C | 陈建国挂断电话 | 5s | hard cut |
| 02:49 | 02:53 | 13-A | 李明深夜书房疲惫 | 4s | dissolve 1s |
| 02:53 | 02:55 | 13-B | 台灯色温转变 | 2s | dissolve 0.5s |
| 02:55 | 02:56 | 13-C | 音箱亮起 | 1s | hard cut |
| 02:56 | 02:59 | 13-D | 桌面机器人送茶（CG） | 3s | dissolve 0.5s |
| 02:59 | 03:00.5 | 13-E | 浴室小屏 | 1.5s | hard cut |
| 03:00.5 | 03:02.5 | 13-F | 手机卡片弹出 | 2s | hard cut |
| 03:02.5 | 03:08.5 | 13-G | 李明察觉合上电脑 | 6s | dissolve 0.5s |
| **03:10** | — | — | **第三→第四幕结束/第五幕** | — | **dissolve 1.5s** |
| 03:10 | 03:13 | 14-A | 陈建国捧iPad | 3s | dissolve 1.5s |
| 03:13 | 03:19 | 14-B | iPad关系图谱（空白+UI） | 6s | dissolve 0.5s |
| 03:19 | 03:22 | 14-C | 触屏+音箱响起 | 3s | hard cut |
| 03:22 | 03:25 | 15-A | 陈建国对窗讲述 | 3s | dissolve 0.5s |
| 03:25 | 03:31 | 15-B | iPad书籍排版（空白+UI） | 6s | dissolve 0.3s |
| 03:31 | 03:34 | 15-C | 老人继续讲述 | 3s | hard cut |
| 03:34 | 03:37 | 16-A | 慧芳办公室挂电话 | 3s | dissolve 0.5s |
| 03:37 | 03:41 | 16-B | 手机代际翻译（空白+UI） | 4s | dissolve 0.3s |
| 03:41 | 03:44 | 16-C | 慧芳拨号+老母亲接电话 | 3s | hard cut+叠化 |
| 03:44 | 03:52 | 17 | 共生人格雷达图（AE） | 8s | dissolve 0.5s |
| 03:52 | 03:55 | 18-A | 老人背影对窗 | 3s | dissolve 0.5s |
| 03:55 | 03:58 | 18-B | iPad时间胶囊（空白+UI） | 3s | dissolve 0.3s |
| **03:58** | — | — | **第五幕→第六幕** | — | **hard cut 硬切** |
| 03:58 | 04:08 | 19-A | 李明窗前Evans不亮 | 10s | hard cut |
| 04:08 | 04:15 | 20 | 全屏静默字幕（AE） | 7s | hard cut（音乐骤停） |
| 04:15 | 04:23 | 21-A | 李明主动开口Evans亮 | 8s | hard cut |
| **04:23** | — | — | **第六幕→第七幕** | — | **dissolve 0.5s** |
| 04:23 | 04:24 | 22-A | 孩子按Evans | 1s | dissolve 0.5s |
| 04:24 | 04:25 | 22-B | 高中生微笑 | 1s | dissolve 0.3s |
| 04:25 | 04:26 | 22-C | 情侣咖啡馆 | 1s | dissolve 0.3s |
| 04:26 | 04:27 | 23-A | 产妇抱新生儿 | 1s | dissolve 0.3s |
| 04:27 | 04:28 | 23-B | 母亲做饭 | 1s | dissolve 0.3s |
| 04:28 | 04:29 | 23-C | 老人修剪 | 1s | dissolve 0.3s |
| 04:29 | 04:30 | 24-A | 老人散步背影 | 1s | dissolve 0.3s |
| 04:30 | 04:31 | 24-B | 老人阳台喝茶 | 1s | dissolve 0.3s |
| 04:31 | 04:33 | 24-C | 老人闭眼Evans亮（延长） | 2s | dissolve 0.5s |
| 04:33 | 04:38 | 25-A | 灵魂传承彩蛋 | 5s | dissolve 0.5s |
| 04:38 | 04:41 | 26-A | 落版Evans标识 | 3s | dissolve 0.5s |
| 04:41 | 04:43 | — | 黑场收尾 | 2s | fade to black 1s |

**总时长：约 4 分 43 秒**

---

## 3.2 字幕完整清单

> **统一字幕规范**：  
> - 字体：**思源宋体 Light**（中文）/ EB Garamond Light（英文）  
> - 颜色：`#FAEDD6`（暖白）  
> - 位置：居中（特殊标注除外）  
> - 动效：**渐显 0.8s → 停留 → 渐隐 0.5s**（禁止滑入/弹出/打字机）  
> - 字号：主字幕 48px / 小字 28px（1080p基准）

| # | 出现时间 | 消失时间 | 内容 | 对齐 | 备注 |
|---|---------|---------|------|------|------|
| Z01 | 00:03 | 00:05 | 如果有一个存在， | 居中 | 第一行单独出现 |
| Z02 | 00:10 | 00:12.5 | 从你打开它的第一天，到你不再需要它的那一天。 | 居中 | 在02-C时出现 |
| Z03 | 00:21 | 00:25 | **Evans**（大字）陪你一生的 AI 共生体（小字） | 居中 | 镜头03-A最后4秒 |
| Z04 | 00:27 | 00:32 | 主体重量 23 克 | 左下小字 | 镜头04-A期间 |
| Z05 | 00:32 | 00:38 | 六轴 IMU · 四麦克风阵列（第1行）多模态生理传感（第2行）端侧低功耗 NPU · 36小时续航（第3行） | 居中逐行浮现 | 镜头05期间，三行依次出现 |
| Z06 | 00:42 | 00:45 | 胸针 / 项链 · 两种形态 | 居中 | 镜头06-A期间 |
| Z07 | 00:51 | 00:55 | 戴上它，然后，把它忘掉。 | 居中 | 镜头07-A后半段 |
| Z08 | 01:18 | 01:22 | 从你想到一件事，到事情开始动，只需要一秒。 | 居中 | 镜头08-C抬头后 |
| Z09 | 01:41 | 01:45 | 138 条信息。它替你看清，真正属于你的，只有 5 条。 | 居中 | 镜头09-C期间 |
| Z10 | 02:02 | 02:05 | 它不告诉你怎么选，它告诉你，你还可以怎么选。 | 居中 | 镜头10-C期间 |
| Z11 | 02:27 | 02:29 | 它，是你的大脑。机器，是它的手。 | 居中慢速浮现 | 镜头11-I后半段 |
| Z12 | 02:47 | 02:49 | 最重要的介入，是不让骗子，得到那一秒。 | 居中 | 镜头12-C期间 |
| Z13 | 03:05 | 03:09 | 它回应你说出口的需求，也回应你没说出口的疲惫。 | 居中 | 镜头13-G后半段 |
| Z14 | 03:20 | 03:24 | 它记得你身边的每一个人。也记得，你以为已经忘了的人。 | 居中 | 镜头14-C后 |
| Z15 | 03:33 | 03:37 | 它替你写一本，只属于你的书。 | 居中 | 镜头15-C期间 |
| Z16 | 03:43 | 03:47 | 它不替代亲情，它翻译亲情。 | 居中 | 镜头16-C后 |
| Z17 | 03:49 | 03:54 | 每一个 Evans，都不一样。因为每一个人，都不一样。 | 居中 | 镜头17后段 |
| Z18 | 03:57 | 04:00 | 有些话，你说给十年后的人听。 | 居中 | 镜头18-B期间 |
| Z19 | 04:05 | 04:10 | Evans 选择不说话。 | 居中 | 镜头19-A后段（仅文字，无音效） |
| Z20 | 04:08 | 04:15 | 在这个时刻，沉默是它经过判断后的主动选择。 | 居中 | 镜头20全屏（完全黑底静默） |
| Z21 | 04:19 | 04:23 | 真正成熟的 AI，知道什么时候应该不说话。 | 居中 | 镜头21-A后段 |
| Z22 | 04:27 | 04:33 | 从你戴上它的第一天，到你不再需要它的那一天。 | 居中慢速 | 贯穿镜头22-24（与Z02呼应） |
| Z23 | 04:35 | 04:39 | 一台设备会换，一个灵魂，陪你一生。 | 居中 | 镜头25-A期间 |
| Z24 | 04:39 | 04:43 | **Evans**（大字）*Lifelong.*（斜体英文）陪你一生的 AI 共生体。（小字） | 居中依次浮现 | 落版三行依次出现 |

**共 24 段字幕**

---
## 3.3 UI 浮层代码（UI-01 至 UI-04）

> 所有 UI 浮层均为独立 HTML 文件，可在浏览器中全屏预览，也可用 Electron/Puppeteer 录制为透明背景视频后合成到素材上。  
> 配色遵循 Evans 视觉规范：背景 `#07080a` / 文字 `#e8e6e0` / 金色 `#c8a96e` / 暗青 `#3a6a5a`

---

### UI-01 · 镜头 08-B · 跨工具调度界面

```html
<!DOCTYPE html>
<html lang="zh">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Evans UI-01 跨工具调度</title>
<link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500&family=EB+Garamond:wght@400;500&display=swap" rel="stylesheet">
<style>
* { margin: 0; padding: 0; box-sizing: border-box; }
body {
  background: rgba(7,8,10,0.88);
  color: #e8e6e0;
  font-family: 'Space Grotesk', sans-serif;
  width: 390px;
  min-height: 600px;
  padding: 20px;
  border-radius: 16px;
  overflow: hidden;
}
.icons-row {
  display: flex;
  justify-content: space-around;
  margin-bottom: 18px;
  opacity: 0;
  animation: fadeUp 0.4s ease forwards;
  animation-delay: 0.1s;
}
.icon-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
  opacity: 0;
}
.icon-item:nth-child(1) { animation: glowIn 0.3s ease forwards 0.3s; }
.icon-item:nth-child(2) { animation: glowIn 0.3s ease forwards 0.6s; }
.icon-item:nth-child(3) { animation: glowIn 0.3s ease forwards 0.9s; }
.icon-item:nth-child(4) { animation: glowIn 0.3s ease forwards 1.2s; }
.icon-item:nth-child(5) { animation: glowIn 0.3s ease forwards 1.5s; }
.icon-circle {
  width: 44px; height: 44px;
  border-radius: 12px;
  background: rgba(200,169,110,0.12);
  border: 1px solid rgba(200,169,110,0.3);
  display: flex; align-items: center; justify-content: center;
  font-size: 22px;
  box-shadow: 0 0 12px rgba(200,169,110,0.2);
}
.icon-label { font-size: 10px; color: #c8a96e; opacity: 0.8; }
.light-beam {
  height: 1px;
  background: linear-gradient(to right, transparent, #c8a96e, transparent);
  margin: 8px 0 18px;
  opacity: 0;
  animation: fadeIn 0.5s ease forwards 2s;
  box-shadow: 0 0 8px rgba(200,169,110,0.4);
}
.gantt { margin-bottom: 18px; }
.gantt-row {
  display: flex; align-items: center;
  margin-bottom: 8px;
  opacity: 0;
}
.gantt-row:nth-child(1) { animation: slideRight 0.4s ease forwards 2.2s; }
.gantt-row:nth-child(2) { animation: slideRight 0.4s ease forwards 2.5s; }
.gantt-row:nth-child(3) { animation: slideRight 0.4s ease forwards 2.8s; }
.gantt-label { width: 90px; font-size: 11px; color: #c8a96e; flex-shrink: 0; }
.gantt-bar-wrap { flex: 1; background: rgba(255,255,255,0.05); border-radius: 4px; height: 8px; overflow: hidden; }
.gantt-bar {
  height: 100%; border-radius: 4px;
  background: linear-gradient(to right, #c8a96e, #6ab8a0);
  animation: expandBar 0.6s ease forwards;
}
.gantt-row:nth-child(1) .gantt-bar { animation-delay: 2.4s; width: 0; }
.gantt-row:nth-child(2) .gantt-bar { animation-delay: 2.7s; width: 0; }
.gantt-row:nth-child(3) .gantt-bar { animation-delay: 3.0s; width: 0; }
.divider { height: 1px; background: rgba(200,169,110,0.15); margin: 12px 0; }
.action-cards { display: flex; flex-direction: column; gap: 8px; }
.card {
  display: flex; align-items: center; gap: 10px;
  padding: 8px 12px;
  background: rgba(200,169,110,0.08);
  border: 1px solid rgba(200,169,110,0.2);
  border-radius: 8px;
  font-size: 12px;
  opacity: 0;
}
.card:nth-child(1) { animation: fadeUp 0.35s ease forwards 3.1s; }
.card:nth-child(2) { animation: fadeUp 0.35s ease forwards 3.4s; }
.card:nth-child(3) { animation: fadeUp 0.35s ease forwards 3.7s; }
.check { color: #6ab8a0; font-size: 16px; }
.footer {
  margin-top: 14px; text-align: right;
  font-size: 10px; color: rgba(200,169,110,0.5);
  font-family: 'EB Garamond', serif; font-style: italic;
  opacity: 0;
  animation: fadeIn 0.5s ease forwards 4s;
}
@keyframes fadeUp { from { opacity:0; transform:translateY(8px); } to { opacity:1; transform:translateY(0); } }
@keyframes fadeIn { from { opacity:0; } to { opacity:1; } }
@keyframes glowIn { from { opacity:0; transform:scale(0.8); } to { opacity:1; transform:scale(1); } }
@keyframes slideRight { from { opacity:0; transform:translateX(-10px); } to { opacity:1; transform:translateX(0); } }
@keyframes expandBar { from { width:0%; } to { width: var(--w,75%); } }
.gantt-row:nth-child(1) .gantt-bar { --w: 68%; }
.gantt-row:nth-child(2) .gantt-bar { --w: 85%; }
.gantt-row:nth-child(3) .gantt-bar { --w: 52%; }
</style>
</head>
<body>
<div class="icons-row">
  <div class="icon-item"><div class="icon-circle">💬</div><span class="icon-label">微信</span></div>
  <div class="icon-item"><div class="icon-circle">📋</div><span class="icon-label">飞书</span></div>
  <div class="icon-item"><div class="icon-circle">📝</div><span class="icon-label">Notion</span></div>
  <div class="icon-item"><div class="icon-circle">📅</div><span class="icon-label">日历</span></div>
  <div class="icon-item"><div class="icon-circle">📧</div><span class="icon-label">邮件</span></div>
</div>
<div class="light-beam"></div>
<div class="gantt">
  <div class="gantt-row"><span class="gantt-label">banner改版</span><div class="gantt-bar-wrap"><div class="gantt-bar"></div></div></div>
  <div class="gantt-row"><span class="gantt-label">飞书项目页</span><div class="gantt-bar-wrap"><div class="gantt-bar"></div></div></div>
  <div class="gantt-row"><span class="gantt-label">周五评审</span><div class="gantt-bar-wrap"><div class="gantt-bar"></div></div></div>
</div>
<div class="divider"></div>
<div class="action-cards">
  <div class="card"><span class="check">✓</span><span>飞书项目页已创建</span></div>
  <div class="card"><span class="check">✓</span><span>给小蕾的 brief 草稿已起草</span></div>
  <div class="card"><span class="check">✓</span><span>周五评审日历邀请已发出</span></div>
</div>
<div class="footer">耗时 1.2 秒 · 跨越 5 个工具</div>
</body>
</html>
```

---

### UI-02 · 镜头 09-B · 信息洪流过滤界面

```html
<!DOCTYPE html>
<html lang="zh">
<head>
<meta charset="UTF-8">
<title>Evans UI-02 信息过滤</title>
<link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500&family=EB+Garamond:ital,wght@1,400&display=swap" rel="stylesheet">
<style>
* { margin:0; padding:0; box-sizing:border-box; }
body {
  background: rgba(7,8,10,0.92);
  color: #e8e6e0;
  font-family: 'Space Grotesk', sans-serif;
  width: 480px; min-height: 520px;
  padding: 28px 24px;
  border-radius: 16px;
}
.counter-row {
  display: flex; align-items: center; justify-content: center;
  gap: 24px; margin-bottom: 24px;
}
.big-num {
  font-size: 72px; font-weight: 300; line-height: 1;
  color: rgba(200,169,110,0.3);
  position: relative;
}
.big-num.active { color: #c8a96e; animation: numPulse 0.3s ease; }
.arrow-text {
  font-size: 28px; color: rgba(200,169,110,0.4);
  animation: fadeIn 0.5s ease forwards 1.5s; opacity: 0;
}
.num-final {
  font-size: 72px; font-weight: 500; line-height: 1;
  color: #6ab8a0;
  opacity: 0;
  animation: popIn 0.4s ease forwards 2s;
}
.label-row {
  text-align: center; font-size: 12px;
  color: rgba(200,169,110,0.5); margin-bottom: 20px;
  opacity: 0; animation: fadeIn 0.4s ease forwards 2.3s;
}
.section-title {
  font-size: 13px; color: #c8a96e; letter-spacing: 0.05em;
  margin-bottom: 12px;
  opacity: 0; animation: fadeIn 0.4s ease forwards 2.6s;
}
.todo-list { list-style: none; }
.todo-item {
  display: flex; gap: 10px; align-items: flex-start;
  padding: 9px 12px;
  border-left: 2px solid rgba(200,169,110,0.2);
  margin-bottom: 7px;
  font-size: 12px; line-height: 1.5;
  opacity: 0;
}
.todo-item:nth-child(1) { animation: slideIn 0.3s ease forwards 2.8s; }
.todo-item:nth-child(2) { animation: slideIn 0.3s ease forwards 3.0s; }
.todo-item:nth-child(3) { animation: slideIn 0.3s ease forwards 3.2s; }
.todo-item:nth-child(4) { animation: slideIn 0.3s ease forwards 3.4s; }
.todo-item:nth-child(5) { animation: slideIn 0.3s ease forwards 3.6s; }
.todo-num { color: #c8a96e; font-weight: 500; flex-shrink: 0; }
.divider { height: 1px; background: rgba(255,255,255,0.07); margin: 16px 0; }
.archived {
  font-size: 11px; color: rgba(200,169,110,0.35);
  font-family: 'EB Garamond', serif; font-style: italic;
  opacity: 0; animation: fadeIn 0.4s ease forwards 4s;
}
@keyframes fadeIn { from{opacity:0}to{opacity:1} }
@keyframes slideIn { from{opacity:0;transform:translateX(-8px)}to{opacity:1;transform:translateX(0)} }
@keyframes popIn { from{opacity:0;transform:scale(0.7)}to{opacity:1;transform:scale(1)} }
@keyframes numPulse { 0%{transform:scale(1)}50%{transform:scale(0.9)}100%{transform:scale(1)} }
</style>
</head>
<body>
<div class="counter-row">
  <div class="big-num" id="numFrom">138</div>
  <div class="arrow-text">→</div>
  <div class="num-final">5</div>
</div>
<div class="label-row">条信息 · 今日真要务</div>
<div class="section-title">今天需要你亲自处理的：5 件事</div>
<ul class="todo-list">
  <li class="todo-item"><span class="todo-num">①</span><span>导师论文意见（3 条已转文字 + 拆 todo）</span></li>
  <li class="todo-item"><span class="todo-num">②</span><span>答辩流程通知 → 已加日历</span></li>
  <li class="todo-item"><span class="todo-num">③</span><span>师姐文献 2 篇 → 已存 Zotero</span></li>
  <li class="todo-item"><span class="todo-num">④</span><span>实习公司周报 → 已用上周数据填好 60%</span></li>
  <li class="todo-item"><span class="todo-num">⑤</span><span>室友聚餐 → 我先回了「晚上跟你商量」</span></li>
</ul>
<div class="divider"></div>
<div class="archived">已自动归档营销邮件 75 封 · 重复公众号 8 个 · 群闲聊 22 条</div>
<script>
setTimeout(() => {
  let n = 138;
  const el = document.getElementById('numFrom');
  const iv = setInterval(() => {
    n = Math.max(5, n - Math.ceil((n-5)/4));
    el.textContent = n;
    el.classList.add('active');
    setTimeout(()=>el.classList.remove('active'),200);
    if(n <= 5) clearInterval(iv);
  }, 200);
}, 300);
</script>
</body>
</html>
```

---

### UI-03 · 镜头 10-B · 第三选项界面

```html
<!DOCTYPE html>
<html lang="zh">
<head>
<meta charset="UTF-8">
<title>Evans UI-03 第三选项</title>
<link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500&family=EB+Garamond:ital,wght@1,400&display=swap" rel="stylesheet">
<style>
* { margin:0; padding:0; box-sizing:border-box; }
body {
  background: rgba(7,8,10,0.90);
  color: #e8e6e0;
  font-family: 'Space Grotesk', sans-serif;
  width: 420px; padding: 24px;
  border-radius: 16px;
}
.headline {
  text-align: center; font-size: 15px; font-weight: 500;
  color: #c8a96e;
  border: 1px solid rgba(200,169,110,0.35);
  border-radius: 8px; padding: 10px 16px;
  margin-bottom: 20px;
  opacity: 0; animation: fadeIn 0.5s ease forwards 0.3s;
  box-shadow: 0 0 16px rgba(200,169,110,0.1);
}
.options-row {
  display: flex; gap: 12px; margin-bottom: 16px;
  opacity: 0; animation: fadeIn 0.5s ease forwards 0.7s;
}
.option-box {
  flex: 1; padding: 10px 12px;
  background: rgba(255,255,255,0.04);
  border: 1px solid rgba(255,255,255,0.1);
  border-radius: 8px; font-size: 11px; color: rgba(200,169,110,0.6);
  text-align: center;
}
.path-svg { width: 100%; height: 40px; margin-bottom: 16px; }
.schedule { margin-bottom: 16px; }
.sch-row {
  display: flex; gap: 12px; align-items: flex-start;
  padding: 7px 0; border-bottom: 1px solid rgba(255,255,255,0.05);
  font-size: 11px; opacity: 0;
}
.sch-row:nth-child(1) { animation: slideIn 0.3s ease forwards 1.8s; }
.sch-row:nth-child(2) { animation: slideIn 0.3s ease forwards 2.0s; }
.sch-row:nth-child(3) { animation: slideIn 0.3s ease forwards 2.2s; }
.sch-row:nth-child(4) { animation: slideIn 0.3s ease forwards 2.4s; }
.sch-row:nth-child(5) { animation: slideIn 0.3s ease forwards 2.6s; }
.sch-row:nth-child(6) { animation: slideIn 0.3s ease forwards 2.8s; }
.sch-time { width: 80px; flex-shrink:0; color: rgba(200,169,110,0.6); }
.sch-text { color: #e8e6e0; }
.sch-text.highlight { color: #c8a96e; font-weight: 500; }
.tags {
  display: flex; flex-wrap: wrap; gap: 8px; margin-top: 14px;
  opacity: 0; animation: fadeIn 0.4s ease forwards 3.2s;
}
.tag {
  font-size: 11px; padding: 4px 10px;
  background: rgba(200,169,110,0.1);
  border: 1px solid rgba(200,169,110,0.25);
  border-radius: 20px; color: #c8a96e;
}
@keyframes fadeIn { from{opacity:0}to{opacity:1} }
@keyframes slideIn { from{opacity:0;transform:translateY(5px)}to{opacity:1;transform:translateY(0)} }
@keyframes drawPath {
  from { stroke-dashoffset: 300; }
  to { stroke-dashoffset: 0; }
}
</style>
</head>
<body>
<div class="headline">你可能不需要二选一</div>
<div class="options-row">
  <div class="option-box">A<br>飞深圳见客户</div>
  <div class="option-box" style="color:rgba(200,169,110,0.6)">B<br>女儿家长会</div>
</div>
<svg class="path-svg" viewBox="0 0 420 40">
  <path d="M 70 20 Q 140 5 210 20 Q 280 35 350 20"
        stroke="#c8a96e" stroke-width="2" fill="none"
        stroke-dasharray="300" stroke-dashoffset="300"
        style="animation: drawPath 1s ease forwards 1.1s;" />
  <circle cx="210" cy="20" r="4" fill="#c8a96e"
          style="opacity:0; animation: fadeIn 0.3s ease forwards 2s;" />
</svg>
<div class="schedule">
  <div class="sch-row"><span class="sch-time">09:00–14:00</span><span class="sch-text">上海正常工作</span></div>
  <div class="sch-row"><span class="sch-time">15:00–16:30</span><span class="sch-text highlight">✓ 女儿幼儿园家长会（全程）</span></div>
  <div class="sch-row"><span class="sch-time">16:40</span><span class="sch-text">专车待命 → 浦东机场</span></div>
  <div class="sch-row"><span class="sch-time">17:50</span><span class="sch-text">午班航班 → 深圳</span></div>
  <div class="sch-row"><span class="sch-time">19:30</span><span class="sch-text highlight">✓ 见客户（晚餐）</span></div>
  <div class="sch-row"><span class="sch-time">22:30</span><span class="sch-text">返沪 · 00:00 到家</span></div>
</div>
<div class="tags">
  <span class="tag">✈ 航班已查询</span>
  <span class="tag">🚗 专车待命</span>
  <span class="tag">📧 客户邮件已起草</span>
  <span class="tag">🏫 家长会签到已预备</span>
</div>
</body>
</html>
```

---

### UI-04 · 镜头 12-B · AI 防诈骗三联核验屏

```html
<!DOCTYPE html>
<html lang="zh">
<head>
<meta charset="UTF-8">
<title>Evans UI-04 防诈骗核验</title>
<link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500&display=swap" rel="stylesheet">
<style>
* { margin:0; padding:0; box-sizing:border-box; }
body {
  background: rgba(7,8,10,0.93);
  color: #e8e6e0;
  font-family: 'Space Grotesk', sans-serif;
  width: 560px; padding: 20px;
  border-radius: 14px;
}
.three-cols {
  display: grid; grid-template-columns: 1fr 1fr 1fr;
  gap: 12px; margin-bottom: 16px;
}
.col {
  background: rgba(255,255,255,0.04);
  border: 1px solid rgba(255,255,255,0.1);
  border-radius: 10px; padding: 12px;
  opacity: 0;
}
.col:nth-child(1) { animation: fadeIn 0.4s ease forwards 0.3s; }
.col:nth-child(2) { animation: fadeIn 0.4s ease forwards 0.6s; }
.col:nth-child(3) { animation: fadeIn 0.4s ease forwards 0.9s; }
.col-title { font-size: 10px; color: #c8a96e; margin-bottom: 10px; letter-spacing:0.05em; }

/* 左列：声纹 */
.wave-wrap { height: 36px; position:relative; overflow:hidden; margin-bottom:8px; }
canvas { position:absolute; top:0; left:0; }
.gauge { text-align:center; font-size: 22px; font-weight:500;
  color: #e8532a; margin: 4px 0; }
.gauge-label { font-size: 10px; color: rgba(200,169,110,0.5); text-align:center; }
.badge-x { display:inline-block; background:#e8532a; color:#fff;
  border-radius:4px; font-size:10px; padding:2px 8px; margin-top:6px; }

/* 中列：话术 */
.phrase-list { list-style:none; }
.phrase-item {
  display:flex; justify-content:space-between; align-items:center;
  font-size: 10px; padding: 4px 0;
  border-bottom: 1px solid rgba(255,255,255,0.05);
  opacity: 0;
}
.phrase-item:nth-child(1) { animation: fadeIn 0.3s ease forwards 1.2s; }
.phrase-item:nth-child(2) { animation: fadeIn 0.3s ease forwards 1.5s; }
.phrase-item:nth-child(3) { animation: fadeIn 0.3s ease forwards 1.8s; }
.phrase-item:nth-child(4) { animation: fadeIn 0.3s ease forwards 2.1s; }
.phrase-item:nth-child(5) { animation: fadeIn 0.3s ease forwards 2.4s; }
.hit { color: #e8532a; font-size: 13px; }
.hit-rate { text-align:center; font-size:20px; font-weight:500;
  color:#e8532a; margin-top:8px;
  opacity:0; animation: fadeIn 0.3s ease forwards 2.7s; }

/* 右列：视频通话 */
.video-frame {
  background: rgba(58,106,90,0.2);
  border: 1px solid rgba(106,184,160,0.3);
  border-radius: 8px; padding: 10px;
  text-align: center;
}
.avatar { font-size: 36px; margin-bottom: 6px; }
.status { font-size: 10px; color: #6ab8a0; margin-bottom: 4px;
  opacity:0; animation: fadeIn 0.5s ease forwards 1.8s; }
.status::before { content:'● '; }
.speech-bubble {
  background: rgba(106,184,160,0.15);
  border-radius: 6px; padding: 6px 8px;
  font-size: 10px; color: #e8e6e0;
  opacity:0; animation: fadeIn 0.4s ease forwards 2.4s;
}

/* 骨传导提示条 */
.bone-bar {
  background: rgba(232,83,42,0.1);
  border: 1px solid rgba(232,83,42,0.3);
  border-radius: 8px; padding: 10px 14px;
  font-size: 11px; color: #e8e6e0; line-height: 1.6;
  opacity: 0; animation: fadeIn 0.5s ease forwards 3.0s;
}
.bone-meta { font-size: 9px; color: rgba(200,169,110,0.5); margin-top:4px; }

@keyframes fadeIn { from{opacity:0}to{opacity:1} }
</style>
</head>
<body>
<div class="three-cols">
  <!-- 左：声纹比对 -->
  <div class="col">
    <div class="col-title">声纹比对</div>
    <div class="wave-wrap">
      <canvas id="cv" width="160" height="36"></canvas>
    </div>
    <div class="gauge" id="gauge">—</div>
    <div class="gauge-label">相似度</div>
    <div style="text-align:center">
      <span class="badge-x" id="badgeX" style="display:none">❌ 不匹配</span>
    </div>
  </div>
  <!-- 中：话术匹配 -->
  <div class="col">
    <div class="col-title">话术特征匹配</div>
    <ul class="phrase-list">
      <li class="phrase-item"><span>声称家人出事</span><span class="hit">✓</span></li>
      <li class="phrase-item"><span>要求紧急转账</span><span class="hit">✓</span></li>
      <li class="phrase-item"><span>要求保密父母</span><span class="hit">✓</span></li>
      <li class="phrase-item"><span>号码异常（虚拟号段）</span><span class="hit">✓</span></li>
      <li class="phrase-item"><span>情绪施压</span><span class="hit">✓</span></li>
    </ul>
    <div class="hit-rate">命中率 91%</div>
  </div>
  <!-- 右：真孙子视频 -->
  <div class="col">
    <div class="col-title">Evans 静默呼叫</div>
    <div class="video-frame">
      <div class="avatar">👦</div>
      <div class="status">已接通</div>
      <div class="speech-bubble">「建国爷？我没事啊？」</div>
    </div>
  </div>
</div>
<div class="bone-bar">
  建国叔，这个声音不是陈宝。我已经接通了真孙子，您看一眼就明白了。
  <div class="bone-meta">🦴 骨传导 · 仅用户可听</div>
</div>
<script>
// 波形动画
const cv = document.getElementById('cv');
const ctx = cv.getContext('2d');
function drawWaves(t) {
  ctx.clearRect(0,0,160,36);
  // 来电波形（红色，不规则）
  ctx.beginPath(); ctx.strokeStyle='rgba(232,83,42,0.7)'; ctx.lineWidth=1.5;
  for(let x=0;x<160;x++) {
    const y = 18 + Math.sin(x*0.12+t)*8 + Math.sin(x*0.25+t*1.3)*5 + Math.random()*2;
    x===0 ? ctx.moveTo(x,y) : ctx.lineTo(x,y);
  }
  ctx.stroke();
  // 档案波形（蓝色，规则）
  ctx.beginPath(); ctx.strokeStyle='rgba(106,184,160,0.7)'; ctx.lineWidth=1.5;
  for(let x=0;x<160;x++) {
    const y = 18 + Math.sin(x*0.15)*6 + Math.sin(x*0.3)*3;
    x===0 ? ctx.moveTo(x,y) : ctx.lineTo(x,y);
  }
  ctx.stroke();
  requestAnimationFrame(()=>drawWaves(t+0.06));
}
drawWaves(0);
// 数字跳动
const gEl = document.getElementById('gauge');
const bEl = document.getElementById('badgeX');
setTimeout(()=>{
  let v = 0;
  const iv = setInterval(()=>{
    v = Math.min(32, v+Math.ceil((32-v)/4+1));
    gEl.textContent = v + '%';
    if(v>=32) { clearInterval(iv); bEl.style.display='inline-block'; }
  }, 120);
}, 800);
</script>
</body>
</html>
```

---
## 3.3 UI 浮层代码（UI-05 至 UI-09）

---

### UI-05 · 镜头 14-B · 关系图谱星座图

```html
<!DOCTYPE html>
<html lang="zh">
<head>
<meta charset="UTF-8">
<title>Evans UI-05 关系图谱</title>
<link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500&family=EB+Garamond:ital,wght@1,400&display=swap" rel="stylesheet">
<style>
* { margin:0; padding:0; box-sizing:border-box; }
body {
  background: rgba(7,8,10,0.90);
  color: #e8e6e0;
  font-family: 'Space Grotesk', sans-serif;
  width: 480px; height: 480px;
  border-radius: 16px;
  position: relative;
  overflow: hidden;
}
canvas { position:absolute; top:0; left:0; }
.center-label {
  position: absolute;
  top: 50%; left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
  pointer-events: none;
}
.center-name {
  font-size: 16px; font-weight: 500; color: #c8a96e;
  opacity: 0; animation: fadeIn 0.5s ease forwards 0.5s;
}
.center-sub {
  font-size: 10px; color: rgba(200,169,110,0.5);
  font-family: 'EB Garamond', serif; font-style: italic;
  opacity: 0; animation: fadeIn 0.5s ease forwards 0.8s;
}
.counter-label {
  position: absolute; bottom: 20px; right: 20px;
  font-size: 11px; color: rgba(200,169,110,0.5);
  text-align: right;
  opacity: 0; animation: fadeIn 0.5s ease forwards 3.5s;
}
.special-badge {
  position: absolute; bottom: 20px; left: 20px;
  font-size: 11px; color: #6ab8a0;
  opacity: 0; animation: fadeIn 0.5s ease forwards 4s;
}
@keyframes fadeIn { from{opacity:0}to{opacity:1} }
</style>
</head>
<body>
<canvas id="cv" width="480" height="480"></canvas>
<div class="center-label">
  <div class="center-name">陈建国</div>
  <div class="center-sub">1,247 天的记忆</div>
</div>
<div class="counter-label">已记录 341 位<br>关系节点</div>
<div class="special-badge">◉ 陈兰（2019年离世）</div>
<script>
const cv = document.getElementById('cv');
const ctx = cv.getContext('2d');
const W = 480, H = 480, CX = W/2, CY = H/2;

// 节点数据
const nodes = [
  { label:'陈宝', angle:310, r:90,  size:6, color:'#c8a96e', glow:true },
  { label:'陈兰', angle:50,  r:85,  size:8, color:'#6ab8a0', special:true },
  { label:'学生A',angle:140, r:120, size:4, color:'rgba(200,169,110,0.6)' },
  { label:'学生B',angle:170, r:100, size:4, color:'rgba(200,169,110,0.6)' },
  { label:'学生C',angle:200, r:130, size:3, color:'rgba(200,169,110,0.4)' },
  { label:'老同事',angle:240,r:110, size:4, color:'rgba(200,169,110,0.5)' },
  { label:'邻居王',angle:280,r:95,  size:4, color:'rgba(200,169,110,0.5)' },
  { label:'女儿',  angle:20,  r:75,  size:5, color:'#c8a96e' },
  { label:'老友张',angle:100, r:140, size:3, color:'rgba(200,169,110,0.4)' },
  { label:'医生',  angle:330, r:130, size:3, color:'rgba(200,169,110,0.4)' },
];

// 远处小节点（随机背景星）
const stars = Array.from({length:80}, () => ({
  x: Math.random()*W, y: Math.random()*H,
  r: Math.random()*1.5+0.5,
  a: Math.random()*0.3+0.1
}));

let progress = 0;
function draw(t) {
  progress = Math.min(1, progress + 0.008);
  ctx.clearRect(0,0,W,H);

  // 背景星点
  stars.forEach(s => {
    ctx.beginPath();
    ctx.arc(s.x, s.y, s.r, 0, Math.PI*2);
    ctx.fillStyle = `rgba(200,169,110,${s.a * progress})`;
    ctx.fill();
  });

  // 同心参考圆
  [80, 130, 175].forEach((r,i) => {
    ctx.beginPath();
    ctx.arc(CX, CY, r, 0, Math.PI*2);
    ctx.strokeStyle = `rgba(200,169,110,${0.06 * progress})`;
    ctx.lineWidth = 1;
    ctx.stroke();
  });

  const p = Math.min(1, progress * 1.4);

  // 连线 + 节点
  nodes.forEach((n, i) => {
    const nd = i / nodes.length;
    const np = Math.max(0, Math.min(1, (progress - nd*0.3) * 3));
    if (np <= 0) return;

    const rad = (n.angle - 90) * Math.PI / 180;
    const nx = CX + Math.cos(rad) * n.r;
    const ny = CY + Math.sin(rad) * n.r;

    // 连线
    ctx.beginPath();
    ctx.moveTo(CX, CY);
    ctx.lineTo(CX + (nx-CX)*np, CY + (ny-CY)*np);
    const lColor = n.special ? '#6ab8a0' : 'rgba(200,169,110,0.25)';
    ctx.strokeStyle = lColor;
    ctx.lineWidth = n.special ? 1.5 : 1;
    ctx.stroke();

    if (np < 1) return;

    // 节点光晕
    if (n.glow || n.special) {
      const grad = ctx.createRadialGradient(nx,ny,0,nx,ny,n.size*4);
      const gc = n.special ? '#6ab8a0' : '#c8a96e';
      grad.addColorStop(0, gc.replace(')', ',0.35)').replace('rgb','rgba').replace('#','rgba('));
      grad.addColorStop(1, 'transparent');
      ctx.beginPath(); ctx.arc(nx,ny,n.size*4,0,Math.PI*2);
      // 简单光晕
      ctx.shadowColor = n.special ? '#6ab8a0' : '#c8a96e';
      ctx.shadowBlur = 10;
      ctx.fillStyle = 'transparent'; ctx.fill();
      ctx.shadowBlur = 0;
    }

    // 节点本体
    ctx.beginPath();
    ctx.arc(nx, ny, n.size, 0, Math.PI*2);
    ctx.fillStyle = n.color;
    ctx.fill();

    // 特殊节点外环
    if (n.special) {
      ctx.beginPath();
      ctx.arc(nx, ny, n.size + 4 + Math.sin(t*0.05)*2, 0, Math.PI*2);
      ctx.strokeStyle = 'rgba(106,184,160,0.5)';
      ctx.lineWidth = 1; ctx.stroke();
    }

    // 标签
    ctx.fillStyle = n.special ? '#6ab8a0' : 'rgba(200,169,110,0.8)';
    ctx.font = `${n.special ? '500 ' : '300 '}11px "Space Grotesk"`;
    const lx = nx + (nx > CX ? n.size+5 : -(n.size+5));
    const la = nx > CX ? 'left' : 'right';
    ctx.textAlign = la;
    ctx.fillText(n.label, lx, ny + 4);
  });

  // 中心节点
  ctx.shadowColor = '#c8a96e';
  ctx.shadowBlur = 20 * progress;
  ctx.beginPath();
  ctx.arc(CX, CY, 10, 0, Math.PI*2);
  ctx.fillStyle = '#c8a96e';
  ctx.fill();
  ctx.shadowBlur = 0;

  requestAnimationFrame(tt => draw(tt));
}
draw(0);
</script>
</body>
</html>
```

---

### UI-06 · 镜头 15-B · 《我这一生》书籍排版

```html
<!DOCTYPE html>
<html lang="zh">
<head>
<meta charset="UTF-8">
<title>Evans UI-06 书籍排版</title>
<link href="https://fonts.googleapis.com/css2?family=EB+Garamond:ital,wght@0,400;0,500;1,400&family=Space+Grotesk:wght@300;400&display=swap" rel="stylesheet">
<style>
* { margin:0; padding:0; box-sizing:border-box; }
body {
  background: rgba(7,8,10,0.92);
  color: #e8e6e0;
  font-family: 'EB Garamond', serif;
  width: 420px; padding: 36px 40px;
  border-radius: 12px;
}
.book-meta {
  text-align: center; margin-bottom: 30px;
  opacity: 0; animation: fadeIn 0.8s ease forwards 0.3s;
}
.book-title {
  font-size: 28px; font-weight: 500; color: #c8a96e;
  letter-spacing: 0.08em; margin-bottom: 6px;
}
.book-sub {
  font-size: 12px; color: rgba(200,169,110,0.5);
  font-style: italic; letter-spacing: 0.1em;
}
.divider-ornament {
  text-align: center; color: rgba(200,169,110,0.35);
  font-size: 18px; margin: 16px 0;
  opacity: 0; animation: fadeIn 0.5s ease forwards 0.8s;
}
.toc { margin-bottom: 24px; }
.toc-item {
  display: flex; justify-content: space-between; align-items: baseline;
  padding: 5px 0;
  font-size: 13px; color: rgba(232,230,224,0.75);
  border-bottom: 1px dotted rgba(200,169,110,0.12);
  opacity: 0;
}
.toc-item:nth-child(1) { animation: fadeIn 0.4s ease forwards 1.1s; }
.toc-item:nth-child(2) { animation: fadeIn 0.4s ease forwards 1.3s; }
.toc-item:nth-child(3) { animation: fadeIn 0.4s ease forwards 1.5s; }
.toc-item:nth-child(4) { animation: fadeIn 0.4s ease forwards 1.7s; }
.toc-item:nth-child(5) { animation: fadeIn 0.4s ease forwards 1.9s; }
.toc-item.current { color: #c8a96e; font-weight: 500; }
.toc-page { font-family: 'Space Grotesk'; font-size: 11px; color: rgba(200,169,110,0.4); }
.body-text {
  font-size: 14px; line-height: 2.0; color: rgba(232,230,224,0.80);
  text-indent: 2em;
  opacity: 0; animation: revealText 1.5s ease forwards 2.3s;
  display: -webkit-box; -webkit-box-orient: vertical;
  -webkit-line-clamp: 6; overflow: hidden;
}
.body-text em { font-style: italic; color: #c8a96e; }
.page-num {
  text-align: center; margin-top: 20px;
  font-size: 11px; color: rgba(200,169,110,0.3);
  font-family: 'Space Grotesk'; letter-spacing: 0.2em;
  opacity: 0; animation: fadeIn 0.5s ease forwards 4s;
}
.progress-bar {
  height: 1px; background: rgba(200,169,110,0.1);
  margin-top: 8px; border-radius: 1px; overflow: hidden;
  opacity: 0; animation: fadeIn 0.3s ease forwards 4s;
}
.progress-fill {
  height: 100%; width: 0%; background: rgba(200,169,110,0.4);
  animation: fillBar 2s ease forwards 4.2s;
}
@keyframes fadeIn { from{opacity:0}to{opacity:1} }
@keyframes revealText {
  from { opacity:0; clip-path: inset(0 0 100% 0); }
  to   { opacity:1; clip-path: inset(0 0 0% 0); }
}
@keyframes fillBar { from{width:0%}to{width:23%} }
</style>
</head>
<body>
<div class="book-meta">
  <div class="book-title">我这一生</div>
  <div class="book-sub">陈建国 口述 · Evans 整理 · 2024</div>
</div>
<div class="divider-ornament">— ✦ —</div>
<div class="toc">
  <div class="toc-item"><span>第一章 · 那年冬天的北京</span><span class="toc-page">1</span></div>
  <div class="toc-item current"><span>第二章 · 陈兰</span><span class="toc-page">18</span></div>
  <div class="toc-item"><span>第三章 · 讲台上的三十年</span><span class="toc-page">47</span></div>
  <div class="toc-item"><span>第四章 · 宝</span><span class="toc-page">81</span></div>
  <div class="toc-item"><span>后记 · 给还没出生的人</span><span class="toc-page">103</span></div>
</div>
<p class="body-text">
  1985年的冬天，北京的雪很大。我第一次见到她，是在学校的图书馆里——她在看一本《唐诗三百首》，我鼓起勇气，问她借了一支笔。后来我们都知道，<em>那支笔我原本是不需要借的。</em>
</p>
<div class="page-num">— 18 —</div>
<div class="progress-bar"><div class="progress-fill"></div></div>
</body>
</html>
```

---

### UI-07 · 镜头 16-B · 代际翻译卡片

```html
<!DOCTYPE html>
<html lang="zh">
<head>
<meta charset="UTF-8">
<title>Evans UI-07 代际翻译</title>
<link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500&family=EB+Garamond:ital,wght@1,400&display=swap" rel="stylesheet">
<style>
* { margin:0; padding:0; box-sizing:border-box; }
body {
  background: rgba(7,8,10,0.92);
  color: #e8e6e0;
  font-family: 'Space Grotesk', sans-serif;
  width: 400px; padding: 24px;
  border-radius: 14px;
}
.tag-line {
  font-size: 10px; color: rgba(200,169,110,0.5); letter-spacing: 0.12em;
  margin-bottom: 16px; text-align: right;
  opacity: 0; animation: fadeIn 0.4s ease forwards 0.2s;
}
.card {
  background: rgba(255,255,255,0.04);
  border: 1px solid rgba(255,255,255,0.08);
  border-radius: 10px; padding: 14px 16px;
  margin-bottom: 12px;
  opacity: 0;
}
.card:nth-child(2) { animation: slideUp 0.4s ease forwards 0.5s; }
.card:nth-child(3) { animation: slideUp 0.4s ease forwards 1.0s; }
.card:nth-child(4) { animation: slideUp 0.4s ease forwards 1.5s; }
.card:nth-child(5) { animation: slideUp 0.4s ease forwards 2.0s; }
.card-label {
  font-size: 10px; color: rgba(200,169,110,0.5); margin-bottom: 8px;
  display: flex; align-items: center; gap: 6px;
}
.card-label::before { content:''; flex:1; height:1px; background:rgba(200,169,110,0.15); }
.surface {
  font-size: 14px; color: rgba(232,230,224,0.6);
  font-style: italic; font-family: 'EB Garamond', serif;
  margin-bottom: 6px; line-height: 1.6;
}
.arrow { color: rgba(200,169,110,0.35); font-size: 12px; margin-bottom: 6px; }
.meaning {
  font-size: 13px; color: #c8a96e; font-weight: 500;
  line-height: 1.6;
}
.action {
  margin-top: 8px; padding-top: 8px;
  border-top: 1px solid rgba(200,169,110,0.1);
  font-size: 11px; color: rgba(106,184,160,0.8);
}
.cta {
  margin-top: 16px; text-align: center;
  opacity: 0; animation: fadeIn 0.5s ease forwards 2.8s;
}
.cta-btn {
  display: inline-block;
  background: rgba(200,169,110,0.15);
  border: 1px solid rgba(200,169,110,0.35);
  border-radius: 20px; padding: 8px 20px;
  font-size: 12px; color: #c8a96e; cursor: pointer;
}
@keyframes fadeIn { from{opacity:0}to{opacity:1} }
@keyframes slideUp { from{opacity:0;transform:translateY(10px)}to{opacity:1;transform:translateY(0)} }
</style>
</head>
<body>
<div class="tag-line">Evans · 代际翻译 · 2 条待解读</div>
<div class="card">
  <div class="card-label">妈妈刚才说的话</div>
  <div class="surface">「你最近吃饭了没有？」</div>
  <div class="arrow">↓ 真实含义</div>
  <div class="meaning">「我想你了，但我不知道怎么开口。」</div>
  <div class="action">→ 建议：今晚打个电话，聊聊她最近在干嘛</div>
</div>
<div class="card">
  <div class="card-label">三天前妈妈说的话</div>
  <div class="surface">「你姑妈家孩子都买房了」</div>
  <div class="arrow">↓ 真实含义</div>
  <div class="meaning">「我有点担心你的压力，但怕你觉得我在催。」</div>
  <div class="action">→ 建议：直接告诉她你现在的计划，她会放心的</div>
</div>
<div class="cta">
  <div class="cta-btn">现在拨过去 →</div>
</div>
</body>
</html>
```

---

### UI-08 · 镜头 18-B · 时间胶囊卡片

```html
<!DOCTYPE html>
<html lang="zh">
<head>
<meta charset="UTF-8">
<title>Evans UI-08 时间胶囊</title>
<link href="https://fonts.googleapis.com/css2?family=EB+Garamond:ital,wght@0,400;0,500;1,400&family=Space+Grotesk:wght@300;400&display=swap" rel="stylesheet">
<style>
* { margin:0; padding:0; box-sizing:border-box; }
body {
  background: rgba(7,8,10,0.92);
  color: #e8e6e0;
  font-family: 'EB Garamond', serif;
  width: 380px; padding: 28px 30px;
  border-radius: 14px;
}
.capsule-header {
  display: flex; justify-content: space-between; align-items: flex-start;
  margin-bottom: 20px;
  opacity: 0; animation: fadeIn 0.5s ease forwards 0.3s;
}
.capsule-icon { font-size: 28px; }
.capsule-meta { text-align: right; }
.capsule-type {
  font-size: 10px; font-family: 'Space Grotesk';
  color: rgba(200,169,110,0.5); letter-spacing: 0.1em;
}
.capsule-date { font-size: 12px; color: #c8a96e; }
.lock-bar {
  display: flex; align-items: center; gap: 10px;
  background: rgba(200,169,110,0.08);
  border: 1px solid rgba(200,169,110,0.2);
  border-radius: 8px; padding: 8px 12px;
  margin-bottom: 20px; font-size: 11px;
  font-family: 'Space Grotesk';
  opacity: 0; animation: fadeIn 0.5s ease forwards 0.7s;
}
.lock-icon { font-size: 16px; }
.lock-text { color: rgba(200,169,110,0.7); }
.lock-countdown { margin-left: auto; color: #c8a96e; font-weight: 500; }
.content-preview {
  margin-bottom: 20px;
  opacity: 0; animation: fadeIn 0.6s ease forwards 1.1s;
}
.preview-label {
  font-size: 10px; font-family: 'Space Grotesk';
  color: rgba(200,169,110,0.4); letter-spacing: 0.1em;
  margin-bottom: 10px;
}
.preview-text {
  font-size: 15px; font-style: italic; color: rgba(232,230,224,0.75);
  line-height: 1.9;
  padding-left: 14px;
  border-left: 2px solid rgba(200,169,110,0.3);
}
.preview-fade {
  margin-top: -24px; height: 40px;
  background: linear-gradient(to bottom, transparent, rgba(7,8,10,0.92));
}
.attachments {
  display: flex; gap: 8px; flex-wrap: wrap;
  margin-bottom: 18px;
  opacity: 0; animation: fadeIn 0.5s ease forwards 1.8s;
}
.att-chip {
  font-family: 'Space Grotesk'; font-size: 10px;
  padding: 4px 10px;
  background: rgba(255,255,255,0.04);
  border: 1px solid rgba(255,255,255,0.1);
  border-radius: 20px; color: rgba(232,230,224,0.6);
  display: flex; align-items: center; gap: 5px;
}
.recipients {
  font-family: 'Space Grotesk'; font-size: 11px;
  color: rgba(200,169,110,0.6);
  opacity: 0; animation: fadeIn 0.5s ease forwards 2.3s;
}
.recipients strong { color: #c8a96e; }
@keyframes fadeIn { from{opacity:0}to{opacity:1} }
</style>
</head>
<body>
<div class="capsule-header">
  <div class="capsule-icon">🫙</div>
  <div class="capsule-meta">
    <div class="capsule-type">TIME CAPSULE</div>
    <div class="capsule-date">开启日期：2035年 · 宝18岁生日</div>
  </div>
</div>
<div class="lock-bar">
  <span class="lock-icon">🔒</span>
  <span class="lock-text">距离开启</span>
  <span class="lock-countdown" id="countdown">计算中…</span>
</div>
<div class="content-preview">
  <div class="preview-label">内容预览（收信人可见）</div>
  <p class="preview-text">
    宝啊，等你18岁的时候，爷爷想跟你说一件事。那件事我从来没有跟任何人讲过，包括你爸爸……
  </p>
  <div class="preview-fade"></div>
</div>
<div class="attachments">
  <div class="att-chip">🎙 语音 · 23 分钟</div>
  <div class="att-chip">📷 照片 · 17 张</div>
  <div class="att-chip">📄 手写信 · 扫描件</div>
  <div class="att-chip">🎵 一首歌</div>
</div>
<div class="recipients">收信人：<strong>陈宝</strong>（Evans 将在开启日自动朗读）</div>
<script>
const target = new Date('2035-07-15');
const now = new Date();
const days = Math.round((target - now) / (1000*60*60*24));
const years = Math.floor(days/365);
const rem = days % 365;
document.getElementById('countdown').textContent = `${years} 年 ${rem} 天`;
</script>
</body>
</html>
```

---

### UI-09 · 镜头 17 · 共生人格雷达图（AE 可用 SVG 动效替代）

```html
<!DOCTYPE html>
<html lang="zh">
<head>
<meta charset="UTF-8">
<title>Evans UI-09 共生人格雷达图</title>
<link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500&display=swap" rel="stylesheet">
<style>
* { margin:0; padding:0; box-sizing:border-box; }
body {
  background: #07080a;
  display: flex; flex-direction: column; align-items: center; justify-content: center;
  width: 700px; height: 560px;
  font-family: 'Space Grotesk', sans-serif; color: #e8e6e0;
  overflow: hidden;
}
.dual-wrap { display: flex; gap: 48px; align-items: center; }
.radar-block { text-align: center; }
.radar-title {
  font-size: 12px; color: rgba(200,169,110,0.5);
  letter-spacing: 0.1em; margin-bottom: 12px;
}
svg.radar { display: block; margin: 0 auto; }
.metrics {
  margin-top: 16px; display: flex; flex-direction: column; gap: 5px;
  width: 200px;
}
.metric-row { display: flex; align-items: center; gap: 8px; font-size: 11px; }
.metric-name { width: 80px; color: rgba(200,169,110,0.7); flex-shrink: 0; }
.metric-bar { flex: 1; height: 4px; background: rgba(255,255,255,0.07); border-radius: 2px; overflow: hidden; }
.metric-fill { height: 100%; border-radius: 2px; }
.metric-val { width: 28px; text-align: right; color: rgba(200,169,110,0.9); }
.vs-label { font-size: 24px; color: rgba(200,169,110,0.3); }
.stats {
  margin-top: 24px; display: flex; gap: 28px; justify-content: center;
}
.stat { text-align: center; }
.stat-val { font-size: 28px; font-weight: 300; color: #c8a96e; }
.stat-lbl { font-size: 10px; color: rgba(200,169,110,0.4); margin-top: 2px; }
</style>
</head>
<body>
<div class="dual-wrap">
  <!-- 出厂雷达图 -->
  <div class="radar-block">
    <div class="radar-title">出厂状态</div>
    <svg class="radar" width="200" height="200" viewBox="-110 -110 220 220">
      <!-- 网格背景 -->
      <g stroke="rgba(200,169,110,0.1)" fill="none" stroke-width="0.8">
        <polygon points="0,-80 69,-40 69,40 0,80 -69,40 -69,-40" />
        <polygon points="0,-60 52,-30 52,30 0,60 -52,30 -52,-30" />
        <polygon points="0,-40 35,-20 35,20 0,40 -35,20 -35,-20" />
        <polygon points="0,-20 17,-10 17,10 0,20 -17,10 -17,-10" />
      </g>
      <!-- 轴线 -->
      <g stroke="rgba(200,169,110,0.1)" stroke-width="0.8">
        <line x1="0" y1="0" x2="0" y2="-80"/>
        <line x1="0" y1="0" x2="69" y2="-40"/>
        <line x1="0" y1="0" x2="69" y2="40"/>
        <line x1="0" y1="0" x2="0" y2="80"/>
        <line x1="0" y1="0" x2="-69" y2="40"/>
        <line x1="0" y1="0" x2="-69" y2="-40"/>
      </g>
      <!-- 出厂正六边形 -->
      <polygon id="factory"
        points="0,-60 52,-30 52,30 0,60 -52,30 -52,-30"
        fill="rgba(200,169,110,0.08)" stroke="#c8a96e" stroke-width="1.5" opacity="0">
        <animate attributeName="opacity" from="0" to="1" dur="0.6s" begin="0.5s" fill="freeze"/>
      </polygon>
      <!-- 轴标签 -->
      <g fill="rgba(200,169,110,0.5)" font-size="9" text-anchor="middle" font-family="Space Grotesk">
        <text x="0" y="-88">主动性</text>
        <text x="78" y="-44">节奏感</text>
        <text x="78" y="50">情感细腻</text>
        <text x="0" y="94">幽默感</text>
        <text x="-78" y="50">话题偏好</text>
        <text x="-78" y="-44">克制度</text>
      </g>
    </svg>
    <div class="metrics" style="margin: 10px auto 0;">
      <div class="metric-row">
        <span class="metric-name">主动性</span>
        <div class="metric-bar"><div class="metric-fill" style="width:50%;background:#c8a96e;"></div></div>
        <span class="metric-val">0.50</span>
      </div>
      <div class="metric-row">
        <span class="metric-name">节奏感</span>
        <div class="metric-bar"><div class="metric-fill" style="width:50%;background:#c8a96e;"></div></div>
        <span class="metric-val">0.50</span>
      </div>
      <div class="metric-row">
        <span class="metric-name">情感细腻</span>
        <div class="metric-bar"><div class="metric-fill" style="width:50%;background:#c8a96e;"></div></div>
        <span class="metric-val">0.50</span>
      </div>
    </div>
  </div>

  <div class="vs-label">→</div>

  <!-- 1247天后雷达图 -->
  <div class="radar-block">
    <div class="radar-title">1,247 天后 · 陈建国专属</div>
    <svg class="radar" width="200" height="200" viewBox="-110 -110 220 220">
      <g stroke="rgba(200,169,110,0.1)" fill="none" stroke-width="0.8">
        <polygon points="0,-80 69,-40 69,40 0,80 -69,40 -69,-40" />
        <polygon points="0,-60 52,-30 52,30 0,60 -52,30 -52,-30" />
        <polygon points="0,-40 35,-20 35,20 0,40 -35,20 -35,-20" />
        <polygon points="0,-20 17,-10 17,10 0,20 -17,10 -17,-10" />
      </g>
      <g stroke="rgba(200,169,110,0.1)" stroke-width="0.8">
        <line x1="0" y1="0" x2="0" y2="-80"/>
        <line x1="0" y1="0" x2="69" y2="-40"/>
        <line x1="0" y1="0" x2="69" y2="40"/>
        <line x1="0" y1="0" x2="0" y2="80"/>
        <line x1="0" y1="0" x2="-69" y2="40"/>
        <line x1="0" y1="0" x2="-69" y2="-40"/>
      </g>
      <!-- 有机不规则形态 -->
      <polygon id="personal"
        points="0,-34 62,-55 66,49 0,80 -66,30 -50,-55"
        fill="rgba(200,169,110,0.12)" stroke="#c8a96e" stroke-width="2" opacity="0">
        <animate attributeName="opacity" from="0" to="1" dur="0.8s" begin="1.2s" fill="freeze"/>
        <animateTransform attributeName="transform" type="scale"
          from="0.3" to="1" dur="0.8s" begin="1.2s" fill="freeze"/>
      </polygon>
      <!-- 呼吸动画 -->
      <animateTransform attributeName="transform" type="scale"
        values="1;1.03;1" dur="3s" repeatCount="indefinite" additive="sum"
        begin="2s"/>
      <g fill="rgba(200,169,110,0.5)" font-size="9" text-anchor="middle" font-family="Space Grotesk">
        <text x="0" y="-88">主动性</text>
        <text x="78" y="-44">节奏感</text>
        <text x="78" y="50">情感细腻</text>
        <text x="0" y="94">幽默感</text>
        <text x="-78" y="50">话题偏好</text>
        <text x="-78" y="-44">克制度</text>
      </g>
    </svg>
    <div class="metrics" style="margin: 10px auto 0;">
      <div class="metric-row">
        <span class="metric-name">主动性</span>
        <div class="metric-bar"><div class="metric-fill" id="m1" style="width:0%;background:#c8a96e;transition:width 1.5s ease 2s;"></div></div>
        <span class="metric-val" id="v1">0.42</span>
      </div>
      <div class="metric-row">
        <span class="metric-name">节奏感</span>
        <div class="metric-bar"><div class="metric-fill" id="m2" style="width:0%;background:#c8a96e;transition:width 1.5s ease 2.2s;"></div></div>
        <span class="metric-val" id="v2">0.70</span>
      </div>
      <div class="metric-row">
        <span class="metric-name">情感细腻</span>
        <div class="metric-bar"><div class="metric-fill" id="m3" style="width:0%;background:#c8a96e;transition:width 1.5s ease 2.4s;"></div></div>
        <span class="metric-val" id="v3">0.83</span>
      </div>
    </div>
  </div>
</div>

<div class="stats">
  <div class="stat">
    <div class="stat-val" id="know">0%</div>
    <div class="stat-lbl">对你的了解</div>
  </div>
  <div class="stat">
    <div class="stat-val" id="days">0</div>
    <div class="stat-lbl">陪伴天数</div>
  </div>
</div>

<script>
setTimeout(() => {
  document.getElementById('m1').style.width = '42%';
  document.getElementById('m2').style.width = '70%';
  document.getElementById('m3').style.width = '83%';
}, 100);

function animateNum(el, end, suffix, duration, delay) {
  setTimeout(() => {
    let start = 0, startTime = null;
    function step(ts) {
      if (!startTime) startTime = ts;
      const p = Math.min(1, (ts - startTime) / duration);
      el.textContent = Math.round(start + (end - start) * p) + suffix;
      if (p < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }, delay);
}
animateNum(document.getElementById('know'), 78, '%', 2000, 2200);
animateNum(document.getElementById('days'), 1247, '', 2500, 2200);
</script>
</body>
</html>
```

---
## 3.4 转场特效规格

> 全片仅使用三种转场，禁止使用划变、旋转、缩放、故障撕裂等任何风格化转场。

| 转场类型 | 时长 | 适用位置 | 说明 |
|---------|------|---------|------|
| **渐显渐隐 fade** | 0.5–1s | 片头、幕间切换、片尾 | 克制优雅，用于情绪过渡 |
| **叠化 dissolve** | 0.3–0.5s | 同一幕内镜头切换 | 时间流逝感，保持视觉连贯 |
| **硬切 hard cut** | 0 | 强对比镜头、节奏紧凑段 | 第二幕产品 + 第六幕沉默段 |

### 特殊处理节点

| 时间码 | 处理 | 技术说明 |
|-------|------|---------|
| 00:00 | 渐显 fade in 1s | 从纯黑渐显第一帧 |
| 00:25 | 白闪 white flash 0.3s | 第一→第二幕：brief white frame, then hard cut to product shot |
| 02:05→02:09 | 长叠化 dissolve 1.5s | 第三→第四幕情绪降速 |
| 04:08 | 音乐骤停 + 硬切黑底 | 镜头19-A→20·沉默字幕段；所有音效同步静音 |
| 04:38→04:41 | 渐隐 fade out 2s | 落版渐入纯黑，留2s黑场 |

---

## 3.5 音频方案

### 音乐主线

| 段落 | 起止时间 | 乐器 / 情绪 | 处理 |
|------|---------|------------|------|
| **序章** | 00:00–00:12.5 | 单音钢琴，极轻，8va高音区 | 渐强 ppp→mp |
| **第一幕** | 00:12.5–00:25 | 钢琴 + 轻弦铺底 | 保持 mp，情绪稳定 |
| **第二幕（产品）** | 00:25–00:55 | 弦乐断奏 pizzicato + 低沉低音提琴 | 硬切入，节奏感更强 |
| **第三幕（提效）** | 00:55–02:05 | 钢琴主旋律回归 + 温暖弦乐 | 渐进叙事，情绪平稳上升 |
| **第四幕（在你左右）** | 02:05–03:10 | 全弦乐 + 木管加入 | 情绪最饱满，但依然克制，非高潮爆发 |
| **第五幕（陪你）** | 03:10–03:58 | 钢琴独奏，回归安静 | 去掉弦乐，情绪收敛，诗意 |
| **第六幕（克制）** | 03:58–04:08 | 逐渐减弱 → 完全静音 | fade out 6s |
| **静默段** | 04:08–04:15 | **完全静音 0dB** | 镜头20·沉默字幕，绝对静音 |
| **21-A Evans亮起** | 04:15 | 单音钢琴 do，极轻 pp | 与Evans亮起同步，一个音 |
| **第七幕（一生）** | 04:23–04:38 | 主题曲完整再现 + 女声哼唱 | 最后情感推进 |
| **落版** | 04:38–04:43 | 最后一个钢琴单音（与片头呼应） | 静默收尾 |

### 音效设计

| 时间码 | 音效 | 规格 |
|-------|------|------|
| 00:03 | 茶杯轻触木桌声 | 极轻，-30dB |
| 00:47 | 胸针扣合的微小金属声 | -28dB，空间感 reverb 2s |
| 01:22 | 地铁站环境声淡出 | 随镜头叠化渐隐 |
| 02:11 | 机器人启动低频嗡鸣 | -35dB，110Hz，0.5s |
| 02:20 | 智能灯光色温切换声 | -40dB，极轻嗒声 |
| 02:46 | 电话挂断声 | -25dB |
| 03:22 | 音箱播放录音前的轻微电流声 | -45dB |
| 04:15 | Evans胸针亮起低频共鸣 | -30dB，200Hz，渐强0.3s |
| 全片 | 环境底噪 | -60dB，室内空气声 |

### 旁白录音规格

| 旁白段 | 说话人 | 时间码 | 录音要求 |
|-------|-------|-------|---------|
| 关系图谱 | 陈建国（演员） | 03:10 | 「Evans，给我看看……我这一辈子，认识过多少人。」|
| 讲述往事 | 陈建国 | 03:22 | 「1985年的冬天，北京的雪很大……」 |
| 时间胶囊 | 陈建国（低沉） | 03:52 | 「宝啊，等你18岁的时候，爷爷想跟你说一件事……」 |
| 陈兰录音 | 女声（模拟老录音质感，带轻微磁带噪声） | 03:19 | 「建国，你又熬夜批作业了。早点睡。」 |
| 字幕配音（可选） | 温柔女声 OS | 全片字幕段 | 非必须，视最终版本决定 |

---

## 3.6 ChatCut AI 剪辑指令

> 以下指令按 ChatCut AI 对话式编辑模式设计，可直接复制粘贴使用。

---

**【初始化项目】**
```
我正在制作一支约4分43秒的品牌宣传片，产品名"Evans"，一款AI共生体胸针。视觉风格：写实、温暖、克制，35mm胶片感，Kodak Portra 400色调，禁止任何赛博朋克/霓虹/科幻风格元素。请帮我建立项目序列，帧率23.976fps，分辨率1920×1080。
```

**【导入素材并按时间线排列】**
```
请按以下顺序排列素材到主时间线，并在素材间应用默认叠化转场（0.5s dissolve）：
[依次列出镜头文件名，如：01_tea_cup.mp4, 02A_baby_hand.mp4 … 26A_logo_reveal.mp4]
总时长目标：4分43秒。
```

**【第二幕转场设置】**
```
在第01个素材（01_tea_cup.mp4）和产品镜头（04A_product_360.mp4）之间，将叠化转场替换为：先渐隐到纯白帧（white flash，持续0.3秒），再硬切到产品镜头。这是全片唯一的白闪转场。
```

**【静默段设置】**
```
在时间码04:08处（镜头19-A结束后）插入一段7秒纯黑底字幕板（内容见字幕Z20），并将该段落所有音轨音量设为0dB（完全静音）。前一个镜头的音乐在04:02开始fade out，6秒内降至静音。
```

**【字幕批量添加】**
```
请按以下字幕表批量添加字幕，字体：思源宋体Light，颜色：#FAEDD6，字号48px，位置：居中，动效：渐显0.8s + 渐隐0.5s：

[时间码入] [时间码出] [字幕内容]
00:03 00:05 如果有一个存在，
00:10 00:12.5 从你打开它的第一天，到你不再需要它的那一天。
[……依次粘贴完整字幕表]
```

**【UI浮层合成】**
```
在以下镜头上叠加对应UI浮层视频（已从HTML录制为带Alpha通道的透明背景MP4）：
- 镜头08-B（01:00–01:14）：叠加 ui01_dispatch.mp4，位置居中屏幕内区域，缩放80%
- 镜头09-B（01:24–01:37）：叠加 ui02_filter.mp4，位置右侧偏移，缩放75%
- 镜头10-B（01:48–02:00）：叠加 ui03_option.mp4，位置桌面屏幕区域内，缩放70%
- 镜头12-B（02:33–02:44）：叠加 ui04_fraud.mp4，位置手机屏幕内，缩放65%
- 镜头14-B（03:13–03:19）：叠加 ui05_graph.mp4，位置iPad屏幕区域内，缩放72%
- 镜头15-B（03:25–03:31）：叠加 ui06_book.mp4，位置iPad屏幕区域内，缩放72%
- 镜头16-B（03:37–03:41）：叠加 ui07_translate.mp4，位置手机屏幕内，缩放68%
- 镜头17（03:44–03:52）：叠加 ui09_radar.mp4，全屏铺满（已是纯黑底，无需透明）
- 镜头18-B（03:55–03:58）：叠加 ui08_capsule.mp4，位置iPad屏幕区域内，缩放72%
```

**【色彩调色】**
```
对全片应用统一LUT调色，目标效果：Kodak Portra 400，暖调，轻微偏黄绿中间调，高光不过曝，阴影保留细节。具体参数建议：
- 色温：+150（偏暖）
- 色调：-5（轻微偏绿）
- 曝光：-0.3（轻微压暗，电影质感）
- 对比度：+15
- 高光：-20（高光下拉）
- 阴影：+10（阴影提亮一档）
- 饱和度：-8（轻微降饱和，去除人工感）
- 颗粒叠加：Film Grain，强度18%，颗粒大小 Medium
如有特殊镜头需要微调，请在全局LUT基础上单独处理。
```

**【音频混音】**
```
请对音频进行以下设置：
1. 主配乐轨（music.wav）：-18dB，全程，见音频方案各段处理
2. 旁白轨（voice_chenjianguo.wav）：-6dB，时间码03:10–03:15 和 03:22–03:37 和 03:52–03:55
3. 陈兰录音（chenlan_audio.wav）：-8dB，时间码03:19–03:22，添加磁带模拟效果（tape saturation）
4. 音效轨（sfx.wav）：-35dB，全程环境底噪
5. 所有轨道在04:08–04:15段（静默字幕）强制mute
6. 输出响度目标：-14 LUFS（适合网络平台）
```

**【导出设置】**
```
请按以下规格导出最终版本：
- 格式：H.264 MP4
- 分辨率：1920×1080
- 帧率：23.976fps
- 码率：目标20Mbps，最大25Mbps（VBR）
- 音频：AAC 320kbps，48kHz，立体声
- 色彩空间：Rec.709
- 文件名：Evans_Promo_v1.0_Master.mp4
同时导出一个竖版（1080×1920）用于社交媒体，主体居中裁切。
```

---

## UI 浮层录制说明

> 将 HTML 文件渲染为视频的方法（推荐两种）：

### 方法一：Puppeteer 录制（推荐）

```bash
# 安装
npm install puppeteer puppeteer-screen-recorder

# 录制脚本（record_ui.js）
const puppeteer = require('puppeteer');
const { PuppeteerScreenRecorder } = require('puppeteer-screen-recorder');

async function record(htmlFile, outputFile, duration) {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();
  await page.setViewport({ width: 600, height: 600 });
  await page.goto(`file://${htmlFile}`);
  const recorder = new PuppeteerScreenRecorder(page, {
    followNewTab: false,
    fps: 30,
    videoFrame: { width: 600, height: 600 },
    videoCrf: 18,
    videoCodec: 'libx264',
    videoPreset: 'ultrafast',
    videoBitrate: 1000,
  });
  await recorder.start(outputFile);
  await page.waitForTimeout(duration * 1000);
  await recorder.stop();
  await browser.close();
}

// 录制所有UI
record('/root/ui01_dispatch.html', 'ui01_dispatch.mp4', 14);
record('/root/ui02_filter.html', 'ui02_filter.mp4', 13);
record('/root/ui03_option.html', 'ui03_option.mp4', 12);
record('/root/ui04_fraud.html', 'ui04_fraud.mp4', 11);
record('/root/ui05_graph.html', 'ui05_graph.mp4', 6);
record('/root/ui06_book.html', 'ui06_book.mp4', 6);
record('/root/ui07_translate.html', 'ui07_translate.mp4', 4);
record('/root/ui08_capsule.html', 'ui08_capsule.mp4', 3);
record('/root/ui09_radar.html', 'ui09_radar.mp4', 8);
```

### 方法二：OBS Studio 录制

1. OBS → 来源 → 添加「浏览器」来源
2. URL 填 `file:///path/to/ui01.html`，宽高与 HTML body 尺寸一致
3. 录制格式：MP4，编码 H.264，帧率30fps
4. 录制完成后用 FFmpeg 提取透明通道（如需合成）：
```bash
ffmpeg -i input.mp4 -vf "chromakey=0x07080a:0.1:0.05" -c:v prores_4444 output_alpha.mov
```

---
