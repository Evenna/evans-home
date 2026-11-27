# 小豆 · FDE 风竖版口播动画 · 源码

- `player.html`：浏览器直接跑源码预览，`?t=秒` 跳到指定位置。
- `engine.js / engine.css`：时间轴引擎和 FDE 暗色主题，支持确定性 seek，逐帧渲染不漂移。
- `icons.js`：lucide 线性图标，`ICN()` 用来做玻璃图标块，`ABG()` 用来做动画背景。
- `shots1/2/3.js`：49 镜分镜代码，每镜包含版式、元素、关键帧和音效打点。
- `seq/`：实拍素材帧序列，已压缩到 480×270 供预览；正式渲染用 960×540 原片。`talk/` 是口播占位图。
- `audio/`：`mix.mp3` 是成片混音（−20 LUFS），`cue.tsv` 是 66 个音效打点表，其余 mp3 是用到的 mixkit 音效（免费可商用）。
- `render.js`：puppeteer 逐帧截图，输出 1080×1920、25fps。
- `strips.js`：每镜导出 4 张关键帧图。
- `mix.py`：配乐分段推拉，加音效打点，最后软限幅。

流程：分镜 → `shots*.js` → `render.js` 出帧 → `mix.py` 混音 → 用 ffmpeg 合成，参数为 H.264 crf24 + AAC 48k。
